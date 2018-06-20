const showLoading = (tip = "正在加载") => {
  wx.showLoading({
    title: tip,
    mask: true
  })
}
const fail = function(tip = "加载失败") {
  wx.hideLoading();
  wx.showToast({
    title: tip,
    icon: 'none'
  })
}
const auth = function() {
  if (wx.getStorageSync('access-token')) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
  showLoading: showLoading,
  fail: fail,
  auth,
  url: 'http://appserver.uekuek.com/'
}