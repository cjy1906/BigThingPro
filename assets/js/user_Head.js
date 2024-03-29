$(function () {
    /*Cropper框架语句*/
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    /*Cropper框架语句*/

    //为上传按钮绑定点击事件
    $("#btnChooseImage").on('click', function () {
        $('#file').click();
    })


    // 
    //  为文件选择框必绑定选择事件
    //     
    $("#file").on('change', function (e) {
        var filelist = e.target.files;   //获取选择的文件集
        if (filelist.length === 0) {
            return layer.msg('请选择照片！');
        }

        //  1.拿到用户选择的照片
        var file = e.target.files[0];
        // 2.将照片,转化为路径
        var imageURL = URL.createObjectURL(file);
        // 3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imageURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 将头像上传服务器
    $("#btnUpload").on('click',function(e){
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png');       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    
      $.ajax({
          method:'post',
          url:'/my/update/avatar',
          data:{
              avatar:dataURL
          },
          success:function(res){
              if(res.status!==0){
                  layer.msg('更新头像失败！');
              }
              layer.msg('更新头像成功！');
              window.parent.getUserInfo();
          }
      })
    })
})