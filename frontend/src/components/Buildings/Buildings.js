import { useEffect, useMemo } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { connect } from 'react-redux'
import {
	deleteBuilding,
	fetchBuildings,
	updateBuilding,
	addBuilding,
} from '../../actions/buildingActions'
import { selectAllBuildings } from '../../reducers/selectors'
import Table from '../Table/Table'
import './Buildings.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import BuildingForm from '../EditForm/BuildingForm'
import { baseApiUrl } from '../../services/api'
import defaultImg from './assets/default.png'

const Buildings = ({
	fetchBuildings,
	buildings,
	deleteBuilding,
	updateBuilding,
	addBuilding,
}) => {
	useEffect(() => {
		fetchBuildings()
	}, [fetchBuildings])

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
						key={Date.now()}
						src={`${building.image ? baseApiUrl + building.image : defaultImg}`}
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

	const addTableRow = () => {
		confirmAlert(editBuildingDialogOptions())
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
		childrenElement: () => <div />,
		customUI: ({ onClose }) => (
			<BuildingForm
				building={row}
				updateBuilding={updateBuilding}
				addBuilding={addBuilding}
				onClose={onClose}
			/>
		),
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
				addHandler={addTableRow}
			/>
		</>
	)
}
const mapStateToProps = (state) => ({
	buildings: selectAllBuildings(state),
})

const mapDispatchToProps = {
	fetchBuildings,
	deleteBuilding,
	updateBuilding,
	addBuilding,
}
export default connect(mapStateToProps, mapDispatchToProps)(Buildings)
