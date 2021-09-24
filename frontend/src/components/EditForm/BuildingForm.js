import { useFormik } from 'formik'
import './BuildingForm.css'
const BuildingForm = ({ building, updateBuilding, addBuilding, onClose }) => {
	const validate = (values) => {
		const errors = {}
		if (!values.name) {
			errors.name = 'Required'
		} else if (values.name.length < 3 || values.name.length > 15) {
			errors.name = 'Must be between 3 and 15 characters'
		}

		if (!values.area) {
			errors.area = 'Required'
		}

		return errors
	}

	const formik = useFormik({
		initialValues: {
			name: building?.name ?? '',
			area: building?.area ?? '',
			location: building?.location ?? '',
		},
		validate,
		onSubmit: async (values) => {
			const formData = new FormData()
			formData.append('image', values.file ?? '')
			formData.append('name', values.name)
			formData.append('area', values.area)
			formData.append('location', values.location)

			building ? updateBuilding(formData, building.id) : addBuilding(formData)
			onClose()
		},
	})

	return (
		<div className='component-wrapper'>
			<h2>{`${building ? 'Edit' : 'Add'} building`}</h2>
			<form
				className='form-wrapper'
				onSubmit={formik.handleSubmit}
				encType='multipart/form-data'
			>
				<div className='input-field'>
					<label htmlFor='name'>Name*</label>
					<input
						id='name'
						name='name'
						type='text'
						autoComplete='off'
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
					{formik.errors.name ? (
						<div className='error-message'>{formik.errors.name}</div>
					) : null}
				</div>

				<div className='input-field'>
					<label htmlFor='area'>Area*</label>
					<input
						id='area'
						name='area'
						type='number'
						onChange={formik.handleChange}
						value={formik.values.area}
					/>
					{formik.errors.area ? (
						<div className='error-message'>{formik.errors.area}</div>
					) : null}
				</div>
				<div className='input-field'>
					<label htmlFor='location'>Location</label>
					<input
						id='location'
						name='location'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.location}
					/>
				</div>
				<div className='input-field file-field'>
					<label htmlFor='file'>Icon</label>
					{building && building.image()}
					<input
						id='file'
						name='file'
						type='file'
						onChange={(e) => {
							formik.setFieldValue('file', e.target.files[0])
						}}
					/>{' '}
				</div>
				<div className='react-confirm-alert-button-group'>
					<button disabled={!(formik.isValid && formik.dirty)} type='submit'>Submit</button>
				</div>
			</form>
		</div>
	)
}

export default BuildingForm
