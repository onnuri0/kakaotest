import React, { Component } from 'react';
import axios from 'axios';

import { sessionService } from 'redux-react-session';

import { Card, CardBody, Button } from 'reactstrap';
import Collapse from 'react-css-collapse';

const APT_HOST = 'https://kauth.kakao.com';
const API_KAPI = "https://kapi.kakao.com";

class Oauth extends Component {
  
  state = {
    grant_type: 'authorization_code',
    client_id: '914060f33c670c72ce7c061ed432ef39',
    redirect_uri: 'http%3a%2f%2flocalhost%3a3000%2foauth',
    code: '',
    access_token: '',
    refresh_token: '',

    age_range: '',
    nickname: '',
    imgurl: '',

    loginYn: false,
    chkyn: true
  }

  componentDidMount() {
    
    const codeArr = window.location.search.substr(1).split("=");
    const codeStr = codeArr[1];
    const url = APT_HOST + '/oauth/token';
    const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+codeStr;
    
    this.setState({
      code: codeStr
    })

    sessionService.loadSession()
    .then(token => {
      console.log('token',token);
      if(token.tokken == null && token.tokken == undefined){
        return axios.post(url, param, {headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res=> {
            console.log('componentDidMount res>>', res);
            this.setState({
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token
            });
    
            const tokken = {
              access_tokken: res.data.access_token,
              refresh_token: res.data.refresh_token
            }
           
            // sessionService.saveSession(tokkenData);
            sessionService.saveSession({
              tokken
            }).then((res) => {
              console.log("저장");
            });
            console.log('type2>>>>>>>>>>>>>>',this.state2);
            this.getInfo();
        })
        .catch(err => {
            console.error("[error is] ", err);
        });
        

      }else{
        
        this.setState({
          access_token: token.tokken.access_tokken,
          refresh_token: token.tokken.refresh_token
        })  
        console.log('type1>>>>>>>>>>>>>>',this.state);
        this.getInfo();
        
      }
    });


    
  }

  getInfo = () =>{

    const url = API_KAPI+"/v2/user/me";
    const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+this.state.code;
    console.log('this.state.access_token!!',this.state.access_token);

    const param2 = {
      'grant_type':'authorization_code',
      'client_id':this.state.client_id,
      'redirect_uri':this.state.redirect_uri,
      'code':this.state.code,
    }
    return axios.post(url, param2, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': 'Bearer ' + this.state.access_token
    }})
    .then(res=> {
        console.log('getInfo res>>', res);
        this.setState({
          age_range: res.data.kakao_account.age_range,
          nickname: res.data.properties.nickname,
          imgurl: res.data.properties.thumbnail_image,
          loginYn: true
        })
        
    })
    .catch(err => {
        console.error("[error is] ", err);
    });
  }

  toggle = () => {
    this.setState({
      loginYn: !this.state.loginYn
    })

    console.log('result state', this.state.loginYn);
  }

  sendMe = () => {
    const url = API_KAPI+"/v2/api/talk/memo/send";
    const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+this.state.code;
    const template_object= {
      "object_type": "feed",
      "content": {
        "title": "디저트 사진",
        "description": "아메리카노, 빵, 케익",
        "image_url": "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        "image_width": 640,
        "image_height": 640,
        "link": {
          "web_url": "http://www.daum.net",
          "mobile_web_url": "http://m.daum.net",
          "android_execution_params": "contentId=100",
          "ios_execution_params": "contentId=100"
        }
      },
      "social": {
        "like_count": 100,
        "comment_count": 200,
        "shared_count": 300,
        "view_count": 400,
        "subscriber_count": 500
      },
      "buttons": [
        {
          "title": "웹으로 이동",
          "link": {
            "web_url": "http://www.daum.net",
            "mobile_web_url": "http://m.daum.net"
          }
        },
        {
          "title": "앱으로 이동",
          "link": {
            "android_execution_params": "contentId=100",
            "ios_execution_params": "contentId=100"
          }
        }
      ]
    }

    const param2 = {
      'grant_type':'authorization_code',
      'client_id':this.state.client_id,
      'redirect_uri':this.state.redirect_uri,
      'code':this.state.code,
      // 'template_object':template_object
      'template_id': '892',
      'templates_arg': template_object
      // '%7B%0A%20%20%22object_type%22%3A%20%22feed%22%2C%0A%20%20%22content%22%3A%20%7B%0A%20%20%20%20%22title%22%3A%20%22%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%A7%81%ED%81%AC%204.0%22%2C%0A%20%20%20%20%22description%22%3A%20%22%EB%94%94%ED%8F%B4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20FEED%22%2C%0A%20%20%20%20%22image_url%22%3A%20%22http%3A%2F%2Fk.kakaocdn.net%2Fdn%2FRY8ZN%2FbtqgOGzITp3%2FuCM1x2xu7GNfr7NS9QvEs0%2Fkakaolink40_original.png%22%2C%0A%20%20%20%20%22link%22%3A%20%7B%0A%20%20%20%20%20%20%22web_url%22%3A%20%22https%3A%2F%2Fdevelopers.kakao.com%22%2C%0A%20%20%20%20%20%20%22mobile_web_url%22%3A%20%22https%3A%2F%2Fdevelopers.kakao.com%22%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22social%22%3A%20%7B%0A%20%20%20%20%22like_count%22%3A%20100%2C%0A%20%20%20%20%22comment_count%22%3A%20200%0A%20%20%7D%2C%0A%20%20%22button_title%22%3A%20%22%EB%B0%94%EB%A1%9C%20%ED%99%95%EC%9D%B8%22%0A%7D'
    }
    console.log('param2>>',param2);
    console.log('this.state.access_token>>',this.state.access_token);
    return axios.post(url, param2, {headers: {
      'Authorization': 'Bearer ' + this.state.access_token,
      'Content-Type': 'application/json; charset=UTF-8',
    }})
    .then(res=> {
        console.log('getInfo res>>', res);
        // this.setState({
        //   age_range: res.data.kakao_account.age_range,
        //   nickname: res.data.properties.nickname,
        //   imgurl: res.data.properties.thumbnail_image,
        //   loginYn: true
        // })
        
    })
    .catch(err => {
        console.error("[error is] ", err);
    });
  }

  getStory = () => {
    const url = API_KAPI+"/v1/api/story/profile";
    const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+this.state.code;
   

    const param2 = {
      'grant_type':'authorization_code',
      'client_id':this.state.client_id,
      'redirect_uri':this.state.redirect_uri,
      'code':this.state.code,
    }
    console.log('param2>>',param2);
    console.log('this.state.access_token>>',this.state.access_token);
    return axios.get(url, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': 'Bearer ' + this.state.access_token
    }})
    .then(res=> {
        console.log('getInfo res>>', res);
        // this.setState({
        //   age_range: res.data.kakao_account.age_range,
        //   nickname: res.data.properties.nickname,
        //   imgurl: res.data.properties.thumbnail_image,
        //   loginYn: true
        // })
        
    })
    .catch(err => {
        console.error("[error is] ", err);
    });
  }

  render() {
    return (
      <div>
        kakao test oauth

        <Collapse isOpen={this.state.loginYn}>
          <Card>
            <CardBody style={{height:'213px', overflow:'scroll'}}>
            이름 : {this.state.nickname} <br/>
            섬네일 : <img src={this.state.imgurl}/> <br/>
             연령 : {this.state.age_range}
            </CardBody>
          </Card>
        </Collapse>                 

        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Button color="primary" onClick={this.sendMe} style={{ marginBottom: '1rem' }}>send me</Button>
        <Button color="primary" onClick={this.getStory} style={{ marginBottom: '1rem' }}>getStory</Button>

      </div>
    );
  }
}

export default Oauth;
