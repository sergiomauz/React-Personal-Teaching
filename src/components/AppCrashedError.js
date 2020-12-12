/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

class AppCrashedError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appCrashed: false,
    };
  }

  componentDidCatch() {
    this.setState({
      appCrashed: true,
    });
  }

  render() {
    const { children } = this.props;
    const { appCrashed } = this.state;

    if (appCrashed) {
      return (
        <h1>
          An error occurred while processing your information. Contact with the developer for bugs.
        </h1>
      );
    }

    return children;
  }
}

AppCrashedError.propTypes = {
  children: PropTypes.any.isRequired,
  state: PropTypes.shape({
    appCrashed: PropTypes.bool,
  }),
};

AppCrashedError.defaultProps = {
  state: {
    appCrashed: false,
  },
};

export default AppCrashedError;
