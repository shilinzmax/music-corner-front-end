import React from "react";
import {Link, withRouter} from "react-router-dom";
import "../../css/profile/LoginProfile.css"
import MCCrudServices from "../../services/mc-crud-services/MCCrudServices";
import {connect} from "react-redux";
class AnonyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            pid: null,
            isLoading: true
        }

    }

    componentDidMount() {
        const {location: {search}} = this.props;
        let searchParams = new URLSearchParams(search);
        console.log(this.props);
        const pid = this.props.match.params.pid;

        new MCCrudServices().getUserById(pid)
            .then(user => this.setState({
                user: user,
                pid: pid,
                isLoading: false
            }))
    }

    render() {
        if(this.state.isLoading)
            return <h3>Loading...</h3>
        return(
            <div className="container">
                <div className="login-card">
                            <span>
                                <img className="avatar-img" src={require('../../photo.png')} className="avatar" />
                                {this.state.user.username}
                            </span>
                    <div className="card-body">
                        <div className="form-group row card-text">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Info</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>username:</td>
                                    <td> {this.state.user.username}</td>
                                </tr>
                                <tr>
                                    <td>firstname:</td>
                                    <td> {this.state.user.first_name}</td>
                                </tr>
                                <tr>
                                    <td>lastname:</td>
                                    <td> {this.state.user.last_name}</td>
                                </tr>
                                </tbody>
                            </table>

                        </div>

                        <a className="login-button btn btn-primary anony-profile-btn" href='/'>
                            Back to main page
                        </a>

                    </div>

                </div>


            </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => ({})

const mapStateToProps = state => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnonyProfile));
