import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRenameItems = () => {
	return useMutation({
		mutationFn: async (payload: any) => {
			return await http.put(
				`${apiChecklist}/${payload.id}/item/rename/${payload.itemId}`,
				payload
			)
		},
		onError: () => {
			toast.error('Gagal diperbarui')
		},
	})
}
