### 重点
* unknown 和 any 区别
  * any 不做任何校验 let a: any; a = '1'; a = true; a.split('') 不会报错；
  * unknown let b:unknown; b = '1'; b = true; b.split('') 会报错
* 各种类型的大小写【推荐都是小写；Function大写】
* 