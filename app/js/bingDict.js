"use strict";
var $ = require('../lib/jquery');
var http = require('http');

function queryResult(words, successHandle, failHandle) {
    // successHandle("queryResult ok");
    http.get(genUrl(words), function(res) {
        var data = null;
        res.on('data', function(chunk) {
            if (data == null) {
                data = chunk;
            } else {
                data += chunk;
            }
        });
        res.on('end', function() {
            // successHandle("queryResult is printed in console");
            // console.log(data)
            // successHandle(data);
            parsePage(data, successHandle);
        });
    }).on('error', function(e) {
        failHandle(e.message);
    });
}
var prefix = "http://cn.bing.com/dict/search?q=";
var midfix = "&go=submit&qs=n&form=CM&pq=";
var postfix = "&sc=8-4&sp=-1&sk=";
var URI = require('uri-js');

function genUrl(words) {
    var url = prefix + words + midfix + words + postfix;
    var uurl = URI.serialize(URI.parse(url));
    return uurl;
}
var cheerio = require('cheerio');

function parsePage(page, successHandle) {
    var $$ = cheerio.load(page);
    var res = $$('body div.content.contentPadding div.rs_area div.lf_area');
    // successHandle(res.html());
    successHandle( replaceHref(res.html()));
}


function replaceHref(resText) {
    var $$ = cheerio.load(resText);
    var aarr = $$('a');
    console.log(aarr.length);

    function strStartsWith(string, prefix) {
        return string.slice(0, prefix.length) == prefix;
    }

    function visitA(aarr, callback) {
        for (var i = 0; i < aarr.length; ++i) {
            if ('href' in aarr[i].attribs) {
                callback(aarr[i]);
                // console.log(i);
            }
        }
    }

    // visitA(aarr, function(aEl){
    //     console.log(aEl.attribs.href);
    // });

    // modify
    visitA(aarr, function(aEl) {
        if (strStartsWith(aEl.attribs.href, 'javascript:')) {
            //nothing
        } else {
            aEl.attribs.href = 'javascript:void(0);';
        }
    });
    // console.log( $$.html());
    return $$.html();
}

exports.queryResult = queryResult;
