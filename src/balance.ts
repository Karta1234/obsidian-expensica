// Чистый модуль расчёта баланса счёта (без зависимостей от Obsidian — тестируется напрямую).

// Баланс счёта = начальный баланс счёта + сумма движений по счёту.
// `amounts` — это уже посчитанные знаковые суммы транзакций для конкретного счёта.
export function accountBalanceFromAmounts(openingBalance: number, amounts: number[]): number {
  return amounts.reduce((balance, amount) => balance + amount, openingBalance);
}
