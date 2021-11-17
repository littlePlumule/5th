class Dog {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
    sayHello() {
        console.log(`hello ${this.name}`)
    }
}
var d = new Dog("won")
d.sayHello()
console.log(d.getName())

var b = new Dog("winwin")
b.sayHello()
console.log(b.getName())

console.log(b.sayHello === d.sayHello)