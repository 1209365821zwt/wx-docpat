// components/vanCell/index.js
import Dialog from '@vant/weapp/dialog/dialog';
import { config } from '../../utils/config.js';
import { API } from '../../api/doctorApi';
const docAPI = new API();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // options
    columns:{
      type: Array,
      value: ['男','女']
    },
    // 表单类型
    // 'select' 选择   'dataTime' 时间选择器  'input'输入框 'upload'上传 
    inType:{
      type: String,
      value: ''
    },
    info:{
      type:Boolean
    },
    // label宽度
    labelWidth: {
      type: String,
      value: ''
    },
    label:{
      type: String,
      value:''
    },
    // 是否必填
    require:{
      type: Boolean,
      value: false
    },
    // 是否显示右侧icon  
    icon: {
      type: String,
      value: ''
    },
    // 对应的父组件字段名
    key:{
      type: String,
      value: ''
    },
    //默认值
    defValue:{
      type: Number,
      value: null
    },
    // 输入框传值 
    inpValue:{
      type: String,
      value: ''
    },
    // 上传图片接口路径
    src:{
      type: String,
      value: ''
    },
    // 右侧对齐
    rightValue:{
      type: Boolean,
      value: false
    },
    // placeholder
    placeV:{
      type: String,
      value: '请输入'
    },
    // 上传图片是否有buttom_boder
    isBorder: {
      type: Boolean,
      value: true
    },
    // 图片默认值
    urls: {
      type: Array,
      value: []
    },
    delTitle: {
      type: Boolean,
      value: false
    }
  },
  // 监听父组件year的变化
  observers: {
    "defValue,inpValue,urls": function (defValue,inpValue,urls) {
      this.setValue()
      if(this.data.key == "phone" && defValue){
        this.setData({
          itemValue: defValue
        })
      } else if(this.data.key == "phone" && inpValue){
        this.setData({
          itemValue: inpValue
        })
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    itemValue: null,
    currentDate: null,
    show: false,
    fileList: [],
    urlList:[],
    currentList:[]
  },
  //事件处理函数
  ready() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setValue(){
      if (this.data.defValue !== null && this.data.inType !== 'disabled' ) {
        let item = this.data.defValue;
        for (let i = 0; i < this.data.columns.length; i++) {
          if (item == this.data.columns[i].id) {
            this.setData({
              itemValue: i
            }) 
          }
        }
      } else if(this.data.key == 'urls' || this.data.key == "visitRecords"){
        if(this.data.urls && this.data.urls.length ){
          if( this.data.urls[0].url){
            this.setData({
              fileList: this.data.urls
            })
          } else {
            let urls = []
            for(let i = 0; i< this.data.urls.length; i++){
              let arr = {
                url: this.data.urls[i]
              }
              urls.push(arr)
            }
            this.setData({
              fileList: urls
            })
          }
        } else {
          this.setData({
            fileList: this.data.urls
          })
        }
      }else {
        if (this.data.inpValue) {
          this.setData({
            itemValue: this.data.inpValue
          })
        }
      }
    },
    bindPickerChange(e){
      let itemValue = null;
      let ind = null;
      let obj = {
        item: null,
        key: this.data.key
      }
      if (this.data.inType == 'dataTime'){
        itemValue = e.detail.value;
        obj.item = itemValue
      }else if(this.data.inType == "input"){
        itemValue = e.detail;
        obj.item = itemValue
      }else {
        if(this.data.inType == 'searchSelect'){
          ind = Number(e.detail.value);
          itemValue = this.data.currentList[ind].name;
          obj.item = this.data.currentList[ind];
        } else {
          itemValue = Number(e.detail.value)
          obj.item = this.data.columns[itemValue];
        }
      }
      this.setData({
        itemValue
      })
      this.triggerEvent('sendObj', obj)
    },
    // 上传图片
    uploaderAfterReady(e){
      let file = e.detail.file;
      let vm = this;
      wx.showToast({ title: '上传中', icon: 'loading' });
      let token = wx.getStorageSync('loginToken') || 'F0GgRF0hyfDS6tMXoQRPgXzedUrg90kY';
      wx.uploadFile({
        url: config.BASE_API + '/upload/img', 
        filePath: file.path,
        name: 'file',
        formData: {
          'user': 'test'
        },
        header: {
          'token': token,
          "Content-Type": "multipart/form-data"
        },
        success (res){
          if(res.statusCode == 200){
            wx.hideToast()
            let data = res.data ? JSON.parse(res.data) : {};
            let url = data && data.data && data.data.url ? data.data.url : ''
            let file = {
              path: url
            }
            let fileList = []
            fileList = [...vm.data.fileList, file]
            let urlList = [];
            urlList = [...vm.data.urlList, url]
            vm.setData({
              fileList,
              urlList
            })
            let obj = {
              item: vm.data.urlList,
              key: vm.data.key
            }
            vm.triggerEvent('sendObj', obj)
          }else{
            wx.showToast({ title: '上传失败', icon: 'none' });
          }
        },
        fail(rej){
          wx.showToast({ title: '上传失败', icon: 'none' });
        }
      })
    },
    // 删除图片
    deleteReady(e) {
      Dialog.confirm({
        title: '提示',
        message: this.data.delTitle ? '确定要删除图片吗？' :'确定要删除就诊记录吗？',
        confirmButtonText: '确定',
        cancelButtonText: '再想想',
        cancelButtonColor: '#ACB7C4'
      })
      .then(() => {
        this.data.fileList.splice(e.detail.index, 1)
        this.data.urlList.splice(e.detail.index, 1)
        this.setData({
          fileList: this.data.fileList,
          urlList: this.data.urlList
        })
        let obj = {
          item: this.data.fileList,
          key: this.data.key
        }
        this.triggerEvent('sendObj', obj)
      })
      .catch(() => {
        Dialog.close();
      });
    },
    // 科室搜索列表
    _doctorGetDepartmentList(params){
      docAPI.doctorGetDepartmentList(params).then(res => {
        this.setData({
          currentList: res.records ? res.records : []
        })
      })
    },
    // 医院搜索列表
    _doctorGetHciList(params){
      docAPI.doctorGetHciList(params).then(res => {
        this.setData({
          currentList: res.records ? res.records : []
        })
      })
    },
    bindkeyinput(e){
      let search = e.detail || '';
      if(search.trim()){
        let params = {
          search: search.trim(),
          size: 500
        }
        if(this.data.key == 'departments' ){

          this._doctorGetDepartmentList(params)
        } else if(this.data.key == 'hciName'){
          this._doctorGetHciList(params)
        }
      }
    }
  }
})
