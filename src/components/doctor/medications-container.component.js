import React from "react";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {Modal} from "react-bootstrap";
import MedicationService from "../../services/data/medication-service";
import AddMedicationForm from "./medication-add.component";
import UpdateMedicationForm from "./medication-update.component";

class MedicationsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.showAddForm = this.showAddForm.bind(this);
        this.hideAddForm = this.hideAddForm.bind(this);
        this.showUpdateForm = this.showUpdateForm.bind(this);
        this.hideUpdateForm = this.hideUpdateForm.bind(this);
        this.fetchMedications = this.fetchMedications.bind(this);
        this.selectMedication = this.selectMedication.bind(this);
        this.deleteMedication = this.deleteMedication.bind(this);
        this.renderMedication = this.renderMedication.bind(this);

        this.state = {
            addMedicationBtnClicked: false,
            updateMedicationBtnClicked: false,
            deleteMedicationBtnClicked: false,
            tableData: [],
            isLoaded: true,
            selectedMedication: undefined,
            selectedRowIndex: -1
        }
    }

    componentDidMount() {
        this.fetchMedications();
    }

    showAddForm() {
        this.setState({
            addMedicationBtnClicked: true
        });
    }

    hideAddForm() {
        this.setState({
            addMedicationBtnClicked: false
        });
    }

    showUpdateForm() {
        this.setState({
            updateMedicationBtnClicked: true
        });
    }

    hideUpdateForm() {
        this.setState({
            updateMedicationBtnClicked: false
        });
    }

    fetchMedications() {
        MedicationService.getAll()
            .then(response => {
                this.setState({
                    tableData: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    selectMedication(e, index) {
        let medication = JSON.parse(e.target.parentElement.getAttribute('data-item'));
        if (index !== undefined) {
            this.setState({
                selectedMedication: medication,
                selectedRowIndex: index
            });
        }
    }

    deleteMedication(e) {
        e.preventDefault();

        MedicationService.deleteById(this.state.selectedMedication.id)
            .then(() => {
                    console.log("DELETED");
                    window.location.reload();
                }
            )
            .catch(e => {
                console.log(e);
            });
    }

    renderMedication(medication, index) {
        return (
            <tr key={index}
                data-item={JSON.stringify(medication)}
                onClick={(e) => {
                    this.selectMedication(e, index);
                }}
                bgcolor={this.state.selectedRowIndex === index ? "#d19f0a" : ""}

            >
                <td>{medication.name}</td>
                <td>{medication.sideEffects}</td>
                <td>{medication.dosage}</td>
            </tr>
        );
    }

    render() {

        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Medications Management</strong>
                    </CardHeader>

                    <CardBody>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button variant="primary"
                                        onClick={this.showAddForm}>Add Medication</Button>
                                {' '}
                                <Button variant="warning"
                                        onClick={this.showUpdateForm}>Update Medication</Button>
                                {' '}
                                <Button variant="danger"
                                        onClick={this.deleteMedication}>Delete Medication</Button>
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
                                        <th>Side effects</th>
                                        <th>Dosage</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.tableData.map(this.renderMedication)}
                                    </tbody>
                                </Table>}
                            </Col>
                        </Row>

                        <Modal
                            show={this.state.addMedicationBtnClicked}
                            onHide={this.hideAddForm}>
                            <AddMedicationForm/>
                        </Modal>

                        <Modal show={this.state.updateMedicationBtnClicked}
                               onHide={this.hideUpdateForm}>
                            {this.state.selectedMedication !== undefined &&
                            <UpdateMedicationForm selectedMedication={this.state.selectedMedication}/>
                            }
                        </Modal>

                    </CardBody>
                </Card>

            </div>
        );

    }
}

export default MedicationsContainer;