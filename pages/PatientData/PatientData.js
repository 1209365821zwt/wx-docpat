// pages/PatientData/PatentData.js
import {PATIENT} from '../../api/patient'
const PatientAPI=new PATIENT()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    gender:null,
    patientName:null,
    columns:[
      {
        name:'男',
        id:0
      },
      {
        name:'女',
        id:1
      },
    ],
    code:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let self=this
      let details=JSON.parse(options.detail);
      console.log(details,'details')
      this.setData({
        phone: details.phoneSource,
        gender:details.gender,
        patientName:details.patientName,
      })
      wx.login({
         success(e){
          self.setData({
           code:e.code
         })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  //手机号获取
  getPhoneNumber : function(e){
    let _this=this;
   if (e.detail.errMsg == "getPhoneNumber:ok") {
     let params = {};
     params.code = _this.data.code;
     params.iv = e.detail.iv;
     params.encryptedData = e.detail.encryptedData;
     PatientAPI.getPhone(params).then(res => {
       if(_this.data.phone){}
         _this.setData({
          phone:res.phoneNumber
         })      
     }) 
    }
 },
  getPhone(e) {
  },
  updateValue: function (e) {
    let key = e.detail.key;
    let item = e.detail.item;
    this.setData({
      [key]: item.name ? item.id : item
    })
  },
  savePatientData: function(){
    let params={
      patientName:this.data.patientName,
      gender:this.data.gender,
      phone:this.data.phone
    }
    if (this.data.patientName && this.data.phone && this.data.gender!=null || '') {
      //保存接口
      PatientAPI.saveInfo(params).then((res)=>{
         wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500,
          success: function(){
            let interV= setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
              clearInterval(interV)
            },1500)
          }
        })
      })
     
    } else {
      wx.showToast({ title: '请完善带*必填项', icon: 'none' });
    }
  }
})