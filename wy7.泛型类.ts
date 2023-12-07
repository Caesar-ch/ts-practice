class MyClass<T> {
  value: T
  constructor(value: T) {
    this.value = value
  }
  do(input:T):T {
    console.log('chu li', this.value);
    return input
  }
}
let class1 = new MyClass<number>(1)
class1.do(1)
let class2 = new MyClass<string>('1')
class2.do('1')