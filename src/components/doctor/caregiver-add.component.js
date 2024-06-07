import React from "react";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import AuthService from "../../services/auth/auth-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Alerts from "../../utils/alerts";

class AddCaregiverForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.addCaregiver = this.addCaregiver.bind(this);
        this.hideAlerts = this.hideAlerts.bind(this);

        this.state = {
            username: "",
            password: "",
            birthDate: "",
            name: "",
            gender: "",
            address: "",
            selectedCaregiver: undefined,
            successful: undefined
        };

    }

    hideAlerts() {
        this.setState({
            successful: undefined
        });
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

    handleBirthDateChange = date => {
        console.log('date: ', date)
        this.setState({
            birthDate: date
        });
    }

    addCaregiver(e) {
        e.preventDefault();

        let caregiver = {
            username: this.state.username,
            password: this.state.password,
            birthDate: this.state.birthDate,
            name: this.state.name,
            gender: this.state.gender,
            address: this.state.address
        }

        AuthService.registerCaregiver(caregiver)
            .then(() => {
                this.setState({
                    successful: true
                })
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    successful: false
                })
            });
    }


    render() {
        return (
            <div>
                <Card bg="dark" text="white">
                    <CardHeader>
                        Add caregiver
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <FormLabel>Username</FormLabel>
                                <FormControl id="username"
                                             placeholder="Username"
                                             onChange={this.onChangeUsername}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl id="password"
                                             placeholder="Password"
                                             onChange={this.onChangePassword}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl id="name"
                                             placeholder="Name"
                                             value={this.state.name}
                                             onChange={this.onChangeName}
                                             required/>
                            </FormGroup>

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
                                             placeholder="Address"
                                             value={this.state.address}
                                             onChange={this.onChangeAddress}
                                             required/>
                            </FormGroup>

                            <Button id="addCaregiver"
                                    type="submit"
                                    onClick={this.addCaregiver}
                            >
                                Add Caregiver
                            </Button>

                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.successful === true}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Caregiver registered successfully!"/>
                </Modal>

                <Modal show={this.state.successful === false}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error occurred during register!"/>
                </Modal>
            </div>
        );

    }
}
export default AddCaregiverForm;