'use client';

import { useState } from 'react';

export interface StoryboardSettings {
  aspectRatio: '9:16' | '1:1' | '16:9' | '4:5';
}

export function StoryboardGenerator({
  onBack,
  onGenerate,
}: {
  onBack: () => void;
  onGenerate: (settings: StoryboardSettings) => void;
}) {
  const [settings, setSettings] = useState<StoryboardSettings>({ aspectRatio: '9:16' });

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Step 3 — Storyboard Generator</h2>
      <p className="mt-1 text-sm text-slate-300">Pilih aspect ratio lalu generate storyboard otomatis.</p>

      <div className="mt-4 grid gap-2 md:grid-cols-4">
        {(['9:16', '1:1', '16:9', '4:5'] as const).map((ratio) => (
          <button
            key={ratio}
            onClick={() => setSettings({ aspectRatio: ratio })}
            className={`rounded border px-3 py-2 text-sm ${
              settings.aspectRatio === ratio
                ? 'border-emerald-400 bg-emerald-500/10'
                : 'border-slate-700 bg-slate-800'
            }`}
          >
            {ratio}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={onBack} className="rounded bg-slate-700 px-4 py-2 text-sm">
          Back
        </button>
        <button
          onClick={() => onGenerate(settings)}
          className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Generate Storyboard
        </button>
      </div>
    </section>
  );
}
