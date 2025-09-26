import path from 'path'

export default ({ env }) => {
	const client = env('DATABASE_CLIENT', 'postgres') // default postgres

	const connections = {
		postgres: {
			connection: {
				connectionString: env('DATABASE_URL', null), // Production uchun qo'shildi
				host: env('DATABASE_HOST', 'localhost'),
				port: env.int('DATABASE_PORT', 5432),
				database: env('DATABASE_NAME', 'strapi'),
				user: env('DATABASE_USERNAME', 'strapi'),
				password: env('DATABASE_PASSWORD', 'strapi'),
				ssl: env.bool('DATABASE_SSL', false) // `.env` da DATABASE_SSL=true bo‘lsa ishlaydi
					? { rejectUnauthorized: false }
					: false,
				schema: env('DATABASE_SCHEMA', 'public'),
			},
			pool: { min: 0, max: 5 },
		},

		sqlite: {
			connection: {
				filename: path.join(
					__dirname,
					'..',
					'..',
					env('DATABASE_FILENAME', '.tmp/data.db')
				),
			},
			useNullAsDefault: true,
		},
	}

	return {
		connection: {
			client,
			...connections[client],
			acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
		},
	}
}
