(function (root) {
    class Index {
        constructor(len) {
            this.index = 0;   //当前索引值
            this.len = len;   //数据长度，用于判断
        };
        //用来取上一个索引（上一首）
        prev() {
            return this.get(-1);
        };
        //用来取下一个索引（下一首）
        next() {
            return this.get(1);
        };

        //用来获取索引
        get(val) {
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        };
    }

    root.controlIndex = Index;  //把构造函数暴露出去，因为实例对象需要传参，所以实例对象不能暴露出去
})(window.player || (window.player = {}));