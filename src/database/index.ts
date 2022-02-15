import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(
		Object.assign(defaultOptions, {
			name,
			database:
				process.env.NODE_ENV === 'test'
					? 'fmoney_tests'
					: defaultOptions.database,
			entities: ['./src/models/*.ts'],
			migrations: ['./src/database/migrations/*.ts'],
			cli: {
				migrationsDir: './src/database/migrations',
			},
		}),
	);
};
