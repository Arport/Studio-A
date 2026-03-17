export function createPromptFromProduct(productData) {
  return `You are a professional affiliate marketer.\n\nAnalyze this product and generate:\n- Product title\n- Short description\n- 3 selling points\n- Hook for advertisement\n- Call to action\n\nProduct Name: ${productData.productName || '-'}\nDescription: ${productData.description || '-'}\nTarget Market: ${productData.targetMarket || '-'}\nCategory: ${productData.category || '-'}\n\nOutput in structured format.`;
}

export function buildVideoPrompt({ productData, studioData, scene }) {
  return `Create a ${studioData?.style || 'commercial'} advertisement video.\n\nProduct:\n${productData?.productName || 'N/A'}\n\nScene:\n${scene.action}\n\nEnvironment:\n${scene.environment}\n\nLighting:\nBalanced key light\n\nCamera:\n${scene.camera}\n\nStyle:\n${studioData?.style || 'commercial'}\n\nText Overlay:\n${scene.text}`;
}
