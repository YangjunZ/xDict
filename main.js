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
        icon: 'app/img/dictionary.png',
        title: "xDict",
        resizable: false,
        show: true
    });
    mainWin.loadUrl(fileUrl("app/index.html"));
    sysTray.initTray(appQuit, mainWin);
    initShortcut();
    // mainWin.on('blur', function() {
    //     log('blur')
    //     winStatus();
    // });
    // mainWin.on('focus', function() {
    //     log('focus');
    //     winStatus();
    // });

    // setInterval(winStatus, 2000);
});

function winStatus() {
    if (mainWin.isFocused()) {
        log('isFocused');
    } else {
        log('not Focused');
    }
    if (mainWin.isVisible()) {
        log("isVisible");
    } else {
        log('not Visible');
    }
}

function fileUrl(filePath) {
    return 'file://' + __dirname + '/' + filePath;
}

function appQuit() {
    globalShortcut.unregisterAll();
    app.quit();
}

function log(msg) {
    if (mainWin) {
        mainWin.webContents.send('console-log', msg);
    }
}

ipc.on('quit-app', function() {
    appQuit();
});

ipc.on('show-main-window', function() {
    mainWin.show();
});
ipc.on('hide-main-window', function() {
    mainWin.hide();
});

function showHideSwitch() {
    if (mainWin.isFocused() && mainWin.isVisible()) {
        // mainWin.showInactive();
        // mainWin.blur();
        mainWin.emit('blur');
        mainWin.hide();
    } else {
        mainWin.show();
        mainWin.webContents.send('focus-on-input');
    }
}
ipc.on('show-hide-switch', function() {
    showHideSwith();
});

function initShortcut() {
    globalShortcut.register('alt + shift + x', function() {
        showHideSwitch();
    });
}
