const recommend = document.querySelector(".recommend");
const lastest = document.querySelector(".lastest");
recommend.addEventListener('click', changeContent);
lastest.addEventListener('click', changeContent);
let column_state = recommend;
let r = document.querySelector(".recommend-code");
let l = document.querySelector(".lastest-code");
l.style.display='none';
function changeContent(event) {
	if (event.target === column_state) return;	
	if (column_state === recommend) {
		column_state = lastest;
		r.style.display='none';
		l.style.display='block';
	} else if (column_state === lastest) {
		column_state = recommend;
		l.style.display='none';
		r.style.display='block';
	}
}