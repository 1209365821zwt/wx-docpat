import { HTTP } from '../utils/http.js'
class API extends HTTP {
  // 找医生接口 搜索列表
  findHcpList(data) {
    return this.request({
      url: '/patient/hcpList',
      method: "post",
      data
    })
  }
  //获取省市接口
  provinceCity(){
     return this.request({
       url:'/common/provinceCityList',
       method:"post"
     })
  }
  //患者搜索历史
  searchistory(){
    return this.request({
      url:'/patient/search/history',
      method:'get'
    })
  }
  //删除患者的搜索历史
  historyDel(){
    return this.request({
      url:'/patient/search/history/del',
      method:'get'
    })
  }

}

export { API }