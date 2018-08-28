var app = getApp()
Page({
    panoid: null,
    /**
     * 页面的初始数据
     */
    data: {
        onlyone: false,
        imgpath: null,
        inputvalue: null,
        commentInfos: null,
        length: null,
        btndata:true,   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.panoid = options['panoid'];
        this.setData({
            imgpath: options['imgpath'],
            
    });
        //判断用户进入此页面前是否授权
        var that=this;
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        //console.log("id为:"+this.panoid);
        //服务器端获取所有用户评论数据
        var that = this;
        
        wx.request({
            url: 'https://www.zxz2017.cn/flask/returnComment',
            data: {
                panoid: this.panoid
            },
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                //console.log(res['data']);
                var length = res['data'].length;
                //var date = new Date(res['data'][15]['time']).getUTCDate();
                //var day = date.getDate();
                //console.log(date)
                //时间格式转换

                var data = res['data'];
                for (var i = 0; i < data.length; i++) {
                    var date = new Date(res['data'][i]['time']);
                    var year = date.getUTCFullYear();
                    var month = date.getUTCMonth() + 1;
                    var day = date.getUTCDate();
                    res['data'][i]['time'] = year + "年" + month + "月" + day + "日";
                }

                that.setData({
                    commentInfos: res['data'],
                    length: length,
                })
            },
            fail: function(res) {},
            complete: function(res) {},
        })
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
        var that = this;
        var comment = e.detail.value['comment'];

        //console.log('form发生了submit事件，携带数据为：', e.detail.value);
        //设置为授权后方可评论
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    if (comment.trim()) {
                        wx.request({
                            url: 'https://www.zxz2017.cn/flask/comment',
                            data: {
                                comment: comment,
                                openid: app.globalData.openid,
                                panoid: that.panoid,
                            },
                            success: function(res) {
                                
                                //console.log(res['data'])
                                if (res['data']) {
                                    wx.showToast({
                                        title: '评论成功',
                                        icon: 'success',
                                        image: '',
                                        duration: 2000,
                                        mask: true,
                                        success: function(res) {},
                                        fail: function(res) {},
                                        complete: function(res) {},
                                    });
                                }
                            }
                        });
                        wx.request({
                            url: 'https://www.zxz2017.cn/flask/returnComment',
                            data: {
                                panoid: that.panoid
                            },
                            header: {},
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: function(res) {
                                //console.log(res['data']);
                                var length = res['data'].length;
                                //时间格式转换
                                var data = res['data'];
                                for (var i = 0; i < data.length; i++) {
                                    var date = new Date(res['data'][i]['time']);
                                    var year = date.getUTCFullYear();
                                    var month = date.getUTCMonth() + 1;
                                    var day = date.getUTCDate();
                                    res['data'][i]['time'] = year + "年" + month + "月" + day + "日";
                                }
                                console.log(res['data']);
                                that.setData({
                                    commentInfos: res['data'],
                                    length: length,
                                });
                            },
                            fail: function(res) {},
                            complete: function(res) {},
                        });
                        that.setData({
                            inputvalue: null,
                        });
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '没有填写评论内容',
                            showCancel: false,
                            cancelText: '取消',
                            cancelColor: '',
                            confirmText: '确定',
                            confirmColor: '',
                            success: function(res) {},
                            fail: function(res) {},
                            complete: function(res) {},
                        })
                    }
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        });
    },
    transdata:function(e){
        console.log("授权中...")
        
        this.setData({
            btndata:true
        })
    },
    oncetran:function(e){

        var that=this;

        wx.getSetting({
            success: function(res) {
                if (!res.authSetting['scope.userInfo']){
                    wx.showModal({
                        title: '提示',
                        content: '点击下方授权按钮，对该小程序授权',
                        showCancel: true,
                        cancelText: '取消',
                        cancelColor: '#000',
                        confirmText: '确定',
                        confirmColor: '#3CC51F',
                        success: function(res) {
                            if(res.confirm){
                                that.setData({
                                    btndata: false,
                                })
                            }
                        },
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                    
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
            url: '../vrshow/vrshow?vrpath=' + vrpath,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})