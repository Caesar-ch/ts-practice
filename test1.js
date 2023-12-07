// Array.prototype.myReduce = function (num, callback) {
//     callback();
//     return num;
// };
// var sfns = function () {
//     console.log('123');
// };
// console.log([1, 2, 3].myReduce(1, sfns));
// console.log([1, 2, 3].myReduce(1, 2));
let obj1 = { b: 1}

let obj = {a: obj1}
console.log(obj);
obj1.b = 2
console.log(obj);
