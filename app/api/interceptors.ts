import { API_URL } from '@/configs/api.config'
import axios from 'axios'
import { getContentType } from './api.helpers'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})
