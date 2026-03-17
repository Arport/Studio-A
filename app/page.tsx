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
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 p-4 md:p-8">
      <header className="rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-fuchsia-500/10 p-6">
        <h1 className="text-3xl font-bold">Studio-A · Affiliate AI Generator</h1>
        <p className="mt-2 text-slate-300">Aplikasi untuk membantu affiliate marketer membuat materi iklan AI cepat, konsisten, dan reusable.</p>
        <p className="text-xs text-slate-400">Flow: Upload → AI Info → Setup → Storyboard → Edit → Download</p>
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
