// pages/doctorIntroduce/doctorIntroduce.js
import { minAPI } from '../../api/mine.js'
const intAPI = new minAPI()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    presentation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let detail = options.detail;
    this.setData({
      presentation: detail
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
  onShareAppMessage: function () {

  },
  setPresentation(e){
    this.setData({
      presentation: e.detail.value
    })
  },
  saveIntroduct: function(){
    let presentation = this.data.presentation;
    intAPI.doctorSavePresentation(presentation).then(res => {
      let Page = getCurrentPages()[getCurrentPages().length - 2];
      let doctor = Page.data.doctor;
      doctor.presentation = presentation;
      Page.setData({
        doctor
      })
      wx.navigateBack({
        delta: 1
      })
    })
  }
})