// pages/mine/report/report.js
Page({

  data: {
    max:500,
    len:0,
    text:'',
  },

  inputs:function(e){
    this.setData({
      len: e.detail.value.length,
      text: e.detail.value
    })
  },

  reportbutton:function(){
    //提交按钮函数
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确认提交嘛？',
      success(res){
        if (res.confirm) {
          that.report()
        } 
      }
    })
  },

  report:function(){
    //向后台发送举报与反馈的信息
    var that=this.data
    wx.request({
      url: 'http://139.196.121.49/auth/Fankui',
      data:{
        warning:that.text
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      method:'POST',
      success:function(){
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 3000
        })
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '对不起，提交失败，请稍后再试',
        })
      }
    })
  }


})