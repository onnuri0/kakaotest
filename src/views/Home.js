import React, { Component } from 'react';
import axios from 'axios';
import { sessionService } from 'redux-react-session';

const API_HOST= 'https://kauth.kakao.com';
const CLIENT_ID= '?';
const REDIRECT_URI= 'http%3a%2f%2flocalhost%3a3000%2foauth';


class Home extends Component {
  state = {   
    // url : API_HOST+"/oauth/authorize?client_id=914060f33c670c72ce7c061ed432ef39&redirect_uri=http%3a%2f%2flocalhost%3a3000%2foauth&response_type=code&scope=talk_message",
    url: `${API_HOST}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_message,story_publish`
  }

  componentDidMount() {
    const sessionData = {
      client_id: 'client_id'
    }  
    sessionService.saveSession({
      sessionData
    }).then((res) => {
      console.log("저장");
    });
    
  }
  logIn = () => {

    const uri = "/oauth/authorize?client_id=914060f33c670c72ce7c061ed432ef39&redirect_uri=http%3a%2f%2flocalhost%3a3000%2foauth&response_type=code";
    return  axios.get(API_HOST+uri, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Content-Type': 'application/json; charset=UTF-8'
  }})
      .then(res=> {
          console.log(res);
      })
      .catch(err => {
           console.error("[error is] ", err);
          return err;
      });
  }

  render() {
    return (
      <div>
        kakao test home
        <input type="button" value="login" onClick={this.logIn}/>
        <a href={this.state.url}>kakao Login</a>
      </div>
    );
  }
}

export default Home; 
