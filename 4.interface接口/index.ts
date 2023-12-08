
// interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}
// 任何实现这个接口的对象，都必须部署这三个属性，并且必须符合规定的类型。

// 方括号运算符可以取出 interface 某个属性的类型[在类型运算里]。

interface Foo {
    a: string
}
{
    type A = Foo['a']
}
// interface 可以表示对象的各种语法，它的成员有 5 种形式。

// 对象属性 a:string; 可选属性 a?:string; 只读 readonly a?: string
// 对象的属性索引 [prop: string]: number 表示属性名只要是字符串，都符合类型要求。 属性索引共有string、number和symbol三种类型。 一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。
// 对象方法
// 函数
// 构造函数

// 一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。

{
    interface MyObj {
        [prop: string]: number
        // a: boolean // 编译报错
    }
}
// 属性的数值索引，其实是指定数组的类型。

{
    interface A {
        [prop: number]: string
    }
    let a: A = {
        1: '1',
        2: '2'
    }
    let a1: A = ['1', '2']
}
//（3）对象的方法

// 对象的方法共有三种写法。

// 写法一
{

    interface A {
        f(x: number): string
    }
    interface B {
        f: (x: number) => string
    }
    interface C {
        f: { (x: number): string }
    }
}
// 属性名可以采用表达式，所以下面的写法也是可以的。
const f1 = 'f'
interface D {
    [f1](x: boolean): string
}

// 类型方法可以重载。
interface E {
    f(): number
    f(x: string): string
    f(x: boolean, y: string): boolean
}
// interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。
{
    interface A {
        f(): number;
        f(x: boolean): boolean;
        f(x: string, y: string): string;
    }
    // 外部给出重载函数
    function MyFunc(): number;
    function MyFunc(x: boolean): boolean;
    function MyFunc(x: string, y: string): string;
    function MyFunc(x?: boolean | string, y?: string): number | boolean | string {
        if (x === undefined && y === undefined) return 1;
        if (typeof x === "boolean" && y === undefined) return true;
        if (typeof x === "string" && typeof y === "string") return "hello";
        throw new Error("wrong parameters");
    }
    // 内部引用
    const a: A = {
        f: MyFunc,
    };

    //上面示例中，接口A的方法f()有函数重载，需要额外定义一个函数MyFunc()实现这个重载，然后部署接口A的对象a的属性f等于函数MyFunc()就可以了。
}
// （4）函数

// interface 也可以用来声明独立的函数。
interface Add {
    (x: number, y: number): number
}
{
    let add: Add = (x: number, y: number): number => x + y
}

// （5）构造函数

// interface 内部可以使用new关键字，表示构造函数。

interface ErrorConstructor {
    new(message?: string): Error
}

// interface 的继承
// interface 可以继承其他类型，主要有下面几种情况。

// interface 继承 interface
// interface 可以使用extends关键字，继承其他 interface。

interface Shape {
    name: string
}
interface Circle extends Shape {
    radius: number
}

// extends关键字会从继承的接口里面拷贝属性类型，这样就不必书写重复的属性。

// interface 允许多重继承。

interface Style {
    color: string;
}

interface Shape {
    name: string;
}

interface Circle extends Style, Shape {
    radius: number;
}


//   如果子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性
interface Foo {
    id: string | number;
}

interface Bar extends Foo {
    id: number; // 报错 当父接口的类型为string时报错，但在string ｜ number不会报错，因为类型兼容
}

// interface 继承 type
// interface 可以继承type命令定义的对象类型。

type Country = {
    name: string;
    capital: string;
};

interface CountryWithPop extends Country {
    population: number;
}

// 上面示例中，CountryWithPop继承了type命令定义的Country对象，并且新增了一个population属性。

// 注意，如果type命令定义的类型不是对象，interface 就无法继承。

// interface 继承 class

// interface 还可以继承 class，即继承该类的所有成员。关于 class 的详细解释，参见下一章。
{

    class A {
        // 没有在底部显示赋值的属性需要给出默认值即不传时使用默认值
        name: string = ''
        prop: string = ''
        // 类型声明和实现是在一块
        y(name: string): string {
            return ''
        }
    }
    interface B extends A {
        pos: string
    }
    let obj: B = {
        pos: '1',
        name: '1',
        prop: '1',
        // 在实现这里name可以后面不加：string也不用标明返回值：string；当然也可以写上；
        y(s) {
            // 这里是函数体可以写任何东西，这里的局限只有参数类型和返回值类型，函数体内部逻辑无关
            let s1 = s + ''
            return ''
        }
    }
    obj.y('1')
}

// 接口合并
// 多个同名接口会合并成一个接口

interface Box {
    height: number;
    width: number;
}

interface Box {
    length: number;
}

//   上面示例中，两个Box接口会合并成一个接口，同时有height、width和length三个属性。

// 这样的设计主要是为了兼容 JavaScript 的行为。JavaScript 开发者常常对全局对象或者外部库，添加自己的属性和方法。那么，只要使用 interface 给出这些自定义属性和方法的类型，就能自动跟原始的 interface 合并，使得扩展外部类型非常方便。

// 举例来说，Web 网页开发经常会对windows对象和document对象添加自定义属性，但是 TypeScript 会报错，因为原始定义没有这些属性。解决方法就是把自定义属性写成 interface，合并进原始定义。

interface Document {
    foo: string;
}

document.foo = "hello";

//   上面示例中，接口Document增加了一个自定义属性foo，从而就可以在document对象上使用自定义属性。

//   同名接口合并时，同一个属性如果有多个类型声明，彼此不能有类型冲突。

// interface A {
//     a: number;
//   }

//   interface A {
//     a: string; // 报错
//   }

// 同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。

// interface Cloner {
//     clone(animal: Animal): Animal;
//   }

//   interface Cloner {
//     clone(animal: Sheep): Sheep;
//   }

//   interface Cloner {
//     clone(animal: Dog): Dog;
//     clone(animal: Cat): Cat;
//   }

//   // 等同于
//   interface Cloner {
//     clone(animal: Dog): Dog;
//     clone(animal: Cat): Cat;
//     clone(animal: Sheep): Sheep;
//     clone(animal: Animal): Animal;
//   }

// 这个规则有一个例外。同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级

{
    interface A {
        f(x: "foo"): boolean;
    }

    interface A {
        f(x: any): void;
    }

    // 等同于
    interface A {
        f(x: "foo"): boolean;
        f(x: any): void;
    }
}

{
    interface Circle {
        area: bigint;
    }

    interface Rectangle {
        area: number;
    }
    //@ts-ignore
    declare const s: Circle | Rectangle;

    s.area; // bigint | number
    // 上面示例中，接口Circle和Rectangle组成一个联合类型Circle | Rectangle。因此，这个联合类型的同名属性area，也是一个联合类型。本例中的declare命令表示变量s的具体定义，由其他脚本文件给出，详见《declare 命令》一章。
}

// interface 与 type 的异同

// 它们的相似之处，首先表现在都能为对象类型起名。

// interface 与 type 的区别有下面几点。

// （1）type能够表示非对象类型，而interface只能表示对象类型（包括数组、函数等）。

// （2）interface可以继承其他类型，type不支持继承。

// 继承的主要作用是添加属性，type定义的对象类型如果想要添加属性，只能使用&运算符，重新定义一个类型。
{
    type Animal = {
        name: string;
    };

    type Bear = Animal & {
        honey: boolean;
    };
}
// 作为比较，interface添加属性，采用的是继承的写法。

{
    interface Animal {
        name: string;
    }

    interface Bear extends Animal {
        honey: boolean;
    }
}

// 继承时，type 和 interface 是可以换用的。interface 可以继承 type。

{
    type Foo = { x: number };

    interface Bar extends Foo {
        y: number;
    }
}

// type 也可以继承 interface。

{
    interface Foo {
        x: number;
    }

    type Bar = Foo & { y: number };
}
//（3）同名interface会自动合并，同名type则会报错。也就是说，TypeScript 不允许使用type多次定义同一个类型。

// type A = { foo: number }; // 报错
// type A = { bar: number }; // 报错

// 作为比较，interface则会自动合并

{
    interface A {
        foo: number;
    }
    interface A {
        bar: number;
    }

    const obj: A = {
        foo: 1,
        bar: 1,
    };
}
// 这表明，interface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type。

// （4）interface不能包含属性映射（mapping），type可以，详见《映射》一章。

{
    interface Point {
        x: number;
        y: number;
    }

    // 正确
    type PointCopy1 = {
        [Key in keyof Point]: Point[Key];
    };

    // 报错
    interface PointCopy2 {
        // [Key in keyof Point]: Point[Key];
    };
}

// （5）this关键字只能用于interface。

// 正确
{
    interface Foo {
        add(num: number): this;
    }

    // 报错
    {
        type Foo = {
            // add(num: number): this;
        };
    }
}

// 下面是返回this的实际对象的例子。

{
    // class Calculator implements Foo {
    //     result = 0;
    //     add(num：number) {
    //       this.result += num;
    //       return this;
    //     }
    //   }
}
// （6）type 可以扩展原始数据类型，interface 不行。

// // 正确
// type MyStr = string & {
//   type: "new";
// };

// // 报错
// interface MyStr extends string {
//   type: "new";
// }
// 上面示例中，type 可以扩展原始数据类型 string，interface 就不行。

// （7）interface无法表达某些复杂类型（比如交叉类型和联合类型），但是type可以。

{
    type A = {
        /* ... */
    };
    type B = {
        /* ... */
    };

    type AorB = A | B;
    type AorBwithName = AorB & {
        name: string;
    };
}

// 上面示例中，类型AorB是一个联合类型，AorBwithName则是为AorB添加一个属性。这两种运算，interface都没法表达。
// 
// 综上所述，如果有复杂的类型运算，那么没有其他选择只能使用type；一般情况下，interface灵活性比较高，便于扩充类型或自动合并，建议优先使用。