// ノード
var $root = document.getElementById('game_frame');
var $body = $root.contentWindow.document.getElementsByTagName('body')[0];
$flash = $body.getElementsByTagName('embed')[0];

// Wondowサイズ
screen_w = parseInt($flash.getAttribute('width'));
screen_h = parseInt($flash.getAttribute('height'));

// iframeの属性を修正
$root.removeAttribute('style');
$root.setAttribute('width', screen_w);
$root.setAttribute('height', screen_h);

// Windowサイズを最適化
window.resizeTo(screen_w + fixed_w, screen_h + fixed_h);

// リサイズを監視
var resizeTimer, resize_w, resize_h;
window.addEventListener('resize', function(event) {
	resizeTimer = setTimeout(function() {
		resize_w = window.innerWidth;
		resize_h = window.innerHeight;

		$root.setAttribute('width', resize_w);
		$root.setAttribute('height', resize_h);
		$flash.setAttribute('width', resize_w);
		$flash.setAttribute('height', resize_h);
	}, 300);
});
