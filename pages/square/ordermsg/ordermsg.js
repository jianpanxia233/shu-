// pages/square/ordermsg/ordermsg.js
const app=getApp()
var ordering = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xinxi:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    ordering =  options.ordering;
    console.log('msg:'+ordering)
    wx.request({
      url: 'http://139.196.121.49/auth/ordering?ordering='+ordering,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
            that.setData({
              xinxi: res.data,
            })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit: function () {
    wx.request({
      url: 'http://139.196.121.49/auth/jiedan1',
      data:{
          openid: app.globalData.openid,
          ordering:ordering,
          checked:'1',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:"POST",
      success: function (res) {
        console.log(res.data)
        if (res.data == 'success changed') {
            wx.showModal({
              title: '接单成功',
            })
          wx.switchTab({
            url: '/pages/square/square',
          })
        }
      }
    })
  }
})
