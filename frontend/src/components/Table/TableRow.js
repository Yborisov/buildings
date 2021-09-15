import { memo, useRef } from 'react'
import { ReactComponent as DeleteIcon } from './assets/bin.svg'
import { ReactComponent as EditIcon } from './assets/pen.svg'
import './TableRow.css'

const TableRow = memo(({ row, deleteHandler, headingColumns, editHandler }) => {
	console.log(`rendering row for ${row.id}`)
	const renders = useRef(1)
	return (
		<tr key={row.id}>
			{headingColumns.map((column) => (
				<td key={column.identifier} data-label={column.identifier}>
					{typeof row[column.identifier] === 'function'
						? row[column.identifier]()
						: row[column.identifier]}
				</td>
			))}
			<td data-label='Actions'>
				<DeleteIcon
					onClick={() => deleteHandler(row)}
					width='25px'
					height='25px'
				/>
				<EditIcon onClick={() => editHandler(row)} width='25px' height='25px' />
			</td>
			<td>{renders.current++}</td>
		</tr>
	)
})

export default TableRow
