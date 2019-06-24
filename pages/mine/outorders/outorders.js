// pages/swiperTab/swiperTab.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    price: "6.6",
    place: "菜鸟驿站",
    picktime: "2019.6.21/17:00",
    time: "2019.6.21/18:00",
    click: "取消订单"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    wx.request({
      url: '',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          if (options.data.key == 0)
            that.setData({
              userdata0: res.data,
            })
          else
            that.setData({
              userdata: res.data,
            })
        } else {
          console.log('获取失败');
        }
      }
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    // that.setData({
    //   currentTab: 1//当前页的一些初始数据，视业务需求而定
    // })
    //console.log(currentTab)
    this.onLoad(); //重新加载onLoad()
  },
})
