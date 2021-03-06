const util = require('../../utils/util.js');
const bmap = require('../../utils/bmap-wx.min.js');
const wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
  },
  setUserInfo(e) {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  fetchData: function() {
    util.showLoading();
    wx.request({
      url: util.url + 'cms/home/index',
      success: res => {
        // console.log(res);
        util.hideLoading();
        this.setData({
          result: res.data.data
        })
      },
      fail: () => util.fail()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'VLbTuYloLvgGQOerwCyNyC3t0vx24OKW'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      console.log(data);
      that.setData({
        city: data.originalData.result.addressComponent.city
      })

    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    });

    // if (!this.data.result) {
    //   this.fetchData();
    // }
    // // console.log(1);
    // if (!wx.getStorageSync('avatarUrl')) {
    //   wx.getUserInfo({
    //     lang: 'zh_CN',
    //     success: res => {
    //       wx.setStorage({
    //         key: 'avatarUrl',
    //         data: res.userInfo.avatarUrl,
    //       })
    //     }
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})