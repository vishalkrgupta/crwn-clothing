import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWm8fR-lTyVqfVFDQB7i9WhKQTC9SvDiw",
    authDomain: "crwn-db-e5e8c.firebaseapp.com",
    projectId: "crwn-db-e5e8c",
    storageBucket: "crwn-db-e5e8c.appspot.com",
    messagingSenderId: "527741942376",
    appId: "1:527741942376:web:364c1603da03d2ba6199dd",
    measurementId: "G-7TLQG74B0W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // const userRef = firestore.doc('/users/142ffs7deef');
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapRef = await userRef.get();

    if (!snapRef.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        //     console.log(displayName);  
        try {
            await userRef.set(
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                }
            );
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};


firebase.initializeApp(firebaseConfig);

export const fireauth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => fireauth.signInWithPopup(provider);

export default firebase;