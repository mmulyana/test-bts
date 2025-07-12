'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreateItems } from '../hooks/use-create-item'

export default function FormNewItems({
	refetch,
	id,
}: {
	refetch: () => void
	id: string
}) {
	const { mutate } = useCreateItems()
	const form = useForm({
		defaultValues: {
			itemName: '',
		},
	})

	const onSubmit = (data: any) => {
		mutate(
			{ ...data, id },
			{
				onSuccess: () => {
					refetch()
					form.reset()
				},
			}
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4'>
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
					Save
				</Button>
			</form>
		</Form>
	)
}
