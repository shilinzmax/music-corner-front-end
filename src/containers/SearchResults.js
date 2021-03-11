import React from "react";
import SpotifyAPIService from "../services/spotify-api-services/SpotifyAPIService";
import SearchResultsRow from "./SearchResultsRow";
import {connect} from 'react-redux';

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: null,
            searchText: '',
            isLoadingResults: false
        }
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
    }

    // Check for errors from network!
    updateSearchResults() {
        if(this.state.searchText === '')
            return;
        new SpotifyAPIService().getSearchResults(this.state.searchText, this.props.accessToken).then(resp => {

            if(resp.waitTime !== undefined && resp.waitTime !== null) {
                window.setTimeout(() => this.setState({isLoadingResults: false}), parseInt(resp.waitTime))
                this.setState({
                    isLoadingResults: true
                })
            } else {
                this.setState({
                    tracks: resp.tracks.items,
                })
            }
        })
    }

    renderSearchResults() {
        if (this.state.isLoadingResults) {
            return <b>Please Wait, results loading</b>
        } else {
           return  <table className='table'>
                <thead>
                <tr>
                    <td>
                        <b>Song</b>
                    </td>
                    <td>
                        <b>Artists</b>
                    </td>
                    <td>
                        <b>Album</b>
                    </td>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.tracks.map(track => <SearchResultsRow track={track} key={track.id}/>)
                }
                </tbody>
            </table>
        }
    }

    render() {

        return (
            <div>
                <label htmlFor='search'>Type Song name to search:</label>
                <input id='search' placeholder='Song Name' onChange={(evt) => {
                    this.setState({
                        searchText: evt.target.value
                    })
                }} onKeyPress={(evt) => {
                    if (evt.key === 'Enter')
                        this.updateSearchResults()
                }}/>
                <button className='btn btn-dark' onClick={() => {
                    this.updateSearchResults()
                }}>Search</button>
                {this.state.tracks !== null &&
                this.renderSearchResults()}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    accessToken: state.spotifyAuth.accessToken
})

export default connect(mapStateToProps)(SearchResults);
