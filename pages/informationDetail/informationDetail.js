// pages/informationDetail/informationDetail.js
import {Message} from '../../api/message';
import { API } from '../../api/doctorApi';
import { timeFn } from '../../utils/util';
const app = getApp();
let Messages =new Message();
let docAPI = new API();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{
      joinStat:5
    },
    countdown:'',
    hours:6,
    minute:30,
    isShow:0,
    id:null,
    megContent:null,
    visitRecords:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this=this;
    let type = app.globalData.type;
    _this.setData({
      id:options.id,
      type: type
    })
    wx.setNavigationBarTitle({
      title: '加入随访申请',
    })
    _this.getMessage()
  },
  //拒绝
  rejectclick: function(){
    docAPI.doctorRefuseRelation(this.data.detailObj.id).then(res => {
      this.setData({
        countdown: ''
      })
      this.getMessage();
    })
  },
  //获取信息详情
  getMessage(){
    let ids=this.data.id;
    Messages.messageDetail(ids).then(res=>{
      this.data.detailObj=res && res.hcpPatRelation
      console.log(res.hcpPatRelation,66)
      console.log(res.hcpPatRelation.createTime,99)
      this.data.visitRecords=this.data.detailObj && this.data.detailObj.visitRecords ? this.data.detailObj.visitRecords.split(',') : [];
      let time = res && res.hcpPatRelation && res.hcpPatRelation.createTime ? res.hcpPatRelation.createTime : '';
      let megRole = res && res.hcpPatRelation && res.hcpPatRelation.megRole ? res.hcpPatRelation.megRole : null;
      this.setData({
        detailObj:this.data.detailObj,
        visitRecords:this.data.visitRecords[0],
        countdown: megRole==1 && time ? timeFn(time) : '',
        megContent:res && res.megContent ? res.megContent : null
      })
    })
  },
  
  //同意
  agreeclick:function(){
    docAPI.doctorAgreeRelation(this.data.detailObj.id).then(res => {
      this.setData({
        countdown: ''
      })
      this.getMessage();
    })
  },
  //判断是否失效
  outime:function(){
    const { hours, minute} =this.data;
    if (hours<=0 && minute<=0){
      this.setData({
        isShow:3
      })
    }
  },
  // 立即确认跳转注射记录详情
  goPatientDe:function(){
    let patientId = this.data.detailObj.patId;
    if(this.data.type == "doc"){
      wx.navigateTo({
        url: "../patientDetail/index?patientId=" + patientId
      })
    } else {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
  },
  //立即添加患者
  addcase:function(){
    if(this.data.type == "doc"){
      wx.navigateTo({
        url: "../addPatient/addPatient?id="+2
      })
    } else {
      wx.navigateTo({
        url: '/pages/findDoctor/index',
      })
    }
  },
  //查看患者详情

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.outime()
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

  }
})