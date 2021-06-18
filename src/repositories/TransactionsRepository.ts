import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
	income: number;
	outcome: number;
	total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
	public async getBalance(): Promise<Balance> {
		const transactionsRepository = getCustomRepository(TransactionsRepository);

		const transactions = await transactionsRepository.find();

		const [income, outcome] = transactions.reduce(
			([i, o], transaction) => {
				let inc = i;
				let out = o;

				if (transaction.type === 'income') {
					inc += Number(transaction.value);
				} else {
					out += Number(transaction.value);
				}

				return [inc, out];
			},
			[0, 0],
		);

		const balance = { income, outcome, total: income - outcome };

		return balance;
	}
}

export default TransactionsRepository;
