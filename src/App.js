import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home.component'
import React from "react";
import Login from "./components/login.component";
import AuthService from "./services/auth/auth-service";
import HomeDoctor from "./components/doctor/home-doctor.component";
import HomeCaregiver from "./components/caregiver/home-caregiver.component";
import PatientHome from "./components/patient/patient-home.component";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/home'
                            render={() => <Home/>}
                        />
                        <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
                        />

                        < Route
                            exact
                            path='/doctor/home'
                            render={() => <HomeDoctor/>}
                            />
                        <Route
                            exact
                            path='/caregiver/home'
                            render={() => <HomeCaregiver/>}
                        />
                        <Route
                            exact
                            path='/patient/home'
                            render={() => <PatientHome/>}
                        />
                    </Switch>
                </Router>
            </div>);

    }
}

export default App;
