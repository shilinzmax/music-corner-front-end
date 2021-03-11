import React from "react";

const TrackDetailsRow = ({title, detail}) => {
    return (
        <span>
            <div className='row'>
                <span className='col-3'><b>{title + '  '}</b></span>
                <span className='col-9'>{detail}</span>
            </div>
        </span>
    )
}

export default TrackDetailsRow;