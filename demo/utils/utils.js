
function http(opt) {
    wx.request({
        url: opt.url,
        data: {},
        method: opt.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
            'content-type': 'json'
        },
        success: function (res) {
            //console.log(res.data)
            if (res.statusCode == 200) {
                opt.success && opt.success(res.data);
            } else {
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                })
            }
        },
        fail: function () {
            // fail
        }
    })
}

function starsToArr(num){
    var result = [];
    var n = parseInt(num/10);
    for(var i = 0, len = 5; i < len; i++){
        if(i<n){
            result.push(1);
        } else {
            result.push(0);
        }
    }
    return result;
}

module.exports = {
    http: http,
    starsToArr: starsToArr
}