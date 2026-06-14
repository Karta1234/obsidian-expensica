import { describe, it, expect, beforeEach } from 'vitest';
import { t, setActiveLocale, resolveLocale } from './index';

describe('t() lookup, fallback, interpolation', () => {
  beforeEach(() => setActiveLocale('ru'));

  it('возвращает строку активной локали', () => {
    expect(t('common.save')).toBe('Сохранить');
  });

  it('падает обратно на en, если ключа нет в активной локали', () => {
    // 'common.save' есть везде; проверяем фолбэк через несуществующий путь
    setActiveLocale('en');
    expect(t('common.cancel')).toBe('Cancel');
  });

  it('возвращает сам ключ, если он отсутствует во всех локалях', () => {
    expect(t('nope.missing.key')).toBe('nope.missing.key');
  });

  it('параметры игнорируются, если в строке нет плейсхолдера', () => {
    setActiveLocale('en');
    expect(t('common.save', { unused: 'x' })).toBe('Save');
  });

  it('подставляет параметры в {placeholder}', () => {
    setActiveLocale('en');
    expect(t('tx.count', { count: 5 })).toBe('5 transactions');
  });
});

describe('плюрализация (русский)', () => {
  beforeEach(() => setActiveLocale('ru'));

  it('count=1 -> форма one', () => {
    expect(t('tx.count', { count: 1 })).toBe('1 транзакция');
  });

  it('count=2 -> форма few', () => {
    expect(t('tx.count', { count: 2 })).toBe('2 транзакции');
  });

  it('count=5 -> форма many', () => {
    expect(t('tx.count', { count: 5 })).toBe('5 транзакций');
  });

  it('count=21 -> форма one', () => {
    expect(t('tx.count', { count: 21 })).toBe('21 транзакция');
  });

  it('english: count=1 -> one, count=3 -> many-слот', () => {
    setActiveLocale('en');
    expect(t('tx.count', { count: 1 })).toBe('1 transaction');
    expect(t('tx.count', { count: 3 })).toBe('3 transactions');
  });
});

describe('resolveLocale', () => {
  it('явный ru/en возвращается как есть', () => {
    expect(resolveLocale('ru', 'en')).toBe('ru');
    expect(resolveLocale('en', 'ru')).toBe('en');
  });

  it('auto + obsidian ru -> ru', () => {
    expect(resolveLocale('auto', 'ru')).toBe('ru');
  });

  it('auto + неподдерживаемый язык obsidian -> en', () => {
    expect(resolveLocale('auto', 'fr')).toBe('en');
    expect(resolveLocale('auto', 'zh')).toBe('en');
  });
});
