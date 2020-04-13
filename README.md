This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

First copy the `.env_example` to an `.env` file. You can also simply rename `.env_example` to `.env`. The reason for this step is that we want to keep some of our environment variables secret.

You need to place a [Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) in the `.env` as well as your github username.

After the environment has been setup you can now run:
```bash
yarn install
yarn start
```
And we're all set!

## Github repository overview
The web app is supposed to serve as an overview for all the repositories that have you listed as a contributer. The solution is practical for people working in a couple of different repositories and want to keep an eye on the activities and events for each repo.

### Tasks
- [X] Get familiar with Github api (1)
- [X] Setup tools and dev environment (0.5)
- [X] Design layout (0.5)
- [X] Fetch repos (1)
- [X] Fetch events (1)

## Future
The original idea was to enable browser notifications that would send notifications to the user whenever there is a new repository event. I  haven't estimated how long that would take but I have made a process map to illustrate how we could go about to implement it.

- Client registers a service worker
- Client creates a push notification subscription
- Client asks service worker to send subscription to push server (different for different browsers)
- Push server exposes GET /subid
- Create a webhook on github
- make a GET request to push server whenever webhook is triggered


