import { describe, it, expect } from 'vitest';
import { getCurrentBalance, isStartingBalanceActive, accountBalanceFromAmounts, type BalanceTransaction } from './balance';

const tx = (type: string, amount: number, date: string): BalanceTransaction => ({ type, amount, date });

describe('getCurrentBalance', () => {
  it('старт без транзакций возвращает начальный баланс', () => {
    expect(getCurrentBalance([], 1000)).toBe(1000);
  });

  it('старт + доходы − расходы', () => {
    const txns = [tx('income', 500, '2026-06-01'), tx('expense', 200, '2026-06-02')];
    expect(getCurrentBalance(txns, 1000)).toBe(1300);
  });

  it('допускает отрицательный начальный баланс (долг)', () => {
    expect(getCurrentBalance([tx('income', 100, '2026-06-01')], -500)).toBe(-400);
  });

  it('игнорирует транзакции позже asOf', () => {
    const txns = [tx('expense', 100, '2026-06-10'), tx('expense', 50, '2026-12-31')];
    expect(getCurrentBalance(txns, 1000, { asOf: new Date('2026-06-30T23:59:59') })).toBe(900);
  });

  it('при заданной startingBalanceDate отсекает более ранние транзакции', () => {
    const txns = [tx('expense', 100, '2026-05-15'), tx('expense', 200, '2026-06-15')];
    expect(getCurrentBalance(txns, 1000, { startingBalanceDate: '2026-06-01' })).toBe(800);
  });

  it('тип internal не влияет на баланс', () => {
    expect(getCurrentBalance([tx('internal', 999, '2026-06-01')], 1000)).toBe(1000);
  });
});

describe('isStartingBalanceActive', () => {
  it('без даты — всегда активен', () => {
    expect(isStartingBalanceActive(undefined, new Date('2026-06-30'))).toBe(true);
    expect(isStartingBalanceActive('', new Date('2026-06-30'))).toBe(true);
  });

  it('дата в прошлом относительно asOf — активен', () => {
    expect(isStartingBalanceActive('2026-06-01', new Date('2026-06-30'))).toBe(true);
  });

  it('дата в будущем относительно asOf — не активен', () => {
    expect(isStartingBalanceActive('2026-07-01', new Date('2026-06-30'))).toBe(false);
  });
});

describe('accountBalanceFromAmounts', () => {
  it('пустой список сумм возвращает начальный баланс счёта', () => {
    expect(accountBalanceFromAmounts(5000, [])).toBe(5000);
  });

  it('прибавляет суммы к начальному балансу', () => {
    expect(accountBalanceFromAmounts(1000, [500, -200, -50])).toBe(1250);
  });

  it('начальный баланс 0 — обычная сумма потока', () => {
    expect(accountBalanceFromAmounts(0, [100, -30])).toBe(70);
  });

  it('допускает отрицательный начальный баланс', () => {
    expect(accountBalanceFromAmounts(-500, [100])).toBe(-400);
  });
});
