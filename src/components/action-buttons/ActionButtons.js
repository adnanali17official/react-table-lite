import React from "react";
import PropTypes from 'prop-types';

const ActionButtons = ({
	// Objects
	dataRow,
	actionTypes,
	customRenderActions,

	// Boolean
	showActions,

	// Functions
	onRowView,
	onRowEdit,
	onRowDelete,

	// Classes
	cellClass,
	actionButtonContainerClass,
	actionButtonClass,
	actionButtonIconClass


}) => {

	// ******Render Functions******

	const TABLE_ROW_ACTION_BUTTONS = () => {
		let customViewAction = null, customEditAction = null, customDeleteAction = null;
		let showEditBtn = null, showViewBtn = null, showDeleteBtn = null;
		actionTypes?.forEach((action) => {
			if (action.toUpperCase() === "VIEW")
				showViewBtn = true;
			if (action.toUpperCase() === "DELETE")
				showDeleteBtn = true;
			if (action.toUpperCase() === "EDIT")
				showEditBtn = true;
		});

		if (customRenderActions && customRenderActions['view']) {
			customViewAction = customRenderActions['view']?.(dataRow)
		}
		if (customRenderActions && customRenderActions['edit']) {
			customEditAction = customRenderActions['edit']?.(dataRow)
		}
		if (customRenderActions && customRenderActions['delete']) {
			customDeleteAction = customRenderActions['delete']?.(dataRow)
		}
		if (showActions) {
			return (
				<td
					className={`react-table-lite-cell react-table-lite-actions ${cellClass}`}
				>
					<div className={`react-table-lite-action-btn-container ${actionButtonContainerClass}`}>
						{showViewBtn
							? customViewAction ||
							<button
								className={`react-table-lite-action-btn-view-btn ${actionButtonClass}`}
								onClick={(e, ...args) => { onRowView(...args, e, dataRow) }}
							>
								<i>
									<svg className={`react-table-lite-action-btn-icon ${actionButtonIconClass}`} style={{ verticalAlign: "middle", display: 'inline-block' }} fill="currentColor" viewBox="0 0 20 20"> {" "} <path d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307 0-2.379 1.99-4.309 4.445-4.309s4.444 1.93 4.444 4.309c0 2.379-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z" />{" "} </svg>
								</i>
							</button>
							: null
						}
						{showEditBtn
							? customEditAction ||
							<button
								className={`react-table-lite-action-btn-edit-btn ${actionButtonClass}`}
								onClick={(e, ...args) => { onRowEdit(...args, e, dataRow) }}
							>
								<i>
									<svg className={`react-table-lite-action-btn-icon ${actionButtonIconClass}`} fill="currentColor" style={{ verticalAlign: "middle", display: 'inline-block' }} viewBox="0 0 24 24" > <path d="M21.561 5.318l-2.879-2.879A1.495 1.495 0 0017.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 00-1 1v13a1 1 0 001 1h13a1 1 0 001-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06zM11.5 14.672L9.328 12.5l6.293-6.293 2.172 2.172-6.293 6.293zm-2.561-1.339l1.756 1.728L9 15l-.061-1.667zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29.464-.19.896-.347 1.188-.64L16 13v6zm2.5-11.328L16.328 5.5l1.293-1.293 2.171 2.172L18.5 7.672z"></path> </svg>
								</i>
							</button>
							: null
						}
						{showDeleteBtn
							? customDeleteAction ||
							<button
								className={`react-table-lite-action-btn-delete-btn ${actionButtonClass}`}
								onClick={(e, ...args) => { onRowDelete(...args, e, dataRow) }}
							>
								<i>
									<svg className={`react-table-lite-action-btn-icon ${actionButtonIconClass}`} fill="currentColor" viewBox="0 0 1408 1792" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M512 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zM768 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zM1024 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zM480 384h448l-48-117q-7-9-17-11h-317q-10 2-17 11zM1408 416v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z" /></svg>
								</i>

							</button>
							: null
						}
					</div>
				</td>
			);
		} else return (null);
	};

	return (
		<React.Fragment>
			{TABLE_ROW_ACTION_BUTTONS()}
		</React.Fragment>
	);
};

ActionButtons.propTypes = {
	showActions: PropTypes.bool.isRequired,
	dataRow: PropTypes.object,
	actionTypes: PropTypes.arrayOf(PropTypes.string),
	customRenderActions: PropTypes.object,
	onRowView: PropTypes.func,
	onRowEdit: PropTypes.func,
	onRowDelete: PropTypes.func,
	cellClass: PropTypes.string,
	actionButtonContainerClass: PropTypes.string,
	actionButtonClass: PropTypes.string,
	actionButtonIconClass: PropTypes.string
}

ActionButtons.defaultProps = {
	actionTypes: ['view', 'edit', 'delete'],
	onRowView: () => null,
	onRowEdit: () => null,
	onRowDelete: () => null,
	cellClass: '',
	actionButtonContainerClass: '',
	actionButtonClass: '',
	actionButtonIconClass: ''
};

export default ActionButtons;
