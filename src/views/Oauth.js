import React, { Component } from 'react';
import axios from 'axios';

import { sessionService } from 'redux-react-session';

import { Card, CardBody, Button } from 'reactstrap';
import Collapse from 'react-css-collapse';

const API_HOST = 'https://kauth.kakao.com';
const API_KAPI = 'https://kapi.kakao.com';

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

    console.log('codeArr',codeArr);
    const codeStr = codeArr[1];
    console.log('codeStr',codeStr);
    // const url = API_HOST + '/oauth/token';
    // const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+codeStr;
    const url = `${API_HOST}/oauth/token`;
    const param = `grant_type=authorization_code&client_id=${this.state.client_id}&redirect_uri=${this.state.redirect_uri}&code=${codeStr}`;
    
    this.setState({
      code: codeStr
    })

    sessionService.loadSession()
    .then(token => {
      console.log('token',token);
      if(token.tokken === null || token.tokken === undefined){
        return axios.post(url, param, {headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res=> {
            this.setState({
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token
            });
    
            const tokken = {
              access_tokken: res.data.access_token,
              refresh_token: res.data.refresh_token
            }
           
            sessionService.saveSession({
              tokken
            }).then((res) => {
              console.log("저장");
            });
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
        this.getInfo();
        
      }
    });


    
  }

  getInfo = () =>{

    // const url = API_KAPI+"/v2/user/me";
    const url = `${API_KAPI}/v2/user/me`;
    const param = {
      'grant_type':'authorization_code',
      'client_id':this.state.client_id,
      'redirect_uri':this.state.redirect_uri,
      'code':this.state.code,
    }
    return axios.post(url, param, {headers: {
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
    const url = `${API_KAPI}/v2/api/talk/memo/send?template_id=11266`;
    const template_object= {
      "object_type": "feed",      
    }

    
    console.log('this.state.access_token>>',this.state.access_token);
    return axios.post(url, '', {headers: {
      'Authorization': 'Bearer ' + this.state.access_token,
      'Content-Type': 'application/json; charset=UTF-8',
    }})
    .then(res=> {
        console.log('getInfo res>>', res);
    })
    .catch(err => {
        console.error("[error is] ", err);        
    });
  }

  getStory = () => {
    const url = `${API_KAPI}/v1/api/story/profile`;
    
    const param2 = {
      'grant_type':'authorization_code',
      'client_id':this.state.client_id,
      'redirect_uri':this.state.redirect_uri,
      'code':this.state.code,
    }
    return axios.get(url, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': 'Bearer ' + this.state.access_token
    }})
    .then(res=> {
        console.log('getInfo res>>', res);
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
