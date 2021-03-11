import {
    CHANGE_LOGIN_STATUS, FIND_POST_BY_ID,
    UPDATE_AUTH_CODE,
    UPDATE_CURRENT_USER_OBJ,
    UPDATE_SPOTIFY_TOKENS
} from "../constants/actionConstants";

const authReducer = (state = {authCode: null, accessToken: null, refreshToken: null, currentUserObject: null, isLoggedIn: false}, action) => {
    switch(action.type) {
        case UPDATE_AUTH_CODE:
            return {
                ...state,
                authCode: action.authCode
            };
        case UPDATE_SPOTIFY_TOKENS:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };
        case CHANGE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        case UPDATE_CURRENT_USER_OBJ:
            return {
                ...state,
                currentUserObject: action.currentUserObject
            }



    }

    return state;
}



export default authReducer;
