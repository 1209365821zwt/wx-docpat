// pages/pasdocDetail/index.js
import {PATIENT} from '../../api/patient'
let docDetail =new PATIENT()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     status:10,
     hcpcode:'',
     value:0,
     docDetail:{
       departments: null,
       departmentsId: null,
       gender: null,
       hciCode: null,//医院Code
       hciId: null,//医院id
       hciName: null,
       hcpCode: null, //医生Code
       hcpName: null,
       headPortrait: null,
       jobTitle: null,
       jobTitleId: null,
       phone: null,
       phoneSource: null,
       presentation: null,
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      hcpcode:options.code,
      value:options.value
    })
    this.init();
    this.getDocdetail()
  },
   //是否关联医生
   init(){
    docDetail.isLinkHcp().then(res=>{
      this.setData({
        status: res  &&  res.status
      })
    })
   },
   //获取医生详情
   getDocdetail(){
     let hcpCode=this.data.hcpcode;
    docDetail.hcpDetail(hcpCode).then(res=>{
      console.log(res,'res')
      this.data.docDetail=Object.keys(res).length>0 && res
      this.setData({
        docDetail:this.data.docDetail
      })
    })
   },
   //加入随访
   followup(){
     let code=this.data.hcpcode;
     wx.navigateTo({
       url: '/pages/followUp/followUp?code='+code,
     })
   },
   //解除随访
   clearelation(){
    docDetail.cancelJoin().then(()=>{
       wx.showToast({
         title: '操作成功',
         duration:1000
       })
       wx.switchTab({
         url: '/pages/home/home',
       })
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

  }
})