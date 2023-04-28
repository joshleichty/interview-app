import { createTRPCRouter, publicProcedure } from "~/server/trpc";
import { z } from "zod";
import { TRPCClientError } from "@trpc/client";
import { SYSTEM_PROMPT, generatePrompt } from "~/server/openai";

export const aiRouter = createTRPCRouter({
	complete: publicProcedure
		.input(z.object({
			text: z.string(),
			tableData: z.array(z.any()),
			tableColumns: z.array(z.object({
				key: z.string(),
				type: z.string(),
				title: z.string()
			}))
		}))
		.output(z.object({
			data: z.array(z.any()),
			columns: z.array(z.object({
				key: z.string(),
				type: z.string(),
				title: z.string()
			}))
		}))
		.mutation(async ({ input, ctx }) => {
			const result = await ctx.openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: SYSTEM_PROMPT },
					{
						role: 'user', content: generatePrompt({
							text: input.text,
							tableColumns: input.tableColumns,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							tableData: input.tableData
						})
					}
				]
			})
			const [response] = result.data.choices
			if (!response || !response.message) throw new TRPCClientError('No response from OpenAI')

			const outputCommands = response.message.content
			console.log('output', outputCommands)

			return JSON.parse(outputCommands) as { data: any[], columns: any[] }
		})
});
