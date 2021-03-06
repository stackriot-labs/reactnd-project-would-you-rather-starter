# Intro

This is my solution for the *Would Your Rather* project for [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).
It is based on the [project starter code](https://github.com/udacity/reactnd-project-would-you-rather-starter), which begins 
with nothing but a JS file with the app's initial state. It is meant to be an example site that provides a basic demonstration
of [React](https://reactjs.org) and [Redux](http://redux.js.org/). 

You will notice various quirks, such as how all the authentication is on the frontend, and the application state is always 
reset when you reload the page or directly visit a URL from the browser, as opposed to navigating through the site via the links.
This is all due to how the Redux store is not persistent, as that requirement was not in the scope for this project. I might
come back and revamp this project in the future, however.

# Usage
When at the login screen, choose a user from the dropdown and click the Login button. You will then see the Dashboard as
that user. You can view other users questions that you've answered or not yet answered by clicking the tabs. For answered,
questions, you will be shown the overall results among users. For unanswered questions, you will be shown a form to submit
your answer. The questions are all in the form of "Would you rather..." (e.g. "learn Swift or learn Javascript?").

You can also view the Leaderboards which just update as you answer and create questions. You can also logout.

Again, note that since the Redux store data does not persist, everything will be reset to the initial data if you reload or 
type in a URL to visit.

# Deployment Instructions

Take note of the following available environment variables when building the container. You should only need to use
`GIT_REMOTE` when doing volume-based deployment for production. The other settings are optional:

* `GIT_REMOTE` - Set this to the URL of the git repo that the project is in for volume-based deployment. The presence
  of this value will trigger production deployment
* `GIT_DOMAIN` - The domain of the `GIT_REMOTE`, which is needed to allow SSH connections to the endpoint without
  prompting for user input. Default: `github.com`
* `PORT` - The port that the node server will run on. Default: `8003`
* `DEPLOY_USER` - The user in the container that will manage deployment. Default: `node`
* `DEPLOY_USER_HOME` - The `DEPLOY_USER`'s home directory. Default: `/home/$DEPLOY_USER`
* `SSHDIR` - The directory where the SSH key pair from the project `.ssh` directory is copied to before they are later
  copied to the `DEPLOY_USER`'s `.ssh`. Default: `/root/Downloads/ssh`
* `WORKDIR` - Where the project will be loaded. Default: `$DEPLOY_USER_HOME/would-you-rather` 

For Docker deployment, first build the image:

    docker build --tag=enderandpeter/would-you-rather .
    
Then either set a `GIT_REMOTE` for volume-based production deployment or omit this value for bind-mounted dev deployment:

## Volume-based

    docker run -p 8003:8003 -e PORT=8003 -v would-you-rather:/home/node/would-you-rather --name=would-you-rather -e GIT_REMOTE=git@github.com:enderandpeter/reactnd-project-would-you-rather-starter.git --restart=always -it enderandpeter/would-you-rather
    
## Bind-mounted
 
    docker run -p 8003:8003 -e PORT=8003 -v /path/to/would-you-rather:/home/node/would-you-rather --name=would-you-rather --restart=always -it enderandpeter/would-you-rather

Otherwise, you know the drill. Either run `npm install && npm start` or `yarn install && yarn start` if you're cool like me.

# Would You Rather Project

This is the starter code for the final assessment project for Udacity's React & Redux course.

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Contributing

This repository is the starter code for *all* Udacity students. Therefore, we most likely will not accept pull requests. For details, check out [CONTRIBUTING.md](https://github.com/udacity/reactnd-project-would-you-rather-starter/blob/master/CONTRIBUTING.md).

# create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
