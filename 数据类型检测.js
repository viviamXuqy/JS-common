/*jquery源码对数据类型的检测
采用typeof(除了null,对象)+Object.prototype.toString.call()(对象、数组、正则)检测数据类型
*/
(function(){
    var class2type = {}
    var toString  = class2type .toString;//Object.prototype.toString
    ["Boolean","Number","String","Function","Array","Date","RegExp","Object",
    "Error","Symbol"].forEach(name=>{
        class2type[`[object ${name}]`] = name.toLowerCase();
    })
    function toType(obj){
        if(obj==null){
            return obj + "";//传递的值是null/undefined,返对应的字符串
        }
        return typeof obj==='object'||typeof obj==='function'?
            class2type[toString.call(obj)]||"object":
            typeof obj;
    }
    window.toType = toType
})()
toType([2])//"array"