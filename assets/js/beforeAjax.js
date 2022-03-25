// 
// 每次调用ajax之前都会先调用这个函数
// 
$.ajaxPrefilter(function(options){

    options.url='http://www.liulongbin.top:3007'+options.url;

})