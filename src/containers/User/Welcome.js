import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loadingGif from '../../images/loading.gif';

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
      <div className="card form-container mb-3">
        <div className="card-body">
          <div className="row">
            {
              myprofile.fullname ? (
                <div className="col-12 p-0">
                  <h5 className="title-one">
                    {`Hello! ${myprofile.fullname}`}
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
        </div>
      </div>
    </>
  );
};

Welcome.propTypes = {
  myprofile: PropTypes.shape({
    fullname: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Welcome);
