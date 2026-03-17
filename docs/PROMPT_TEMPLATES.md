# Prompt Templates

## 1) Product Analyzer Prompt

```txt
You are a professional affiliate marketer.

Analyze this product and generate:
1) Product title
2) Short description
3) 3 selling points
4) Hook for advertisement
5) Call to action
6) 15-second short video script

Output JSON only.
```

## 2) Storyboard Scene Prompt

```txt
Create a commercial advertisement video scene.

Product:
{{product_name}}

Scene:
{{scene_action}}

Environment:
{{environment}}

Lighting:
{{lighting}}

Camera:
{{camera}}

Style:
{{style}}

Text Overlay:
{{text_overlay}}
```

## 3) Affiliate Script Generator Prompt (Multi-platform)

```txt
You are an affiliate content strategist.
Generate scripts for:
- TikTok (short hook style)
- Shopee Video (conversion style)
- Instagram Reels (lifestyle style)
- YouTube Shorts (problem-solution style)

Input:
- Product name: {{product_name}}
- Benefits: {{benefits}}
- Target market: {{target_market}}
- Offer: {{offer}}

Return structured markdown with CTA per platform.
```

## 4) Consistency Guard Prompt

```txt
Validate all storyboard scenes and keep consistency for:
- Same product identity
- Same model characteristics
- Same brand tone and color palette
- Smooth progression from hook to CTA

If inconsistency is found, rewrite only problematic scenes.
```
