import type { Core } from '@strapi/strapi'

export default {
	register(/* { strapi }: { strapi: Core.Strapi } */) {},

	async bootstrap({ strapi }: { strapi: Core.Strapi }) {
		const adminEmail =
			process.env.SUPER_ADMIN_EMAIL || 'olimxonerkaboyev0@gmail.com'
		const adminPassword = process.env.SUPER_ADMIN_PASSWORD || 'Salih2317'

		// Super admin mavjudligini tekshirish
		const existingAdmins = await strapi.query('admin::user').findMany({
			where: { email: adminEmail },
		})

		if (existingAdmins.length === 0) {
			await strapi.query('admin::user').create({
				data: {
					email: adminEmail,
					password: adminPassword,
					firstname: 'Olimxon',
					lastname: 'Erkaboyev',
					isActive: true,
					roles: [1], // 1 => Super Admin roli
				},
			})

			strapi.log.info(`✅ Super Admin yaratildi: ${adminEmail}`)
		} else {
			strapi.log.info(`ℹ️ Super Admin allaqachon mavjud: ${adminEmail}`)
		}
	},
}
