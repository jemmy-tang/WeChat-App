// pages/movies/more-movies/more-movies.js
var app = getApp();
import movieTypes from '../../../data/movie-types.js';
import { http, starsToArr } from "../../../utils/utils.js";

Page({
  data:{
    movies: [],
    id: '',
    doubanBaseUrl: app.globalData.doubanBaseUrl,
    isLoading: false,
    isLoadingMore: false,
    hasMore: false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //console.log(options)
    this.setData({
      id: options.id,
      scrollH: wx.getSystemInfoSync().windowHeight
    });
    this.getMovies();
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: movieTypes[this.data.id].title
    })
  },
  onPullDownRefresh: function(){
    //下拉刷新
    this.getMovies(true);
  },
  onScrolltolower(){
    //上拉加载更多
    if(!this.data.hasMore || this.data.isLoadingMore) return;
    //console.log('加载更多...')
    this.setData({
      isLoadingMore: true
    })
    this.getMovies();
  },
  getMovies(isPullDownRefresh){
    //获取电影列表数据
    var self = this,
        start = isPullDownRefresh ? 0 : self.data.movies.length;
    http({
      url: self.data.doubanBaseUrl + movieTypes[self.data.id].path + '?start='+ start +'&count=15',
      success(res) {
        self.processMoviesData(res, isPullDownRefresh);
      }
    });
  },
  processMoviesData(data, isPullDownRefresh) {
    //console.log(data);
    var moviesTemp = [];
    data.subjects.forEach((item) => {
      moviesTemp.push({
        title: item.title,
        srcUrl: item.images.large,
        id: item.id,
        average: item.rating.average,
        stars: starsToArr(item.rating.stars)
      })
    })

    this.setData({
      movies: isPullDownRefresh ? moviesTemp : this.data.movies.concat(moviesTemp),
      hasMore: this.data.movies.length < data.total,
      isLoadingMore: false
    })

    wx.stopPullDownRefresh();
  }
})