import {SPOTIFY_WEB_API_URL} from "../../constants/spotifyAPIConstants";

export default class SpotifyAPIService {
    getSearchResults(keyword, authToken) {
        keyword = encodeURIComponent(keyword);
        return fetch(SPOTIFY_WEB_API_URL + '/v1/search?q=' + keyword + '&type=track', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            if(resp.headers.get('Retry-After') === undefined || resp.headers.get('Retry-After') === null) {
                return resp.json()
            } else {
                return {waitTime: resp.headers.get('Retry-After')}
            }
        });
    }

    getTrack(id, authToken) {
        return fetch(SPOTIFY_WEB_API_URL + '/v1/tracks/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        }).then(resp => resp.json())
    }
}