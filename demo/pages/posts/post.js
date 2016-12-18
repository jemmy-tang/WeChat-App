// pages/posts/post.js
//var articleData = require('../../data/article-data.js');
import { postsList } from '../../data/posts-data.js'

Page({
  data: {
  },
  onLoad() {
    this.data.postsList = postsList;
  }
})