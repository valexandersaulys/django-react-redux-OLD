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
    const { username, email, password, password2 } = this.state;
    
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
              <label>Email</label>
              <input className='form-control'
                     name="email"
                     type="email"
                     onChange={this.onChange}
                     value={email}/>
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
              <label>Confirm Password</label>
              <input className='form-control'
                     name="password2"
                     type="password"
                     onChange={this.onChange}
                     value={password2}/>
            </div>
            <div className="form-group">
              <button type='submit'
                      className="btn btn-primary">
                Register
              </button>
            </div>
            <p>Already Have an Account? <Link to='/login'>Login</Link></p>
          </form>
        </div>
      </div>
    );
  }
};

export default Register;