import React from "react";
import {connect} from "react-redux";
import MCCrudServices from "../services/mc-crud-services/MCCrudServices";
import {Link} from "react-router-dom";

class MyPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: ""
        }
    }

    changePostContent(evt) {
        this.setState({post: evt.target.value});
    }

    render() {
        return(
            <div className="container">
                <div className="login-card">
                    <h1 className="register card-header">My New Post</h1>
                    <div className="card-body">
                        <div className="form-group row card-text">

                            <div className="login-username col-sm-9">
                                <textarea id="w3review" placeholder="whats up" name="w3review" rows="4" cols="50"
                                onChange={(evt) => this.changePostContent(evt)}/>
                            </div>

                        </div>
                        <Link to="/" onClick={() => new MCCrudServices().addPost(this.props.userObject.id, this.props.accessToken, {
                            post: this.state.post
                        }).then(resp => console.log(resp))} className="login-button btn btn-primary">Done</Link>

                    </div>

                </div>


            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    accessToken: state.spotifyAuth.accessToken,
    userObject: state.spotifyAuth.currentUserObject
})

const propertyToDispatchMapper = (dispatch) => ({

})

export default connect
( stateToPropertyMapper,
    propertyToDispatchMapper)
(MyPost)
