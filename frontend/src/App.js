import React from 'react';
import './App.scss';
import Nav from './navbar';
import Page1 from './page1';
import { Route } from 'react-router-dom';
import Page2 from './page2';
import Page3 from './page3';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="page">
          <Route path="/" exact component={Page1} />
          <Route path="/page2" component={Page2} />
        </div>
      </div>
    );
  }
}

export default App;