export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 是否为空
 * @param val 
 * @returns {Boolean}
 */

export function isEmpty(val) {
  if (val === '' || val === null || val === undefined) {
      return true
  }
  return false
}

export function timeFn(d1) {
  var reg1 = /\//g;
  let newTime = reg1.test(d1) ? d1 && d1.rplace(reg1,'-') : d1;
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let dateBegin = new Date();//将-转化为/，使用new Date
  let NextTime = new Date(newTime)
  let lastTime = NextTime.setDate(NextTime.getDate()+1); //24小时之后的毫秒数
  let dateDiff = lastTime - dateBegin;//时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  let leave1=dateDiff%(24*3600*1000) //计算天数后剩余的毫秒数
  let hours=Math.floor(leave1/(3600*1000))//计算出小时数
  //计算相差分钟数
  let leave2=leave1%(3600*1000) //计算小时数后剩余的毫秒数
  let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
  //计算相差秒数
  let leave3=leave2%(60*1000) //计算分钟数后剩余的毫秒数
  let seconds=Math.round(leave3/1000);
  let timeD = hours+"小时"+minutes+"分钟"
  return timeD
}