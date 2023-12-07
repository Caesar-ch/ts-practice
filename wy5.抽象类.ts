// 抽象类是基于子类基类实现的

abstract class Animal { 
  // 抽象的成员本身不需要实例化，只是告诉子类一个模板规范
  abstract name: string
  abstract age: number
  // 普通的方法会被继承
  move():void {
    console.log('move')
  }
}

class Dog extends Animal {
  name: string = 'dog'
  age: number = 1
  move() {
    console.log('dog move');
    
  }
}
let dog = new Dog()
dog.move()


class Cat extends Animal {
  name: string = 'cat'
  age: number = 2
}