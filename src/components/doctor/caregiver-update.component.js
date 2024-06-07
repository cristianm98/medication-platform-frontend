import React from "react";
import {Modal, Button, Card, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import CaregiverService from "../../services/data/caregiver-service";
import * as Alerts from "../../utils/alerts";
import DatePicker from "react-datepicker";

class UpdateCaregiverForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.updateCaregiver = this.updateCaregiver.bind(this);
        this.hideAlerts = this.hideAlerts.bind(this);

        this.state = {
            name: "",
            gender: "",
            address: "",
            successful: undefined
        }
    }

    hideAlerts() {
        this.setState({
            successful: undefined
        });
    }

    componentDidMount() {
        let caregiver = this.props.selectedCaregiver;

        this.setState({
            name: caregiver.name,
            gender: caregiver.gender,
            birthDate: Date.parse(caregiver.birthDate),
            address: caregiver.address,
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

    updateCaregiver(e, caregiver) {
        e.preventDefault();

        caregiver.name = this.state.name;
        caregiver.gender = this.state.gender;
        caregiver.birthDate = this.state.birthDate;
        caregiver.address = this.state.address;

        CaregiverService.updateById(caregiver.id, caregiver)
            .then(() => {
                this.setState({
                    successful: true
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    successful: false
                });
            })
    }

    render() {

        return (
            <div>
                <Card bg="dark" text="white">
                    <CardHeader>
                        Update caregiver
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

                            <Button id="updateCaregiver"
                                    type="submit"
                                    onClick={(e) => {
                                        this.updateCaregiver(e, this.props.selectedCaregiver);
                                    }
                                    }
                            >
                                Update Caregiver
                            </Button>
                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.successful === true}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Caregiver updated successfully!"/>
                </Modal>

                <Modal show={this.state.successful === false}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error occurred during update!"/>
                </Modal>
            </div>
        );
    }
}

export default UpdateCaregiverForm;