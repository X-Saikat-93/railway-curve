"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurveInputs } from "@/lib/calculation";

interface FormProps {
  onSubmit: (inputs: CurveInputs) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [inputs, setInputs] = useState<CurveInputs>({
    maxSpeed: 0,
    radius: 0,
    cantDeficiency: 75,
    goodsSpeed: 65,
    transitionLength: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.maxSpeed || !inputs.radius) return;
    onSubmit(inputs);
  };

  return (
    <Card className='shadow-lg border-none bg-background/90 backdrop-blur-lg transform hover:shadow-xl transition-shadow duration-300'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
          Input Parameters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label
                htmlFor='maxSpeed'
                className='text-sm font-medium text-foreground'>
                Maximum Speed (kmph)
              </Label>
              <Input
                id='maxSpeed'
                type='number'
                name='maxSpeed'
                value={inputs.maxSpeed || ""}
                onChange={handleChange}
                placeholder='e.g., 80'
                required
                className='border-muted bg-background/50 hover:bg-background focus:ring-primary focus:border-primary transition-all duration-200 rounded-md'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='radius'
                className='text-sm font-medium text-foreground'>
                Radius of Curve (m)
              </Label>
              <Input
                id='radius'
                type='number'
                name='radius'
                value={inputs.radius || ""}
                onChange={handleChange}
                placeholder='e.g., 500'
                required
                className='border-muted bg-background/50 hover:bg-background focus:ring-primary focus:border-primary transition-all duration-200 rounded-md'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='cantDeficiency'
                className='text-sm font-medium text-foreground'>
                Cant Deficiency (mm)
              </Label>
              <Input
                id='cantDeficiency'
                type='number'
                name='cantDeficiency'
                value={inputs.cantDeficiency || ""}
                onChange={handleChange}
                placeholder='Default: 75'
                className='border-muted bg-background/50 hover:bg-background focus:ring-primary focus:border-primary transition-all duration-200 rounded-md'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='goodsSpeed'
                className='text-sm font-medium text-foreground'>
                Goods Train Speed (kmph)
              </Label>
              <Input
                id='goodsSpeed'
                type='number'
                name='goodsSpeed'
                value={inputs.goodsSpeed || ""}
                onChange={handleChange}
                placeholder='Default: 65'
                className='border-muted bg-background/50 hover:bg-background focus:ring-primary focus:border-primary transition-all duration-200 rounded-md'
              />
            </div>
            <div className='space-y-2 sm:col-span-2'>
              <Label
                htmlFor='transitionLength'
                className='text-sm font-medium text-foreground'>
                Transition Length (m, optional)
              </Label>
              <Input
                id='transitionLength'
                type='number'
                name='transitionLength'
                value={inputs.transitionLength || ""}
                onChange={handleChange}
                placeholder='e.g., 80'
                className='border-muted bg-background/50 hover:bg-background focus:ring-primary focus:border-primary transition-all duration-200 rounded-md'
              />
            </div>
          </div>
          <Button
            type='submit'
            className='w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
            Calculate
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
