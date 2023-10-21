
// Packages
import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';

// Components
import ActionButtons from "../action-buttons/ActionButtons";
import Pagination from "../pagination/Pagination";
import SearchBar from "../search-bar/SearchBar";
import PerPageOptions from '../perpage-options/PerPageOptions';
import DownloadCsvButton from '../download-csv-button/DownloadCsvButton';

// Utils
import matchCaseInsensitiveSearch from "../../script/match_case_insensitive_search";
import export_table_to_csv from "../../script/download_csv";

// Styles
import '../../styles/Table.css';

const Table = ({

	// Objects
	data,
	headers,
	customHeaders,
	actionTypes,
	sortBy,
	searchBy,
	csvKeys,
	perPageLimitOptions,
	customRenderCell,
	customRenderActions,
	searchFormRef,
	downloadCsvButtonRef,

	// Alpha Numeric
	noDataMessage,
	checkedKey,
	disableCheckedKey,
	totalPages,
	showNumberofPages,
	currentPerPageLimit,
	currentPage,
	fileName,

	// Boolean
	showActions,
	searchable,
	downloadable,
	showMultiSelect,
	showPagination,
	showPerpageLimitOptions,

	// Functions
	onSort,
	onRowSelect,
	onAllRowSelect,
	onRowView,
	onRowEdit,
	onRowDelete,
	onPaginate,
	onDownload,
	onPerPageLimitSelect,

	// Classes
	containerClass,
	tableClass,
	headerClass,
	checkboxClass,
	cellClass,
	rowClass,
	perpageLimitOptionClass,
	actionButtonContainerClass,
	actionButtonClass,
	actionButtonIconClass,
	searchFormClass,
	searchFormInputClass,
	searchFormButtonClass,
	searchFormButtonIconClass,
	downloadCsvButtonClass,
	downloadCsvButtonIconClass,
	paginationContainerClass,
	paginationIconClass,
	paginationItemClass,
	paginationActiveItemClass,

	// Styles
	containerStyle,
	tableStyle,
	headerStyle,
	rowStyle,
	cellStyle

}) => {

	const react_table_ref = useRef(null);
	const [rtlData, _rtlData] = useState([]);
	const [currentSorting, _currentSorting] = useState({});
	const [checkedRows, _checkedRows] = useState([]);
	const [search, _search] = useState({
		searchString: '',
		appliedSearch: 0,
	});

	// Map a local state of the data prop
	useEffect(() => {
		if (data && headers && data?.length && headers?.length) {
			resetData();
		}
	}, [data, headers]);

	// Reset the super checkbox if rtlData is changed 
	useEffect(() => {
		if (showMultiSelect) {
			const parentTable = react_table_ref?.current;
			let header_checkBox = parentTable.querySelector((".react-table-lite-super-checkbox"))
			let row_checkBoxes = parentTable.querySelector(("tbody"))
			row_checkBoxes = Array.from(row_checkBoxes.getElementsByClassName("react-table-lite-row-checkbox"));
			if (row_checkBoxes?.every(Row => Row.checked)) {
				header_checkBox.checked = true;
			} else {
				header_checkBox.checked = false;
			}
		}
	}, [rtlData])

	// If a custom searchFormRef is provided
	// attach the custom search submit handler to it
	useEffect(() => {
		if (searchFormRef && searchFormRef?.current && searchable) {
			searchFormRef.current.addEventListener("submit", handleCustomSearchBarOnSearch);
			return () => {
				searchFormRef.current.removeEventListener("submit", handleCustomSearchBarOnSearch);
			};
		}
	}, [rtlData, searchFormRef, searchable]);

	// If a custom downloadCsvButtonRef is provided
	// attach the download file handler to it
	useEffect(() => {
		if (downloadCsvButtonRef && downloadCsvButtonRef?.current && downloadable && rtlData) {
			downloadCsvButtonRef.current.addEventListener("click", handleOnCSVDownload);
			return () => {
				downloadCsvButtonRef.current.removeEventListener("click", handleOnCSVDownload);
			};
		}
	}, [rtlData, downloadCsvButtonRef, downloadable, fileName, csvKeys]);

	const resetData = () => {
		const dataArray = [...data];
		// Apply the same applied sorting to the data if the rows are updated
		if (currentSorting && currentSorting?.sortKey && currentSorting?.direction) {
			if (currentSorting?.direction === 'dsc') {
				dataArray.sort((a, b) => {
					return isNaN(a[currentSorting?.sortKey]) && isNaN(b[currentSorting?.sortKey])
						? a[currentSorting?.sortKey].localeCompare(b[currentSorting?.sortKey])
						: Number(a[currentSorting?.sortKey]) - Number(b[currentSorting?.sortKey])
				});
			} else {
				dataArray.sort((a, b) => {
					return isNaN(a[currentSorting?.sortKey]) && isNaN(b[currentSorting?.sortKey])
						? b[currentSorting?.sortKey].localeCompare(a[currentSorting?.sortKey])
						: Number(b[currentSorting?.sortKey]) - Number(a[currentSorting?.sortKey])
				});
			}
		}
		_rtlData([...dataArray]);
		// Reset the searches
		_search(old => ({
			appliedSearch: 0,
			searchString: '',
		}));
	};

	// ******Event Handlers******

	const handleOnSort = (e, sortKey, direction) => {
		const dataArray = [...rtlData];
		if (onSort) {
			onSort(e, dataArray, sortKey, direction);
		} else {
			if (direction === 'dsc') {
				dataArray.sort((a, b) => {
					return isNaN(a[sortKey]) && isNaN(b[sortKey])
						? a[sortKey].localeCompare(b[sortKey])
						: Number(a[sortKey]) - Number(b[sortKey])
				});
			} else {
				dataArray.sort((a, b) => {
					return isNaN(a[sortKey]) && isNaN(b[sortKey])
						? b[sortKey].localeCompare(a[sortKey])
						: Number(b[sortKey]) - Number(a[sortKey])
				});
			}
			_currentSorting({ sortKey, direction });
			_rtlData([...dataArray]);
		}
	};

	const handleOnClickCheckBoxes = (e, item = undefined) => {
		// const parentTable = e.target.parentNode.closest("table");
		const parentTable = react_table_ref?.current;
		let header_checkBox = parentTable.querySelector((".react-table-lite-super-checkbox"))
		let row_checkBoxes = parentTable.querySelector(("tbody"))
		row_checkBoxes = Array.from(row_checkBoxes.getElementsByClassName("react-table-lite-row-checkbox"));

		if (e.target.classList.contains('react-table-lite-super-checkbox')) {
			// If the header checkbox is clicked, use it's value to assign checked to all other checkboxes
			_checkedRows(old => {
				if (header_checkBox?.checked)
					return [...rtlData?.map(Row => `select-${JSON.stringify(Row)}`)]
				else (header_checkBox?.checked)
				return []
			});
			return;
		}
		// If any of the rows checkbox is clicked use it to set checkedRows array and also 
		// mark the super checkbox either checked or unchecked
		let newCheckedRows = [];
		if (e.target.checked) {
			newCheckedRows = [...checkedRows, `select-${JSON.stringify(item)}`];
		} else {
			newCheckedRows = [...checkedRows?.filter(Row => Row != `select-${JSON.stringify(item)}`)];
		} if (newCheckedRows.length === rtlData?.length) {
			header_checkBox.checked = true;
		} else {
			header_checkBox.checked = false;
		}
		_checkedRows(newCheckedRows);
	};

	const handleSearchStringChange = (e) => {
		e.persist();
		_search(old => ({ ...old, searchString: e?.target?.value }));
	};

	const handleOnSearch = (e) => {
		e.preventDefault();
		let searchedData = [];
		let dataArray = [...data];
		if (search?.searchString &&
			search?.searchString?.trim() &&
			searchBy
		) {
			let searchStringArray = search?.searchString.trim().split(",");
			let searchKeys = searchBy;
			dataArray.forEach((row) => {
				for (const key in row) {
					let search_condition =
						searchKeys.indexOf(key) !== -1 &&
						row.hasOwnProperty(key) &&
						!searchedData.includes(row) &&
						matchCaseInsensitiveSearch(String(row[key]), searchStringArray);
					if (search_condition) {
						searchedData.push(row);
					}
				}
			})
		}
		if (!search?.searchString.trim()) {
			resetData();
		} else {
			_rtlData(old => search?.searchString.trim() ? [...searchedData] : [...data]);
			_search(old => ({
				...old,
				searchString: old?.searchString?.trim(),
				appliedSearch: old?.searchString?.trim()?.length
			}));
		}

	};

	const handleCustomSearchBarOnSearch = (e) => {
		e.preventDefault();
		let searchedData = [];
		let dataArray = [...data];
		const searchString = searchFormRef?.current?.querySelector('input')?.value || '';
		if (searchString &&
			searchBy
		) {
			let searchStringArray = searchString.trim().split(",");
			let searchKeys = searchBy;
			dataArray.forEach((row) => {
				for (const key in row) {
					let search_condition =
						searchKeys.indexOf(key) !== -1 &&
						row.hasOwnProperty(key) &&
						!searchedData.includes(row) &&
						matchCaseInsensitiveSearch(String(row[key]), searchStringArray);
					if (search_condition) {
						searchedData.push(row);
					}
				}
			})
		}
		if (!searchString.trim()) {
			resetData();
		} else {
			_rtlData(old => searchString?.trim() ? [...searchedData] : [...data]);
			_search(old => ({
				...old,
				searchString: searchString?.trim(),
				appliedSearch: Boolean(searchString?.trim())
			}));
		}
	};

	const handleOnCSVDownload = () => {
		if (onDownload) {
			onDownload();
		}
		export_table_to_csv(rtlData, fileName, csvKeys);
	};

	// ******Render Functions******

	const TABLE_HEADER = () => {
		// Map table headers from headers props 
		// Display the header text either from the value in customHeaders or use the headers value instead 
		return (
			<thead>
				<tr className={`react-table-lite-row ${rowClass}`} style={rowStyle}>
					{ /****  Main Checkbox  ****/
						showMultiSelect &&
						<th
							style={headerStyle}
							className={`react-table-lite-header ${headerClass}`}
						>
							<input
								type="checkbox"
								className={`react-table-lite-super-checkbox ${checkboxClass}`}
								checked={rtlData && rtlData?.every(item => item[checkedKey]) || undefined}
								onChange={(e, ...args) => onAllRowSelect ? onAllRowSelect(...args, e, rtlData) : handleOnClickCheckBoxes(e)}
							/>
						</th>
					}
					{  /****  Headers text  ****/
						headers &&
						headers?.map((heading, index) => (
							<th
								key={index}
								style={headerStyle}
								className={`react-table-lite-header ${headerClass}`}
							>
								<span>
									{
										customHeaders &&
											customHeaders?.[heading]
											? customHeaders?.[heading]
											: heading
									}
								</span>
								{ /****  Headers sorting  ****/
									sortBy &&
										sortBy?.find(sortHeader => sortHeader == heading)
										? <span>
											<span onClick={e => handleOnSort(e, heading, 'dsc')} > ▲ </span>
											<span onClick={e => handleOnSort(e, heading, 'asc')}>  ▼ </span>
										</span>
										: null
								}
							</th>
						))
					}
					{ /****  Actions header  ****/
						showActions
							? <th
								style={headerStyle}
								className={`react-table-lite-header ${headerClass}`}
							>
								<span> Actions </span>
							</th>
							: null
					}
				</tr>
			</thead>
		);
	};

	const TABLE_BODY = () => {
		// Map table body from local rtlData state if both data and header props are present and not empty
		return (
			<tbody>
				{
					rtlData &&
					headers?.length &&
					rtlData?.map((item, index) => (
						<tr key={`row-${index}-${JSON.stringify(item)}`} className={`react-table-lite-row ${rowClass}`} style={rowStyle}>
							{showMultiSelect
								? <td
									style={cellStyle}
									className={`react-table-lite-cell ${cellClass}`}
								>
									<input
										type="checkbox"
										value={`select-${JSON.stringify(item)}`}
										className={`react-table-lite-row-checkbox ${checkboxClass}`}
										disabled={item[disableCheckedKey] ? item[disableCheckedKey] : false}
										checked={item[checkedKey] ? item[checkedKey] : checkedRows?.includes(`select-${JSON.stringify(item)}`)}
										onChange={(e, ...args) => onRowSelect ? onRowSelect(...args, e, item) : handleOnClickCheckBoxes(e, item)}
									/>
								</td>
								: null
							}
							{headers.map((header_key, index) => (
								<React.Fragment key={`value-${index}`}>
									<td
										style={cellStyle}
										className={`react-table-lite-cell ${cellClass}`}
									>
										{/* Render either the element from customRender prop or directly render the item's value */}
										{customRenderCell &&
											customRenderCell[header_key]
											? customRenderCell[header_key]?.(item)
											: item?.[header_key] || '-'
										}
									</td>
								</React.Fragment>
							))
							}
							{showActions &&
								<ActionButtons
									dataRow={item}
									showActions={showActions}
									actionTypes={actionTypes}
									customRenderActions={customRenderActions}
									onRowView={onRowView}
									onRowEdit={onRowEdit}
									onRowDelete={onRowDelete}
									cellClass={cellClass}
									actionButtonContainerClass={actionButtonContainerClass}
									actionButtonClass={actionButtonClass}
									actionButtonIconClass={actionButtonIconClass}
								/>
							}
						</tr>
					))
				}
				{
					!rtlData || rtlData?.length < 1
						? <tr className={`react-table-lite-row ${rowClass}`} style={rowStyle}>
							<td style={cellStyle} colSpan={showActions ? headers?.length + 1 : headers?.length} className={`react-table-lite-cell ${cellClass}`}>
								{noDataMessage}
							</td>
						</tr>
						: null
				}
			</tbody>
		);
	};

	const PAGINATION = () => {
		return (
			<React.Fragment>
				{showPagination ?
					<Pagination
						totalPages={totalPages}
						showNumberofPages={showNumberofPages}
						currentPage={currentPage}
						onPaginate={onPaginate}
						paginationContainerClass={paginationContainerClass}
						paginationIconClass={paginationIconClass}
						paginationItemClass={paginationItemClass}
						paginationActiveItemClass={paginationActiveItemClass}
					/>
					:
					null
				}
			</React.Fragment>
		);
	};

	const PERPAGE = () => {
		return (
			<React.Fragment>
				{showPerpageLimitOptions
					? <PerPageOptions
						currentPerPageLimit={currentPerPageLimit}
						onPerPageLimitSelect={onPerPageLimitSelect}
						perPageLimitOptions={perPageLimitOptions}
						perpageLimitOptionClass={perpageLimitOptionClass}
					/>
					: null
				}
			</React.Fragment>
		);
	};

	const SEARCHBAR = () => {
		return (
			<React.Fragment>
				{searchable && !searchFormRef
					? <SearchBar
						searchString={search?.searchString}
						handleSearchStringChange={handleSearchStringChange}
						handleOnSearch={handleOnSearch}
						searchFormClass={searchFormClass}
						searchFormInputClass={searchFormInputClass}
						searchFormButtonClass={searchFormButtonClass}
						searchFormButtonIconClass={searchFormButtonIconClass}
					/>
					: null
				}
			</React.Fragment>
		);
	};

	const DOWNLOAD_CSV_BUTTON = () => {
		return (
			<React.Fragment>
				{downloadable && !downloadCsvButtonRef
					? <DownloadCsvButton
						handleOnCSVDownload={handleOnCSVDownload}
						downloadCsvButtonClass={downloadCsvButtonClass}
						downloadCsvButtonIconClass={downloadCsvButtonIconClass}
					/>
					: null
				}
			</React.Fragment>
		);
	};

	return (
		<div className={`react-table-lite-container ${containerClass}`} style={containerStyle}>
			<div className={`react-table-lite-top-section`}>
				{SEARCHBAR()}
				{DOWNLOAD_CSV_BUTTON()}
			</div>
			<table ref={react_table_ref} className={`react-table-lite-table ${tableClass}`} style={tableStyle}>
				{TABLE_HEADER()}
				{TABLE_BODY()}
			</table>
			<div className={`react-table-lite-bottom-section`}>
				{PAGINATION()}
				{PERPAGE()}
			</div>
		</div>
	);
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	headers: PropTypes.array.isRequired,
	customHeaders: PropTypes.object,
	actionTypes: PropTypes.arrayOf(PropTypes.string),
	sortBy: PropTypes.arrayOf(PropTypes.string),
	searchBy: PropTypes.arrayOf(PropTypes.string),
	csvKeys: PropTypes.arrayOf(PropTypes.string),
	perPageLimitOptions: PropTypes.arrayOf(PropTypes.number),
	customRenderCell: PropTypes.object,
	customRenderActions: PropTypes.object,
	searchFormRef: PropTypes.any,
	downloadCsvButtonRef: PropTypes.any,

	noDataMessage: PropTypes.string,
	checkedKey: PropTypes.string,
	disableCheckedKey: PropTypes.string,
	totalPages: PropTypes.number,
	currentPerPageLimit: PropTypes.number,
	showNumberofPages: PropTypes.number,
	currentPage: PropTypes.number,
	fileName: PropTypes.string,

	showActions: PropTypes.bool,
	searchable: PropTypes.bool,
	downloadable: PropTypes.bool,
	showMultiSelect: PropTypes.bool,
	showPagination: PropTypes.bool,
	showPerpageLimitOptions: PropTypes.bool,

	onSort: PropTypes.func,
	onRowSelect: PropTypes.func,
	onAllRowSelect: PropTypes.func,
	onRowView: PropTypes.func,
	onRowEdit: PropTypes.func,
	onRowDelete: PropTypes.func,
	onPaginate: PropTypes.func,
	onDownload: PropTypes.func,
	onPerPageLimitSelect: PropTypes.func,

	containerClass: PropTypes.string,
	tableClass: PropTypes.string,
	headerClass: PropTypes.string,
	checkboxClass: PropTypes.string,
	cellClass: PropTypes.string,
	rowClass: PropTypes.string,
	perpageLimitOptionClass: PropTypes.string,
	actionButtonContainerClass: PropTypes.string,
	actionButtonClass: PropTypes.string,
	actionButtonIconClass: PropTypes.string,
	searchFormClass: PropTypes.string,
	searchFormInputClass: PropTypes.string,
	searchFormButtonClass: PropTypes.string,
	searchFormButtonIconClass: PropTypes.string,
	downloadCsvButtonClass: PropTypes.string,
	downloadCsvButtonIconClass: PropTypes.string,
	paginationContainerClass: PropTypes.string,
	paginationIconClass: PropTypes.string,
	paginationItemClass: PropTypes.string,
	paginationActiveItemClass: PropTypes.string,

	containerStyle: PropTypes.object,
	tableStyle: PropTypes.object,
	headerStyle: PropTypes.object,
	rowStyle: PropTypes.object,
	cellStyle: PropTypes.object
};

Table.defaultProps = {
	noDataMessage: 'No data found',
	fileName: 'data.csv',
	showActions: false,
	searchable: false,
	downloadable: false,
	showMultiSelect: false,
	showPagination: false,
	showPerpageLimitOptions: false,
	containerClass: '',
	tableClass: '',
	headerClass: '',
	checkboxClass: '',
	cellClass: '',
	rowClass: '',
	perpageLimitOptionClass: '',
	actionButtonContainerClass: '',
	actionButtonClass: '',
	actionButtonIconClass: '',
	searchFormClass: '',
	searchFormInputClass: '',
	searchFormButtonClass: '',
	searchFormButtonIconClass: '',
	downloadCsvButtonClass: '',
	downloadCsvButtonIconClass: '',
	paginationContainerClass: '',
	paginationIconClass: '',
	paginationItemClass: '',
	paginationActiveItemClass: '',
	containerStyle: {},
	tableStyle: {},
	headerStyle: {},
	rowStyle: {},
	cellStyle: {}
};


export default Table;