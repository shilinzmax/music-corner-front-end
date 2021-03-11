import React from "react";
import ReactDOM from 'react-dom'
import '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css'
import '../../css/NewsFeed.css'
import '@fortawesome/fontawesome-free'
import {Link} from "react-router-dom";

export default class AdminPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLike: false,
            showComment: false,
            post: this.props.post,
        }
        this.changeShowLike = this.changeShowLike.bind(this);
        this.changeShowComment = this.changeShowComment.bind(this);
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

    render() {
        return (
            <div className='container'>

                <div className="card card1">

                    <div className="card-body">
                        <div className="card-head">
                                <span>
                                    <img className="avatar-img" src={require('../../photo.png')} className="avatar" />
                                    <Link to={'/adminProfile/${this.state.post.id}'} className="card-title user-name">
                                        {this.state.post.username}
                                    </Link>
                                </span>

                            <select type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">

                                <option value="1">Report</option>
                                <option value="2">Delete</option>

                            </select>


                            <hr/>
                        </div>
                        <p className="card-text text-wrap">{this.state.post.text}</p>
                        <img className="card-img-top card-img" src="https://upload.wikimedia.org/wikipedia/commons/7/72/Basketball_Clipart.svg" alt="Upload image if need"/>
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
                {/*{this.state.post.comments.map(comment =>*/}
                {/*    <div key={comment.id}>*/}
                {/*        {comment.text}*/}
                {/*    </div>*/}
                {/*)}*/}
                {this.state.post.comments.map(comment =>
                    <div key={comment.id}>
                        <div className="card card-for-comment">
                            {comment.text}
                            <hr/>

                        </div>
                    </div>
                )}



            </div>
        )
    }
}
