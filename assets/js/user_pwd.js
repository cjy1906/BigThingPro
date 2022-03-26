$(function(){
    form=layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function(index){
              if(index===$('[name=oldPwd]').val()){
                  return '新旧密码不能相同！';
              }
          },
          rePwd:function(index){
            if(index!==$('[name=newPwd]').val()){
                return '两次密码输入不一致！';
            }
        }
    })
})


//提交修改密码表单事件
//修改基本信息
$(".layui-form").on('submit',function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:"/my/updatepwd",
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0)
            return layer.msg('更新密码失败!');

            layer.msg('更新密码成功！');
            // 重置表单
            $(".layui-form")[0].reset();

        }
    })
})