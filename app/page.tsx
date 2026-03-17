'use client';

import { useMemo, useState } from 'react';
import { ProductInput, ProductInputData } from '../components/ProductInput';
import { StudioSetup, StudioSetupData } from '../components/StudioSetup';
import {
  StoryboardGenerator,
  StoryboardSettings,
} from '../components/StoryboardGenerator';
import { StoryboardResult } from '../components/StoryboardResult';
import { generateStoryboardScenes } from '../utils/sceneGenerator';

const stepLabels = [
  '1. Product Input',
  '2. Studio Setup',
  '3. Storyboard Generator',
  '4. Scene Edit + Download',
];

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState<ProductInputData | null>(null);
  const [studioData, setStudioData] = useState<StudioSetupData | null>(null);
  const [storyboardSettings, setStoryboardSettings] = useState<StoryboardSettings | null>(null);

  const scenes = useMemo(() => {
    if (!productData || !studioData || !storyboardSettings) return [];
    return generateStoryboardScenes({
      product: productData,
      studio: studioData,
      settings: storyboardSettings,
    });
  }, [productData, studioData, storyboardSettings]);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-bold">Affiliate AI Generator</h1>
          <p className="mt-2 text-sm text-slate-300">
            End-to-end workflow untuk upload produk, setup studio, generate storyboard, edit scene,
            dan export ke image/PDF/prompt.
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {stepLabels.map((label, i) => {
              const stepNumber = i + 1;
              const isActive = stepNumber === currentStep;
              const isDone = stepNumber < currentStep;

              return (
                <button
                  key={label}
                  onClick={() => setCurrentStep(stepNumber)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? 'border-emerald-400 bg-emerald-500/10'
                      : isDone
                        ? 'border-sky-400 bg-sky-500/10'
                        : 'border-slate-700 bg-slate-800/80'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </header>

        {currentStep === 1 && (
          <ProductInput
            onContinue={(data) => {
              setProductData(data);
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <StudioSetup
            onBack={() => setCurrentStep(1)}
            onContinue={(data) => {
              setStudioData(data);
              setCurrentStep(3);
            }}
          />
        )}

        {currentStep === 3 && (
          <StoryboardGenerator
            onBack={() => setCurrentStep(2)}
            onGenerate={(settings) => {
              setStoryboardSettings(settings);
              setCurrentStep(4);
            }}
          />
        )}

        {currentStep === 4 && (
          <StoryboardResult
            scenes={scenes}
            productData={productData}
            studioData={studioData}
            onBack={() => setCurrentStep(3)}
          />
        )}
      </div>
    </main>
  );
}
