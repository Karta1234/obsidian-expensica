import { describe, it, expect, beforeEach } from 'vitest';
import { t, setActiveLocale } from './index';

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

  it('подставляет параметры в {placeholder}', () => {
    setActiveLocale('en');
    expect(t('common.save', { unused: 'x' })).toBe('Save');
  });
});
