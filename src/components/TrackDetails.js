import React from "react";
import SpotifyAPIService from "../services/spotify-api-services/SpotifyAPIService";
import {withRouter} from 'react-router-dom'
import TrackDetailsRow from "./TrackDetailsRow";

class TrackDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            track: null,
            hasLoaded: false
        }
    }

    componentDidMount() {
        new SpotifyAPIService().getTrack(this.props.match.params.id, this.props.accessToken).then(resp =>
        {this.setState({
            track: resp,
            hasLoaded: true
        })});
    }

    renderArtists(artists) {
        let artistsString = '';
        for(let i = 0; i < artists.length; i++) {
            artistsString += artists[i];
            if (i !== artists.length -1) {
                artistsString += ', ';
            }
        }
        return artistsString;
    }

    render() {
        if (!this.state.hasLoaded)
            return null;
        return (
            <div className='container'>
                <TrackDetailsRow title='Name' detail={this.state.track.name}/>
                <TrackDetailsRow title='Album' detail={this.state.track.album.name}/>
                <TrackDetailsRow title='Artists' detail={this.renderArtists(this.state.track.album.artists)}/>
                <TrackDetailsRow title='Duration (ms)' detail={this.state.track.duration_ms}/>
                <TrackDetailsRow title='Popularity' detail={this.state.track.popularity + '/100'}/>
            </div>
        )
    }
}

export default withRouter(TrackDetails)