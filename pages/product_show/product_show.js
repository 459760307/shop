// pages/product_show/product_show.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_data:null,
    product_id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_id: options.product_id || '57bab0d5f656f2940a3bf56e'
    })
  },

  fetchData:function(){
    util.showLoading();
    wx.request({
      url:util.url+'catalog/product/index',
      data:{
        product_id:this.data.product_id
      },
      success:res=>{
        wx.hideLoading();
        this.setData({
          product_data:res.data.data.product
        })
      },
      fail:()=>util.fail()
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
    if(!this.data.product_data){
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