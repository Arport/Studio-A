export function exportStoryboardPdf(scenes) {
  const content = scenes
    .map((scene) => `Scene ${scene.id}\n${scene.type} | ${scene.camera} | ${scene.environment}\n${scene.text}`)
    .join('\n\n');

  downloadTextFile(content, 'storyboard.pdf.txt');
}

export function exportPromptFile(prompt) {
  downloadTextFile(prompt, 'video-prompts.txt');
}

function downloadTextFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
