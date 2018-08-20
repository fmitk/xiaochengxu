var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        onlyone: false,
        imgpath: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //判断用户进入此页面前是否授权
        console.log(options['imgpath']);
        this.setData({
            imgpath: options['imgpath']
        })
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    app.globalData.senduserInfo = false;
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    formSubmit: function(e) {
        console.log(app.globalData.senduserInfo)
        //console.log('form发生了submit事件，携带数据为：', e.detail.value);
        wx.request({
            url: 'http://127.0.0.1:5000/comment',
            data: {
                comment: e.detail.value['comment'],
                openid: app.globalData.openid
            }
        })
    },
    userInfoHandler: function(e) {
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    //仅发生一次用户数据发送到后台

                    if (app.globalData.senduserInfo) {
                        wx.request({
                            url: 'http://127.0.0.1:5000/userInfo',
                            data: {
                                userInfo: e.detail.userInfo,
                                openid: app.globalData.openid
                            },
                            header: {},
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: function(res) {
                                //console.log(res['data'])
                                app.globalData.senduserInfo = res['data']
                            },
                            fail: function(res) {},
                            complete: function(res) {},
                        });
                    }

                }

            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    vrshow: function(e) {
        var vrpath = e.target.dataset['vrpath'];
        console.log(vrpath)
        wx.navigateTo({
            url: '../vrshow/vrshow?vrpath='+vrpath,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})