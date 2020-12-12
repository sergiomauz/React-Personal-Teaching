import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loadingGif from '../../images/loading.svg';

const mapStateToProps = state => ({
  myProfile: state.users.myProfile,
});

const Welcome = props => {
  const {
    myProfile,
  } = props;

  return (
    <>
      <h1 className="title-one green-color text-center">
        Welcome
      </h1>
      <div className="card form-container mb-3">
        <div className="card-body">
          <div className="row">
            {
              myProfile.fullname ? (
                <div className="col-12 p-0">
                  <h5 className="title-one">
                    {`Hello! ${myProfile.fullname}`}
                  </h5>
                </div>
              )
                : (
                  <div className="col-12 text-center">
                    <img src={loadingGif} alt="Preview" />
                  </div>
                )
            }
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p>
                Choose an option from the menu in your left.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Welcome.propTypes = {
  myProfile: PropTypes.shape({
    fullname: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Welcome);
