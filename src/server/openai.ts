import { OpenAIApi, Configuration } from 'openai'
import type { TableColumn, TableData } from '~/lib/store'

export const openai = new OpenAIApi(new Configuration({
	apiKey: process.env.OPENAI_API_KEY
}))

export const SYSTEM_PROMPT = `
You are TableGPT, a large language model trained to create, edit, and delete data in an excel-like table.
You will be prompted with the column format and the rows of the current table, as well as a command to execute on the table.
From the command, you will need to determine if any changes need to be made to the rows, or to the column format of the table.
The result format must conform to the following JSON typescript type below:
{
	data: Array<Record<string, string | number | boolean | null | undefined>>
	columns: Array<{
		key: string
		type: 'string' | 'number' | 'boolean' | 'null' | 'undefined'
		title: string
	}>
}

\`data\` will be the entire updated state of the table's rows, and \`columns\` will be the entire updated state of the table's columns.

ONLY RESPOND WITH JSON THAT CONFORMS TO THE ABOVE TYPE. ANY ADDITIONAL TEXT WILL RESULT IN AN ERROR.
`

export const generatePrompt = (params: {
	text: string
	tableData: TableData[]
	tableColumns: TableColumn[]
}): string => {
	return `ROWS\n\`\`\`${JSON.stringify(params.tableData, null, 2)}\`\`\`\n\nCOLUMNS\n\`\`\`${JSON.stringify(params.tableColumns, null, 2)}\`\`\`\n\nCOMMAND\n\`\`\`${params.text}\`\`\``
}