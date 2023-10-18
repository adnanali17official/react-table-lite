import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/SearchBar.css';

function SearchBar({

  // Alpha Numeric
  searchString,

  // Functions
  handleOnSearch,
  handleSearchStringChange,

  // Classes
  searchFormClass,
  searchFormInputClass,
  searchFormButtonClass,
  searchFormButtonIconClass

}) {

  // ******Render Functions******

  const SEARCH_FORM = () => (
    <form className={`react-table-lite-search-form ${searchFormClass}`} onSubmit={handleOnSearch}>
      <input
        type='text'
        name='search'
        placeholder='Search'
        className={`react-table-lite-search-form-input ${searchFormInputClass}`}
        onChange={handleSearchStringChange}
        value={searchString}
      />
      <button type='submit' className={`react-table-lite-search-form-button ${searchFormButtonClass}`}>
        <MagnifyGlassIcon className={`react-table-lite-search-form-button-icon ${searchFormButtonIconClass}`} />
      </button>
    </form>
  );

  return (
    <React.Fragment>
      {SEARCH_FORM()}
    </React.Fragment>
  );
};


// ****** SVGs ******

function MagnifyGlassIcon({ ...props }) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      display="inline-block"
      viewBox="2 2 21 21"
    >
      {" "}
      <circle cx={11} cy={11} r={8} /> <path d="M21 21L16.65 16.65" />{" "}
    </svg>
  );
};

SearchBar.propTypes = {
  handleOnSearch: PropTypes.func.isRequired,
  handleSearchStringChange: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchFormClass: PropTypes.string,
  searchFormInputClass: PropTypes.string,
  searchFormButtonClass: PropTypes.string,
  searchFormButtonIconClass: PropTypes.string
};

SearchBar.defaultProps = {
  handleOnSearch: () => null,
  handleSearchStringChange: () => null,
  searchString: '',
  searchFormClass: '',
  searchFormInputClass: '',
  searchFormButtonClass: '',
  searchFormButtonIconClass: ''
};

export default SearchBar;