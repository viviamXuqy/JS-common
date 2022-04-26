js三类循环对比及性能分析

应用场景
确定循环次数使用for
不确定循环次数的情况下使用while

性能
1.基于let声明时，性能for>while>forEach>for of>for in(非常差！！)
2.基于var声明时，性能for,while差不多

for可以自己控制break,continue
forEach(fun(){}) 封装好了，使用方便 无法结束循环
/**
callback(currentValue, index),context
currentValue必需。当前元素的值
index可选。当前元素的数组索引。
context可选。要传递给函数以用作其 "this" 值的值。不传，就是undefined
*/
Array.prototype.forEach = function(callback,context){
	let self = this,
	i=0,
	len=self.length;
	if(context==null)context=window;
	for(;i<len;i++){
		typeof callback === 'function'?callback.call(context,self[i],i)
	}
}

for in 查找机制会遍历原型链，所以慢
	   拿到迭代对象的属性名

for of 拿到迭代对象的值
iterator迭代器 Symbol.iterator()
迭代器(iterator)是一种接口，为各种不同的数据结构提供统一的访问机制。
也就是说，只要数据结构中部署了该接口，那么它就可以遍历
原生具备iterator接口的数据结构：Array/Set/Map/String
for of 用来迭代|部署了iterator接口的数据结构 
//iterator的实现机制
arr[Symbol.iterator]=function(){
	let self= this;
	index=0;
	return{
		//必须具备next方法，执行一次next方法，拿到结构中的某一项的值
		//done:false是否结束循环 value:每一次获取的值
		next(){
			if(index>self.length-1){
				return{
					done:true,
					value:undefined
				}
			}
			return{
				done:false,
				value:self[index++]
			}
		}
	}
}

let obj={//类数组对象，默认不具备迭代器规范
	'0':ee,
	'1':23,
	'2':dfdd,
	length:3
}
obj[Symbol.iterator] = Array.prototype[Symbol.iterator]
for(let v of obj){
	console.log(v)
}

						数组遍历方法
map 返回一个新数组，和原数组成映射关系(也就是说长度不会变)
let arr = [1,2,3,4]
let newArr = arr.map((item,index,arr)=>{
	return item*2
})
console.log(newArr)

filter 返回一个boolean值,以此为根据过滤数组，返回过滤后的数组
let arr = [1,2,3,4]
let newArr = arr.filter((item,index,arr)=>{
	return item>2
})
console.log(newArr)//[3,4]

some,every
some只要一个满足，就返回true;every所有都满足，才返回true
let arr = [1,2,3,4]
let res1 = arr.every((item,index,arr)=>{
	return item>2
})
console.log(res1)//fasle
let res2 = arr.some((item,index,arr)=>{
	return item>2
})
console.log(res2)//true

reduce 累加器，能够返回一个具体的值
实际用法：1、将二维数组转化为一维 
		2、计算数组中每个元素出现的次数
见demo https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
//去重
let max=0,obj;
let arr = ['age','ddd','age',0]
arr.reduce((pre,current)=>{
	if(current in pre){
		pre[current]++;
		if(pre[current]>max){
			max=pre[current];
			obj=current;
		}
	}else{
		pre[current]=1;
	}
	return pre;
},{}) 
