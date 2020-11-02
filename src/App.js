import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import Appointment from './Components/Appointment/Appointment';
import Doctor from './Components/Doctor/Doctor';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

    const [loggedInUser, setLoggedInUser] = useState({})

    return (

        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

            <div>
                <Router>
                    <Switch>

                        {/* <Route exact path="/" >
                            <HomePage></HomePage>
                        </Route> */}

                        <Route exact path="/">
                            <Header></Header>
                            <HomePage></HomePage>
                        </Route>

                        <Route path="/login" >
                            <Login></Login>
                        </Route>

                        {/*  <Route path="/doctor">
                            <Doctor></Doctor>
                        </Route> */}

                        <PrivateRoute path="/doctor">
                            <Doctor></Doctor>
                        </PrivateRoute>

                        <Route path="/appointment">
                            <Header></Header>
                            <Appointment></Appointment>
                        </Route>

                    </Switch>
                </Router>
            </div>

        </UserContext.Provider>
    );
}

export default App;
