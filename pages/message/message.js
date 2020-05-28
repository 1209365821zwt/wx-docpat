// pages/message/message.js
import {Message} from '../../api/message';
import {config} from '../../utils/config';
let getMessage=new Message();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    patient:[],
    docMessage:[],
    informationList: [],
    page:1,
    pageSize:10,
    noMore:true,
    totalPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getList(isFlag){
      let params={
        "current": this.data.page,
        "size": this.data.pageSize
      }
      wx.showToast({
        title:'加载中',
        icon:'loading'
      })
      getMessage.pageList(params).then(res=>{
        wx.hideToast()
        this.setData({
          totalPage:res.pages
        })
        if(isFlag){
           this.setData({
            informationList:res && res.records ? this.data.informationList.concat(res.records) : this.data.informationList,
            docMessage:res && res.records ? this.data.docMessage.concat(res.records) : []
           })
         if(this.data.informationList.length>=res.total || this.data.docMessage.length>=res.total){
           this.setData({
             noMore:false
           })
         }
        }else{
          this.setData({
            informationList: res && res.records ? res.records :[],
            docMessage:res && res.records ? res.records :[],
          })
          if(this.data.informationList.length==0 || this.data.docMessage.length==0){
            this.setData({
              noMore:false
            })
          }
          
        }
      })
  },
  //显示消息数
  onLoad: function (options) {
    const type = app.globalData.type;
    this.setData({
      type:type     
    })
    this.getList();
  },
  scroll(e){
    this.setData({
      page:this.data.page+1
    })
    if(this.data.page > this.data.totalPage){
      return false
    }else{
      this.getList(true)
    }
    
  },
  //删除信息
  delclick(id){
     let ids=id.detail;
     getMessage.delMessage(ids).then(res=>{
       wx.showToast({
         title: '删除成功',
         duration:1000
       })
     })
     this.setData({
      page:1
    })
     this.getList();
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
    this.setData({
      page:1
    })
    this.getList();
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