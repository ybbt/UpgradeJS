function Calculator() {
	this.read = function(){
		this.a = prompt("enter first", 0);
		this.b = prompt("enter second", 0);
    };
	this.sum = function(){
		return +this.a + +this.b;
    };
	this.mul = function(){
		return +this.a * +this.b;
    };
}

var calculator = new Calculator;
// undefined
calculator.read();
// undefined
calculator.sum();
// 11
calculator.mul();
// 30

//--------------------------------------------

function Calculator(){
	var sum = (a, b)=>(a + b);
	var dif = (a, b)=>(a - b);

	this.workObj = {
		"+" : sum,
		"-" : dif,
    };

	this.calculate = (str)=>{		
		var a = str.split(" ");		
		return this.workObj[a[1]](+a[0], +a[2]);
    }	

	this.addMethod = (simb, func)=>{
		this.workObj[simb] = func;
	}
}
// undefined
var calc = new Calculator();
// undefined
calc.addMethod("/", (a, b)=>{
	return a/b;
});
// undefined
calc.calculate("10 / 2");
// 5
calc.addMethod("*", (a, b)=>{
	return a*b;
});
// undefined
calc.calculate("10 * 500");
// 5000
calc.addMethod("**", (a, b)=>{
	return Math.pow(a, b);
});
// undefined
calc.calculate("2 ** 5");
// 32
calc.addMethod("*/", (a, b)=>{
	return Math.sqrt(a, b);
});
// undefined
calc.calculate("100 */ 2");
// 32