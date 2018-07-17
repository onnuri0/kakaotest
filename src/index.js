import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,  Route, Switch} from 'react-router-dom';


import App from './views/App';
import Home from './views/Home'; 
import Oauth from './views/Oauth';
// import Full from './containers/Full/';

ReactDOM.render((
    // <Router history={BrowserRouter}>
    //     <Route path="/" component={App}>
    //         <IndexRoute component={Home}/>
    //         <Route path="oauth" component={Oauth}/>
    //     </Route>
    // </Router>,          
    // document.getElementById('root')

    <BrowserRouter> 
        <Switch>
            <Route path="/home" name="Home" component={Home}/>
            <Route path="/oauth" name="Oauth" component={Oauth}/>
            <Route path="/" name="Home" component={App}/>
        </Switch>
      </BrowserRouter>  
), document.getElementById('root')
);