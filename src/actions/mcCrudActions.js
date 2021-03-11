import {GET_MC_USER, GET_POSTS} from "../constants/actionConstants";
import MCCrudServices from "../services/mc-crud-services/MCCrudServices";

export const getAllPosts = (dispatch) => {

    new MCCrudServices().getAllPosts().then(posts => {
        dispatch({
            type: GET_POSTS,
            posts: posts
        })
    })
}

export const getMCUser = (uid, dispatch) => {
    new MCCrudServices().getUserById(uid).then(user => {
        dispatch({
            type: GET_MC_USER,
            user: user
        })
    })
}
