import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import { sessionService } from 'redux-react-session';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import FreeBoard from '../../views/Extra/FreeBoard/FreeBoardView';
import FrontEnd from "../../views/DevCenter/FrontEnd/FrontEnd";
import BackEnd from "../../views/DevCenter/BackEnd/BackEnd";
import Usage from "../../views/DevCenter/Usage/Usage";
import Friday from "../../views/Need/Friday/Friday";
import Staff from "../../views/Need/Staff/Staff";
import Coffee from "../../views/Need/Coffee/Coffee";
import Login from "../../views/Login";


import ScheduledMeeting from "../../views/Need/Coffee/ScheduledMeeting/ScheduledMeeting";
import WeeklyMeeting from "../../views/Need/Coffee/WeeklyMeeting/WeeklyMeeting";
import MeetingHistory from "../../views/Need/Coffee/MeetingHistory/MeetingHistory";
import Notice from "../../views/Need/Coffee/Notice/Notice";
import CfShopSetting from '../../views/Need/Coffee/Setting/CfShopSetting';
import MyMenu from '../../views/Need/Coffee/MyMenu/MyMenu';
import YmdrModal from "containers/YmdrModal/YmdrModal";
import OauthRedirect from '../../views/OauthRedirect';
import Order from '../../views/Need/Coffee/Order/Order';

import ScheduledLunch from "../../views/Need/Friday/ScheduledLunch/ScheduledLunch";
import LunchAttend from "../../views/Need/Friday/LunchAttend/LunchAttend";
import BatchRegistration from "../../views/Need/Friday/BatchRegistration/BatchRegistration";
import LunchHistory from "../../views/Need/Friday/LunchHistory/LunchHistory";
import FridayNotice from "../../views/Need/Friday/FridayNotice/FridayNotice";

import '../../views/obj_style.css';

class Full extends Component {

  state= {
    isLogin : false,
    userId: '',
    userNm: ''
  }

  componentDidMount() {
      this.checkSession();
  }

  componentWillReceiveProps() {
    this.checkSession();
  }

    /**
     * 세션 체크
     */
  checkSession = () => {
      sessionService.loadSession()
      .then(currentSession  => {
        console.log("[success] ", currentSession );
          this.setState({
              isLogin: true,
              userId: currentSession .user.userId,
              userNm: currentSession .user.userNm
          })
      })
      .catch(err => {
        console.error("[error] ", err);
          document.body.classList.toggle('sidebar-hidden');
          //document.body.classList('aside-menu-hidden');
          let url = this.props.history.location.pathname;
          console.log("체크.", url);
          this.setState({isLogin: false});
          if(url.indexOf("/login")===-1){
              alert("세션아웃 되었습니다.");
              sessionService.deleteSession()
                  .then(()=>{
                      document.body.classList.toggle('sidebar-hidden');
                      document.body.classList.toggle('aside-menu-hidden');
                      this.setState({
                          isLogin: false
                      })
                      this.props.history.push("/login");
                  });
          }
      });
  }

  /**
   * 로그아웃
   */
  logOut = () => {
    let check = confirm("로그아웃하시겠습니까?");
    if(check){
        sessionService.deleteSession()
            .then(()=>{
                document.body.classList.remove('sidebar-hidden');
                document.body.classList.remove('aside-menu-hidden');
                this.props.history.push("/login");
            });
    }
  }


  render() {
    return (
      <div className="app">


          {this.state.isLogin?<Header />:null}
        <div className="app-body">
            {this.state.isLogin?<Sidebar {...this.props}/>:null}
          <main className="main">
              {this.state.isLogin?<Breadcrumb />:null}
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <Route path="/login" name="Login" component={Login}/>
                  <Route path="/oauth_redirect" name="outh_redirect" component={OauthRedirect}/>
                  {/* <Route path="/need/Coffee" name="Coffee" component={Coffee}/> */}
                  <Route path="/need/Coffee/ScheduledMeeting" name="ScheduledMeeting" component={ScheduledMeeting}/>
                  <Route path="/need/Coffee/WeeklyMeeting/:cpDate?/:cpId?/:cpLocation?" name="WeeklyMeeting" component={WeeklyMeeting}/>
                  <Route path="/need/Coffee/MeetingHistory/:cpDate?/:cpId?" name="MeetingHistory" component={MeetingHistory}/>
                  <Route path="/need/Coffee/Notice" name="Notice" component={Notice}/>

                  <Route path="/need/coffee/shop_setting" name="coffee shop setting" component={CfShopSetting}/>
                  <Route path="/need/Coffee/MyMenu" name="MyMenu" component={MyMenu}/>
                  <Route path="/need/Coffee/Order" name="Order" component={Order}/>

                  {/*<Route path="/need/friday" name="Friday" component={Friday}/> */}
                  <Route path="/need/Friday/ScheduledLunch" name="ScheduledLunch" component={ScheduledLunch}/>
                  <Route path="/need/Friday/LunchAttend/:fnDate?/:fnId?/:fnLocation?" name="LunchAttend" component={LunchAttend}/>
                  <Route path="/need/Friday/BatchRegistration/:fnDate?/:fnId?/:fnLocation?" name="BatchRegistration" component={BatchRegistration}/>
                  <Route path="/need/Friday/LunchHistory/:fnDate?/:fnId?" name="LunchHistory" component={LunchHistory}/>
                  <Route path="/need/Friday/FridayNotice" name="FridayNotice" component={FridayNotice}/>

                  <Route path="/need/staff" name="Staff" component={Staff}/>
                  <Route path="/devcenter/frontend" name="FrontEnd" component={FrontEnd}/>
                  <Route path="/devcenter/usage" name="Usage" component={Usage}/>
                  <Route path="/devcenter/backend" name="BackEnd" component={BackEnd}/>
                  <Route path="/extra/freeboard" name="Freeboard" component={FreeBoard}/>
                <Redirect from="/" to="/login"/>
              </Switch>
            </Container>
          </main>
            {this.state.isLogin?<Aside user={this.state} onClickLogout={this.logOut}/>:null}
        </div>
          {this.state.isLogin?<Footer />:null}
      </div>
    );
  }
}

export default Full;
