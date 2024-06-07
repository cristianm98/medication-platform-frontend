import React from "react";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {Modal} from "react-bootstrap";
import PatientService from "../../services/data/patient-service"
import AddPatientForm from "./patient-add.component";
import UpdatePatientForm from "./patient-update.component";
import AddMedicationPlanForm from "./medication-plan-add.component";

class PatientsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.renderPatient = this.renderPatient.bind(this);
        this.fetchPatients = this.fetchPatients.bind(this);
        this.selectPatient = this.selectPatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.hideAddForm = this.hideAddForm.bind(this);
        this.showUpdateForm = this.showUpdateForm.bind(this);
        this.hideUpdateForm = this.hideUpdateForm.bind(this);
        this.showAddMedicationPlanForm = this.showAddMedicationPlanForm.bind(this);
        this.hideAddMedicationPlanForm = this.hideAddMedicationPlanForm.bind(this);

        this.state = {
            addPatientBtnClicked: false,
            updatePatientBtnClicked: false,
            deletePatientBtnClicked: false,
            addMedicationPlanBtnClicked: false,
            tableData: [],
            isLoaded: true,
            caregiver: undefined,
            selectedPatient: undefined,
            selectedRow: -1
        };
    }

    componentDidMount() {
        this.fetchPatients();
    }

    showAddForm() {
        this.setState({
            addPatientBtnClicked: true
        });
    }

    hideAddForm() {
        this.setState({
            addPatientBtnClicked: false
        });
    }

    showUpdateForm() {
        this.setState({
            updatePatientBtnClicked: true
        });
    }

    hideUpdateForm() {
        this.setState({
            updatePatientBtnClicked: false
        });
    }

    showAddMedicationPlanForm() {
        this.setState({
            addMedicationPlanBtnClicked: true
        });
    }

    hideAddMedicationPlanForm() {
        this.setState({
            addMedicationPlanBtnClicked: false
        });
    }

    fetchPatients() {
        PatientService.getAll()
            .then(response => {
                this.setState({
                    tableData: response.data
                });
            })
            .catch(e => {
                console.log(e)
            });
    }

    selectPatient(e, index) {
        let patient = JSON.parse(e.target.parentElement.getAttribute('data-item'));
        if (index !== undefined) {
            this.setState({
                selectedPatient: patient,
                selectedRow: index
            });
        }
    }

    deletePatient(e) {
        e.preventDefault();

        PatientService.deleteById(this.state.selectedPatient.id)
            .then(() => {
                    console.log("DELETED");
                    window.location.reload();
                },
                error => {
                    console.log("ERROR");
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) || error.message || error.toString();
                    this.setState({
                        message: resMessage
                    });
                }
            );
    }

    renderPatient(patient, index) {

        return (
            <tr key={index}
                data-item={JSON.stringify(patient)}
                onClick={(e) => {
                    this.selectPatient(e, index);
                }}
                bgcolor={this.state.selectedRow === index ? "#d19f0a" : ""}

            >
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.address}</td>
                <td>{patient.caregiver_id}</td>
            </tr>
        );
    }

    render() {

        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Patients Management</strong>
                    </CardHeader>

                    <CardBody>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button variant="primary"
                                        onClick={this.showAddForm}>Add patient</Button>
                                {' '}
                                <Button variant="warning"
                                        onClick={this.showUpdateForm}>Update patient</Button>
                                {' '}
                                <Button variant="danger"
                                        onClick={this.deletePatient}>Delete patient</Button>
                                {' '}
                                <Button variant="secondary"
                                        onClick={this.showAddMedicationPlanForm}>Add medication plan</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded &&
                                <Table variant="dark" bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Caregiver</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.tableData.map(this.renderPatient)}
                                    </tbody>
                                </Table>}
                            </Col>
                        </Row>

                        <Modal show={this.state.addPatientBtnClicked}
                               onHide={this.hideAddForm}>
                            <AddPatientForm/>
                        </Modal>

                        <Modal show={this.state.updatePatientBtnClicked}
                               onHide={this.hideUpdateForm}>
                            {this.state.selectedPatient !== undefined &&
                            <UpdatePatientForm selectedPatient={this.state.selectedPatient}/>
                            }
                        </Modal>

                        <Modal show={this.state.addMedicationPlanBtnClicked}
                               onHide={this.hideAddMedicationPlanForm}>
                            <AddMedicationPlanForm selectedPatient={this.state.selectedPatient}/>
                        </Modal>

                    </CardBody>
                </Card>

            </div>
        );

    }
}

export default PatientsContainer;