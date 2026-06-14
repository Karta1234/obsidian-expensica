import { dictionaries, DEFAULT_LOCALE } from './locales';
import type { LocaleCode, Messages } from './locales';
import type { PluralForms } from './locales/en';

let activeLocale: LocaleCode = DEFAULT_LOCALE;

export function setActiveLocale(locale: LocaleCode): void {
  activeLocale = locale;
}

export function getActiveLocale(): LocaleCode {
  return activeLocale;
}

type Params = Record<string, string | number>;

// Достаёт значение по dot-пути из словаря. Возвращает undefined, если пути нет.
function lookup(dict: Messages, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
}

function interpolate(template: string, params?: Params): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}

function isPluralForms(value: unknown): value is PluralForms {
  return (
    !!value &&
    typeof value === 'object' &&
    'one' in (value as object) &&
    'few' in (value as object) &&
    'many' in (value as object)
  );
}

// Резолвит «сырое» значение ключа (строка или PluralForms) с фолбэком activeLocale -> en.
function resolveRaw(key: string): unknown {
  const fromActive = lookup(dictionaries[activeLocale], key);
  if (fromActive !== undefined) return fromActive;
  const fromDefault = lookup(dictionaries[DEFAULT_LOCALE], key);
  return fromDefault;
}

export function t(key: string, params?: Params): string {
  const raw = resolveRaw(key);
  if (typeof raw === 'string') return interpolate(raw, params);
  if (isPluralForms(raw)) return interpolatePlural(raw, params);
  return key; // фолбэк: ключ не найден нигде
}

function interpolatePlural(forms: PluralForms, params?: Params): string {
  const count = typeof params?.count === 'number' ? params.count : 0;
  const localeTag = activeLocale === 'ru' ? 'ru-RU' : 'en-US';
  const category = new Intl.PluralRules(localeTag).select(count);
  const form =
    category === 'one' ? forms.one : category === 'few' ? forms.few : forms.many;
  return interpolate(form, params);
}

export type LanguageSetting = 'auto' | LocaleCode;

const SUPPORTED: LocaleCode[] = ['en', 'ru'];

// setting — значение из настроек плагина; obsidianLang — результат getLanguage().
export function resolveLocale(setting: LanguageSetting, obsidianLang: string): LocaleCode {
  if (setting !== 'auto') return setting;
  const normalized = (obsidianLang || '').toLowerCase().split('-')[0];
  return (SUPPORTED as string[]).includes(normalized)
    ? (normalized as LocaleCode)
    : DEFAULT_LOCALE;
}
