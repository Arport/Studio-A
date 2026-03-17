'use client';

type Setup = {
  style: 'commercial' | 'ugc' | 'cinematic' | 'showcase' | 'lifestyle';
  focus: 'product' | 'model' | 'balanced' | 'macro';
  environment: 'studio' | 'cafe' | 'outdoor' | 'bedroom' | 'gym' | 'office';
  length: '5s' | '10s' | '15s' | '30s';
};

type Props = {
  setup: Setup;
  onChange: (setup: Setup) => void;
};

export default function StudioSetup({ setup, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Step 2 — Studio Setup</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Select label="Visual Direction" value={setup.style} onValue={(value) => onChange({ ...setup, style: value as Setup['style'] })} options={['commercial', 'ugc', 'cinematic', 'showcase', 'lifestyle']} />
        <Select label="Composition Focus" value={setup.focus} onValue={(value) => onChange({ ...setup, focus: value as Setup['focus'] })} options={['product', 'model', 'balanced', 'macro']} />
        <Select label="Environment" value={setup.environment} onValue={(value) => onChange({ ...setup, environment: value as Setup['environment'] })} options={['studio', 'cafe', 'outdoor', 'bedroom', 'gym', 'office']} />
        <Select label="Output Length" value={setup.length} onValue={(value) => onChange({ ...setup, length: value as Setup['length'] })} options={['5s', '10s', '15s', '30s']} />
      </div>
      <pre className="mt-4 rounded-lg bg-slate-950 p-3 text-xs text-slate-300">{JSON.stringify(setup, null, 2)}</pre>
    </section>
  );
}

function Select({ label, value, onValue, options }: { label: string; value: string; onValue: (value: string) => void; options: string[] }) {
  return (
    <label className="space-y-2 text-sm">
      {label}
      <select className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2" value={value} onChange={(e) => onValue(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
