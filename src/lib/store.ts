import { textColumn, floatColumn, checkboxColumn, Column } from 'react-datasheet-grid'
import { create } from 'zustand'

export type TablePrimitiveName = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | string
export type TablePrimitive = string | number | boolean | null | undefined
export type TableData = Record<string, TablePrimitive>

export type TableColumn = {
	key: string
	type: TablePrimitiveName
	title: string
}

export const COLUMN_TYPE_MAP: Record<TablePrimitiveName, Partial<Column<any>>> = {
	string: textColumn,
	number: floatColumn,
	boolean: checkboxColumn,
	null: {},
	undefined: {},
}

type State = {
	data: TableData[]
	columns: TableColumn[]
}

export const useTableStore = create<State>()(
	() => ({
		data: [],
		columns: [
			{ key: 'firstName', type: 'string', title: 'First Name' },
		],
	})
)