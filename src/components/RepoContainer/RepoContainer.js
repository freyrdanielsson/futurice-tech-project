import React, { useState } from 'react';

import { delWebhook, postWebhook } from '../../api'

import RepoEvents from '../RepoEvents/RepoEvents';

import './RepoContainer.scss';

const pushServerUrl = process.env.REACT_APP_GITHUB_PUSH_SERVER_URL;


function RepoContainer(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const { repo, pushServerSubscriptionId } = props;


    async function handleSubscription(e) {
        const data = {
            name: 'web',
            active: true,
            config: {
                url: `${pushServerUrl}/${pushServerSubscriptionId}`,
                content_type: 'json',
                insecure_ssl: '0'
            },
            events: ['*']
        }

        setLoading(true);
        setError(null);
        try {
            await postWebhook(data, repo.name, repo.owner.login);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }


    async function handleUnubscription(e) {
        setLoading(true);
        setError(null);
        try {
            await delWebhook(repo.name, repo.owner.login);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='repo'>
            <div className='repo__content'>
                <div className='repo__header'>
                    <h3>{repo.name}</h3>
                    <p>{repo.owner.login}</p>
                    {loading
                        ? <div>1 sec!</div>
                        : <div className='repo__notifications'>
                            <button className='repo__button' onClick={handleSubscription}><span role='img' aria-label=''>Turn on notifications</span></button>
                            <button className='repo__button' onClick={handleUnubscription}><span role='img' aria-label=''>Turn off notifications</span></button>
                        </div>
                    }
                    {error &&
                        <div><p>{error}</p></div>}
                </div>
                <RepoEvents full_name={repo.full_name} />
            </div>
        </div>
    );
}

export default RepoContainer;
