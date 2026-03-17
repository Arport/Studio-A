export async function generateProductInsights(input) {
  const fallback = {
    headline: `${input.productName} untuk ${input.targetMarket}`,
    sellingPoints: [
      'Hasil cepat dan mudah digunakan',
      'Cocok untuk konten short-form affiliate',
      'Visual produk tetap konsisten lintas scene'
    ],
    hook: `Masih belum coba ${input.productName}?`,
    cta: 'Order sekarang sebelum promo habis!',
    script: `Hook dalam 3 detik, lanjut demo pemakaian, tutup dengan CTA kuat untuk ${input.targetMarket}.`
  };

  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return fallback;
  }

  return fallback;
}
