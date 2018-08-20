App({

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        var that = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'http://127.0.0.1:5000/getcode',
                        data: {
                            code: res.code
                        },
                        success: function (res) {
                            console.log(res['data']);
                            that.globalData.openid=res['data']
                         },
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });

    },


    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {

    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    },
    globalData: {
        openid:null,
    }

})
