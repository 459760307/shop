const showLoading = () => {
  wx.showNavigationBarLoading();
}
const hideLoading = () => {
  wx.hideNavigationBarLoading();
}
const fail = function(tip = "加载失败") {
  wx.hideNavigationBarLoading();
  wx.showToast({
    title: tip,
    icon: 'none'
  })
}
module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  fail: fail,
  url: 'http://appserver.uekuek.com/'
}