 // pages/swiperTab/swiperTab.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    currentTab:app.globalData.currentTab,
    userdata:[],
    userdata0:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    var that = this
    wx.request({
      url: 'http://139.196.121.49/auth/pickup',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
          that.setData({
            userdata:res.data,
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
    var that = this;
    // that.setData({
    //   currentTab: 1//当前页的一些初始数据，视业务需求而定
    // })
    //console.log(currentTab)
    this.onLoad(); //重新加载onLoad()
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
  /**
   * 导航标签选择1）
   */
  swichNav: function (e) {
    //console.log(e);
    var that = this;
    wx.request({
      url: 'http://139.196.121.49/auth/send',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          userdata0: res.data,
        })

      }
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    this.setData({
      flag: e.target.dataset.current
    })
    //console.log(this.data.flag)
  },
  /**
   * 导航页面显示2）
   */
  swiperChange: function (e) {
    //console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  fordetail: function (e) {
    var that=this;
    var ordering = e.currentTarget.dataset.ordering;
    console.log(ordering)
    var openid = app.globalData.openid
    wx.request({
      url: 'http://139.196.121.49/auth/whether?openid=' + openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.authstate)
        if (res.data.authstate == '1') {
          console.log('nihao')
          wx.navigateTo({
            url: '/pages/square/ordermsg/ordermsg?ordering=' + ordering,
          })
        }
        else {
          wx.showModal({
            title: '您尚未注册',
            content: '请点击首页帮忙取件/寄件',
          })
        }
      }
    })

  },
  fordetail1: function (e) {
    var that = this;
    var ordering = e.currentTarget.dataset.ordering;
    console.log(ordering)
    var openid = app.globalData.openid
    wx.request({
      url: 'http://139.196.121.49/auth/whether?openid=' + openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.authstate)
        if (res.data.authstate == '1') {
          console.log('nihao')
          wx.navigateTo({
            url: '/pages/square/ordermsg1/ordermsg1?ordering=' + ordering,
          })
        }
        else {
          wx.showModal({
            title: '您尚未注册',
            content: '请点击首页帮忙取件/寄件',
          })
        }
      }
    })

  }
})
