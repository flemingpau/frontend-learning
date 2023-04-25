const displayedImg=document.querySelector(".displayed-img");
const thumbBar=document.querySelector(".thumb-bar")
const triangle=document.querySelector(".triangle")
const pic_name=['p1.jpg','p2.jpg','p3.jpg','p4.jpg','p5.jpg', 'p6.jpg']

for(let i=0;i<pic_name.length;i++){
	const newTriangle=document.createElement("div");
	const newImg=document.createElement("img");
	newImg.setAttribute("src","images/shop/shop_product1/"+pic_name[i]);
	thumbBar.appendChild(newImg)
	
	newImg.addEventListener('mouseover',changePicture);
}

function changePicture(event){
	displayedImg.src=event.target.src;
	let j=0;
	for(let i=0;i<thumbBar.childElementCount;i++){
		thumbBar.children[i].style.border='none';
		if(thumbBar.children[i]===event.target)j=i;
	}
	event.target.style.border='solid 2px red';
	triangle.style.left=`${10.8+j*3.8}%`;
}

 