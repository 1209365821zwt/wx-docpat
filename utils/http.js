import { config } from './config.js';

const tips={
  1:'请求失败',
  2: '不存在'
}
class HTTP {
  request({url, data = {},method = 'GET',header='application/json'}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method,header)
    })
  }
  _show_error(id){
    wx.showToast({
      title: tips[id],
      duration: 1500,
      icon: 'none'
    });
  }
  _request(url, resolve, reject, data = {}, method = 'GET',header = 'application/json') {
    // console.log(url,data,method,'---')
    let token = wx.getStorageSync('loginToken') || 'F0GgRF0hyfDS6tMXoQRPgXzedUrg90kY';
    wx.request({
      url: config.BASE_API + url,
      method: method,
      data: data,
      header: {
        'content-type': header,
        'appkey': config.AppId,
        'token': token,
        'Cookie': 'token=' + token
      },
      success: (res) => {
        const statusCode = res.statusCode;
        if (statusCode == 200){
          const code = res.data.code;
          if(code == 200){
            resolve(res.data.data)
          } else if(code == 401){
            wx.switchTab({
              url: 'pages/index/index',
            })
          }else{
            reject()
            const error_code = res.data.msg
            wx.showToast({
              title: error_code,
              duration: 1500,
              icon: 'none'
            });
          }
        } else {
          reject()
          const error_code = res.errMsg
          this._show_error(error_code)
        }
      },
      fail:(err) => {
        console.log(err, config,'err')
        reject()
        wx.showToast({
          title: err.errMsg,
          duration: 1500,
          icon: 'none'
        });
      }
    })
  }
}

export { HTTP }