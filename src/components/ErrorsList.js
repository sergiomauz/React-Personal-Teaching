import React from 'react';
import PropTypes from 'prop-types';

const ErrorsList = props => {
  const { errorsInfo } = props;

  return (
    <ul className="list-group border-0 w-100">
      {
        errorsInfo.length > 0 && (
          errorsInfo
            .map(item => (
              <li key={item} className="list-group-item border-0">
                <div className="alert alert-danger my-0">{item}</div>
              </li>
            ))
        )
      }
    </ul>
  );
};

ErrorsList.propTypes = {
  errorsInfo: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default ErrorsList;
