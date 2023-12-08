"use strict";
// TypeScript 装饰器
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 装饰器（Decorator）是一种语法结构，用来在定义时修改类（class）的行为。
// 在语法上，装饰器有如下几个特征。
// （1）第一个字符（或者说前缀）是@，后面是一个表达式。
// （2）@后面的表达式，必须是一个函数（或者执行后可以得到一个函数）。
// （3）这个函数接受所修饰对象的一些相关值作为参数。
// （4）这个函数要么不返回值，要么返回一个新对象取代所修饰的目标对象。
function simpleDecorator(target, context) {
    console.log("hi, this is " + target);
    return target;
}
// @simpleDecorator
// class A { } // "hi, this is class A {}"
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
function Greeter(value, context) {
    if (context.kind === "class") {
        value.prototype.greet = function () {
            console.log("你好");
        };
    }
}
var User = /** @class */ (function () {
    function User() {
    }
    User = __decorate([
        Greeter
    ], User);
    return User;
}());
var u = new User();
u.greet(); // "你好"
// 上面示例中，类装饰器@Greeter在类User的原型对象上，添加了一个greet()方法，实例就可以直接使用该方法。
// 类装饰器可以返回一个函数，替代当前类的构造方法。
function countInstances(value, context) {
    var instanceCount = 0;
    var wrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        instanceCount++;
        var instance = new (value.bind.apply(value, __spreadArray([void 0], args, false)))();
        instance.count = instanceCount;
        return instance;
    };
    wrapper.prototype = value.prototype; // A
    return wrapper;
}
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass = __decorate([
        countInstances
    ], MyClass);
    return MyClass;
}());
var inst1 = new MyClass();
inst1 instanceof MyClass; // true
inst1.count; // 1  
module.exports = {};
