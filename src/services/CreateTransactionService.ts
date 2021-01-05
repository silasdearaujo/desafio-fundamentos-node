import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {    
    if (type != 'income' && type != 'outcome') {
      throw new Error('Invalid type');
    }

    if (typeof value !== 'number') {
      throw Error('Value must be a number.');
    }

    if (typeof title !== 'string') {
      throw Error('Title must be a string.');
    }

    const  { total } = this.transactionsRepository.getBalance();

    if (total < value && type == 'outcome') {
      throw new Error('Insufficient funds!');
    }
    
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    
    return transaction;
  }
}

export default CreateTransactionService;
