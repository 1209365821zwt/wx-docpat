// pages/mine/mine.js

const app = getApp();
import { minAPI } from '../../api/mine';
import {PATIENT} from '../../api/patient'
const mineAPI = new minAPI();
const minePatient=new PATIENT()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor: {},
    patient: {},
    type: app.globalData.type || 'pat',
    doctorMenuList: [
      {
        icon: '../../assets/imgs/svg/introduce.svg',
        text: '我的介绍',
        key: 'doctorIntroduce'
      },
      {
        icon: '../../assets/imgs/svg/patient.svg',
        text: '添加患者',
        key: 'addPatient'
      },
      {
        icon: '../../assets/imgs/svg/feedback.svg',
        text: '意见反馈',
        key: 'feedBack'
      }
    ],
    patientMenuList: [
      {
        icon: '../../assets/imgs/svg/introduce.svg',
        text: '我的资料',
        key: 'PatientData'
      },
      {
        icon: '../../assets/imgs/svg/feedback.svg',
        text: '意见反馈',
        key: 'feedBack'
      }
    ]
  },
  goPage: function (e) {
    const { key } = e.currentTarget.dataset;
    let detail = null
    if(key == "doctorIntroduce"){
      detail = this.data.doctor.presentation
    }else if(key=="PatientData"){
      detail=JSON.stringify(this.data.patient) 
    }else if(key == "setting"){
      detail = JSON.stringify(this.data.doctor)
    }
    console.log(detail,'detail')
    wx.navigateTo({
      url: `/pages/${key}/${key}?detail=${detail? detail : '欢迎加入我的随访，有我陪你一路前行，治愈之路不再孤单！'}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: app.globalData.type
    })
    if(this.data.type == "doc"){
      this._doctorDetail()
    }else{
      this.myinfo()
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  _doctorDetail(){
    mineAPI.doctorDetailMine().then(res => {
      this.setData({
        doctor: res ? res : {}
      })
    })
  },
  //患者我的信息
  myinfo(){
    minePatient.myInfo().then(res=>{
       this.setData({
        patient:res ? res : {}
       })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.type == "pat"){
        this.myinfo()
    }
     
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

  }
})