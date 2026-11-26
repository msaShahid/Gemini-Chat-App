// Central place for configuration read from environment variables.
//
// Expo only exposes variables that start with EXPO_PUBLIC_, and each one must be
// written out in full as `process.env.EXPO_PUBLIC_NAME` (no destructuring and no
// dynamic keys), otherwise it will not be replaced at build time.

export const GEMINI_API_KEY: string = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';

// Current stable Gemini Flash model. You can override it from .env.local with
// EXPO_PUBLIC_GEMINI_MODEL if Google releases a newer one.
export const GEMINI_MODEL: string =
  process.env.EXPO_PUBLIC_GEMINI_MODEL || 'gemini-3.8-flash';
