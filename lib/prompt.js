export function optimizeVideoPrompt({ productName, scene, setup }) {
  return `Create a ${setup.style} advertisement video.\n\nProduct: ${productName}\nScene: ${scene.action}\nEnvironment: ${scene.environment}\nCamera: ${scene.camera}\nFocus: ${setup.focus}\nLength: ${setup.length}`;
}

export function buildConsistencyNotes({ productName, targetMarket, category }) {
  return [
    `Keep product identity fixed: ${productName}`,
    `Maintain target audience tone: ${targetMarket}`,
    `Use category-specific props: ${category}`
  ];
}
