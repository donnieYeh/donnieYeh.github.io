// <!--崩溃欺骗-->
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/img/TEP.ico");
        document.title = '☀发呆中...';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/avatar.jpg");
        document.title = '☀欢迎回来';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});