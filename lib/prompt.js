export function createPromptFromProduct(productData) {
  return `You are a professional affiliate marketer.\n\nAnalyze this product and generate:\n- Product title\n- Short description\n- 3 selling points\n- Hook for advertisement\n- Call to action\n\nProduct Name: ${productData.productName || '-'}\nDescription: ${productData.description || '-'}\nTarget Market: ${productData.targetMarket || '-'}\nCategory: ${productData.category || '-'}\n\nOutput in structured format.`;
}

export function optimizeScenePrompt(basePrompt, { style, focus, environment }) {
  return `${basePrompt}\n\nOptimization Rules:\n- Keep visual consistency across all scenes\n- Style: ${style || 'commercial'}\n- Focus: ${focus || 'product'}\n- Environment: ${environment || 'studio'}\n- Preserve same product identity and logo placement`;
}

export function buildVideoPrompt({ productData, studioData, scene }) {
  const basePrompt = `Create a ${studioData?.style || 'commercial'} advertisement video.\n\nProduct:\n${productData?.productName || 'N/A'}\n\nScene:\n${scene.action}\n\nEnvironment:\n${scene.environment}\n\nLighting:\nBalanced key light\n\nCamera:\n${scene.camera}\n\nStyle:\n${studioData?.style || 'commercial'}\n\nText Overlay:\n${scene.text}`;

  return optimizeScenePrompt(basePrompt, {
    style: studioData?.style,
    focus: studioData?.focus,
    environment: studioData?.environment,
  });
}

export function buildAffiliateScriptPrompt({ productName, benefits, targetMarket, offer }) {
  return `You are an affiliate content strategist.\nGenerate scripts for:\n- TikTok\n- Shopee Video\n- Instagram Reels\n- YouTube Shorts\n\nInput:\nProduct Name: ${productName || '-'}\nBenefits: ${(benefits || []).join(', ') || '-'}\nTarget Market: ${targetMarket || '-'}\nOffer: ${offer || '-'}\n\nReturn in markdown with CTA for each platform.`;
}
