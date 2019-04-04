import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("submit");
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { username, password } = this.state;
    
    return (
      <div className='col-md-6 m-auto'>
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input className='form-control'
                     name="username"
                     type="text"
                     onChange={this.onChange}
                     value={username}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className='form-control'
                     name="password"
                     type="password"
                     onChange={this.onChange}
                     value={password}/>
            </div>
            <div className="form-group">
              <button type='submit'
                      className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Register;

