// {
//   interface Animal {
//     name: string
//     get sound(): string
//     makeSound(): void
//   }
//   // 类的接口不是继承而是实现
//   class Dog implements Animal { 
//     name: string = 'dog'
//     get sound():string {
//       return ''
//     }
//     makeSound(): void {
      
//     }
//   }

//   // 接口的实现可以有多个
//   interface Animal2 { 
//     age: number
//     get sing() : string
//   }
//   class Cat implements Animal2, Animal { 
//     name:string = 'cat'
//     age:number = 1
//     get sound(): string {
//       return ''
//     }
//     get sing(): string {
//       return ''
//     }
//     makeSound(): void { }
//   }
// }
interface ACC { 
  name: string
  getHome():string
}

let objAcc: ACC
objAcc = {
  name: '123',
  // getHome():string {
  //   return ''
  // },
  getHome: () => ''
}