import React from "react";
import {Card, CardDeck, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import AuthService from "../../services/auth/auth-service";
import MedicationPlanService from "../../services/data/medication_plan-service";
import "react-datepicker/dist/react-datepicker.css";

class PatientMedicationPlansList extends React.Component {

    constructor(props) {
        super(props);
        this.fetchMedicationPlans = this.fetchMedicationPlans.bind(this);
        this.renderMedication = this.renderMedication.bind(this);
        this.renderMedicationPlan = this.renderMedicationPlan.bind(this);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            medicationPlans: []
        };
    }

    componentDidMount() {
        this.fetchMedicationPlans();
    }

    fetchMedicationPlans() {
        MedicationPlanService.getByPatient(this.state.currentUser.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    medicationPlans: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    renderMedication(medication, index) {
        return (
            <option key={index} value={JSON.stringify(medication)}>
                {medication.name}
            </option>
        );
    }

    renderMedicationPlan(medicationPlan) {
        return (
            <Card bg="dark" text="white" style={{width: '18rem'}}>
                <CardHeader>Medication Plan</CardHeader>
                <CardBody>
                    <Form>

                        <FormGroup>
                            <FormLabel>Start Date</FormLabel>
                            <br/>
                            <FormControl
                                id="startDate"
                                value={new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(Date.parse(medicationPlan.startDate))}
                                readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>End Date</FormLabel>
                            <br/>
                            <FormControl
                                id="endDate"
                                value={new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(Date.parse(medicationPlan.endDate))}
                                readOnly/>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormControl id="description"
                                         placeholder="Description"
                                         value={medicationPlan.description}
                                         readOnly/>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Intake interval</FormLabel>
                            <FormControl id="intakeInterval"
                                         placeholder="Intake interval"
                                         value={medicationPlan.intakeInterval}
                                         readOnly/>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Medications</FormLabel>
                            <FormControl as="select"
                                         size="sm">
                                <option value="" selected disabled hidden>Selected medications</option>
                                {medicationPlan.medications.map(this.renderMedication)}
                            </FormControl>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }

    render() {
        return (
            <CardDeck>
                {this.state.medicationPlans.map(this.renderMedicationPlan)}
            </CardDeck>
        );

    }
}

export default PatientMedicationPlansList;