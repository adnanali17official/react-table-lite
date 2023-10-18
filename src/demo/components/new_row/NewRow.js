import React from 'react'

export default function NewRow({handleSubmitRow}) {
	return (
		<form id='New-Row-Form' onSubmit={handleSubmitRow}>
			<label> Add New Row </label>
			<div>
				<input name='name' placeholder='Name' type='text' required={true} />
				<input name='email' placeholder='Email' type='text' />
				<input name='joined' placeholder='Joining Date' type='date' />
				<select name='department' required={true}>
					<option value={'Finance'}> Finance </option>
					<option value={'Human Resource'}> Human Resource </option>
					<option value={'Customer Support'}> Customer Support </option>
				</select>
			</div>
			<button type='submit'> Add </button>
		</form>
	)
}
