// ノード
flash_elem = document.getElementsByTagName('object')[0];

// Wondowサイズ
screen_w = parseInt(flash_elem.getAttribute('width'));
screen_h = parseInt(flash_elem.getAttribute('height'));

// Windowサイズを最適化
window.resizeTo(screen_w + fixed_w, screen_h + fixed_h);

// リサイズを監視
var resizeTimer;
window.addEventListener('resize', function(event) {
	resizeTimer = setTimeout(function() {
		flash_elem.setAttribute('width', window.innerWidth);
		flash_elem.setAttribute('height', window.innerHeight);
	}, 300);
});
