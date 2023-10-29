// Packages
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import generatePagination from '../../script/generate_pagination';

// Styles
import '../../styles/Pagination.css';

function Pagination({

  // Alpha Numeric
  totalPages = 1,
  currentPage = 1,
  showNumberofPages = 1,

  // Functions
  onPaginate = () => null,

  // Classes
  paginationContainerClass = '',
  paginationIconClass = '',
  paginationItemClass = '',
  paginationActiveItemClass = ''

}) {

  const [currentPagination, _currentPagination] = useState([])

  useEffect(() => {
    if (totalPages && currentPage && showNumberofPages) {
      const paginationArray = generatePagination(totalPages, showNumberofPages, currentPage);
      _currentPagination([...paginationArray]);
    }
  }, [totalPages, currentPage, showNumberofPages]);

  // ******Render Functions******

  const LEFT_ARROWS = () => (
    currentPage != 1
      ? <React.Fragment>
        <JumpPageIcon
          onClick={(e, ...args) => onPaginate(...args, e, 1)}
          className={`react-table-lite-pagination-jump-icon-left ${paginationIconClass}`} />
        <TogglePageIcon
          onClick={(e, ...args) => onPaginate(...args, e, currentPage - 1)}
          className={`react-table-lite-pagination-toggle-icon-left ${paginationIconClass}`}
        />
      </React.Fragment>
      : null
  );

  const RIGHT_ARROWS = () => (
    totalPages != currentPage
      ? <React.Fragment>
        <TogglePageIcon
          onClick={(e, ...args) => onPaginate(...args, e, currentPage + 1)}
          className={`react-table-lite-pagination-toggle-icon-right ${paginationIconClass}`}
        />
        <JumpPageIcon
          onClick={(e, ...args) => onPaginate(...args, e, totalPages)}
          className={`react-table-lite-pagination-jump-icon-right ${paginationIconClass}`}
        />
      </React.Fragment>
      : null
  );

  const PAGES = () => (
    currentPagination?.map((pageNo) => (
      <span
        key={pageNo}
        onClick={(e) => onPaginate(e, pageNo)}
        className={`react-table-lite-pagination-item 
        ${paginationItemClass} 
        ${pageNo == currentPage
            ? (paginationActiveItemClass || 'react-table-lite-pagination-active-item')
            : ''
          }`
        }
      >
        {pageNo}
      </span>
    ))
  );

  return (
    <div className={`react-table-lite-pagination-container ${paginationContainerClass}`}>
      {LEFT_ARROWS()}
      {PAGES()}
      {RIGHT_ARROWS()}
    </div>
  )
}

// ****** SVGs ******

function JumpPageIcon({ ...props }) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M12 2v12h-2v-5.5l-5 5v-11l5 5v-5.5z" />
    </svg>
  )
};

function TogglePageIcon({ ...props }) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M3 2l10 6-10 6z" />
    </svg>

  )
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  showNumberofPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func,
  paginationContainerClass: PropTypes.string,
  paginationIconClass: PropTypes.string,
  paginationItemClass: PropTypes.string,
  paginationActiveItemClass: PropTypes.string
};

// Pagination.defaultProps = {
//   totalPages: 1,
//   showNumberofPages: 1,
//   currentPage: 1,
//   onPaginate: () => null,
//   paginationContainerClass: '',
//   paginationIconClass: '',
//   paginationItemClass: '',
//   paginationActiveItemClass: ''
// };

export default Pagination;