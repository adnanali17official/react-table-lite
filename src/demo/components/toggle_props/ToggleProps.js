import React from 'react'

const ToggleProps = ({
	reactTableLiteOptions,
	_reactTableLiteOptions
}) => (
	<div className='checkboxes'>
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.enableSort}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, enableSort: !old.enableSort }))}
			/>
			<label> is sortable </label>
		</div>
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.showActions}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, showActions: !old.showActions }))}
			/>
			<label> show actions </label>
		</div>
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.enableMultiSelect}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, enableMultiSelect: !old.enableMultiSelect }))}
			/>
			<label> enable multi select </label>
		</div>
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.customRenderCell}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, customRenderCell: !old.customRenderCell }))}
			/>
			<label> custom render cell </label>
		</div>
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.customRenderActions}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, customRenderActions: !old.customRenderActions }))}
			/>
			<label> custom render actions </label>
		</div>
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.showPagination}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, showPagination: !old.showPagination }))}
			/>
			<label> show pagination </label>
		</div>
		{
			reactTableLiteOptions?.showPagination &&
			<div>
				<label> Total pages </label>
				<input
					type='number'
					min={1}
					value={reactTableLiteOptions?.pagination?.totalPages}
					onChange={e => _reactTableLiteOptions(old => (
						{
							...old,
							pagination: {
								...old?.pagination,
								totalPages: parseInt(e.target.value)
							}
						}
					))}
				/>
				<label> Show no. of pages </label>
				<input
					type='number'
					min={1}
					value={reactTableLiteOptions?.pagination?.showNumberofPages}
					onChange={e => _reactTableLiteOptions(old => (
						{
							...old,
							pagination: {
								...old?.pagination,
								showNumberofPages: parseInt(e.target.value)
							}
						}
					))}
				/>
				<label> Current page </label>
				<input
					type='number'
					min={1}
					value={reactTableLiteOptions?.pagination?.currentPage}
					onChange={e => _reactTableLiteOptions(old => (
						{
							...old,
							pagination: {
								...old?.pagination,
								currentPage: parseInt(e.target.value)
							}
						}
					))}
				/>
			</div>
		}
		<div>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.enablePerPageOptions}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, enablePerPageOptions: !old.enablePerPageOptions }))}
			/>
			<label> show per-page limit </label>
		</div>
	</div>
);

export default ToggleProps;