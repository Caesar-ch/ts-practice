// 就是为 JavaScript 变量 [定义时] 加上了类型声明。

let isDone: boolean = false;

let count: number = 10;

let string: string = 'string'

// let symbol = Symbol('132')
// let obj = {
//     [symbol]: '123'
// }
// console.log(obj[symbol]);

let arr: number[] = [1, 2]
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<number | string | null> = [1, '2', null]
let arr4: (number | string)[] = [1, '2']

let any: any = '123'
let any1: any = 1

let unknown: unknown
unknown = 1
unknown = '1'
unknown = true
unknown = []
unknown = { a: 1 }
// unknown跟any的相似之处，在于所有类型的值都可以分配给unknown类型。
// unknown类型跟any类型的不同之处在于，它不能直接使用。主要有以下几个限制。
// 首先，unknown类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型）。
// 其次，不能直接调用unknown类型变量的方法和属性。
// 那么，怎么才能使用unknown类型变量呢？
// 答案是只有经过【类型缩小】，unknown类型变量才可以使用。所谓“类型缩小”，就是缩小unknown变量的类型范围，确保不会出错。
if (typeof unknown === "object" && unknown !== null && 'a' in unknown) {
    // console.log((unknown as { [key: string]: any })['a']);
    console.log(unknown.a);

}

let x: never;
// 上面示例中，变量x的类型是never，就不可能赋给它任何值，否则都会报错。

function fn(x: string | number): never {
    if (typeof x === "string") {
        // ...
    } else if (typeof x === "number") {
        // ...
    } else {
        x; // never 类型
    }
    throw new Error('123')
}
// never类型的一个重要特点是，可以赋值给任意其他类型。
// let never: string = fn('1')
// console.log(fn('1'));

// 总之，TypeScript 有两个“顶层类型”（any和unknown），但是“底层类型”只有never唯一一个。

// 联合类型
let x1: undefined | number | string | boolean
x1 = 1
x1 = '1'
x1 = true
// 如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步处理。
if (typeof x1 == "string") {
    // @ts-ignore
    console.log(x1.length);
}

// 交叉类型
// 交叉类型的主要用途是表示对象的合成

let obj: {a: string} & {b: number}
obj = { a: '1', b: 2 }

// 交叉类型常常用来为对象类型添加新属性。

type A = {foo: string}
type B = A & {bar: string}
let obj1:B
obj1 = { foo: '1', bar: '2' }

// type 命令
// type命令用来定义一个类型的别名。

type Age = number
let count1: Age
count1 = 1

// 别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型。
type Color = 'red' | 'blue' | 'green'

// 同一块级作用域 别名不允许重名，重复会报错【标识重复】

// 别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套。
type World = "world";
type Greeting = `hello ${World}`;
// 上面示例中，别名Greeting使用了模板字符串，读取另一个别名World。

// type命令属于类型相关的代码，编译成 JavaScript 的时候，会被全部删除。

// typeof 运算符
// typeof运算符只可能返回八种结果，而且都是字符串。

typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
//@ts-ignore
typeof Symbol(1); // "symbol"
//@ts-ignore
typeof 127n; // "bigint"

// TypeScript 将typeof运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。
let a = {x: 0}
type A1 = typeof a// {x: number}

// 另外，typeof命令的参数不能是类型。
// type B1 = typeof A1// 报错
// type B1 = A1 | number
let a1: A1 = {x: 123}
console.log(typeof a1);

// 数组类型

// 数组的类型有两种写法。第一种写法是在数组成员的类型后面，加上一对方括号。
let arr1: number[]
arr1 = [1,2]
// 如果数组成员的类型比较复杂，可以写在圆括号里面。
let arr_3: (number | string)[]

// 组类型的第二种写法是使用 TypeScript 内置的 Array 接口。
let arr_1: Array<number> = [1,2,3]
// 这种写法对于成员类型比较复杂的数组，代码可读性会稍微好一些。
let arr_2: Array<number | string> = [1,2,3,'1']

let arr_11 = [];
// @ts-ignore
arr_11.push('123')
// @ts-ignore
arr_11.push(123)

//只读数组，const 断言

const arr_123: readonly number[] = [1,2,3]
// arr_123[0] = 123 //类型“readonly number[]”中的索引签名仅允许读取。

// 字类型可以赋值给父类型，父类型不可以赋值给字类型，因为父类型更宽泛，赋值给字类型就可能存在赋值的是字类型没有的 类型情况
// 注意，readonly关键字不能与数组的泛型写法一起使用。
// 报错
// const arr: readonly Array<number> = [0, 1];

// 实际上，TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。

const a11: ReadonlyArray<number> = [0, 1];

const a22: Readonly<number[]> = [0, 1];

// 只读数组还有一种声明方法，就是使用“const 断言”。

// const arr = [0, 1] as const;
// arr[0] = [2]; // 报错

// 多维数组
// TypeScript 使用T[][]的形式，表示二维数组，T是最底层数组成员的类型。
const multi: number[][] = [
    [1, 2, 3],
    [23, 24, 25],
  ];

// 上面示例中，变量multi的类型是number[][]，表示它是一个二维数组，最底层的数组成员类型是number。

// 元祖
// 元组（tuple）是 TypeScript 特有的数据类型，JavaScript 没有单独区分这种类型。它表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。
const s: [string, number, boolean] = ['hello', 10, true];

// 元组类型的写法，与上一章的数组有一个重大差异。数组的成员类型写在方括号外面（number[]），元组的成员类型是写在方括号里面（[number]）。

// TypeScript 的区分方法是，成员类型写在方括号里面的就是元组，写在外面的就是数组。

// 使用元组时，必须明确给出类型声明（上例的[number]），不能省略，否则 TypeScript 会把一个值自动推断为数组。

// 元组成员的类型可以添加问号后缀（?），表示该成员是可选的。
// 注意，问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。
let s1: [number, string?] =[ 1 ] 

type myTuple = [number, number, number?, string?];
// 上面示例中，元组myTuple的最后两个成员是可选的。也就是说，它的成员数量可能有两个、三个和四个。

// 但是，使用扩展运算符（...），可以表示不限成员数量的元组。
//                     代表此处数量无限，且数量可以为0个或1个
let tupleArr: [string, ...number[], boolean] = ['1',true]
// 元组可以通过方括号，读取成员类型。
// type Tuple = [string, number, Date];
// type TupleEl = Tuple[number]; // string|number|Date

// 数组长度
{
// const arr12:[number, number] = [1, 2];

function adds(x: number, y: number) {
  // ...
}

// adds(...arr12); // 报错 因为arr12不写成元组类型，长度不可预估，这里认为可能会超出，所以报错，需要写成元组类型

//另一种写法是使用as const断言。
const arr12 = [1, 2] as const;
adds(...arr12);
}