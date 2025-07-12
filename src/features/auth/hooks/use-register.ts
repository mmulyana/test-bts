import http from '@/lib/http'
import { apiRegister } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRegister = () => {
	return useMutation({
		mutationFn: async (payload: any) => {
			return await http.post(apiRegister, payload)
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (err) => {
			console.log(err)
			toast.error('Login gagal')
		},
	})
}
