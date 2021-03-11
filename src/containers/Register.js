import React from "react";
import "../css/register.css"
import {AUTH_REDIRECT_URI, CLIENT_ID, SPOTIFY_ACCOUNT_URL} from "../constants/spotifyAPIConstants";
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            admin_code: ""
        }

        this.LINK_TO_AUTH = SPOTIFY_ACCOUNT_URL + '/authorize/?client_id=' + CLIENT_ID + '&response_type=code' +
            '&redirect_uri=' + AUTH_REDIRECT_URI;
        this.changeUsername = this.changeUsername.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.changeFirstname = this.changeFirstname.bind(this);
        this.storeRegistrationInfo = this.storeRegistrationInfo.bind(this);
        this.changeAdminCode = this.changeAdminCode.bind(this);
    }

    changeAdminCode(evt) {
        this.setState({admin_code: evt.target.value})
    }

    changeUsername(evt) {
        this.setState({username: evt.target.value});
    }

    changeFirstname(evt) {
        this.setState({first_name: evt.target.value});
    }

    changeLastname(evt) {
        this.setState({last_name: evt.target.value});
    }

    storeRegistrationInfo() {
        const error = {
            error: "invalid registration info"
        }
        if(this.state.username === "" || this.state.first_name === "" || this.state.last_name === "") {
            localStorage.setItem('register_info', JSON.stringify(error));
            return;
        }

        const user = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            admin_code: this.state.admin_code
        }

        localStorage.setItem('register', 'true');
        localStorage.setItem('register_info', JSON.stringify(user));
        localStorage.setItem('admin_code', user.admin_code);
    }
    render() {
        return (
            <div className="container">
                <div className="card-new">
                    <h1 className="register card-header">Register</h1>
                    <div className="card-body">
                        <div className="card2 form-group row card-text">

                            <div className="register-username col-sm-9">
                                Username
                                <input className="form-control wbdv-field wbdv-username" type="text" id="username"
                                       name="username" onChange={(evt) => this.changeUsername(evt)}/>
                            </div>

                            <div className="firstname col-sm-9">
                                First Name
                                <input className="form-control wbdv-field wbdv-username" type="text" id="username"
                                       name="username" onChange={(evt) => this.changeFirstname(evt)}/>
                            </div>

                            <div className="lastname col-sm-9">
                                Last Name
                                <input className="form-control wbdv-field wbdv-username" type="text" id="username"
                                       name="username" onChange={(evt) => this.changeLastname(evt)}/>
                            </div>

                            <div className="lastname col-sm-9">
                                Admin Code
                                <input className="form-control wbdv-field wbdv-username" type="text" id="username"
                                       name="username" onChange={(evt) => this.changeAdminCode(evt)}/>
                            </div>
                        </div>
                        <a href={this.LINK_TO_AUTH}><button className="register-button btn btn-primary"
                                                            onClick={this.storeRegistrationInfo}>
                            Spotify Register
                        </button></a>


                    </div>

                </div>


            </div>


        )
    }
}
