import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './Pages/homepage/homepage.component';
import ShopPage from './Pages/shop/shop.component.jsx';
import Header from './Components/header/header.component';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { fireauth, createUserProfileDocument } from './firebase/firebase.utils';

/* const HatsPage= () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
); */

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = fireauth.onAuthStateChanged(async user => {
      // this.setState({ currentUser: user });
      console.log(user);
      const userRef = createUserProfileDocument(user);

       //console.log(userRef.displayName);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
