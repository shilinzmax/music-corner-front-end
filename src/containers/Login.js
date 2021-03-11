import React from "react";
import {Link} from "react-router-dom";
import {AUTH_REDIRECT_URI, CLIENT_ID, SPOTIFY_ACCOUNT_URL} from "../constants/spotifyAPIConstants";
import '../css/login.css'
import MCAuthServices from "../services/mc-auth-services/MCAuthServices";
//LINK_TO_AUTH

// <a  href={this.LINK_TO_AUTH}>
//     spotify sign
// </a>
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
        this.LINK_TO_AUTH = SPOTIFY_ACCOUNT_URL + '/authorize/?client_id' + '=' + CLIENT_ID + '&response_type=code' +
            '&redirect_uri=' + AUTH_REDIRECT_URI;

        this.changeUsername = this.changeUsername.bind(this);
        }

        changeUsername(evt) {
            this.setState({username: evt.target.value});
        }



    render() {
        return (
                <div className="container">
                    <div className="login-card">
                        <h1 className="register card-header">Login</h1>
                        <div className="card-body">
                            <div className="form-group row card-text">

                                <div className="login-username col-sm-9">
                                    Username
                                    <input className="form-control wbdv-field wbdv-username" type="text" id="username"
                                           name="username" onChange={(evt) => this.changeUsername(evt)}/>
                                </div>

                            </div>
                            <a href={this.LINK_TO_AUTH} onClick={() => {
                                localStorage.setItem('login', 'true')
                                localStorage.setItem('username', this.state.username)
                            }} className="login-button btn btn-primary">Spotify Login</a>

                        </div>

                    </div>


                </div>

        )
    }
}
