import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';
import Dashboard from './leads/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Fragment>
          <Header/>
          <div className='container'>
            <Dashboard/>
          </div>
        </Fragment>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
