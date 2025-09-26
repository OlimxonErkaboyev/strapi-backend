export default {
	async bootstrap({ strapi }) {
		const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@example.com'
		const adminPassword = process.env.SUPER_ADMIN_PASSWORD || '123456'

		const existingAdmins = await strapi.query('admin::user').findMany({
			where: { email: adminEmail },
		})

		if (existingAdmins.length === 0) {
			await strapi.query('admin::user').create({
				data: {
					email: adminEmail,
					password: adminPassword,
					firstname: 'Super',
					lastname: 'Admin',
					roles: [1], // 1 - Super Admin role ID (default)
				},
			})

			strapi.log.info(`✅ Super Admin yaratildi: ${adminEmail}`)
		} else {
			strapi.log.info(`ℹ️ Super Admin allaqachon mavjud: ${adminEmail}`)
		}
	},
}
