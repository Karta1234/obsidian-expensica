import { describe, it, expect } from 'vitest';
import { accountBalanceFromAmounts } from './balance';

describe('accountBalanceFromAmounts', () => {
  it('пустой список сумм возвращает начальный баланс счёта', () => {
    expect(accountBalanceFromAmounts(5000, [])).toBe(5000);
  });

  it('суммирует знаковые суммы к начальному балансу', () => {
    expect(accountBalanceFromAmounts(1000, [500, -200, -50])).toBe(1250);
  });

  it('начальный баланс 0 — обычная сумма потока', () => {
    expect(accountBalanceFromAmounts(0, [100, -30])).toBe(70);
  });

  it('допускает отрицательный начальный баланс', () => {
    expect(accountBalanceFromAmounts(-500, [100])).toBe(-400);
  });
});
