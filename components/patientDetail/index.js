// components/vanCell/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    patient: {
      type: Object,
      value: {}
    },
    isSetting:{
      type: Boolean,
      value: false
    },
    patientId: {
      type: Number,
      value: null
    }
  },
  methods:{
    //跳转详情
    jumpDetail(e) {
      let item = JSON.stringify(e.currentTarget.dataset.item);
      let status = this.data.status
      wx.navigateTo({
        url: '/pages/pasdocDetail/index?detail=' + item + '&status=' + status,
      })
    },
    // 患者信息
    goSetting(){
      if(this.data.isSetting){
        let info = JSON.stringify(this.data.patient)
        wx.navigateTo({
          url: '../../pages/PatientInfo/PatientInfo?patientId='+ this.data.patientId+'&patient='+info
        })
      }
    }
  }
})
