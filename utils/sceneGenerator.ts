import { buildVideoPrompt } from '../lib/prompt';
import { ProductInputData } from '../components/ProductInput';
import { StudioSetupData } from '../components/StudioSetup';
import { StoryboardSettings } from '../components/StoryboardGenerator';

export interface SceneData {
  id: number;
  type: string;
  camera: string;
  action: string;
  environment: string;
  text: string;
  prompt: string;
}

export function generateStoryboardScenes({
  product,
  studio,
  settings,
}: {
  product: ProductInputData;
  studio: StudioSetupData;
  settings: StoryboardSettings;
}): SceneData[] {
  const sceneCount = studio.length === '30s' ? 6 : studio.length === '15s' ? 4 : 3;
  const baseScenes = [
    { type: 'hook', camera: 'close up', action: `${product.productName || 'Product'} close up on table`, text: 'Masih pakai produk biasa?' },
    { type: 'usage', camera: studio.focus === 'macro' ? 'macro shot' : 'medium shot', action: 'Model menggunakan produk', text: 'Tekstur ringan, cepat meresap.' },
    { type: 'proof', camera: 'wide shot', action: 'Perbandingan before after', text: 'Hasil terlihat dalam beberapa hari.' },
    { type: 'cta', camera: 'slow zoom', action: 'Product hero shot', text: 'Order sekarang sebelum promo berakhir.' },
    { type: 'bonus', camera: 'tracking shot', action: 'Lifestyle context dengan target market', text: 'Cocok untuk rutinitas harian kamu.' },
    { type: 'closing', camera: 'top shot', action: 'Branding packshot + logo', text: 'Klik checkout sekarang.' },
  ];

  return baseScenes.slice(0, sceneCount).map((scene, idx) => {
    const sceneData = {
      id: idx + 1,
      type: scene.type,
      camera: scene.camera,
      action: scene.action,
      environment: studio.environment,
      text: scene.text,
    };

    return {
      ...sceneData,
      prompt: buildVideoPrompt({ productData: product, studioData: studio, scene: sceneData, settings }),
    };
  });
}
