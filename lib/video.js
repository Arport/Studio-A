export async function renderVideoStoryboard({ provider = 'Gemini', prompts }) {
  return {
    provider,
    status: 'queued',
    message: `Storyboard prompt dikirim ke ${provider}`,
    prompts
  };
}
