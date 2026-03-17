# Affiliate AI Generator

Aplikasi untuk membantu affiliate marketer membuat materi iklan AI secara cepat dan konsisten: mulai dari input produk, setup visual, auto storyboard, edit scene, hingga export prompt/script.

---

## 1) Tujuan Produk

**Masalah yang diselesaikan:**
- Proses bikin konten affiliate biasanya manual, lama, dan sulit menjaga konsistensi visual antar scene.
- Prompt ke video AI sering tidak rapi dan tidak reusable.

**Outcome yang diinginkan:**
- User bisa generate storyboard iklan dalam hitungan menit.
- Prompt siap pakai untuk OpenAI/Gemini/Veo/Runway.
- Script affiliate siap publish untuk TikTok, Shopee, IG Reels, YouTube Shorts.

---

## 2) Stack Rekomendasi

### Frontend
- Next.js App Router
- Tailwind CSS
- Konva.js / HTML Canvas (editor storyboard visual)

### AI Layer
- OpenAI API (product copy + prompt optimizer)
- Gemini / Veo (video generation)
- Runway Gen-3 (video generation alternatif)

### Export Layer
- Image per-scene
- Storyboard PDF
- Prompt script `.txt`/`.json`

---

## 3) End-to-End Flow

```text
UPLOAD PRODUCT
     ↓
AI GENERATE PRODUCT INFO
     ↓
STUDIO SETUP
     ↓
GENERATE STORYBOARD
     ↓
EDIT SCENE
     ↓
DOWNLOAD (IMAGE / PDF / PROMPT)
```

### Step 1 — Product Input
Input:
- Product image
- Model image (opsional)
- Product name
- Product description
- Target market
- Product category

AI Output:
- Headline
- 3 selling points
- Hook
- CTA
- Script awal

### Step 2 — Studio Setup
Konfigurasi produksi:
- Active Assets: product, model, logo, background, props
- Visual Direction: commercial / ugc / cinematic / product showcase / lifestyle
- Composition Focus: product / model / balanced / macro / wide
- Output Settings: durasi + environment

### Step 3 — Storyboard Generator
- Pilih aspect ratio: `9:16`, `1:1`, `16:9`, `4:5`
- Smart Scene Generator menentukan jumlah scene otomatis berdasarkan durasi

### Step 4 — Scene Edit + Download
- Regenerate scene per item
- Edit prompt per scene
- Download storyboard PDF
- Download prompt script

---

## 4) Arsitektur Modul

```text
app/page.tsx
 ├─ components/ProductInput.tsx
 ├─ components/StudioSetup.tsx
 ├─ components/StoryboardGenerator.tsx
 ├─ components/StoryboardResult.tsx
 └─ utils/sceneGenerator.ts
      └─ lib/prompt.js

lib/ai.js        -> AI product analyzer (placeholder provider adapter)
lib/prompt.js    -> prompt builder + prompt optimizer base
lib/video.js     -> adapter contract (Gemini/Veo/Runway)
utils/export.js  -> export prompt/storyboard file
```

Lihat detail arsitektur teknis di: **`docs/ARCHITECTURE.md`**.

---

## 5) Fitur Core yang Sudah Diskaffold

1. **AI Prompt Optimizer**
   - Prompt dibangun terstruktur dari product + studio + scene context.
2. **Consistency Engine (basic)**
   - Scene generator menjaga produk, tone, dan environment tetap konsisten.
3. **Smart Scene Generator**
   - Scene count auto menyesuaikan panjang video (5/10/15/30 detik).
4. **Affiliate Script Generator (base-ready)**
   - Fondasi untuk format script lintas platform (TikTok/Shopee/IG/Shorts).

---

## 6) Struktur Project

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

/docs
  ARCHITECTURE.md
  PROMPT_TEMPLATES.md
```
