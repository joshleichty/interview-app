import NoSSR from "./NoSSR";
import { DynamicDataSheetGrid, keyColumn, textColumn } from "react-datasheet-grid";
import { COLUMN_TYPE_MAP, useTableStore } from "~/lib/store";
import { shallow } from "zustand/shallow";

export function Table() {
	const tableData = useTableStore(state => state.data)
	const tableColumns = useTableStore(
		state => state.columns.map(column => ({
			...keyColumn(column.key, COLUMN_TYPE_MAP[column.type] || textColumn),
			title: column.title
		})),
		shallow
	)

	return (
		<NoSSR>
			<DynamicDataSheetGrid
				height={400}
				value={tableData}
				columns={tableColumns}
				onChange={(data) => useTableStore.setState({ data })}
			/>
		</NoSSR>
	)
}