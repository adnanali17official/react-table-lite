
import React from 'react';
import PropTypes from 'prop-types';

function PerPageOptions({

  // Objects
  perPageLimitOptions,

  // Functions
  onPerPageLimitSelect,

  // Alpha Numeric
  perpageLimitOptionClass

}) {

  // ******Render Functions******

  const PER_PAGE_OPTIONS = () => (
    <select className={`react-table-lite-perpage-option-select ${perpageLimitOptionClass}`} onChange={(e, ...args) => { onPerPageLimitSelect(...args, e, e.target.value) }}>
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
  perpageLimitOptionClass: PropTypes.string,
};

PerPageOptions.defaultProps = {
  perPageLimitOptions: [5, 10, 20, 30, 50],
  onPerPageLimitSelect: () => null,
  perpageLimitOptionClass: ''
};

export default PerPageOptions;