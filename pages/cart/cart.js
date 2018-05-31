// pages/cart/cart.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAll:null,
    cart_info: null
  },
  updateInfo:function(e){
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/updateinfo',
      method: 'POST',
      data: {
        up_type: e.currentTarget.dataset.type,
        item_id: e.currentTarget.dataset.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.fetchData();
      },
      fail: () => util.fail()
    })
  },
  toggleSelectOne:function(e){
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/selectone',
      method: 'GET',
      data: {
        item_id: e.currentTarget.dataset.id,
        checked: e.currentTarget.dataset.active ? 0 : 1
      },
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.fetchData();
      },
      fail: () => util.fail()
    })
  },
  toggleSelectAll: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/selectall',
      method: 'GET',
      data:{
        checked: this.data.selectedAll?0:1
      },
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.fetchData();
      },
      fail: () => util.fail()
    })
  },
  countSelected:function(){
    return 
  },
  fetchData: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/index',
      method: 'GET',
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
            let v = res.data.data;
            let n = 0;
            v.cart_info.products.forEach(v=>{
              if(v.active){
                n = n + 1
              }
            })
            this.setData({
              cart_info:v.cart_info,
              selectedAll: n == v.cart_info.items_count
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (!this.data.cart_info) {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})