function Dog(name) {
    this.name = name
}

Dog.prototype.getName = function() {
    return this.name
}
Dog.prototype.sayHello = function() {
    console.log(this.name)
}

Object.prototype.sayHello = function() {
    console.log("Object:" + this.name)
}

var d = new Dog("abc")
d.sayHello()

var b = new Dog("aaa")
b.sayHello()

// what is new done
var c = newDog("hello")
c.sayHello()

function newDog(name) {
    var obj = {}
    Dog.call(obj, name)
    obj.__proto__ = Dog.prototype // 關聯 Dog.prototype.sayHello 的 function
    return obj
}

//prototype
console.log(d.sayHello === b.sayHello)
console.log(d.__proto__ === Dog.prototype)
console.log(d.__proto__.__proto__ === Object.prototype)
console.log(Dog.__proto__ === Function.prototype)
    /*
    prototype chain 原型鍊
    d.sayHello()
    1. d 身上有沒有 sayHello
    2. d.__proto__ 有沒有 sayHello
    3. d.__proto__.__proto__ 有沒有 sayHello
    4. d.__proto__.__proto__.__proto__ 有沒有 sayHello
    5. null 找到頂了

    d.__proto__ = Dog.prototype
    d.__proto__.__proto__ = Object.prototype
    Dog.prototype.__proto__ = Object.prototype
    */