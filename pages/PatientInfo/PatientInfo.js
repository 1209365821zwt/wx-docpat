// pages/addPatient/addPatient.js
//获取应用实例
const app = getApp()
import { API } from '../../api/doctorApi';
const docAPI = new API();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patient: {},
    remarks: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hcpCode = app.globalData.hcpCode;
    this.setData({
      hcpCode,
      patientId: options.patientId
    })
    this._doctorGetPatient()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setRemarks(e){
    this.setData({
      remarks: e.detail
    })
  },
  // 患者信息
  _doctorGetPatient(){
    docAPI.doctorGetPatient(this.data.patientId).then(res => {
      this.setData({
        patient: res ? res : {},
        remarks: res && res.remarks ? res.remarks: null
      })
    })
  },
  // 保存备注
  _doctorSavePatientRemarks(){
    if(this.data.remarks){
      let params = {
        patId: this.data.patientId,
        remarks: this.data.remarks
      }
      docAPI.doctorSavePatientRemarks(params).then(res => {
        let vm = this;
        wx.showToast({ title: '保存成功', icon: 'none', duration: 1500 });
        let interV= setTimeout(function(){
          wx.hideToast();
          vm.goBack();
          clearInterval(interV)
        },1500)
      }).catch(rej => {
        wx.showToast({ title: '保存失败', icon: 'none', duration: 1500 });
      })
    } else {
      this.goBack()
    }
  },
  goBack(){
    wx.navigateBack()
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
})