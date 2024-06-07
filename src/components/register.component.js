import React from "react";
import Form from "react-validation/build/form";
import AuthService from "../services/auth/auth-service";
import {Button, Card, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import DatePicker from "react-datepicker";
import * as Alerts from "../utils/alerts";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            username: "",
            password: "",
            name: "",
            gender: "",
            birthDate: "",
            address: "",
            role: "",
            successful: false
        };
    }

    hideAlerts() {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }

    handleBirthDateChange = date => {
        this.setState({
            birthDate: date
        });
    }

    handleRegister(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            gender: this.state.gender,
            birthDate: this.state.birthDate,
            address: this.state.address
        }

        if (this.state.role.localeCompare("Patient") === 0) {
            AuthService.registerPatient(user)
                .then(() => {
                        this.setState({
                            successful: true
                        });
                    },
                )
                .catch(e => {
                    console.log(e);
                    this.setState({
                        successful: false
                    });
                })
        } else {
            if (this.state.role.localeCompare("Caregiver") === 0) {
                AuthService.registerCaregiver(user)
                    .then(() => {
                            this.setState({
                                successful: true
                            });
                        }
                    )
                    .catch(e => {
                        console.log(e);
                        this.setState({
                            successful: false
                        });
                    })
            } else {
                AuthService.registerDoctor(user)
                    .then(() => {
                            this.setState({
                                successful: true
                            });
                        }
                    )
                    .catch(e => {
                        console.log(e);
                        this.setState({
                            successful: false
                        });
                    });
            }
        }
    }

    render() {

        return (
            <div>
                <Card bg="dark" text="white">
                    <CardHeader>Register</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.handleRegister}>
                            <FormControl as="select"
                                         size="sm"
                                         value={this.state.role}
                                         onChange={this.onChangeRole}>
                                <option value="" selected disabled hidden>Choose role</option>
                                <option>Patient</option>
                                <option>Caregiver</option>
                                <option>Doctor</option>
                            </FormControl>

                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <FormControl id="registerUsernameFormControl"
                                             placeholder="Enter username here"
                                             onChange={this.onChangeUsername}
                                             required>
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl id="registerPasswordFormControl"
                                             type="password"
                                             placeholder="Enter password here"
                                             onChange={this.onChangePassword}
                                             required>
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl id="registerNameFormControl"
                                             placeholder="Enter name here"
                                             onChange={this.onChangeName}
                                             required>
                                </FormControl>
                            </FormGroup>

                            {(this.state.role.localeCompare('Doctor') !== 0) &&
                            <FormGroup>
                                <FormLabel>Gender</FormLabel>
                                <FormControl as="select"
                                             size="sm"
                                             value={this.state.gender}
                                             onChange={this.onChangeGender}>
                                    <option value="" selected disabled hidden>Choose gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </FormControl>
                            </FormGroup>
                            }

                            <FormGroup>
                                <FormLabel>Birth Date</FormLabel>
                                <br/>
                                <DatePicker id="birthDatePicker"
                                            selected={this.state.birthDate}
                                            onChange={this.handleBirthDateChange}/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Address</FormLabel>
                                <FormControl id="addressFormControl"
                                             value={this.state.address}
                                             onChange={this.onChangeAddress}
                                             required/>
                            </FormGroup>

                            <Button id="registerButton"
                                    type="submit">
                                Register
                            </Button>
                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.successful}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="User registered successfully!"/>
                </Modal>

                <Modal show={!this.state.successful}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error occurred during register!"/>
                </Modal>
            </div>
        );

    }
}

export default Register;

