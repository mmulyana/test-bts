import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Pencil, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRenameItems } from '../hooks/use-update-items'

export default function ItemsEdit({
	children,
	data,
	refetch,
	id,
}: React.PropsWithChildren & { data: any; id: string; refetch: () => void }) {
	const [edit, setEdit] = useState(false)

	const { mutate } = useRenameItems()
	const form = useForm({
		defaultValues: {
			itemName: data.name,
		},
	})

	const onSubmit = (payload: any) => {
		mutate(
			{ id, itemId: data.id, itemName: payload.itemName },
			{
				onSuccess: () => {
					setEdit(!edit)
					refetch()
				},
			}
		)
	}

	if (!edit)
		return (
			<div className='space-x-2 flex'>
				{children}
				<Button variant='ghost' onClick={() => setEdit(!edit)}>
					<Pencil />
				</Button>
			</div>
		)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-4 w-full'
			>
				<FormField
					control={form.control}
					name='itemName'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button>
					<Send />
				</Button>
			</form>
		</Form>
	)
}
