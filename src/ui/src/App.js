import React from 'react';
import logo from './logo.svg';
import Store from './components/main_view/Store'
import TopTabs from './components/navigation/TopTabs';
import './App.css';

function App() {
  return (
    <div className="App">
      <TopTabs />
      <header className="App-header">
        <Store />
      </header>
    </div>
  );
}

export default App;
