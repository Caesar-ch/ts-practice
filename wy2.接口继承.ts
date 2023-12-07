interface Parent {
  prop1: number
  prop2: string
}
interface Child extends Parent { 
  prop3: boolean
}
const myObj: Child = {
  prop1: 1,
  prop2: '2',
  prop3: true
}