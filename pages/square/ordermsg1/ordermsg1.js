// pages/square/ordermsg/ordermsg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picknum: "000002",
    price: "6.6",
    contact: "18817297728",
    pickplace: "上海大学",
    aimplace: "北京大学",
    size: "3kg",
    data: "2019.7.2/14:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
      data: {
        key: this.data.picknum,
        openid: app.globalData.openid,
        flag: "1"
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        if (res.data.error_code == 0) {
          if (options.data.key == 0)
          wx.showModal({
            title: '接单成功！',
            content: '',
          })
        } else {
          console.log('获取失败');
        }
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

  }
})