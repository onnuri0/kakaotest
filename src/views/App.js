import React, { Component } from 'react';
import { Button, CardBody, Card } from 'reactstrap';
import Collapse from 'react-css-collapse';
import './obj_style.css';


import Kakao from 'kakao';
class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };

  }

  componentDidMount() {
    Kakao.init('javascript key');
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  login = () =>{
    alert('11');
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
          // 로그인 성공시, API를 호출합니다.
          Kakao.API.request({
          url: '/v1/user/me',
          success: function(res) {
              alert(JSON.stringify(res));
          },
          fail: function(error) {
              alert(JSON.stringify(error));
          }
          });
      },
      fail: function(err) {
          alert(JSON.stringify(err));
      }
  });
  }
  

  navi = () =>{
      Kakao.Navi.start({
          name: "현대백화점 판교점",
          x: 127.11205203011632,
          y: 37.39279717586919,
          coordType: 'wgs84'
      });
  }

  render() {
    return (
      <div>
        kakao test
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident. <br/>

              <a id="kakao-login-btn" onClick={this.login}>login</a>
              <a href="http://developers.kakao.com/logout"></a>

              <a id="navi" href="#" onClick={this.navi}>
                <img src="/assets/img/about/buttons/navi/kakaonavi_btn_medium.png"/>
                </a>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default App;
