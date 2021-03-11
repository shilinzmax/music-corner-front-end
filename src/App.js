import React from 'react';
//import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free'
import './App.css';
import HomePage from "./containers/HomePage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {combineReducers, createStore, compose} from "redux";
import authReducer from "./reducers/authReducer";
import {loginFeedsReducer} from "./reducers/loginFeedsReducer";
import {anonyFeedsReducer} from "./reducers/anonyFeedsReducer";
import {mcAuthReducer} from "./reducers/mcAuthReducer";

const rootReducer = combineReducers({spotifyAuth: authReducer, mcAuthUser: mcAuthReducer, loginFeedsReducer: loginFeedsReducer, anonyFeedsReducer})

const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          spotifyAuth: {
              authCode: null,
              accessToken: null,
              refreshToken: null,
              currentUserObject: null,
              isLoggedIn: false
          },
          mcAuthUser: {
              id: null,
              username: null,
              first_name: null,
              last_name: null,
              is_admin: null,
              posts: null,
              followers: null,
              followees: null
          }
      }
    }

    /*componentDidMount() {
      if(localStorage.getItem(''))
    }*/

    render() {
        return (
            <Provider store={createStore(rootReducer, {spotifyAuth: this.state.spotifyAuth}, enhancers)}>
                <Router>
                    <Route path='/' children={<HomePage/>}/>
                </Router>
            </Provider>
        );
    }
}
