// pages/swiperTab/swiperTab.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xinxi:{}
    // price: "6.6",
    // place: "菜鸟驿站",
    // picktime: "2019.6.21/17:00",
    // time: "2019.6.21/18:00",
    // click: "取消订单"
  },
  finish: function (e) {
    var that = this;
    var ordering = e.currentTarget.dataset.ordering;
    wx.request({
      url: 'http://139.196.121.49/auth/finish1',
      data: {
        ordering: ordering,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {
        wx.showModal({
          title: '提示',
          content: '感谢您的帮助',
        })
      }
    })
  },
  cancelorder: function (e) {
    var that=this;
    var ordering = e.currentTarget.dataset.ordering;
    wx.showModal({
      title: '提示',
      content: '您确定要取消订单吗？',
      cancelText: '再想想',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://139.196.121.49/auth/qvxiao',
            data: {
              openid: app.globalData.openid,
              ordering: ordering,
              checked:'0'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success(res) {
              wx.showModal({
                title: '提示',
                content: '已为您取消订单',
              })
            },
            fail(res) {
              wx.showModal({
                title: '提示',
                content: '抱歉服务器错误，订单暂未取消',
              })
            }
          })

        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    wx.request({
      url: 'http://139.196.121.49/auth/wodejijian',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          xinxi: res.data
        })
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
