import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateChecklist = () => {
	return useMutation({
		mutationFn: async (paylaod: any) => {
			return await http.post(apiChecklist, paylaod)
		},
		onError: () => {
			toast.error('Gagal disimpan')
		},
	})
}
