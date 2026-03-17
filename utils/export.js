export function buildPromptFile({ productName, script, scenes, consistencyNotes }) {
  const sceneText = scenes
    .map(
      (scene) =>
        `Scene ${scene.id} [${scene.type}]\nAction: ${scene.action}\nCamera: ${scene.camera}\nEnvironment: ${scene.environment}\nText: ${scene.text}\nPrompt: ${scene.prompt}`
    )
    .join('\n\n');

  return `# Affiliate AI Prompt\n\nProduct: ${productName}\n\n## Consistency Notes\n- ${consistencyNotes.join('\n- ')}\n\n## Script\n${script}\n\n## Storyboard\n${sceneText}`;
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadJson(filename, payload) {
  downloadText(filename, JSON.stringify(payload, null, 2));
}

export function downloadStoryboardPdfLike({ title, htmlBody }) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:Arial,sans-serif;padding:24px}h1{margin:0 0 16px}.scene{border:1px solid #ddd;padding:12px;margin-bottom:10px;border-radius:8px}</style></head><body>${htmlBody}</body></html>`;
  downloadText(`${title.replace(/\s+/g, '-').toLowerCase()}.html`, html);
}

export function downloadSceneImage(scene) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 52px Arial';
  ctx.fillText(`Scene ${scene.id}`, 60, 100);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '34px Arial';
  wrapText(ctx, `Action: ${scene.action}`, 60, 190, 960, 44);
  wrapText(ctx, `Camera: ${scene.camera}`, 60, 380, 960, 44);
  wrapText(ctx, `Text: ${scene.text}`, 60, 470, 960, 44);

  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `scene-${scene.id}.png`;
  a.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n += 1) {
    const testLine = `${line + words[n]} `;
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = `${words[n]} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
