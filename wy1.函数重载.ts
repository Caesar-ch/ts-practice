
function hello(name:string):string 
function hello(name:number):number
function hello(name: number | string): string | number {
  if(typeof name === 'string') {
    return name + '1'
  } else if (typeof name === 'number') {
    return name + 1
  } else {
    return ''
  }
}

hello('1')
hello(1)