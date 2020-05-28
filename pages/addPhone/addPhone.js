// components/addPhone/addPhone.js
import { HomeAPI } from '../../api/home.js';
let API = new HomeAPI();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newPhone: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // }
  codeBlur:function(e){
    this.setData({
      code: e.detail
    })
  },
  // form组件传递参数改变本组件data值
  updateValue: function (e) {
    let key = e.detail.key;
    this.setData({
      [key]: e.detail.item
    })
  },
  getPhoneAuthToken: function () {
    let vm = this;
    if(vm.data.newPhone.trim().length == 11){
      API.getPatientPhone(vm.data.newPhone.trim()).then(res => {
        wx.showToast({ title: '发送成功', icon: 'none', duration: 1500 });
      })
    } else {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none', duration: 1500 });
    }
  },
  saveInjectionRecord: function (e) {
    let vm = this;
    if(vm.data.newPhone.toString().trim() && vm.data.code){
      API.getHcpVerifyPhone(vm.data.newPhone.trim(),vm.data.code).then(res => {
        wx.showToast({ title: '保存成功', icon: 'none', duration: 1500 });
        let pages = getCurrentPages(); 
        let prevPage = pages[pages.length - 2];
        prevPage.setData({ 
          newPhone: vm.data.newPhone
        })
        let interV= setTimeout(function(){
          wx.navigateBack({
            delta: 1 
          })
          wx.hideToast()
          clearInterval(interV)
        },1500)
      })
    }else{
      wx.showToast({ title: '请完善手机验证', icon: 'none', duration: 1500 });
    }
  }
})