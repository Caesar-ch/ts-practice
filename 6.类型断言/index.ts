// 对于没有类型声明的值，TypeScript 会进行类型推断，很多时候得到的结果，未必是开发者想要的。
// type T = "a" | "b" | "c";
// let foo = "a";

// let bar: T = foo; // 报错 不能将string分配给类型T
// TypeScript 提供了“类型断言”这样一种手段，允许开发者在代码中“断言”某个值的类型，告诉编译器此处的值是什么类型。TypeScript 一旦发现存在类型断言，就不再对该值进行类型推断，而是直接采用断言给出的类型。

// 这种做法的实质是，允许开发者在某个位置“绕过”编译器的类型推断，让本来通不过类型检查的代码能够通过，避免编译器报错。这样虽然削弱了 TypeScript 类型系统的严格性，但是为开发者带来了方便，毕竟开发者比编译器更了解自己的代码。

// 总结：就是ts会进行类型推断，但不一定推断出来的是我们需要的，因为推断出来的可能不满足类型兼容性，报错，断言就是告诉此处绕过类型推断直接使用给出的断言类型

type T = "a" | "b" | "c";

let foo = "a";
let bar: T = foo as T; // 正确

// 上面示例中，最后一行的foo as T表示告诉编译器，变量foo的类型断言为T，所以这一行不再需要类型推断了，编译器直接把foo的类型当作T，就不会报错了。

// 总之，类型断言并不是真的改变一个值的类型，而是提示编译器，应该如何处理这个值。

// 类型断言有两种语法。

// 语法一：<类型>值
// <Type>value;

// 语法二：值 as 类型
// value as Type;

// 上面两种语法是等价的，value表示值，Type表示类型。早期只有语法一，后来因为 TypeScript 开始支持 React 的 JSX 语法（尖括号表示 HTML 元素），为了避免两者冲突，就引入了语法二。目前，推荐使用语法二。

// 语法一
{
let bar: T = <T>foo;
}{
// 语法二
let bar: T = foo as T;
}
// 类型断言的作用，就是告诉编译器，“相信我，我知道自己在干什么”。类型断言的语法，是<Type>value，它的
{
    // const p: { x: number } = { x: 0, y: 0 };
}
// 在TypeScript中，你不能将一个只有部分属性或者多余属性的对象赋值给另一个已经明确定义所有需要的属性和类型信息的变量。
const p0: { x: number } = { x: 0, y: 0 } as { x: number };
const p1: { x: number } = { x: 0, y: 0 } as {x: number, y:number}

// 上面示例中，两种类型断言都是正确的。第一种断言将类型改成与等号左边一致，第二种断言使得等号右边的类型是左边类型的子类型，子类型可以赋值给父类型，同时因为存在类型断言，就没有严格字面量检查了，所以不报错。

// 子类定义
// 如果一个类型A比另一个类型B多一个或者多个属性，则我们可以说A是B的子类型。
// 子类型可以赋值给父类（即具有较少属性的类），但是反过来则不行。

// 下面是一个网页编程的实际例子。

// const username = document.getElementById("username");

// if (username) {
//   (username as HTMLInputElement).value; // 正确
// }
// 上面示例中，变量username的类型是HTMLElement | null，排除了null的情况以后，HTMLElement 类型是没有value属性的。如果username是一个输入框，那么就可以通过类型断言，将它的类型改成HTMLInputElement，就可以读取value属性。

// 类型断言不应滥用，因为它改变了 TypeScript 的类型检查，很可能埋下错误的隐患。

const data: object = {
  a: 1,
  b: 2,
  c: 3,
};

// data.length; // 报错

(data as Array<string>).length; // 正确

// 上面示例中，变量data是一个对象，没有length属性。但是通过类型断言，可以将它的类型断言为数组，这样使用【length属性就能通过类型检查】。但是，编译后的代码在运行时依然会报错，所以类型断言可以让错误的代码通过编译。

// 作用二：类型断言的一大用处是，指定 unknown 类型的变量的具体类型。

let value:unknown = 'hello world'

// const s1:string = value
const s2:string = value as string
// 上面示例中，unknown 类型的变量value不能直接赋值给其他类型的变量，但是可以将它断言为其他类型，这样就可以赋值给别的变量了。

// 作用三： 另外，类型断言也适合指定联合类型的值的具体类型。

{
    const s1: number | string = "hello";
    // const s2: number = s1 as number;
}

//类型断言的条件
// 类型断言并不意味着，可以把某个值断言为任意类型。

const n = 1;
const m: string = n as string; // 报错


// 类型断言的使用前提是，值的实际类型与断言的类型必须满足一个条件。

// expr as T;
// 上面代码中，expr是实际的值，T是类型断言，它们必须满足下面的条件：expr是T的子类型，或者T是expr的子类型。

// 也就是说，类型断言要求实际的类型与断言的类型兼容，实际类型可以断言为一个更加宽泛的类型（父类型），也可以断言为一个更加精确的类型（子类型），但不能断言为一个完全无关的类型。
// 但是，如果真的要断言成一个完全无关的类型，也是可以做到的。那就是连续进行两次类型断言，先断言成 unknown 类型或 any 类型，然后再断言为目标类型。因为any类型和unknown类型是所有其他类型的父类型，所以可以作为两种完全无关的类型的中介。

// expr as unknown as T;

// 上面代码中，expr连续进行了两次类型断言，第一次断言为unknown类型，第二次断言为T类型。这样的话，expr就可以断言成任意类型T，而不报错。

// 下面是本小节开头那个例子的改写。


// 在这段代码中，n被初始化为数值1, 然后通过 as unknown as string 将其断言（转化）为 string 类型并赋值给了 m. 由于原始数据类型并未改变，所以如果接下来的代码期望 m 是一个真正的字符串，并对其执行一些特定于字符串的操作（如 .split(), .substring()等），那么就会出现运行时错误。
{const n = 1;
const m: string = n as unknown as string; // 正确
}
// 因此,虽然该代码片段在编译时不会报错(因为你已经明确地告诉了TypeScript编译器：我知道我正在做什么，但在运行时可能会出现问题。

// as const 断言
// 如果没有声明变量类型，let 命令声明的变量，会被类型推断为 TypeScript 内置的基本类型之一；const 命令声明的变量，则被推断为值类型常量。

{
    // 类型推断为基本类型 string
let s1 = "JavaScript";

// 类型推断为字符串 “JavaScript”
const s2 = "JavaScript";
// 上面示例中，变量s1的类型被推断为string，变量s2的类型推断为值类型JavaScript。后者是前者的子类型，相当于 const 命令有更强的限定作用，可以缩小变量的类型范围。

let s = "JavaScript" as const;

type Lang = "JavaScript" | "TypeScript" | "Python";

function setLang(language: Lang) {
  /* ... */
}

setLang(s); // 报错 类型string的参数不能赋值给Lang类型的参数，该用const就可以
// 上面示例中，最后一行报错，原因是函数setLang()的参数language类型是Lang，这是一个联合类型。但是，传入的字符串s的类型被推断为string，属于Lang的父类型。父类型不能替代子类型，导致报错。
// 注意，as const断言只能用于字面量，不能用于变量。
// 另外，as const也不能用于表达式。

// let s = ("Java" + "Script") as const; // 报错
// as const断言可以用于整个对象，也可以用于对象的单个属性，这时它的类型缩小效果是不一样的。

{
    const v1 = {
        x: 1,
        y: 2,
      }; // 类型是 { x: number; y: number; }
      
      const v2 = {
        x: 1 as const,
        y: 2,
      }; // 类型是 { x: 1; y: number; }
      
      const v3 = {
        x: 1,
        y: 2,
      } as const; // 类型是 { readonly x: 1; readonly y: 2; }
}
// 上面示例中，第二种写法是对属性x缩小类型，第三种写法是对整个对象缩小类型。

// 总之，as const会将字面量的类型断言为不可变类型，缩小成 TypeScript 允许的最小类型。

// 下面是数组的例子。

// a1 的类型推断为 number[]
const a1 = [1, 2, 3];

// a2 的类型推断为 readonly [1, 2, 3]
const a2 = [1, 2, 3] as const;
// 上面示例中，数组字面量使用as const断言后，类型推断就变成了只读元组。

// 由于as const会将数组变成只读元组，所以很适合用于函数的 rest 参数。
}
function add(x: number, y: number) {
    return x + y;
  }
  
//   const nums = [1, 2];
//   const total = add(...nums); // 报错

// 上面示例中，变量nums的类型推断为number[]，导致使用扩展运算符...传入函数add()会报错，因为add()只能接受两个参数，而...nums并不能保证参数的个数。
const nums = [1, 2] as const;
const total = add(...nums); // 正确
// 上面示例中，使用as const断言后，变量nums的类型会被推断为readonly [1, 2]，使用扩展运算符展开后，正好符合函数add()的参数类型。

// 非空断言
// 对于那些可能为空的变量（即可能等于undefined或null），TypeScript 提供了非空断言，保证这些变量不会为空，写法是在变量名后面加上感叹号!。

function f(x?: number | null) {
    validateNumber(x); // 自定义函数，确保 x 是数值
    console.log(x!.toFixed());
  }
  
  function validateNumber(e?: number | null) {
    if (typeof e !== "number") throw new Error("Not a number");
  }

//   上面示例中，函数f()的参数x的类型是number|null，即可能为空。如果为空，就不存在x.toFixed()方法，这样写会报错。但是，开发者可以确认，经过validateNumber()的前置检验，变量x肯定不会为空，这时就可以使用非空断言，为函数体内部的变量x加上后缀!，x!.toFixed()编译就不会报错了。

// 非空断言在实际编程中很有用，有时可以省去一些额外的判断。

// const root = document.getElementById("root");

// // 报错 root可能为null
// root.addEventListener("click", (e) => {
//   /* ... */
// });

// 上面示例中，getElementById()有可能返回空值null，即变量root可能为空，这时对它调用addEventListener()方法就会报错，通不过编译。但是，开发者如果可以确认root元素肯定会在网页中存在，这时就可以使用非空断言。
{
const root = document.getElementById("root")!;

if (root === null) {
    throw new Error("Unable to find DOM element #root");
  }
  
  root.addEventListener("click", (e) => {
    /* ... */
  });
}
// 非空断言还可以用于赋值断言。TypeScript 有一个编译设置，要求类的属性必须初始化（即有初始值），如果不对属性赋值就会报错。


{
    // class Point {
    //     x: number; // 报错
    //     y: number; // 报错
      
    //     constructor(x: number, y: number) {
    //       // ...
    //     }
    //   }
}
// 上面示例中，属性x和y会报错，因为 TypeScript 认为它们没有初始化。

// 这时就可以使用非空断言，表示这两个属性肯定会有值，这样就不会报错了。
class Point {
    x!: number; // 正确
    y!: number; // 正确
  
    constructor(x: number, y: number) {
      // ...
    }
  }
//   断言函数
//   断言函数是一种特殊函数，用于保证函数参数符合某种类型。如果函数参数达不到要求，就会抛出错误，中断程序执行；如果达到要求，就不进行任何操作，让代码按照正常流程运行。

// function isString(value) {
//     if (typeof value !== "string") throw new Error("Not a string");
//   }

// 上面示例中，函数isString()就是一个断言函数，用来保证参数value是一个字符串。

// 下面是它的用法。

// 上面代码中，函数参数value的类型是unknown，返回值类型是void，即没有返回值。可以看到，单单从这样的类型声明，很难看出isString()是一个断言函数。

// 为了更清晰地表达断言函数，TypeScript 3.7 引入了新的类型写法。

// function isString(value: unknown): asserts value is string {
//   if (typeof value !== "string") throw new Error("Not a string");
// }
// const aValue: string | number = "Hello";
// isString(aValue);

// 上面示例中，函数isString()的返回值类型写成asserts value is string，其中asserts和is都是关键词，value是函数的参数名，string是函数参数的预期类型。它的意思是，该函数用来断言参数value的类型是string，如果达不到要求，程序就会在这里中断。




export {}