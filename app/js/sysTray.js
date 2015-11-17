"use strict";
//for tray
// var remote = require('remote');
// var Tray = remote.require('tray');
// var Menu = remote.require('menu');

var Tray = require('tray');
var Menu = require('menu');
var ipc = require('ipc');
var path = require('path');

var appTrayIcon = null;

function initTray(appQuit, win){

    appTrayIcon = new Tray(path.join(__dirname, '../img/dict_48x.png'));
    var contextMenu = Menu.buildFromTemplate([
    	{
	        label: 'Quit',
	        click: function() {	            
                // ipc.send('quit-app');
                appQuit();
	        }
    	},{
        	label: 'Show Main',
        	click: function(){
        		// ipc.send('show-main-window');
                // mainWinShow();
                win.show();
        	}
    	},{
    		label: "Hide Main",
    		click: function(){
    			// ipc.send('hide-main-window');
                // mainWinHide();
                win.hide();
    		}
    	} 
    ]);

    appTrayIcon.setContextMenu( contextMenu);
    appTrayIcon.on('clicked', function(){
    	// ipc.send('show-hide-switch');
        // showHideSwitch();
        if(win.isVisible()){
            win.hide();
        }else{
            win.show();
        }
    });
 
}

exports.initTray = initTray;