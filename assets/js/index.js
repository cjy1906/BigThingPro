$(function(){
    //获取用户信息
    getUserInfo();

    // 退出按钮
    $("#btnGoOut").on('click',function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //退出时清除本地的token权限
            localStorage.removeItem('token');
            // 退回登录页面
            location.href='login.html';
            layer.close(index);//确定时关闭提示(取消时自动关闭)
          });
    });
})


//获取用户信息函数
function getUserInfo(){
    $.ajax({
        type:'get',
        url:'/my/userinfo', 
        success:function(res){
           if(res.status!==0){
               return layui.layer.msg('获取用户信息失败');
           }
           senderHead(res.data);//渲染头像与用户名
        }
    })
}

function senderHead(user){ //渲染头像与用户名
    var name=user.nickname || user.username;  //有昵称先渲染昵称
    $("#welcome").html('欢迎&nbsp;&nbsp;'+name);  //渲染欢迎用户
    if(user.user_pic!==null){                  //渲染头像  
        $(".layui-nav-img").attr('src',user.user_pic).show;
        $('.textHead').hide();
    }else{
        $(".layui-nav-img").hide();
        var first=name[0].toUpperCase();
        $('.textHead').html(first).show();
    }
}