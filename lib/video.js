const PROVIDERS = {
  gemini: 'Google Gemini / Veo',
  runway: 'Runway Gen-3'
};

export function listVideoProviders() {
  return PROVIDERS;
}

export async function renderVideoStoryboard({ provider = 'gemini', prompts }) {
  const providerName = PROVIDERS[provider] ?? provider;

  return {
    provider,
    providerName,
    status: 'queued',
    message: `Prompt dikirim ke adapter ${providerName}`,
    prompts,
    eta: '2-5 menit (estimasi placeholder)'
  };
}
