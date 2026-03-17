function buildSellingPoints(name, category) {
  return [
    `${name} memberi hasil cepat untuk kebutuhan ${category || 'harian'}`,
    `Mudah dipakai di konten short video affiliate`,
    `Tampilan produk konsisten untuk membangun trust audiens`
  ];
}

export async function generateProductInsights(input) {
  const sellingPoints = buildSellingPoints(input.productName, input.category);

  const fallback = {
    headline: `${input.productName} — Solusi praktis untuk ${input.targetMarket}`,
    sellingPoints,
    hook: `Masih bingung pilih ${input.category || 'produk'} yang beneran works?`,
    cta: 'Klik checkout sekarang sebelum harga promo berakhir!',
    script: `0-3s hook kuat, 4-10s demo pemakaian ${input.productName}, 11-15s social proof + CTA direct.`
  };

  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return fallback;
  }

  return fallback;
}

export function generateAffiliateScripts({ productName, targetMarket, hook, cta }) {
  return {
    tiktok: `${hook}\nAku pakai ${productName} buat ${targetMarket}. Hasilnya keliatan dalam beberapa hari. ${cta}`,
    shopee: `Buat kamu yang cari ${productName}, ini cocok untuk ${targetMarket}. Benefit utamanya jelas, pemakaian gampang. ${cta}`,
    instagram: `${hook}\n${productName} jadi andalan daily routine aku. Save & share kalau relate. ${cta}`,
    shorts: `Stop scrolling. Ini kenapa ${productName} relevan buat ${targetMarket}. Lihat demo singkatnya sekarang. ${cta}`
  };
}
