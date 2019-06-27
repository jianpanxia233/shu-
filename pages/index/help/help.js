// pages/register/register3/register3.js
const app = getApp()
Page({
  formSubmit: function (e) {
    wx.request({
      url: 'http://www.sz.shu.edu.cn/api/Sys/Users/Login',
      data: {
        userName: e.detail.value.student_num,
        password: e.detail.value.student_psw
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.errorcode)
        if(res.data.errorcode==0){//学号验证成功
          wx.showModal({
            title: '验证成功！已进入广场页面',
            content: '',
          })
          wx.switchTab({
            url: "/pages/square/square",
          }),
        console.log("yes"),
        wx.request({
            url: 'http://139.196.121.49/auth/authorize',//后端端口
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data:{
            open_id : app.globalData.openid,
            username: e.detail.value.username,
            studentnumber: e.detail.value.student_num,
            studentpassword: e.detail.value.student_psw
            
            //将表单数据全部提交给后端
          },
          success:console.log('ok')
        })
        }
        else{
          console.log("no"),
          wx.showModal({
            title: '验证失败！！',
            content: '',
          })
        }

      }
    })

  },

})