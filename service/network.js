import {
  baseURL1,
  baseURL2
} from './config.js'

function request(options) {
  wx.showLoading({
    title: '数据加载ing'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL1 + options.url,
      timeout: options.timeout || 5000,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: () =>{
        console.log('网络请求失败，尝试切换接口');
        requestSpare();
      },
      complete: () =>{
        wx.hideLoading()
      }
    })

    function requestSpare() {
      wx.request({
        url: baseURL2 + options.url,
        timeout: options.timeout || 5000,
        method: options.method || 'get',
        data: options.data || {},
        success: (res) =>{
          resolve(res);
          console.log('网络切换成功');
        },
        fail: (err) =>{
          console.log('网络接口异常，请稍后重试');
          reject(err);
        }
      })
    }
  })
}

export default request;
