import { trpc } from "~/lib/trpc";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { useTableStore } from "~/lib/store";
import { Helper } from "~/components/Helper";
import { Table } from "~/components/Table";
import { Toaster, toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";


export default function Index() {
	const [text, setText] = useState('')
	const completionMutation = trpc.ai.complete.useMutation({
		onSuccess: ({ columns, data }) => {
			useTableStore.setState({ columns, data })
			toast.success('Table updated')
		},
		onError: (error) => {
			console.error(error)
			toast.error('Something went wrong')
		},
		onSettled: () => {
			setText('')
		}
	})

	const onSubmit = () => {
		const state = useTableStore.getState()
		completionMutation.mutate({
			tableColumns: state.columns,
			tableData: state.data,
			text
		})
	}

	return (
		<div className='w-full h-screen bg-gray-50 flex justify-center items-center'>
			<div className='w-[50%] flex flex-col justify-center items-center'>
				<div className='w-full h-[400px]'>
					<Table />
				</div>

				<Helper />

				<div className='flex flex-row items-center justify-center gap-4 w-96'>
					<Input
						className='bg-white'
						disabled={completionMutation.isLoading}
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>

					<Button
						className='transition-all w-28'
						disabled={text.length === 0 || completionMutation.isLoading}
						onClick={onSubmit}
					>
						{
							completionMutation.isLoading ? (
								<Loader2 className='animate-spin w-4 h-4' />
							) : (
								<span>Submit</span>
							)
						}
					</Button>
				</div>
			</div>

			<Toaster position='bottom-center' toastOptions={{ duration: 2000 }} />
		</div>
	);
}

