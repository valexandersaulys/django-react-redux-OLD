import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    
    if (error != prevProps.error) {
      console.log(error)
      if (error.msg.name) 
        alert.error(`Name: ${error.msg.name.join()}`);

      if (error.msg.email) 
        alert.error(`Email: ${error.msg.email.join()}`);

      if (error.msg.message) 
        alert.error(`${error.msg.message.join()}`);

      if (error.status === 403)
        alert.error(`Unable to get leads: ${error.msg.detail}`);

      if (error.status === 500)
        alert.error(`Server error, please try again later`);
    }

    if (message !== prevProps.message) {
      if (message.deleteLead)
        alert.success(message.deleteLead);
      if (message.addedLead)
        alert.success(message.addedLead);
    }
  }
  
  render() {
    return <Fragment/>;
  }
};

const mapStateToProps = state => ({
  // we put into our state the errors -- believe this is in src/reducers/errors.js
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
