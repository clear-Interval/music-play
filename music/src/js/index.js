(function ($, player) {


    class MusicPlayer {
        constructor(dom) {
            this.wrap = dom;      //播放器的容器， 用于加载listControl模块
            this.dataList = [];  //存储请求到的数据
            // this.now = 0;       //歌曲索引
            this.indexObj = null; //索引值对象，用于切歌
            this.rotateTimer = null;
            this.curIndex = 0; //当前播放歌曲索引
            this.list = null;  //列表切割对象(在listPlay赋值)
        };
        init() {  //初始化
            this.getDom();                      //获取元素
            this.getData('../mock/data.json'); //请求数据
        };
        getDom() {   //获取页面元素
            this.record = document.querySelector('.songImg img');          //旋转图片
            this.controlBtns = document.querySelectorAll('.control li');  //底部导航按钮组

        };
        getData(url) { //请求数据
            const This = this;
            $.ajax({
                url: url,
                mehod: 'get',
                success: function (data) {
                    This.dataList = data;       //存储请求数据
                    This.listPlay();            //放在loadMusic前面，因为this.list对象实在这个方法里声明的，要在loadMusic里使用
                    This.indexObj = new player.controlIndex(data.length);   //给索引值对象赋值
                    This.loadMusic(This.indexObj.index);  //加载音乐
                    This.musicContr();        //添加音乐播放功能
                },
                error: function () {
                    console.log('数据请求失败');
                }
            });
        };
        loadMusic(index) { //加载音乐
            player.render(this.dataList[index]);    //渲染图片、歌曲信息等
            player.music.load(this.dataList[index].audioSrc);

            // 播放音乐
            if (player.music.status == 'play') {
                player.music.play();
                this.controlBtns[2].className = 'playing';
                this.imgRotate(0);
            };
            this.list.changeSelect(index);//改变列表歌曲选中状态
            this.curIndex = index;  //存储当前歌曲对应的索引值
        };
        musicContr() {  //控制音乐播放、上下首
            const This = this;
            //上一首
            this.controlBtns[1].addEventListener('touchend', function () {
                player.music.status = 'play';
                This.loadMusic(This.indexObj.prev());
            });

            //播放、暂停
            this.controlBtns[2].addEventListener('touchend', function () {
                if (player.music.status == 'play') {
                    player.music.pause();
                    this.className = '';
                    This.imgStop();
                } else {
                    player.music.play();
                    this.className = 'playing';
                    const deg = This.record.dataset.rotate || 0;

                    This.imgRotate(deg);
                }
            });

            //下一首
            this.controlBtns[3].addEventListener('touchend', function () {
                player.music.status = 'play';
                This.loadMusic(This.indexObj.next());
            });
        };

        imgRotate(deg) {
            const This = this;
            clearInterval(this.rotateTimer);
            this.rotateTimer = setInterval(() => {
                deg = +deg + 0.2;
                This.record.style.transform = `rotate(${deg}deg)`;
                This.record.dataset.rotate = deg;   //把旋转角度存到标签上，方便暂停后继续播放取到
            }, 1000 / 60)
        };

        imgStop() {
            clearInterval(this.rotateTimer);
        };
        listPlay() {
            const This = this;
            this.list = player.listControl(this.dataList, this.wrap);  //把listControl对象赋值给this.list

            //列表按钮添加点击事件
            this.controlBtns[4].addEventListener('touchend', function () {
                This.list.slideUp();
            });
            //歌曲列表添加事件
            this.list.musicList.forEach((item, index) => {
                item.addEventListener('touchend', function () {
                    //如果点击的是当前歌曲，不管他是播放还是暂停，都无效
                    if (This.curIndex == index) {
                        return;
                    };
                    player.music.status = 'play';   //歌曲要变成播放状态
                    This.indexObj.index = index;
                    This.loadMusic(index);          //索引值对象身上的当前索引值要更新，加载点击对应的索引值的那首歌曲
                    This.list.slideDown();          //列表消失
                });
            });
        };
    };

    const musicPlayer = new MusicPlayer(document.getElementById('wrap'));
    musicPlayer.init();
})(window.Zepto, window.player);