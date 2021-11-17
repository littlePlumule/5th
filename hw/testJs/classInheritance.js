class Dog {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(this.name);
    }
}

class blackDog extends Dog {
    constructor(name) {
        super(name) //Dog 的 constructor
        this.sayHello()
    }
    test() {
        console.log("test:", this.name)
    }
}

const d = new blackDog("hello");