import TableRow from './TableRow'
const Table = ({
	title,
	tableClass,
	headingColumns,
	tableData,
	deleteHandler,
	editHandler,
	specifiedUniqueKey,
}) => {
	const data = tableData.map((row) => (
		<TableRow
			key={row[specifiedUniqueKey] || row.id}
			row={row}
			deleteHandler={deleteHandler}
			headingColumns={headingColumns}
			editHandler={editHandler}
		/>
	))

	return (
		<div className='table-container'>
			<div className='table-title'>
				<h2>{title}</h2>
			</div>
			<table className={tableClass ?? ''}>
				<thead>
					<tr>
						{headingColumns.map((col, index) => (
							<th key={index + col.th}>{col.th}</th>
						))}
						<th>Actions</th>
						<th>renders</th>
					</tr>
				</thead>
				<tbody>{data}</tbody>
			</table>
		</div>
	)
}

export default Table
