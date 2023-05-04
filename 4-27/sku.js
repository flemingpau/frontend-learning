const attribute_list = document.getElementById("attribute");
let attribute_type = 3;
let attribute_num = 3;
let total = attribute_type * attribute_num;
// const type = ["男裤", "女裤"]
// const color = ["黑色", "白色"]
// const size = ["S", "L"]
// const attribute = [type, color, size];

function cloneTwo(o) {
	const ret = [];
	for (let j = 0; j < o.length; j++) {
		const i = o[j];//slice函数浅拷贝
		ret.push(i.slice ? i.slice() : i);
	}
	return ret;
}

//生成sku列表(使用笛卡尔积)
function descartes(list) {
	// list.reduce((a, b) => {
	// return a.flatMap(x => b.map(y => [...x, y]))},
	// [[]]
	// )
	// return list;
	// parent上一级索引;count指针计数
	const point = {}; // 移动指针
	const result = []; // 准备返回数据
	let pIndex = null; // 准备父级指针
	let tempCount = 0; // 每层指针坐标
	let temp = []; // 组装当个sku结果
	//生成指针对象
	for (const index in list) {
		if (typeof list[index] == 'object') {
			point[index] = {
				parent: pIndex,
				count: 0
			}
			pIndex = index;
		}
	}
	if (pIndex == null) return list; //输入的是一维数组就不需要处理，没选项
	//开始生成sku
	while (true) {
		let index;
		//生成一个sku
		for (index in list) {
			tempCount = point[index].count;
			temp.push(list[index][tempCount]);
		}
		result.push(temp)
		temp = [] //清空temp

		//检查是否到头了
		while (true) {
			if (point[index].count + 1 >= list[index].length) {
				point[index].count = 0;//向上一层继续查找
				pIndex = point[index].parent;
				if (pIndex == null) {
					return result;
				}
				index = pIndex;
			} else {
				point[index].count++;
				break;//未到头就退出继续生成新的sku
			}
		}
	}

}

//返回一个一维长度为total的质数列表
function getPrime(num) {
	let i = 2;
	const arr = [];
	const isPrime = (x) => {
		for (let y = 2; y < x; y++) {
			if (x % y == 0) return false;
		}
		return true;
	}
	for (; arr.length < total; i++) {
		if (isPrime(i)) arr.push(i);
	}
	return arr;
}

class PathFinder {
	//构造器 输入的两参数，前者是所有可用的质数（需要是2维数组，指明位置）
	//后者是可行的sku列表
	constructor(maps, openWay) {
		this.maps=maps
		this.openWay=openWay
		this._way={};//存放质数对应的位置[i，j]列表
		this.light=[];//存放当前节点选择情况
		this.selected=[];
		this.init();
	}

	//输入的map是有关于矩阵的初始值，对应的质数值
	init() {
		//首先要做的是光效果矩阵light，为1表示可选，为0表示不可选，2表示已选择
		//先复制一份map到light里
		//接着将way[light[i][j]]=[i,j]来保存该质数值对应的矩阵位置。
		//再将light[i][j]设置为1或者0表示是否能存放和不能存放（现在默认全部可以，所以是1）
		//openway存放所有可操作的sku质数集合。
		//openway[i]=eval(openway[i].join(*))让他们相乘
		//调用check初始话得到规格位置。
		this.light=cloneTwo(this.maps,true);
		const light=this.light;
		
		for(let i=0;i<light.length;i++){
			const ll=light[i];
			for(let j=0;j<ll.length;j++){
				this._way[light[i][j]]=[i,j];
				ll[j]=1;//初始都可选
			}
		}
		for(let i=0;i<this.openWay.length;i++){
			//计算所有可行路线得到的最终值
			this.openWay[i]=eval(this.openWay[i].join("*"));
		}
		this._check();
	}

	//查看是否可选择，更新矩阵对应结果值
	_check(isAdd) {
		//light,map一个存放可选，一个存放质数值
		//循环获取每个属性已选择的值selected
		//二层循环，查看light为1的点来进行选择
		//if(isAdd)
		//	if(可选)，更新light[i][j](map[i][j],selected)
		//else 
		const light = this.light;
		const maps = this.maps;
		
		for (let i = 0; i < light.length; i++) {
			const li = light[i];
			const selected = this._getSelected(i);
			for (let j = 0; j < li.length; j++) {
				if (li[j] !== 2) {
					// 如果是加一个条件，只在是light值为1的点进行选择
					if (isAdd) {
						if (li[j]) {
							light[i][j] = this._checkItem(maps[i][j], selected);
							this.count++;
						}
					} else {
						light[i][j] = this._checkItem(maps[i][j], selected);
						this.count++;
					}
				}
			}
		}
		return this.light;
	}
	//int item ,array selected
	_checkItem(item, selected) {
		//拿到可选择的SKU内容集合openway
		//val=item*selected=>这是当前新选中的*已有规格
		//遍历openway,openway[i]整除val者留下
		const openWay=this.openWay
		const val=item*selected//新选规格和已有规格的乘积值
		for(let i=0;i<openWay.length;i++){
			this.count++;//计算次数+1
			if(openWay[i]%val==0)return 1;
		}
		return 0;
	}
	//array point存放新规格的位置[x,y]
	add(point) {
		point = point instanceof Array ? point : this._way[point];
		const val = this.maps[point[0]][point[1]];
		
		// 检查是否可选中
		if (!this.light[point[0]][point[1]]) {
			throw new Error(
				'this point [' + point + '] is no availabe, place choose an other'
			);
		}
		
		if (val in this.selected) {
			remove(point)
		}
		else{
			const isAdd = this._dealChange(point, val);
			this.selected.push(val);
			this.light[point[0]][point[1]] = 2;
			this._check(!isAdd);
		}
		
	}
	
	//判断是否同行选择
	_dealChange(point){
		const selected = this.selected;
		// 遍历处理选中内容
		for (let i = 0; i < selected.length; i++) {
			// 获取刚刚选中内容的坐标，属于同一行内容
			const line = this._way[selected[i]];
			if (line[0] === point[0]) {
				this.light[line[0]][line[1]] = 1;
				selected.splice(i, 1);
				return true;
			}
		}
		
		return false;
	}
	remove(point) {
		point = point instanceof Array ? point : this._way[point];
		const val = this.maps[point[0]][point[1]];
		if (!val) {
			return;
		}
	
		if (val) {
			for (let i = 0; i < this.selected.length; i++) {
				if (this.selected[i] === val) {
					const line = this._way[this.selected[i]];
					this.light[line[0]][line[1]] = 1;
					this.selected.splice(i, 1);
				}
			}
	
			this._check();
		}
	}
	//返回组合中已选内容乘积所得的值
	_getSelected(xpath) {
		const selected = this.selected;
		const _way = this._way;
		const retArr = [];
		let ret = 1;
	
		if (selected.length) {
			for (let j = 0; j < selected.length; j++) {
				const s = selected[j];
				// xpath表示同一行，当已经被选择的和当前检测的项目再同一行的时候
				// 需要忽略。
				// 必须选择了 [1, 2],检测的项目是[1, 3]，不可能存在[1, 2]和[1, 3]
				// 的组合，他们在同一行
				if (_way[s][0] !== xpath) {
					ret *= s;
					retArr.push(s);
				}
			}
		}
	
		return ret;
	}
	//获取路径
	getWay() {
		const light = this.light;
		const way = cloneTwo(light);
		for (let i = 0; i < light.length; i++) {
			const line = light[i];
			for (let j = 0; j < line.length; j++) {
				if (line[j]) way[i][j] = this.maps[i][j];
			}
		}
		return way;
	}
}
function makeSku(){
	//生成一个数组list来存放每个节点对应的质数值
	let list = Array(attribute_type);
	//获取等大小的prime值
	let prime_list = getPrime(1000);
	for (let i = 0; i < attribute_type; i++) {
		list[i] = Array(attribute_num);
		for (let j = 0; j < attribute_num; j++) {
			list[i][j] = prime_list[i * attribute_num + j];
		}
	}
	//生成所有sku
	let sku_list = descartes(list)
	let openway = cloneTwo(sku_list,true);
	//生成可用的sku序列
	openway.splice(2,1);
	openway.splice(4,2);
	openway.splice(7,3);
	openway.splice(1,3);
	setAndDisplay(list,openway)
	pathfinder = new PathFinder(list, openway);
}
//写入属性以及对应的值，并设置按钮
function setAndDisplay(sku_list, openway) {
	for (let i = 0, k = 0; i < sku_list.length; i++) {
		const newAttributeType = document.createElement("dt");
		newAttributeType.innerText = "属性" + `${i+1}` + ":";
		attribute_list.append(newAttributeType);
		for (let j = 0; j < sku_list[i].length; j++, k++) {
			const newAttribute = document.createElement("button");
			newAttribute.innerText = sku_list[i][j];
			newAttribute.setAttribute("class", "button-can-select");
			newAttribute.setAttribute("i", i);
			newAttribute.setAttribute("j", j);
			newAttributeType.append(newAttribute);
			newAttribute.addEventListener("click", selectAttribute);
		}
	}
	let list = document.getElementsByTagName("ol");
	for (let i = 0; i < openway.length; i++) {
		const newAttributeType = document.createElement("li");
		newAttributeType.innerText = openway[i].toString();
		list[0].append(newAttributeType);
	}
}
//按钮被点击时，判断是否可以添加
function selectAttribute(event) {
	let a = event.target;
	console.log(pathfinder.getWay())
	let i = a.getAttribute("i");
	let j = a.getAttribute("j")
	let k = 0;
	//查找该行已选择的规格j
	for (; k < pathfinder.light[i].length; k++) {
		if (pathfinder.light[i][k] == 2) {
			break;
		}
	}
	//没有已选的话就选择新的
	if (k == pathfinder.light[i].length) pathfinder.add([i, j])
	else if (j == k) {//点击同一个就取消选择
		pathfinder.remove([i, k])
	} else {//取消选择原有的，再选择新的
		pathfinder.remove([i, k])
		pathfinder.add([i, j])
	}
	//循环，更新发光情况
	for (i = 0; i < pathfinder.light.length; i++) {
		const attr = document.getElementById("attribute").children[i].children;
		for (j = 0; j < attr.length; j++) {
			const item = attr[j];
			if (pathfinder.light[i][j] == 1) {
				item.setAttribute("class", "button-can-select");
			} else if (pathfinder.light[i][j] == 2) {
				item.setAttribute("class", "button-selected");
			} else if (pathfinder.light[i][j] == 0) {
				item.setAttribute("class", "button-cannot-select");
			}
		}
	}
}
var pathfinder
makeSku()