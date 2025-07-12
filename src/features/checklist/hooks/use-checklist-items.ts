import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useQuery } from '@tanstack/react-query'

export const useChecklistItems = (id: string) => {
	return useQuery({
		queryKey: ['checklist-items', id],
		queryFn: async () => {
			return await http(`${apiChecklist}/${id}/item`)
		},
		enabled: id !== null && id !== undefined && id !== '',
	})
}
