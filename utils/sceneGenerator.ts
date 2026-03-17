export type StudioSetup = {
  style: 'commercial' | 'ugc' | 'cinematic' | 'showcase' | 'lifestyle';
  focus: 'product' | 'model' | 'balanced' | 'macro' | 'wide';
  environment: 'studio' | 'cafe' | 'outdoor' | 'bedroom' | 'gym' | 'office';
  length: '5s' | '10s' | '15s' | '30s';
  activeAssets: string[];
};

export type StoryScene = {
  id: number;
  type: 'hook' | 'benefit' | 'proof' | 'cta';
  camera: string;
  action: string;
  environment: string;
  text: string;
  style: string;
  prompt: string;
};

const cameraByFocus: Record<StudioSetup['focus'], string> = {
  product: 'close up',
  model: 'medium shot',
  balanced: '3/4 shot',
  macro: 'macro detail',
  wide: 'wide establishing'
};

export function getSceneCountByLength(length: StudioSetup['length']) {
  if (length === '30s') return 6;
  if (length === '15s') return 4;
  if (length === '10s') return 3;
  return 2;
}

export function buildScenes({
  productName,
  hook,
  cta,
  sellingPoints,
  setup,
  aspectRatio
}: {
  productName: string;
  hook: string;
  cta: string;
  sellingPoints: string[];
  setup: StudioSetup;
  aspectRatio: string;
}): StoryScene[] {
  const totalScene = getSceneCountByLength(setup.length);

  return Array.from({ length: totalScene }).map((_, idx) => {
    const id = idx + 1;
    const base = {
      id,
      camera: cameraByFocus[setup.focus],
      environment: setup.environment,
      style: setup.style
    };

    if (id === 1) {
      const action = `Hero reveal ${productName} in ${setup.environment} with ${setup.style} style`;
      return {
        ...base,
        type: 'hook',
        action,
        text: hook,
        prompt: `${action}. Ratio ${aspectRatio}. Keep product shape, color, and packaging consistent.`
      };
    }

    if (id === totalScene) {
      const action = `Final hero shot + promo lockup`;
      return {
        ...base,
        type: 'cta',
        action,
        text: cta,
        prompt: `${action}. Show clear CTA text and brand logo. Ratio ${aspectRatio}.`
      };
    }

    const point = sellingPoints[(id - 2) % Math.max(1, sellingPoints.length)] ?? 'Benefit utama produk';
    return {
      ...base,
      type: id === totalScene - 1 ? 'proof' : 'benefit',
      action: `Demonstrate ${productName} usage with focus on: ${point}`,
      text: point,
      prompt: `Scene ${id}: demonstrate real usage. Camera ${base.camera}. Environment ${setup.environment}. Keep product identity fixed.`
    };
  });
}
