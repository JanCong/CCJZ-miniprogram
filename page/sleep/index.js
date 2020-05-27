// page/sleep/index.js
const dateFormat = require('../../miniprogram_npm/miniprogram-licia/dateFormat');
const random = require('../../miniprogram_npm/miniprogram-licia/random');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    currentTime: dateFormat(new Date(), 'yyyy年mm月dd日 HH:MM:ss'),
    minPrize: '0.01',
    maxPrize: '100.00',
    msg: '点了就快去睡觉嗷！'
  },

  tapDialogButton(e) {
    this.setData({
      dialogShow: false
    })
  },
  tapSleepButton(e) {
    var now = new Date();
    var sleepTime = dateFormat(now, 'HH:MM:ss')
    var prize = random(parseFloat(this.data.minPrize), parseFloat(this.data.maxPrize), true).toFixed(2);
    this.setData({
      dialogShow: true,
      sleepTime: sleepTime,
      prize: prize
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInit();
    setInterval(() => {
      this.loadInit();
    }, 1000);
  },

  loadInit: function () {
    var now = new Date();
    var minPrize = 0.01;
    var maxPrize = 100.00;
    if (now < new Date(dateFormat(now, 'yyyy/mm/dd 00:30:00'))) {
      minPrize = 0.01;
      maxPrize = 10.00;
      } else if (now < new Date(dateFormat(now, 'yyyy/mm/dd 6:00:00'))) {
        minPrize = 0.00;
        maxPrize = 0.00;
        this.setData({
          msg: '今天不乖，没有奖励！'
        });
      } else if (now < new Date(dateFormat(now, 'yyyy/mm/dd 20:00:00'))) {
        minPrize = 0.00;
        maxPrize = 0.00;
        this.setData({
          msg: '今天这么早睡？！别瞎点嗷！'
        });
    } else if (now < new Date(dateFormat(now, 'yyyy/mm/dd 22:00:00'))) {
      minPrize = 50.00;
      maxPrize = 100.00;
    } else if (now < new Date(dateFormat(now, 'yyyy/mm/dd 23:00:00'))) {
      minPrize = 10.00;
      maxPrize = 50.00;
    } else if (now <= new Date(dateFormat(now, 'yyyy/mm/dd 23:59:59'))) {
      minPrize = 0.01;
      maxPrize = 30.00;
    }
    this.setData({
      currentTime: dateFormat(now, 'yyyy年mm月dd日 HH:MM:ss'),
      minPrize: minPrize.toFixed(2),
      maxPrize: maxPrize.toFixed(2)
    });
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