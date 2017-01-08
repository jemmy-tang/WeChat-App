// pages/movies/movies.js
var app = getApp();
import { http, starsToArr } from "../../utils/utils.js";
import movieTypes from "../../data/movie-types.js";

Page({
  data: {
    movieTypes: movieTypes,
    movieTypesData: [],
    doubanBaseUrl: app.globalData.doubanBaseUrl
  },
  onLoad(options) {
    var self = this,
        param = '?start=0&count=3',
        movieTypesData = [];

    movieTypes.forEach((item, index)=>{
      movieTypesData.push({})
      var url = self.data.doubanBaseUrl + item.path + param;
      self.getMoviesListData(url, index);
    })

    this.setData({
      movieTypesData: movieTypesData
    })
  },

  getMoviesListData(url, index) {
    var self = this;
    http({
      url: url,
      success(res) {
        self.processMoviesData(res, index);
      }
    });
  },
  onMoreMoviesTap(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'more-movies/more-movies?id='+ id
    })
  },

  processMoviesData(data, index) {
    var movieTypesData = this.data.movieTypesData,
        moviesTemp = [];
    data.subjects.forEach((item) => {
      moviesTemp.push({
        title: item.title,
        srcUrl: item.images.large,
        id: item.id,
        average: item.rating.average,
        stars: starsToArr(item.rating.stars)
      })
    })


    movieTypesData[index] = {
      id: index,
      title: movieTypes[index].title,
      movies: moviesTemp
    }

    this.setData({
      movieTypesData: movieTypesData
    })
  }

})