import { useFormik } from 'formik'

const BuildingForm = ({ building }) => {
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
			console.log(values)
		},
	})

	return (
		<>
			<h2>{`${building ? 'Edit' : 'Add'} building`}</h2>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='name'>Name*</label>
				<input
					id='name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				{formik.errors.name ? (
					<div className='error-message'>{formik.errors.name}</div>
				) : null}
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
				<label htmlFor='location'>Location</label>
				<input
					id='location'
					name='location'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.location}
				/>
				<input
					id='file'
					name='file'
					type='file'
					onChange={(e) => {
						formik.setFieldValue('file', e.currentTarget.files[0])
					}}
				/>

				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default BuildingForm
