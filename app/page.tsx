'use client';

import { useMemo, useState } from 'react';
import ProductInput from '@/components/ProductInput';
import StudioSetup from '@/components/StudioSetup';
import StoryboardGenerator from '@/components/StoryboardGenerator';
import StoryboardResult from '@/components/StoryboardResult';
import { generateAffiliateScripts, generateProductInsights } from '@/lib/ai';
import { buildConsistencyNotes, buildPromptJson, optimizeVideoPrompt } from '@/lib/prompt';
import {
  buildPromptFile,
  downloadJson,
  downloadSceneImage,
  downloadStoryboardPdfLike,
  downloadText
} from '@/utils/export';
import { buildScenes, getSceneCountByLength, type StoryScene, type StudioSetup } from '@/utils/sceneGenerator';

const steps = ['Product Input', 'Studio Setup', 'Storyboard', 'Edit + Download'];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    targetMarket: '',
    category: '',
    productImageName: '',
    modelImageName: ''
  });
  const [generated, setGenerated] = useState<null | {
    headline: string;
    sellingPoints: string[];
    hook: string;
    cta: string;
    script: string;
  }>(null);
  const [scripts, setScripts] = useState<Record<string, string>>({});
  const [setup, setSetup] = useState<StudioSetup>({
    style: 'commercial',
    focus: 'product',
    environment: 'studio',
    length: '15s',
    activeAssets: ['product']
  });
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [scenes, setScenes] = useState<StoryScene[]>([]);

  const ready = useMemo(() => Boolean(generated && product.productName), [generated, product.productName]);
  const consistencyNotes = useMemo(
    () =>
      buildConsistencyNotes({
        productName: product.productName,
        targetMarket: product.targetMarket,
        category: product.category,
        environment: setup.environment
      }),
    [product.productName, product.targetMarket, product.category, setup.environment]
  );

  const handleGenerateProduct = async (input: typeof product) => {
    setLoading(true);
    setProduct(input);
    const data = await generateProductInsights(input);
    setGenerated(data);
    setScripts(
      generateAffiliateScripts({
        productName: input.productName,
        targetMarket: input.targetMarket,
        hook: data.hook,
        cta: data.cta
      })
    );
    setLoading(false);
  };

  const handleGenerateStoryboard = () => {
    if (!generated) return;
    const rawScenes = buildScenes({
      productName: product.productName,
      hook: generated.hook,
      cta: generated.cta,
      sellingPoints: generated.sellingPoints,
      setup,
      aspectRatio
    });

    const optimized = rawScenes.map((scene) => ({
      ...scene,
      prompt: optimizeVideoPrompt({
        productName: product.productName,
        scene,
        setup,
        consistencyNotes
      })
    }));

    setScenes(optimized);
  };

  const regenerateScene = (sceneId: number) => {
    setScenes((prev) =>
      prev.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              action: `${scene.action} (new variant ${Math.floor(Math.random() * 99)})`
            }
          : scene
      )
    );
  };

  const handleEditPrompt = (sceneId: number, prompt: string) => {
    setScenes((prev) => prev.map((scene) => (scene.id === sceneId ? { ...scene, prompt } : scene)));
  };

  const handleDownloadPrompt = () => {
    if (!generated) return;
    const prompt = buildPromptFile({
      productName: product.productName,
      script: generated.script,
      scenes,
      consistencyNotes
    });
    downloadText('affiliate-ai-prompt.txt', prompt);
  };

  const handleDownloadJson = () => {
    downloadJson('affiliate-ai-prompt.json', buildPromptJson({ product, setup, scenes }));
  };

  const handleDownloadPdf = () => {
    const body = [
      `<h1>Storyboard - ${product.productName}</h1>`,
      ...scenes.map(
        (scene) =>
          `<div class="scene"><h3>Scene ${scene.id}</h3><p>${scene.action}</p><p><b>Camera:</b> ${scene.camera}</p><p><b>Prompt:</b> ${scene.prompt}</p></div>`
      )
    ].join('');

    downloadStoryboardPdfLike({ title: 'affiliate-storyboard-pdf', htmlBody: body });
  };

  const handleDownloadSceneImage = (sceneId: number) => {
    const scene = scenes.find((item) => item.id === sceneId);
    if (!scene) return;
    downloadSceneImage(scene);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 md:p-8">
      <header className="glass grid-bg overflow-hidden rounded-3xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">Studio-A Toolkit</p>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">Affiliate AI Generator</h1>
            <p className="mt-2 max-w-2xl text-slate-300">Bangun materi iklan affiliate lebih cepat: upload produk, generate copy, atur studio visual, buat storyboard, lalu export aset.</p>
          </div>
          <div className="glass rounded-2xl p-4 text-sm">
            <p className="text-slate-300">Current Setup</p>
            <p className="font-semibold">{setup.style} • {setup.environment} • {setup.length}</p>
            <p className="text-xs text-slate-400">Aspect ratio {aspectRatio}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-2 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step} className="glass rounded-xl p-3 text-xs">
              <p className="text-slate-400">Step {idx + 1}</p>
              <p className="font-medium">{step}</p>
            </div>
          ))}
        </div>
      </header>

      <ProductInput onGenerate={handleGenerateProduct} generated={generated} loading={loading} />
      <StudioSetup setup={setup} onChange={setSetup} />
      <StoryboardGenerator
        aspectRatio={aspectRatio}
        sceneCount={getSceneCountByLength(setup.length)}
        onAspectRatioChange={setAspectRatio}
        onGenerate={handleGenerateStoryboard}
        disabled={!ready}
      />
      <StoryboardResult
        scenes={scenes}
        scripts={scripts}
        onRegenerate={regenerateScene}
        onEditPrompt={handleEditPrompt}
        onDownloadPrompt={handleDownloadPrompt}
        onDownloadJson={handleDownloadJson}
        onDownloadPdf={handleDownloadPdf}
        onDownloadImage={handleDownloadSceneImage}
      />
    </main>
  );
}
