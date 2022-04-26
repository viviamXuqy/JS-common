//把两个数组对象合并成一个一一对应的数组对象
var obj1 = [{
  "id": 980550455852,
  "model": "XQG70-S1208FW",
  "color": "白",
  "invStatusName": "正品",
  "bactualQty": 10947,
  "brealyQty": 11000,
  "bavailQty": 53
}, {
  "id": 980550566221,
  "model": "XQB70-C3006",
  "color": "灰",
  "invStatusName": "正品",
  "bactualQty": 11,
  "brealyQty": 6,
  "bavailQty": -5
}];

var obj2 = [{
  "price": "6666",
  "size": "10cm"
}, {
  "price": "8888"
}];
var obj = obj1.map((item,index) => {
    return {...item, ...obj2[index]};
});