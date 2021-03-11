import {JAVA_SERVER_URL} from "../../constants/spotifyAPIConstants";

export default class MCAuthServices {
    registerUsername(user, code, adminCode="") {
        return fetch(JAVA_SERVER_URL + "register?code=" + code, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'adminCode': adminCode
            }
        }).then(resp => resp.json());
    }

    verifyUsername(userId, username) {
        return fetch(JAVA_SERVER_URL + "login/" + userId + "/" + username, {
            method: 'GET',
        }).then(resp => resp.json());
    }
}
