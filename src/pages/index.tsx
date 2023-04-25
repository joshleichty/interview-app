import { trpc } from "~/utils/trpc";

export default function Index() {
	const hello = trpc.example.getAll.useQuery()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<pre className='border p-4 border-gray-300'>
				{JSON.stringify(hello.data, null, 4)}
			</pre>
		</main>
	);
}

