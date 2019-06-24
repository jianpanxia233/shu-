// pages/mine/mine.js
const app = getApp()
Page({
  data: {
    
  },
  onLoad:function(){
    var that = this.data
    wx.request({
      url: 'http://127.0.0.1:8000/auth/authorize',
      data:{
        openid:app.globalData.openid
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
      console.log("5555")
      }
    })
  }
})