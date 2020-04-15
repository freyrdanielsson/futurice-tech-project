
const baseUrl = process.env.REACT_APP_GITHUB_API_URL;
const pushServerUrl = process.env.REACT_APP_GITHUB_PUSH_SERVER_URL;

async function get(path) {
    return request('GET', path);
}

async function post(path, data) {
    return request('POST', path, data);
}

async function deleteMethod(path) {
    return request('DELETE', path);
}

async function request(method, path, data) {
    const url = new URL(path, baseUrl);

    const options = {
        method,
        headers: {},
    };

    if (data) {
        options.headers = { 'content-type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    // Hardcoded user for now.
    const user = process.env.REACT_APP_GITHUB_USER;
    const key = process.env.REACT_APP_GITHUB_API_KEY;
    const token = btoa(`${user}:${key}`);
    options.headers['Authorization'] = `Basic ${token}`;


    const response = await fetch(url.href, options);

    const json = method.toLowerCase() !== 'delete' ? await response.json() : null;

    const { status, ok } = response;

    return {
        data: json,
        ok,
        status,
    }
}

async function getMyRepos() {
    let result;

    try {
        result = await get('/user/repos?sort=pushed');
    } catch (e) {
        console.error('Error fetching current user repository', e);
        throw new Error(e)
    }

    // Incase of error unrelate to e.g connection
    if (result && !result.ok) {
        const { data: { error = 'Error fetching current user repository' } } = result;
        throw new Error(error);
    }

    return result.data;
}

async function gethooks(repo, owner) {
    let result;

    try {
        result = await get(`/repos/${owner}/${repo}/hooks`);
    } catch (e) {
        console.error('Unable to get hooks', e);
        console.error(e);
        throw new Error(e)
    }

    // Incase of error unrelate to e.g connection
    if (result && !result.ok) {
        const { data: { error = 'Error fetching hooks for repo' } } = result;
        throw new Error(error);
    }

    return result.data;
}

async function getRepoEvents(repo_fullname) {
    let result;

    try {
        result = await get(`/repos/${repo_fullname}/events`);
    } catch (e) {
        console.error('Error fetching current user repository', e);
        throw new Error(e)
    }

    // Incase of error unrelate to e.g connection
    if (result && !result.ok) {
        const { data: { error = 'Error fetching current user repository' } } = result;
        throw new Error(error);
    }

    return result.data;
}

async function postSubscription(subscription) {
    let result;

    try {
        result = await post(pushServerUrl, subscription);
    } catch (e) {
        console.error('Unable to post notification subscription', e);
        console.error(e);
        throw new Error(e)
    }

    // Incase of error unrelate to e.g connection
    if (result && !result.ok) {
        const { data: { error = 'Error fetching current user repository' } } = result;
        throw new Error(error);
    }

    return result.data;
}

async function postWebhook(data, repo, owner) {
    let result;

    try {
        result = await post(`/repos/${owner}/${repo}/hooks`, data);
    } catch (e) {
        console.error('Unable to post notification subscription', e);
        console.error(e);
        throw new Error(e)
    }

    // Incase of error unrelate to e.g connection
    if (result && !result.ok) {
        const { data: { error = result.status === 422 ? 'Already subscribed' : 'Github api key missing' } } = result;
        throw new Error(error);
    }

    return result.data;
}

async function delWebhook(repo, owner) {
    let result;

    try {
        const hooks = await gethooks(repo, owner);
        const pushHooks = hooks.filter(hook => hook.config.url.indexOf('push-server') > 0);

        // Todo delete all push
        result = await deleteMethod(`/repos/${owner}/${repo}/hooks/${pushHooks[0].id}`);
    } catch (e) {
        console.error('Error deleting webhook', e);
        throw new Error('Error deleting webhook');
    }

    if (result && !result.ok) {
        const { data: { error = 'Error deleting webhook' } } = result;
        throw new Error(error);
    }

    return result.data;
}

export {
    getMyRepos,
    getRepoEvents,
    delWebhook,
    postSubscription,
    postWebhook,
}