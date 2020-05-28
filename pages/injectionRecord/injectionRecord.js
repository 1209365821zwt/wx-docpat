// pages/InjectionRecord/injectionRecord.js
const app = getApp()
import { API } from '../../api/doctorApi';
import { PATIENT } from '../../api/patient';
const injAPI = new API();
const patIENT = new PATIENT();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    injectionNumS:'',
    injectionNum: null,
    injectionPosition: null,
    injectionTime: "",
    nextInjectionTime: "",
    patFeel: "",
    visitRecords: [],
    columns: [
      {name: '左三角肌', id:1},
      {name: '右三角肌', id:2},
      {name: '左臀部', id:3},
      {name: '右臀部', id:4}],
    show: false,
    type: null,
    status: null,
    id: null,
    patientId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let patientId = options.patientId;
    let id = options.id;
    const type = app.globalData.type;
    this.setData({
      type: type,
      patientId,
      id
    })
    if(this.data.type == "doc"){
      this._doctorInjDetails()
    } else {
      this._patientInjDetails()
    }
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
  // onShareAppMessage: function () {

  // },
  // form组件传递参数改变本组件data值
  updateValue: function (e) {
    let key = e.detail.key;
    let item = e.detail.item;
    console.log(e,'------')
    this.setData({
      [key]: item.name ? item.id : item
    })
  },
  // 患者感受
  setContent(e){
    this.setData({
      patFeel: e.detail
    })
  },
  // 获取医生端注射记录详情
  _doctorInjDetails(){
    injAPI.doctorInjDetails(this.data.id).then(res => {
      this._setList(res);
    })
  },
  // 患者端注射详情
  _patientInjDetails(){
    patIENT.patientInjDetails(this.data.id).then(res => {
      this._setList(res);
    })
  },
  // 注射详情 数据处理
  _setList(res){
    let list = res;
    let keyL = Object.keys(list);
    for(let i = 0; i < keyL.length; i++){
      if(keyL[i] !== 'visitRecords') {
        this.setData({
          [keyL[i]]: list[keyL[i]]
        })
      }
    }
    if(list['visitRecords']){
      let urlL = [];
      let urls = list['visitRecords'].split(',');
      let arr = {}
      for(let j =0; j< urls.length; j++){
        arr.url = urls[j];
        urlL.push(arr)
      }
      this.setData({
        visitRecords: urlL
      })
    } 
    this.setData({
      injectionNumS: list &&　list.injectionNum ? '第'+list.injectionNum+'次' : ''
    })
  },
  // 保存
  saveInjectionRecord:function(e){
    let vm = this;
    if(this.data.type == "doc"){
      let params = this.setParams();
      if(this.data.status !== 2){
        let injTime = new Date(params.injectionTime);
        let nextInjTime = new Date(params.nextInjectionTime);
        if(!params.injectionTime || !params.injectionPosition ||!params.nextInjectionTime ){
          wx.showToast({ title: '请完善带*必填项', icon: 'none' });
          return false
        }
        if(injTime > nextInjTime){
          wx.showToast({ title: '下次注射日期不得小于本次注射日期', icon: 'none' });
          return false
        }
      } else {
        if(!params.injectionTime || !params.injectionPosition ){
          wx.showToast({ title: '请完善带*必填项', icon: 'none' });
          return false
        }
      }
      injAPI.doctorConfirmInjection(params).then(res => {
        wx.showToast({ title: '保存成功', icon: 'none' });
        let interV= setTimeout(function(){
          app.globalData.isRefresh = true;
          wx.navigateTo({
            url: '../patientDetail/index?patientId=' + vm.data.patientId
          })
          wx.hideToast()
          clearInterval(interV)
          vm.emptyParams();
        },1500)
      })
    } else {
      let params = this.setParams();
      if(!params.injectionTime || !params.injectionPosition ){
        wx.showToast({ title: '请完善带*必填项', icon: 'none' });
        return false
      } else {
        patIENT.confirmInject(params).then(res => {
          wx.showToast({ title: '保存成功', icon: 'none' });
          let interV= setTimeout(function(){
            wx.switchTab({
              url: '../home/home'
            })
            wx.hideToast()
            clearInterval(interV)
            vm.emptyParams();
          },1500)
        })
      }
    }
  },
  emptyParams(){
    this.setData({
      id:'',
      patientName: '',
      patFeel: null,
      injectionTime: null,
      injectionPosition: null,
      nextInjectionTime: null,
      visitRecords: []
    })
  },
  setParams(){
    let form = {};
    form.id = this.data.id;
    form.injectionPosition = this.data.injectionPosition;
    form.injectionTime = this.data.injectionTime;
    form.nextInjectionTime = this.data.nextInjectionTime;
    if(this.data.type == "doc"){
      form.patientName = this.data.patientName;
    }
    form.patFeel = this.data.patFeel;
    form.visitRecords = this.data.visitRecords.join();
    return form
  }
})