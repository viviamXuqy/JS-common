//类数组变数组
function  f1(){
	console.log(arguments);//arguments就是个类数组
	//第一种方法
	Array.prototype.slice.call(arguments);
	//第二种方法
	[].slice.call(arguments);
	//三
	[...arguments]
	//四
	Array.from(arguments)
	//五
	let arr=[]
	for(let i=0;i<arguments.length;i++){
		arr.push(arguments[i]);
	}	
}
f1(10,20,30)
/**
*slice()源码实现
*/
//数组slice()不传值时，复制arr并返回一个新数组
Array.prototype.slice=function slice(){
	let result=[];
	for(let i=0;i<this.length;i++){
		result.push(this[i]);
	}
	return result;
}