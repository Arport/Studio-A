'use client';

type Scene = {
  id: number;
  type: string;
  camera: string;
  action: string;
  environment: string;
  text: string;
  prompt: string;
};

type Props = {
  scenes: Scene[];
  scripts: Record<string, string>;
  onRegenerate: (sceneId: number) => void;
  onEditPrompt: (sceneId: number, prompt: string) => void;
  onDownloadPrompt: () => void;
  onDownloadJson: () => void;
  onDownloadPdf: () => void;
  onDownloadImage: (sceneId: number) => void;
};

export default function StoryboardResult({
  scenes,
  scripts,
  onRegenerate,
  onEditPrompt,
  onDownloadPrompt,
  onDownloadJson,
  onDownloadPdf,
  onDownloadImage
}: Props) {
  if (!scenes.length) {
    return null;
  }

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Step 4 — Scene Edit + Download</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {scenes.map((scene) => (
          <article key={scene.id} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
            <div className="grid-bg flex h-36 items-end justify-between bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-emerald-500/10 p-4">
              <div>
                <p className="text-xs text-slate-300">Scene {scene.id}</p>
                <p className="text-sm font-medium capitalize">{scene.type}</p>
              </div>
              <span className="rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[10px]">{scene.environment}</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-300">{scene.action}</p>
              <p className="mt-1 text-xs text-slate-400">Camera: {scene.camera}</p>
              <p className="text-xs text-slate-400">Text: {scene.text}</p>
              <textarea
                value={scene.prompt}
                onChange={(e) => onEditPrompt(scene.id, e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-lg border border-slate-600 px-3 py-1 text-sm hover:bg-slate-800" onClick={() => onRegenerate(scene.id)}>
                  Regenerate
                </button>
                <button className="rounded-lg border border-sky-600 px-3 py-1 text-sm hover:bg-sky-900/40" onClick={() => onDownloadImage(scene.id)}>
                  Download Image
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-xl border border-slate-700 bg-slate-950 p-4 md:grid-cols-2">
        {Object.entries(scripts).map(([platform, script]) => (
          <div key={platform} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-sm font-semibold uppercase text-slate-300">{platform}</p>
            <p className="text-xs text-slate-400">{script}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onDownloadPrompt} className="rounded-lg bg-emerald-500 px-4 py-2 font-medium hover:bg-emerald-400">
          Download Prompt TXT
        </button>
        <button onClick={onDownloadJson} className="rounded-lg bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">
          Download Prompt JSON
        </button>
        <button onClick={onDownloadPdf} className="rounded-lg bg-amber-500 px-4 py-2 font-medium hover:bg-amber-400">
          Download Storyboard PDF
        </button>
      </div>
    </section>
  );
}
