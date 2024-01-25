// TypeScript 装饰器

// 装饰器（Decorator）是一种语法结构，用来在定义时修改类（class）的行为。

// 在语法上，装饰器有如下几个特征。

// （1）第一个字符（或者说前缀）是@，后面是一个表达式。

// （2）@后面的表达式，必须是一个函数（或者执行后可以得到一个函数）。

// （3）这个函数接受所修饰对象的一些相关值作为参数。

// （4）这个函数要么不返回值，要么返回一个新对象取代所修饰的目标对象。

function simpleDecorator(target: any, context: any) {
    console.log("hi, this is " + target);
    return target;
}

@simpleDecorator
class A { } // "hi, this is class A {}"

// 装饰器有多种形式，基本上只要在@符号后面添加表达式都是可以的。下面都是合法的装饰器。

// @myFunc
// @myFuncFactory(arg1, arg2)

// @libraryModule.prop
// @someObj.method(123)

// @(wrap(dict['prop']))
// 注意，@后面的表达式，最终执行后得到的应该是一个函数

// 相比使用子类改变父类，装饰器更加简洁优雅，缺点是不那么直观，功能也受到一些限制。所以，装饰器一般只用来为类添加某种特定行为。

// @frozen
// class Foo {
//   @configurable(false)
//   @enumerable(true)
//   method() {}

//   @throttle(500)
//   expensiveMethod() {}
// }
// 上面示例中，一共有四个装饰器，一个用在类本身（@frozen），另外三个用在类的方法（@configurable、@enumerable、@throttle）。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能

// 类装饰器

// 类装饰器接受两个参数：value（当前类本身）和context（上下文对象）。其中，context对象的kind属性固定为字符串class。
// 类装饰器一般用来对类进行操作，可以不返回任何值，请看下面的例子
function Greeter(value: any, context: any) {
    if (context.kind === "class") {
        value.prototype.greet = function () {
            console.log("你好");
        };
    }
}

@Greeter
class User {
    greet() { }
}

let u = new User();
u.greet(); // "你好"
// 上面示例中，类装饰器@Greeter在类User的原型对象上，添加了一个greet()方法，实例就可以直接使用该方法。

// 类装饰器可以返回一个函数，替代当前类的构造方法。

function countInstances(value: any, context: any) {
    let instanceCount = 0;

    const wrapper = function (...args: any[]) {
        instanceCount++;
        const instance = new value(...args);
        instance.count = instanceCount;
        return instance;
    } as unknown as typeof MyClass;

    wrapper.prototype = value.prototype; // A
    return wrapper;
}
@countInstances
class MyClass { }

const inst1 = new MyClass();
inst1 instanceof MyClass; // true
// @ts-ignore
inst1.count; // 1  

// 类装饰器也可以返回一个新的类，替代原来所装饰的类。

// function countInstances(value: any, context: any) {
//     let instanceCount = 0;

//     return class extends value {
//       constructor(...args: any[]) {
//         super(...args);
//         instanceCount++;
//         this.count = instanceCount;
//       }
//     };
//   }

//   @countInstances
//   class MyClass {}

//   const inst1 = new MyClass();
//   inst1 instanceof MyClass; // true
//   inst1.count; // 1

// 类装饰器的上下文对象context的addInitializer()方法，用来定义一个类的初始化函数，在类完全定义结束后执行。
// function customElement(name: string) {
//     return <Input extends new (...args: any) => any>(
//       value: Input,
//       context: ClassDecoratorContext
//     ) => {
//       context.addInitializer(function () {
//         customElements.define(name, value);
//       });
//     };
//   }

//   @customElement("hello-world")
//   class MyComponent extends HTMLElement {
//     constructor() {
//       super();
//     }
//     connectedCallback() {
//       this.innerHTML = `<h1>Hello World</h1>`;
//     }
//   }
// 方法装饰器
// 方法装饰器用来装饰类的方法（method）。它的类型描述如下。
// 方法装饰器会改写类的原始方法，实质等同于下面的操作。

// function trace(decoratedMethod: any) {
//     // ...
//   }

//   class C {
//     @trace
//     toString() {
//       return "C";
//     }
//   }

// `@trace` 等同于
// C.prototype.toString = trace(C.prototype.toString);
// 方法装饰器：相当于进行一层封装，返回一个新方法替代原方法
// 类装饰器：1.可以不反悔任何东西，直接拿到originClass进行原型操作
//         2. 可以返回一个方法，替代类的原本的构造函数
//         3. 可以返回一个新的类，替代现有的类
function replaceMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
    return function (this: Person) {
        return `How are you, ${this.name}?`;
    };
}

class Person {
    name!: string
    constructor(name: string) {
        this.name = name;
    }

    @replaceMethod
    hello() {
        return `Hi ${this.name}!`;
    }
}

const robin = new Person("Robin");


console.log(robin.hello());   // 'How are you, Robin?'

//   利用方法装饰器，可以将类的方法变成延迟执行。

function delay(milliseconds: number = 0) {
    return function (value: any, context: ClassMethodDecoratorContext) {
        if (context.kind === "method") {
            return function (this: Logger, ...args: any[]) {
                setTimeout(() => {
                    value.apply(this, args);
                }, milliseconds);
            };
        }
    };
}

class Logger {

    // 在这里接受参数则第一个函数不是接受context和originMethods的方法，返回的才是
    @delay(1000)
    log(msg: string) {
        console.log(`${msg}`);
    }
}
// 上面示例中，方法装饰器@delay(1000)将方法log()的执行推迟了 1 秒（1000 毫秒）。这里
// 真正的方法装饰器，是delay()执行后返回的函数，delay()的作用是接收参数，用来设置推迟
// 执行的时间。这种通过高阶函数返回装饰器的做法，称为“工厂模式”，即可以像工厂那样生产出一个模子的装饰器。
let logger = new Logger();
logger.log("Hello World");

class Person1 {
    name: string;
    constructor(name: string) {
        this.name = name;

        // greet() 绑定 this
        this.greet = this.greet.bind(this);
    }
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const g = new Person1("张三").greet;
g(); // "Hello, my name is 张三."
//上面例子中，类Person的构造方法内部，将this与greet()方法进行了绑定。如果没有这一行，将greet()赋值给变量g进行调用，就会报错了。
// this的绑定必须放在构造方法里面，因为这必须在类的初始化阶段完成。现在，它可以移到方法装饰器的addInitializer()里面。
function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
        throw new Error(`不能绑定私有方法 ${methodName as string}`);
    }
    context.addInitializer(function (this: any) {
        this[methodName] = this[methodName].bind(this);
    });
}
// 上面示例中，绑定this转移到了addInitializer()方法里面。

// 下面再看一个例子，通过addInitializer()将选定的方法名，放入一个集合。
let that = ''
function collect(value: any, { name, addInitializer }: ClassMethodDecoratorContext) {
    addInitializer(function (this: any) {
        that = this
        if (!this.collectedMethodKeys) {
            this.collectedMethodKeys = new Array();
        }
        this.collectedMethodKeys.push(name);
    });
}

class C {
    public collectedMethodKeys!: Array<string>;
    @collect
    toString() { }

    @collect
    //@ts-ignore
    [Symbol.iterator]() { }
}

const inst = new C();
console.log('1', inst.collectedMethodKeys);

function logged(value: any, context: ClassFieldDecoratorContext) {
    const { kind, name } = context;
    if (kind === "field") {
        // 返回一个函数参数默认接收初始值，没有就是undefined
        return function (initialValue: string) {
            console.log(`initializing ${String(name)} with value ${initialValue}`);
            return initialValue;
        };
    }
}

class Color {
    @logged name!: string;
}

const color = new Color();
// "initializing name with value green"

// 上面示例中，属性装饰器@logged装饰属性name。@logged的返回值是一个函数，该函数用来对属性name进行初始化，它的参数initialValue就是属性name的初始值green。新建实例对象color时，该函数会自动执行。
// 属性装饰器的返回值函数，可以用来更改属性的初始值。

function twice(value: any, context: ClassFieldDecoratorContext) {
    return (initialValue: any) => initialValue * 2;
}

class C1 {
    @twice
    field = 3;
}

const inst11 = new C1();
console.log(inst11.field);// 6

// 属性装饰器的上下文对象context的access属性，提供所装饰属性的存取器，请看下面的例子。

let acc: any;

function exposeAccess(value: any, { access }: ClassFieldDecoratorContext) {
    acc = access;
}

class Color1 {
    @exposeAccess
    name = "green";
}

const green = new Color1();
green.name; // 'green'

acc.get(green); // 'green'

acc.set(green, "red");
console.log(green.name);

// getter 装饰器，setter 装饰器
// getter 装饰器和 setter 装饰器，是分别针对类的取值器（getter）和存值器（setter）的装饰器。它们的类型描述如下。

// 注意，getter 装饰器的上下文对象context的access属性，只包含get()方法；setter 装饰器的access属性，只包含set()方法。

// 这两个装饰器要么不返回值，要么返回一个函数，取代原来的取值器或存值器。

// 下面的例子是将取值器的结果，保存为一个属性，加快后面的读取。

class C2 {
    @lazy
    get value() {
        console.log("正在计算……");
        return "开销大的计算结果";
    }
}

function lazy(value: any, { kind, name }: any) {
    if (kind === "getter") {
        return function (this: any) {
            const result = value.call(this);
            Object.defineProperty(this, name, {
                value: result,
                writable: false,
            });
            return result;
        };
    }
    return;
}

const inst2 = new C2();
inst2.value;
// 正在计算……
// '开销大的计算结果'
inst2.value;
// '开销大的计算结果'

// 上面示例中，第一次读取inst.value，会进行计算，然后装饰器@lazy将结果存入只读属性value，后面再读取这个属性，就不会进行计算了。

// accessor 装饰器
// 装饰器语法引入了一个新的属性修饰符accessor。

// accessor 装饰器的value参数，是一个包含get()方法和set()方法的对象。该装饰器可以不返回值，或者返回一个新的对象，用来取代原来的get()方法和set()方法。此外，装饰器返回的对象还可以包括一个init()方法，用来改变私有属性的初始值。

// 下面是一个例子。

class C3 {
    // @ts-ignore
    @logged1 accessor x = 1;
}
// @ts-ignore
function logged1(value: any, { kind, name }: ClassAccessorDecorator) {
    if (kind === "accessor") {
        let { get, set } = value;

        return {
            get() {
                console.log(`getting ${name}`);

                return get.call(this);
            },

            set(val: any) {
                console.log(`setting ${name} to ${val}`);

                return set.call(this, val);
            },

            init(initialValue: any) {
                console.log(`initializing ${name} with value ${initialValue}`);
                return initialValue;
            },
        };
    }
}

let c = new C3();

c.x;
// getting x

c.x = 123;
// setting x to 123

// 要去劫持一个对象属性实现在改变后进行什么操作就是要去设置getter和setter，proxy可以直接劫持整个对象达到对对象的get和setter来实现对属性的日志输出
// 上面示例中，装饰器@logged为属性x的存值器和取值器，加上了日志输出。

// 装饰器的执行顺序
// 装饰器的执行分为两个阶段。

// （1）评估（evaluation）：计算@符号后面的表达式的值，得到的应该是函数。

// （2）应用（application）：将评估装饰器后得到的函数，应用于所装饰对象。

// 也就是说，装饰器的执行顺序是，先评估所有装饰器表达式的值，再将其应用于当前类。

// 应用装饰器时，顺序依次为方法装饰器和属性装饰器，然后是类装饰器。

// 请看下面的例子。

function d(str: string) {
    console.log(`评估 @d(): ${str}`);
    return (value: any, context: any) => console.log(`应用 @d(): ${str}`);
}

function log(str: string) {
    console.log(str);
    return str;
}

@d("类装饰器")
class T {
    @d("静态属性装饰器")
    static staticField = log("静态属性值");

    @d("原型方法")
    [log("计算方法名")]() { }

    @d("实例属性")
    instanceField = log("实例属性值");
}

// 评估 @d(): 类装饰器
// 评估 @d(): 静态属性装饰器
// 评估 @d(): 原型方法
// 计算方法名
// 评估 @d(): 实例属性
// 应用 @d(): 原型方法
// 应用 @d(): 静态属性装饰器
// 应用 @d(): 实例属性
// 应用 @d(): 类装饰器
// 静态属性值

// 可以看到，类载入的时候，代码按照以下顺序执行。

// （1）装饰器评估：这一步计算装饰器的值，首先是类装饰器，然后是类内部的装饰器，按照它们出现的顺序。

// 注意，如果属性名或方法名是计算值（本例是“计算方法名”），则它们在对应的装饰器评估之后，也会进行自身的评估。

// （2）装饰器应用：实际执行装饰器函数，将它们与对应的方法和属性进行结合。

// 原型方法的装饰器首先应用，然后是静态属性和静态方法装饰器，接下来是实例属性装饰器，最后是类装饰器。

// 注意，“实例属性值”在类初始化的阶段并不执行，直到类实例化时才会执行。

// 如果一个方法或属性有多个装饰器，则内层的装饰器先执行，外层的装饰器后执行。

function log1(value: any, context:ClassMethodDecoratorContext) {
    console.log('1');
}
class Person12 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @bound
    @log1
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}
// 上面示例中，greet()有两个装饰器，内层的 @log先执行，外层的 @bound针对得到的结果再执行。
export = {}
