import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateItems = () => {
	return useMutation({
		mutationFn: async (paylaod: any) => {
			return await http.post(`${apiChecklist}/${paylaod.id}/item`, paylaod)
		},
		onError: () => {
			toast.error('Gagal disimpan')
		},
		onSuccess: () => {
			toast.success('item berhasil disimpan')
		},
	})
}
