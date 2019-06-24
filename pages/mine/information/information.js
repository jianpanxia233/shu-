const app = getApp()
Page({

  data: {
    myinfo:{}
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/auth/xinxi?openid=' + app.globalData.openid,
      header: {
        'content-type': 'applciation/json'
      },
      method: 'GET',
      success:function(res){
        console.log(res.data);
        that.setData({
        myinfo:res.data
        })
      }
    })
  },

  jumpsure:function(){
    if (this.data.myinfo.authstate == null || this.data.myinfo.authstate =='0'){
      wx.navigateTo({
        url: '/pages/index/help/help',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '你已通过验证',
      })
    }
    
  }
})