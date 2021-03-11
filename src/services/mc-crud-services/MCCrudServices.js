import {JAVA_SERVER_URL} from "../../constants/spotifyAPIConstants";

export default class MCCrudServices {
    addPost(authorId, accessToken, post) {
        console.log("add called")
        return fetch(JAVA_SERVER_URL + 'posts/' + authorId + '?access_token=' + accessToken, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json());
    }

    getAllPosts() {
        return fetch(JAVA_SERVER_URL + 'posts').then(resp => resp.json());
    }

    getUserById(uid) {
        return fetch(JAVA_SERVER_URL + 'user?uid=' + uid).then(user => user.json())
    }



    deletePostByPostId = (pid, access_token) =>
        fetch(JAVA_SERVER_URL + 'delete_post' + '/' + pid + "?access_token="
            +access_token, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())

    updatePostByPostId = (pid, access_token, post) =>
    fetch(JAVA_SERVER_URL + 'update_post' + '/' + pid + "?access_token="
+access_token, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
            'content-type': "application/json"
        }
}).then(response => response.json())

    searchPosts = (keywords) =>
    fetch(JAVA_SERVER_URL + 'search_posts?keywords=' + keywords).then(resp => resp.json());

    updateUser(user, access_token) {
        return fetch(JAVA_SERVER_URL + 'edit_user_profile?access_token=' + access_token, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': "application/json"
            }
        }).then(resp => resp.json())
    }

    //findPostByUserId

}
