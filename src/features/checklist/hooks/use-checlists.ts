import http from '@/lib/http'
import { apiChecklist } from '@/shared/constant/url'
import { useQuery } from '@tanstack/react-query'

export const useChecklists = () => {
	return useQuery({
		queryKey: ['checklist'],
		queryFn: async () => {
			return await http(apiChecklist)
		},
	})
}
