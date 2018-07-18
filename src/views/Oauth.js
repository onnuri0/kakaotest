import React, { Component } from 'react';
import axios from 'axios';

import { sessionService } from 'redux-react-session';

import { Card, CardBody, Collapse, Button } from 'reactstrap';

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

    // return false;
    return axios.post(url, param, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
    .then(res=> {
        console.log('componentDidMount res>>', res);
        this.setState({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token
        });

        this.getInfo();
    })
    .catch(err => {
        console.error("[error is] ", err);
    });
  }

  getInfo = () =>{

    const tokkenData = {
      access_tokken: '123',
      refresh_token: '456'
    }

    console.log(tokkenData);

    sessionService.loadSession()
    .then(token => {
console.log(token);
    })
    
    sessionService.saveSession(tokkenData);
    // sessionService.saveSession({
    //   tokkenData
    // }).then((res) => {
    //   console.log("저장");
    // });

    const url = API_KAPI+"/v2/user/me";
    const param = "grant_type=authorization_code&client_id="+this.state.client_id+"&redirect_uri="+this.state.redirect_uri+"&code="+this.state.code;
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

  check = () => {
    console.log(this.state.loginYn);
  }
  render() {
    return (
      <div>
        kakao test oauth

        <Collapse isOpen={this.state.loginYn}>
          <Card>
            <CardBody style={{height:'413px', overflow:'scroll'}}>
              ttttttttttttttttt
            </CardBody>
          </Card>
        </Collapse>
        <Collapse isOpen={this.state.loginYn}>
          <p>dddddddd</p>
        </Collapse>
          

        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Button color="primary" onClick={this.check} style={{ marginBottom: '1rem' }}>check</Button>

        <Collapse isOpen={this.state.loginYn}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Oauth;


// ||{this.state.loginYn}||
//             이름 : {this.state.nickname} <br/>
//             섬네일 : <img src={this.state.imgurl}/> <br/>
//             연령 : {this.state.age_range}