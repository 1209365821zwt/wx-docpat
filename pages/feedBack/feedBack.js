// pages/feedBack/feedBack.js
import { minAPI } from '../../api/mine';
const feedBackAPI = new minAPI()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackContent: '',
    feedbackImage: []
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
  onShareAppMessage: function () {

  },
  setContent(e){
    this.setData({
      feedbackContent: e.detail
    })
  },
  // form组件传递参数改变本组件data值
  updateValue: function (e) {
    let key = e.detail.key;
    this.setData({
      [key]: e.detail.item
    })
  },
  saveBack: function(e){
    let params = {
      feedbackContent: this.data.feedbackContent,
      feedbackImage: this.data.feedbackImage.join()
    }
    if(params.feedbackContent){
      feedBackAPI.commonFeedBack(params).then(res => {
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
      wx.showToast({
        title: '请输入您想反馈的问题或建议',
        icon: 'none',
        duration: 1500
      })
    }
  }
})