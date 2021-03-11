import React from "react";
import ReactDOM from 'react-dom'
import '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css'
import '../../css/NewsFeed.css'
import '@fortawesome/fontawesome-free'
import {Link} from "react-router-dom";

export default class AnonyPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLike: false,
            post: this.props.post,
            showComment: false,
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
                                    {/*<img className="avatar-img" src="../../photo.png" className="avatar"/>*/}
                                    <img className="avatar-img" src={require('../../photo.png')} className="avatar" />
                                    <Link to={'/profile/'+ this.state.post.user.id} className="card-title user-name">
                                        {this.state.post.user.username}
                                    </Link>
                                    {/*<a href="#" className="card-title user-name">{this.state.post.username}</a>*/}

                                </span>

                            {/*<select type="button" className="btn dropdown-toggle" data-toggle="dropdown"*/}
                            {/*        aria-haspopup="true" aria-expanded="false">*/}

                            {/*    <option value="1">Action1</option>*/}
                            {/*    <option value="2">Action2</option>*/}

                            {/*</select>*/}


                            <hr/>
                        </div>
                        <p className="card-text text-wrap">{this.state.post.post}</p>
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


                </div>
            </div>
        )
    }
}
