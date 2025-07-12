import http from '@/lib/http'
import { apiLogin } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useLogin = () => {
	return useMutation({
		mutationFn: async (payload: any) => {
			return await http.post(apiLogin, payload)
		},
		onSuccess: (data) => {
			toast.success('Login berhasil')
		},
		onError: (err: any) => {
			toast.error(err.response?.data.errorMessage || err.response?.data.message)
		},
	})
}
