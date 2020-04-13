import React from 'react';

import RepoEvents from '../RepoEvents/RepoEvents';

import './RepoContainer.scss';

function RepoContainer(props) {
    const { repo } = props;

    return (
        <div className='repo'>
            <div className='repo__content'>
                <div className='repo__header'>
                    <h3>{repo.name}</h3>
                    <p>{repo.owner.login}</p>
                </div>
                <RepoEvents full_name={repo.full_name}/>
            </div>


        </div>
    );
}

export default RepoContainer;
