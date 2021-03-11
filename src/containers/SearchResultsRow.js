import React from "react";
import {Link} from "react-router-dom";

export default class SearchResultsRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={'/trackdetails/' + this.props.track.id}>{this.props.track.name}</Link>
                </td>
                <td>
                    {
                        this.props.track.artists.map(artist => <span key={artist.id}>{artist.name + '\n'}</span>)
                    }
                </td>
                <td>
                    {this.props.track.album.name}
                </td>
            </tr>
        )
    }
}