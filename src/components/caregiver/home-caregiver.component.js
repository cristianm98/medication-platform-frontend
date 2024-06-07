import React from "react";
import {Button, Form, Jumbotron, Nav, Navbar} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthService from "../../services/auth/auth-service";
import CaregiverPatientsContainer from "./caregiver-patients-container.component";
import CaregiverProfile from "./caregiver-profile.component";
import Background from "../../commons/images/caregiver_bg2.png";

class HomeCaregiver extends React.Component {

    constructor(props) {
        super(props);
        this.showPatients = this.showPatients.bind(this);
        this.showProfile = this.showProfile.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showPatients: false,
            showProfile: false
        }
    }

    showPatients() {
        this.setState({
            showPatients: true,
            showProfile: false
        });
    }

    showProfile() {
        this.setState({
            showProfile: true,
            showPatients: false
        });
    }

    logOut() {
        AuthService.logout();
        this.props.history.push("/home");
        window.location.reload();
    }

    render() {
        console.log(this.state.currentUser);

        if (this.state.currentUser !== null &&
            this.state.currentUser !== undefined &&
            this.state.currentUser.roles[0].localeCompare("ROLE_CAREGIVER") === 0) {
            return (
                <Jumbotron style={{
                    backgroundImage: "url(" + Background + ")",
                    backgroundSize: "15%",
                    width: "100%",
                    height: "800px",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>

                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="/caregiver/home">Home</Navbar.Brand>
                        <NavbarCollapse>
                            <Nav className="mr-auto">
                                <Nav.Link
                                    onClick={this.showPatients}>Patients</Nav.Link>
                                <Nav.Link
                                    onClick={this.showProfile}>Profile</Nav.Link>
                            </Nav>

                            <Form inline>
                                <Button variant="outline-success"
                                        onClick={this.logOut}
                                        href="/home">
                                    Log Out
                                </Button>
                            </Form>
                        </NavbarCollapse>
                    </Navbar>
                    {this.state.showPatients && <CaregiverPatientsContainer/>}
                    {this.state.showProfile && <CaregiverProfile/>}
                </Jumbotron>
            );
        }else{
            return (
                <div>
                    <strong>Page not found!</strong>
                </div>
            )
        }
    }
}

export default HomeCaregiver;