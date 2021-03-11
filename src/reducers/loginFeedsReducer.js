import {GET_POSTS} from "../constants/actionConstants";

const initialState = {
    posts:[
        /*{
            "id": "1",
            "username": "max",
            "text": "hello max",
            "comments": [
                {"id": 1, "text":"good"},
                {"id": 2, "text":"nice"},
                {"id": 3, "text":"great"},
            ],
        },
        {"id": "2", "username": "akash", "text": "hello akash", "comments": []}*/
    ],
    // username: null,
    // text: null
}

export const loginFeedsReducer = (state = initialState, action) => {
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

