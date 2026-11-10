import { useSyncExternalStore } from 'react';
import english from './locales/en.json';
import portuguese from './locales/pt-BR.json';

const key = 'eva-preferences-v1';
const defaults = { language: 'pt-BR', theme: 'light', storageError: false };
export function validatePreferences(value) {
  return {
    language: value?.language === 'en' ? 'en' : 'pt-BR',
    theme: value?.theme === 'dark' ? 'dark' : 'light',
    storageError: false,
  };
}
function load() {
  try { return validatePreferences(JSON.parse(localStorage.getItem(key))); }
  catch { return defaults; }
}
let preferences = load();
const listeners = new Set();
function apply() {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = preferences.language;
  document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
  document.documentElement.style.colorScheme = preferences.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', preferences.theme === 'dark' ? '#101d18' : '#0a5f45');
}
apply();
export function getLocale() { return preferences.language; }
export function getPreferences() { return preferences; }
export function translate(value, variables = {}) {
  if (typeof value !== 'string') return value;
  const text = value.trim();
  const catalog = preferences.language === 'en' ? english : portuguese;
  const translated = Object.hasOwn(catalog, text) ? catalog[text] : text;
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  return leading + translated.replace(/\{\{(\w+)\}\}/g, (_, name) => String(variables[name] ?? '')) + trailing;
}
export function setPreferences(patch) {
  preferences = validatePreferences({ ...preferences, ...patch });
  try { localStorage.setItem(key, JSON.stringify({ language: preferences.language, theme: preferences.theme })); }
  catch { preferences = { ...preferences, storageError: true }; }
  apply();
  listeners.forEach(listener => listener());
}
function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }
export function useI18n() {
  const state = useSyncExternalStore(subscribe, getPreferences, () => defaults);
  return { ...state, locale: state.language, translate, setPreferences };
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preferences = load();
    apply();
    listeners.forEach(listener => listener());
  });
}