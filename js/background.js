// ゲームデータ
var GAME_DATA = [
	{
		name: 'dqmp_yahoo',
		url: 'http://game.dqmp.jp/play',
		type: 'se_yahoo'
	},
	{
		name: 'sennenyusya_yahoo',
		url: 'http://cache.sennenyusya.jp/game/index.php',
		type: 'se_yahoo'
	},
	{
		name: 'kingdomhearts_yahoo',
		url: 'http://web.kingdomhearts.jp/',
		type: 'se_yahoo'
	},
	{
		name: 'kancolle',
		url: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/',
		type: 'dmm'
	},
	{
		name: 'ole-tower',
		url: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=137465/',
		type: 'dmm'
	},
	{
		name: 'shiropro',
		url: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=149569/',
		type: 'dmm'
	},
	{
		name: 'low',
		url: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=445736/',
		type: 'dmm'
	},
	{
		name: 'lastsummoner',
		url: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=159001/',
		type: 'dmm'
	}

];

// ホットキー設定
var HOTKEY = {
	hotkey : {
		window: {
			small: {
				keyCode: 49,
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			},
			medium: {
				keyCode: 50,
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			},
			large: {
				keyCode: 51,
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			},
			xlarge: {
				keyCode: 52,
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			},
			reload: {
				keyCode: 116,
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			}
		}
	}
}

// インストール時ストレージにデフォルトのホットキーを設定
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason === 'install') {
		chrome.storage.local.set(HOTKEY);
	}
});

// Page Actionのアイコン表示
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(changeInfo.status === 'complete') {
		GAME_DATA.forEach(function(element) {
			switch(tab.url) {
				case element.url:
					chrome.pageAction.show(tabId);
					break;
				case element.url + "?window=true":
					switch(element.type) {
						case 'se_yahoo':
							insertFiles(tabId, ['js/se/yahoo.js'], ['css/se/yahoo.css']);
							break;
						case 'dmm':
							insertFiles(tabId, ['js/dmm/default.js'], ['css/dmm/common.css']);
							break;
					}
					break;
			}
		});
	}
});



// Page Actionのアイコンをクリックしたとき
chrome.pageAction.onClicked.addListener(function(tab) {
	var createData = {
		tabId: tab.id,
		type: 'popup',
		focused : true,
		width: 300,
		height: 300
	}

	chrome.windows.create(createData);

	// 初期窓化時のみpushStateでURLにクエリ文字列を追加する
	chrome.tabs.executeScript(tab.id, {
		code: 'history.pushState(null, null, "?window=true");'
	});
});



function insertFiles(tabId, js, css) {
	if(Array.isArray(css)) {
		css.forEach(function(element) {
			chrome.tabs.insertCSS(tabId, {
				file: element
			});
		});
	}

	chrome.tabs.executeScript(tabId, {
		file: 'js/common.js'
	}, function() {
		if(Array.isArray(js)) {
			js.forEach(function(element) {
				chrome.tabs.executeScript(tabId, {
					file: element
				});
			});
		}
	});
}
