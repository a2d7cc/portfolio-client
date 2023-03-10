export const API_URL = `${process.env.APP_URL}/api`

export const getUserUrl = (string: string) => `/user${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getCategoryUrl = (string: string) => `/category${string}`
export const getArticleUrl = (string: string) => `/article${string}`
