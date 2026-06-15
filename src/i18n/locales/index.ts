import { en, Messages } from './en';
import { ru } from './ru';

export type LocaleCode = 'en' | 'ru';

export const dictionaries: Record<LocaleCode, Messages> = { en, ru };

export const DEFAULT_LOCALE: LocaleCode = 'en';

export type { Messages };
export type { PluralForms } from './en';
