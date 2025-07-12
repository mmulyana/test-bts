import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useChecklistItems } from '../hooks/use-checklist-items'
import { Circle, CircleCheck, Trash } from 'lucide-react'
import FormNewItems from './form-new-items'
import { Button } from '@/components/ui/button'
import { useDeleteItems } from '../hooks/use-delete-items'
import { toast } from 'sonner'
import { usePutItems } from '../hooks/use-put-items'
import { useDeleteChecklist } from '../hooks/use-delete-checklist'
import { useQueryClient } from '@tanstack/react-query'

export default function ListDetail({
	children,
	data,
}: React.PropsWithChildren & { data: any }) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()

	const { mutate } = useDeleteItems()
	const { mutate: deleteChecklist } = useDeleteChecklist()
	const { mutate: updateItem } = usePutItems()
	const { data: itemsData, refetch } = useChecklistItems(open ? data.id : '')

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{data.name}</DialogTitle>
				</DialogHeader>
				<div>
					<p>Items</p>
					<FormNewItems id={data.id} refetch={refetch} />
				</div>
				<div className='flex gap-4 flex-col'>
					{itemsData?.data.data.map((i: any) => (
						<div key={i.id} className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								<button
									className=''
									onClick={() => {
										updateItem(
											{ id: data.id, itemId: i.id },
											{
												onSuccess: () => {
													refetch()
												},
											}
										)
									}}
								>
									{i.itemCompletionStatus ? (
										<CircleCheck size={24} className='stroke-teal-500' />
									) : (
										<Circle size={24} />
									)}
								</button>
								<p>{i.name || '-'}</p>
							</div>
							<Button
								variant='ghost'
								onClick={() => {
									mutate(
										{ id: data.id, itemId: i.id },
										{
											onSuccess: () => {
												toast.success('Item berhasil di hapu')
												refetch()
											},
										}
									)
								}}
							>
								<Trash className='text-red-500' size={16} />
							</Button>
						</div>
					))}
				</div>
				<Button
					variant='secondary'
					className='mt-10 w-fit text-red-500 hover:bg-gray-200'
					onClick={() => {
						deleteChecklist(
							{ id: data.id },
							{
								onSuccess: () => {
									setOpen(false)
									queryClient.invalidateQueries({ queryKey: ['checklist'] })
								},
							}
						)
					}}
				>
					Hapus List
				</Button>
			</DialogContent>
		</Dialog>
	)
}
