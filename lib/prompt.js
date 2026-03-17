export function optimizeVideoPrompt({ productName, scene, setup, consistencyNotes }) {
  return [
    `Create a ${setup.style} advertisement video scene.`,
    `Product: ${productName}`,
    `Scene objective: ${scene.action}`,
    `Environment: ${scene.environment}`,
    `Camera: ${scene.camera}`,
    `Focus: ${setup.focus}`,
    `Duration target: ${setup.length}`,
    `Required assets: ${(setup.activeAssets ?? []).join(', ') || 'product only'}`,
    'Consistency constraints:',
    ...consistencyNotes.map((note) => `- ${note}`)
  ].join('\n');
}

export function buildConsistencyNotes({ productName, targetMarket, category, environment }) {
  return [
    `Always show the same product identity: ${productName}`,
    `Keep tone and pain-point framing for audience: ${targetMarket}`,
    `Use visual cues tied to category: ${category}`,
    `Maintain environment continuity around: ${environment}`
  ];
}

export function buildPromptJson({ product, setup, scenes }) {
  return {
    product,
    setup,
    scenes: scenes.map((scene) => ({
      id: scene.id,
      type: scene.type,
      prompt: scene.prompt,
      camera: scene.camera,
      environment: scene.environment,
      text: scene.text
    }))
  };
}
