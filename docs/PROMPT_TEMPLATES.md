# Prompt Templates

## Product Analyzer Prompt (OpenAI)

```txt
You are a professional affiliate marketer.
Analyze this product and generate:
- Product title
- Short description
- 3 selling points
- Advertising hook
- Call to action
- 15s short video script
Return structured JSON.
```

## Scene Video Prompt (Gemini/Veo/Runway)

```txt
Create a commercial advertisement video scene.
Product: {{productName}}
Scene objective: {{sceneAction}}
Environment: {{environment}}
Camera: {{camera}}
Focus: {{focus}}
Duration target: {{length}}
Required assets: {{assets}}
Consistency constraints:
- Keep product identity fixed
- Maintain audience tone
- Keep environment continuity
```

## CTA Ending Prompt

```txt
Create final scene with hero product shot and CTA overlay.
Use high-contrast lighting and readable text.
Add urgency but avoid misleading claims.
```
