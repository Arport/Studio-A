'use client';

type Props = {
  aspectRatio: string;
  sceneCount: number;
  onAspectRatioChange: (ratio: string) => void;
  onGenerate: () => void;
  disabled?: boolean;
};

export default function StoryboardGenerator({ aspectRatio, sceneCount, onAspectRatioChange, onGenerate, disabled }: Props) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Step 3 — Storyboard Generator</h2>
      <p className="mt-1 text-sm text-slate-400">Smart Scene Generator akan menyesuaikan jumlah scene berdasar durasi.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {['9:16', '1:1', '16:9', '4:5'].map((ratio) => (
          <button
            key={ratio}
            className={`rounded-full border px-3 py-1 text-sm ${aspectRatio === ratio ? 'border-blue-400 bg-blue-500/20' : 'border-slate-700'}`}
            onClick={() => onAspectRatioChange(ratio)}
          >
            {ratio}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-400">Estimasi scene: {sceneCount}</p>
      <button className="mt-4 rounded-lg bg-fuchsia-500 px-4 py-2 font-medium hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50" onClick={onGenerate} disabled={disabled}>
        Generate Storyboard
      </button>
    </section>
  );
}
