import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {AUTH_REDIRECT_URI, CLIENT_ID, SPOTIFY_ACCOUNT_URL} from "../constants/spotifyAPIConstants";
import {updateAccessToken, updateAuthCode, updateCurrentUserObj, updateIsLoggedIn} from "../actions/authActions";
import {connect} from 'react-redux';
import '../css/Nav.css'

const NavBar = ({user, updateIsLoggedIn, updateAuthCodeProp, updateAccessTokenProp, updateUserObjProp}) => {
    const LINK_TO_AUTH = SPOTIFY_ACCOUNT_URL + '/authorize/?client_id=' + CLIENT_ID + '&response_type=code' +
        '&redirect_uri=' + AUTH_REDIRECT_URI;

    function loggedInComp() {
        return <span>
        <li><Link to='/logout' onClick={() => {
            updateAuthCodeProp(null);
            updateAccessTokenProp(null, null);
            localStorage.setItem('auth_code', null);
            localStorage.setItem('access_token', null);
            localStorage.setItem('refresh_token', null);
            updateIsLoggedIn(false);
            updateUserObjProp(null);
        }}>
            Sign out
        </Link></li>
        <li><Link to='/myprofile'>My Profile</Link></li>
        </span>

    }

    return (
        <nav className="navbar navbar-inverse" style={{borderRadius: 0}}>
            <ol className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/privacy-policy" className='about-us'>Privacy Policy</a></li>
                {/*<li><a href="" className='privacy-policy'></a></li>*/}

            </ol>
            <ol className='nav nav-songs navbar-nav navbar-right'>
                {user !== null &&
                <li><a href="/songs">Songs</a></li>
                }
            </ol>



            <ol className='nav navbar-nav navbar-right' style={{marginRight: '20px'}}>
                {user === null &&
                    // <li><a href="/register">Register</a></li>
                    <li><a href="/privacy">Register</a></li>
                }
            </ol>

            {/*<ul className='nav navbar-nav navbar-right reported-posts-one'>*/}
            {/*    {user !== null &&*/}
            {/*    <li><button className='btn-danger'>Reported Posts</button></li>*/}
            {/*    }*/}
            {/*</ul>*/}

            {/*<ul className='nav navbar-nav navbar-right reported-posts-two' >*/}
            {/*    {user !== null &&*/}
            {/*    <li><button className='btn-success'>My feeds</button></li>*/}
            {/*    }*/}
            {/*</ul>*/}


            <ul className='nav navbar-nav navbar-right' style={{marginRight: '20px'}}>
                {(user !== null &&
                <li><a href='/myprofile'>My Profile</a></li>)}
            </ul>

            <ul className='nav navbar-nav navbar-right' style={{marginRight: '20px'}}>
                {(user === null &&
                    <li><a href='/login' onClick={() => updateIsLoggedIn(true)}>Sign in</a></li>) ||

                    <li className='sign-out-btn'><Link to='/logout' onClick={() => {
                        updateAuthCodeProp(null);
                        updateAccessTokenProp(null, null);
                        localStorage.setItem('auth_code', null);
                        localStorage.setItem('access_token', null);
                        localStorage.setItem('refresh_token', null);
                        updateIsLoggedIn(false);
                        updateUserObjProp(null);
                    }}>
                        Sign out
                    </Link></li>
                }
            </ul>


        </nav>
    )
}

const mapDispatchToProps = (dispatch) => ({
    updateAccessTokenProp: (accessToken, refreshToken) => updateAccessToken(accessToken, refreshToken, dispatch),
    updateAuthCodeProp: (code) => updateAuthCode(code, dispatch),
    updateIsLoggedIn: (isLoggedIn) => updateIsLoggedIn(isLoggedIn, dispatch),
    updateUserObjProp: (obj) => updateCurrentUserObj(obj, dispatch)
})

export default connect(null, mapDispatchToProps)(NavBar);
