console.log('test tools');

var _undefined = "undefined",
    _authid = "authid",
    _crossid = "crossid",
    _homoid = "homoid",
    _webid = "webid",
    _authtabid = "authtabid",
    _crosstabid = "crosstabid",
    _homotabid = "homotabid",
    _webtabid = "webtabid",
    _colid = "colid",
    _synoid = "synoid",
    _antoid = "antoid",
    _coltabid = "coltabid",
    _synotabid = "synotabid",
    _antotabid = "antotabid",
    _newktvid = "newktvid",
    _divtag = "DIV",
    _newLid = "newLeId",
    _confilid = "confil",
    _showfilterid = "filshow",
    _hidefilterid = "filhide";

function openWd(n, t) {
    var i = document.getElementById(n),
        r;
    i != null && typeof i != _undefined && i.tagName == _divtag && i.style.display == "none" && (i.style.display = "block", r = document.getElementById(t), r && (r.className = "tg_open"))
}

function switchWordsTab(n, t, i) {
    var r = document.getElementById(_colid),
        u = document.getElementById(_synoid),
        f = document.getElementById(_antoid),
        e = document.getElementById(_coltabid),
        o = document.getElementById(_synotabid),
        s = document.getElementById(_antotabid);
    r != null && typeof r != _undefined && r.tagName == _divtag && (n == "col" ? (r.style.display = "block", r.style.borderBottom = "1px solid white", e != null && (e.className = "tb_a")) : (r.style.display = "none", r.style.borderBottom = "", e != null && (e.className = "tb_b")));
    u != null && typeof u != _undefined && u.tagName == _divtag && (n == "syno" ? (u.style.display = "block", u.style.borderBottom = "1px solid white", o != null && (o.className = "tb_a")) : (u.style.display = "none", u.style.borderBottom = "", o != null && (o.className = "tb_b")));
    f != null && typeof f != _undefined && f.tagName == _divtag && (n == "anto" ? (f.style.display = "block", f.style.borderBottom = "1px solid white", s != null && (s.className = "tb_a")) : (f.style.display = "none", f.style.borderBottom = "", s != null && (s.className = "tb_b")));
    openWd(t, i)
}


function switchDefiTab(n, t, i) {
    var r = document.getElementById(_authid),
        u = document.getElementById(_crossid),
        f = document.getElementById(_homoid),
        e = document.getElementById(_webid),
        o = document.getElementById(_authtabid),
        s = document.getElementById(_crosstabid),
        h = document.getElementById(_homotabid),
        c = document.getElementById(_webtabid);
    r != null && typeof r != _undefined && r.tagName == _divtag && (n == "auth" ? (r.style.display = "block", r.style.borderBottom = "1px solid white", o != null && (o.className = "tb_a")) : (r.style.display = "none", r.style.borderBottom = "", o != null && (o.className = "tb_b")));
    u != null && typeof u != _undefined && u.tagName == _divtag && (n == "cross" ? (u.style.display = "block", u.style.borderBottom = "1px solid white", s != null && (s.className = "tb_a")) : (u.style.display = "none", u.style.borderBottom = "", s != null && (s.className = "tb_b")));
    f != null && typeof f != _undefined && f.tagName == _divtag && (n == "homo" ? (f.style.display = "block", f.style.borderBottom = "1px solid white", h != null && (h.className = "tb_a")) : (f.style.display = "none", f.style.borderBottom = "", h != null && (h.className = "tb_b")));
    e != null && typeof e != _undefined && e.tagName == _divtag && (n == "web" ? (e.style.display = "block", e.style.borderBottom = "1px solid white", c != null && (c.className = "tb_a")) : (e.style.display = "none", e.style.borderBottom = "", c != null && (c.className = "tb_b")));
    openWd(t, i)
}

function alignWords(n, t, i) {
    var u = document.getElementsByName(t),
        r;
    if (u != null)
        for (r = 0; r < u.length; r++) u[r].onmouseout || (u[r].onmouseout = function() {
            alignWords(this, t, 0)
        }), i ? (u[r].style.color = "white", u[r].style.backgroundColor = "#04c") : (u[r].style.color = "", u[r].style.backgroundColor = "")
}
var Log = function(msg){
    console.log( msg);
};

var BilingualDict = {
    Play: function(n) {
        BilingualDict.Click(null, n, null, null, null);
       Log("audioClick "+ "BilingualDictionaryAudio "+ "BilingualDictionaryAudioInst")
    },
    Click: function(n, t, i, r, u) {
        var f, e, o;
        if (t != "") {
            f = _ge(u);
            f == null && (f = _ge("dict_aud_cnt"));
            e = BilingualDict.GetPlayer(t);
            try {
                f.innerHTML = e
            } catch (s) {
                o = "pCont is null";
                Log("Error " + "DictVerp " + o)
            }
        }
    },
    GetPlayer: function(n) {
        if (navigator.userAgent.indexOf("Safari") > -1 || navigator.userAgent.indexOf("UCBrowser") > -1 || navigator.userAgent.indexOf("iPhone") > -1) {
            var t = document.createElement("audio");
            return t.src = n, t.play(), t.innerHTML
        }
        return '<audio src="' + n + '" autoplay ><\/audio>'
    }

};
_ge = function(n) {
    return document.getElementById(n)
};




console.log('over');