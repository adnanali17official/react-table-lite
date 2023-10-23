import React from 'react'

export default function NewRow({handleSubmitRow}) {
	return (
		<form id='New-Row-Form' onSubmit={handleSubmitRow}>
			<label> Add New Row </label>
			<div>
				<input name='title' placeholder='Title' type='text' required={true} />
				<input name='description' placeholder='Description' type='text' />
			</div>
			<button type='submit'> Add </button>
		</form>
	)
}
