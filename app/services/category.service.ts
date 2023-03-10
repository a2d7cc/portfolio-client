import { axiosClassic } from '@/api/interceptors'
import { getCategoryUrl } from '@/configs/api.config'
import { ICategory } from '@/shared/types/category.type'

export const CategoryService = {
	async getAll() {
		return axiosClassic.get<ICategory[]>(getCategoryUrl(''))
	},
}
