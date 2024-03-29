// TS的核心在于静态类型，我们在编写 TS 的时候会定义很多的类型，但是主流的库都是 JS编写的，
// 并不支持类型系统。这个时候你不能用TS重写主流的库，这个时候我们只需要编写仅包含类型注释
// 的 d.ts 文件，然后从您的 TS 代码中，可以在仍然使用纯 JS 库的同时，获得静态类型检查的 TS 优势。
// 单独使用的模块，一般会同时提供一个单独的类型声明文件（declaration file），把本模块的外部接口的
// 所有类型都写在这个文件里面，便于模块使用者了解接口，也便于编译器检查使用者的用法是否正确。

// .d.ts主要是给js库在ts里使用时提供ts的类型提示和检查
import { add } from 'module'
import { accessor } from "add";