// pages/product_show/product_show.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visibleTabKey: 'desc',
    sku_num: 1,
    product_data: null,
    product_id: null,

    cart_num:0,
    cart_products:null,
    shouldAdd:true,
  },
  addToCart:function(){
    util.showLoading();
    if(this.data.cart_products){
      this.data.cart_products.forEach(v => {
        if (v.product_id === this.data.product_id) {
          this.setData({
            shouldAdd:false
          })
        }
      })
    }
    if(this.data.shouldAdd){
      wx.request({
        url: util.url + 'checkout/cart/add',
        method: 'POST',
        data: {
          custom_option: {},
          product_id: this.data.product_id,
          qty: this.data.sku_num
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'access-token': wx.getStorageSync('access-token'),
          'fecshop-uuid': wx.getStorageSync('uuid')
        },
        success: res => {
          wx.hideLoading();
          if (res.data.code === 200) {
            this.setData({
              cart_num: res.data.data.items_count,
              shouldAdd:false,
            })
          } else if (res.data.code === 1100003) {
            wx.navigateTo({ url: '/pages/login/login' })
          }
        },
        fail: () => util.fail()
      })
    }else{
      wx.showToast({
        title: '已经在购物车中了',
        icon:'none'
      })
    }

    
  },
  addToFavorite: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/product/favorite',
      data: {
        product_id: this.data.product_id
      },
      header: {
        'access-token': wx.getStorageSync('access-token')
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code === 200) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success'
          })
        } else if (res.data.code === 1100003) {
          wx.navigateTo({ url: '/pages/login/login' })
        }
      },
      fail: () => util.fail()
    })
  },

  setSkuNum: function (e) {
    this.setData({
      sku_num: Number(e.detail.value)
    })
  },
  changeVisibleKey: function (e) {
    this.setData({
      visibleTabKey: e.currentTarget.dataset.key
    })
  },
  changeProperty: function (e) {
    this.setData({
      product_id: e.currentTarget.dataset.oid
    })
    this.fetchData();
  },
  minusSkuNum: function () {
    if (this.data.sku_num > 1) {
      this.setData({
        sku_num: this.data.sku_num - 1
      })
    }
  },
  plusSkuNum: function () {

    this.setData({
      sku_num: this.data.sku_num + 1
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_id: options.product_id || '57bab0d5f656f2940a3bf56e'
    })
  },

  fetchData: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/product/index',
      data: {
        product_id: this.data.product_id
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          product_data: res.data.data.product,
          shouldAdd:true
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
    if (!this.data.product_data) {
      this.fetchData()
    }
    wx.request({
      url: util.url + 'checkout/cart/index',
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code === 200) {
          if (!res.data.data.cart_info) {
            wx.navigateTo({ url: '/pages/login/login' })
          } else {
            this.setData({
              cart_num: res.data.data.cart_info.items_count,
              cart_products: res.data.data.cart_info.products
            })
          }
        } else if (res.data.code === 1100003) {
          wx.navigateTo({ url: '/pages/login/login' })
        }
      },
      fail: () => util.fail()
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})