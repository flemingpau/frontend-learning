import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component(){
	const element=document.createElement('div');
	//lodash在当前script中使用import引入
	element.innerHTML=_.join(['Hello','webpack'],' ');
	element.classList.add('hello');
	
	const myIcon = new Image();
	myIcon.src=Icon;
	element.appendChild(myIcon);
	
	return element;
}
document.body.appendChild(component());