import React from 'react';

import './RepoEventCard.scss';

function RepoEventCard(props) {

    const { event } = props;
    console.log(event);
    


    return (
        <div className="event">
            <div className='event__header'>

            </div>
            <div className='event__details'>
                
            </div>
        </div>
    );
}

export default RepoEventCard;
