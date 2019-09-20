import React, { Component } from 'react';
import Store from './components/main_view/Store'
import Cart from './components/cart_view/Cart';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './App.css';

class App extends Component {
  state = {  
    view: "store"
  }

  render() { 
    return (  
      <div className="App">
      <AppBar position="static">
        <Tabs>
          <Tab onClick={() => this.setState({view: "store"})} label="Store" data-test-name="menu_store_option" />
          <Tab onClick={() => this.setState({view: "cart"})} label="Cart" data-test-name="menu_cart_option" />
        </Tabs>
      </AppBar>
      <header className="App-header">
        {this.state.view === "store" &&
          <Store />
        }
        {this.state.view == "cart" &&
          <Cart />
        }
      </header>
    </div>
    );
  }
}

export default App;
