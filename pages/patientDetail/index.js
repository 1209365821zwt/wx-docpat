// pages/patientDetail/index.js
import { API } from '../../api/doctorApi';
const docAPI = new API();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hcpDetail: {},
    status: null,
    windowHeight: null,
    windowWidth: null,
    isIos: false,
    isLoading: false,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    noMore: true,
    patientId: null,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    vm.setData({
      patientId: options.patientId
    })
    wx.startPullDownRefresh();
    // 获取当前设备的宽高
    wx.getSystemInfo({
      success: (res) => {
        if (res.platform == "ios") { vm.data.isIos = true }
        vm.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          isIos: vm.data.isIos
        })
      },
    })
    vm._doctorGetPatient();
    vm._doctorPatientRecord();
  },
  // 患者信息
  _doctorGetPatient(){
    docAPI.doctorGetPatient(this.data.patientId).then(res => {
      this.setData({
        hcpDetail: res ? res : {}
      })
    })
  },
  // 患者注射详情
  _doctorPatientRecord() {
    let vm = this;
    let params = {
      patId: vm.data.patientId,
      current: vm.data.page
    }
    vm.data.isLoading = true;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 15000 });
    vm.setData({
      isLoading: vm.data.isLoading
    });
    docAPI.doctorPatientRecord(params).then(res => {
      let content = res && res.records ? res.records : [];
      vm.data.list = vm.data.list.concat(content);
      if( content.length ) params.current++;
      if( res.pages <= params.current){
        vm.setData({
          noMore: false
        })
      }
      vm.setData({
        page: params.current,
        list: vm.data.list,
        totalPages: res.pages
      })
      vm.data.isLoading = false;
      vm.setData({
        isLoading: vm.data.isLoading
      });
      wx.hideToast()
      vm.onLoadComplete()
    })
  },
  onLoadComplete: function () {
    wx.stopPullDownRefresh();
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
    let page = this.data.page,
      totalPages = this.data.totalPages;
    if (page > totalPages || this.data.isLoading) {
      this.setData({
        noMore: false
      })
      return;
    }
    this._doctorPatientRecord();
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})