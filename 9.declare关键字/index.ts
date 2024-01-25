export { }
declare function fcu(key:any):any
fcu(123)
// declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。
// 它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，
// 编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用declare关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。
// declare 关键字可以描述以下类型。

// 变量（const、let、var 命令声明）
// type 或者 interface 命令声明的类型
// class
// enum
// 函数（function）
// 模块（module）
// 命名空间（namespace）
// declare 关键字的重要特点是，它只是通知编译器某个类型是存在的，不用给出具体实现。比如，只描述函数的类型，不给出函数的实现，如果不使用declare，这是做不到的。

// 实战应用

// declare 关键字可以给出外部变量的类型描述。

// 举例来说，当前脚本使用了其他脚本定义的全局变量x。

// x = 123; // 报错
// 上面示例中，变量x是其他脚本定义的，当前脚本不知道它的类型，编译器就会报错。

// 这时使用 declare 命令给出它的类型，就不会报错了。

// declare let x: number;
// x = 1;

// 如果 declare 关键字没有给出变量的具体类型，那么变量类型就是any。

    //@ts-ignore    
    declare let x;
    x = 1;

// 下面的例子是脚本使用浏览器全局对象document。

// declare var document;
// document.title = "Hello";

// 上面示例中，declare 告诉编译器，变量document的类型是外部定义的（具体定义在 TypeScript 内置文件lib.d.ts）。

// 如果 TypeScript 没有找到document的外部定义，这里就会假定它的类型是any。

// 注意，declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。

// declare function
// declare 关键字可以给出外部函数的类型描述。

// 下面是一个例子。

// declare function sayHello(name: string): void;

// sayHello("张三");

// 就是说delcare也只是解决编译报错问题，如果在运行时顺着作用域往上找，没有找到会在运行时报错

// 所以，在使用 declare 关键字声明全局变量或函数时，你需要确保这些变量或函数在运行代码的环境中真正存在。

// delcare可以声明何东西，且不用给出实现，直接使用即可，不同于type和interface

// declare作用于，在想使用没有找到，需要定义时的编译器报错，

// 在 TypeScript 中，declare关键字用于声明非 TypeScript 代码的类型。如果你声明的函数类型与实际全局函数的类型不一致，TypeScript 编译器在编译阶段并不会报错，因为它无法检查全局 JavaScript 函数的实际参数和返回值类型。

// 然而，在运行时，如果你传递了错误的参数或者尝试使用了错误的返回值类型，JavaScript 可能会抛出运行时错误。这是因为 JavaScript 是动态语言，并且没有编译阶段进行静态类型检查。






