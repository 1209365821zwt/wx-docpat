import { HTTP } from '../utils/http.js'

class API extends HTTP {
  //医生端 增加患者   
  doctorSavePatient(data){
    return this.request({
      url: '/hcp/join/relation',
      method:'post',
      data
    })
  }
  // 医生端 患者信息
  doctorGetPatient(id){
    return this.request({
      url: '/hcp/patient/details/'+id
    })
  }
  // 医生端 患者详情注射记录
  doctorPatientRecord(data){
    return this.request({
      url: '/hcp/patient/injection/record',
      method: 'post',
      data
    })
  }
  // 医生端 患者注射详情确认
  doctorConfirmInjection(data){
    return this.request({
      url: '/hcp/confirm/injection',
      method: 'post',
      data
    })
  }
  // 医生端 患者注射详情确认
  doctorInjDetails(id){
    return this.request({
      url: '/hcp/patient/injection/details/'+id
    })
  }
  // 医生端  保存患者备注
  doctorSavePatientRemarks(data){
    return this.request({
      url: '/hcp/save/patient/remarks',
      data,
      method: 'post'
    })
  }
  // 医生端 医院搜索
  doctorGetHciList(data){
    return this.request({
      url: '/hci/page/list',
      method: 'post',
      data
    })
  }
  // 医生端 科室搜索
  doctorGetDepartmentList(data){
    return this.request({
      url: '/department/page/list',
      method: 'post',
      data
    })
  }
  // 医生端 保存医生信息
  doctorSaveDoctorInfo(data){
    return this.request({
      url: '/hcp/my/save/info',
      method: 'post',
      data
    })
  }
  // 医生端 同意加入随访
  doctorAgreeRelation(relationId){
    return this.request({
      url: '/hcp/relation/agree/'+relationId
    })
  }
  // 医生端 拒绝加入随访
  doctorRefuseRelation(relationId){
    return this.request({
      url: '/hcp/relation/refuse/'+relationId
    })
  }
  // 医生端 获取二维码
  doctorGetCodeUnlimit(data){
    return this.request({
      url: '/wx/get/code/unlimit',
      method: 'post',
      data
    })
  }
}

export { API }
