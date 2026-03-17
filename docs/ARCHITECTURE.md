# Architecture Detail — Affiliate AI Generator

## A. Layered Architecture

### 1) Presentation Layer
- `app/page.tsx` berfungsi sebagai orchestration stepper.
- Komponen per-step bertanggung jawab pada input dan UI state lokal.

### 2) Domain Layer
- `utils/sceneGenerator.ts`: business logic untuk:
  - jumlah scene otomatis
  - konsistensi environment/focus/style
  - pembentukan data scene final

### 3) AI Service Layer
- `lib/ai.js`: Product Analyzer + script draft generator.
- `lib/prompt.js`: Prompt Composer untuk image/video.
- `lib/video.js`: Provider adapter (Runway, Gemini/Veo).

### 4) Export Layer
- `utils/export.js`: output prompt/storyboard sebagai file download.

---

## B. Data Contracts

### Product Input
```ts
{
  productImage?: File | null;
  modelImage?: File | null;
  productName: string;
  description: string;
  targetMarket: string;
  category: string;
  aiOutput?: {
    headline: string;
    sellingPoints: string[];
    hook: string;
    callToAction: string;
    script: string;
  }
}
```

### Studio Setup
```ts
{
  assets: {
    productImage: boolean;
    model: boolean;
    logo: boolean;
    background: boolean;
    props: boolean;
  };
  style: 'commercial' | 'ugc' | 'cinematic' | 'product-showcase' | 'lifestyle';
  focus: 'product' | 'model' | 'balanced' | 'macro' | 'wide';
  environment: 'studio' | 'cafe' | 'outdoor' | 'bedroom' | 'gym' | 'office';
  length: '5s' | '10s' | '15s' | '30s';
}
```

### Scene
```ts
{
  id: number;
  type: string;
  camera: string;
  action: string;
  environment: string;
  text: string;
  prompt: string;
}
```

---

## C. Sequence (Happy Path)

1. User isi data produk + upload image.
2. Frontend memanggil `generateProductInfo()` untuk AI metadata.
3. User setup visual di step studio.
4. User pilih ratio dan generate storyboard.
5. `generateStoryboardScenes()` menghasilkan scene list.
6. User edit/regenerate scene.
7. Export prompt/storyboard ke file.

---

## D. Provider Integration Strategy

Buat adapter per provider agar tidak mengubah UI logic:
- `generateVideoWithRunway({ prompts, settings })`
- `generateVideoWithGemini({ prompts, settings })`

Saran lanjutan:
- Tambah retry policy + idempotency key.
- Simpan generation job ke DB (status: queued/running/succeeded/failed).
- Gunakan webhook polling sinkronisasi asset final.

---

## E. Non-Functional Checklist

- Consistency: scene gunakan product context yang sama.
- Observability: simpan prompt + provider response untuk audit.
- Safety: moderation check sebelum render prompt final.
- Performance: lazy-load preview scene.
- Cost control: token budget + caching prompt block.
