// components/doctorPage/doctorPage.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentList:{
      type: Array,
      value: []
    },
    noMore:{
      type: Boolean,
      value: true
    },
    isIos: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: null
  },
  ready(){
    this.setData({
      type: app.globalData.type
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 患者详情
    goPatientDetail(e) {
      let patientId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../patientDetail/index?patientId=" + patientId
      })
    }
  }
})
