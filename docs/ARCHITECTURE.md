# Studio-A Affiliate AI Generator — Architecture

## High-level modules

- `app/page.tsx`
  - orchestration state machine 4-step flow
  - bridges UI <-> AI/prompt/export utilities
- `components/*`
  - isolated step-focused presentation + user actions
- `lib/ai.js`
  - product analyzer adapter (currently fallback placeholder)
  - affiliate script formatter per platform
- `lib/prompt.js`
  - consistency notes
  - scene prompt optimizer
  - prompt JSON payload builder
- `lib/video.js`
  - provider contract stub (Gemini/Veo/Runway compatible adapter point)
- `utils/sceneGenerator.ts`
  - smart scene count by duration
  - scene construction with continuity defaults
- `utils/export.js`
  - TXT/JSON export
  - storyboard printable HTML (PDF-like export)
  - per scene image generator (canvas)

## Flow

1. **Product Input**
   - user submits product metadata + assets
   - AI copy generated: headline, 3 selling points, hook, CTA, script
2. **Studio Setup**
   - set style/focus/environment/duration + active assets
3. **Storyboard Generator**
   - choose aspect ratio
   - smart scene generator decides scene count by duration
   - prompt optimizer injects consistency constraints
4. **Scene Edit + Download**
   - edit prompt per scene
   - regenerate scene variation
   - export TXT / JSON / Storyboard file / scene PNG

## Data contract (scene)

```ts
{
  id: number,
  type: 'hook' | 'benefit' | 'proof' | 'cta',
  camera: string,
  action: string,
  environment: string,
  text: string,
  style: string,
  prompt: string
}
```
