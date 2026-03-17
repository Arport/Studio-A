'use client';

import { useMemo, useState } from 'react';
import ProductInput from '@/components/ProductInput';
import StudioSetup from '@/components/StudioSetup';
import StoryboardGenerator from '@/components/StoryboardGenerator';
import StoryboardResult from '@/components/StoryboardResult';
import { generateProductInsights } from '@/lib/ai';
import { buildPromptFile, downloadText } from '@/utils/export';
import { buildScenes } from '@/utils/sceneGenerator';

type Setup = {
  style: 'commercial' | 'ugc' | 'cinematic' | 'showcase' | 'lifestyle';
  focus: 'product' | 'model' | 'balanced' | 'macro';
  environment: 'studio' | 'cafe' | 'outdoor' | 'bedroom' | 'gym' | 'office';
  length: '5s' | '10s' | '15s' | '30s';
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    targetMarket: '',
    category: ''
  });
  const [generated, setGenerated] = useState<null | {
    headline: string;
    sellingPoints: string[];
    hook: string;
    cta: string;
    script: string;
  }>(null);
  const [setup, setSetup] = useState<Setup>({
    style: 'commercial',
    focus: 'product',
    environment: 'studio',
    length: '15s'
  });
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [scenes, setScenes] = useState<any[]>([]);

  const ready = useMemo(() => Boolean(generated && product.productName), [generated, product.productName]);

  const handleGenerateProduct = async (input: typeof product) => {
    setLoading(true);
    setProduct(input);
    const data = await generateProductInsights(input);
    setGenerated(data);
    setLoading(false);
  };

  const handleGenerateStoryboard = () => {
    if (!generated) return;
    setScenes(
      buildScenes({
        productName: product.productName,
        hook: generated.hook,
        cta: generated.cta,
        environment: setup.environment,
        focus: setup.focus,
        style: setup.style,
        length: setup.length
      })
    );
  };

  const regenerateScene = (sceneId: number) => {
    setScenes((prev) =>
      prev.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              action: `${scene.action} (alt variation ${Math.floor(Math.random() * 99)})`
            }
          : scene
      )
    );
  };

  const handleDownloadPrompt = () => {
    if (!generated) return;
    const prompt = buildPromptFile({
      productName: product.productName,
      script: generated.script,
      scenes
    });
    downloadText('affiliate-ai-prompt.txt', prompt);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 p-4 md:p-8">
      <header className="rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-fuchsia-500/10 p-6">
        <h1 className="text-3xl font-bold">Affiliate AI Generator</h1>
        <p className="mt-2 text-slate-300">Flow: Product Input → Studio Setup → Storyboard Generator → Scene Edit + Download</p>
        <p className="text-xs text-slate-400">Aspect ratio aktif: {aspectRatio}</p>
      </header>

      <ProductInput onGenerate={handleGenerateProduct} generated={generated} loading={loading} />
      <StudioSetup setup={setup} onChange={setSetup} />
      <StoryboardGenerator aspectRatio={aspectRatio} onAspectRatioChange={setAspectRatio} onGenerate={handleGenerateStoryboard} disabled={!ready} />
      <StoryboardResult scenes={scenes} onRegenerate={regenerateScene} onDownloadPrompt={handleDownloadPrompt} />
    </main>
  );
}
