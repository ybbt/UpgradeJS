// Создайте объект calculator с тремя методами:

// read() запрашивает prompt два значения и сохраняет их как свойства объекта
// sum() возвращает сумму этих двух значений
// mul() возвращает произведение этих двух значений

var calculator = {
	
	goPrompt: function(valName){
		return prompt("enter ${valName}", 0);
    },
	read: function(){
		this.first = this.goPrompt("first");
		this.second = this.goPrompt("second");
    },
	sum: function(){
		return +this.first + +this.second;
    },
	mul: function(){
		return +this.first * +this.second;
    },
}

calculator.read();
console.log( calculator.sum() );
console.log( calculator.mul() );