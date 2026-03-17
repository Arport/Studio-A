'use client';

import { useState } from 'react';

export interface StudioSetupData {
  assets: {
    productImage: boolean;
    model: boolean;
    logo: boolean;
    background: boolean;
    props: boolean;
  };
  style: 'commercial' | 'ugc' | 'cinematic' | 'product-showcase' | 'lifestyle';
  focus: 'product' | 'model' | 'balanced' | 'macro' | 'wide';
  environment: 'studio' | 'cafe' | 'outdoor' | 'bedroom' | 'gym' | 'office';
  length: '5s' | '10s' | '15s' | '30s';
}

const defaultSetup: StudioSetupData = {
  assets: {
    productImage: true,
    model: false,
    logo: false,
    background: true,
    props: false,
  },
  style: 'commercial',
  focus: 'product',
  environment: 'studio',
  length: '15s',
};

export function StudioSetup({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: (data: StudioSetupData) => void;
}) {
  const [setup, setSetup] = useState<StudioSetupData>(defaultSetup);

  const toggleAsset = (key: keyof StudioSetupData['assets']) => {
    setSetup((prev) => ({
      ...prev,
      assets: { ...prev.assets, [key]: !prev.assets[key] },
    }));
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Step 2 — Studio Setup</h2>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm font-semibold">Active Assets</p>
          {Object.entries(setup.assets).map(([key, active]) => (
            <button
              key={key}
              onClick={() => toggleAsset(key as keyof StudioSetupData['assets'])}
              className={`mr-2 mt-2 rounded px-3 py-1 text-xs capitalize ${
                active ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm">
          <label className="block space-y-1">
            Visual Direction
            <select
              value={setup.style}
              onChange={(e) =>
                setSetup((prev) => ({ ...prev, style: e.target.value as StudioSetupData['style'] }))
              }
              className="w-full rounded border border-slate-700 bg-slate-900 p-2"
            >
              <option value="commercial">Commercial Ads</option>
              <option value="ugc">UGC</option>
              <option value="cinematic">Cinematic</option>
              <option value="product-showcase">Product Showcase</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </label>

          <label className="block space-y-1">
            Composition Focus
            <select
              value={setup.focus}
              onChange={(e) =>
                setSetup((prev) => ({ ...prev, focus: e.target.value as StudioSetupData['focus'] }))
              }
              className="w-full rounded border border-slate-700 bg-slate-900 p-2"
            >
              <option value="product">Product Focus</option>
              <option value="model">Model Focus</option>
              <option value="balanced">Balanced</option>
              <option value="macro">Macro Detail</option>
              <option value="wide">Wide Shot</option>
            </select>
          </label>

          <label className="block space-y-1">
            Environment
            <select
              value={setup.environment}
              onChange={(e) =>
                setSetup((prev) => ({
                  ...prev,
                  environment: e.target.value as StudioSetupData['environment'],
                }))
              }
              className="w-full rounded border border-slate-700 bg-slate-900 p-2"
            >
              <option value="studio">Studio</option>
              <option value="cafe">Cafe</option>
              <option value="outdoor">Outdoor</option>
              <option value="bedroom">Bedroom</option>
              <option value="gym">Gym</option>
              <option value="office">Office</option>
            </select>
          </label>

          <label className="block space-y-1">
            Output Length
            <select
              value={setup.length}
              onChange={(e) =>
                setSetup((prev) => ({ ...prev, length: e.target.value as StudioSetupData['length'] }))
              }
              className="w-full rounded border border-slate-700 bg-slate-900 p-2"
            >
              <option value="5s">5s</option>
              <option value="10s">10s</option>
              <option value="15s">15s</option>
              <option value="30s">30s</option>
            </select>
          </label>
        </div>
      </div>

      <pre className="mt-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
        {JSON.stringify(
          {
            style: setup.style,
            focus: setup.focus,
            environment: setup.environment,
            length: setup.length,
          },
          null,
          2,
        )}
      </pre>

      <div className="mt-4 flex gap-2">
        <button onClick={onBack} className="rounded bg-slate-700 px-4 py-2 text-sm">
          Back
        </button>
        <button
          onClick={() => onContinue(setup)}
          className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Continue ke Storyboard Generator
        </button>
      </div>
    </section>
  );
}
