// components/patientHeader/patientHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hcpDetail: {
      type: Object,
      value: {}
    },
    status:{
      type: Number,
      
    },
    value:{
      type:Number,
      
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
   refuse:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpDetail(e){
    if(this.data.status==1 || this.data.status==2){
      let code=e.currentTarget.dataset && e.currentTarget.dataset.item && e.currentTarget.dataset.item.hcpCode || null;
      wx.navigateTo({
        url: '/pages/pasdocDetail/index?code='+code
      })
    }
 
    },
  
  }
})
