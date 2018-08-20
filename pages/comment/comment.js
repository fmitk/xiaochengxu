var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        onlyone:false,
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

    },
    formSubmit: function (e) {
        //console.log('form发生了submit事件，携带数据为：', e.detail.value);
        
        console.log(app.globalData.openid)
        wx.request({
            url: 'http://127.0.0.1:5000/comment',
            data: {
                comment: e.detail.value['comment'],
                openid: app.globalData.openid
            }
        })
    },
    userInfoHandler: function (e) {
        var that=this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.request({
                        url: 'http://127.0.0.1:5000/userInfo',
                        data: {
                            userInfo:e.detail.userInfo,
                            openid:app.globalData.openid
                        },
                        header: {},
                        method: 'GET',
                        dataType: 'json',
                        responseType: 'text',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                    });
                    that.setData({
                        onlyone:true
                    })

                }

            },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
})