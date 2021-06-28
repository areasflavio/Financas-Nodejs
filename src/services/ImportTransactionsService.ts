import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { getCustomRepository, getRepository, In } from 'typeorm';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CSVTransaction {
	title: string;
	type: 'income' | 'outcome';
	value: number;
	category: string;
}

class ImportTransactionsService {
	async execute(filePath: string): Promise<Transaction[]> {
		const transactionRepository = getCustomRepository(TransactionsRepository);
		const categoryRepository = getRepository(Category);

		const csvFilePath = path.resolve(__dirname, filePath);

		const readCSVStream = fs.createReadStream(csvFilePath);

		const parseStream = csvParse({
			from_line: 2,
			ltrim: true,
			rtrim: true,
		});

		const parseCSV = readCSVStream.pipe(parseStream);

		const transactions: CSVTransaction[] = [];
		const categories: string[] = [];

		parseCSV.on('data', line => {
			const [title, type, value, category] = line.map((cell: string) =>
				cell.trim(),
			);

			if (!title || !type || !value) return;

			categories.push(category);
			transactions.push({ title, type, value: Number(value), category });
		});

		await new Promise(resolve => {
			parseCSV.on('end', resolve);
		});

		const existentCategories = await categoryRepository.find({
			where: {
				title: In(categories),
			},
		});

		const existentCategoriesTitle = existentCategories.map(
			(category: Category) => category.title,
		);

		const addCategoryFiles = categories
			.filter(category => !existentCategoriesTitle.includes(category))
			.filter((value, index, self) => self.indexOf(value) === index);

		const newCategories = categoryRepository.create(
			addCategoryFiles.map(title => ({
				title,
			})),
		);

		await categoryRepository.save(newCategories);

		const finalCategories = [...existentCategories, ...newCategories];

		const createdTransactions = transactionRepository.create(
			transactions.map(transaction => ({
				title: transaction.title,
				type: transaction.type,
				value: transaction.value,
				category: finalCategories.find(
					category => transaction.category === category.title,
				),
			})),
		);

		await transactionRepository.save(createdTransactions);

		await fs.promises.unlink(filePath);

		return createdTransactions;
	}
}

export default ImportTransactionsService;
