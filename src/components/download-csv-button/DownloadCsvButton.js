// Packages
import React from 'react';
import PropTypes from 'prop-types';

function DownloadCsvButton({

  // Functions
  handleOnCSVDownload = () => null,

  // Classes
  downloadCsvButtonClass = '',
  downloadCsvButtonIconClass = ''

}) {

  // ******Render Functions******

  const DOWNLOAD_CSV_BUTTON = () => (
    <button onClick={handleOnCSVDownload} className={`react-table-lite-download-csv-button ${downloadCsvButtonClass}`}>
      <DownloadIcon className={`react-table-lite-download-csv-button-icon ${downloadCsvButtonIconClass}`} />
    </button>
  );

  return (
    <React.Fragment>
      {DOWNLOAD_CSV_BUTTON()}
    </React.Fragment>
  );
};

const DownloadIcon = ({ ...props }) => {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 24 24"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
    </svg>
  );
};

DownloadCsvButton.propTypes = {
  handleOnCSVDownload: PropTypes.func,
  downloadCsvButtonClass: PropTypes.string,
  downloadCsvButtonIconClass: PropTypes.string,
};

// DownloadCsvButton.defaultProps = {
//   handleOnCSVDownload: () => null,
//   downloadCsvButtonClass: '',
//   downloadCsvButtonIconClass: ''
// };

export default DownloadCsvButton;