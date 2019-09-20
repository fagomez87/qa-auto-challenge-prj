import React, { Component } from 'react';
import Store from './components/main_view/Store'
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
        {this.state.view === "cart" &&
          <p>Hello</p>
        }
      </header>
    </div>
    );
  }
}

export default App;
