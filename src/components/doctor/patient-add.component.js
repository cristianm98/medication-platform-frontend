import React from "react";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import CaregiverService from "../../services/data/caregiver-service";
import AuthService from "../../services/auth/auth-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Alerts from "../../utils/alerts";

class AddPatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeCaregiver = this.onChangeCaregiver.bind(this);
        this.renderCaregiver = this.renderCaregiver.bind(this);
        this.addPatient = this.addPatient.bind(this);
        this.hideAlerts = this.hideAlerts.bind(this);

        this.state = {
            username: "",
            password: "",
            birthDate: "",
            name: "",
            gender: "",
            address: "",
            selectedCaregiver: undefined,
            caregiverList: [],
            showSuccessAlert: false,
            showErrorAlert: false
        };

    }

    hideAlerts() {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false
        })
    }

    componentDidMount() {
        this.fetchCaregivers();
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

    async onChangeCaregiver(e) {
        e.preventDefault();
        await this.setState({
            selectedCaregiver: JSON.parse(e.target.value)
        });
        console.log(this.state.selectedCaregiver);
    }

    handleBirthDateChange = date => {
        console.log('date: ', date)
        this.setState({
            birthDate: date
        });
    }

    renderCaregiver(caregiver, index) {
        return (
            <option key={index} value={JSON.stringify(caregiver)}>
                {caregiver.name}
            </option>
        );
    }

    fetchCaregivers() {
        CaregiverService.getAll()
            .then(response => {
                console.log(response);
                this.setState({
                    caregiverList: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    addPatient(e) {
        e.preventDefault();

        let patient = {
            username: this.state.username,
            password: this.state.password,
            birthDate: this.state.birthDate,
            name: this.state.name,
            gender: this.state.gender,
            address: this.state.address,
        }
        if(this.state.selectedCaregiver !== undefined){
            patient.caregiver_id = this.state.selectedCaregiver.id;
        }

        console.log(patient);
        AuthService.registerPatient(patient)
            .then(() => {
                    this.setState({
                        showSuccessAlert: true
                    });
                })
            .catch(e => {
                console.log(e);
                this.setState({
                    showErrorAlert: true
                });
            })
    }

    render() {
        return (
            <div>
                <Card bg="dark" text="white">
                    <CardHeader>
                        Add patient
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
                                <FormControl id="patientPasswordFormControl"
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

                            <FormGroup>
                                <FormLabel>Caregiver</FormLabel>
                                <FormControl as="select"
                                             size="sm"
                                             value={this.state.selectedCaregiver}
                                             onChange={this.onChangeCaregiver}>
                                    <option value="" selected disabled hidden>Choose caregiver</option>
                                    {this.state.caregiverList.map(this.renderCaregiver)};
                                </FormControl>
                            </FormGroup>

                            <Button id="addPatient"
                                    type="submit"
                                    onClick={this.addPatient}
                            >
                                Add Patient
                            </Button>

                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.showSuccessAlert}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Patient registered successfully!"/>
                </Modal>

                <Modal show={this.state.showErrorAlert}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error occurred during register!"/>
                </Modal>
            </div>
        );

    }
}

export default AddPatientForm;