'use client';

import { useState } from 'react';

type ProductData = {
  productName: string;
  description: string;
  targetMarket: string;
  category: string;
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
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Step 1 — Product Input</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          Product Name
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
        </label>
        <label className="space-y-2 text-sm">
          Target Market
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2" value={form.targetMarket} onChange={(e) => setForm({ ...form, targetMarket: e.target.value })} />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          Product Description
          <textarea className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label className="space-y-2 text-sm">
          Product Category
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
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
        <div className="mt-4 rounded-lg border border-emerald-700/40 bg-emerald-950/40 p-4 text-sm">
          <p className="font-semibold">{generated.headline}</p>
          <p className="mt-2">Hook: {generated.hook}</p>
          <p>CTA: {generated.cta}</p>
        </div>
      )}
    </section>
  );
}
