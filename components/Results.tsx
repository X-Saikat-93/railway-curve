"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurveResults } from "@/lib/calculation";

interface ResultsProps {
  results: CurveResults;
}

export default function Results({ results }: ResultsProps) {
  const printRef = useRef<HTMLDivElement>(null);

  // Fix: The correct way to use useReactToPrint
  const handlePrint = useReactToPrint({
    documentTitle: "Railway_Curve_Calculation",
      // content: () => printRef.current,
      contentRef: printRef
    
  });

  // Create a button click handler that has the correct type
  const onPrintClick = () => {
    handlePrint();
  };

  return (
    <div ref={printRef} className='print-section mt-10'>
      <Card className='shadow-lg border-none bg-background/90 backdrop-blur-lg transform hover:shadow-xl transition-shadow duration-300'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Calculation Results
          </CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-foreground'>
          <div className='space-y-4'>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Equilibrium Cant:
              </strong>{" "}
              {results.equilibriumCant} mm
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Actual Cant Required:
              </strong>{" "}
              {results.actualCantRequired} mm
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Cant Excess:
              </strong>{" "}
              {results.cantExcess} mm
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Actual Cant (Ca):
              </strong>{" "}
              {results.actualCant} mm
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Max Permissible Speed:
              </strong>{" "}
              {results.maxPermissibleSpeed} kmph
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Min Transition Length:
              </strong>{" "}
              {results.minTransitionLength} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Final Transition Length:
              </strong>{" "}
              {results.finalTransitionLength} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Cant Gradient:
              </strong>{" "}
              1 in {results.cantGradient}
            </p>
          </div>
          <div className='space-y-4'>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Rate of Change (Ca):
              </strong>{" "}
              {results.rateOfChangeCa} mm/sec
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Rate of Change (Cd):
              </strong>{" "}
              {results.rateOfChangeCd} mm/sec
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Degree of Curve:
              </strong>{" "}
              {results.degreeOfCurve}°
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Deflection Angle:
              </strong>{" "}
              {results.deflectionAngle}°
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Tangent Length:
              </strong>{" "}
              {results.tangentLength} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Curve Length:
              </strong>{" "}
              {results.curveLength} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Total Curve Length:
              </strong>{" "}
              {results.totalCurveLength} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>Shift:</strong>{" "}
              {results.shift} mm
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Chainage TPTC1:
              </strong>{" "}
              {results.chainageTPTC1} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Chainage TPTC2:
              </strong>{" "}
              {results.chainageTPTC2} m
            </p>
            <p className='text-sm'>
              <strong className='font-medium text-foreground/90'>
                Status:
              </strong>{" "}
              <span
                className={results.isValid ? "text-green-600" : "text-red-600"}>
                {results.isValid ? "Ok" : "Exceeds Limits"}
              </span>
            </p>
          </div>
        </CardContent>
        <CardContent>
          <Button
            onClick={onPrintClick}
            className='w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 no-print'>
            Print as PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
