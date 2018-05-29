// pages/register/register.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      captcha: null
    },
    captchaPic:null
  },
  submit:function(){
    util.showLoading();
    wx.request({
      url: util.url +'customer/register/account',
      header:{
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      data:this.data.formData,
      success:res=>{
        wx.hideLoading();
        console.log(res);
      },
      fail:()=>util.fail()
    })
  },
  updateFormData:function(e){
    let o = this.data.formData;
    o[e.currentTarget.dataset.key] = e.detail.value;
    this.setData({
      formData:o
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
    wx.request({
      url: util.url + 'customer/site/captcha',
      success:res=>{
        this.setData({
          captchaPic:res.data.data.image
        })
      }
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