// pages/home/home.js
const app = getApp();
import { HomeAPI } from '../../api/home.js';
import { PATIENT } from '../../api/patient'
let API = new HomeAPI();
let PATIENTAPI =new PATIENT()
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarObject:{},
    valueList: [],
    legend: ['无患者', '有患者'],
    contentList:[],
    windowHeight: null,
    windowWidth: null,
    isIos: false,
    isLoading: false,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    noMore: true,
    type: null,
    currentDate: null,
    isShowDa: true,
    // 患者
    hcpDetail: {},
    status: null,
    outTime: '',
    overdue:false,
    isbeOverdueNum: true,
    list: [],
    outTime: '',
    isNewOpen:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = app.globalData.type;
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    this.setData({
      currentDate: year + '-' + (month >=10 ? month : '0' + month) + '-' + (day >=10 ? day : '0' + day) ,
      currentMonth: year + '-' + (month >=10 ? month : '0' + month)
    })
    let self = this;
    let title = type == "doc" ? '针无忧' : '患者管理助手'
    self.setData({
      type: type
    })
    if(type == "doc"){
      self._doctorCalendarList();
      self.getPatient();
    }else if(type == "pat"){
      self.getRecoedList();
      self.getStatus()
    }
    wx.setNavigationBarTitle({
      title: title
    })
    wx.startPullDownRefresh();
    // 获取当前设备的宽高
    wx.getSystemInfo({
      success: (res) => {
        if (res.platform == "ios") { self.data.isIos = true }
        self.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          isIos: self.data.isIos
        })
      },
    })    
  },
  onLoadComplete: function () {
    wx.stopPullDownRefresh();
  },
  //消息数
  msgNum(){
    let num=app.globalData.num;
    console.log(num,'num')
      if (99 >= num && num!=0){
        wx.setTabBarBadge({
          index: 1,
          text: num+''
        })
      } else if (99<num){
        wx.setTabBarBadge({
          index: 1,
          text: '···'
        })
      } else if(num == 0) {
        wx.removeTabBarBadge({
          index: 1
          
        })
      }
  },
   //注射记录列表
  getRecoedList() {
    let vm = this;
    let params = {
      "current": vm.data.page,
      "size": vm.data.pageSize 
    }
    vm.data.isLoading = true;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 15000 });
    vm.setData({
      isLoading: vm.data.isLoading
    });
    PATIENTAPI.recordList(params).then(res => {
      let lists = res && res.records ? res.records : [];
      vm.data.list = vm.data.list.concat(lists);
      let overdue = vm.data.list && vm.data.list[0] && vm.data.list[0].statusName=='已逾期' ? vm.data.list[0].injectionTime : null;
      vm.setData({
        overdue
      })
      console.log(overdue,'overdue')
      if(overdue){
        this.emptyDialog()
      }
      if( lists.length ) params.current++;
      if( res.pages>0 && res.pages <= params.current){
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //获取关联医生的状态
  getStatus(){
      PATIENTAPI.isLinkHcp().then(res=>{
        this.setData({
          status:res.status,
          hcpDetail:res.hcp
        })
        this.emptyDialog()
      })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let type = app.globalData.type;
    let isRefresh = app.globalData.isRefresh;
    if(type=='pat'){
      this.getStatus()
    //  if(!this.data.isNewOpen){
    //    this.setData({
    //      isNewOpen:true
    //    })
    //   //  this.getStatus()
    //  }
    }else if(type=='doc' && isRefresh){
      this._doctorCalendarList();
      this.getPatient();
      app.globalData.isRefresh = false;
    }
    this.msgNum()
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
  getCalendarData(e) { // 监听日历数据
    let detail = e.detail;
    this.setData({
      page: 1,
      totalPages: 0,
      contentList: [],
      currentDate: detail.value
    })
    if( !detail.type ){
      this._doctorCalendarList();
    }
    this.getPatient()
  },
  getPatient() {
    let vm = this;
    let params = {
      date: vm.data.currentDate,
      current: vm.data.page
    }
    vm.data.isLoading = true;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 15000 });
    vm.setData({
      isLoading: vm.data.isLoading
    });
    API.doctorPatientList(params).then(res => {
      let content = res && res.records ? res.records : [];
      vm.data.contentList = vm.data.contentList.concat(content);
      if( res.pages && res.pages <= params.current && vm.data.contentList.length){
        vm.setData({
          noMore: false
        })
      }
      if( content.length ) params.current++;
      vm.setData({
        page: params.current,
        contentList: vm.data.contentList,
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
  scrolltolower() {
    let page = this.data.page,
      totalPages = this.data.totalPages;
    if (page >= totalPages || this.data.isLoading) {
      this.setData({
        noMore: false
      })
      return;
    }
    if(this.data.type == "pat"){
       this.getRecoedList()
    }else if(this.data.type == "doc"){
      this.getPatient();
    }
  },
  // 无患者或有逾期患者弹框
  emptyDialog() {
    if(this.data.isShowDa){
      if (this.data.type == "doc") {
        if (!this.data.calendarObject.flag ) {
          Dialog.confirm({
            title: '',
            message: '您还没有任何患者加入随访，\n现在添加患者？',
            confirmButtonText: '立即添加',
            cancelButtonText: '暂不添加',
            cancelButtonColor: '#ACB7C4'
          })
            .then(() => {
              wx.navigateTo({
                url: "../addPatient/addPatient"
              })
            })
            .catch(() => {
              Dialog.close();
            });
        } else if (this.data.isbeOverdueNum && this.data.calendarObject.beOverdueNum) {
          Dialog.confirm({
            title: '',
            message: '您有' + this.data.calendarObject.beOverdueNum + '位患者已超过注射时间且未填写注射记录，请及时处理。',
            confirmButtonText: '知道了',
            showCancelButton: false
          }).then(() => {
            this.setData({
              isbeOverdueNum: false
            })
            Dialog.close();
          })
          .catch(() => {
            this.setData({
              isbeOverdueNum: false
            })
            Dialog.close();
          });
        }
      } else {
        if( this.data.status == 0 ){
          Dialog.confirm({
            title: '',
            message: '您还没有加入医生随访，即刻加入\n随访可查看每次注射记录。',
            confirmButtonText: '立即加入',
            cancelButtonText: '暂不加入',
            cancelButtonColor: '#ACB7C4'
          })
            .then(() => {
              this.setData({
                isNewOpen:false
              })
              wx.navigateTo({
                url: '/pages/findDoctor/index'
              })
            })
            .catch(() => {
              Dialog.close();
            });
        } else if (this.data.overdue){
          Dialog.confirm({
            title: '',
            message: '您原定于' + this.data.overdue + '的注射已逾期，请您及时随访注射。',
            confirmButtonText: '知道了',
            showCancelButton: false
          }).then(() => {
            Dialog.close();
          })
            .catch(() => {
              Dialog.close();
            });
        }
      }
      this.setData({
        isShowDa: false
      })
    }
  },
  // 患者详情
  goPatientDetail(e) {
    let patientId = e.currentTarget.dataset.id;
    this.setData({
      isNewOpen:false
    })
    wx.navigateTo({
      url: "../patientDetail/index?patientId=" + patientId
    })
  },
  // 添加患者
  addPatient() {
    this.setData({
      isNewOpen:false
    })
    wx.navigateTo({
      url: "../addPatient/addPatient"
    })
  },
  //找医生
  findButton(){
    this.setData({
      isNewOpen:false
    })
    wx.navigateTo({
      url: '/pages/findDoctor/index',
    })
  },
  // 日历统计数据
  _doctorCalendarList: function(){
    let params = {
      date: this.data.currentMonth
    }
    API.doctorCalendarList(params).then(res => {
      this.setData({
        calendarObject: res
      })
      this.emptyDialog()
    })
  }
})