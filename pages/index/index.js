var app = getApp();
Page({


    /**
     * 页面的初始数据
     */
    data: {
        panoInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: 'https://www.zxz2017.cn/flask/panoInfo',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                console.log(res['data']);
                that.setData({
                    panoInfo: res['data']
                })
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
        console.log("页面隐藏");
        app.globalData.gbtndata=false;
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
    comment: function(e) {
        //console.log(e.target.dataset['panoid'])
        var imgpath = e.target.dataset['imgpath'];
        var panoid = e.target.dataset['panoid']
        wx.navigateTo({
            url: '../comment/comment?panoid=' + panoid + '&imgpath=' + imgpath+'&btndata=true'
        })
    },

    userInfoHandler: function(e) {
        wx.getSetting({
            success: function(res) {
                if (!res.authSetting['scope.userInfo']) {
                    //仅发生一次用户数据发送到后台
                        wx.request({
                            url: 'https://www.zxz2017.cn/flask/userInfo',
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
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
})