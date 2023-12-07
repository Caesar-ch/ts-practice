// 对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。

let obj: { name: string, age: number } = {
    name: 'zfpx',
    age: 18
};
// 对象类型可以指定可选属性，使用问号表示可选属性。
let obj2: { name: string, age?: number } = {
    name: 'zfpx'
};

// 属性类型以分号结尾
type MyObj1 = {
    x: number;
    y: number;
};

// 属性类型以逗号结尾
type MyObj = {
    x: number,
    y: number,
};

//一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。

//   对象类型可以使用方括号读取属性的类型。

type User = {
    name: string;
    age: number
}
type Name = User["name"]; // string

// 除了type命令可以为对象类型声明一个别名，TypeScript 还提供了interface命令，可以把对象类型提炼为一个接口
type MyObj2 = {
    x: number;
    y: number;
}
let obj_2: MyObj2 = {
    x: 1,
    y: 2
};
interface MyObj3 {
    x: number,
    y: number
}
let obj_3: MyObj3 = {
    x: 1,
    y: 2
};

// 注意，TypeScript 不区分对象自身的属性和继承的属性，一律视为对象的属性。

interface MyInterface {
    toString(): string; // 继承的属性
    prop: number; // 自身的属性
}

const obj_proto: MyInterface = {
    // 正确
    prop: 123,
};

// 可选属性
// 如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。

const obj_1: {
    x: number;
    y?: number;
} = { x: 1 };
//   可选属性等同于允许赋值为undefined，下面两种写法是等效的

// 同理，读取一个可选属性时，有可能返回undefined。

// 上面示例中，lastName是可选属性，需要判断是否为undefined以后，才能使用。建议使用下面的写法。
// 写法0 【 缩小类型 】
// if (user.lastName !== undefined) {
//     console.log(`hello ${user.firstName} ${user.lastName}`);
//   }
// 写法一 【三元运算符】
// let firstName = user.firstName === undefined ? "Foo" : user.firstName;
// let lastName = user.lastName === undefined ? "Bar" : user.lastName;

// // 写法二 【可选链】
// let firstName1 = user.firstName ?? "Foo";
// let lastName2 = user.lastName ?? "Bar";

// 只读属性
// 属性名前面加上readonly关键字，表示这个属性是只读属性，不能修改。

interface MyInterface1 {
    readonly prop: number;
}

// 只读属性只能在对象初始化期间赋值，此后就不能修改该属性。

// 注意，如果属性值是一个对象，readonly修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。

// 如果希望属性值是只读的，除了声明时加上readonly关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言as const。

let muUser = {
    name: '1'
} as const
// myUser.name = "Cynthia"; // 报错

// 属性名的索引类型

type MyObjs = {
    [property: string]: string;
};

const objs: MyObjs = {
    foo: "a",
    bar: "b",
    baz: "c",
};

// 
// 上面示例中，类型MyObj的属性名类型就采用了表达式形式，写在方括号里面。[property: string]的property表示属性名，这个是可以随便起的，它的类型是string，即属性名类型为string。也就是说，不管这个对象有多少属性，只要属性名为字符串，且属性值也是字符串，就符合这个类型声明。

// 解构赋值
// 解构赋值用于直接从对象中提取属性。
// const {
//     id,
//     name,
//     price,
//   }: {
//     id: string;
//     name: string;
//     price: number;
//   } = product;
// const { id, name, price } = product;

// 注意，目前没法为解构变量指定类型，因为对象解构里面的冒号，JavaScript 指定了其他用途。
// 在js里的：后边为别名
// let { x: foo, y: bar } = obj;

// 等同于
// let foo = obj.x;
// let bar = obj.y;

// 上面示例中，冒号不是表示属性x和y的类型，而是为这两个属性指定新的变量名。如果要为x和y指定类型，不得不写成下面这样。

// let { x: foo, y: bar }: { x: string; y: number } = obj;

// 点要特别小心，TypeScript 里面很容易搞糊涂。
// 在对象结构的时候尤其注意：冒号后面加的是类型还是别名，还是默认值
// function draw({ shape: Shape, xPos = 100, yPos: number = 100 }) {
//     let myShape = shape; // 报错
//     let x = xPos; // 报错
//   }

// 结构类型原则
// 只要对象 B 满足 对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structual typing）。

// 严格字面量检查
// 如果对象使用字面量表示，会触发 TypeScript 的严格字面量检查（strict object literal checking）。如果字面量的结构跟类型定义的不一样（比如多出了未定义的属性），就会报错。

// const point: {
//     x: number;
//     y: number;
//   } = {
//     x: 1,
//     y: 1,
//     z: 1, // 报错
//   };

// 如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的
const myPoint = {
    x: 1,
    y: 1,
    z: 1,
  };
  
  const point: {
    x: number;
    y: number;
  } = myPoint; // 正确

// TypeScript 对字面量进行严格检查的目的，主要是防止拼写错误。一般来说，字面量大多数来自手写，容易出现拼写错误，或者误用 API。

// type Options = {
//     title: string;
//     darkMode?: boolean;
//   };
  
//   const Obj: Options = {
//     title: "我的网页",
//     darkmode: true, // 报错
//   };


// 上面示例中，属性darkMode拼写错了，成了darkmode。如果没有严格字面量规则，就不会报错，因为darkMode是可选属性，根据结构类型原则，任何对象只要有title属性，都认为符合Options类型。

// 规避严格字面量检查，可以使用中间变量。

// let myOptions = {
//   title: "我的网页",
//   darkmode: true,
// };

// const Obj: Options = myOptions;

// 如果你确认字面量没有错误，也可以使用类型断言规避严格字面量检查。

// 字面量类型赋值会严格比较，不能多不能少，但基于结构类型原则，大的可以赋值给小的，但子棉量不行
// type Options = {
//     title: string;
// }
// const Obj: Options = {
//   title: "我的网页",
//   darkmode: true,
// } as Options;

// 这句话的含义就是告诉编译器，字面量对象符合Options，来避开类型检查

// 原因是这时 TypeScript 会推断变量obj的类型为空对象，实际执行的是下面的代码。

// const obj: {} = {};

// 回到本节开始的例子，这种写法其实在 JavaScript 很常见：先声明一个空对象，然后向空对象添加属性。但是，TypeScript 不允许动态添加属性，所以对象不能分步生成，必须生成时一次性声明所有属性。

// 如果确实需要分步声明，一个比较好的方法是，使用扩展运算符（...）合成一个新对象。

const pt0 = {};
const pt1 = { x: 3 };
const pt2 = { y: 4 };

const pt = {
  ...pt0,
  ...pt1,
  ...pt2,
};

// 因为Object可以接受各种类型的值，而空对象是Object类型的简写，所以它不会有严格字面量检查，赋值时总是允许多余的属性，只是不能读取这些属性。

// interface Empty {}
// const b: Empty = { myProp: 1, anotherProp: 2 }; // 正确
// b.myProp; // 报错