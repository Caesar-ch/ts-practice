// 函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

// 如果变量被赋值为一个函数，变量的类型有两种写法。

// 写法一
const hello1 = function (txt: string) {
    console.log("hello1 " + txt);
};

// 写法二
const hello2: (txt: string) => void = function (txt) {
    console.log("hello2 " + txt);
};

// 上面示例中，变量hello被赋值为一个函数，它的类型有两种写法。写法一是通过等号右边的函数类型，推断出变量hello的类型；写法二则是使用箭头函数的形式，为变量hello指定类型，参数的类型写在箭头左侧，返回值的类型写在箭头右侧。

// 函数类型里面的参数名与实际参数名，[可以不一致]。

let f: (x: number) => number;

f = function (y: number) {
    return y;
};
// 如果函数的类型定义很冗长，或者多个函数使用同一种类型，写法二用起来就很麻烦。因此，往往用type命令为函数类型定义一个别名，便于指定给其他变量。

// 函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数。

// let myFunc: (a: number, b: number) => number;

// myFunc = (a: number) => a; // 正确

// myFunc = (a: number, b: number, c: number) => a + b + c; // 报错

// 如果一个变量要套用另一个函数类型，有一个小技巧，就是使用typeof运算符。

function add(x: number, y: number): number {
    return x + y;
}
const myAdd: typeof add = function (x, y) {
    return x + y;
}

// 上面示例中，函数myAdd()的类型与函数add()是一样的，那么就可以定义成typeof add。因为函数名add本身不是类型，而是一个值，所以要用typeof运算符返回它的类型。

// 函数类型还可以采用对象的写法。

let add1: {
    (x: number, y: number): number;
};

add1 = function (x, y) {
    return x + y;
};
// 这种写法平时很少用，但是非常合适用在一个场合：函数本身存在属性。
function fs(x: number) {
    console.log(x);
}

fs.version = "1.0";
let foo: {
    (x: number): void;
    version: string;
} = fs;


// 函数类型也可以使用 Interface 来声明，这种写法就是对象写法的翻版，详见《Interface》一章。

interface myfn {
    (a: number, b: number): number;
}

var fns: myfn = (a, b) => a + b;

// Function 类型
// TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。
function doSomething(f: Function) {
    return f(1, 2, 3);
}

//   Function 类型的函数可以接受任意数量的参数，每个参数的类型都是any，返回值的类型也是any，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。

// 箭头函数
// 箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。

function greet(fn: (a: string) => void): void {
    fn("world");
}
//   上面示例中，函数greet()的参数fn是一个函数，类型就用箭头函数表示。这时，fn的返回值类型要写在[箭头右侧]，而不是写在参数列表的圆括号后面。

// 箭头函数正确类型写法
type Res = { name: '1' }
let miniFn = (name): Res => ({ name: '1' }) // 正确
// let miniFn1 = (name:Res） => ({name: '1'}) // 错误
// let miniFn2 = name:(Res) => ({name: '1'}) // 错误

// 可选参数
// 如果函数的某个参数可以省略，则在参数名后面加问号表示。
function fx(x?: number) {
    // ...
}

fx(); // OK
fx(10); // OK

// 函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。

// 参数默认值

// 设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值。

function createPointer(x: number = 1, y: string = '1'): string {
    return x + y + ''
}
createPointer()

// 可选参数与默认值不能同时使用。
// 设有默认值的参数，如果传入undefined，也会触发默认值。
// 具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，必须显式传入undefined。


// 参数解构
// 函数参数如果存在变量解构，类型写法如下。

function destruction([a, b]: [number, string]): string {
    return a + b;
}
destruction([1, '2'])

function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
}
// 参数结构可以结合类型别名（type 命令）一起使用，代码会看起来简洁一些。

// type ABC = { a: number; b: number; c: number };

// function sum({ a, b, c }: ABC) {
//   console.log(a + b + c);
// }

// rest 参数
// rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。

// rest 参数为数组
function joinNumbers(...nums: number[]) {
}
// ...

// rest 参数为元组
function fsx(...args: [boolean, number]) {
    // ...
}
// readonly 只读参数
// function arraySum(arr: readonly number[]) {
//     // ...
//     arr[0] = 0; // 报错
// }

// void 类型
// void 类型表示函数没有返回值。

// void 类型允许返回undefined或null。

// function f(): void {
//   return undefined; // 正确
// }

// function f(): void {
//   return null; // 正确
// }
// 这是因为 JavaScript 规定，如果函数没有返回值，就等同于返回undefined。


// 局部类型
// 函数内部允许声明其他类型，该类型只在函数内部有效，称为局部类型。

// function hello(txt: string) {
//     type message = string;
//     let newTxt: message = "hello " + txt;
//     return newTxt;
//  }
  
//  const newTxt: message = hello("world"); // 报错

// 高阶函数

// 一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。

// 下面就是一个例子，箭头函数返回的还是一个箭头函数。

let mini = (a: number) => (b:number) => a + b

// 函数重载
// 有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。

// TypeScript 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型。

function reverse(str: string): string;
function reverse(arr: any[]): any[];
function reverse(stringOrArray: string | any[]): string | any[] {
  if (typeof stringOrArray === "string")
    return stringOrArray.split("").reverse().join("");
  else return stringOrArray.slice().reverse();
}
// 上面示例中，前两行类型声明列举了重载的各种情况。第三行是函数本身的类型声明，它必须与前面已有的重载声明兼容。

// 函数重载和实现的区别，以及函数重载的必要性
// 例如, 如果你想调用 reverse("hello") 并且期望得到一个字符串结果, TypeScript将无法保证这一点, 
// 因为返回值可能是数组. 在删除前两行之后, 该函数可能会返回一个字符串或者数组.
// 所以，在使用TypeScript时，我们通常推荐尽可能地利用其强大的静态类型系统来帮助我们捕获潜在错误并提高代码质量。

// 另外，虽然函数的具体实现里面，有完整的类型声明。但是，函数实际调用的类型，以前面的类型声明为准。比如，上例的函数实现，参数类型和返回值类型都是number|any[]，但不意味着参数类型为number时返回值类型为any[]。

// 重载声明的排序很重要，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。

// 对象的方法也可以使用重载。

class StringBuilder {
    #data = ""; // filed
  
    add(num: number): this;
    add(bool: boolean): this;
    add(str: string): this;
    add(value: any): this {
      this.#data += String(value);
      return this;
    }
  
    toString() {
      return this.#data;
    }
  }

//   函数重载也可以用来精确描述函数参数与返回值之间的对应关系。