// 渲染功能  渲染图片、音乐信息、是否喜欢
(function (root) {
    // 渲染图片
    function renderImg(src) {
        root.blurImg(src);//给页面添加背景图片并处理成为高斯模糊

        const img = document.querySelector('.songImg img');
        img.src = src;
    }
    // 渲染音乐信息
    function renderInfo(data) {
        //给对应的dom添加动态文字
        const songInfo = document.querySelector('.songInfo').children;
        songInfo[0].innerHTML = data.name;
        songInfo[1].innerHTML = data.singer;
        songInfo[2].innerHTML = data.album;
    }
    // 渲染用户喜欢
    function renderIsLike(isLike) {
        const lis = document.querySelectorAll('.control li');
        lis[0].className = isLike ? 'liking' : '';
    }
    root.render = function (data) {
        //data为请求数据
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    };
})(window.player || (window.player = {}));