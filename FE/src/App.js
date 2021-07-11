import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Form from './Component/Form';
import Edit from './Component/Edit';
import Table from './Component/Table';
import Cart from './Component/Cart';
import Login from './Component/Login';

class App extends Component {
  render() {
    return (
        <div>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Table} />
          <Route path="/form" component={Form} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/cart" component={Cart} />
        </div>
    );
  }
}

export default App;
