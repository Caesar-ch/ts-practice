class Article { // 在首部写，就很直观，有哪些成员，哪些方法

  // 写上修饰符，使得代码可读性增强
  public title: string
  public content: string
  // 私有属性，只能在当前类的内部使用
  private aa: string = '1'
  // 受保护的，只能在当前类的内部和子类中访问
  protected bb?: string
  // 将属性设置给类本身
  static cc: string = '1'

  // 既是私有的 也是 静态的，即只能在内部Article.author 来访问
  private static author: string
  constructor(title: string, content:string) {
    this.title = title;
    this.content = content;
    
  }
}

class Passage extends Article { 
  constructor(title: string, content: string) { 
    super(title, content);
    this.bb = '123'
    // this.aa
  }
}
const instance = new Article('aa', 'bb')
// instance.aa
// instance.bb
// instance.cc
Article.cc
// Article.author