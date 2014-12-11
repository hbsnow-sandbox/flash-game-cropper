chrome.storage.local.get('hotkey', function(result) {
	toggleState('hotkey-submit-default');

	document.getElementById('loading').style.display = 'none';

	var loaded = document.getElementsByClassName('no-loaded')[0];
	loaded.className = loaded.className.replace(/\bno-loaded\b/, 'loaded');

	document.getElementById('hotkey-submit-btn').addEventListener('click', function() {
		chrome.storage.local.set(result);
	});

	['reload', 'small', 'medium', 'large', 'xlarge'].forEach(function(element) {
		setDefault(element);
	});

	var defaultKey = getConfig();
	var resultKey = result.hotkey.window;

	function setDefault(size) {
		var data = eval('result.hotkey.window.' + size);
		var key = keyEventToString(data);
		document.getElementById('current-hotkey-' + size).innerHTML = key;

		var $input = document.getElementById('hotkey-' + size);
		$input.value = key;

		var changedKey;
		$input.addEventListener('keydown', function(event) {
			switch(event.keyCode) {
				case 27:  // Escape
					event.stopPropagation();
					event.preventDefault();
					$input.blur();
					return false;
				case 8:   // Backspace
				case 46:  // Delete
					event.stopPropagation();
					event.preventDefault();
					$input.value = '未設定';
					changeHotkey();
					return false;
				case 9:  // Tab
					return false;
				case 16:  // Shift
				case 17:  // Control
				case 18:  // Alt/Option
				case 91:  // Meta/Command
					event.stopPropagation();
					event.preventDefault();
					return false;
			}

			var keyString = keyEventToString(event);
			if(keyString) {
				$input.value = keyString;

				data.ctrlKey = event.ctrlKey;
				data.altKey = event.altKey;
				data.metaKey = event.metaKey;
				data.shiftKey = event.shiftKey;
				data.keyCode = event.keyCode;

				changeHotkey();

			}

			event.stopPropagation();
			event.preventDefault();

			return false;
		}, true);
	}

	// キーの変更
	function changeHotkey() {
		var key = getConfig();
		var duplicate = key.filter(function(element, index, array) {
			return array.indexOf(element) === index && index !== array.lastIndexOf(element);
		}).length;

		if(duplicate > 0) {
			toggleState('hotkey-submit-error');
		} else if(defaultKey.toString() === key.toString()) {
			toggleState('hotkey-submit-default');
		} else {
			toggleState('hotkey-submit-change');
		}
	}

	// 設定キーをinput要素から配列で取得
	function getConfig() {
		var key = [];
		Array.prototype.slice.call(document.getElementsByClassName('hotkey-setting')).forEach(function(node) {
			key.push(node.value);
		});

		return key;
	}
});


function toggleState(id) {
	Array.prototype.slice.call(document.querySelectorAll('#hotkey-submit > div')).forEach(function(node) {
		node.style.display = 'none';
	});

	document.getElementById(id).style.display = 'inherit';
}

