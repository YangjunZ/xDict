var http = require('http');
var DictionaryKey = '3d7a4bdd-c38f-42d9-a313-566045b6085a';
var ThesaurusKey = '4d857cb6-e977-4f68-aad4-0daae88331be';
var $ = require('./lib/jquery.js');

function queryResult(words, successCallback, failCallback) {
    var url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + words + '?key=' + DictionaryKey;
    http.get(url, function(res){
        var data = null;
        res.on('data', function(chunk){
            if(data == null){
                data = chunk;
            }else{
                data += chunk;
            }
            // successCallback(chunk);
        });
        res.on('end', function(){
            getWord(words, data, function (word, json) {
                var defs = json.fls.map(function (i) {
                    return "<span class='web_type'>" + json.fls[i].textContent + '</span>, ' + json.defs[i].textContent
                }).toArray().join('<br/>');
                var term = json.hw[0].textContent.replace(/\*/g, '·');

                successCallback(  term + '<br>'+defs);

                console.log("res:");
                console.log(term);
                console.log(defs);
            });
        });

        
    }).on('error', function(e){
        failCallback(e.message);
    });
}


var http = require('http');
var DictionaryKey = '3d7a4bdd-c38f-42d9-a313-566045b6085a';
var ThesaurusKey = '4d857cb6-e977-4f68-aad4-0daae88331be';



function getWord( term, text, callback){
    var word = $(text).find('entry').filter(function () {
                return $(this).find('ew').text().trim().length <= term.length
            });
    var derivatives = word.find('ure').map(function (i, e) {
                return e.textContent.replace(/\*/g, '·')
            });
    if (undefined != derivatives) derivatives = derivatives.toArray().toString().replace(/,/g, ", ");
    var syns = word.find('sx').map(function (i, e) {
        return e.textContent.replace(/\*/g, '·')
    });
    if (undefined != syns) syns = syns.toArray().toString().replace(/,/g, ", ");
    var roots = word.children('et');
    var resp_word = word.children('ew');
    var hw = word.children('hw'); // 音节划分
    var fls = word.children('fl'); //lexical class 词性
    var defs = word.children('def');
    callback(word, {
                derivatives: derivatives,
                syns: syns,
                roots: roots,
                fls: fls,
                defs: defs,
                hw: hw,
                ew: resp_word
    });
   
}



function queryResult(words, successCallback, failCallback) {
    var url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + words + '?key=' + DictionaryKey;
    http.get(url, function(res){
        var data = null;
        res.on('data', function(chunk){
            if(data == null){
                data = chunk;
            }else{
                data += chunk;
            }
            // successCallback(chunk);
        });
        res.on('end', function(){
            // console.log('req finished: ');
            // console.log( data);
            getWord(words, data, function (word, json) {
                var defs = json.fls.map(function (i) {
                    return "<span class='web_type'>" + json.fls[i].textContent + '</span>, ' + json.defs[i].textContent
                }).toArray().join('<br/>');
                var term = json.hw[0].textContent.replace(/\*/g, '·');

                successCallback(  term + '<br>'+defs);

                console.log("res:");
                console.log(term);
                console.log(defs);
            });
        });

        
    }).on('error', function(e){
        failCallback(e.message);
    });
}

var $ = require('./lib/jquery.js');

function getWord( term, text, callback){
    var word = $(text).find('entry').filter(function () {
                return $(this).find('ew').text().trim().length <= term.length
            });
    var derivatives = word.find('ure').map(function (i, e) {
                return e.textContent.replace(/\*/g, '·')
            });
    if (undefined != derivatives) derivatives = derivatives.toArray().toString().replace(/,/g, ", ");
    var syns = word.find('sx').map(function (i, e) {
        return e.textContent.replace(/\*/g, '·')
    });
    if (undefined != syns) syns = syns.toArray().toString().replace(/,/g, ", ");
    var roots = word.children('et');
    var resp_word = word.children('ew');
    var hw = word.children('hw'); // 音节划分
    var fls = word.children('fl'); //lexical class 词性
    var defs = word.children('def');
    callback(word, {
                derivatives: derivatives,
                syns: syns,
                roots: roots,
                fls: fls,
                defs: defs,
                hw: hw,
                ew: resp_word
    });
   
}


