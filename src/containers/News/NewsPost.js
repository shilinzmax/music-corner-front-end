import React from "react";
import ReactDOM from 'react-dom'
import '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css'
import '../../css/NewsFeed.css'
import '@fortawesome/fontawesome-free'
import {Link} from "react-router-dom";
import MCCrudServices from "../../services/mc-crud-services/MCCrudServices";
import connect from "react-redux/lib/connect/connect";
import {getAllPosts} from "../../actions/mcCrudActions";

export default class NewsPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLike: false,
            showComment: false,
            post: this.props.post,
            editOrUpdate: true,
            editText: null,
        }
        this.changeShowLike = this.changeShowLike.bind(this);
        this.changeShowComment = this.changeShowComment.bind(this);
        this.changeEditOrUpdate = this.changeEditOrUpdate.bind(this);
        this.changeEditText = this.changeEditText.bind(this);
    }

    changeEditOrUpdate() {
        this.setState({
            editOrUpdate:!this.state.editOrUpdate
        })
    }

    changeShowLike() {
        this.setState({
            showLike: !this.state.showLike
        })
    }

    changeShowComment() {
        this.setState({
            showComment: !this.state.showComment
        })
    }

    changeEditText(text) {
        this.setState({editText: text})
    }

    // updatePostByPostId(pid, access_token, text) {
    //     new MCCrudServices().updatePostByPostId(pid, access_token, text).then(postData => {
    //         this.setState({posts: postData, hasLoaded: true})
    //     })
    // }

    render() {
        return (
            <div className='container'>
                <div className="card card1">

                        <div className="card-body">
                            <div className="card-head">
                                <span>
                                     <img className="avatar-img" src={require('../../photo.png')} className="avatar" />
                                    <Link to={'/loginProfile/' + this.state.post.user.id} className="card-title user-name">
                                        {this.state.post.user.username}
                                    </Link>
                                </span>

                                {/*<select type="button" className="btn dropdown-toggle" data-toggle="dropdown"*/}
                                {/*        aria-haspopup="true" aria-expanded="false">*/}

                                {/*        <option value="1">Report</option>*/}
                                {/*        <option value="2">Update</option>*/}
                                {/*        <option value="3">Delete</option>*/}



                                {/*</select>*/}

                                <button onClick={
                                    () => new MCCrudServices().deletePostByPostId(this.state.post.id,
                                    this.props.accessToken).then(resp => {this.props.updatePost()})
                                }
                                        className="btn dropdown-toggle delete-btn">
                                    delete
                                </button>
                                {!this.state.editOrUpdate &&
                                <button onClick={() => {this.changeEditOrUpdate();
                                const post = {
                                    ...this.state.post,
                                    post: this.state.editText
                                }
                                new MCCrudServices().updatePostByPostId(this.state.post.id,
                                    this.props.accessToken, post).then(resp => {this.props.updatePost()})}}
                                        className="btn dropdown-toggle update-btn">
                                    update
                                </button>
                                }

                                {this.state.editOrUpdate &&
                                <button onClick={() => this.changeEditOrUpdate()}
                                        className="btn dropdown-toggle update-btn">
                                    Edit
                                </button>
                                }

                                <hr/>
                            </div>

                            {this.state.editOrUpdate &&
                            <p className="card-text text-wrap">{this.state.post.post}</p>
                            }
                            {!this.state.editOrUpdate &&


                            <textarea className='textarea-new-post' defaultValue={this.state.post.post} id="story" name="story"
                                      rows="5" cols="33" onChange={(evt) =>
                            {
                                this.changeEditText(evt.target.value)
                            }}>
                            </textarea>
                            }
                        </div>
                    {this.state.showLike &&
                        <button onClick={() => this.changeShowLike()} className='heart'><i
                            className="fa fa-thumbs-up fa-lg"></i></button>
                    }
                    {this.state.showComment &&
                    <button onClick={() => this.changeShowComment()} className='comment'>
                        <i className="fa fa-thumbs-down fa-lg"></i>
                    </button>
                    }

                    {!this.state.showLike &&
                        <button onClick={() => this.changeShowLike()} className='heart1'><i className="fa fa-thumbs-up fa-lg"></i></button>
                    }
                    {!this.state.showComment &&
                    <button onClick={() => this.changeShowComment()} className='comment1'><i className="fa fa-thumbs-down fa-lg"></i></button>
                    }


                    <form className="form-for-comment">
                        <label className="label-for-comment">Comment: </label>
                        <br/>
                        <input className="input-for-comment" type="text" size="50"/>
                        <button className="reply-for-comment"><i className="fa fa-reply fa-lg"></i></button>
                    </form>
                </div>
                {/*this.state.post.comments.map(comment =>
                    <div key={comment.id}>
                        <div className="card card-for-comment">
                            {comment.text}
                            <hr/>

                        </div>
                    </div>
                )*/}



            </div>
        )
    }
}




