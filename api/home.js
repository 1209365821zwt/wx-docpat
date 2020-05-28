import { HTTP } from '../utils/http.js'

class HomeAPI extends HTTP{
  // 医生日历统计
  doctorCalendarList(data){
    return this.request({
      url: '/hcp/my/index/statistics/data',
      method: 'post',
      data
    })
  }
  // 医生端患者列表
  doctorPatientList(data){
    return this.request({
      url: '/hcp/my/index/patient/list',
      method: 'post',
      data
    })
  }
  // 添加患者手机号验证
  getPatientPhone(phone){
    return this.request({
      url:'/hcp/get/code/'+phone,
    })
  }
  // 验证添加患者手机验证码
  getHcpVerifyPhone(phone,code){
    return this.request({
      url: '/hcp/verify/'+ phone + '/' + code
    })
  }
}

export { HomeAPI }