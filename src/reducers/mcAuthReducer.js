import {GET_MC_USER} from "../constants/actionConstants";

const initialState = {
    id: null,
        username: null,
        first_name: null,
        last_name: null,
        is_admin: null,
        posts: null,
        followers: null,
        followees: null
}

export const mcAuthReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_MC_USER:
            return {
                ...state,
                id: action.user.id,
                username: action.user.username,
                first_name: action.user.first_name,
                last_name: action.user.last_name,
                is_admin: action.user.is_admin,
                posts: action.user.posts,
                followers: action.user.followers,
                followees: action.user.followees
            }
        default:
            return state;
    }
}
