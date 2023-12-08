// interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构
{
}
// interface 可以表示对象的各种语法，它的成员有 5 种形式。
// 对象属性 a:string; 可选属性 a?:string; 只读 readonly a?: string
// 对象的属性索引 [prop: string]: number 表示属性名只要是字符串，都符合类型要求。 属性索引共有string、number和symbol三种类型。 一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。
// 对象方法
// 函数
// 构造函数
// 一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。
{
}
// 属性的数值索引，其实是指定数组的类型。
{
    var a = {
        1: '1',
        2: '2'
    };
    var a1 = ['1', '2'];
}
//（3）对象的方法
// 对象的方法共有三种写法。
// 写法一
{
}
// 属性名可以采用表达式，所以下面的写法也是可以的。
var f1 = 'f';
// interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。
{
    function MyFunc(x, y) {
        if (x === undefined && y === undefined)
            return 1;
        if (typeof x === "boolean" && y === undefined)
            return true;
        if (typeof x === "string" && typeof y === "string")
            return "hello";
        throw new Error("wrong parameters");
    }
    // 内部引用
    var a = {
        f: MyFunc,
    };
    //上面示例中，接口A的方法f()有函数重载，需要额外定义一个函数MyFunc()实现这个重载，然后部署接口A的对象a的属性f等于函数MyFunc()就可以了。
}
{
    var add = function (x, y) { return x + y; };
}
// 上面示例中，CountryWithPop继承了type命令定义的Country对象，并且新增了一个population属性。
// 注意，如果type命令定义的类型不是对象，interface 就无法继承。
// interface 继承 class
// interface 还可以继承 class，即继承该类的所有成员。关于 class 的详细解释，参见下一章。
{
    var A = /** @class */ (function () {
        function A() {
            // 没有在底部显示赋值的属性需要给出默认值即不传时使用默认值
            this.name = '';
            this.prop = '';
        }
        // 类型声明和实现是在一块
        A.prototype.y = function (name) {
            return '';
        };
        return A;
    }());
    var obj = {
        pos: '1',
        name: '1',
        prop: '1',
        // 在实现这里name可以后面不加：string也不用标明返回值：string；当然也可以写上；
        y: function (s) {
            // 这里是函数体可以写任何东西，这里的局限只有参数类型和返回值类型，函数体内部逻辑无关
            var s1 = s + '';
            return '';
        }
    };
    obj.y('1');
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
}
{
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
}
// 作为比较，interface添加属性，采用的是继承的写法。
{
}
// 继承时，type 和 interface 是可以换用的。interface 可以继承 type。
{
}
// type 也可以继承 interface。
{
}
//（3）同名interface会自动合并，同名type则会报错。也就是说，TypeScript 不允许使用type多次定义同一个类型。
// type A = { foo: number }; // 报错
// type A = { bar: number }; // 报错
// 作为比较，interface则会自动合并
{
    var obj = {
        foo: 1,
        bar: 1,
    };
}
// 这表明，interface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type。
// （4）interface不能包含属性映射（mapping），type可以，详见《映射》一章。
{
    ;
}
// （5）this关键字只能用于interface。
// 正确
{
    // 报错
    {
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
}
// 上面示例中，类型AorB是一个联合类型，AorBwithName则是为AorB添加一个属性。这两种运算，interface都没法表达。
// 
// 综上所述，如果有复杂的类型运算，那么没有其他选择只能使用type；一般情况下，interface灵活性比较高，便于扩充类型或自动合并，建议优先使用。
