//app.js
App({
  globalData: {
    openid: null,
    ordering:null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var that = this
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        var appid = 'wx0f8b20234c28d4ae'
        var secret = '7866a67eb6b8913e65ee145779dd21a8'
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=autherization_code',
          data: {},
          method: 'POST',
          header: {
            'content-type': 'application/json;charset=utf-8',
          },
          success: function (res) {
            console.log(res)
            that.globalData.openid = res.data.openid
            console.log("返回的openid为" + that.globalData.openid)
            wx.getStorageSync('openid', that.globalData.openid)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      fail() {
        console.log("获取登录状态失败")
      }
    })
  }
})