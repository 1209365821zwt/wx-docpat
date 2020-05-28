// components/patientContent/patientContent.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status:{
      type: Number,
      value: null
    },
    list:{
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
    },
    patientId:{
      type: Number,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:true,
    type: null
  },
  ready(){
    const type = app.globalData.type;
    this.setData({
      type: type
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //跳转详情
    goInjectionRecord(e) {
      let item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '/pages/injectionRecord/injectionRecord?patientId='+ this.data.patientId+'&id=' + item.id ,
      })
    },
    confirm(e){
      wx.navigateTo({
        url: '/pages/followUp/followUp',
      })
    }
  }
})
