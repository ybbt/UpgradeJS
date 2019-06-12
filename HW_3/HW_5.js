// 3. [practice] Это задача из 03 Контекст this. Перепиши вызов setTimeout так чтобы в консоль выводилось правильное сообщение. Используй привязку контекста.

let human = {
    name: 'Harry',
    say: function() {
        console.log(`Hello. My name is ${this.name}`);
    }
}

setTimeout(human.say.bind(human), 1000);

// 5. [practice] Что вернет последнее выражение? Объясни что происходит с аргументами.


function foo(a, b) {
	console.log(a, b);
}

foo.bind(null, 1, 2)(3, 4);

//аргументі 1,2 вставятся в візов функции в качестве аргументов, перед аргументами 3,4 и  console.log віведет первіе два аргумента, т.е 1,2
