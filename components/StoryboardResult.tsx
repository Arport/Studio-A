'use client';

import { useState } from 'react';
import { ProductInputData } from './ProductInput';
import { StudioSetupData } from './StudioSetup';
import { SceneData } from '../utils/sceneGenerator';
import { buildVideoPrompt } from '../lib/prompt';
import { exportStoryboardPdf, exportPromptFile } from '../utils/export';

export function StoryboardResult({
  scenes,
  productData,
  studioData,
  onBack,
}: {
  scenes: SceneData[];
  productData: ProductInputData | null;
  studioData: StudioSetupData | null;
  onBack: () => void;
}) {
  const [editedScenes, setEditedScenes] = useState(scenes);

  const regenerateScene = (id: number) => {
    setEditedScenes((prev) =>
      prev.map((scene) =>
        scene.id === id
          ? {
              ...scene,
              text: `${scene.text} (regenerated)`,
            }
          : scene,
      ),
    );
  };

  const updatePrompt = (id: number, prompt: string) => {
    setEditedScenes((prev) => prev.map((scene) => (scene.id === id ? { ...scene, prompt } : scene)));
  };

  const compiledPrompt = editedScenes
    .map((scene) => buildVideoPrompt({ productData, studioData, scene }))
    .join('\n\n');

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Step 4 — Storyboard Result</h2>
      <p className="mt-1 text-sm text-slate-300">Regenerate scene, edit prompt, lalu download hasil.</p>

      <div className="mt-5 space-y-4">
        {editedScenes.map((scene) => (
          <article key={scene.id} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="font-semibold">Scene {scene.id}</p>
            <p className="text-sm text-slate-300">
              {scene.type} · {scene.camera} · {scene.environment}
            </p>
            <p className="mt-2 text-sm">{scene.text}</p>
            <textarea
              value={scene.prompt}
              onChange={(e) => updatePrompt(scene.id, e.target.value)}
              rows={4}
              className="mt-2 w-full rounded border border-slate-700 bg-slate-900 p-2 text-xs"
            />
            <button
              onClick={() => regenerateScene(scene.id)}
              className="mt-2 rounded bg-slate-700 px-3 py-1 text-xs"
            >
              Regenerate Scene
            </button>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button onClick={onBack} className="rounded bg-slate-700 px-4 py-2 text-sm">
          Back
        </button>
        <button
          onClick={() => exportStoryboardPdf(editedScenes)}
          className="rounded bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Download Storyboard PDF
        </button>
        <button
          onClick={() => exportPromptFile(compiledPrompt)}
          className="rounded bg-violet-500 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Download Prompt Script
        </button>
      </div>
    </section>
  );
}
