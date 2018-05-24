const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuShow: false,
    sortColumn: null,
    id: null,
    currentPage: 1,
    totalPage: null,
    products: null
  },
  
  show: function () {
    this.setData({
      menuShow: !this.data.menuShow
    })
  },

  set: function (e) {
    if (this.data.menuShow) {
      this.setData({
        menuShow: false
      })
    }
    if (!e.currentTarget.dataset.key) {
      this.setData({
        sortColumn: null
      })
    };

    this.setData({
      sortColumn: e.currentTarget.dataset.key
    })
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/category/index?categoryId=' + this.data.id + "&sortColumn=" + this.data.sortColumn,
      success: res => {
        wx.hideLoading();
        this.setData({
          products: res.data.data.products,
          currentPage: 1,
          totalPage: res.data.data.page_count
        });
      },
      fail: () => util.fail()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || '57bea0e3f656f275313bf56e'
    })
  },

  fetchData: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/category/index?categoryId=' + this.data.id,
      success: (res) => {
        wx.hideLoading();
        this.setData({
          totalPage: res.data.data.page_count,
          products: res.data.data.products
        })
      },
      fail: () => util.fail()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.products) {
      this.fetchData();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    if (this.data.currentPage > this.data.totalPage) {
      return;
    }
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/category/product?categoryId=' + this.data.id + '&p=' + this.data.currentPage,
      success: res => {
        wx.hideLoading();
        let arr = this.data.products.concat(res.data.data.products);
        this.setData({
          products: arr
        })
      },
      fail: () => util.fail()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})