import React from "react";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import PatientService from "../../services/data/patient-service";
import AuthService from "../../services/auth/auth-service";

class CaregiverPatientsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.renderPatient = this.renderPatient.bind(this);
        this.fetchPatients = this.fetchPatients.bind(this);
        this.selectPatient = this.selectPatient.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            tableData: [],
            isLoaded: true,
            selectedPatient: "",
            selectedRow: -1
        };
    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        console.log(this.state.currentUser);
        PatientService.getByCaregiver(this.state.currentUser.id)
            .then(response => {
                this.setState({
                    tableData: response.data
                });
                console.log(response.data);
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
            </tr>
        );
    }

    render() {

        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>My patients</strong>
                    </CardHeader>
                    <CardBody>
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
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.tableData.map(this.renderPatient)}
                                    </tbody>
                                </Table>}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );

    }
}

export default CaregiverPatientsContainer;