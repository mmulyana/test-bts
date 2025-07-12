'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useChecklists } from '../hooks/use-checlists'
import ListDetail from './list-detail'

export default function ListChecklist() {
	const { data } = useChecklists()
	return (
		<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
			{data?.data?.data?.map((i: any) => (
				<ListDetail key={i.id} data={i}>
					<Card>
						<CardContent>
							<p>{i.name}</p>
							<p>total items {i?.items?.length}</p>
						</CardContent>
					</Card>
				</ListDetail>
			))}
		</div>
	)
}
