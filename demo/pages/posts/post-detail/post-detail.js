// pages/posts/post-detail/post-detail.js
import { postsList } from '../../../data/posts-data.js'

Page({
  data: {},
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    //根据url的参数，从postsList中找到对应的数据
    for (var i = 0, len = postsList.length; i < len; i++) {
      if (postsList[i].postId == postId) {
        this.setData({
          postData: postsList[i]
        })
      }
    }
    //检测是否收藏
    this.checkCollectedStatus(postId);
  },
  onCollectTap() {
    this.showCollectModal();
  },
  checkCollectedStatus(postId) {
    //获取数据缓存
    var allStatus = wx.getStorageSync('collectedStauts') || {};
    var isCollected = allStatus[postId];
    //设置文章的当前状态，并转换成Boolean值，用于当前页状态显示用
    this.setData({
      isCollected: !!isCollected
    })
  },
  showCollectModal() {
    var self = this;

    var isCollected = this.data.isCollected;
    wx.showModal({
      title: isCollected ? '取消收藏' : '收藏',
      content: isCollected ? '确定取消收藏？' : '确定收藏？',
      success: function(res){
        //确定改变收藏状态
        res.confirm && self.changeCollectStatus(isCollected)
      }
    })
  },
  changeCollectStatus(isCollected){
    var self = this;
    var postId = this.data.postData.postId;
    //获取当前所有收藏状态
    var allStatus = wx.getStorageSync('collectedStauts') || {};
    this.setData({
      isCollected: !isCollected
    })
    //修改当前文章的收藏状态
    allStatus[postId] = !isCollected;
    console.log(allStatus)
    //更新设置缓存状态
    wx.setStorage({
      key: 'collectedStauts',
      data: allStatus,
      success: function(){
        //修改成功提示
        self.changeSuccess();
      }
    });
  },
  changeSuccess(){
    wx.showToast({
      title: '成功'
    })
  },
  onShareTap() {
    //分享
    var itemList = [
        'QQ好友',
        'QQ朋友圈',
        '微信好友',
        '微信朋友圈'
      ];
    wx.showActionSheet({
      itemList: itemList,
      success: function(res){
        if(res.cancel){
          //点击了取消
        } else {
          wx.showModal({
            title: '分享至' + itemList[res.tapIndex],
            content: '功能尚未开发完成，请耐心等待，谢谢！',
            showCancel: false,
            confirmText: '关闭'
          })
        }
      }
    })
  }
})