import React, { useRef, useState, useEffect } from 'react';
import Table from '../../dist/table.esm';
import ToggleProps from './components/toggle_props/ToggleProps';
import EyeSvg from './components/eye_svg/EyeSvg';
import EditSvg from './components/edit_svg/EditSvg';
import DeleteSvg from './components/delete_svg/DeleteSvg';
import Toast from './components/toast/Toast';
import NewRow from './components/new_row/NewRow';
import './demo-view.css';

function DemoView() {

	useEffect(() => {
		fetchServerData(1,5);
	}, []);

	const InitialStaticData = [
		{
			id: 1,
			title: "finance news",
			description: "Lorem Ipsum dolor sit amet",
			is_checked: true,
		},
		{
			id: 2,
			title: "finance news",
			description: "Supports authentication, custom rate"
		},
		{
			id: 3,
			title: "tech news",
			description: "The max width can be changed with one line",
			is_disabled: true
		},

		{
			id: 4,
			title: "sports news",
			description: "Liverpool vs Arsenal on October 22nd"
		},
	];

	const fetchServerData = (offset, limit) => {
		const URL = `https://api.slingacademy.com/v1/sample-data/blog-posts?offset=${offset}&limit=${limit}`;
		fetch(URL)
		.then(res => res.json())
		.then(data => { if (data?.blogs) _serverData(data?.blogs?.slice(0,limit)) })
		.catch(err => console.error(err));
	};

	const customSearchFormRef = useRef(null);
	const customCSVButtonRef = useRef(null);

	const InitialCheckedKey = 'is_checked';
	const InitialDisableCheckedKey = 'is_disabled';
	const InitialHeaders = ['id', 'title', 'description'];
	const InitialCustomHeaders = { "id": "Id", "title": "Title", "description": "Description" };
	const InitialSortBy = ["id", "title", "description"];
	const InitialCsvKeys = ["id", "title", "description"];
	const InitialSearchBy = ["id", "title", "description"];
	const InitialActionTypes = ["edit", "view", "delete"];
	const InitialPerpageLimitOptions = [5, 10, 20, 30, 50];
	const InitialReactTableLiteOptions = {
		useLiveData: false,
		showActions: true,
		showPagination: false,
		enableMultiSelect: false,
		customRenderCell: false,
		customRenderActions: false,
		enableSort: false,
		showPerPageOptions: false,
		pagination: {
			perPageLimit: 5, 
			currentPage: 1,
			totalPages: 1,
			showNumberofPages: 1,
		}
	}

	const InitialCustomRenderCell = {
		description: (row) => <marquee> {row?.description} </marquee>
	};

	const InitialCustomRenderButtons = {
		view: (row) => <span onClick={event => handleViewRow(event, row)}> <EyeSvg style={{ color: '#b2a7fc', margin: '0 2', width: '25px', height: '25px' }} /> </span>,
		edit: (row) => <span onClick={event => handleEditRow(event, row)}> <EditSvg style={{ color: '#79a879', margin: '0 2', width: '25px', height: '25px' }} /> </span>,
		delete: (row) => <span onClick={event => handleDeleteRow(event, row)}> <DeleteSvg style={{ color: '#d66336', margin: '0 2', width: '25px', height: '25px' }} /> </span>,
	};

	const InitialNoDataMessage = 'No Data Found..';

	const [toastText, _toastText] = useState('');
	const [serverData, _serverData] = useState([]);
	const [staticData, _staticData] = useState(InitialStaticData);
	const [reactTableLiteOptions, _reactTableLiteOptions] = useState({ ...InitialReactTableLiteOptions });

	const handleSubmitRow = event => {
		event.preventDefault();
		const newRow = {
			id: InitialStaticData?.length + 1,
			title: event.target[0].value,
			description: event.target[1].value,			
		}		
		_staticData(old => ([...old, newRow]));
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
		handleShowToast(`View ID-${row?.id}, ${row?.title}`);
	};

	const handleEditRow = (event, row) => {
		handleShowToast(`Edit ID-${row?.id}, ${row?.title}`);
	};

	const handleDownload = (event) => {
		console.log(event);
		handleShowToast('Report Downloaded');
	};

	const handleDeleteRow = (event, row) => {
		handleShowToast(`Delete ID-${row?.id}, ${row?.title}`);
	};

	const handlePaginate = (event, currentPage) => {
		console.log(currentPage)
		_reactTableLiteOptions(old => ({
			...old,
			pagination: {
				...old?.pagination,
				currentPage,
			}
		}));
		const offset = currentPage === 1 ? 1 : (currentPage -1) * reactTableLiteOptions?.pagination?.perPageLimit;
		const perPage = reactTableLiteOptions?.pagination?.perPageLimit;
		fetchServerData(offset, perPage);
	};

	const handlePerPageLimit = (event, limit) => {
		_reactTableLiteOptions(old => ({
			...old,
			pagination: {
				...old?.pagination,
				perPageLimit: limit,
				totalPages: Math.ceil(50/limit),
				currentPage: 1
			}
		}));
		const offset = 1;
		const perPage = limit;
		fetchServerData(offset, perPage);
	};

	const CUSTOM_SEARCH_FORM = () => (
		<div>
			<form id='Custom-Search-Form' ref={customSearchFormRef}>
				<input name='search' placeholder='search data..'/>
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
						fetchServerData={fetchServerData}
					/>
				</div>
				<div className='content'>
					{!reactTableLiteOptions?.useLiveData &&
						<NewRow
							handleSubmitRow={handleSubmitRow}
						/>
					}
					{CUSTOM_SEARCH_FORM()}
					<Table				
						data={reactTableLiteOptions?.useLiveData ? serverData : staticData}
						headers={InitialHeaders}
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
						currentPerPageLimit={reactTableLiteOptions?.pagination?.perPageLimit}
						onRowView={handleViewRow}
						onRowEdit={handleEditRow}
						onRowDelete={handleDeleteRow}
						onPaginate={handlePaginate}
						onDownload={handleDownload}
						onPerPageLimitSelect={handlePerPageLimit}
						showPerpageLimitOptions={reactTableLiteOptions?.showPerPageOptions}
						perPageLimitOptions={InitialPerpageLimitOptions}
						noDataMessage={InitialNoDataMessage}
						csvKeys={InitialCsvKeys}
						downloadCsvButtonRef={customCSVButtonRef}
						searchFormRef={customSearchFormRef}
						paginationIconClass='custom-paginate-icon'
						paginationItemClass='custom-pagination-item'
						paginationActiveItemClass='custom-active-pagination-item'
					/>
				</div>
			</div>

		</div>
	)
}

export default DemoView;