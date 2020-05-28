//index.js
//获取应用实例
const app = getApp()
import { API } from '../../api/index.js';

let indAPI = new API();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    checked:true,
    code: null
  },
  onLoad: function () {
    let checked=this.data.checked;
    if(!checked){
      Dialog.confirm({
        title: '请先阅读并同意《针无忧用户协议》',
        confirmButtonText: '知道了',
        cancelButtonColor: '#ACB7C4',
        showCancelButton:false
      })
    }else{
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    }
  },

  getUserInfo: function(e) {
    let vm = this;
    app.globalData.type = e.currentTarget.dataset.type;
    let checked = vm.data.checked;
    if(!checked){
      Dialog.confirm({
        title: '请先阅读并同意《针无忧用户协议》',
        confirmButtonText: '知道了',
        cancelButtonColor: '#ACB7C4',
        showCancelButton:false
      })
    }else{
      if(e.detail.errMsg == "getUserInfo:ok"){
        app.globalData.userInfo = e.detail.userInfo
        vm.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        wx.showToast({ title: '正在登录', icon: 'loading' });
        // 登录
        wx.login({
          success: res => {
            if(res.code){
              this.setData({
                code : res.code
              })
              vm.wxlogin('',e)
            }
          }
        })
      } else {
        wx.navigateTo({
          url:"../noAccess/noAccess"
        })
      }
    }
 
  },
  jump(){
   wx.navigateTo({
     url: '/pages/userAgreement/index',
   })
  },
  //更改状态
  onChange(){
     this.setData({
       checked:!this.data.checked
     })
     
  },
  //手机号获取
  getPhoneNumber : function(e){
    let vm = this;
    app.globalData.type = e.currentTarget.dataset.type;
    let checked=this.data.checked;
    if(!checked){
      Dialog.confirm({
        title: '请先阅读并同意《针无忧用户协议》',
        confirmButtonText: '知道了',
        cancelButtonColor: '#ACB7C4',
        showCancelButton:false
      })
    }else{
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        // 登录
        wx.login({
          success: res => {
            if(res.code){
              this.setData({
                code : res.code
              })
              wx.showToast({ title: '正在登录', icon: 'loading' ,duration: 15000});
              vm.wxlogin('doc',e)
            }
          }
        })
      } else {      
        wx.navigateTo({
          url:"../noAccess/noAccess"
        })
      }
    }
  },
  // wx登录成功之后的操作
  wxlogin(type,e){
    let vm = this;
    if(type == 'doc'){
      let params = {}
      params.code = vm.data.code;
      params.iv = e.detail.iv;
      params.encryptedData = e.detail.encryptedData;
      indAPI.doctorLogin(params).then(res => {
        if(res && res.token){
          wx.setStorageSync('loginToken', res.token);
          vm.scoketInit();
          wx.hideToast()
          wx.switchTab({
            url:"../home/home"
          })
        } else {
          wx.hideToast()
          wx.navigateTo({
            url:"../noAccess/noAccess"
          })
        }
      })
    } else {
      let params = {}
      params.code = vm.data.code;
      params.rawData = e.detail.rawData;
      indAPI.patientLogin(params).then( res => {
        if(res && res.token){
          wx.setStorageSync('loginToken', res.token);
          vm.scoketInit()
          wx.hideToast()
          wx.switchTab({
            url:"../home/home"
          })
        } else {
          wx.hideToast()
          wx.navigateTo({
            url:"../noAccess/noAccess"
          })
        }
      })
    }
  },
  //消息数
  msgNum(){
    let num=app.globalData.num;
      if (99 >= num && num!=0){
        wx.setTabBarBadge({
          index: 1,
          text: num+''
        })
      } else if (99<num){
        wx.setTabBarBadge({
          index: 1,
          text: '···'
        })
      } else if(num == 0) {
        wx.removeTabBarBadge({
          index: 1
        })
      }
  },
  // websc
  scoketInit(){
    //实时获取信息  
    wx.connectSocket({
      url: `wss://patient-manage.naxions.com/web/socket/server/${wx.getStorageSync('loginToken')}`,
      header:{
        'content-type': 'application/json'
      }
    })
    wx.onSocketMessage((res) => {
      if(res && res.data){
        app.globalData.num=res.data;
        this.msgNum()
      }
    })
  }
})

