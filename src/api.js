
const baseurl = process.env.REACT_APP_GITHUB_API_URL;

async function get(path) {
    return request('GET', path);
}

async function request(method, path, data) {
    const url = new URL(path, baseurl);

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

    const json = await response.json();

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

export {
    getMyRepos,
    getRepoEvents,
}