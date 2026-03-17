const cameraByFocus = {
  product: 'close up',
  model: 'medium shot',
  balanced: 'wide shot',
  macro: 'macro detail'
};

export function buildScenes({ productName, hook, cta, environment, focus, style, length }) {
  const totalScene = length === '30s' ? 6 : length === '15s' ? 4 : 3;

  return Array.from({ length: totalScene }).map((_, idx) => {
    const id = idx + 1;
    if (id === 1) {
      return {
        id,
        type: 'hook',
        camera: cameraByFocus[focus] ?? 'close up',
        action: `Reveal ${productName} dengan transisi cepat`,
        environment,
        text: hook,
        style
      };
    }

    if (id === totalScene) {
      return {
        id,
        type: 'cta',
        camera: 'product hero shot',
        action: 'Tampilkan benefit utama + badge promo',
        environment,
        text: cta,
        style
      };
    }

    return {
      id,
      type: 'benefit',
      camera: cameraByFocus[focus] ?? 'medium shot',
      action: `Demo penggunaan ${productName} pada target audiens`,
      environment,
      text: `Selling point #${id - 1}`,
      style
    };
  });
}
