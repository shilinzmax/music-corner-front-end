import {
    CHANGE_LOGIN_STATUS,
    UPDATE_AUTH_CODE,
    UPDATE_CURRENT_USER_OBJ,
    UPDATE_SPOTIFY_TOKENS,
} from "../constants/actionConstants";

export const updateAccessToken = (accessToken, refreshToken, dispatch) => {
    dispatch({
        type: UPDATE_SPOTIFY_TOKENS,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}

export const updateAuthCode = (authCode, dispatch) => {
    dispatch({
        type: UPDATE_AUTH_CODE,
        authCode: authCode
    });
}

export const updateIsLoggedIn = (isLoggedIn, dispatch) => {
    dispatch({
        type: CHANGE_LOGIN_STATUS,
        isLoggedIn: isLoggedIn
    });
}

export const updateCurrentUserObj = (userObj, dispatch) => {
    dispatch({
        type: UPDATE_CURRENT_USER_OBJ,
        currentUserObject: userObj
    })

}


