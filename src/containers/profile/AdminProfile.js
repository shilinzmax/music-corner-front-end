import React from "react";
import {Link} from "react-router-dom";
import "../../css/profile/AdminProfile.css"
export default class AdminProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return(
            <div className="container">
                <div className="login-card">
                            <span>
                                <img className="avatar-img" src={require('../../photo.png')} className="avatar" />
                                    USER NAME (spotify id)
                            </span>
                    <button className="btn dropdown-toggle edit-btn"
                            aria-haspopup="true" aria-expanded="false">
                        Edit Profile
                    </button>
                    <div className="card-body">
                        <div className="form-group row card-text">

                            <div className="login-username col-sm-9">
                                Bio information here, you can update by click edit btn



                            </div>

                        </div>
                        <a href='/' className="login-button btn btn-primary">Back to main page</a>

                    </div>

                </div>


            </div>

        )
    }
}
