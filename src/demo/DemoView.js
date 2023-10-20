import React, { useRef, useState } from 'react';
import Table from '../../dist/table.esm';
import ToggleProps from './components/toggle_props/ToggleProps';
import EyeSvg from './components/eye_svg/EyeSvg';
import EditSvg from './components/edit_svg/EditSvg';
import DeleteSvg from './components/delete_svg/DeleteSvg';
import Toast from './components/toast/Toast';
import NewRow from './components/new_row/NewRow';
import './demo-view.css';

function DemoView() {
	const InitialData = [
		{
			id: 1,
			name: "John Doe",
			department: "Finance",
			joined: '2017-12-01',
			email: "john_doe@somedomain.com"
		},
		{
			id: 2,
			name: "Kazuki Yashiro",
			department: "Finance",
			joined: '2023-09-01',
			email: "y_kazuki@somedomain.com"
		},
		{
			id: 3,
			name: "Eddie Memon",
			department: "Customer Support",
			joined: '2018-03-02',
			email: "eddie254@somedomain.com"
		},
		{
			id: 4,
			name: "Ashiq Nuri",
			department: "Human Resource",
			joined: '2018-08-01',
			email: "an452@somedomain.com"
		},
	];

	const customSearchFormRef = useRef(null);
	const customCSVButtonRef = useRef(null);
	const InitialCheckedKey = 'is_checked';
	const InitialDisableCheckedKey = 'is_disabled';
	const InitialHeaders = ['id', 'name', 'department', 'email'];
	const InitialCustomHeaders = { "joined": "Joined On", "id": "Profile No", "name": "Name", "department": "Department", "email": "Email" };
	const InitialActionTypes = ["edit", "view", "delete"];
	const InitialPerpageLimitOptions = [5, 10, 20, 30, 50];
	const InitialReactTableLiteOptions = {
		showActions: true,
		showPagination: false,
		enableMultiSelect: false,
		customRenderCell: false,
		customRenderActions: false,
		enableSort: false,
		enablePerPageOptions: false,
		pagination: {
			currentPage: 1,
			totalPages: 1,
			showNumberofPages: 1,
		}
	}

	const InitialSortBy = ["id", "name", "department", "email", "joined"];

	const InitialSearchBy = ["id", "name", "department", "email", "joined"];

	const InitialCustomRenderCell = {
		department: (row) => <span className={`department ${row?.department.slice(0, 2)}`}> {row?.department} </span>,
		// email: (row) => <input style={{ padding: '5px' }} type='text' defaultValue={row?.email} onBlur={(e) => handleEmailChange(e, row)} />
	};

	const InitialCustomRenderButtons = {
		view: (row) => <span onClick={event => handleViewRow(event, row)}> <EyeSvg style={{ color: '#b2a7fc', margin: '0 2', width: '25px', height: '25px' }} /> </span>,
		edit: (row) => <span onClick={event => handleEditRow(event, row)}> <EditSvg style={{ color: '#79a879', margin: '0 2', width: '25px', height: '25px' }} /> </span>,
		delete: (row) => <span onClick={event => handleDeleteRow(event, row)}> <DeleteSvg style={{ color: '#d66336', margin: '0 2', width: '25px', height: '25px' }} /> </span>,
	};

	const InitialNoDataMessage = 'No Data Found..';

	const [toastText, _toastText] = useState('');
	const [data, _data] = useState([...InitialData]);
	const [headers, _headers] = useState([...InitialHeaders]);
	const [reactTableLiteOptions, _reactTableLiteOptions] = useState({ ...InitialReactTableLiteOptions });

	const handleSubmitRow = event => {
		event.preventDefault();
		const newRow = {
			id: data?.length + 1,
			name: event.target[0].value,
			email: event.target[1].value,
			joined: event.target[2].value,
			department: event.target[3].value,
			is_checked: Boolean(event.target[4].value),
		}
		_data(old => ([...old, newRow]));
	};

	const handleEmailChange = (e, row) => {
		const newData = [...data];
		newData.forEach(item => {
			if (item?.id === row?.id) item.email = e.target.value;
		})
		_data([...newData]);
	};

	const handleShowToast = (text) => {
		_toastText(text);
		var x = document.getElementById("snackbar");
		if (!x?.classList?.contains('show')) {
			x.className = "show";
			setTimeout(function () { _toastText(''); x.className = x.className.replace("show", ""); }, 3000);
		}
	};

	const handleViewRow = (event, row) => {
		handleShowToast(`View ID-${row?.id}, ${row?.name}`);
	};

	const handleEditRow = (event, row) => {
		handleShowToast(`Edit ID-${row?.id}, ${row?.name}`);
	};

	const handleDeleteRow = (event, row) => {
		handleShowToast(`Delete ID-${row?.id}, ${row?.name}`);
	};

	const handlePaginate = (event, currentPage) => {
		console.log(currentPage)
		_reactTableLiteOptions(old => ({
			...old,
			pagination: {
				...old?.pagination,
				currentPage
			}
		}))
	};

	const CUSTOM_SEARCH_FORM = () => (
		<div>
			<form ref={customSearchFormRef}>
				<input name='search' placeholder='search data..' style={{ width: '260px', border: 0, borderBottom: '2px', padding: "1.2em 1.2em 1.2em 0.5em", background: '#f1f1f1' }} />
				<button type='button' ref={customCSVButtonRef}> Download </button>
			</form>
		</div>
	);

	return (
		<div id='Test'>
			<Toast text={toastText} />
			<div className='container'>
				<div className='sidebar'>
					<ToggleProps
						reactTableLiteOptions={reactTableLiteOptions}
						_reactTableLiteOptions={_reactTableLiteOptions}
					/>
				</div>
				<div className='content'>
					<NewRow
						handleSubmitRow={handleSubmitRow}
					/>
					{CUSTOM_SEARCH_FORM()}
					<Table
						data={data}
						headers={headers}
						checkedKey={InitialCheckedKey}
						disableCheckedKey={InitialDisableCheckedKey}
						customHeaders={InitialCustomHeaders}
						sortBy={reactTableLiteOptions?.enableSort ? InitialSortBy : []}
						searchable={true}
						downloadable={true}
						searchBy={InitialSearchBy}
						showActions={reactTableLiteOptions?.showActions}
						showMultiSelect={reactTableLiteOptions?.enableMultiSelect}
						showPagination={reactTableLiteOptions?.showPagination}
						actionTypes={InitialActionTypes}
						customRenderCell={reactTableLiteOptions?.customRenderCell ? InitialCustomRenderCell : {}}
						customRenderActions={reactTableLiteOptions?.customRenderActions ? InitialCustomRenderButtons : {}}
						currentPage={reactTableLiteOptions?.pagination?.currentPage}
						totalPages={reactTableLiteOptions?.pagination?.totalPages}
						showNumberofPages={reactTableLiteOptions?.pagination?.showNumberofPages}
						onRowView={handleViewRow}
						onRowEdit={handleEditRow}
						onRowDelete={handleDeleteRow}
						onPaginate={handlePaginate}
						showPerpageLimitOptions={reactTableLiteOptions?.enablePerPageOptions}
						perPageLimitOptions={InitialPerpageLimitOptions}
						noDataMessage={InitialNoDataMessage}
						// csvKeys={["joined", "name", "email"]}
						// downloadCsvButtonRef={customCSVButtonRef}
						// searchFormRef={customSearchFormRef}
					/>
				</div>
			</div>

		</div>
	)
}

export default DemoView;