class User3 {
  private _password: string = ''

  get password(): string { 
    return '*******'
  }
  set password(value: string) { 
    this._password = value
  }
}

let user3 = new User3()
console.log(user3.password);
