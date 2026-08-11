export function collectAttribution(searchParams: URLSearchParams) {
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = searchParams.get(key);
    if (value) utm[key] = value;
  }
  return {
    questionnaireId: searchParams.get("questionnaire_id") ?? searchParams.get("anketa_id") ?? undefined,
    utm,
  };
}

export function createSessionId() {
  return globalThis.crypto?.randomUUID?.() ?? `eg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
