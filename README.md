# Affiliate AI Generator

Blueprint aplikasi untuk workflow affiliate content production berbasis AI.

## Stack yang disarankan

- **Frontend:** Next.js + Tailwind CSS + Canvas/Konva.js (untuk storyboard editor)
- **AI Layer:** OpenAI API (prompt generator), Gemini/Veo, Runway Gen-3
- **Export:** image, storyboard PDF, prompt file

## Flow Aplikasi

1. **Product Input**
   - Upload product image + model image (opsional)
   - Input product name, description, target market, category
   - AI auto-generate headline, selling point, hook, CTA, script
2. **Studio Setup**
   - Active assets, visual direction, composition focus, output settings
3. **Storyboard Generator**
   - Pilih aspect ratio: `9:16`, `1:1`, `16:9`, `4:5`
   - Generate scene otomatis
4. **Scene Edit + Download**
   - Regenerate scene
   - Edit prompt
   - Download storyboard PDF / prompt script

## Fitur penting

- **AI Prompt Optimizer**: prompt otomatis berdasarkan product + studio setup
- **Consistency Engine**: menjaga konteks produk antar scene
- **Smart Scene Generator**: jumlah scene dinamis berdasarkan durasi output
- **Affiliate Script Generator**: siap dikembangkan untuk TikTok, Shopee, Instagram, YouTube Shorts

## Struktur project

```txt
/app
  page.tsx

/components
  ProductInput.tsx
  StudioSetup.tsx
  StoryboardGenerator.tsx
  StoryboardResult.tsx

/lib
  ai.js
  prompt.js
  video.js

/utils
  sceneGenerator.ts
  export.js
```
