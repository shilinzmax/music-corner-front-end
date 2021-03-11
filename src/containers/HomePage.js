import React from "react";
import {BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import NavBar from "../components/NavBar";
import '../css/homepage.css'
import SpotifyAuthServices from "../services/spotify-auth-services/SpotifyAuthServices";
import SearchResults from "./SearchResults";
import TrackDetails from "../components/TrackDetails";

import Login from "./Login";
import Register from "./Register";
import LogOutPage from "../components/LogOutPage";
import {updateAccessToken, updateAuthCode, updateCurrentUserObj, updateIsLoggedIn} from "../actions/authActions";
import {connect} from "react-redux";

import MCAuthServices from "../services/mc-auth-services/MCAuthServices";
import {AUTH_REDIRECT_URI, CLIENT_ID, SPOTIFY_ACCOUNT_URL} from "../constants/spotifyAPIConstants";
import AnonyFeed from "./Anony/AnonyFeed";
import NewsFeed from "./News/NewsFeed";
import AnonyProfile from "./profile/AnonyProfile";
import MyPost from "./MyPost";
import AdminFeed from "./Admin/AdminFeed";
import LoginProfile from "./profile/LoginProfile";
import ErrorPage from "./ErrorPage";
import AdminProfile from "./profile/AdminProfile";
import MyProfile from "./profile/MyProfile";
import Privacy from "./Privacy";
import PrivacyPolicy from "./PrivacyPolicy";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        /*this.state = {
            authCode: null,
            accessToken: null,
            refreshToken: null,
            currentUserObject: null
        }*/

        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.setAuth = this.setAuth.bind(this);
        this.LINK_TO_AUTH = SPOTIFY_ACCOUNT_URL + '/authorize/?client_id=' + CLIENT_ID + '&response_type=code' +
            '&redirect_uri=' + AUTH_REDIRECT_URI;
    }

    setAuth(authCode) {
        this.props.updateAuthCode(authCode);
        localStorage.setItem('auth_code', authCode);
        this.props.updateAccessToken(localStorage.getItem('access_token'), localStorage.getItem('refresh_token'));
        new SpotifyAuthServices().getCurrentUserProfile(this.props.accessToken).then(resp => {
            this.props.updateCurrentUserObj(resp);
        })

    }

    async componentDidMount() {
        //introduce error message in case authorization fails
        const {location: {search}} = this.props;
        let searchParams = new URLSearchParams(search);
        let accessToken, refreshToken;

        if(localStorage.getItem('register') === 'true') {
            if (searchParams.has('code') === false) {
                console.log("error: no code found");
                return;
            }

            const register_info = JSON.parse(localStorage.getItem('register_info'));
            if (register_info.error !== undefined) {
                console.log("error: invalid user registration");
                localStorage.setItem('register_info', null);
                localStorage.setItem('register', 'false');
                return;
            }

            const user = {
                username: register_info.username,
                first_name: register_info.first_name,
                last_name: register_info.last_name
            }

            localStorage.setItem('register', 'false');
            new MCAuthServices().registerUsername(user, searchParams.get('code'), localStorage.getItem('admin_code')).then(resp => console.log(resp))
            return;
        }

        if(localStorage.getItem('login') === 'true') {
            if (!this.props.currentUserObject && searchParams.has("code")) {
                localStorage.setItem('auth_code', searchParams.get("code"));
                let authCode = searchParams.get("code");
                new SpotifyAuthServices().getTokens(authCode).then(resp => {
                    if (resp.error === undefined) {
                        new SpotifyAuthServices().getCurrentUserProfile(resp.access_token).then(resp2 => {
                            new MCAuthServices().verifyUsername(resp2.id, localStorage.getItem('username')).then(resp3 => {
                                localStorage.setItem('login', 'false');
                                localStorage.setItem('username', '');
                                if(resp3.error !== undefined) {
                                    localStorage.setItem('access_token', null);
                                    localStorage.setItem('refresh_token', null);
                                    console.log("error: username combination not recognized");
                                } else {
                                    localStorage.setItem('access_token', resp.access_token);
                                    localStorage.setItem('refresh_token', resp.refresh_token);
                                    this.props.updateAccessToken(accessToken, refreshToken);
                                    this.setAuth(authCode);
                                }
                            })
                        })
                    }
                });
            }
            localStorage.setItem('login', 'false');
        }

        if (localStorage.getItem('access_token') !== null) {
            accessToken = localStorage.getItem('access_token');
            refreshToken = localStorage.getItem('refresh_token');
            await new SpotifyAuthServices().getCurrentUserProfile(accessToken).then(resp => {
                if (resp.error === undefined) {
                    this.props.updateCurrentUserObj(resp);
                    this.props.updateAccessToken(accessToken, refreshToken);
                } else {
                    this.props.updateAccessToken(null, null);
                }
            });
        }



        /*if(searchParams.has("code")) {
            localStorage.setItem('auth_code', searchParams.get("code"));
            new SpotifyAuthServices().getTokens(searchParams.get("code")).then(resp => {
                if (resp.error === undefined) {
                    localStorage.setItem('access_token', resp.access_token);
                    localStorage.setItem('refresh_token', resp.refresh_token);
                }
                this.setState({
                    authCode:searchParams.get("code"),
                    accessToken: localStorage.getItem('access_token'),
                    refreshToken: localStorage.getItem('refresh_token')
                })
                new SpotifyAuthServices().getCurrentUserProfile(this.state.accessToken).then(resp => {
                    this.setState({
                        currentUserObject: resp
                    })
                })
            });
        }*/

    }

    isLoggedIn() {
        if (this.props.currentUserObject === null || this.props.currentUserObject.error !== undefined) {
            return false;
        } else {
            return true;
        }
    }


    render() {
        return(
            <div className='wbdv-homepage'>
                <div className='wbdv-heading'>
                    <h1>Musician's Corner</h1>
                </div>
                <NavBar user={this.props.currentUserObject}/>
                {this.isLoggedIn() &&
                    <Router>
                        <Switch>
                            <Route path='/trackdetails/:id' children={<TrackDetails accessToken={this.props.accessToken}/>}/>
                            {/*<Route path='/' children={<SearchResults accessToken={this.state.accessToken}/>}/>*/}
                            {/*<Route path='/' children={<NewsPost/>}></Route>*/}
                            {/*<Route path='/' children={<SearchResults/>}/>*/}
                            {/*<Route path='/logout' children={<LogOutPage/>}/>*/}
                            <Route path='/privacy-policy' children={<PrivacyPolicy/>}/>
                            <Route path='/adminProfile' children={<AdminProfile/>}/>
                            <Route path='/loginFirstPage' children={<NewsFeed/>}/>
                            <Route path='/loginProfile/:pid' children={<LoginProfile/>}/>
                            <Route path='/myprofile' children={<MyProfile/>}/>
                            <Route path='/songs' children={<SearchResults/>}/>
                            <Route path='/myprofile' children={<MyProfile/>}/>
                            <Route path='/admin' children={<AdminFeed/>}/>
                            <Route path='/my-post' children={<MyPost/>}/>

                            <Route path='/' children={<NewsFeed/>}/>

                        </Switch>
                    </Router>
                }
                {!this.isLoggedIn() &&
                <Router>
                    <Switch>
                        {/*below are change route to login*/}
                        <Route path='/privacy-policy' children={<PrivacyPolicy/>}/>
                        <Route path='/errorpage' children={<ErrorPage/>}/>
                        {/*<Route path='/adminProfile/:pid' children={<AdminProfile/>}/>*/}
                        <Route path='/adminProfile' children={<AdminProfile/>}/>
                        <Route path='/loginFirstPage' children={<NewsFeed/>}/>
                        <Route path='/loginProfile/:pid' children={<LoginProfile/>}/>
                        {/*<Route path='/errorpage' children={<ErrorPage/>}/>*/}
                        {/*<Route path='/admin' children={<AdminFeed/>}></Route>*/}
                        {/*<Route path='/adminProfile' children={<AdminProfile/>}/>*/}
                        {/*<Route path='/loginFirstPage' children={<NewsFeed/>}/>*/}
                        {/*<Route path='/loginProfile/:pid' children={<LoginProfile/>}/>*/}
                        {/*<Route path='/myprofile' children={<MyProfile/>}/>*/}
                        {/*above are change route to login*/}
                        <Route path='/errorpage' children={<ErrorPage/>}/>
                        <Route path='/privacy' children={<Privacy/>}/>
                        <Route path='/login' children={<Login/>}/>
                        <Route path='/logout' children={<LogOutPage/>}/>

                        <Route path='/register' children={<Register/>}></Route>
                        <Route path='/profile/:pid' children={<AnonyProfile/>}/>
                        <Route path='/' children={<AnonyFeed/>}></Route>



                        <Route path='/loginprofile/:pid' children={<LoginProfile/>}/>



                        <Route path='/' children={<AnonyFeed/>}/>
                    </Switch>
                </Router>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateAuthCode: (authCode) => updateAuthCode(authCode, dispatch),
    updateAccessToken: (accessToken, refreshToken) => updateAccessToken(accessToken, refreshToken, dispatch),
    updateIsLoggedIn: (isLoggedIn) => updateIsLoggedIn(isLoggedIn, dispatch),
    updateCurrentUserObj: (userObj) => updateCurrentUserObj(userObj, dispatch),
    findPostById: (postId) => dispatch({type: "FIND_POST_BY_ID", postId}),
})

const mapStateToProps = state => ({
    authCode: state.spotifyAuth.authCode,
    accessToken: state.spotifyAuth.accessToken,
    refreshToken: state.spotifyAuth.refreshToken,
    isLoggedIn: state.spotifyAuth.isLoggedIn,
    currentUserObject: state.spotifyAuth.currentUserObject,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
