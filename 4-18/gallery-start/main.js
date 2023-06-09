const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
imageArr=['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];
/* Declaring the alternative text for each image file */
altArr=['eye','shell','flower','wall','butterfly'];
/* Looping through images */
for(var i=0;i<imageArr.length;i++){
	const newImage = document.createElement('img');
	newImage.setAttribute('src', 'images/'+imageArr[i]);
	newImage.setAttribute('alt', altArr[i]);
	thumbBar.appendChild(newImage);
	newImage.addEventListener('click',callPicture)//问题：为什么换成这样可以正常跑
	/*e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });*/
}
function callPicture(event){
	displayedImage.src=event.target.src;
	displayedImage.alt = event.target.alt;
}
//thumbBar.addEventListener('click',callPicture(thumbBar.getAttribute('src')));
/* Wiring up the Darken/Lighten button */
