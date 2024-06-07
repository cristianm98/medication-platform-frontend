import React from "react";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Card from "react-bootstrap/Card";
import CaregiverService from "../../services/data/caregiver-service";
import AuthService from "../../services/auth/auth-service";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

class CaregiverProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            caregiver: ""
        }
    }

    componentDidMount() {
        CaregiverService.getById(this.state.currentUser.id)
            .then(async response => {
                await this.setState({
                    caregiver: response.data
                });
            })
            .catch(e => {
                console.log(e)
            });
    }

    render() {

        return (
            <div>
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
                                             value={this.state.caregiver.name}
                                             readOnly/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Gender</FormLabel>
                                <FormControl type="text"
                                             value={this.state.caregiver.gender}
                                             readOnly/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Birth date</FormLabel>
                                <FormControl type="text"
                                             value={new Date(this.state.caregiver.birthDate).toDateString()}
                                             readOnly/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Address</FormLabel>
                                <FormControl type="text"
                                             value={this.state.caregiver.address}
                                             readOnly/>
                            </FormGroup>

                        </Form>

                    </CardBody>
                </Card>
            </div>
        );

    }
}
export default CaregiverProfile;