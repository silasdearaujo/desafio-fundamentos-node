import Transaction from '../models/Transaction';
import { v4 as uuid } from 'uuid';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const income = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income'){
        return total + transaction.value;
      }
      else {
        return total;
      }
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome'){
        return total + transaction.value;
      }
      else {
        return total;
      }
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    }

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
