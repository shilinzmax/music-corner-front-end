import {GET_POSTS} from "../constants/actionConstants";

const initialState = {
    posts:[
        /*{"id": "1", "username": "mandy", "text": "hello mandy"},
        {"id": "2", "username": "bread", "text": "hello bread"}*/
    ],
    post: null
    // username: null,
    // text: null
}

export const anonyFeedsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.posts
            }


        default:
            return state
    }
}
