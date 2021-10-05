import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './Pages/homepage/homepage.component';

import ShopPage from './Pages/shop/shop.component.jsx';
import Header from './Components/header/header.component';
import { connect } from 'react-redux';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { fireauth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions' ;

/* const HatsPage= () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
); */

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = fireauth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      // console.log(user);
      // const userRef = createUserProfileDocument(user);

      //console.log(userRef.displayName);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // console.log('1');
          setCurrentUser (
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }, () => { console.log(setCurrentUser); }
          );
        });
      }
      // console.log(setCurrentUser);
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
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch=>({
  setCurrentUser:user=> dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
