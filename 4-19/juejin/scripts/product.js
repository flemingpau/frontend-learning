var intervalId;
//获取元素
var slider = document.getElementById("slider");
var slider_items = slider.getElementsByTagName("li");
var slider_item_container = slider.getElementsByClassName("slider-item-container")[0];
var indicator_container = slider.getElementsByClassName("indicator-container")[0];
var triangle=document.querySelector(".triangle")

//滑动页面宽度以及当前节点号
var slider_item_width = slider_items[0].offsetWidth;
var curIndex = 0;

//获取指示图像，并添加事件  
var indicators = indicator_container.children;
for (var i = 0; i < indicators.length; i++) {
	indicators[i].setAttribute("index", i);
	indicators[i].addEventListener("mouseover", function () {
		curIndex = parseInt(this.getAttribute("index"));
		animate(slider_item_container, -(curIndex*slider_item_width));
	});
}

//获取指示图标的宽度以及节点长度
var indicator_item_width = indicators[0].offsetWidth;
var indicator_item_length = indicators[1].offsetLeft-indicators[0].offsetLeft;

function animate(element, target) {
	//设置步骤数和事件
    var step = 10;
    var time = 10;
	//计算切换节点的数量间隔
    var gap = (Math.abs(target - element.offsetLeft) / slider_item_width);
    if (gap > 1) {//若大于1时，增加步骤数以及切分间隔时间。
        step = step * gap;
        time = time / gap;
    }
	//如果节点存在
    if (element) {
		//判断是向左还是向右
        step = (element.offsetLeft > target) ? -step : step;
        //设置当前鼠标所指示的节点
		setCurrentActiveIndicator(curIndex);
		//清空计时器
        clearInterval(intervalId);
		//设置计时器
        intervalId = setInterval(function () {
			//向左移动(未完成)
            if ((step < 0) && (Math.abs(element.offsetLeft + step) < Math.abs(target))) {
                element.style.left = element.offsetLeft + step + "px";
            } else {//向右移动（未完成）
                if (Math.abs(target - element.offsetLeft) > Math.abs(step)) {
                    element.style.left = element.offsetLeft + step + "px";
                } else {//已完成所有移动，结束，清空计时器
                    clearInterval(intervalId);
                    intervalId = -1;
                    element.style.left = target + "px";
                }
            }
        }, time);
    }
}

//设置当前鼠标所在的指示器，并添加三角形以及边框
function setCurrentActiveIndicator(index) {
    for (var i = 0; i < indicators.length; i++) {
		indicators[i].style.border='none';
    }//增加红色边框以及三角形
	indicators[index].style.border='solid 2px red';
	triangle.style.left=`${0.5*indicator_item_width+index*indicator_item_length}px`;
}
