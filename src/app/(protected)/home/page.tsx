'use client'

import DialogNewChecklist from '@/features/checklist/components/dialog-new-checklist'
import ListChecklist from '@/features/checklist/components/list-checklist'

export default function Home() {
	return (
		<div className='max-w-xl mx-auto py-10'>
			<div className='flex justify-between items-center mb-6'>
				<p>Notes</p>
				<DialogNewChecklist />
			</div>
			<ListChecklist />
		</div>
	)
}
