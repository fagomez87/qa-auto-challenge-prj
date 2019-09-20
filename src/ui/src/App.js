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
        {Cookies.get('DLacy') &&
          <React.Fragment>
            <AppBar position="static">
              <Tabs>
                <Tab onClick={() => this.setState({view: "store"})} label="Store" />
                <Tab onClick={() => this.setState({view: "cart"})} label="Cart" />
              </Tabs>
            </AppBar>
            <header className="App-header">
              {this.state.view === "store" &&
                <Store />
              }
              {this.state.view === "cart" &&
                <Cart />
              }
            </header>
          </React.Fragment>
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
