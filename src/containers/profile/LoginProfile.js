import React from "react";
import {Link, withRouter} from "react-router-dom";
import "../../css/profile/LoginProfile.css"
import {connect} from "react-redux";
import MCCrudServices from "../../services/mc-crud-services/MCCrudServices";
import NewsPost from "../News/NewsPost";
import LoginUserPost from "./LoginUserPosts/LoginUserPosts";
// import "../../css/LoginTable.css"
import '@fortawesome/fontawesome-free'
import '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css'


class LoginProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            pid: null,
            isLoading: true
        }

    }

    componentDidMount() {
        // const {location: {search}} = this.props;
        // let searchParams = new URLSearchParams(search);
        // console.log(this.props);
        const pid = this.props.match.params.pid;

        new MCCrudServices().getUserById(pid)
            .then(user => this.setState({
                user: user,
                pid: pid,
                isLoading: false
            }))
    }

    getUserById = (pid) => {
        return new MCCrudServices().getUserById(pid)
            .then(user => this.setState({
                user: user
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
                                    {/*USER NAME (spotify id)*/}
                                {this.state.user.username}
                                {/*{console.log(this.getUserById(this.state.pid))}*/}

                            </span>
                    {/*<button className="btn dropdown-toggle following-btn edit-btn"*/}
                    {/*        aria-haspopup="true" aria-expanded="false">*/}
                    {/*    Following*/}
                    {/*</button>*/}
                    <div className="card-body">
                        <div className="form-group row card-text">

                            <div className="login-username col-sm-9">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Info</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>spotify id: </td>
                                        <td>{this.state.user.id}</td>
                                    </tr>
                                    <tr>
                                        <td>username:</td>
                                        <td> {this.state.user.username}</td>
                                    </tr>
                                    <tr>
                                        <td>firstname: </td>
                                        <td> {this.state.user.first_name}</td>
                                    </tr>
                                    <tr>
                                        <td>lastname:</td>
                                        <td> {this.state.user.last_name}</td>
                                    </tr>
                                    </tbody>
                                </table>




                            </div>

                        </div>



                    </div>



                </div>
                <div>
                    {
                        this.state.user.posts.map(post =>
                            <div key={post.id}>
                                <LoginUserPost post={post}
                                               username = {this.state.user.username}
                                               id = {this.state.user.id}
                                               accessToken={this.props.accessToken} />
                            </div>
                        )
                    }
                </div>




                <a className="login-button btn btn-primary" href='/'>Back to main page</a>


            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => ({})

const mapStateToProps = state => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginProfile));
