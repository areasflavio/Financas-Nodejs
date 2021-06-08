import Transaction from '../models/Transaction';

interface Balance {
	income: number;
	outcome: number;
	total: number;
}

interface CreateBalanceDTO {
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
		const [income, outcome] = this.transactions.reduce(
			([i, o], transaction) => {
				let inc = i;
				let out = o;

				if (transaction.type === 'income') {
					inc += transaction.value;
				} else {
					out += transaction.value;
				}

				return [inc, out];
			},
			[0, 0],
		);

		return {
			income,
			outcome,
			total: income - outcome,
		};
	}

	public create({ title, value, type }: CreateBalanceDTO): Transaction {
		const transaction = new Transaction({ title, value, type });

		this.transactions.push(transaction);

		return transaction;
	}
}

export default TransactionsRepository;
