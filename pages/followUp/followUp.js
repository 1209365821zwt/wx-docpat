// pages/followUp/followUp.js
const commonList = require('../../assets/common.js');
import {PATIENT} from '../../api/patient';
let app=getApp()
let getPatient=new PATIENT()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientName:null,
    list: commonList.selectList,
    list1: commonList.genderList,
    injectionList: commonList.injectionList,
    visitRecords: [],
    gender: null,
    hcpCode: '',
    injectionPosition: null,
    injectionTime: null,
    isFirst: null,
    nextInjectionTime: null,
    phone: null,
    checked: false,
    show: false,
    code:null
  },
  updateValue: function (e) {
    let key = e.detail.key;
    let item = e.detail.item;
    this.setData({
      [key]: item.name ? item.id : item
    })
  },
  init(){
    wx.login({
      success: res => {
        if(res.code){
          this.setData({
            code:res.code
          })
        }
      }
    })
  },
  //获取手机号
  getPhone : function(e){
     let _this=this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let params = {};
      params.code = _this.data.code;
      params.iv = e.detail.iv;
      params.encryptedData = e.detail.encryptedData;
      getPatient.getPhone(params).then(res => {
        _this.setData({
          phone:res.phoneNumber
        })
      }) 
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        hcpCode:options.code
      })
      this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChange: function(e){
    this.setData({
      checked: e.detail
    })
  },
  saveJoin: function(e){
      if(!this.data.patientName){
        wx.showToast({
          title: '姓名不能为空',
          icon: "none"
        })
        return;
      }else if(this.data.gender== null || ""){
        wx.showToast({
          title: '性别不能为空',
          icon: "none"
        })
        return;
      }else if(!this.data.injectionTime){
        wx.showToast({
          title: '注射时间不能为空',
          icon: "none"
        })
        return;
      }else if(this.data.isFirst== null || ""){
        wx.showToast({
          title: '首次注射不能为空',
          icon: "none"
        })
        return;
      }else if(this.data.injectionPosition==null || ""){
        wx.showToast({
          title: '注射部位不能为空',
          icon: "none"
        })
        return;
      }else if(!this.data.phone){
        wx.showToast({
          title: '手机号未绑定',
          icon: "none"
        })
        return;
      }else if(this.data.checked==false){
        wx.showToast({
          title: '请阅读并同意《使用协议》',
          icon: "none"
        })
        return;
      }
      let params={
        "formId": null,
        "gender": this.data.gender,
        "hcpCode": this.data.hcpCode,
        "injectionPosition": this.data.injectionPosition,
        "injectionTime": this.data.injectionTime,
        "isFirst": this.data.isFirst,
        "patientName": this.data.patientName,
        "phone": this.data.phone,
        "visitRecords": this.data.visitRecords && this.data.visitRecords.length ? this.data.visitRecords.join(',') : ''
      }
      wx.showToast({
        title: '保存中',
        icon: "loading",
        duration: 15000
      })
    getPatient.joinRelation(params).then(()=>{
      wx.hideToast()
      this.setData({
        show:true
      })
    })
  },
  goBack: function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  //跳转协议
  jumpClick(){
    wx.navigateTo({
      url: '/pages/userAgreement/index',
    })
  }
})