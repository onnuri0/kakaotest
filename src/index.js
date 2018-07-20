import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,  Route, Switch} from 'react-router-dom';


import { createStore, applyMiddleware  } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './modules';
import penderMiddleware from 'redux-pender';
import { sessionService  } from 'redux-react-session';


import App from './views/App';
import Home from './views/Home'; 
import Oauth from './views/Oauth';
// import Full from './containers/Full/';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(logger, thunk, penderMiddleware()));

sessionService.initSessionService(store);

ReactDOM.render((
    <BrowserRouter> 
        <Switch>
            <Route path="/home" name="Home" component={Home}/>
            <Route path="/oauth" name="Oauth" component={Oauth}/>
            <Route path="/" name="Home" component={App}/>
        </Switch>
      </BrowserRouter>  
), document.getElementById('root')
);