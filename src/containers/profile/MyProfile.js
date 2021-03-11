import React from "react";
import {Link} from "react-router-dom";
import "../../css/profile/MyProfile.css"
import {updateCurrentUserObj} from "../../actions/authActions";
import {getMCUser} from "../../actions/mcCrudActions";
import {connect} from "react-redux";
import MCCrudServices from "../../services/mc-crud-services/MCCrudServices";

class myProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            user: {
                id: this.props.spotifyUser.id,
                username: this.props.currentUserObj.username,
                first_name: this.props.currentUserObj.first_name,
                last_name: this.props.currentUserObj.last_name,
                /*is_admin: this.props.currentUserObj.is_admin,
                posts: this.props.currentUserObj.posts,
                followers: this.props.currentUserObj.followers,
                followees: this.props.currentUserObj.followees*/
            }
        }

        this.editOn = this.editOn.bind(this)
        this.saveData = this.saveData.bind(this)
    }

    componentDidMount() {
        this.props.updateCurrentUserObj(this.props.spotifyUser.id)
        new MCCrudServices().getUserById(this.props.spotifyUser.id).then(user => this.setState({user: {...user}}))
    }

    editOn() {
        this.setState({isEditing: true})
    }

    saveData() {
        new MCCrudServices().updateUser({...this.state.user, posts: []}, this.props.spotAuth.accessToken).then(resp => {
                console.log(resp)
                this.props.updateCurrentUserObj(this.props.spotifyUser.id)
                this.setState({isEditing: false})
            }
        )
    }

    render() {
        return(
            <div className="container">
                <div className="login-card">
                            <span>
                                <img className="avatar-img" src={require('../../photo.png')} className="avatar" />
                                {this.props.currentUserObj.username}
                            </span>
                    {!this.state.isEditing && <button className="btn dropdown-toggle edit-btn"
                             aria-haspopup="true" aria-expanded="false" onClick={this.editOn}>
                        Edit Profile
                    </button>}
                    {this.state.isEditing && <button className="btn dropdown-toggle edit-btn"
                                                      aria-haspopup="true" aria-expanded="false"
                    onClick={this.saveData}>
                        Save Edit
                    </button>}
                    <div className="card-body">
                        <div className="form-group row card-text">

                            <div className="login-username col-sm-9">
                                Username: {!this.state.isEditing && this.props.currentUserObj.username}
                                {this.state.isEditing && <input className="form-control wbdv-field" type="text" defaultValue={this.props.currentUserObj.username}
                                                                onChange={(evt) => this.setState({user: {...this.state.user, username: evt.target.value}})}/>}
                            </div>
                            <div className="login-username col-sm-9">
                                First Name: {!this.state.isEditing && this.props.currentUserObj.first_name}
                                {this.state.isEditing && <input className="form-control wbdv-field" type="text" defaultValue={this.props.currentUserObj.first_name}
                            onChange={(evt) => this.setState({user: {...this.state.user, first_name: evt.target.value}})}/>}
                            </div>
                            <div className="login-username col-sm-9">
                                Last Name: {!this.state.isEditing && this.props.currentUserObj.last_name}
                                {this.state.isEditing && <input className="form-control wbdv-field" type="text" defaultValue={this.props.currentUserObj.last_name}
                                                                onChange={(evt) => this.setState({user: {...this.state.user, last_name: evt.target.value}})}/>}
                            </div>

                        </div>
                        <Link to='/' className="login-button btn btn-primary">Back to main page</Link>

                    </div>

                </div>


            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    spotAuth: state.spotifyAuth,
    spotifyUser: state.spotifyAuth.currentUserObject,
    currentUserObj: state.mcAuthUser
})

const mapDispatchToProps = (dispatch) => ({
    updateCurrentUserObj: (uid) => getMCUser(uid, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(myProfile)
