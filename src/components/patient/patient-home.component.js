import React from "react";
import {Button, Form, Jumbotron, Nav, Navbar} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthService from "../../services/auth/auth-service";
import PatientMedicationPlansList from "./patient-medication-plans.component";
import PatientProfile from "./patient-profile.component";
import Background from "../../commons/images/patient_bg.png";

class PatientHome extends React.Component {

    constructor(props) {
        super(props);
        this.showMedicationPlans = this.showMedicationPlans.bind(this);
        this.showProfile = this.showProfile.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showMedicationPlans: false,
            showProfile: false
        }
    }

    showMedicationPlans() {
        this.setState({
            showMedicationPlans: true,
            showProfile: false
        });
    }

    showProfile() {
        this.setState({
            showProfile: true,
            showMedicationPlans: false
        });
    }

    logOut() {
        AuthService.logout();
        this.props.history.push("/home");
        window.location.reload();
    }

    render() {
        if (this.state.currentUser !== null &&
            this.state.currentUser !== undefined &&
            this.state.currentUser.roles[0].localeCompare("ROLE_PATIENT") === 0) {
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
                        <Navbar.Brand href="/patient/home">Home</Navbar.Brand>
                        <NavbarCollapse>
                            <Nav className="mr-auto">
                                <Nav.Link
                                    onClick={this.showMedicationPlans}>Medication Plans</Nav.Link>
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
                    {this.state.showMedicationPlans &&
                    <PatientMedicationPlansList/>
                    }
                    {this.state.showProfile &&
                    <PatientProfile/>
                    }
                </Jumbotron>
            );
        } else {
            return (
                <div>
                    <strong>Page not found!</strong>
                </div>
            );
        }

    }

}

export default PatientHome;