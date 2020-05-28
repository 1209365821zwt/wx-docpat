// components/searchList/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     List:{
       type:Array
       
     },
     bindSource:{
        type:Array,
        observer:'_setStatus'
     },
    inputValue:{
      type:String,
    },
    hiddenList:{
      type:Boolean
    },
    noMore:{
      type:Boolean
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchArray: [],
    keyName: '',
    searchArr:[],
    status:0,
    windowHeight:null,
    twoSearchList:[]

  },
  //事件处理函数
  ready() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      },
    })
  },
  methods: {
    _setStatus(newVal){
      let twoSearchList=[];
      let val=this.data.inputValue;
      let htmlstr=null
      let reg=new RegExp("(" + val + ")", "g");
      newVal.forEach(item=>{
        if(item.departments.indexOf(val)>-1){
          htmlstr=item.departments.replace(reg,"<font style='color: #FF4500'>$1</font>");
          item.depStr=htmlstr;
          twoSearchList.push(item);
        }else if(item.hcpName.indexOf(val)>-1){
          htmlstr=item.hcpName.replace(reg,"<font style='color: #FF4500'>$1</font>");
          item.hcpStr=htmlstr;
          twoSearchList.push(item);
        }else if(item.hciName.indexOf(val)>-1){
          htmlstr=item.hciName.replace(reg,"<font style='color: #FF4500'>$1</font>");
          item.hciStr=htmlstr;
          twoSearchList.push(item);
        }
      })
      this.setData({
        twoSearchList
      })
    },
    getHilightStrArray: function (str, key) {
      return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
    },
    scrolltolower(e) {
      this.triggerEvent('scroll',e)
    },
    //跳转页面
    jumpclick(e){
      let details=e.currentTarget.dataset.item;
      this.triggerEvent('doctorDetail',details)
    }
  }
})
