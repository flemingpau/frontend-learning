// var autoplay = true;
// var autoplay_Delay = 2000; // ms
// var autoplayId;
var intervalId;

var slider;
var slider_item_container;
var slider_items;
var indicator_container;

var slider_item_width;
var curIndex = 0;
var triangle;

window.onload = function() {
    initElement();
    initEvent();

}

function initElement() {
    slider = document.getElementById("slider");
    slider_items = slider.getElementsByTagName("li");
    slider_item_container = slider.getElementsByClassName("slider-item-container")[0];
    indicator_container = slider.getElementsByClassName("indicator-container")[0];
    triangle=document.querySelector(".triangle")
    
	var firstItem = slider_items[0].cloneNode(true);
    slider_item_container.appendChild(firstItem);
    
    slider_item_width = slider_items[0].offsetWidth;
}

function initEvent() {    
    var indicators = indicator_container.children;
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].setAttribute("index", i);
        indicators[i].addEventListener("mouseover", function () {
            var index = parseInt(this.getAttribute("index"));
            next(index);
        });
    }
}

function animate(element, target) {
    var step = 10;
    var time = 10;
    var gap = (Math.abs(target - element.offsetLeft) / slider_item_width);
    if (gap > 1) {
        step = step * gap;
        time = time / gap;
    }
    if (element) {
        step = (element.offsetLeft > target) ? -step : step;
        clearInterval(intervalId);
        setCurrentActiveIndicator(curIndex);
        intervalId = setInterval(function () {
            if ((step < 0) && (Math.abs(element.offsetLeft + step) < Math.abs(target))) {
                element.style.left = element.offsetLeft + step + "px";
            } else {
                if (Math.abs(target - element.offsetLeft) > Math.abs(step)) {
                    element.style.left = element.offsetLeft + step + "px";
                } else {
                    clearInterval(intervalId);
                    intervalId = -1;
                    element.style.left = target + "px";
                }
            }
        }, time);
    }
}

function next(nextIndex) {
    var element = slider_item_container;
    var li = element.children;
    if ((nextIndex != null) && (typeof(nextIndex) != "undefined")) {
        curIndex = nextIndex;
		animate(element, -(curIndex*slider_item_width));
	}
}

function setCurrentActiveIndicator(index) {
    var indicators = indicator_container.children;
    for (var i = 0; i < indicators.length; i++) {
        if (i == index) {
            indicators[i].className = "indicator active";
        } else {
            indicators[i].className = "indicator";
        }
		indicators[i].style.border='none';
    }
	indicators[index].style.border='solid 2px red';
	triangle.style.left=`${27+index*59}px`;
}
