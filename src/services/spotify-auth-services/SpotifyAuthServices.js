import {
    AUTH_REDIRECT_URI,
    CLIENT_ID,
    JAVA_SERVER_URL,
    SPOTIFY_ACCOUNT_URL,
    SPOTIFY_WEB_API_URL
} from "../../constants/spotifyAPIConstants";

export default class SpotifyAuthServices {

    //NOTE: this is only for demonstration purposes. Put the client secret on the server
    getTokens(code) {
        /*const clientSecret = "d08df511bc6749b0b374749fb4c25321";
        const encodedString = window.btoa(CLIENT_ID + ':' + clientSecret);
        fetch(SPOTIFY_ACCOUNT_URL + '/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedString
            },
            body: "grant_type=authorization_code&code=" + code + "&redirect_uri=" + encodeURIComponent(AUTH_REDIRECT_URI)
        }).then(resp => resp.json());*/
        return fetch(JAVA_SERVER_URL + 'authaccess?code=' + code, {
            method: 'POST'
        }).then(resp => resp.json())
    }

    getCurrentUserProfile(token) {
        return fetch(SPOTIFY_WEB_API_URL + '/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => resp.json())
    }
}