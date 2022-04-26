/*
let obj = {
	name:'OBJ'
}
function func(x,y){
	console.log(this,x,y);
}
func.bind(obj,3,4)()=>改变func的this指针，指向obj
执行bind返回一个新的函数，用闭包的形式把传递进来的信息...params储存起来
*/
Function.prototype.bind = function bind(context,...params){
	let self= this;
	return function proxy(...args){
		//args是执行proxy的时候可能传递的值
		self.apply(context,params.concat(args));
	}
}
