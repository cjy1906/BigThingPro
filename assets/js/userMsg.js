$(function(){
    var form=layui.form;

    form.verify({  //验证表单
        nickname:function(value){
            if(value.length>6)
            return '昵称长度必须在1~6个字符之间'
        }
    });

    getUserMsg();//获取用户信息
})

// 初始化（获取）用户基本信息
function getUserMsg(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取用户信息失败！');
            }
            $("#id").val(res.data.id);
            $("#username").val(res.data.username);
            $("#nickname").val(res.data.nickname);
            $("#email").val(res.data.email);
        }
    })
}

// 重置事件
$("#btnReset").on('click',function(e){
    e.preventDefault();
    getUserMsg();
})

//修改基本信息
$(".layui-form").on('submit',function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:"/my/userinfo",
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0)
            return layer.msg('更新用户信息失败!');

            layer.msg('更新用户信息成功！');
            // 调用父页面的方法更新头像以及欢迎的用户名称
            window.parent.getUserInfo();

        }
    })
})