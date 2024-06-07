import React from "react";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {Modal} from "react-bootstrap";
import CaregiverService from "../../services/data/caregiver-service";
import AddCaregiverForm from "./caregiver-add.component";
import UpdateCaregiverForm from "./caregiver-update.component";

class CaregiversContainer extends React.Component {

    constructor(props) {
        super(props);
        this.fetchCaregivers = this.fetchCaregivers.bind(this);
        this.selectCaregiver = this.selectCaregiver.bind(this);
        this.deleteCaregiver = this.deleteCaregiver.bind(this);
        this.renderCaregiver = this.renderCaregiver.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.hideAddForm = this.hideAddForm.bind(this);
        this.showUpdateForm = this.showUpdateForm.bind(this);
        this.hideUpdateForm = this.hideUpdateForm.bind(this);

        this.state = {
            addCaregiverBtnClicked: false,
            updateCaregiverBtnClicked: false,
            deleteCaregiverBtnClicked: false,
            tableData: [],
            isLoaded: true,
            selectedCaregiver: undefined,
            selectedRowIndex: -1
        }
    }

    componentDidMount() {
        this.fetchCaregivers();
    }

    showAddForm() {
        this.setState({
            addCaregiverBtnClicked: true
        });
    }

    hideAddForm() {
        this.setState({
            addCaregiverBtnClicked: false
        });
    }

    showUpdateForm() {
        this.setState({
            updateCaregiverBtnClicked: true
        });
    }

    hideUpdateForm() {
        this.setState({
            updateCaregiverBtnClicked: false
        });
    }

    fetchCaregivers() {
        CaregiverService.getAll()
            .then(response => {
                this.setState({
                    tableData: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    selectCaregiver(e, index) {
        let caregiver = JSON.parse(e.target.parentElement.getAttribute('data-item'));
        if (index !== undefined) {
            this.setState({
                selectedCaregiver: caregiver,
                selectedRowIndex: index
            });
        }
    }

    deleteCaregiver(e) {
        e.preventDefault();

        CaregiverService.deleteById(this.state.selectedCaregiver.id)
            .then(() => {
                    console.log("DELETED");
                    window.location.reload();
                }
            )
            .catch(e => {
                console.log(e);
            });
    }

    renderCaregiver(caregiver, index) {
        console.log(caregiver);
        return (
            <tr key={index}
                data-item={JSON.stringify(caregiver)}
                onClick={(e) => {
                    this.selectCaregiver(e, index);
                }}
                bgcolor={this.state.selectedRowIndex === index ? "#d19f0a" : ""}

            >
                <td>{caregiver.name}</td>
                <td>{caregiver.gender}</td>
                <td>
                    {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(Date.parse(caregiver.birthDate))}
                </td>
                <td>{caregiver.address}</td>
            </tr>
        );
    }

    render() {

        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Caregivers Management</strong>
                    </CardHeader>

                    <CardBody>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button variant="primary"
                                        onClick={this.showAddForm}>Add Caregiver</Button>
                                {' '}
                                <Button variant="warning"
                                        onClick={this.showUpdateForm}>Update Caregiver</Button>
                                {' '}
                                <Button variant="danger"
                                        onClick={this.deleteCaregiver}>Delete Caregiver</Button>
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
                                        <th>Birth date</th>
                                        <th>Address</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.tableData.map(this.renderCaregiver)}
                                    </tbody>
                                </Table>}
                            </Col>
                        </Row>

                        <Modal show={this.state.addCaregiverBtnClicked}
                               onHide={this.hideAddForm}>
                            <AddCaregiverForm/>
                        </Modal>

                        <Modal show={this.state.updateCaregiverBtnClicked}
                               onHide={this.hideUpdateForm}>
                            {this.state.selectedCaregiver !== undefined &&
                            <UpdateCaregiverForm selectedCaregiver={this.state.selectedCaregiver}/>
                            }
                        </Modal>

                    </CardBody>
                </Card>

            </div>
        );

    }
}

export default CaregiversContainer;