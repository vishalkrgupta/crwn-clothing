import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { fireauth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';


import './App.css';
import HomePage from './Pages/homepage/homepage.component';
import ShopPage from './Pages/shop/shop.component';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './Pages/checkout/checkout.component';

import Header from './Components/header/header.component';

import { setCurrentUser } from './redux/user/user.actions';
import { SelectCurrentUser } from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

/* const HatsPage= () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
); */

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = fireauth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      // console.log(user);
      // const userRef = createUserProfileDocument(user);

      //console.log(userRef.displayName);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      
      console.log(setCurrentUser);
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckOutPage} />
          <Route exact path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }

          />
         </Switch>
        
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: SelectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
