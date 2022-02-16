import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import path from 'path';

export default async (name = 'default'): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(
		Object.assign(defaultOptions, {
			name,
			database:
				process.env.NODE_ENV === 'test'
					? 'fmoney_tests'
					: defaultOptions.database,
			entities: [path.resolve(__dirname, '..', 'models', '*')],
			migrations: [path.resolve(__dirname, 'migrations', '*')],
			cli: {
				migrationsDir: [path.resolve(__dirname, 'migrations')],
			},
		}),
	);
};
