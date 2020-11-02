import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

import googleLogo from '../../img/google-logo.png';

import './Login.css';
import firebaseConfig from './firebase.config';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    //Google sign-in provider
    var googleLoginProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleLogin = () => {

        // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        //Authenticate with Firebase using the Google provider object.
        firebase.auth().signInWithPopup(googleLoginProvider).then(function (result) {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = { name: displayName, email, photoURL }
            setLoggedInUser(signedInUser);
            storeAuthToken();

        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage);
        });

        const storeAuthToken = () => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    sessionStorage.setItem('token', idToken);
                    history.replace(from);
                }).catch(function (error) {
                    // Handle error
                });
        }
    }

    return (

        <div className="container text-center">
            <h1 className="mt-5">Doctors Portal Login</h1>
            <div className="login-form">
                <h3>Login with</h3>
                <button onClick={handleGoogleLogin} className="btn w-75 border my-3">
                    <img src={googleLogo} style={{ height: '30px' }} alt="" /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;