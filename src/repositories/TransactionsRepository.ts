import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let total = 0;

    const balance = this.transactions.reduce((accumulator, {type, value}) => {
      const isIncome = type === 'income';

      if (isIncome) {
        accumulator.income += value
        accumulator.total += value;
      } else {
        accumulator.outcome += value;
        accumulator.total -= value;
      }

      return accumulator;
    }, {
      income: 0,
      outcome: 0,
      total
    });

    return balance;
  }

  public create({ title, value, type }: createTransaction): Transaction {
    const transaction = new Transaction({
      title, value, type
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
