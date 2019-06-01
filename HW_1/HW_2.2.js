//2. [practice] Напиши модуль coloredConsole который будет выводить переданное методу log сообщение определенным цветом или черным если цвет не определен. Работать это должно так.

// coloredConsole.log(‘show me’); // выводит в консоль сообщение чёрным цветом
// coloredConsole.colorize(‘red’); // указали каким цветом выводить сообщения
// coloredConsole.log(‘this message is red’); // а это сообщение уже красное



;(function() {

	var color = null;

	function coloredConsole() {
	}

	function colorize(newColor) {
		color = newColor;
	}
	
	function log(text) {
		console.log(`%c${text}`, `color: ${color}`);
	}

	coloredConsole.colorize = colorize;
	coloredConsole.log = log;

	window.coloredConsole = coloredConsole;
}());