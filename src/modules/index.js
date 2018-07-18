import { combineReducers } from 'redux';
import penderMiddleWare from 'redux-pender';
import { sessionReducer } from 'redux-react-session';

import freeboard from './freeboard/freeboard';

const reducers ={
    freeboard,
    pender : penderMiddleWare,
    session: sessionReducer
};

const reducer = combineReducers(reducers);
 
export default reducer;