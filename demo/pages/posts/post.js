// pages/posts/post.js
//var articleData = require('../../data/article-data.js');
import { postsList } from '../../data/posts-data.js'

Page({
  data: {
  },
  onLoad() {
    this.setData({
      postsList: postsList
    })
  },
  gotoDetailPage(event) {
    var postId = event.currentTarget.dataset.postid;

    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap(event) {
    var postId = event.target.dataset.postid;

    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})