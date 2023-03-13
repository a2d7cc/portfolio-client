import { getContentType } from 'api/api.helpers'
import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'

import { IAuthResponse } from '@/store/user/user.interface'

import { getAuthUrl } from '@/configs/api.config'
import { removeTokensStorage, saveToStorage } from './auth.helper'

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/registration'),
			{ email, password }
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},
	
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{
				headers: getContentType(),
			}
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
}
