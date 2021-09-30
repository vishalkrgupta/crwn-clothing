import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './Pages/homepage/homepage.component';
import ShopPage from './Pages/shop/shop.component.jsx';
import Header from './Components/header/header.component';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

/* const HatsPage= () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
); */

class App extends React.component {
  constructor() {
    super();
    
    this.State = {
      currentUser: null
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      this.setState({currentUser:user});

      console.log(user);
    })
  }

  render() {
    return (
      <div >
        <Header />
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
