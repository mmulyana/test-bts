import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteItems = () => {
	return useMutation({
		mutationFn: async (payload: any) => {
			return await http.delete(
				`${apiChecklist}/${payload.id}/item/${payload.itemId}`
			)
		},
		onError: () => {
			toast.error('Gagal dihapus')
		},
	})
}
