import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { HelpCircleIcon } from "lucide-react";

export function Helper() {
	return (
		<div className='w-96 mb-2 flex flex-row items-center gap-1'>
			<p className="text-sm text-muted-foreground">Type what you want</p>
			<HoverCard openDelay={200} closeDelay={200}>
				<HoverCardTrigger>
					<HelpCircleIcon className='w-4 h-4 text-muted-foreground' />
				</HoverCardTrigger>
				<HoverCardContent className='w-[400px]'>
					Any text you enter will update the above table.
					<br />
					<br />
					Example:
					<br />
					<p className='text-muted-foreground italic'>
						&quot;Add a column for Full Name and add Elon Musk as a new row&quot;
					</p>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}