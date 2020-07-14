window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    // 左右按钮
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    //轮播图
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //清除定时器，取消自动播放
        clearInterval(timer);
        //清空定时器变量
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //启动计时器
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    })
    // 自动生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for(var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //添加自定义属性
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        //小圆圈点击事件
        ol.children[i].addEventListener('click', function() {
            for(var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('data-index');
            //当我们点击小圆圈时，要把索引值给num和circle
            num = circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片到ul后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一张
    var num = 0;
    //定义一个变量，用来控制小圆圈
    var circle = 0;
    //定义一个flag，节流阀,使点击图片一张结束才能点击下一张
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            currentChange();
        }   
    })
    //左按钮点击事件
    arrow_l.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            currentChange();
        }
        
    })
    function currentChange() {
        for(var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放事件
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000)
})