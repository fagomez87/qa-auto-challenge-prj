import React, { Component } from 'react';
import Store from './components/main_view/Store'
import Cart from './components/cart_view/Cart';
import Login from './components/auth/Login';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Cookies from 'js-cookie';
import './App.css';
import { Fragment } from 'react';

class App extends Component {
  state = {  
    view: "store"
  }

  render() { 
    return (  
      <div className="App">
<<<<<<< HEAD
        {Cookies.get('DLacy') &&
          <React.Fragment>
            <AppBar position="static">
              <Tabs>
                <Tab onClick={() => this.setState({view: "store"})} label="Store" />
                <Tab onClick={() => this.setState({view: "cart"})} label="Cart" />
              </Tabs>
            </AppBar>
            <header className="App-header">
              {this.state.view == "store" &&
                <Store />
              }
              {this.state.view == "cart" &&
                <Cart />
              }
            </header>
          </React.Fragment>
=======
      <AppBar position="static">
        <Tabs>
          <Tab onClick={() => this.setState({view: "store"})} label="Store" data-test-name="menu_store_option" />
          <Tab onClick={() => this.setState({view: "cart"})} label="Cart" data-test-name="menu_cart_option" />
        </Tabs>
      </AppBar>
      <header className="App-header">
        {this.state.view === "store" &&
          <Store />
>>>>>>> 86651cf01e15054b4f9b588102b063ea8db6c219
        }
        {!Cookies.get('DLacy') &&
          <React.Fragment>
            <AppBar position="static">
              <Tabs />
            </AppBar>
            <header className="App-header">
              <Login />
            </header>
          </React.Fragment>
        }
    </div>
    );
  }
}

export default App;
