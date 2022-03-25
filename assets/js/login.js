$(function(){
    // 点击去注册的链接
    $('#link_reg').on('click',function(){
        $('.login_box').hide();
        $('.reg_box').show();
    })

    // 点击去登录的链接
    $('#link_login').on('click',function(){
        $('.reg_box').hide();
        $('.login_box').show();
    })

    //基于layui.js 自定义表单验证规则
    var form=layui.form;
    form.verify({
        required:[
            /^[\S]+$/,                                        //规则
            '请填写账号和密码'                      //提示信息
        ],
        pwd:[
            /^[\S]{6,12}$/,                                        //规则
            '密码必须6到12位,且不能出现空格'                       //提示信息
        ],
        repwd:function(value){  //value：表单的值、item：表单的DOM对象(item可无)
            var pwd=$('#reg_pwd').val();
            if(pwd!==value)
            return "两次密码不一致";           //返回提示信息
        }
    })



    //注册表单的提交事件
    $("#reg_form").on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        // 发起post请求
        $.post('/api/reguser',
        {username:$('#reg_user').val(),password:$('#reg_pwd').val()},
        function(res){
           if(res.status!==0)
           return layer.msg(res.message);
           layer.msg('注册成功,请登录！');
           $("#link_login").click();
        })
    }) 

    //登录事件
    $("#login_form").on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        // 发起post请求
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$("#login_form").serialize(),
            success:function(res){
               if(res.status!==0)
               return layer.msg("登录失败！");
               
               layer.msg("登录成功！");
            //    token为登录成功的权限值，需保存起来
            localStorage.setItem('token',res.token);

               location.href="./index.html";
            }
        })
    }) 
})