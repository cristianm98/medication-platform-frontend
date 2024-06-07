import React from "react";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Card from "react-bootstrap/Card";
import PatientService from "../../services/data/patient-service";
import AuthService from "../../services/auth/auth-service";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

class PatientProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            patient: "",
        }
    }

    componentDidMount() {
        PatientService.getById(this.state.currentUser.id)
            .then(async response => {
                await this.setState({
                    patient: response.data
                });
            })
            .catch(e => {
                console.log(e)
            });
    }

    render() {

        return (
            <div style={{width: '50rem'}}>
                <Card bg="dark" text="white">
                    <CardHeader>
                        <strong>Profile</strong>
                    </CardHeader>

                    <CardBody>
                        <br/>
                        <Form>
                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <FormControl type="text"
                                             value={this.state.currentUser.username}
                                             readOnly/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl type="text"
                                             value={this.state.patient.name}
                                             readOnly/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Gender</FormLabel>
                                <FormControl type="text"
                                             value={this.state.patient.gender}
                                             readOnly/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Birth date</FormLabel>
                                <FormControl id="birthDate"
                                             value={new Date(this.state.patient.birthDate).toDateString()}/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Address</FormLabel>
                                <FormControl type="text"
                                             value={this.state.patient.address}
                                             readOnly/>
                            </FormGroup>
                        </Form>

                    </CardBody>
                </Card>
            </div>
        );

    }
}

export default PatientProfile;