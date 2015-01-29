var screen_w, screen_h, $flash;
var fixed_w = window.outerWidth - window.innerWidth;
var fixed_h = window.outerHeight - window.innerHeight;

(function loop() {
	if(screen_w === undefined || $flash === undefined) {
		setTimeout(loop, 30);
	} else {
		loadedWindowData();
	}
})();

function loadedWindowData() {
	chrome.storage.local.get('hotkey', function(result) {
		var data = result.hotkey.window;

		$flash.addEventListener('keydown', function(event) {
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					if(event.keyCode === data[key].keyCode &&
					   event.shiftKey === data[key].shiftKey &&
					   event.ctrlKey === data[key].ctrlKey &&
					   event.altKey === data[key].altKey &&
					   event.metaKey === data[key].metaKey) {
						switch(key) {
							case 'small':
								window.resizeTo(~~(screen_w / 2) + fixed_w, ~~(screen_h / 2) + fixed_h);
								break;
							case 'medium':
								window.resizeTo(screen_w + fixed_w, screen_h + fixed_h);
								break;
							case 'large':
								window.resizeTo(~~(screen_w * 1.5) + fixed_w, ~~(screen_h * 1.5) + fixed_h);
								break;
							case 'xlarge':
								window.resizeTo((screen_w * 2) + fixed_w, (screen_h * 2) + fixed_h);
								break;
							case 'reload':
								location.reload();
								break;
						}
					}
				}
			}
		});
	});
}

