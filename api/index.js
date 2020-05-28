import { HTTP } from '../utils/http.js'

class API extends HTTP {
  // 医生端登录
  doctorLogin(data) {
    return this.request({
      url: '/wx/hcp/login',
      method: "post",
      data
    })
  }
  // 患者登录
  patientLogin(data){
    return this.request({
      url: '/wx/patient/login',
      method: "post",
      data
    })
  }
}

export { API }