// pages/introduce/introduce.js
import { genderList, titleList } from '../../assets/common.js';
import { API } from '../../api/doctorApi.js';
import {PATIENT} from '../../api/patient';
const getPatient = new PATIENT();
let indAPI = new API();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departments: null,
    departmentsId: null,
    gender: null,
    hciCode: null,
    hciId: null,
    hciName: null,
    hcpCode: null,
    hcpName: null,
    headPortrait: null,
    jobTitle: null,
    jobTitleId: null,
    phone: null,
    phoneSource: null,
    presentation: null,
    urls: [],
    genderList,
    titleList,
    list: [],
    params:{},
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let detail = options.detail ? JSON.parse(options.detail) : {};
    let keys = Object.keys(detail);
    this.wxLogin();
    for(let i=0; i<keys.length; i++){
      if(keys[i] == 'jobTitle'){
        for(let j =0; j<titleList.length;j++){
          if(titleList[j].name == detail['jobTitle']){
            this.setData({
              jobTitle: titleList[j].name,
              jobTitleId: titleList[j].id
            })
          }
        }
      } else if(keys[i] == "headPortrait"){
        let val = detail['headPortrait'] ? detail['headPortrait'] : '';
        let urls = [{'url':val}];
        this.setData({
          headPortrait: val.split(),
          urls
        })
      }else{
        this.setData({
          [keys[i]]: detail[keys[i]]
        })
      }
    }
  },

  wxLogin(){
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
   * 数据更新触发
   */

  updateValue: function (e) {
    const key = e.detail.key;
    const item = e.detail.item;
    if(key == 'hciName'){
      this.setData({
        hciCode: item.hciCode || null,
        hciId: item.id || null,
        hciName:  item.name || null,
      })
    }else if(key == 'departments'){
      this.setData({
        departments: item.name,
        departmentsId: item.id
      })
    }else if(key == 'urls'){
      this.setData({
        headPortrait: item
      })
    }else{
      this.setData({
        [key]: item.name ? item.id: item
      })
    }
  },
  getPhone(e) {
    let vm = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let params = {};
      params.code = vm.data.code;
      params.iv = e.detail.iv;
      params.encryptedData = e.detail.encryptedData;
      getPatient.getPhone(params).then(res => {
        vm.setData({
          phone:res.phoneNumber,
          phoneSource: res.phoneNumber
        })
      }) 
     }
  },

  /**
   * 验证表单
   */
  validate() {
    if(!this.data.departmentsId || this.data.gender == null || !this.data.hciCode || !this.data.hcpName || !this.data.urls || !this.data.urls.length || !this.data.jobTitle || !this.data.phoneSource){
      return false
    } else {
      return true;
    }
  },

  saveDoctor: function () {
    if(this.validate()){
      this.upParams();
      wx.showToast({ title: '提交中', icon: 'loading' ,duration: 1500});
      this._doctorSaveDoctorInfo()
    }else{
      wx.showToast({ title: '请完善带*必填项', icon: 'none' });
    }
  },
  _doctorSaveDoctorInfo(){
    let vm = this;
    indAPI.doctorSaveDoctorInfo(this.data.params).then(res => {
      let interV= setTimeout(function(){
        wx.switchTab({
          url:"../mine/mine"
        })
        wx.hideToast()
        clearInterval(interV)
      },1500)
    }).catch(rej => {
      wx.hideToast()
      this.upParams(true);
    })
  },
  upParams(isEmpty){
    let headPortrait = this.data.headPortrait || [];
    let params = {
      departmentsId: isEmpty ? null : this.data.departmentsId,
      gender: isEmpty ? null : this.data.gender,
      hciCode: isEmpty ? null : this.data.hciCode,
      hcpName: isEmpty ? null : this.data.hcpName,
      headPortrait: isEmpty ? null : headPortrait.join(),
      jobTitle: isEmpty ? null : this.data.jobTitle,
      phone: isEmpty ? null : this.data.phoneSource
    }
    this.setData({
      params
    })
    if(isEmpty){
      let keyAll = Object.keys(params);
      for(let i = 0 ; i < keyAll.length; i++){
        this.setData({
          [keyAll[i]] : params[i]
        })
      }
      this.setData({
        jobTitleId: null,
        urls: []
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})