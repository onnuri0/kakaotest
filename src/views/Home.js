import React, { Component } from 'react';
import axios from 'axios';

const APT_HOST = 'https://kauth.kakao.com';


class Home extends Component {
  state = {   
    url : APT_HOST+"/oauth/authorize?client_id=914060f33c670c72ce7c061ed432ef39&redirect_uri=http%3a%2f%2flocalhost%3a3000%2foauth&response_type=code"
  }
  logIn = () => {
    const uri = "/oauth/authorize?client_id=914060f33c670c72ce7c061ed432ef39&redirect_uri=http%3a%2f%2flocalhost%3a3000%2foauth&response_type=code";
    return  axios.get(APT_HOST+uri, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Content-Type': 'application/json; charset=UTF-8'
  }})
      .then(res=> {
          // let status = res.status
          // if(status === 200){
          //     return res.data;
          // }
          const data = res.json();
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
