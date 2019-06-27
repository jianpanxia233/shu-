// pages/index/index.js
const app = getApp()
Page({
  jumpPickup: function () {
    wx.navigateTo({
      url: '/pages/index/pickup/pickup',
    })
  },

  jumpPost: function () {
    wx.navigateTo({
      url: '/pages/index/post/post',
    })
  },
  jumpHelp: function () {
    //向后端发送用户id判断是否已经注册
    var openid = app.globalData.openid
    wx.request({
      url: 'http://139.196.121.49/auth/whether?openid='+openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.authstate)
        if (res.data.authstate == '1') {
          console.log('nihao')
          wx.switchTab({
            url: '/pages/square/square',
          })
        }
        else {
          wx.navigateTo({
            url: '/pages/index/help/help',
          })
        }
      },
      fail: function () {
        wx.navigateTo({
          url: '/pages/index/help/help',
        })
        // wx.showModal({ 
        //   title: '提示',
        //   content: '抱歉服务器出错啦！请待会再试',
        // })
      }
    })
  },

  post: function () {
    wx.request({
      url: 'http://www.sz.shu.edu.cn/api/Sys/Users/Login',
      data: {
        userName: '1',
        password: '1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.errorcode)

      }
    })
  },


})