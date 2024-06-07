import React from "react";
import {Button, Form, Jumbotron, Nav, Navbar} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthService from "../../services/auth/auth-service";
import PatientsContainer from "./patients-container.component";
import CaregiversContainer from "./caregivers-container.component";
import MedicationsContainer from "./medications-container.component";
import Background from "../../commons/images/doctor_bg.png";

class HomeDoctor extends React.Component {

    constructor(props) {
        super(props);
        this.showCaregivers = this.showCaregivers.bind(this);
        this.showPatients = this.showPatients.bind(this);
        this.showMedications = this.showMedications.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showCaregivers: false,
            showPatients: false,
            showMedications: false
        }
    }

    showCaregivers() {
        this.setState({
            showCaregivers: true,
            showPatients: false,
            showMedications: false
        });
    }

    showPatients() {
        this.setState({
            showCaregivers: false,
            showPatients: true,
            showMedications: false
        });
    }

    showMedications() {
        this.setState({
            showCaregivers: false,
            showPatients: false,
            showMedications: true
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
            this.state.currentUser.roles[0].localeCompare("ROLE_DOCTOR") === 0) {
            return (
                <Jumbotron style={{
                    backgroundImage: "url(" + Background + ")",
                    backgroundSize: "30%",
                    width: "100%",
                    height: "800px",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="/doctor/home">Home</Navbar.Brand>
                        <NavbarCollapse>
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.showPatients}>Patients</Nav.Link>
                                <Nav.Link onClick={this.showCaregivers}>Caregivers</Nav.Link>
                                <Nav.Link onClick={this.showMedications}>Medications</Nav.Link>
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
                    {this.state.showPatients && <PatientsContainer/>}
                    {this.state.showCaregivers && <CaregiversContainer/>}
                    {this.state.showMedications && <MedicationsContainer/>}

                </Jumbotron>
            );
        }else{
            return(
                <div>
                    <strong>Page not found!</strong>
                </div>
            );
        }

    }
}

export default HomeDoctor;