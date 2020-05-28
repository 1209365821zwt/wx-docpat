// pages/findDoctorHistory/index.js
import {API} from '../../api/findDoctor'
let History = new API()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    List: [],
    value: '',
    totalPages:0,
    page:1,
    pageSize:10,
    isLoading:false,
    hiddenList: false,
    bindSource: [],
    searched:false,
    noMore:true,
  },
  cancel(){
    wx.navigateBack({
      delta:1
    })
  },
  //历史信息列表
  init(){
    var _this=this
    History.searchistory().then(res=>{
      _this.data.searchList=res && res;
      _this.setData({
        searchList:_this.data.searchList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    _this.init();
   
  },
 

  //点击搜索医生
  searchDoc(e){
   var prefix=e.currentTarget.dataset.item.search;
   //加载数据
   this.setData({
    value:prefix,
    page:1,
    searched:true,
    noMore:false,
   })
    this.getPage()
  },
  //删除搜索历史
  cancel(){
     this.data.searchList=[];
     this.setData({
       searchList:this.data.searchList
     })
     History.historyDel().then(res=>{
       wx.showToast({
         title: '删除成功',
       })
     })
  },
  //点击取消返回上一页面
  onCancel(){
    wx.navigateBack({
      delta:1
    })
  },
  getPage(isPage){
    console.log(this.data.value,'兰兰')
    let params={
      "current": this.data.page,
      "inputContent": this.data.value,
      "size": this.data.pageSize
     }
     wx.showToast({
       title: '加载中',
       icon:'loading'
     })
     History.findHcpList(params).then(res=>{
      this.setData({
        totalPages:res.pages
       })
      wx.hideToast()
      if(isPage){
        //加载下一页的数据
       this.setData({
         bindSource:res && res.records ? this.data.bindSource.concat(res.records) : this.data.bindSource
       })
      if(this.data.bindSource.length>=res.pages){
        this.setData({
          noMore:false
        })
      }
      }else{
        this.setData({
          bindSource:res && res.records ? res.records :[]
        })
        if( res.records.length==0){
           this.setData({
             noMore:false
           })
        }
      }
      this.setData({
       hiddenList:false
      })
    })
  },
  //上拉加载
  scroll(e) {
    this.setData({
      page:this.data.page+1,
    })
    if( this.data.page > this.data.totalPages){
      return false
   }else{
     this.getPage(true)
   }
  },
  //搜索
  onSearch(event) {
    this.getPage()
    var prefix = event.detail;
    this.setData({
      value:prefix,
      searched:true,
      noMore:false,
      page:1,
      List:[]
    })
    this.getPage();
  },
  doctorDetail(e){
    let items=e.detail.hcpCode;
    let value=1;
    wx.navigateTo({
      url: '/pages/pasdocDetail/index?code='+items+'&value='+value,
    })
  },
  onChange(e){
   this.setData({
    value:e.detail
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