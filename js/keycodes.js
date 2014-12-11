var KEY_MAP = {
	12: 'Clear',
	14: 'Enter',
	33: 'PgUp',
	34: 'PgDown',
	35: 'End',
	36: 'Home',
	37: 'Left',
	38: 'Up',
	39: 'Right',
	40: 'Down',
	45: 'Insert',
	46: 'Delete',
	96: 'Numpad0',
	97: 'Numpad1',
	98: 'Numpad2',
	99: 'Numpad3',
	100: 'Numpad4',
	101: 'Numpad5',
	102: 'Numpad6',
	103: 'Numpad7',
	104: 'Numpad8',
	105: 'Numpad9',
	106: '*',
	107: 'Plus',
	108: '_',
	109: '-',
	111: '/',
	112: 'F1',
	113: 'F2',
	114: 'F3',
	115: 'F4',
	116: 'F5',
	117: 'F6',
	118: 'F7',
	119: 'F8',
	120: 'F9',
	121: 'F10',
	122: 'F11',
	123: 'F12',
	124: 'F13',
	125: 'F14',
	126: 'F15',
	186: ';',
	187: '=',
	188: ',',
	189: '-',
	190: '.',
	191: '/',
	192: '`',
	219: '[',
	221: ']'
};

var isMac = (navigator.appVersion.indexOf('Mac') !== -1);

function keyEventToString(event) {
	var tokens = [];

	if(event.ctrlKey)  tokens.push(isMac ? 'Control' : 'Ctrl');
	if(event.altKey)   tokens.push(isMac ? 'Option' : 'Alt');
	if(event.metaKey)  tokens.push(isMac ? 'Command' : 'Meta');
	if(event.shiftKey) tokens.push('Shift');

	if(event.keyCode >= 48 && event.keyCode <= 90) {
		tokens.push(String.fromCharCode(event.keyCode));
	} else if(KEY_MAP[event.keyCode]) {
		tokens.push(KEY_MAP[event.keyCode]);
	} else {
		return '未設定';
	}

	return tokens.join('+');
}

function keyEventToHash(event) {
	var hash = {};

	hash.ctrlKey = event.ctrlKey;
	hash.altKey = event.altKey;
	hash.metaKey = event.metaKey;
	hash.shiftKey = event.shiftKey;
	hash.keyCode = event.keyCode;

	return hash;
}
