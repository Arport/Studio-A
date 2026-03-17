export function buildPromptFile({ productName, script, scenes }) {
  const sceneText = scenes
    .map(
      (scene) =>
        `Scene ${scene.id}: ${scene.action}\nCamera: ${scene.camera}\nEnvironment: ${scene.environment}\nText: ${scene.text}`
    )
    .join('\n\n');

  return `# Affiliate AI Prompt\n\nProduct: ${productName}\n\n## Script\n${script}\n\n## Storyboard\n${sceneText}`;
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
