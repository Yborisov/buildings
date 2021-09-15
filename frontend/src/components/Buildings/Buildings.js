import { useEffect, useMemo, useRef } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { connect } from 'react-redux'
import { deleteBuilding, fetchBuildings } from '../../actions/buildingActions'
import { selectAllBuildings } from '../../reducers/selectors'
import Table from '../Table/Table'
import './Buildings.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import BuildingForm from '../EditForm/BuildingForm'

const Buildings = ({ fetchBuildings, buildings, deleteBuilding }) => {
	let renders = useRef(1)
	useEffect(() => {
		fetchBuildings()
	}, [])

	const tableMetaData = useMemo(
		() => [
			{ th: 'Id', identifier: 'id' },
			{ th: 'Name', identifier: 'name' },
			{ th: 'Area', identifier: 'area' },
			{ th: 'Location', identifier: 'location' },
			{ th: 'Image', identifier: 'image' },
		],
		[]
	)

	const tableData = useMemo(
		() =>
			buildings.map((building) => ({
				...building,
				image: () => (
					<img
						src={building.image}
						alt={building.name}
						height={'35px'}
						width={'35px'}
					/>
				),
			})),
		[buildings]
	)

	const deleteTableRow = (tableRow) => {
		confirmAlert(deleteConfirmationOptions(tableRow))
	}

	const editTableRow = (tableRow) => {
		confirmAlert(editBuildingDialogOptions(tableRow))
	}

	const deleteConfirmationOptions = (row) => ({
		title: `Delete`,
		message: `Are you sure you want to delete the record for ${row.name}?`,
		buttons: [
			{
				label: 'Yes',
				onClick: () => deleteBuilding(row.id),
			},
			{
				label: 'No',
				onClick: () => {},
			},
		],
		childrenElement: () => <div />,
		closeOnEscape: true,
		closeOnClickOutside: true,
	})

	const editBuildingDialogOptions = (row) => ({
		title: 'Title',
		message: 'Message',
		buttons: [
			{
				label: 'Yes',
				onClick: () => alert('Click Yes'),
			},
			{
				label: 'No',
				onClick: () => alert('Click No'),
			},
		],
		childrenElement: () => <div />,
		customUI: ({ onClose }) => <BuildingForm />,
		closeOnEscape: true,
		closeOnClickOutside: true,
	})

	return (
		<>
			<Table
				tableData={tableData}
				headingColumns={tableMetaData}
				title='Buldings'
				tableClass={'buildings-table'}
				deleteHandler={deleteTableRow}
				editHandler={editTableRow}
			/>
			{renders.current++}
		</>
	)
}
const mapStateToProps = (state) => ({
	buildings: selectAllBuildings(state),
})

const mapDispatchToProps = {
	fetchBuildings,
	deleteBuilding,
}
export default connect(mapStateToProps, mapDispatchToProps)(Buildings)
