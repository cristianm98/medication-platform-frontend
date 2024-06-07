import React from "react";
import {Alert, Button, Card, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import MedicationService from "../../services/data/medication-service";
import MedicationPlanService from "../../services/data/medication_plan-service";
import "react-datepicker/dist/react-datepicker.css";
import * as Alerts from "../../utils/alerts";
import DatePicker from "react-datepicker";

class AddMedicationPlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.hideAlerts = this.hideAlerts.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeIntakeInterval = this.onChangeIntakeInterval.bind(this);
        this.onChangeMedication = this.onChangeMedication.bind(this);
        this.renderMedication = this.renderMedication.bind(this);
        this.fetchMedications = this.fetchMedications.bind(this);
        this.addMedication = this.addMedication.bind(this);
        this.addMedicationPlan = this.addMedicationPlan.bind(this);

        this.state = {
            startDate: "",
            endDate: "",
            description: "",
            intakeInterval: "",
            selectedMedication: undefined,
            selectedMedicationsList: new Set(),
            medicationList: [],
            successful: undefined,
            addedMedSuccessful: undefined
        };

    }

    hideAlerts() {
        this.setState({
            successful: undefined,
            addedMedSuccessful: undefined
        })
    }

    componentDidMount() {
        this.fetchMedications();
    }

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeIntakeInterval(e) {
        this.setState({
            intakeInterval: e.target.value
        });
    }

    async onChangeMedication(e) {
        e.preventDefault();
        await this.setState({
            selectedMedication: JSON.parse(e.target.value)
        });
    }

    renderMedication(medication, index) {
        return (
            <option key={index} value={JSON.stringify(medication)}>
                {medication.name}
            </option>
        );
    }

    fetchMedications() {
        MedicationService.getAll()
            .then(response => {
                console.log(response);
                this.setState({
                    medicationList: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    async addMedication(e) {
        e.preventDefault();
        await this.setState(prevState => ({
            selectedMedicationsList: prevState.selectedMedicationsList.add(prevState.selectedMedication),
            addedMedSuccessful: true
        }));
    }

    addMedicationPlan(e) {
        e.preventDefault();

        let medicationPlan = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            intakeInterval: this.state.intakeInterval,
            description: this.state.description,
            medications: [...this.state.selectedMedicationsList],
            patient: this.props.selectedPatient,
        }
        console.log(this.props.selectedPatient);
        console.log(medicationPlan);

        MedicationPlanService.create(medicationPlan)
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
                        Add patient
                    </CardHeader>
                    <CardBody>
                        <Form>

                            <FormGroup>
                                <FormLabel>Start Date</FormLabel>
                                <br/>
                                <DatePicker id="startDate"
                                            selected={this.state.startDate}
                                            onChange={this.handleStartDateChange}
                                            required/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>End Date</FormLabel>
                                <br/>
                                <DatePicker id="endDate"
                                            selected={this.state.endDate}
                                            onChange={this.handleEndDateChange}
                                            required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormControl id="description"
                                             placeholder="Description"
                                             value={this.state.description}
                                             onChange={this.onChangeDescription}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Intake interval</FormLabel>
                                <FormControl id="intakeInterval"
                                             placeholder="Intake interval"
                                             value={this.state.intakeInterval}
                                             onChange={this.onChangeIntakeInterval}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Medications</FormLabel>
                                <FormControl as="select"
                                             size="sm">
                                    <option value="" selected disabled hidden>Selected medications</option>
                                    {[...this.state.selectedMedicationsList].map(this.renderMedication)}
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Select medication</FormLabel>
                                <FormControl as="select"
                                             size="sm"
                                             value={this.state.selectedMedication}
                                             onChange={this.onChangeMedication}>
                                    <option value="" selected disabled hidden>Choose medication</option>
                                    {this.state.medicationList.map(this.renderMedication)};
                                </FormControl>
                            </FormGroup>

                            <Button id="addMedication"
                                    type="submit"
                                    onClick={this.addMedication}
                            >
                                Add Medication
                            </Button>
                            {' '}
                            <Button id="addMedicationPlan"
                                    type="submit"
                                    onClick={this.addMedicationPlan}
                            >
                                Add Medication Plan
                            </Button>

                        </Form>
                    </CardBody>
                </Card>

                <Modal show={this.state.addedMedSuccessful === true}
                       onHide={this.hideAlerts}>
                    <Alert variant={"success"}>
                        Medication added successfully!
                    </Alert>
                </Modal>

                <Modal show={this.state.successful === true}
                       onHide={this.hideAlerts}>
                    <Alerts.SuccessAlert message="Medication plan added successfully!"/>
                </Modal>

                <Modal
                    keyboard={false}
                    show={this.state.successful === false}
                    onHide={this.hideAlerts}>
                    <Alerts.ErrorAlert message="An error has occurred! Please try again!"/>
                </Modal>
            </div>
        );

    }
}

export default AddMedicationPlanForm;