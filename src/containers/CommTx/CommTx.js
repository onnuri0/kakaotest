
import axios from 'axios';
import DeviceStorage from 'react-device-storage';

const API_URL = "/api";
const storage = new DeviceStorage({
    cookieFallback: true
}).sessionStorage();

class CommTx {

    /**
     * GET 호출
     * @param url
     * @returns {Promise.<TResult>}
     * @constructor
     */
    static GET = (url) =>  {

        return  axios.get(API_URL+url, {headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + storage.read("accessToken")
        }})
            .then(res=> {
                let status = res.status
                if(status === 200){
                    return res.data;
                }
            })
            .catch(err => {
                 console.error("[error is] ", err);
                return err;
            });
    } // end GET

    /**
     * DELETE 호출
     * @param url
     * @param callfn
     * @returns {Promise.<TResult>}
     * @constructor
     */
    static DELETE = (url, callfn) => {

        return axios.delete(API_URL+url+"/", {headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + storage.read("accessToken")
        }})
            .then(res=> {
                let status = res.status
                // console.log("[status] ", status);
                if(status === 204){
                    return res.data;
                }
            })
            .catch(err => {
                console.error("[error is] ", err);
            });
    } // end DELETE

    /**
     * POST 호출
     * @param url
     * @param callfn
     * @returns {Promise.<TResult>}
     * @constructor
     */
    static POST = (url, param) => {

        return axios.post(API_URL+url, param, {headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + storage.read("accessToken")
        }})
            .then(res=> {
                let status = res.status
                console.log("[status] ", status);
                //if(status === 204){
                return res.data;
                //}
            })
            .catch(err => {
                console.error("[error is] ", err);
            });
    } // end POST

    /**
     * PATCH 호출
     * @param url
     * @param callfn
     * @returns {Promise.<TResult>}
     * @constructor
     */
    static PATCH = (url, param) => {

        return axios.patch(API_URL+url+"/", param, {headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + storage.read("accessToken")
        }})
            .then(res=> {
                let status = res.status
                console.log("[status] ", status);
                //if(status === 204){
                return res.data;
                //}
            })
            .catch(err => {
                console.error("[error is] ", err);
            });
    } // end PATCH


    static AUTH = (username, password) =>  {
        let loginData = 'grant_type=password&username=' + username + '&password=' + password;
        console.log("[loginData] ", loginData);
        return  axios.post(API_URL+"/oauth/token", loginData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic cmVzdG5mZWVsZGV2Y2VudGVyLWNsaWVudC13aXRoLXNlY3JldDpkZXZjZW50ZXI='
            }
        })
            .then(res=> {
                let status = res.status
                if(status === 200){
                    return res.data;
                }
            })
            .catch(err => {
                console.error("[error is] ", err);
                return err;
            });
    } // end GET


}



export default CommTx;
