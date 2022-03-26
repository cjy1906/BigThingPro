// 
// 每次调用ajax之前都会先调用这个函数
// 
$.ajaxPrefilter(function (options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url;//拼接根路径

    if (options.url.indexOf('/my')!==-1) {
        options.headers = {   // headers要严格区分大小写
            Authorization: localStorage.getItem('token') || ''
        }                                                       //统一提交绑定权限的请求头
    }

    // 全局统一验证是否登录
        //无论ajax请求成功与否,都会调用complete这个回调函数
    options.complete=function(res){
        // res.responseJSON为服务器返回的数据
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！')
        {
            //强制清空token并强制跳转登录页面
            localStorage.removeItem('token');
            location.href='login.html';
        }
    }

})