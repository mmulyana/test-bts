import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Plus, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateChecklist } from '../hooks/use-create-checklist'
import { DialogTitle } from '@radix-ui/react-dialog'

export default function DialogNewChecklist() {
	const [open, setOpen] = useState(false)

	const { mutate } = useCreateChecklist()
	const form = useForm({
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = (data: any) => {
		mutate(data, {
			onSuccess: () => {
				setOpen(false)
			},
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					New <Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Note</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4'>
						<FormField
							control={form.control}
							name='name'
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
			</DialogContent>
		</Dialog>
	)
}
