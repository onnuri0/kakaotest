import React, { Component } from 'react';
import axios from 'axios';
import { sessionService } from 'redux-react-session';



const API_HOST= 'https://kauth.kakao.com';
const CLIENT_ID= 'react key';
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


    // if (!document.getElementById('KakaoJSSDK')) {
    //   const scriptKakaoJS = document.createElement('script');
    //   scriptKakaoJS.id = 'KakaoJSSDK';
    //   scriptKakaoJS.src = '//developers.kakao.com/sdk/js/kakao.min.js';
    //   document.body.appendChild(scriptKakaoJS);

    //   console.log(document.getElementById('KakaoJSSDK'));


      // this.setinit();
    // }

    // Kakao.init('914060f33c670c72ce7c061ed432ef39');
    // // 카카오 로그인 버튼을 생성합니다.
    // Kakao.Auth.createLoginButton({
    //   container: '#kakao-login-btn',
    //   success: function(authObj) {
    //     alert(JSON.stringify(authObj));
    //   },
    //   fail: function(err) {
    //      alert(JSON.stringify(err));
    //   }
    // });
    
  }


  // setinit = () => {
  //   // 사용할 앱의 JavaScript 키를 설정해 주세요.
  //   Kakao.init('914060f33c670c72ce7c061ed432ef39');
  //   // 카카오 로그인 버튼을 생성합니다.
  //   Kakao.Auth.createLoginButton({
  //     container: '#kakao-login-btn',
  //     success: function(authObj) {
  //       alert(JSON.stringify(authObj));
  //     },
  //     fail: function(err) {
  //        alert(JSON.stringify(err));
  //     }
  //   });
  // }
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

        <a id="kakao-login-btn"></a>
        <a href="http://developers.kakao.com/logout"></a>
      </div>
    );
  }
}

export default Home; 
