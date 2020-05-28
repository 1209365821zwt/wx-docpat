import { HTTP } from '../utils/http.js'

class minAPI extends HTTP {
  // 医生端 医生个人信息
  doctorDetailMine() {
    return this.request({
      url: '/hcp/my/details'
    })
  }
  // 医生端 保存个人简介
  doctorSavePresentation(presentation){
    let data = {
      presentation
    }
    return this.request({
      url: '/hcp/my/update/presentation',
      method: 'post',
      data
    })
  }
  // 意见反馈
  commonFeedBack(data){
    return this.request({
      url: '/feedback/save',
      method: 'post',
      data
    })
  }
}

export { minAPI }