// Define and export the input interface
export interface CurveInputs {
  maxSpeed: number;
  radius: number;
  cantDeficiency?: number;
  goodsSpeed?: number;
  transitionLength?: number;
  gauge?: number;
}

// Define and export the output interface
export interface CurveResults {
  equilibriumCant: string;
  actualCantRequired: string;
  cantExcess: string;
  actualCant: string;
  maxPermissibleSpeed: string;
  minTransitionLength: string;
  finalTransitionLength: string;
  cantGradient: string;
  rateOfChangeCa: string;
  rateOfChangeCd: string;
  isValid: boolean;
  degreeOfCurve: string;
  deflectionAngle: string;
  tangentLength: string;
  curveLength: string;
  totalCurveLength: string;
  shift: string;
  chainageTPTC1: number;
  chainageTPTC2: string;
}

export function calculateRailwayCurve(inputs: CurveInputs): CurveResults {
  const {
    maxSpeed,
    radius,
    cantDeficiency = 75,
    goodsSpeed = 65,
    transitionLength,
    gauge = 1750,
  } = inputs;

  // Constants
  const maxCaLimit = 140;
  const maxCdLimit = 75;
  const permittedCantExcess = 75;

  // Equilibrium Cant: (G * V^2) / (127 * R)
  const equilibriumCant = (gauge * maxSpeed * maxSpeed) / (127 * radius);

  // Actual Cant Required: Equilibrium Cant - Cd
  let actualCantRequired = equilibriumCant - cantDeficiency;

  // Cant Excess Consideration
  const goodsCant = (gauge * goodsSpeed * goodsSpeed) / (127 * radius);
  const cantExcess = actualCantRequired - goodsCant;

  // Adjust Ca if cant excess exceeds limit or is negative
  let actualCant = actualCantRequired;
  if (cantExcess < -permittedCantExcess || cantExcess > permittedCantExcess) {
    actualCant = goodsCant + cantDeficiency;
  }
  actualCant = Math.min(actualCant, maxCaLimit);

  // Max Permissible Speed: 0.27 * R * (Ca + Cd)
  const maxPermissibleSpeed = 0.27 * radius * (actualCant + cantDeficiency);

  // Minimum Transition Length (max of three formulas)
  const transitionOptions = [
    0.0056 * actualCant * maxSpeed,
    0.0056 * cantDeficiency * maxSpeed,
    0.72 * actualCant,
  ];
  const minTransitionLength = Math.max(...transitionOptions);
  const finalTransitionLength = transitionLength
    ? transitionLength
    : Math.ceil(minTransitionLength / 10) * 10;

  // Cant Gradient: Ca / (TRL * 1000)
  const cantGradient = actualCant / (finalTransitionLength * 1000);
  const maxCantGradient = 1 / 720;
  let finalCant = actualCant;
  if (cantGradient > maxCantGradient) {
    finalCant = finalTransitionLength * maxCantGradient * 1000;
  }

  // Recalculate Vmax with final Ca
  const finalMaxSpeed = 0.27 * radius * (finalCant + cantDeficiency);

  // Rate of Change
  const rateOfChangeCa = (maxSpeed * finalCant) / (finalTransitionLength * 3.6);
  const rateOfChangeCd =
    (maxSpeed * cantDeficiency) / (finalTransitionLength * 3.6);

  // Additional Curve Parameters
  const degreeOfCurve = (gauge / radius) * (180 / Math.PI);
  const deflectionAngle = (finalTransitionLength / radius) * (180 / Math.PI);
  const tangentLength = radius * Math.tan((deflectionAngle * Math.PI) / 360);
  const curveLength = (deflectionAngle * Math.PI * radius) / 180;
  const shift = (finalTransitionLength * finalTransitionLength) / (24 * radius);
  const totalCurveLength = finalTransitionLength + curveLength;

  // Chainage (placeholder)
  const chainageTPTC1 = 42736.819;

  return {
    equilibriumCant: equilibriumCant.toFixed(2),
    actualCantRequired: actualCantRequired.toFixed(2),
    cantExcess: cantExcess.toFixed(2),
    actualCant: finalCant.toFixed(2),
    maxPermissibleSpeed: finalMaxSpeed.toFixed(0),
    minTransitionLength: minTransitionLength.toFixed(2),
    finalTransitionLength: finalTransitionLength.toFixed(2),
    cantGradient: (1 / cantGradient).toFixed(2),
    rateOfChangeCa: rateOfChangeCa.toFixed(2),
    rateOfChangeCd: rateOfChangeCd.toFixed(2),
    isValid: rateOfChangeCa <= 50 && rateOfChangeCd <= 50,
    degreeOfCurve: degreeOfCurve.toFixed(2),
    deflectionAngle: deflectionAngle.toFixed(2),
    tangentLength: tangentLength.toFixed(2),
    curveLength: curveLength.toFixed(2),
    totalCurveLength: totalCurveLength.toFixed(2),
    shift: shift.toFixed(2),
    chainageTPTC1,
    chainageTPTC2: (chainageTPTC1 + totalCurveLength).toFixed(2),
  };
}
