const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['小', '中', '大'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
    imgList: [],
  },

  formSubmit: function (e) {
    // console.log(e.detail.value)
    var that = this.data
    if (e.detail.value.reward != '' && e.detail.value.contactnumber != '' && e.detail.value.place != '') {
      wx.request({
        url: 'http://127.0.0.1:8000/auth/send',
        data: {
          reward: e.detail.value.reward,
          contactnumber: e.detail.value.contactnumber,
          startplace: e.detail.value.startplace,
          packagesize: that.picker[e.detail.value.pickagesize],
          time: e.detail.value.time + e.detail.value.date,
          notes: e.detail.value.notes
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function () {
          wx.showModal({
            title: '提示',
            content: '发布成功,为您跳转到首页',
          }),
            wx.switchTab({
              url: '/pages/index/index',
            })
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            content: 'sorry，提交失败了！',
          })
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请填写完整哦！',
        confirmText: '好的',
        cancelText: '不填了',
      })
    }
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
})