import { trpc } from "~/lib/trpc";
import { Button } from "~/components/ui/button";

export default function Index() {
	// const hello = trpc.example.getAll.useQuery()

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Button>
				Button
			</Button>
		</div>
	);
}

