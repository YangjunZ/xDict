"use strict";
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var globalShortcut = require('global-shortcut');

var sysTray = require('./app/js/sysTray');

var mainWin = null;
app.on('ready', function() {
    mainWin = new BrowserWindow({
    	frame: false,
        height: 480,
        resizable: false,
        width: 320,
        icon: 'app/img/dict_64x.png',
        title: "xDict",
        resizable : false,
        show: true,
    });
    mainWin.loadUrl(fileUrl("app/index.html"));
    sysTray.initTray( appQuit, mainWin);
    initShortcut();
});


function fileUrl(filePath) {
    return 'file://' + __dirname + '/' + filePath;
}

function appQuit() {
	globalShortcut.unregisterAll();
	app.quit();
}


ipc.on('quit-app', function(){
   appQuit();
});

ipc.on('show-main-window', function(){
	mainWin.show();
});
ipc.on('hide-main-window', function(){
	mainWin.hide();
});

function showHideSwitch(){
	if(mainWin.isVisible()){
		mainWin.hide();
	}else{
		mainWin.show();
	}
}
ipc.on('show-hide-switch', function(){
	showHideSwith();	
});

function initShortcut(){
	globalShortcut.register('alt + shift + x', function(){
		showHideSwitch();
	});
}




