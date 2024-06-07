import React from "react";
import AuthService from "../services/auth/auth-service";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                        <strong>HERE</strong> Profile

                    </h3>
                </header>

                <p>
                    <strong>Token:</strong>{" "}
                    {this.state.currentUser.token}
                </p>

                <p>
                    <strong>Id:</strong>{" "}
                    {this.state.currentUser.id}
                </p>

            </div>
        );

    }
}