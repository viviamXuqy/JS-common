/*
视频https://www.bilibili.com/video/BV1wu411o71q?p=3
let obj = {
	name:'OBJ'
}
function func(x,y){
	console.log(this,x,y);
}
func.call(obj,3,4)=>改变func的this指针，指向obj
*/
Function.prototype.call = function call(context,...params){
	/*思路obj.func(params)->context.func(params)->context[xxx]=func(params)
	*/
	let self= this,
	key=Symbol('KEY'),//添加一个唯一值属性，不改变context原有属性
	result ;
	if(context == null)context=window
	if(!/^(object|function)$/i.test(typeof context))context=Object(context)//如果context是基本类型，先变成对象类型
	context[key]=self;//obj['KEY']=func
	result=context[key](...params)
	delete context[key];//执行完释放掉
	return result;
}
