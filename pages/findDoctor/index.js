// pages/findDoctor/index.js
import {API} from '../../api/findDoctor' 
let findDoctor =new API()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceList:[],
    mainActiveIndex: 0,
    activeId: null,
    show:false,
    windowHeight: null,
    windowWidth: null,
    isIos: false,
    isLoading: false,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    noMore: true,
    value:'',
    province:"",
    List:[],
    hiddenList:true,
    bindSource:[],
    city:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getPage();
      this.init();
      
  },
 getPage(isPage){
   console.log(this.data.value,'value')
   if(this.data.city=="不限" || this.data.province=="全国"){
    this.setData({
      city:null,
      province:null
    })
   }
   let params={
    "city": this.data.city,
    "current": this.data.page,
    "inputContent": this.data.value==0 ? null : this.data.value,
    "province": this.data.province,
    "size": this.data.pageSize
   }

  wx.showToast({
    title: '加载中', icon: 'loading', duration: 15000 
  })
   //请求
   findDoctor.findHcpList(params).then(res=>{
     wx.hideToast()
     this.setData({
      totalPages:res.pages
     })
     if(isPage){
       //加载下一页的数据
      this.setData({
        bindSource: res && res.records ? this.data.bindSource.concat(res.records) : []
      })
     if(this.data.bindSource.length>=res.pages){
       this.setData({
         noMore:false
       })
     }
     }else{
       this.setData({
         bindSource:res.records
       })
      if(res.records.length==0){
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
      page:this.data.page+1
    })
    if( this.data.page > this.data.totalPages){
       return false
    }else{
      this.getPage(true)
    }
  },
  inputBlur(){
    wx.navigateTo({
      url: '/pages/findDoctorHistory/index',
    })
  },
  //点击页面跳转
  doctorDetail(e){
    let items=e.detail.hcpCode;
    let value=1
    wx.navigateTo({
      url: '/pages/pasdocDetail/index?code='+items+'&value='+value,
    })
  },
  //跳转页面
  tapPage(){
    wx.navigateTo({
      url: '/pages/findDoctorHistory/index',
    })
  },
  onClickNav({ detail = {} }) {
    let province=this.data.provinceList[detail.index].text
    this.setData({
      province
    })
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  showProvince(){
    this.setData({
      show:!this.data.show
    })
  },
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    let city=detail.text
    this.setData({ 
      activeId,
      show:false,
      city,
      page:1
    });
   this.getPage()
  },
  onCancel() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  init(){
    var that=this
    findDoctor.provinceCity().then(res=>{
          this.data.provinceList=res && res || [];
          if(res && res.length>0){
            that.data.provinceList=res;
            that.data.provinceList.unshift({
              text:'全国',
              children:[{text:"不限"}]
            })
          }
           that.setData({
            provinceList:that.data.provinceList
          })
    })
  },
  onReady: function () {

 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     this.setData({
       value:0
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

  }
})