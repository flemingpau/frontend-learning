// 设置画布

const canvas = document.querySelector('canvas');
//对其调用 getContext() 从而我们获得一个开始画画的环境。存储以上操作结果的变量（ctx）是一个对象，直接代指画布上的一块允许我们绘制 2D 图形的区域。
const ctx = canvas.getContext('2d');
//让画布元素的宽和高（分别使用 canvas.width 和 canvas.height 表示）等于浏览器的宽和高
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}
//生成一个随机的颜色值
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}
function Ball(x,y,velX,velY,color,size){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}
Ball.prototype.draw = function() {
	//首先，我们使用 beginPath() 来声明我们现在要开始在纸上画一个图形了。
  ctx.beginPath();
  //然后，我们使用 fillStyle 来定义这个图形的颜色 — 这个值正是小球的颜色属性。
  ctx.fillStyle = this.color;
  // 接下来，我们使用 arc() 方法来在纸上画出一段圆弧。有这些参数：
// x 和 y 是圆弧的中心的坐标 —— 也就是小球的中心坐标。
// 圆弧的半径 —— 小球的半径。
// 最后两个参数是开始和结束，也就是圆弧对应的夹角，单位以弧度表示。这里我们用的是 0 和 2 * PI，也就是 360 度（如果你设置成 0 和 1 * PI，则只会出现一个半圆，也就是 180 度）
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  //使用 fill() 方法，也就是声明我们结束了以 beginPath() 开始的绘画，并且使用我们之前设置的颜色进行填充。
  ctx.fill();
}
let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}

let balls = [];

while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size
    );
    balls.push(ball);
  }
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
	balls[i].collisionDetect();

  }

  requestAnimationFrame(loop);
}
loop();
