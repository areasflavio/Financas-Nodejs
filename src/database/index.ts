import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	if (process.env.DATABASE_URL) {
		Object.assign(defaultOptions, {
			entities: ['./dist/models/*.js'],
			migrations: ['./dist/database/migrations/*.js'],
			cli: {
				migrationsDir: './dist/database/migrations',
			},
		});
	} else {
		Object.assign(defaultOptions, {
			entities: ['./src/models/*.ts'],
			migrations: ['./src/database/migrations/*.ts'],
			cli: {
				migrationsDir: './src/database/migrations',
			},
		});
	}

	return createConnection(
		Object.assign(defaultOptions, {
			name,
			type: 'postgres',
			database:
				process.env.NODE_ENV === 'test'
					? 'fmoney_tests'
					: defaultOptions.database,
			synchronize: false,
			logging: false,
		}),
	);
};
