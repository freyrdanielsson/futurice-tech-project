import React from 'react';

import useApi from '../../hooks/useApi';
import { getRepoEvents } from '../../api';

import RepoEventCard from '../RepoEventCard/RepoEventCard';

import './RepoEvents.scss';

function RepoEvents(props) {
    const { full_name } = props;

    const apiCall = getRepoEvents.bind(null, full_name);
    const { error, items, loading } = useApi(apiCall, []);

    return (
        <React.Fragment>
            {error && <div>Oh no error!</div>}
            {loading && <div>Loading events</div>}

            {items && <ul className='repo__events'>
                {items.map(event => {
                    return (
                        <li key={event.id}>
                            <RepoEventCard event={event} />
                        </li>
                    );
                })}
            </ul>}
        </React.Fragment>
    );
}

export default RepoEvents;
