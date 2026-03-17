import { createPromptFromProduct, buildAffiliateScriptPrompt } from './prompt';

export async function generateProductInfo(productData) {
  const prompt = createPromptFromProduct(productData);

  // Placeholder OpenAI/Gemini call.
  // In production, replace with actual API integration and structured output validation.
  return {
    headline: `${productData.productName || 'Produk Affiliate'} untuk ${productData.targetMarket || 'semua audience'}`,
    sellingPoints: [
      'Mudah digunakan untuk konten harian',
      'Visual produk tetap konsisten antar scene',
      'Cocok untuk short-form video ads',
    ],
    hook: 'Masih pakai produk biasa tanpa hasil cepat?',
    callToAction: 'Order sekarang dan rasakan bedanya.',
    script: `AI Script:\n${prompt}`,
  };
}

export async function generateAffiliateScripts({ productName, benefits, targetMarket }) {
  const prompt = buildAffiliateScriptPrompt({
    productName,
    benefits,
    targetMarket,
    offer: 'Promo terbatas + gratis ongkir',
  });

  // Placeholder response to represent multi-platform script generation.
  return {
    prompt,
    scripts: {
      tiktok: `Hook cepat: "${productName} ini bikin hidup lebih gampang!"\nCTA: Klik keranjang kuning sekarang!`,
      shopee: `Highlight benefit: ${(benefits || []).join(', ')}\nCTA: Checkout sekarang sebelum promo habis.`,
      instagram: `Lifestyle angle untuk ${targetMarket}.\nCTA: Save dulu, lalu order via link bio.`,
      youtubeShorts: `Problem → solution dengan ${productName}.\nCTA: Cek deskripsi dan langsung order.`,
    },
  };
}
