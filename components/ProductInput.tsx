'use client';

import { useState } from 'react';

type ProductData = {
  productName: string;
  description: string;
  targetMarket: string;
  category: string;
  productImageName?: string;
  modelImageName?: string;
};

type GeneratedCopy = {
  headline: string;
  sellingPoints: string[];
  hook: string;
  cta: string;
  script: string;
};

type Props = {
  onGenerate: (data: ProductData) => Promise<void>;
  generated: GeneratedCopy | null;
  loading: boolean;
};

export default function ProductInput({ onGenerate, generated, loading }: Props) {
  const [form, setForm] = useState<ProductData>({
    productName: '',
    description: '',
    targetMarket: '',
    category: ''
  });

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Step 1 — Product Input</h2>
      <p className="mt-1 text-sm text-slate-400">Upload aset produk + model, lalu generate copy iklan otomatis.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <UploadCard
          label="Upload Product Image"
          filename={form.productImageName}
          onChange={(name) => setForm({ ...form, productImageName: name })}
        />
        <UploadCard
          label="Upload Model Image (opsional)"
          filename={form.modelImageName}
          onChange={(name) => setForm({ ...form, modelImageName: name })}
        />
        <label className="space-y-2 text-sm">
          Product Name
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-2" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
        </label>
        <label className="space-y-2 text-sm">
          Target Market
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-2" value={form.targetMarket} onChange={(e) => setForm({ ...form, targetMarket: e.target.value })} />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          Product Description
          <textarea className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-2" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label className="space-y-2 text-sm">
          Product Category
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </label>
      </div>

      <button
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onGenerate(form)}
        disabled={loading || !form.productName}
      >
        {loading ? 'Generating...' : 'Generate Description'}
      </button>

      {generated && (
        <div className="mt-4 rounded-xl border border-emerald-700/40 bg-emerald-950/30 p-4 text-sm">
          <p className="font-semibold text-emerald-200">{generated.headline}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
            {generated.sellingPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-2"><span className="text-emerald-300">Hook:</span> {generated.hook}</p>
          <p><span className="text-emerald-300">CTA:</span> {generated.cta}</p>
        </div>
      )}
    </section>
  );
}

function UploadCard({ label, filename, onChange }: { label: string; filename?: string; onChange: (name?: string) => void }) {
  return (
    <label className="space-y-2 text-sm">
      {label}
      <div className="grid-bg rounded-xl border border-dashed border-slate-700 bg-slate-950/70 p-4">
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70 p-2 text-xs"
          onChange={(e) => onChange(e.target.files?.[0]?.name)}
        />
        <p className="mt-2 text-xs text-slate-400">{filename ? `Selected: ${filename}` : 'No file selected'}</p>
      </div>
    </label>
  );
}
