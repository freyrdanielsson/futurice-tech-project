import React from 'react';

import './RepoEventCard.scss';

function RepoEventCard(props) {

    const { id, type, actor, payload, created_at } = props.event;

    const time = created_at.slice(0, -1).split('T');

    return (
        <div id={id} className="event">
            <div className='event__header'>
                <p>{type}</p>
                <p>By: {actor.login}</p>
            </div>
            <div className='event__details'>
                <p>{`${payload.ref_type || ''} ${payload.ref || ''}`}</p>
                {payload.commits &&
                    <ul className='event__commit-list'>
                        {payload.commits.map((commit, i) => {
                            return (
                                <li key={i}>
                                    {commit.message}
                                </li>
                            );
                        })}
                    </ul>}

                {payload.pull_request &&
                    <div>
                        <p>{payload.pull_request.merged ? 'Merged -' : ''} {payload.action}</p>
                        <p>Head: {payload.pull_request.head.ref}</p>
                        <p>Base: {payload.pull_request.base.ref}</p>
                    </div>}
            </div>
            <div className='event__footer'>
                <p>Created at:</p>
                <span>{`${time[1]} ${time[0]}`}</span>
            </div>
        </div>
    );
}

export default RepoEventCard;
