import React from "react";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import MedicationService from "../../services/data/medication-service";
import * as Alerts from "../../utils/alerts";

class UpdateMedicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSideEffects = this.onChangeSideEffects.bind(this);
        this.onChangeDosage = this.onChangeDosage.bind(this);
        this.updateMedication = this.updateMedication.bind(this);
        this.hideAlerts = this.hideAlerts.bind(this);

        this.state = {
            name: "",
            sideEffects: "",
            dosage: "",
            successful: undefined
        }
    }

    hideAlerts() {
        this.setState({
            successful: undefined
        });
    }

    componentDidMount() {
        let medication = this.props.selectedMedication;

        this.setState({
            name: medication.name,
            sideEffects: medication.sideEffects,
            dosage: medication.dosage,
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

    updateMedication(e, medication) {
        e.preventDefault();

        medication.name = this.state.name;
        medication.sideEffects = this.state.sideEffects;
        medication.dosage = this.state.dosage;

        MedicationService.updateById(medication.id, medication)
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
            });
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
                                <FormControl id="nameFormControl"
                                             placeholder="Name"
                                             value={this.state.name}
                                             onChange={this.onChangeName}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Side effects</FormLabel>
                                <FormControl id="sideEffectsFormControl"
                                             as="textarea"
                                             size="sm"
                                             placeholder="Side effects"
                                             value={this.state.sideEffects}
                                             onChange={this.onChangeSideEffects}>
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Dosage</FormLabel>
                                <FormControl id="dosageFormControl"
                                             placeholder="Dosage"
                                             type="number"
                                             value={this.state.dosage}
                                             onChange={this.onChangeDosage}>
                                </FormControl>
                            </FormGroup>

                            <Button id="updateMedication"
                                    type="submit"
                                    onClick={(e) => {
                                        this.updateMedication(e, this.props.selectedMedication);
                                    }
                                    }
                            >
                                Update Medication
                            </Button>
                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.successful}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Medication updated successfully!"/>
                </Modal>

                <Modal show={!this.state.successful}
                       onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error has occurred during update!"/>
                </Modal>
            </div>
        );
    }
}

export default UpdateMedicationForm;