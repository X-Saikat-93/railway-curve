"use client";

import { useState } from "react";
import Form from "@/components/form";
import Results from "@/components/Results";
import {
  calculateRailwayCurve,
  CurveInputs,
  CurveResults,
} from "@/lib/calculation";

export default function Home() {
  const [results, setResults] = useState<CurveResults | null>(null);

  const handleFormSubmit = (inputs: CurveInputs) => {
    const calculated = calculateRailwayCurve(inputs);
    setResults(calculated);
  };

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h1 className='text-4xl sm:text-5xl font-bold text-center text-foreground mb-12 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tracking-tight'>
        Railway Curve Calculator
      </h1>
      <Form onSubmit={handleFormSubmit} />
      {results && <Results results={results} />}
    </div>
  );
}
