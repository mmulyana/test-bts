import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteChecklist = () => {
	return useMutation({
		mutationFn: async (payload: any) => {
			return await http.delete(`${apiChecklist}/${payload.id}`)
		},
		onError: () => {
			toast.error('Gagal dihapus')
		},
	})
}
