import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const typeIsValid = ['income', 'outcome'].includes(type);
    if (!typeIsValid) {
      throw Error('Nome da transação inválida.')
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value) {
      throw Error('Saldo indiponível.');
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
