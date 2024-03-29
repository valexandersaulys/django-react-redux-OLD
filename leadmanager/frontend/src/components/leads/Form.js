import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addLead } from '../../actions/leads';


export class Form extends Component {
  static propTypes = {
    addLead: PropTypes.func.isRequired
  }
  
  state = {
    name: '',
    email: '',
    message: ''
  }

  onChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  onSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.addLead(lead);

    // clear our the form state
    this.setState({
      name: "",
      email: "",
      message: ""
    });
  }
    
  render() {
    const { name, email, message } = this.state;
    
    return (
      <div className="card card-body mt-4 mb-4">
        <h2></h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control"
                   type="text"
                   name="name"
                   value={name}
                   onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control"
                   type="email"
                   name="email"
                   value={email}
                   onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label>Message</label>
            <input className="form-control"
                   type="text"
                   name="message"
                   value={message}
                   onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <button type="submit"
                    className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null, // no need for mapStateToProps as we don't have state for our form
  { addLead }
)(Form);

