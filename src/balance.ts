// Чистый модуль расчёта баланса варианта A («Стартовый баланс»).
// Без зависимостей от Obsidian — тестируется напрямую через vitest.

export interface BalanceTransaction {
  type: string;     // 'income' | 'expense' | 'internal' (значения TransactionType)
  amount: number;
  date: string;     // 'YYYY-MM-DD' или ISO
}

export interface BalanceOptions {
  startingBalanceDate?: string; // 'YYYY-MM-DD'; если задана — учитываются только транзакции с этой даты
  asOf?: Date;                  // верхняя граница; по умолчанию — без ограничения
}

// Парсит 'YYYY-MM-DD' как локальную полночь. Для полноценных ISO-строк — обычный Date.
function parseDay(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  return new Date(value);
}

export function isStartingBalanceActive(startingBalanceDate: string | undefined, asOf: Date): boolean {
  if (!startingBalanceDate) {
    return true;
  }
  return parseDay(startingBalanceDate).getTime() <= asOf.getTime();
}

export function getCurrentBalance(
  transactions: BalanceTransaction[],
  startingBalance: number,
  options: BalanceOptions = {}
): number {
  const { startingBalanceDate, asOf } = options;
  const upperBound = asOf ? asOf.getTime() : Number.POSITIVE_INFINITY;
  const lowerBound = startingBalanceDate ? parseDay(startingBalanceDate).getTime() : Number.NEGATIVE_INFINITY;

  const flow = transactions.reduce((sum, t) => {
    const time = parseDay(t.date).getTime();
    if (time > upperBound || time < lowerBound) {
      return sum;
    }
    if (t.type === 'income') {
      return sum + t.amount;
    }
    if (t.type === 'expense') {
      return sum - t.amount;
    }
    return sum; // 'internal' и прочее не влияют
  }, 0);

  return startingBalance + flow;
}
