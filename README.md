# ReactJS Engineer Development Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

# Available Scripts

This project fetch weather data from [Metaweather](https://www.metaweather.com/)

MetaWeather does not attach Access-Control-Allow-Origin: *.
A Proxy was created to prevent CORS issues when trying to access the API from a client.

### `yarn start:proxy`

Run the proxy server at port 4000.
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The client make API calls to the proxy server instead of to directly to Metawearther.

### `yarn test`

Launches the test runner in the interactive watch mode.
cover
### `yarn test --watchAll=false --coverage`

Run code coverage. I tried to cover as much as I can. It is 94%, there are some React Hooks that I couldn't test.
# Some decisions made in this program

- To deploying this app, we need a NodeJS host to run the proxy server. I could have find a CORS enabled service but I found that other services require API key which I rather not use.
- The office Redux documentation strongly recommend Redux toolkit so I follow it although Redux toolkit is new to me, I had to spend time to learn it. But Redux principles are the same.
- In my past projects, Redux related code usually put in separated folder but later we decided to move them same folder of React component. In this challenge, I decided to put all of them in the same folder.
- I am more confident with Enzyme instead of React testing library. But ever since React Hook came, Enzyme show limitation. There are some hooks that I couldn't find a way to test them some the test coverage is only 94%.

# Room for improvement
- I used AntD to speed up the progress. If it is not good enough, please feedback.
- This app is not good at handle error.

# Last word
Just want to say thank you for giving me this opportunity. I really enjoy taking this challenge so please feel free to contact me if you have any question regarding my code.