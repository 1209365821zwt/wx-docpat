// pages/addPatient/addPatient.js
const commonList = require('../../assets/common.js')
import { API } from '../../api/doctorApi';
import { minAPI } from '../../api/mine';
const DOCAPI = new API();
const mineAPI = new minAPI();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    patientName:'',
    gender: '',
    phone: null,
    injectionTime: null,
    isFirst: null,
    injectionPosition: null,
    nextInjectionTime: null,
    newPhone: null,
    list: commonList.selectList,
    list1: commonList.genderList,
    injectionList: commonList.injectionList,
    visitRecords:[],
    doctor: {},
    urls: 'https://nuoxin-client-project.oss-cn-beijing.aliyuncs.com/patient/1590386573503.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id ? options.id : null;
    if(id){
      this.setData({
        active: id 
      })
    }
    this._doctorDetail()
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
    let phone = this.data.newPhone;
    this.setData({
      phone
    })
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
    return {
      title: this.data.doctor.hcpName+'医生邀请您加入随访',
      path: "pages/PatientInfo/PatientInfo"
    }
  },
  // tab切换
  onChange: function(){

  },
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.urls, // 当前显示图片的http链接   
      urls: this.data.urls.split() // 需要预览的图片http链接列表   
    })
  },
  // longpressTap: function(){
  //   let vm = this;
  //   wx.showActionSheet({
  //     itemList:['分享','保存'],
  //     success(res){
  //       if(res.tapIndex == 0){
  //         wx.showShareMenu({
  //           withShareTicket: true
  //         })
  //       } else if(res.tapIndex == 1){
  //         wx.getSetting({
  //           success(res) {
  //             if (!res.authSetting['scope.writePhotosAlbum']) {
  //               vm.saveImg1(vm.data.urls)
  //             } else {
  //               vm.saveImg1(vm.data.urls)
  //             }
  //           }
  //         })
  //       }
  //     },
  //     fail(res){
  //       console.log(res.errMsg)
  //     }
  //   })
  // },
  // saveImg1(url){
  //   wx.authorize({
  //     scope:'scope.writePhotosAlbum',
  //     success() {
  //       // 获取授权
  //       wx.downloadFile({
  //         url: url,
  //         success:function (res) {
  //           //图片保存到本地
  //           wx.saveImageToPhotosAlbum({
  //             filePath: res.tempFilePath,
  //             success:function (data) {
  //               console.log('保存成功')
  //               wx.showToast({
  //                 title: '保存成功'
  //               });
  //             },
  //             fail:function (err) {
  //               if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
  //                 wx.openSetting({
  //                   success(settingdata) {
  //                     console.log(settingdata)
  //                     if (settingdata.authSetting['scope.writePhotosAlbum']) {
  //                       console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
  //                     }else {
  //                       console.log('获取权限失败，给出不给权限就无法正常使用的提示')
  //                     }
  //                   }
  //                 })
  //               }
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
  // 获取二维码
  _doctorGetCodeUnlimit(){
    let params = {
      path: '',

    }
    DOCAPI.doctorGetCodeUnlimit().then(res => {
      console.log(res,'------')
    })
  },
  // 获取医生信息
  _doctorDetail(){
    mineAPI.doctorDetailMine().then(res => {
      // app.globalData.
      this.setData({
        doctor: res ? res : {}
      })
    })
  },
  // form组件传递参数改变本组件data值
  updateValue: function (e) {
    let key = e.detail.key;
    let item = e.detail.item;
    this.setData({
      [key]: item.name ? item.id : item
    })
  },
  // 保存
  formSubmit(e){
    let vm = this;
    if (!this.data.patientName.trim() || !this.data.gender || !this.data.injectionTime || !this.data.phone || this.data.isFirst == null || !this.data.injectionPosition || !this.data.nextInjectionTime) {
      wx.showToast({ title: '请完善带*必填项', icon: 'none' });
    } else {
      let params = this.setParams();
      DOCAPI.doctorSavePatient(params).then(res => {
        let interV= setTimeout(function(){
          app.globalData.isRefresh = true;
          wx.navigateBack({
            delta: 1 
          })
          clearInterval(interV)
          vm.emptyParams();
        },1500)
      })
    }
  },
  vanPopupShow(e){
    wx.navigateTo({
      url: '../../pages/addPhone/addPhone'
    })
  },
  emptyParams(){
    this.setData({
      patientName:'',
      gender: '',
      phone: null,
      injectionTime: null,
      isFirst: null,
      injectionPosition: null,
      nextInjectionTime: null,
      visitRecords: []
    })
  },
  setParams(){
    let form = {};
    form.gender = this.data.gender;
    form.hcpCode = app.globalData.hcpCode;
    form.injectionPosition = this.data.injectionPosition;
    form.injectionTime = this.data.injectionTime;
    form.isFirst = this.data.isFirst;
    form.nextInjectionTime = this.data.nextInjectionTime;
    form.patientName = this.data.patientName;
    form.phone = this.data.phone;
    form.visitRecords = this.data.visitRecords.join();
    return form
  }
})