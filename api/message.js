import { HTTP } from '../utils/http.js'
class Message extends HTTP{
   //删除消息
    delMessage(data){
     return this.request({
       url:`/message/del/${data}`,
       method:'get'
     })
    }
   //消息接口
   pageList(data){
     return this.request({
       url:'/message/page/list',
       method:'post',
       data
     })
   }
   //获取消息详情
   messageDetail(data){
    return this.request({
      url:`/message/details/${data}`,
      method:'get'
    })
   }
   //获取用户未读消息数
   readNum(){
     return this.request({
       url:'/message/un/read/num',
       method:'get'
     })
   }
   
}
export {Message}