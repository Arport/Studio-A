'use client';

type Scene = {
  id: number;
  type: string;
  camera: string;
  action: string;
  environment: string;
  text: string;
};

type Props = {
  scenes: Scene[];
  onRegenerate: (sceneId: number) => void;
  onDownloadPrompt: () => void;
};

export default function StoryboardResult({ scenes, onRegenerate, onDownloadPrompt }: Props) {
  if (!scenes.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Step 4 — Scene Edit + Download</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {scenes.map((scene) => (
          <article key={scene.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <h3 className="font-semibold">Scene {scene.id}</h3>
            <p className="mt-1 text-sm text-slate-300">{scene.action}</p>
            <p className="mt-1 text-xs text-slate-400">Camera: {scene.camera}</p>
            <p className="text-xs text-slate-400">Text: {scene.text}</p>
            <button className="mt-3 rounded-lg border border-slate-600 px-3 py-1 text-sm hover:bg-slate-800" onClick={() => onRegenerate(scene.id)}>
              Regenerate
            </button>
          </article>
        ))}
      </div>
      <button onClick={onDownloadPrompt} className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 font-medium hover:bg-emerald-400">
        Download Prompt Script
      </button>
    </section>
  );
}
