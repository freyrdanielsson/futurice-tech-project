This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

First copy the `.env_example` to an `.env` file. You can also simply rename `.env_example` to `.env`. The reason for this step is that we want to keep some of our environment variables secret.

You need to place a [Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) in the `.env` as well as your github username.

After the environment has been setup you can now run:
```bash
yarn install
yarn start
```
Notice the `REACT_APP_GITHUB_PUSH_SERVER_URL=https://push-server-git.herokuapp.com` in the `.env_example`. It is a hosted push server that I made for this project using node and express. The code can be found [here](https://github.com/freyrdanielsson/push-server-git). So for the setup of this project, you won't need to think much about it, it's already hosted!

And we're all set!

## Github repository overview
The web app is supposed to serve as an overview for all the repositories that have you listed as a contributer. The solution is practical for people working in a couple of different repositories and want to keep an eye on the activities and events for each repo. I also added a notification feature, so the UI can serve as a web push notification manager for github repositories.

## Tools and Architecture
The project uses the ReactJs library and was bootstraped with creat-react-app
### Stylesheets
- Written in scss (Syntactically Awesome Style Sheets)
- Uses variables placed in `config.scss` for consistency

### Hooks
- For state management and async api calls, all I needed was the React hooks.

### App.js
- Uses a hook to register a service worker and make push notification subscription

### RepoContainer.js
- Get's subscription id passed from `App.js` and can use it to post webhooks on git repositories (only the ones you own for now)

### RepoEvents.js
- Gets all the events for the repo and shows them it the container.
- A similar component can be made to show repository commits, the `RepoContainer.js` would then just toggle between the two components.



## Future
Originally the project was supposed to be a simple repository overview listing events from each repository. Then I added a feature for handling push notification subscriptions, which makes the project more practical for the use cases I had imagined.

Additional features that would add value to the project would be:
- Being able to subscribe to repositories you do not own.
- Toggle between events and commits view for each repo.
- Manage repositories view (hide/show repos)
- Add a 5 min delay for notifications because the events wont show up in github api response until after 5 min,
- Make it mobile friendly, splash screen and touch icon ready for iphone (my iphone...)


