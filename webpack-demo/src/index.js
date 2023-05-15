import _ from 'lodash';

function component(){
	const element=document.createElement('div');
	
	//lodash在当前script中使用import引入
	element.innerHTML=_.join(['Hello','webpack'],' ');
	
	return element;
}
document.body.appendChild(component());