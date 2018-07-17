import React, { Component } from 'react';
import axios from 'axios';

const APT_HOST = 'https://kauth.kakao.com';
class Oauth extends Component {
  
  state = {
    grant_type: 'authorization_code',
    client_id: '914060f33c670c72ce7c061ed432ef39',
    redirect_uri: 'http%3a%2f%2flocalhost%3a3000%2foauth',
    // redirect_uri: 'http%3A%2F%2Flocalhost%3A3000',
    code: ''
  }

  componentDidMount() {
    const codeArr = window.location.search.substr(1).split("=");
    const codeStr = codeArr[1];
    console.log(codeStr);
    this.setState=({
      code: codeStr
    })
    const url = APT_HOST+"/oauth/token";
    const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+codeStr;
    console.log('url',url);
    console.log('param',param);
    return axios.post(url, param, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
    .then(res=> {
        let status = res.status
        console.log("[status] ", status);
        //if(status === 204){
          console.log(res);
        //}
    })
    .catch(err => {
        console.error("[error is] ", err);
    });
}

  render() {
    return (
      <div>
        kakao test oauth
      </div>
    );
  }
}

export default Oauth;
