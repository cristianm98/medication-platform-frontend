import React from "react";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import CaregiverService from "../../services/data/caregiver-service";
import PatientService from "../../services/data/patient-service";
import * as Alerts from "../../utils/alerts";

class UpdatePatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeCaregiver = this.onChangeCaregiver.bind(this);
        this.renderCaregiver = this.renderCaregiver.bind(this);
        this.updatePatient = this.updatePatient.bind(this);
        this.hideAlerts = this.hideAlerts.bind(this);

        this.state = {
            name: "",
            gender: "",
            address: "",
            caregiver: undefined,
            caregiverList: [],
            showSuccessAlert: false,
            showErrorAlert: false
        }
    }

    hideAlerts() {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false
        })
    }

    componentDidMount() {
        let patient = this.props.selectedPatient;

        this.setState({
            name: patient.name,
            gender: patient.gender,
            address: patient.address,
            selectedCaregiver: ""
        });

        this.fetchCaregivers();
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

    onChangeCaregiver(e) {
        e.preventDefault();
        this.setState({
            caregiver: JSON.parse(e.target.value)
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

    updatePatient(e, patient) {
        e.preventDefault();

        patient.name = this.state.name;
        patient.gender = this.state.gender;
        patient.address = this.state.address;
        patient.caregiver_id = this.state.caregiver.caregiver_id;

        console.log(patient);

        PatientService.updateById(patient.id, patient)
            .then(() => {
                    this.setState({
                        showSuccessAlert: true
                    });
                },
                error => {
                    this.setState({
                        showErrorAlert: true
                    });
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) || error.message || error.toString();
                    this.setState({
                        message: resMessage
                    });
                })
    }

    render() {

        return (
            <div>
                <Card bg="dark" text="white">
                    <CardHeader>
                        Update patient
                    </CardHeader>
                    <CardBody>
                        <Form>
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
                                             value={this.state.caregiver}
                                             onChange={this.onChangeCaregiver}>
                                    <option value="" selected disabled hidden>Choose caregiver</option>
                                    {this.state.caregiverList.map(this.renderCaregiver)};
                                </FormControl>
                            </FormGroup>

                            <Button id="updatePatient"
                                    type="submit"
                                    onClick={(e) => {
                                        this.updatePatient(e, this.props.selectedPatient);
                                    }
                                    }
                            >
                                Update Patient
                            </Button>
                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.showSuccessAlert}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Patient updated successfully!"/>
                </Modal>

                <Modal show={this.state.showErrorAlert}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error occurred during update!"/>
                </Modal>
            </div>
        );
    }
}

export default UpdatePatientForm;