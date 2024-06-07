import React, {useState} from "react";
import {Alert, Button} from "react-bootstrap";

function SuccessAlert(message) {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>Success</Alert.Heading>
                <hr/>
                <p>
                    {message}
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

function ErrorAlert(message) {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <hr/>
                <p>
                    {message}
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