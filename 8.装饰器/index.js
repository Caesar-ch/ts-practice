"use strict";
// TypeScript 装饰器
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
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
var A = function () {
    var _classDecorators = [simpleDecorator];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var A = _classThis = /** @class */ (function () {
        function A_1() {
        }
        return A_1;
    }());
    __setFunctionName(_classThis, "A");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        A = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return A = _classThis;
}(); // "hi, this is class A {}"
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
var User = function () {
    var _classDecorators = [Greeter];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var User = _classThis = /** @class */ (function () {
        function User_1() {
        }
        User_1.prototype.greet = function () { };
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
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
var MyClass = function () {
    var _classDecorators = [countInstances];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MyClass = _classThis = /** @class */ (function () {
        function MyClass_1() {
        }
        return MyClass_1;
    }());
    __setFunctionName(_classThis, "MyClass");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyClass = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyClass = _classThis;
}();
var inst1 = new MyClass();
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
function replaceMethod(originalMethod, context) {
    return function () {
        return "How are you, ".concat(this.name, "?");
    };
}
var Person = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _hello_decorators;
    return _a = /** @class */ (function () {
            function Person(name) {
                this.name = (__runInitializers(this, _instanceExtraInitializers), void 0);
                this.name = name;
            }
            Person.prototype.hello = function () {
                return "Hi ".concat(this.name, "!");
            };
            return Person;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _hello_decorators = [replaceMethod];
            __esDecorate(_a, null, _hello_decorators, { kind: "method", name: "hello", static: false, private: false, access: { has: function (obj) { return "hello" in obj; }, get: function (obj) { return obj.hello; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var robin = new Person("Robin");
console.log(robin.hello()); // 'How are you, Robin?'
//   利用方法装饰器，可以将类的方法变成延迟执行。
function delay(milliseconds) {
    if (milliseconds === void 0) { milliseconds = 0; }
    return function (value, context) {
        if (context.kind === "method") {
            return function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                setTimeout(function () {
                    value.apply(_this, args);
                }, milliseconds);
            };
        }
    };
}
var Logger = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _log_decorators;
    return _a = /** @class */ (function () {
            function Logger() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            // 在这里接受参数则第一个函数不是接受context和originMethods的方法，返回的才是
            Logger.prototype.log = function (msg) {
                console.log("".concat(msg));
            };
            return Logger;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _log_decorators = [delay(1000)];
            __esDecorate(_a, null, _log_decorators, { kind: "method", name: "log", static: false, private: false, access: { has: function (obj) { return "log" in obj; }, get: function (obj) { return obj.log; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
// 上面示例中，方法装饰器@delay(1000)将方法log()的执行推迟了 1 秒（1000 毫秒）。这里
// 真正的方法装饰器，是delay()执行后返回的函数，delay()的作用是接收参数，用来设置推迟
// 执行的时间。这种通过高阶函数返回装饰器的做法，称为“工厂模式”，即可以像工厂那样生产出一个模子的装饰器。
var logger = new Logger();
logger.log("Hello World");
var Person1 = /** @class */ (function () {
    function Person1(name) {
        this.name = name;
        // greet() 绑定 this
        this.greet = this.greet.bind(this);
    }
    Person1.prototype.greet = function () {
        console.log("Hello, my name is ".concat(this.name, "."));
    };
    return Person1;
}());
var g = new Person1("张三").greet;
g(); // "Hello, my name is 张三."
//上面例子中，类Person的构造方法内部，将this与greet()方法进行了绑定。如果没有这一行，将greet()赋值给变量g进行调用，就会报错了。
// this的绑定必须放在构造方法里面，因为这必须在类的初始化阶段完成。现在，它可以移到方法装饰器的addInitializer()里面。
function bound(originalMethod, context) {
    var methodName = context.name;
    if (context.private) {
        throw new Error("\u4E0D\u80FD\u7ED1\u5B9A\u79C1\u6709\u65B9\u6CD5 ".concat(methodName));
    }
    context.addInitializer(function () {
        this[methodName] = this[methodName].bind(this);
    });
}
// 上面示例中，绑定this转移到了addInitializer()方法里面。
// 下面再看一个例子，通过addInitializer()将选定的方法名，放入一个集合。
var that = '';
function collect(value, _a) {
    var name = _a.name, addInitializer = _a.addInitializer;
    addInitializer(function () {
        that = this;
        if (!this.collectedMethodKeys) {
            this.collectedMethodKeys = new Array();
        }
        this.collectedMethodKeys.push(name);
    });
}
var C = function () {
    var _a;
    var _b;
    var _instanceExtraInitializers = [];
    var _toString_decorators;
    var _member_decorators;
    return _a = /** @class */ (function () {
            function C() {
                this.collectedMethodKeys = (__runInitializers(this, _instanceExtraInitializers), void 0);
            }
            C.prototype.toString = function () { };
            //@ts-ignore
            C.prototype[(_toString_decorators = [collect], _member_decorators = [collect], _b = __propKey(Symbol.iterator))] = function () { };
            return C;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _toString_decorators, { kind: "method", name: "toString", static: false, private: false, access: { has: function (obj) { return "toString" in obj; }, get: function (obj) { return obj.toString; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "method", name: _b, static: false, private: false, access: { has: function (obj) { return _b in obj; }, get: function (obj) { return obj[_b]; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var inst = new C();
console.log('1', inst.collectedMethodKeys);
function logged(value, context) {
    var kind = context.kind, name = context.name;
    if (kind === "field") {
        // 返回一个函数参数默认接收初始值，没有就是undefined
        return function (initialValue) {
            console.log("initializing ".concat(String(name), " with value ").concat(initialValue));
            return initialValue;
        };
    }
}
var Color = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    return _a = /** @class */ (function () {
            function Color() {
                this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, void 0));
            }
            return Color;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [logged];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var color = new Color();
// "initializing name with value green"
// 上面示例中，属性装饰器@logged装饰属性name。@logged的返回值是一个函数，该函数用来对属性name进行初始化，它的参数initialValue就是属性name的初始值green。新建实例对象color时，该函数会自动执行。
// 属性装饰器的返回值函数，可以用来更改属性的初始值。
function twice(value, context) {
    return function (initialValue) { return initialValue * 2; };
}
var C1 = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _field_decorators;
    var _field_initializers = [];
    return _a = /** @class */ (function () {
            function C1() {
                this.field = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _field_initializers, 3));
            }
            return C1;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _field_decorators = [twice];
            __esDecorate(null, null, _field_decorators, { kind: "field", name: "field", static: false, private: false, access: { has: function (obj) { return "field" in obj; }, get: function (obj) { return obj.field; }, set: function (obj, value) { obj.field = value; } }, metadata: _metadata }, _field_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var inst11 = new C1();
console.log(inst11.field); // 6
// 属性装饰器的上下文对象context的access属性，提供所装饰属性的存取器，请看下面的例子。
var acc;
function exposeAccess(value, _a) {
    var access = _a.access;
    acc = access;
}
var Color1 = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    return _a = /** @class */ (function () {
            function Color1() {
                this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, "green"));
            }
            return Color1;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [exposeAccess];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var green = new Color1();
green.name; // 'green'
acc.get(green); // 'green'
acc.set(green, "red");
console.log(green.name);
// getter 装饰器，setter 装饰器
// getter 装饰器和 setter 装饰器，是分别针对类的取值器（getter）和存值器（setter）的装饰器。它们的类型描述如下。
// 注意，getter 装饰器的上下文对象context的access属性，只包含get()方法；setter 装饰器的access属性，只包含set()方法。
// 这两个装饰器要么不返回值，要么返回一个函数，取代原来的取值器或存值器。
// 下面的例子是将取值器的结果，保存为一个属性，加快后面的读取。
var C2 = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _get_value_decorators;
    return _a = /** @class */ (function () {
            function C2() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            Object.defineProperty(C2.prototype, "value", {
                get: function () {
                    console.log("正在计算……");
                    return "开销大的计算结果";
                },
                enumerable: false,
                configurable: true
            });
            return C2;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _get_value_decorators = [lazy];
            __esDecorate(_a, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: function (obj) { return "value" in obj; }, get: function (obj) { return obj.value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
function lazy(value, _a) {
    var kind = _a.kind, name = _a.name;
    if (kind === "getter") {
        return function () {
            var result = value.call(this);
            Object.defineProperty(this, name, {
                value: result,
                writable: false,
            });
            return result;
        };
    }
    return;
}
var inst2 = new C2();
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
var C3 = function () {
    var _a, _C3_x_accessor_storage;
    var _instanceExtraInitializers = [];
    var _x_decorators;
    var _x_initializers = [];
    return _a = /** @class */ (function () {
            function C3() {
                _C3_x_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _x_initializers, 1)));
            }
            Object.defineProperty(C3.prototype, "x", {
                // @ts-ignore
                get: function () { return __classPrivateFieldGet(this, _C3_x_accessor_storage, "f"); },
                // @ts-ignore
                set: function (value) { __classPrivateFieldSet(this, _C3_x_accessor_storage, value, "f"); },
                enumerable: false,
                configurable: true
            });
            return C3;
        }()),
        _C3_x_accessor_storage = new WeakMap(),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _x_decorators = [logged1];
            __esDecorate(_a, null, _x_decorators, { kind: "accessor", name: "x", static: false, private: false, access: { has: function (obj) { return "x" in obj; }, get: function (obj) { return obj.x; }, set: function (obj, value) { obj.x = value; } }, metadata: _metadata }, _x_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
// @ts-ignore
function logged1(value, _a) {
    var kind = _a.kind, name = _a.name;
    if (kind === "accessor") {
        var get_1 = value.get, set_1 = value.set;
        return {
            get: function () {
                console.log("getting ".concat(name));
                return get_1.call(this);
            },
            set: function (val) {
                console.log("setting ".concat(name, " to ").concat(val));
                return set_1.call(this, val);
            },
            init: function (initialValue) {
                console.log("initializing ".concat(name, " with value ").concat(initialValue));
                return initialValue;
            },
        };
    }
}
var c = new C3();
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
function d(str) {
    console.log("\u8BC4\u4F30 @d(): ".concat(str));
    return function (value, context) { return console.log("\u5E94\u7528 @d(): ".concat(str)); };
}
function log(str) {
    console.log(str);
    return str;
}
var T = function () {
    var _a;
    var _classDecorators = [d("类装饰器")];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _staticExtraInitializers = [];
    var _instanceExtraInitializers = [];
    var _static_staticField_decorators;
    var _static_staticField_initializers = [];
    var _member_decorators;
    var _instanceField_decorators;
    var _instanceField_initializers = [];
    var T = _classThis = /** @class */ (function () {
        function T_1() {
            this.instanceField = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _instanceField_initializers, log("实例属性值")));
        }
        T_1.prototype[(_static_staticField_decorators = [d("静态属性装饰器")], _member_decorators = [d("原型方法")], _a = __propKey(log("计算方法名")))] = function () { };
        return T_1;
    }());
    __setFunctionName(_classThis, "T");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _instanceField_decorators = [d("实例属性")];
        __esDecorate(_classThis, null, _member_decorators, { kind: "method", name: _a, static: false, private: false, access: { has: function (obj) { return _a in obj; }, get: function (obj) { return obj[_a]; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_staticField_decorators, { kind: "field", name: "staticField", static: true, private: false, access: { has: function (obj) { return "staticField" in obj; }, get: function (obj) { return obj.staticField; }, set: function (obj, value) { obj.staticField = value; } }, metadata: _metadata }, _static_staticField_initializers, _staticExtraInitializers);
        __esDecorate(null, null, _instanceField_decorators, { kind: "field", name: "instanceField", static: false, private: false, access: { has: function (obj) { return "instanceField" in obj; }, get: function (obj) { return obj.instanceField; }, set: function (obj, value) { obj.instanceField = value; } }, metadata: _metadata }, _instanceField_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        T = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _staticExtraInitializers);
    })();
    _classThis.staticField = __runInitializers(_classThis, _static_staticField_initializers, log("静态属性值"));
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return T = _classThis;
}();
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
function log1(value, context) {
    console.log('1');
}
var Person12 = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _greet_decorators;
    return _a = /** @class */ (function () {
            function Person12(name) {
                this.name = (__runInitializers(this, _instanceExtraInitializers), void 0);
                this.name = name;
            }
            Person12.prototype.greet = function () {
                console.log("Hello, my name is ".concat(this.name, "."));
            };
            return Person12;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _greet_decorators = [bound, log1];
            __esDecorate(_a, null, _greet_decorators, { kind: "method", name: "greet", static: false, private: false, access: { has: function (obj) { return "greet" in obj; }, get: function (obj) { return obj.greet; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
module.exports = {};
