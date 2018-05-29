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
  },
  addToFavorite:function(){
    util.showLoading();
    wx.request({
      url: util.url+'catalog/product/favorite',
      data:{
        product_id:this.data.product_id
      },
      success:res=>{
        console.log(res);
        wx.hideLoading();
        if(res.data.code === 1100003){
          wx.setStorage({
            key: "uuid",
            data: res.header['Fecshop-Uuid']
          });
          wx.navigateTo({url:'/pages/login/login'})
        }
      },
      fail:()=>util.fail()
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
          product_data: res.data.data.product
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