import React from "react";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import MedicationService from "../../services/data/medication-service";
import "react-datepicker/dist/react-datepicker.css";
import * as Alerts from "../../utils/alerts";

class AddMedicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.addMedication = this.addMedication.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSideEffects = this.onChangeSideEffects.bind(this);
        this.onChangeDosage = this.onChangeDosage.bind(this);
        this.hideAlerts = this.hideAlerts.bind(this);

        this.state = {
            name: "",
            sideEffects: "",
            dosage: "",
            successful: undefined
        };

    }

    hideAlerts() {
        this.setState({
            successful: undefined
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSideEffects(e) {
        this.setState({
            sideEffects: e.target.value
        });
    }

    onChangeDosage(e) {
        this.setState({
            dosage: e.target.value
        });
    }

    addMedication(e) {
        e.preventDefault();

        let medication = {
            name: this.state.name,
            sideEffects: this.state.sideEffects,
            dosage: this.state.dosage
        };

        MedicationService.create(medication)
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
            })

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
                                <FormLabel>Name</FormLabel>
                                <FormControl id="name"
                                             placeholder="Name"
                                             value={this.state.name}
                                             onChange={this.onChangeName}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Side effects</FormLabel>
                                <FormControl as="textarea"
                                             size="sm"
                                             placeholder="Side effects"
                                             value={this.state.sideEffects}
                                             onChange={this.onChangeSideEffects}>
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Dosage</FormLabel>
                                <FormControl placeholder="Dosage"
                                             type="number"
                                             value={this.state.dosage}
                                             onChange={this.onChangeDosage}>
                                </FormControl>
                            </FormGroup>

                            <Button id="addMedication"
                                    type="submit"
                                    onClick={this.addMedication}
                            >
                                Add Medication
                            </Button>

                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.successful === true}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Medication added successfully!"/>
                </Modal>

                <Modal show={this.state.successful === false}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error has occurred! Please try again"/>
                </Modal>
            </div>
        );

    }
}

export default AddMedicationForm;