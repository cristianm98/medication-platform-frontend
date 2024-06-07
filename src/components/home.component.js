import React from "react";
import {Button, Container, Form, Jumbotron, Modal, Nav, Navbar} from "react-bootstrap";
import Login from "./login.component";
import Register from "./register.component";
import Background from "../commons/images/home_bg.jpg";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleShowLogIn = this.handleShowLogIn.bind(this);
        this.handleHideLogIn = this.handleHideLogIn.bind(this);
        this.handleShowRegister = this.handleShowRegister.bind(this);
        this.handleHideRegister = this.handleHideRegister.bind(this);

        this.state = {
            showLogIn: false,
            showRegister: false,
        };
    }

    handleShowLogIn() {
        this.setState({
                showLogIn: true
            }
        )
    }

    handleHideLogIn() {
        this.setState({
                showLogIn: false
            }
        )
    }

    handleShowRegister() {
        this.setState({
            showRegister: true
        });
    }

    handleHideRegister() {
        this.setState({
            showRegister: false
        });
    }

    render() {
        return (
            <Jumbotron style={{
                backgroundImage: "url(" + Background + ")",
                backgroundSize: "110%",
                width: "100%",
                height: "800px",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <Container>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="/home">Home</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/about">About</Nav.Link>
                            </Nav>
                            <Form inline>
                                <Button variant="outline-success"
                                        onClick={this.handleShowRegister}>Register</Button>
                                {' '}
                                <Button variant="outline-warning"
                                        onClick={this.handleShowLogIn}>Log In</Button>

                                <Modal show={this.state.showLogIn}
                                       onHide={this.handleHideLogIn}>
                                    <Login/>
                                </Modal>
                                <Modal show={this.state.showRegister}
                                       onHide={this.handleHideRegister}>
                                    <Register/>
                                </Modal>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </Jumbotron>
        )
    }
}

export default Home;