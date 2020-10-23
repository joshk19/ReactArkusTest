import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ContactDetail from './scenes/ContactDetail';
import ContactList from './scenes/ContactList';
import { UserProvider } from './contexts/UserContexts/UserContext';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route exact path='/' component={ContactList}></Route>
            <Route exact path='/contact-detail' component={ContactDetail}></Route>
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
