// pages/welcome/welcome.js
var app = getApp();
Page({
  data: {
    motto: 'Hello',
    userInfo: {}
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      console.log(userInfo)
    })
  },
  onRedirectToStart() {
    wx.switchTab({
      url: '../posts/post'
    })
  }
})