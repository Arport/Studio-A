import { createPromptFromProduct } from './prompt';

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
