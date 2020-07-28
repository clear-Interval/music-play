(function (root) {
    // class ListControl {
    //     constructor(len, data, wrap) {
    //         this.index = 0;  //当前索引值
    //         this.len = len;    //数据长度，用于做判断
    //     };
    // }

    function listControl(data, wrap) {
        const list = document.createElement('div');
        const dl = document.createElement('dl');
        const dt = document.createElement('dt');
        const close = document.createElement('div');
        const musicList = [];  //存储所有歌曲对应的dom

        list.className = 'list';
        dt.innerHTML = '播放列表';
        close.className = 'close';
        close.innerHTML = '关闭';
        dl.appendChild(dt);
        data.forEach((item,index) => {
            const dd = document.createElement('dd');
            dd.innerHTML = item.name;

            dd.addEventListener('touchend', function () {
                changeSelect(index);
            });
            dl.appendChild(dd);
            musicList.push(dd);
        });

        list.appendChild(dl);
        list.appendChild(close);
        wrap.appendChild(list);
        changeSelect(0); //默认让第一首歌是选中状态
        const disY = list.offsetHeight;
        list.style.transform = `translateY(${disY}px)`;

        //关闭按钮点击
        close.addEventListener('touchend', slideDown);

        //列表滑动显示
        function slideUp() {
            list.style.transition = '.2s';
            list.style.transform = `translateY(0)`;
        }
        //列表滑动隐藏
        function slideDown() {
            list.style.transition = '.2s';
            list.style.transform = `translateY(${disY}px)`;
        }

        //切换选中元素
        function changeSelect(index) {
            for (let i = 0; i < musicList.length; i++) {
                musicList[i].className = '';
            }
            musicList[index].className = 'active';
        }
        return {
            dom: list,
            musicList: musicList,
            slideUp: slideUp,
            slideDown: slideDown,
            changeSelect: changeSelect
        };
    }

    root.listControl = listControl;
})(window.player || (window.player = {}));