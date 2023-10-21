
import React from 'react';
import PropTypes from 'prop-types';

function PerPageOptions({

  // Alpha Numeric
  selectedPerPageLimit,

  // Objects
  perPageLimitOptions,

  // Functions
  onPerPageLimitSelect,

  // Alpha Numeric
  perpageLimitOptionClass

}) {

  // ******Render Functions******

  const PER_PAGE_OPTIONS = () => (
    <select value={selectedPerPageLimit} className={`react-table-lite-perpage-option-select ${perpageLimitOptionClass}`} onChange={(e, ...args) => { onPerPageLimitSelect(...args, e, e.target.value) }}>
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
  selectedPerPageLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  perpageLimitOptionClass: PropTypes.string,
};

PerPageOptions.defaultProps = {
  perPageLimitOptions: [5, 10, 20, 30, 50],
  onPerPageLimitSelect: () => null,
  selectedPerPageLimit: 5,
  perpageLimitOptionClass: ''
};

export default PerPageOptions;