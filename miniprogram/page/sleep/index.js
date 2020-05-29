// page/sleep/index.js
const dateFormat = require('../../miniprogram_npm/miniprogram-licia/dateFormat');
const random = require('../../miniprogram_npm/miniprogram-licia/random');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    currentTime: dateFormat(new Date(), 'yyyy年mm月dd日 HH:MM:ss'),
    minPrize: '0.01',
    maxPrize: '100.00',
    msg: '点了就快去睡觉嗷！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  tapDialogButton(e) {
    this.setData({
      dialogShow: false
    })
  },
  tapSleepButton(e) {
    const now = new Date();
    const sleepTime = dateFormat(sleepTime, 'HH:MM:ss')
    const prize = random(parseFloat(this.data.minPrize), parseFloat(this.data.maxPrize), true).toFixed(2);
    if (this.data.maxPrize <= 0) {
      // return;
    }
    this.setData({
      dialogShow: true,
      sleepTime: sleepTime,
      prize: prize
    });
    this.saveSleep(now, prize);
  },

  saveSleep: function (sleepTime, prize) {
    const date = dateFormat(sleepTime, 'yyyy-mm-dd');
    const db = wx.cloud.database();
    const sleep = db.collection('sleep');
    const userInfo = this.data.userInfo;
    sleep.add({
      data: {
        sleepTime: sleepTime,
        prize: prize,
        date: date,
        userInfo: userInfo
      }
    }).then(res => {
      console.log(res);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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

    var nickName = this.data.userInfo.nickName;
    if (nickName && nickName != '丫头' && nickName.indexOf('葱') < 0) {
      minPrize = 0.00;
      maxPrize = 0.00;
      this.setData({
        msg: '你不是橙宝宝！你是谁！'
      });
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