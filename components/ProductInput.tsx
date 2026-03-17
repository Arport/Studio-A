'use client';

import { useState } from 'react';
import { generateProductInfo, generateAffiliateScripts } from '../lib/ai';

export interface ProductInputData {
  productImage?: File | null;
  modelImage?: File | null;
  productName: string;
  description: string;
  targetMarket: string;
  category: string;
  aiOutput?: {
    headline: string;
    sellingPoints: string[];
    hook: string;
    callToAction: string;
    script: string;
  };
}

export function ProductInput({
  onContinue,
}: {
  onContinue: (data: ProductInputData) => void;
}) {
  const [form, setForm] = useState<ProductInputData>({
    productImage: null,
    modelImage: null,
    productName: '',
    description: '',
    targetMarket: '',
    category: '',
  });
  const [affiliateScripts, setAffiliateScripts] = useState<Record<string, string> | null>(null);

  const handleGenerateDescription = async () => {
    const aiOutput = await generateProductInfo(form);
    setForm((prev) => ({ ...prev, aiOutput, description: aiOutput.script }));
  };

  const handleGenerateAffiliateScripts = async () => {
    const result = await generateAffiliateScripts({
      productName: form.productName,
      benefits: form.aiOutput?.sellingPoints || [],
      targetMarket: form.targetMarket,
    });
    setAffiliateScripts(result.scripts);
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Step 1 — Product Input</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          Upload Product Image
          <input
            type="file"
            accept="image/*"
            className="block w-full rounded border border-slate-700 bg-slate-950 p-2"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, productImage: e.target.files?.[0] ?? null }))
            }
          />
        </label>

        <label className="space-y-2 text-sm">
          Upload Model Image (opsional)
          <input
            type="file"
            accept="image/*"
            className="block w-full rounded border border-slate-700 bg-slate-950 p-2"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, modelImage: e.target.files?.[0] ?? null }))
            }
          />
        </label>

        <label className="space-y-2 text-sm">
          Product Name
          <input
            value={form.productName}
            onChange={(e) => setForm((prev) => ({ ...prev, productName: e.target.value }))}
            className="w-full rounded border border-slate-700 bg-slate-950 p-2"
          />
        </label>

        <label className="space-y-2 text-sm">
          Product Category
          <input
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full rounded border border-slate-700 bg-slate-950 p-2"
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          Product Description
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full rounded border border-slate-700 bg-slate-950 p-2"
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          Target Market
          <input
            value={form.targetMarket}
            onChange={(e) => setForm((prev) => ({ ...prev, targetMarket: e.target.value }))}
            className="w-full rounded border border-slate-700 bg-slate-950 p-2"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleGenerateDescription}
          className="rounded bg-slate-700 px-4 py-2 text-sm font-medium"
        >
          Generate Description (AI)
        </button>
        <button
          onClick={handleGenerateAffiliateScripts}
          className="rounded bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Generate Affiliate Scripts
        </button>
        <button
          onClick={() => onContinue(form)}
          className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Continue ke Studio Setup
        </button>
      </div>

      {form.aiOutput && (
        <div className="mt-6 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
          <p className="font-semibold">AI Output</p>
          <p className="mt-2">Headline: {form.aiOutput.headline}</p>
          <p>Hook: {form.aiOutput.hook}</p>
          <p>CTA: {form.aiOutput.callToAction}</p>
        </div>
      )}

      {affiliateScripts && (
        <div className="mt-4 rounded-lg border border-indigo-500/40 bg-indigo-500/10 p-4 text-xs space-y-2">
          <p className="font-semibold text-sm">Affiliate Script Generator</p>
          {Object.entries(affiliateScripts).map(([platform, script]) => (
            <div key={platform}>
              <p className="font-medium uppercase">{platform}</p>
              <p>{script}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
