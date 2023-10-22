

// Packages
import React from 'react';
import PropTypes from 'prop-types';

function PerPageOptions({

  // Alpha Numeric
  currentPerPageLimit,

  // Objects
  perPageLimitOptions,

  // Functions
  onPerPageLimitSelect,

  // Alpha Numeric
  perpageLimitOptionClass

}) {

  // ******Render Functions******

  const PER_PAGE_OPTIONS = () => (
    <select value={currentPerPageLimit} className={`react-table-lite-perpage-option-select ${perpageLimitOptionClass}`} onChange={(e, ...args) => { onPerPageLimitSelect(...args, e, e.target.value) }}>
      {perPageLimitOptions
        ? perPageLimitOptions?.map((option, index) => (
          <option key={index} value={option}> {option} </option>
        ))
        : null
      }
    </select>
  );

  return (
    <React.Fragment>
      {PER_PAGE_OPTIONS()}
    </React.Fragment>
  );
};

PerPageOptions.propTypes = {
  perPageLimitOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPerPageLimitSelect: PropTypes.func.isRequired,
  currentPerPageLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  perpageLimitOptionClass: PropTypes.string,
};

PerPageOptions.defaultProps = {
  perPageLimitOptions: [5, 10, 20, 30, 50],
  onPerPageLimitSelect: () => null,
  currentPerPageLimit: 5,
  perpageLimitOptionClass: ''
};

export default PerPageOptions;