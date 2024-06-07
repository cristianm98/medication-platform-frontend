import React, {useState} from "react";
import {Alert, Button} from "react-bootstrap";

function SuccessAlert(props) {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>Success</Alert.Heading>
                <hr/>
                <p>
                    {props.message}
                </p>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => {
                        setShow(false);
                        window.location.reload();
                    }}
                            variant="outline-success">
                        Ok
                    </Button>
                </div>
            </Alert>
        </>
    );
}

function ErrorAlert(props) {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <hr/>
                <p>
                    {props.message}
                </p>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => {
                        setShow(false);
                        window.location.reload();
                    }}
                            variant="outline-danger">
                        Ok
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export {
    SuccessAlert,
    ErrorAlert
};