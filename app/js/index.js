"use strict";
var formEl = document.querySelector('#queryForm');
var wordEl = document.querySelector('#inputWords');
var wordItp = document.querySelector('#WordInterpretation');
formEl.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var words = wordEl.value;
    words = words.trim();
    if (words !== '') {
        showMsg("Quering...");
        // queryResult(words, updateInterpretation, updateInterpretation);
        startQuery(words);
    }
});

function showMsg(msg) {
    wordItp.innerHTML = msg;
}

var bingRes = null;

function successHandle(msg) {
    bingRes = msg;
    // showMsg("query finished");
    showMsg(msg);
}

function failHandle(msg) {
    showMsg("<h3> query error </h3><br>" + msg);
}
var $ = require('./lib/jquery.js');

function startQuery(words) {
    var bingDict = require('./js/bingDict');
    bingDict.queryResult(words, successHandle, failHandle);
}


var cheerio = require('cheerio');

var ipc = require('ipc');

ipc.on('console-log', function(msg) {
    console.log(msg);
});

ipc.on('focus-on-input', function(){
    wordEl.focus();
    wordEl.select();
});



//for in app shortcut
var mousetrap = require('mousetrap');
console.log(mousetrap);
mousetrap.bind('alt+d', function(){
    wordEl.focus();
    wordEl.select(); 
    console.log("alt+d has pressed");
});