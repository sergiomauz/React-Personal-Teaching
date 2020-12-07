import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  myprofile: state.users.myprofile,
});

const Welcome = props => {
  const {
    myprofile,
  } = props;

  return (
    <>
      <h1 className="title-one green-color">
        Welcome
      </h1>
      <div className="card form-container">
        <div className="card-body">
          <div className="row">
            <div className="col-12 p-0">
              {
                myprofile.fullname && (
                  <h5 className="title-one">
                    {`Hello! ${myprofile.fullname}`}
                  </h5>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Welcome.propTypes = {
  myprofile: PropTypes.shape({
    admin: PropTypes.bool,
    fullname: PropTypes.string,
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(Welcome);
