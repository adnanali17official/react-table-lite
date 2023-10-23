import React from 'react'

const ToggleProps = ({
	reactTableLiteOptions,
	_reactTableLiteOptions,
	fetchServerData 
}) => (
	<div className='checkboxes'>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.useLiveData}
				onChange={e => _reactTableLiteOptions(old => {
					fetchServerData(1, 5);
					return ({
						...old,
						useLiveData: !old.useLiveData,
						pagination: {
							...old?.pagination,
							perPageLimit: 5,
							currentPage: 1,
							totalPages: 10,
							showNumberofPages: 4
						}
					})
				})}
			/>
			<label> live data </label>
		</div>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.enableSort}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, enableSort: !old.enableSort }))}
			/>
			<label> is sortable </label>
		</div>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.showActions}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, showActions: !old.showActions }))}
			/>
			<label> show actions </label>
		</div>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.enableMultiSelect}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, enableMultiSelect: !old.enableMultiSelect }))}
			/>
			<label> enable multi select </label>
		</div>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.customRenderCell}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, customRenderCell: !old.customRenderCell }))}
			/>
			<label> custom render cell </label>
		</div>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.customRenderActions}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, customRenderActions: !old.customRenderActions }))}
			/>
			<label> custom render actions </label>
		</div>
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.showPagination}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, showPagination: !old.showPagination }))}
			/>
			<label> show pagination </label>
		</div>
		{
			reactTableLiteOptions?.showPagination && !reactTableLiteOptions?.useLiveData &&
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
		<div className='checkbox-container'>
			<input
				type='checkbox'
				checked={reactTableLiteOptions?.showPerPageOptions}
				onChange={e => _reactTableLiteOptions(old => ({ ...old, showPerPageOptions: !old.showPerPageOptions }))}
			/>
			<label> show per-page limit </label>
		</div>
	</div>
);

export default ToggleProps;