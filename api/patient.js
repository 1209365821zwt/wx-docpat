import { HTTP } from '../utils/http.js'
class PATIENT extends HTTP {
   //解除随访关系接口
    cancelJoin(){
      return this.request({
        url:"/patient/cancel/join",
        method:'get'
      })
    }
    //确认注射接口
    confirmInject(data){
      return this.request({
        url:'/patient/confirm/injection',
        method:'post',
        data
      })
    }
    //获取有医院的省市数据

    //患者是否关联医生
    isLinkHcp(){
       return this.request({
         url:'/patient/isLinkedHcp',
         method:'get'
       })
    }  
    //医生详情
    hcpDetail(data){
      return this.request({
        url:`/patient/hcp/details/${data}`,
        method:'get',
      })
    }
    //获取用户手机号
    getPhone(data){
      return this.request({
        url:'/wx/get/phone',
        method:'post',
        data
      })
    }
    //申请加入医生随访
    joinRelation(data){
        return this.request({
          url:'/patient/join/relation',
          method:'post',
          data
        })
    }
    //患者注射记录列表
    recordList(data){
       return this.request({
         url:'/patient/injection/record/list',
         method:'post',
         data
       })
    }
    //患者我的
    myInfo(){
      return this.request({
        url:'/patient/my/info',
        method:'get'
      })
    }
    //我的保存患者信息
    saveInfo(data){
      return this.request({
        url:'/patient/save/info',
        method:'post',
        data
      })
    }
    // 患者端 注射详情
    patientInjDetails(id){
      return this.request({
        url: '/patient/injection/details/'+id
      })
    }
  
}

export { PATIENT }