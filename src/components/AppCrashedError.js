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

  static getDerivedStateFromError(error) {
    return { appCrashed: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ appCrashed: true });
  }

  render() {
    const { children } = this.props;
    const { appCrashed } = this.state;

    if (appCrashed) {
      return (
        <h1>ERROR</h1>
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
