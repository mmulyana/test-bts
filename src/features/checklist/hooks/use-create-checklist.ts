import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateChecklist = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (paylaod: any) => {
			return await http.post(apiChecklist, paylaod)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['checklist'] })
		},
		onError: () => {
			toast.error('Gagal disimpan')
		},
	})
}
