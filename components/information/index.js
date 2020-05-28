// components/information/information.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    informationList:{
      type:Array
    },
    type:{
      type:'String'
    },
    noMore:{
    type:Boolean
    },
    docMessage:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight:null
  },

  /**
   * 组件的方法列表
   */
  ready(){
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      },
    })
  },
  methods: {
    toDetailsTap: function (e) {
      let id = e.currentTarget.dataset.ids;
      wx.navigateTo({
        url: "/pages/informationDetail/informationDetail?id=" + id
      })
    },
    handClick(event) {
      let id = event.currentTarget.dataset.id;
      //删除的接口
      this.triggerEvent('delclick',id)
    },
    scrolltolower(e){
      this.triggerEvent('scroll',e)
     }
  },
 
})
