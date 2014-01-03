(function (a) {
    a.html5 = {};
    a.html5.version = "6.5.3529"
})(jwplayer);
(function (a) {
    var f = document,
        d = window;
    a.serialize = function (h) {
        if (h == null) {
            return null
        } else {
            if (h.toString().toLowerCase() == "true") {
                return true
            } else {
                if (h.toString().toLowerCase() == "false") {
                    return false
                } else {
                    if (isNaN(Number(h)) || h.length > 5 || h.length == 0) {
                        return h
                    } else {
                        return Number(h)
                    }
                }
            }
        }
    };
    a.filterSources = function (j) {
        var n, o, h = a.extensionmap;
        if (j) {
            o = [];
            for (var l = 0; l < j.length; l++) {
                var m = j[l].type,
                    k = j[l].file;
                if (!m) {
                    m = h.extType(a.extension(k));
                    j[l].type = m
                }
                if (a.canPlayHTML5(m)) {
                    if (!n) {
                        n = m
                    }
                    if (m == n) {
                        o.push(a.extend({}, j[l]))
                    }
                }
            }
        }
        return o
    };
    a.canPlayHTML5 = function (h) {
        if (a.isAndroid() && (h == "hls" || h == "m3u" || h == "m3u8")) {
            return false
        }
        var i = a.extensionmap.types[h];
        return ( !! i && jwplayer.vid.canPlayType(i))
    };
    a.ajax = function (l, k, h) {
        var j;
        if (l.indexOf("#") > 0) {
            l = l.replace(/#.*$/, "")
        }
        if (b(l) && a.exists(d.XDomainRequest)) {
            j = new XDomainRequest();
            j.onload = e(j, l, k, h);
            j.onerror = c(h, l, j)
        } else {
            if (a.exists(d.XMLHttpRequest)) {
                j = new XMLHttpRequest();
                j.onreadystatechange = g(j, l, k, h);
                j.onerror = c(h, l)
            } else {
                if (h) {
                    h()
                }
            }
        }
        try {
            j.open("GET", l, true);
            j.send(null)
        } catch (i) {
            if (h) {
                h(l)
            }
        }
        return j
    };

    function b(h) {
        if (h && h.indexOf("://") >= 0) {
            if (h.split("/")[2] != d.location.href.split("/")[2]) {
                return true
            }
        }
        return false
    }

    function c(h, j, i) {
        return function () {
            h("Error loading file")
        }
    }

    function g(i, k, j, h) {
        return function () {
            if (i.readyState === 4) {
                switch (i.status) {
                case 200:
                    e(i, k, j, h)();
                    break;
                case 404:
                    h("File not found")
                }
            }
        }
    }

    function e(i, k, j, h) {
        return function () {
            try {
                var l = i.responseXML;
                if (l && l.firstChild) {
                    return j(i)
                }
            } catch (n) {}
            var m = a.parseXML(i.responseText);
            if (m && m.firstChild) {
                i = a.extend({}, i, {
                    responseXML: m
                })
            } else {
                if (h) {
                    h(i.responseText ? "Invalid XML" : k)
                }
                return
            }
            j(i)
        }
    }
    a.parseXML = function (h) {
        try {
            var i;
            if (d.DOMParser) {
                i = (new DOMParser()).parseFromString(h, "text/xml");
                try {
                    if (i.childNodes[0].firstChild.nodeName == "parsererror") {
                        return
                    }
                } catch (j) {}
            } else {
                i = new ActiveXObject("Microsoft.XMLDOM");
                i.async = "false";
                i.loadXML(h)
            }
            return i
        } catch (j) {
            return
        }
    };
    a.parseDimension = function (h) {
        if (typeof h == "string") {
            if (h === "") {
                return 0
            } else {
                if (h.lastIndexOf("%") > -1) {
                    return h
                } else {
                    return parseInt(h.replace("px", ""), 10)
                }
            }
        }
        return h
    };
    a.timeFormat = function (j) {
        if (j > 0) {
            var i = Math.floor(j / 3600),
                k = Math.floor((j - i * 3600) / 60),
                h = Math.floor(j % 60);
            return (i ? i + ":" : "") + (k < 10 ? "0" : "") + k + ":" + (h < 10 ? "0" : "") + h
        } else {
            return "00:00"
        }
    };
    a.seconds = function (j) {
        j = j.replace(",", ".");
        var h = j.split(":");
        var i = 0;
        if (j.substr(-1) == "s") {
            i = Number(j.substr(0, j.length - 1))
        } else {
            if (j.substr(-1) == "m") {
                i = Number(j.substr(0, j.length - 1)) * 60
            } else {
                if (j.substr(-1) == "h") {
                    i = Number(j.substr(0, j.length - 1)) * 3600
                } else {
                    if (h.length > 1) {
                        i = Number(h[h.length - 1]);
                        i += Number(h[h.length - 2]) * 60;
                        if (h.length == 3) {
                            i += Number(h[h.length - 3]) * 3600
                        }
                    } else {
                        i = Number(j)
                    }
                }
            }
        }
        return i
    };
    a.bounds = function (i) {
        if (!i) {
            return {
                left: 0,
                right: 0,
                width: 0,
                height: 0,
                top: 0,
                bottom: 0
            }
        }
        var m = i,
            l = 0,
            k = 0,
            j = isNaN(i.offsetWidth) ? 0 : i.offsetWidth,
            h = isNaN(i.offsetHeight) ? 0 : i.offsetHeight;
        do {
            l += isNaN(m.offsetLeft) ? 0 : m.offsetLeft;
            k += isNaN(m.offsetTop) ? 0 : m.offsetTop
        } while (m = m.offsetParent);
        return {
            left: l,
            top: k,
            width: j,
            height: h,
            right: l + j,
            bottom: k + h
        }
    };
    a.empty = function (h) {
        if (!h) {
            return
        }
        while (h.childElementCount > 0) {
            h.removeChild(h.children[0])
        }
    }
})(jwplayer.utils);
(function (p) {
    var a = {}, n, c = {}, j = 0,
        o = p.exists,
        d = p.foreach,
        e = {}, f = false,
        b = ".jwplayer ";

    function l() {
        var r = document.createElement("style");
        r.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(r);
        return r
    }
    var m = p.css = function (r, t, s) {
        if (!a[r]) {
            if (f) {
                a[r] = l()
            } else {
                if (!n || n.sheet.cssRules.length > 50000) {
                    n = l()
                }
                a[r] = n
            }
        }
        if (!o(s)) {
            s = false
        }
        if (!c[r]) {
            c[r] = {}
        }
        d(t, function (u, v) {
            v = q(u, v, s);
            if (o(c[r][u]) && !o(v)) {
                delete c[r][u]
            } else {
                if (o(v)) {
                    c[r][u] = v
                }
            }
        });
        if (j > 0) {
            return
        }
        k(r)
    };
    m.block = function () {
        j++
    };
    m.unblock = function () {
        j = Math.max(j - 1, 0);
        if (j == 0) {
            i()
        }
    };
    var i = function () {
        d(a, function (r, s) {
            k(r)
        })
    };

    function q(t, u, r) {
        if (typeof u === "undefined") {
            return undefined
        }
        var s = r ? " !important" : "";
        if (!isNaN(u)) {
            switch (t) {
            case "z-index":
            case "opacity":
                return u + s;
                break;
            default:
                if (t.match(/color/i)) {
                    return "#" + p.pad(u.toString(16).replace(/^0x/i, ""), 6) + s
                } else {
                    if (u === 0) {
                        return 0 + s
                    } else {
                        return Math.ceil(u) + "px" + s
                    }
                }
                break
            }
        } else {
            if ( !! u.match(/png|gif|jpe?g/i) && u.indexOf("url") < 0) {
                return "url(" + u + ")"
            }
            return u + s
        }
    }

    function k(r) {
        if (f) {
            a[r].innerHTML = g(r);
            return
        }
        var s = a[r].sheet,
            t = e[r];
        if (s) {
            var u = s.cssRules;
            if (p.exists(t) && t < u.length && u[t].selectorText == r) {
                s.deleteRule(t)
            } else {
                e[r] = u.length
            }
            s.insertRule(g(r), e[r])
        }
    }

    function g(r) {
        var s = r + "{\n";
        var t = c[r];
        d(t, function (u, v) {
            s += "  " + u + ": " + v + ";\n"
        });
        s += "}\n";
        return s
    }
    p.clearCss = function (r) {
        d(c, function (s, t) {
            if (s.indexOf(r) >= 0) {
                delete c[s]
            }
        });
        d(a, function (s, t) {
            if (s.indexOf(r) >= 0) {
                k(s)
            }
        })
    };
    p.transform = function (s, u) {
        var r = "-transform",
            t;
        u = u ? u : "";
        if (typeof s == "string") {
            t = {};
            t["-webkit" + r] = u;
            t["-ms" + r] = u;
            t["-moz" + r] = u;
            t["-o" + r] = u;
            p.css(s, t)
        } else {
            r = "Transform";
            t = s.style;
            t["webkit" + r] = u;
            t["Moz" + r] = u;
            t["ms" + r] = u;
            t["O" + r] = u
        }
    };
    p.dragStyle = function (r, s) {
        p.css(r, {
            "-webkit-user-select": s,
            "-moz-user-select": s,
            "-ms-user-select": s,
            "-webkit-user-drag": s,
            "user-select": s,
            "user-drag": s
        })
    };
    p.transitionStyle = function (r, s) {
        if (navigator.userAgent.match(/5\.\d(\.\d)? safari/i)) {
            return
        }
        p.css(r, {
            "-webkit-transition": s,
            "-moz-transition": s,
            "-o-transition": s
        })
    };
    p.rotate = function (r, s) {
        p.transform(r, "rotate(" + s + "deg)")
    };

    function h() {
        m(b + ["", "div", "span", "a", "img", "ul", "li", "video"].join("," + b) + ", .jwclick", {
            margin: 0,
            padding: 0,
            border: 0,
            color: "#000000",
            "font-size": "100%",
            font: "inherit",
            "vertical-align": "baseline",
            "background-color": "transparent",
            "text-align": "left",
            direction: "ltr"
        });
        m(b + "ul", {
            "list-style": "none"
        })
    }
    h()
})(jwplayer.utils);
(function (a) {
    a.scale = function (e, d, c, h, i) {
        var g, f = a.exists;
        if (!f(d)) {
            d = 1
        }
        if (!f(c)) {
            c = 1
        }
        if (!f(h)) {
            h = 0
        }
        if (!f(i)) {
            i = 0
        }
        if (d == 1 && c == 1 && h == 0 && i == 0) {
            g = ""
        } else {
            g = "scale(" + d + "," + c + ") translate(" + h + "px," + i + "px)"
        }
        a.transform(e, g)
    };
    a.stretch = function (k, p, o, h, m, i) {
        if (!p) {
            return
        }
        if (!k) {
            k = b.UNIFORM
        }
        if (!o || !h || !m || !i) {
            return
        }
        var d = o / m,
            g = h / i,
            n = 0,
            j = 0,
            c = {}, e = (p.tagName.toLowerCase() == "video"),
            f = false,
            l;
        if (e) {
            a.transform(p)
        }
        l = "jw" + k.toLowerCase();
        switch (k.toLowerCase()) {
        case b.FILL:
            if (d > g) {
                m = m * d;
                i = i * d
            } else {
                m = m * g;
                i = i * g
            }
        case b.NONE:
            d = g = 1;
        case b.EXACTFIT:
            f = true;
            break;
        case b.UNIFORM:
        default:
            if (d > g) {
                if (m * g / o > 0.95) {
                    f = true;
                    l = "jwexactfit"
                } else {
                    m = m * g;
                    i = i * g
                }
            } else {
                if (i * d / h > 0.95) {
                    f = true;
                    l = "jwexactfit"
                } else {
                    m = m * d;
                    i = i * d
                }
            } if (f) {
                g = Math.ceil(100 * h / i) / 100;
                d = Math.ceil(100 * o / m) / 100
            }
            break
        }
        if (e) {
            if (f) {
                p.style.width = m + "px";
                p.style.height = i + "px";
                n = ((o - m) / 2) / d;
                j = ((h - i) / 2) / g;
                a.scale(p, d, g, n, j)
            } else {
                p.style.width = "";
                p.style.height = ""
            }
        } else {
            p.className = p.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "");
            p.className += " " + l
        }
    };
    var b = a.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    }
})(jwplayer.utils);
(function (a) {
    a.parsers = {
        localName: function (b) {
            if (!b) {
                return ""
            } else {
                if (b.localName) {
                    return b.localName
                } else {
                    if (b.baseName) {
                        return b.baseName
                    } else {
                        return ""
                    }
                }
            }
        },
        textContent: function (b) {
            if (!b) {
                return ""
            } else {
                if (b.textContent) {
                    return b.textContent
                } else {
                    if (b.text) {
                        return b.text
                    } else {
                        return ""
                    }
                }
            }
        },
        getChildNode: function (c, b) {
            return c.childNodes[b]
        },
        numChildren: function (b) {
            if (b.childNodes) {
                return b.childNodes.length
            } else {
                return 0
            }
        }
    }
})(jwplayer.html5);
(function (a) {
    a.dfxp = function (g, b) {
        var d, c, i = jwplayer.utils.seconds;

        function h(k) {
            if (k == 0) {
                b("Crossdomain loading denied: " + c)
            } else {
                if (k == 404) {
                    b("DFXP File not found: " + c)
                } else {
                    b("Error " + k + " loading DFXP file: " + c)
                }
            }
        }
        this.load = function (l) {
            c = l;
            try {
                d.open("GET", l, true);
                d.send(null)
            } catch (k) {
                b("Error loading DFXP File: " + l)
            }
        };

        function f(o) {
            var l = [{
                begin: 0,
                text: ""
            }];
            o = o.replace(/^\s+/, "").replace(/\s+$/, "");
            var n = o.split("</p>");
            var p = [];
            for (var k = 0; k < n.length; k++) {
                if (n[k].indexOf("<p") >= 0) {
                    n[k] = n[k].substr(n[k].indexOf("<p") + 2).replace(/^\s+/, "").replace(/\s+$/, "");
                    p.push(n[k])
                }
            }
            n = p;
            for (k = 0; k < n.length; k++) {
                var m = j(n[k]);
                if (m.text) {
                    l.push(m);
                    if (m.end) {
                        l.push({
                            begin: m.end,
                            text: ""
                        });
                        delete m.end
                    }
                }
            }
            if (l.length > 1) {
                g(l)
            } else {
                b("Invalid DFXP file: " + c)
            }
        }

        function j(n) {
            var m = {};
            try {
                var k = n.indexOf('begin="');
                n = n.substr(k + 7);
                k = n.indexOf('" end="');
                m.begin = i(n.substr(0, k));
                n = n.substr(k + 7);
                k = n.indexOf('">');
                m.end = i(n.substr(0, k));
                n = n.substr(k + 2);
                m.text = n
            } catch (l) {}
            return m
        }

        function e() {
            d = new XMLHttpRequest();
            d.onreadystatechange = function () {
                if (d.readyState === 4) {
                    if (d.status === 200) {
                        f(d.responseText)
                    } else {
                        h(d.status)
                    }
                }
            }
        }
        e()
    }
})(jwplayer.html5.parsers);
(function (b) {
    var a = b.html5.parsers;
    var d = a.jwparser = function () {};
    var c = "jwplayer";
    d.parseEntry = function (l, p) {
        var e = [],
            n = [],
            m = b.utils.xmlAttribute,
            f = "default",
            q = "label",
            j = "file",
            o = "type";
        for (var k = 0; k < l.childNodes.length; k++) {
            var h = l.childNodes[k];
            if (h.prefix == c) {
                var g = a.localName(h);
                if (g == "source") {
                    delete p.sources;
                    e.push({
                        file: m(h, j),
                        "default": m(h, f),
                        label: m(h, q),
                        type: m(h, o)
                    })
                } else {
                    if (g == "track") {
                        delete p.tracks;
                        n.push({
                            file: m(h, j),
                            "default": m(h, f),
                            kind: m(h, "kind"),
                            label: m(h, q)
                        })
                    } else {
                        p[g] = b.utils.serialize(a.textContent(h));
                        if (g == "file" && p.sources) {
                            delete p.sources
                        }
                    }
                }
            }
            if (!p[j]) {
                p[j] = p.link
            }
        }
        if (e.length) {
            p.sources = [];
            for (k = 0; k < e.length; k++) {
                if (e[k].file.length > 0) {
                    e[k][f] = (e[k][f] == "true") ? true : false;
                    if (!e[k].label.length) {
                        delete e[k].label
                    }
                    p.sources.push(e[k])
                }
            }
        }
        if (n.length) {
            p.tracks = [];
            for (k = 0; k < n.length; k++) {
                if (n[k].file.length > 0) {
                    n[k][f] = (n[k][f] == "true") ? true : false;
                    n[k].kind = (!n[k].kind.length) ? "captions" : n[k].kind;
                    if (!n[k].label.length) {
                        delete n[k].label
                    }
                    p.tracks.push(n[k])
                }
            }
        }
        return p
    }
})(jwplayer);
(function (e) {
    var b = jwplayer.utils,
        h = b.xmlAttribute,
        c = e.localName,
        a = e.textContent,
        d = e.numChildren;
    var g = e.mediaparser = function () {};
    var f = "media";
    g.parseGroup = function (m, q) {
        var k, n, p = "tracks",
            o = [];

        function l(i) {
            var s = {
                zh: "Chinese",
                nl: "Dutch",
                en: "English",
                fr: "French",
                de: "German",
                it: "Italian",
                ja: "Japanese",
                pt: "Portuguese",
                ru: "Russian",
                es: "Spanish"
            };
            if (s[i]) {
                return s[i]
            }
            return i
        }
        for (n = 0; n < d(m); n++) {
            k = m.childNodes[n];
            if (k.prefix == f) {
                if (!c(k)) {
                    continue
                }
                switch (c(k).toLowerCase()) {
                case "content":
                    if (h(k, "duration")) {
                        q.duration = b.seconds(h(k, "duration"))
                    }
                    if (d(k) > 0) {
                        q = g.parseGroup(k, q)
                    }
                    if (h(k, "url")) {
                        if (!q.sources) {
                            q.sources = []
                        }
                        q.sources.push({
                            file: h(k, "url"),
                            type: h(k, "type"),
                            width: h(k, "width"),
                            label: h(k, "label")
                        })
                    }
                    break;
                case "title":
                    q.title = a(k);
                    break;
                case "description":
                    q.description = a(k);
                    break;
                case "guid":
                    q.mediaid = a(k);
                    break;
                case "thumbnail":
                    if (!q.image) {
                        q.image = h(k, "url")
                    }
                    break;
                case "player":
                    var j = k.url;
                    break;
                case "group":
                    g.parseGroup(k, q);
                    break;
                case "subtitle":
                    var r = {};
                    r.file = h(k, "url");
                    r.kind = "captions";
                    if (h(k, "lang").length > 0) {
                        r.label = l(h(k, "lang"))
                    }
                    o.push(r)
                }
            }
        }
        if (!q.hasOwnProperty(p)) {
            q[p] = []
        }
        for (n = 0; n < o.length; n++) {
            q[p].push(o[n])
        }
        return q
    }
})(jwplayer.html5.parsers);
(function (g) {
    var b = jwplayer.utils,
        a = g.textContent,
        e = g.getChildNode,
        f = g.numChildren,
        d = g.localName;
    g.rssparser = {};
    g.rssparser.parse = function (o) {
        var h = [];
        for (var m = 0; m < f(o); m++) {
            var n = e(o, m),
                k = d(n).toLowerCase();
            if (k == "channel") {
                for (var l = 0; l < f(n); l++) {
                    var p = e(n, l);
                    if (d(p).toLowerCase() == "item") {
                        h.push(c(p))
                    }
                }
            }
        }
        return h
    };

    function c(l) {
        var m = {};
        for (var j = 0; j < l.childNodes.length; j++) {
            var k = l.childNodes[j];
            var h = d(k);
            if (!h) {
                continue
            }
            switch (h.toLowerCase()) {
            case "enclosure":
                m.file = b.xmlAttribute(k, "url");
                break;
            case "title":
                m.title = a(k);
                break;
            case "guid":
                m.mediaid = a(k);
                break;
            case "pubdate":
                m.date = a(k);
                break;
            case "description":
                m.description = a(k);
                break;
            case "link":
                m.link = a(k);
                break;
            case "category":
                if (m.tags) {
                    m.tags += a(k)
                } else {
                    m.tags = a(k)
                }
                break
            }
        }
        m = g.mediaparser.parseGroup(l, m);
        m = g.jwparser.parseEntry(l, m);
        return new jwplayer.playlist.item(m)
    }
})(jwplayer.html5.parsers);
(function (a) {
    a.srt = function (i, b, f) {
        var e, d, m = jwplayer.utils,
            l = m.seconds;

        function j(n) {
            if (n == 0) {
                b("Crossdomain loading denied: " + d)
            } else {
                if (n == 404) {
                    b("SRT File not found: " + d)
                } else {
                    b("Error " + n + " loading SRT file: " + d)
                }
            }
        }
        this.load = function (o) {
            d = o;
            try {
                if (c(o) && m.exists(window.XDomainRequest)) {
                    e = new XDomainRequest();
                    e.onload = function () {
                        var p = e.responseText;
                        h(p)
                    };
                    e.onerror = function () {
                        var p = e.status;
                        j(p)
                    }
                }
                e.open("GET", o, true);
                e.send(null)
            } catch (n) {
                b("Error loading SRT File: " + o)
            }
        };

        function h(r) {
            var o = f ? [] : [{
                begin: 0,
                text: ""
            }];
            r = r.replace(/^\s+/, "").replace(/\s+$/, "");
            var q = r.split("\r\n\r\n");
            if (q.length == 1) {
                q = r.split("\n\n")
            }
            for (var n = 0; n < q.length; n++) {
                if (q[n] == "WEBVTT") {
                    continue
                }
                var p = k(q[n]);
                if (p.text) {
                    o.push(p);
                    if (p.end && !f) {
                        o.push({
                            begin: p.end,
                            text: ""
                        });
                        delete p.end
                    }
                }
            }
            if (o.length > 1) {
                i(o)
            } else {
                b("Invalid SRT file: " + d)
            }
        }

        function k(s) {
            var r = {};
            var t = s.split("\r\n");
            if (t.length == 1) {
                t = s.split("\n")
            }
            try {
                var n = 1;
                if (t[0].indexOf(" --> ") > 0) {
                    n = 0
                }
                var p = t[n].indexOf(" --> ");
                if (p > 0) {
                    r.begin = l(t[n].substr(0, p));
                    r.end = l(t[n].substr(p + 5))
                }
                if (t[n + 1]) {
                    r.text = t[n + 1];
                    for (var q = n + 2; q < t.length; q++) {
                        r.text += "<br/>" + t[q]
                    }
                }
            } catch (o) {}
            return r
        }

        function c(n) {
            if (n && n.indexOf("://") >= 0) {
                if (n.split("/")[2] != window.location.href.split("/")[2]) {
                    return true
                }
            }
            return false
        }

        function g() {
            e = new XMLHttpRequest();
            e.onreadystatechange = function () {
                if (e.readyState === 4) {
                    if (e.status === 200) {
                        h(e.responseText)
                    } else {
                        j(e.status)
                    }
                }
            }
        }
        g()
    }
})(jwplayer.html5.parsers);
(function (e) {
    var j = jwplayer.utils,
        k = jwplayer.events,
        l = k.state,
        h = j.css,
        g = "playing",
        i = document,
        a = ".jwcaptions",
        b = "absolute",
        c = "none",
        f = "100%",
        d = "hidden";
    e.captions = function (I, u) {
        var O = I,
            v, w, L = {
                back: true,
                color: "#FFFFFF",
                fontSize: 15
            }, K = {
                fontFamily: "Arial,sans-serif",
                fontStyle: "normal",
                fontWeight: "normal",
                textDecoration: "none"
            }, S, R, y, s = [],
            r = 0,
            T = false,
            G, B = new k.eventdispatcher();
        j.extend(this, B);

        function E() {
            v = i.createElement("div");
            v.id = O.id + "_caption";
            v.className = "jwcaptions";
            O.jwAddEventListener(k.JWPLAYER_PLAYER_STATE, C);
            O.jwAddEventListener(k.JWPLAYER_PLAYLIST_ITEM, N);
            O.jwAddEventListener(k.JWPLAYER_MEDIA_ERROR, M);
            O.jwAddEventListener(k.JWPLAYER_ERROR, M);
            O.jwAddEventListener(k.JWPLAYER_READY, t);
            O.jwAddEventListener(k.JWPLAYER_MEDIA_TIME, m);
            O.jwAddEventListener(k.JWPLAYER_FULLSCREEN, x);
            O.jwAddEventListener(k.JWPLAYER_RESIZE, n)
        }

        function n(V) {
            q(false)
        }

        function M(V) {
            j.log("CAPTIONS(" + V + ")")
        }

        function H() {
            R = "idle";
            q(false)
        }

        function C(V) {
            switch (V.newstate) {
            case l.IDLE:
                H();
                break;
            case l.PLAYING:
                A();
                break
            }
        }

        function x(V) {
            T = V.fullscreen;
            if (V.fullscreen) {
                J();
                setTimeout(J, 500)
            } else {
                q(true)
            }
        }

        function J() {
            var V = v.offsetHeight,
                W = v.offsetWidth;
            if (V != 0 && W != 0) {
                S.resize(W, Math.round(V * 0.94))
            }
        }

        function N(W) {
            y = 0;
            s = [];
            S.update(0);
            var ae = O.jwGetPlaylist()[O.jwGetPlaylistIndex()],
                ab = ae.tracks,
                aa = [],
                Z = 0,
                ac = "",
                V = 0,
                X = "";
            for (Z = 0; Z < ab.length; Z++) {
                var Y = ab[Z].kind.toLowerCase();
                if (Y == "captions" || Y == "subtitles") {
                    aa.push(ab[Z])
                }
            }
            r = 0;
            for (Z = 0; Z < aa.length; Z++) {
                X = aa[Z].file;
                if (X) {
                    if (!aa[Z].label) {
                        aa[Z].label = Z.toString()
                    }
                    s.push(aa[Z])
                }
            }
            for (Z = 0; Z < s.length; Z++) {
                if (s[Z]["default"]) {
                    V = Z + 1;
                    break
                }
            }
            var ad = j.getCookies(),
                ac = ad.captionLabel;
            if (ac) {
                ab = p();
                for (Z = 0; Z < ab.length; Z++) {
                    if (ac == ab[Z].label) {
                        V = Z;
                        break
                    }
                }
            }
            o(V);
            q(false);
            P(k.JWPLAYER_CAPTIONS_LIST, p(), r)
        }

        function U(V) {
            G = V;
            j.ajax(V, z, F)
        }

        function z(W) {
            var X = W.responseXML.firstChild,
                V;
            if (e.parsers.localName(X) == "tt") {
                V = new jwplayer.html5.parsers.dfxp(Q, M)
            } else {
                V = new jwplayer.html5.parsers.srt(Q, M)
            }
            V.load(G)
        }

        function F(W) {
            var V = new jwplayer.html5.parsers.srt(Q, M);
            V.load(G)
        }

        function Q(V) {
            S.populate(V);
            if (y < s.length) {
                s[y].data = V
            }
            q(false)
        }

        function A(V) {
            R = g;
            q(false)
        }

        function q(V) {
            if (j.isMobile() || !s.length) {
                S.hide()
            } else {
                if (R == g && r > 0) {
                    S.show();
                    if (T) {
                        x({
                            fullscreen: true
                        });
                        return
                    }
                    D();
                    if (V) {
                        setTimeout(D, 500)
                    }
                } else {
                    S.hide()
                }
            }
        }

        function D() {
            S.resize()
        }

        function t() {
            j.foreach(L, function (V, W) {
                if (u && u[V.toLowerCase()] != undefined) {
                    if (V == "color") {
                        K.color = "#" + String(u.color).substr(-6)
                    } else {
                        K[V] = u[V.toLowerCase()]
                    }
                } else {
                    K[V] = W
                }
            });
            S = new jwplayer.html5.captions.renderer(K, v);
            q(false)
        }

        function o(V) {
            if (V > 0) {
                y = V - 1;
                r = V
            } else {
                r = 0
            } if (y >= s.length) {
                return
            }
            if (s[y].data) {
                S.populate(s[y].data)
            } else {
                U(s[y].file)
            }
            q(false)
        }

        function m(V) {
            S.update(V.position)
        }

        function P(Y, X, W) {
            var V = {
                type: Y,
                tracks: X,
                track: W
            };
            B.sendEvent(Y, V)
        }

        function p() {
            var W = new Array();
            W.push({
                label: "Off"
            });
            for (var V = 0; V < s.length; V++) {
                W.push({
                    label: s[V].label
                })
            }
            return W
        }
        this.element = function () {
            return v
        };
        this.getCaptionsList = function () {
            return p()
        };
        this.getCurrentCaptions = function () {
            return r
        };
        this.setCurrentCaptions = function (W) {
            if (W >= 0 && r != W && W <= s.length) {
                o(W);
                var V = p();
                j.saveCookie("captionLabel", V[r].label);
                P(k.JWPLAYER_CAPTIONS_CHANGED, V, r)
            }
        };
        E()
    };
    h(a, {
        position: b,
        cursor: "pointer",
        width: f,
        height: f,
        overflow: d
    })
})(jwplayer.html5);
(function (a) {
    var b = jwplayer.utils.foreach;
    a.captions.renderer = function (q, h) {
        var p, g, o, j, n, k, c = "visible",
            f;
        this.hide = function () {
            d(g, {
                display: "none"
            });
            if (f) {
                clearInterval(f);
                f = null
            }
        };
        this.populate = function (r) {
            j = -1;
            p = r;
            e()
        };

        function l(r) {
            d(g, {
                visibility: "hidden"
            });
            o.innerHTML = r;
            if (r == "") {
                c = "hidden"
            } else {
                c = "visible"
            }
            setTimeout(m, 20)
        }
        this.resize = function () {
            m()
        };

        function m() {
            var t = g.clientWidth,
                s = Math.round(q.fontSize * Math.pow(t / 400, 0.6)),
                r = Math.round(s * 1.4);
            d(o, {
                maxWidth: t + "px",
                fontSize: s + "px",
                lineHeight: r + "px",
                visibility: c
            })
        }

        function e() {
            var s = -1;
            for (var r = 0; r < p.length; r++) {
                if (p[r]["begin"] <= k && (r == p.length - 1 || p[r + 1]["begin"] >= k)) {
                    s = r;
                    break
                }
            }
            if (s == -1) {
                l("")
            } else {
                if (s != j) {
                    j = s;
                    l(p[r]["text"])
                }
            }
        }

        function i() {
            g = document.createElement("div");
            o = document.createElement("span");
            g.appendChild(o);
            h.appendChild(g);
            d(g, {
                display: "block",
                height: "auto",
                position: "absolute",
                bottom: "20px",
                textAlign: "center",
                width: "100%"
            });
            d(o, {
                color: "#" + q.color.substr(-6),
                display: "inline-block",
                fontFamily: q.fontFamily,
                fontStyle: q.fontStyle,
                fontWeight: q.fontWeight,
                height: "auto",
                margin: "auto",
                position: "relative",
                textAlign: "center",
                textDecoration: q.textDecoration,
                wordWrap: "break-word",
                width: "auto"
            });
            if (q.back) {
                d(o, {
                    background: "#000"
                })
            } else {
                d(o, {
                    textShadow: "-2px 0px 1px #000,2px 0px 1px #000,0px -2px 1px #000,0px 2px 1px #000,-1px 1px 1px #000,1px 1px 1px #000,1px -1px 1px #000,1px 1px 1px #000"
                })
            }
        }
        i();
        this.show = function () {
            d(g, {
                display: "block"
            });
            if (!f) {
                f = setInterval(m, 250)
            }
            m()
        };

        function d(s, r) {
            b(r, function (t, u) {
                s.style[t] = u
            })
        }
        this.update = function (r) {
            k = r;
            if (p) {
                e()
            }
        }
    }
})(jwplayer.html5);
(function (p) {
    var l = p.html5,
        y = p.utils,
        c = p.events,
        g = c.state,
        s = y.css,
        B = y.transitionStyle,
        d = "button",
        r = "text",
        h = "divider",
        u = "slider",
        j = "relative",
        k = "absolute",
        b = "none",
        q = "block",
        z = "inline",
        o = "inline-block",
        m = "hidden",
        e = "left",
        F = "right",
        n = "100%",
        w = "opacity .15s, background .15s, visibility .15s",
        D = 150,
        v = {
            display: b
        }, a = {
            display: E
        }, C = ".jwcontrolbar",
        t = false,
        i = true,
        A = null,
        E = undefined,
        x = window,
        f = document;
    l.controlbar = function (ai, aY) {
        var bc, Y, N = ao("divider", h),
            J = {
                margin: 8,
                maxwidth: 800,
                font: "Arial,sans-serif",
                fontsize: 11,
                fontcolor: parseInt("eeeeee", 16),
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [ao("play", d), N, ao("prev", d), ao("next", d), ao("divider", h, "nextdiv"), ao("elapsed", r)]
                    },
                    center: {
                        position: "center",
                        elements: [ao("time", u)]
                    },
                    right: {
                        position: "right",
                        elements: [ao("duration", r), N, ao("hd", d), ao("cc", d), N, ao("mute", d), ao("volume", u), N, ao("fullscreen", d)]
                    }
                }
            }, aI, bf, ax, R, bv, aN, bG, an, ba, ay, br, ak, by, bp, aM, aC, Z, bo, bJ, ar, ap, bD, U, aZ, aD, M, a2, a9, bb = t,
            aX = t,
            a0 = 0,
            W = 0,
            bz = {
                play: "pause",
                mute: "unmute",
                fullscreen: "normalscreen"
            }, bL = {
                play: t,
                mute: t,
                fullscreen: t
            }, bk = {
                play: al,
                mute: bF,
                fullscreen: aU,
                next: bd,
                prev: aL
            }, bI = {
                time: bK,
                volume: aT
            }, O = {}, ah = this;

        function ao(bN, bP, bO) {
            return {
                name: bN,
                type: bP,
                className: bO
            }
        }

        function bj() {
            ax = {};
            bc = ai;
            aN = bc.id + "_controlbar";
            bG = an = 0;
            bv = aQ();
            bv.id = aN;
            bv.className = "jwcontrolbar";
            Y = bc.skin;
            bf = Y.getComponentLayout("controlbar");
            if (!bf) {
                bf = J.layout
            }
            y.clearCss("#" + aN);
            bC();
            a1();
            aa();
            setTimeout(function () {
                P();
                bE()
            }, 0);
            at();
            ah.visible = false
        }

        function aa() {
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_TIME, bm);
            bc.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, ad);
            bc.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, aV);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_MUTE, bE);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_VOLUME, P);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_BUFFER, ag);
            bc.jwAddEventListener(c.JWPLAYER_FULLSCREEN, az);
            bc.jwAddEventListener(c.JWPLAYER_PLAYLIST_LOADED, at);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_LEVELS, bH);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_LEVEL_CHANGED, bh);
            bc.jwAddEventListener(c.JWPLAYER_CAPTIONS_LIST, bx);
            bc.jwAddEventListener(c.JWPLAYER_CAPTIONS_CHANGED, am);
            bv.addEventListener("mouseover", function (bN) {
                x.addEventListener("mousemove", T, t);
                x.addEventListener("mouseup", T, t);
                x.addEventListener("mousedown", aF, t)
            }, false);
            bv.addEventListener("mouseout", function (bN) {
                x.removeEventListener("mousemove", T);
                x.removeEventListener("mouseup", T);
                x.removeEventListener("mousedown", aF);
                f.onselectstart = null
            }, false)
        }

        function bm(bO) {
            var bN = t,
                bP;
            if (ax.elapsed) {
                bP = y.timeFormat(bO.position);
                ax.elapsed.innerHTML = bP;
                bN = (bP.length != y.timeFormat(an).length)
            }
            if (ax.duration) {
                bP = y.timeFormat(bO.duration);
                ax.duration.innerHTML = bP;
                bN = (bN || (bP.length != y.timeFormat(bG).length))
            }
            if (bO.duration > 0) {
                av(bO.position / bO.duration)
            } else {
                av(0)
            }
            bG = bO.duration;
            an = bO.position;
            if (bN) {
                aS()
            }
        }

        function ad(bN) {
            switch (bN.newstate) {
            case g.BUFFERING:
            case g.PLAYING:
                s(aW(".jwtimeSliderThumb"), {
                    opacity: 1
                });
                L("play", i);
                break;
            case g.PAUSED:
                if (!aX) {
                    L("play", t)
                }
                break;
            case g.IDLE:
                L("play", t);
                s(aW(".jwtimeSliderThumb"), {
                    opacity: 0
                });
                if (ax.timeRail) {
                    ax.timeRail.className = "jwrail";
                    setTimeout(function () {
                        ax.timeRail.className += " jwsmooth"
                    }, 100)
                }
                au(0);
                bm({
                    position: 0,
                    duration: 0
                });
                break
            }
        }

        function aV(bN) {
            var bO = bc.jwGetPlaylist()[bN.index].tracks;
            if (y.typeOf(bO) == "array") {
                for (var bP = 0; bP < bO.length; bP++) {
                    if (bO[bP].file && bO[bP].kind && bO[bP].kind.toLowerCase() == "thumbnails") {
                        ar.load(bO[bP].file);
                        return
                    }
                }
            }
            ar.load()
        }

        function bE() {
            var bN = bc.jwGetMute();
            L("mute", bN);
            H(bN ? 0 : by)
        }

        function P() {
            by = bc.jwGetVolume() / 100;
            H(by)
        }

        function ag(bN) {
            au(bN.bufferPercent / 100)
        }

        function az(bN) {
            L("fullscreen", bN.fullscreen);
            bt()
        }

        function at(bN) {
            s(aW(".jwhd"), v);
            s(aW(".jwcc"), v);
            bt();
            aS()
        }

        function bH(bN) {
            ba = bN.levels;
            if (ba && ba.length > 1 && U) {
                s(aW(".jwhd"), {
                    display: E
                });
                U.clearOptions();
                for (var bO = 0; bO < ba.length; bO++) {
                    U.addOption(ba[bO].label, bO)
                }
                bh(bN)
            } else {
                s(aW(".jwhd"), {
                    display: "none"
                })
            }
            aS()
        }

        function bh(bN) {
            ay = bN.currentQuality;
            if (U && ay >= 0) {
                U.setActive(bN.currentQuality)
            }
        }

        function bx(bN) {
            br = bN.tracks;
            if (br && br.length > 1 && aD) {
                s(aW(".jwcc"), {
                    display: E
                });
                aD.clearOptions();
                for (var bO = 0; bO < br.length; bO++) {
                    aD.addOption(br[bO].label, bO)
                }
                am(bN)
            } else {
                s(aW(".jwcc"), {
                    display: "none"
                })
            }
            aS()
        }

        function am(bN) {
            if (!br) {
                return
            }
            ak = bN.track;
            if (aD && ak >= 0) {
                aD.setActive(bN.track)
            }
        }

        function bs() {
            return ( !! f.querySelector("#" + bc.id + " .jwplaylist") && !bc.jwGetFullscreen())
        }

        function bC() {
            aI = y.extend({}, J, Y.getComponentSettings("controlbar"), aY);
            R = aJ("background").height;
            s("#" + aN, {
                height: R,
                bottom: bb ? 0 : aI.margin
            });
            s(aW(".jwtext"), {
                font: aI.fontsize + "px/" + aJ("background").height + "px " + aI.font,
                color: aI.fontcolor,
                "font-weight": aI.fontweight
            });
            s(aW(".jwoverlay"), {
                bottom: R
            });
            if (aI.maxwidth > 0) {
                s(aW(), {
                    "max-width": aI.maxwidth
                })
            }
        }

        function aW(bN) {
            return "#" + aN + (bN ? " " + bN : "")
        }

        function aQ() {
            return bw("span")
        }

        function bw(bN) {
            return f.createElement(bN)
        }

        function a1() {
            var bP = aq("capLeft");
            var bO = aq("capRight");
            var bN = aq("background", {
                position: k,
                left: aJ("capLeft").width,
                right: aJ("capRight").width,
                "background-repeat": "repeat-x"
            }, i);
            if (bN) {
                a3(bv, bN)
            }
            if (bP) {
                a3(bv, bP)
            }
            bl();
            if (bO) {
                a3(bv, bO)
            }
        }

        function aR(bN) {
            switch (bN.type) {
            case h:
                return aB(bN);
                break;
            case r:
                return bM(bN.name);
                break;
            case d:
                if (bN.name != "blank") {
                    return X(bN.name)
                }
                break;
            case u:
                return aw(bN.name);
                break
            }
        }

        function aq(bP, bO, bQ, bU, bR) {
            var bT = aQ();
            bT.className = "jw" + bP;
            var bN = bU ? " left center" : " center";
            var bV = aJ(bP);
            bT.innerHTML = "&nbsp;";
            if (!bV || bV.src == "") {
                return
            }
            var bS;
            if (bQ) {
                bS = {
                    background: "url('" + bV.src + "') repeat-x " + bN,
                    height: bR ? bV.height : E
                }
            } else {
                bS = {
                    background: "url('" + bV.src + "') no-repeat" + bN,
                    width: bV.width,
                    height: bR ? bV.height : E
                }
            }
            bT.skin = bV;
            s(aW(".jw" + bP), y.extend(bS, bO));
            ax[bP] = bT;
            return bT
        }

        function X(bP) {
            if (!aJ(bP + "Button").src) {
                return A
            }
            var bR = aQ();
            bR.className = "jw" + bP + " jwbuttoncontainer";
            var bQ = bw("button");
            bQ.addEventListener("click", aj(bP), t);
            bQ.innerHTML = "&nbsp;";
            a3(bR, bQ);
            var bS = aJ(bP + "Button");
            var bO = aJ(bP + "ButtonOver");
            bg(aW(".jw" + bP + " button"), bS, bO);
            var bN = bz[bP];
            if (bN) {
                bg(aW(".jw" + bP + ".jwtoggle button"), aJ(bN + "Button"), aJ(bN + "ButtonOver"))
            }
            ax[bP] = bR;
            return bR
        }

        function bg(bN, bO, bP) {
            if (!bO.src) {
                return
            }
            s(bN, {
                width: bO.width,
                background: "url(" + bO.src + ") center no-repeat"
            });
            if (bP.src) {
                s(bN + ":hover", {
                    background: "url(" + bP.src + ") center no-repeat"
                })
            }
        }

        function aj(bN) {
            return function (bO) {
                if (bk[bN]) {
                    bk[bN]()
                }
                bO.preventDefault()
            }
        }

        function al() {
            if (bL.play) {
                bc.jwPause()
            } else {
                bc.jwPlay()
            }
        }

        function bF() {
            bc.jwSetMute(!bL.mute);
            bE({
                mute: bL.mute
            })
        }

        function aP(bN) {
            y.foreach(O, function (bP, bO) {
                if (bP != bN) {
                    bO.hide()
                }
            })
        }

        function V() {
            if (bb) {
                return
            }
            bp.show();
            aP("volume")
        }

        function aT(bN) {
            H(bN);
            if (bN < 0.1) {
                bN = 0
            }
            if (bN > 0.9) {
                bN = 1
            }
            bc.jwSetVolume(bN * 100)
        }

        function bu() {
            if (bb) {
                return
            }
            M.show();
            aP("fullscreen")
        }

        function bK(bN) {
            bc.jwSeek(bN * bG)
        }

        function aU() {
            bc.jwSetFullscreen()
        }

        function bd() {
            bc.jwPlaylistNext()
        }

        function aL() {
            bc.jwPlaylistPrev()
        }

        function L(bN, bO) {
            if (!y.exists(bO)) {
                bO = !bL[bN]
            }
            if (ax[bN]) {
                ax[bN].className = "jw" + bN + (bO ? " jwtoggle jwtoggling" : " jwtoggling");
                setTimeout(function () {
                    ax[bN].className = ax[bN].className.replace(" jwtoggling", "")
                }, 100)
            }
            bL[bN] = bO
        }

        function aA(bN) {
            return aN + "_" + bN
        }

        function bM(bN, bR) {
            var bP = {};
            var bQ = aJ(bN + "Background");
            if (bQ.src) {
                var bO = aQ();
                bO.id = aA(bN);
                bO.className = "jwtext jw" + bN;
                bP.background = "url(" + bQ.src + ") no-repeat center";
                bP["background-size"] = "100% " + aJ("background").height + "px";
                s(aW(".jw" + bN), bP);
                bO.innerHTML = "00:00";
                ax[bN] = bO;
                return bO
            }
            return null
        }

        function aB(bO) {
            var bN;
            if (bO.width) {
                bN = aQ();
                bN.className = "jwblankDivider";
                s(bN, {
                    width: parseInt(bO.width)
                })
            } else {
                if (bO.element) {
                    bN = aq(bO.element)
                } else {
                    bN = aq(bO.name);
                    if (!bN) {
                        bN = aQ();
                        bN.className = "jwblankDivider"
                    }
                }
            } if (bO.className) {
                bN.className += " " + bO.className
            }
            return bN
        }

        function aG() {
            if (ba && ba.length > 1) {
                if (bD) {
                    clearTimeout(bD);
                    bD = undefined
                }
                U.show();
                aP("hd")
            }
        }

        function af() {
            if (br && br.length > 1) {
                if (aZ) {
                    clearTimeout(aZ);
                    aZ = undefined
                }
                aD.show();
                aP("cc")
            }
        }

        function a5(bN) {
            if (bN >= 0 && bN < ba.length) {
                bc.jwSetCurrentQuality(bN);
                U.hide()
            }
        }

        function ae(bN) {
            if (bN >= 0 && bN < br.length) {
                bc.jwSetCurrentCaptions(bN);
                aD.hide()
            }
        }

        function aK() {
            L("cc")
        }

        function aw(bN) {
            var bP = aQ(),
                bQ = bN + (bN == "time" ? "Slider" : ""),
                bW = bQ + "Cap",
                bS = bN == "volume",
                bR = bS ? "Top" : "Left",
                bY = bS ? "Bottom" : "Right",
                bU = aq(bW + bR, A, t, t, bS),
                bV = aq(bW + bY, A, t, t, bS),
                bO = be(bN, bS, bR, bY),
                bZ = aJ(bW + bR),
                bX = aJ(bW + bR),
                bT = aJ(bN + "SliderRail");
            bP.className = "jwslider jw" + bN;
            if (bU) {
                a3(bP, bU)
            }
            a3(bP, bO);
            if (bV) {
                if (bS) {
                    bV.className += " jwcapBottom"
                }
                a3(bP, bV)
            }
            s(aW(".jw" + bN + " .jwrail"), {
                left: bS ? E : bZ.width,
                right: bS ? E : bX.width,
                top: bS ? bZ.height : E,
                bottom: bS ? bX.height : E,
                width: bS ? n : E,
                height: bS ? "auto" : E
            });
            ax[bN] = bP;
            bP.vertical = bS;
            if (bN == "time") {
                bo = new l.overlay(aN + "_timetooltip", Y);
                ar = new l.thumbs(aN + "_thumb");
                ap = bw("div");
                ap.className = "jwoverlaytext";
                bJ = bw("div");
                a3(bJ, ar.element());
                a3(bJ, ap);
                bo.setContents(bJ);
                aC = bO;
                Q(0);
                a3(bO, bo.element());
                bA(bP);
                av(0);
                au(0)
            } else {
                if (bN == "volume") {
                    ac(bP, bS, bR, bY)
                }
            }
            return bP
        }

        function be(bO, bT, bS, b2) {
            var bP = aQ(),
                bV = ["Rail", "Buffer", "Progress"],
                bZ;
            bP.className = "jwrail jwsmooth";
            for (var bX = 0; bX < bV.length; bX++) {
                var bR = (bO == "time" ? "Slider" : ""),
                    bY = bO + bR + bV[bX],
                    bW = aq(bY, A, !bT, (bO == "volume")),
                    bU = aq(bY + "Cap" + bS, A, t, t, bT),
                    b0 = aq(bY + "Cap" + b2, A, t, t, bT),
                    b3 = aJ(bY + "Cap" + bS),
                    b1 = aJ(bY + "Cap" + b2);
                if (bW) {
                    var bQ = aQ();
                    bQ.className = "jwrailgroup " + bV[bX];
                    if (bU) {
                        a3(bQ, bU)
                    }
                    a3(bQ, bW);
                    if (b0) {
                        a3(bQ, b0);
                        b0.className += " jwcap" + (bT ? "Bottom" : "Right")
                    }
                    s(aW(".jwrailgroup." + bV[bX]), {
                        "min-width": (bT ? E : b3.width + b1.width)
                    });
                    bQ.capSize = bT ? b3.height + b1.height : b3.width + b1.width;
                    s(aW("." + bW.className), {
                        left: bT ? E : b3.width,
                        right: bT ? E : b1.width,
                        top: bT ? b3.height : E,
                        bottom: bT ? b1.height : E,
                        height: bT ? "auto" : E
                    });
                    if (bX == 2) {
                        bZ = bQ
                    }
                    ax[bY] = bQ;
                    a3(bP, bQ)
                }
            }
            var bN = aq(bO + bR + "Thumb", A, t, t, bT);
            if (bN) {
                s(aW("." + bN.className), {
                    opacity: bO == "time" ? 0 : 1,
                    "margin-top": bT ? bN.skin.height / -2 : E
                });
                bN.className += " jwthumb";
                a3(bT && bZ ? bZ : bP, bN)
            }
            bP.addEventListener("mousedown", a7(bO), t);
            if (bO == "time") {
                bP.addEventListener("mousemove", bi, t);
                bP.addEventListener("mouseout", ab, t)
            }
            ax[bO + "Rail"] = bP;
            return bP
        }

        function a4() {
            var bN = bc.jwGetState();
            return (bN == g.IDLE)
        }

        function aF(bN) {
            bN.preventDefault();
            f.onselectstart = function () {
                return t
            }
        }

        function a7(bN) {
            return (function (bO) {
                if (bO.button != 0) {
                    return
                }
                ax[bN + "Rail"].className = "jwrail";
                if (bN == "time") {
                    if (!a4()) {
                        bc.jwSeekDrag(i);
                        aX = bN
                    }
                } else {
                    aX = bN
                }
            })
        }

        function T(bN) {
            var bP = (new Date()).getTime();
            if (bP - W > 50) {
                aO(bN);
                W = bP
            }
            if (!aX || bN.button != 0) {
                return
            }
            var bR = ax[aX].getElementsByClassName("jwrail")[0],
                bS = y.bounds(bR),
                bO = aX,
                bQ = ax[bO].vertical ? (bS.bottom - bN.pageY) / bS.height : (bN.pageX - bS.left) / bS.width;
            if (bN.type == "mouseup") {
                if (bO == "time") {
                    bc.jwSeekDrag(t)
                }
                ax[bO + "Rail"].className = "jwrail jwsmooth";
                aX = A;
                bI[bO](bQ)
            } else {
                if (aX == "time") {
                    av(bQ)
                } else {
                    H(bQ)
                } if (bP - a0 > 500) {
                    a0 = bP;
                    bI[aX](bQ)
                }
            }
            return false
        }

        function bi(bN) {
            if (bo && bG && !bb) {
                a6(bo);
                bo.show()
            }
        }

        function ab(bN) {
            if (bo) {
                bo.hide()
            }
        }

        function aO(bO) {
            Z = y.bounds(aC);
            if (!Z || Z.width == 0) {
                return
            }
            var bP = bo.element(),
                bN = (bO.pageX - Z.left) - x.pageXOffset;
            if (bN >= 0 && bN <= Z.width) {
                bP.style.left = Math.round(bN) + "px";
                Q(bG * bN / Z.width);
                aM = y.bounds(bv)
            }
        }

        function Q(bN) {
            ap.innerHTML = y.timeFormat(bN);
            ar.updateTimeline(bN);
            bo.setContents(bJ);
            aM = y.bounds(bv);
            a6(bo)
        }

        function bA(bN) {
            if (ax.timeSliderThumb) {
                s(aW(".jwtimeSliderThumb"), {
                    "margin-left": (aJ("timeSliderThumb").width / -2)
                })
            }
            au(0);
            av(0)
        }

        function ac(bP, bN, bR, bO) {
            var bQ = "volume";
            s(aW(".jwvolume"), {
                width: aJ(bQ + "Rail").width + (bN ? 0 : aJ(bQ + "Cap" + bR).width + aJ(bQ + "Cap" + bO).width),
                height: bN ? (aJ(bQ + "Cap" + bR).height + aJ(bQ + "Rail").height + aJ(bQ + "RailCap" + bR).height + aJ(bQ + "RailCap" + bO).height + aJ(bQ + "Cap" + bO).height) : E
            });
            if (bN) {
                bP.className += " jwvertical"
            }
        }
        var S = {};

        function bl() {
            G("left");
            G("center");
            G("right");
            a3(bv, S.left);
            a3(bv, S.center);
            a3(bv, S.right);
            bq();
            s(aW(".jwright"), {
                right: aJ("capRight").width
            })
        }

        function bq() {
            if (ax.hd) {
                U = new l.menu("hd", aN + "_hd", Y, a5);
                bB(U, ax.hd, aG, K);
                O.hd = U
            }
            if (ax.cc) {
                aD = new l.menu("cc", aN + "_cc", Y, ae);
                bB(aD, ax.cc, af, bn);
                O.cc = aD
            }
            if (ax.mute && ax.volume && ax.volume.vertical) {
                bp = new l.overlay(aN + "_volumeoverlay", Y);
                bp.setContents(ax.volume);
                bB(bp, ax.mute, V);
                O.volume = bp
            }
            if (ax.fullscreen) {
                M = new l.overlay(aN + "_fullscreenoverlay", Y);
                var bN = bw("div");
                bN.className = "jwoverlaytext";
                bN.innerHTML = "Fullscreen";
                M.setContents(bN);
                bB(M, ax.fullscreen, bu);
                O.fullscreen = M
            }
        }

        function bn() {
            aZ = setTimeout(aD.hide, 500)
        }

        function K() {
            bD = setTimeout(U.hide, 500)
        }

        function bB(bN, bP, bQ, bR) {
            var bO = bN.element();
            a3(bP, bO);
            bP.addEventListener("mousemove", bQ, t);
            if (bR) {
                bP.addEventListener("mouseout", bR, t)
            } else {
                bP.addEventListener("mouseout", bN.hide, t)
            }
            s("#" + bO.id, {
                left: "50%"
            })
        }

        function G(bO) {
            var bN = aQ();
            bN.className = "jwgroup jw" + bO;
            S[bO] = bN;
            if (bf[bO]) {
                I(bf[bO], S[bO])
            }
        }

        function I(bQ, bN) {
            if (bQ && bQ.elements.length > 0) {
                for (var bP = 0; bP < bQ.elements.length; bP++) {
                    var bO = aR(bQ.elements[bP]);
                    if (bO) {
                        if (bQ.elements[bP].name == "volume" && bO.vertical) {
                            bp = new l.overlay(aN + "_volumeOverlay", Y);
                            bp.setContents(bO)
                        } else {
                            a3(bN, bO)
                        }
                    }
                }
            }
        }
        var aS = function () {
            clearTimeout(a2);
            a2 = setTimeout(ah.redraw, 0)
        };
        ah.redraw = function () {
            bC();
            var bP = aJ("capLeft"),
                bO = aJ("capRight");
            s(aW(".jwgroup.jwcenter"), {
                left: Math.round(y.parseDimension(S.left.offsetWidth) + bP.width),
                right: Math.round(y.parseDimension(S.right.offsetWidth) + bO.width)
            });
            var bN = (bv.parentNode.clientWidth > aI.maxwidth),
                bQ = bb ? 0 : aI.margin;
            s(aW(), {
                left: bN ? "50%" : bQ,
                right: bN ? E : bQ,
                "margin-left": bN ? bv.clientWidth / -2 : E,
                width: bN ? n : E
            });
            aE()
        };

        function bt() {
            if (bc.jwGetPlaylist().length > 1 && !bs()) {
                s(aW(".jwnext"), a);
                s(aW(".jwprev"), a);
                s(aW(".nextdiv"), a)
            } else {
                s(aW(".jwnext"), v);
                s(aW(".jwprev"), v);
                s(aW(".nextdiv"), v)
            }
        }

        function aE() {
            var bP, bO, bN;
            aM = y.bounds(bv);
            y.foreach(O, function (bR, bQ) {
                a6(bQ)
            })
        }

        function a6(bN, bP) {
            if (!aM) {
                aM = y.bounds(bv)
            }
            bN.offsetX(0);
            var bO = y.bounds(bN.element());
            if (bO.right > aM.right) {
                bN.offsetX(aM.right - bO.right)
            } else {
                if (bO.left < aM.left) {
                    bN.offsetX(aM.left - bO.left)
                }
            }
        }
        ah.audioMode = function (bN) {
            if (bN != bb) {
                bb = bN;
                s(aW(".jwfullscreen"), {
                    display: bN ? b : E
                });
                s(aW(".jwhd"), {
                    display: bN ? b : E
                });
                s(aW(".jwcc"), {
                    display: bN ? b : E
                });
                aS()
            }
        };
        ah.element = function () {
            return bv
        };
        ah.margin = function () {
            return parseInt(aI.margin)
        };
        ah.height = function () {
            return R
        };

        function au(bN) {
            bN = Math.min(Math.max(0, bN), 1);
            if (ax.timeSliderBuffer) {
                ax.timeSliderBuffer.style.width = bN * 100 + "%";
                ax.timeSliderBuffer.style.opacity = bN > 0 ? 1 : 0
            }
        }

        function aH(bQ, bU) {
            var bO = ax[bQ].vertical,
                bT = bQ + (bQ == "time" ? "Slider" : ""),
                bS = 100 * Math.min(Math.max(0, bU), 1) + "%",
                bP = ax[bT + "Progress"],
                bN = ax[bT + "Thumb"],
                bR = t;
            if (bP) {
                if (bO) {
                    bP.style.height = bS;
                    bP.style.bottom = 0;
                    if (bP.clientHeight <= bP.capSize) {
                        bR = i
                    }
                } else {
                    bP.style.width = bS;
                    if (bP.clientWidth <= bP.capSize) {
                        bR = i
                    }
                }
                bP.style.opacity = ((!bR && bU > 0) || aX) ? 1 : 0
            }
            if (bN) {
                if (bO) {
                    bN.style.top = 0
                } else {
                    bN.style.left = bS
                }
            }
        }

        function H(bN) {
            aH("volume", bN)
        }

        function av(bN) {
            aH("time", bN)
        }

        function aJ(bN) {
            var bO = Y.getSkinElement(bN.indexOf("volume") == 0 ? "tooltip" : "controlbar", bN);
            if (bO) {
                return bO
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: E,
                    ready: t
                }
            }
        }

        function a3(bN, bO) {
            bN.appendChild(bO)
        }
        ah.show = function () {
            if (ah.visible) {
                return
            }
            a8();
            ah.visible = true;
            bv.style.display = o;
            aS();
            bE();
            a9 = setTimeout(function () {
                bv.style.opacity = 1
            }, 10)
        };

        function a8() {
            clearTimeout(a9);
            a9 = E
        }
        ah.hide = function () {
            if (!ah.visible) {
                return
            }
            ah.visible = false;
            bv.style.opacity = 0;
            a8();
            a9 = setTimeout(function () {
                bv.style.display = b
            }, D)
        };
        bj()
    };
    s(C, {
        position: k,
        opacity: 0,
        display: b
    });
    s(C + " span", {
        height: n
    });
    y.dragStyle(C + " span", b);
    s(C + " .jwgroup", {
        display: z
    });
    s(C + " span, " + C + " .jwgroup button," + C + " .jwleft", {
        position: j,
        "float": e
    });
    s(C + " .jwright", {
        position: k
    });
    s(C + " .jwcenter", {
        position: k
    });
    s(C + " buttoncontainer," + C + " button", {
        display: o,
        height: n,
        border: b,
        cursor: "pointer"
    });
    s(C + " .jwcapRight," + C + " .jwtimeSliderCapRight," + C + " .jwvolumeCapRight", {
        right: 0,
        position: k
    });
    s(C + " .jwcapBottom", {
        bottom: 0,
        position: k
    });
    s(C + " .jwtime", {
        position: k,
        height: n,
        width: n,
        left: 0
    });
    s(C + " .jwthumb", {
        position: k,
        height: n,
        cursor: "pointer"
    });
    s(C + " .jwrail", {
        position: k,
        cursor: "pointer"
    });
    s(C + " .jwrailgroup", {
        position: k,
        width: n
    });
    s(C + " .jwrailgroup span", {
        position: k
    });
    s(C + " .jwdivider+.jwdivider", {
        display: b
    });
    s(C + " .jwtext", {
        padding: "0 5px",
        "text-align": "center"
    });
    s(C + " .jwoverlaytext", {
        padding: 3,
        "text-align": "center"
    });
    s(C + " .jwvertical *", {
        display: q
    });
    B(C, w);
    B(C + " button", w);
    B(C + " .jwtime .jwsmooth span", w + ", width .15s linear, left .05s linear");
    B(C + " .jwtoggling", b)
})(jwplayer);
(function (d) {
    var c = d.html5,
        a = d.utils,
        e = d.events,
        b = e.state;
    c.controller = function (i, j) {
        var n = i,
            k = j,
            r = i.getVideo(),
            y = this,
            K = new e.eventdispatcher(n.id, n.config.debug),
            t = false,
            o = -1,
            C, L, P = false,
            g, A = [];
        a.extend(this, K);

        function Q() {
            n.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, s);
            n.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, function (U) {
                setTimeout(F, 25)
            });
            n.addEventListener(e.JWPLAYER_MEDIA_ERROR, function (V) {
                var U = a.extend({}, V);
                U.type = e.JWPLAYER_ERROR;
                K.sendEvent(U.type, U)
            })
        }

        function u(U) {
            if (!t) {
                k.completeSetup();
                K.sendEvent(U.type, U);
                if (d.utils.exists(window.jwplayer.playerReady)) {
                    d.playerReady(U)
                }
                n.addGlobalListener(p);
                k.addGlobalListener(p);
                K.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: d(n.id).getPlaylist()
                });
                K.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: n.item
                });
                N();
                if (n.autostart && !a.isMobile()) {
                    G()
                }
                t = true;
                while (A.length > 0) {
                    var V = A.shift();
                    E(V.method, V.arguments)
                }
            }
        }

        function p(U) {
            K.sendEvent(U.type, U)
        }

        function s(U) {
            r.play()
        }

        function N(U) {
            z(true);
            switch (a.typeOf(U)) {
            case "string":
                S(U);
                break;
            case "object":
            case "array":
                n.setPlaylist(new d.playlist(U));
                break;
            case "number":
                n.setItem(U);
                break
            }
        }

        function S(V) {
            var U = new c.playlistloader();
            U.addEventListener(e.JWPLAYER_PLAYLIST_LOADED, function (W) {
                N(W.playlist)
            });
            U.addEventListener(e.JWPLAYER_ERROR, function (W) {
                N([]);
                W.message = "Could not load playlist: " + W.message;
                p(W)
            });
            U.load(V)
        }

        function G(V) {
            if (!a.exists(V)) {
                V = true
            }
            if (!V) {
                return h()
            }
            try {
                if (o >= 0) {
                    N(o);
                    o = -1
                }
                if (!C) {
                    C = true;
                    K.sendEvent(e.JWPLAYER_MEDIA_BEFOREPLAY);
                    C = false;
                    if (g) {
                        g = false;
                        L = null;
                        return
                    }
                }
                if (f()) {
                    if (n.playlist.length == 0) {
                        return false
                    }
                    r.load(n.playlist[n.item])
                } else {
                    if (n.state == b.PAUSED) {
                        r.play()
                    }
                }
                return true
            } catch (U) {
                K.sendEvent(e.JWPLAYER_ERROR, U);
                L = null
            }
            return false
        }

        function z(U) {
            L = null;
            try {
                if (!f()) {
                    r.stop()
                } else {
                    if (!U) {
                        P = true
                    }
                } if (C) {
                    g = true
                }
                return true
            } catch (V) {
                K.sendEvent(e.JWPLAYER_ERROR, V)
            }
            return false
        }

        function h(V) {
            L = null;
            if (!a.exists(V)) {
                V = true
            }
            if (!V) {
                return G()
            }
            try {
                switch (n.state) {
                case b.PLAYING:
                case b.BUFFERING:
                    r.pause();
                    break;
                default:
                    if (C) {
                        g = true
                    }
                }
                return true
            } catch (U) {
                K.sendEvent(e.JWPLAYER_ERROR, U)
            }
            return false
        }

        function f() {
            return (n.state == b.IDLE)
        }

        function B(U) {
            if (n.state != b.PLAYING) {
                G(true)
            }
            r.seek(U)
        }

        function w(U) {
            k.fullscreen(U)
        }

        function q(U) {
            n.stretching = U;
            k.resize()
        }

        function H(U) {
            N(U);
            G()
        }

        function I() {
            H(n.item - 1)
        }

        function l() {
            H(n.item + 1)
        }

        function F() {
            if (!f()) {
                return
            } else {
                if (P) {
                    P = false;
                    return
                }
            }
            L = F;
            if (n.repeat) {
                l()
            } else {
                if (n.item == n.playlist.length - 1) {
                    o = 0;
                    z(true);
                    setTimeout(function () {
                        K.sendEvent(e.JWPLAYER_PLAYLIST_COMPLETE)
                    }, 0)
                } else {
                    l()
                }
            }
        }

        function x(U) {
            r.setCurrentQuality(U)
        }

        function R() {
            if (r) {
                return r.getCurrentQuality()
            } else {
                return -1
            }
        }

        function O() {
            if (r) {
                return r.getQualityLevels()
            } else {
                return null
            }
        }

        function T(U) {
            k.setCurrentCaptions(U)
        }

        function J() {
            return k.getCurrentCaptions()
        }

        function D() {
            return k.getCaptionsList()
        }

        function v() {
            try {
                return n.getVideo().detachMedia()
            } catch (U) {
                return null
            }
        }

        function m(W) {
            try {
                var U = n.getVideo().attachMedia(W);
                if (typeof L == "function") {
                    L()
                }
            } catch (V) {
                return null
            }
        }

        function M(U) {
            return function () {
                if (t) {
                    E(U, arguments)
                } else {
                    A.push({
                        method: U,
                        arguments: arguments
                    })
                }
            }
        }

        function E(X, V) {
            var U = [],
                W;
            for (W = 0; W < V.length; W++) {
                U.push(V[W])
            }
            X.apply(this, U)
        }
        this.play = M(G);
        this.pause = M(h);
        this.seek = M(B);
        this.stop = function () {
            P = true;
            M(z)()
        };
        this.load = M(N);
        this.next = M(l);
        this.prev = M(I);
        this.item = M(H);
        this.setVolume = M(n.setVolume);
        this.setMute = M(n.setMute);
        this.setFullscreen = M(w);
        this.setStretching = M(q);
        this.detachMedia = v;
        this.attachMedia = m;
        this.setCurrentQuality = M(x);
        this.getCurrentQuality = R;
        this.getQualityLevels = O;
        this.setCurrentCaptions = M(T);
        this.getCurrentCaptions = J;
        this.getCaptionsList = D;
        this.checkBeforePlay = function () {
            return C
        };
        this.playerReady = u;
        Q()
    }
})(jwplayer);
(function (a) {
    a.html5.defaultskin = function () {
        this.text = '<?xml version="1.0" ?><skin author="LongTail Video" name="Six" version="2.0" target="6.0"><components><component name="controlbar"><settings><setting name="margin" value="8"/><setting name="fontcolor" value="eeeeee"/><setting name="fontsize" value="11"/><setting name="fontweight" value="bold"/><setting name="maxwidth" value="800"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAIAAAD5ZqGGAAAAJklEQVR42mNKSUlhevToEdPXr1+Z/v37RxH+//8/htjv379BZgMA4j5LOzqaqAsAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAh0lEQVR42t2RywnDMAxAhSbJRukGPtgDdJSO0k7U4IOPBhuM8b9SIAG3p0JPFTwETxJICIFCSrkqpZ7EYFAIsbbW7s65RWsNDJK4ee/BGAMhhB2stS7WWui9n7CEGOMsaXwSZ+d/yR+cOcaY+HL8vcByyzl/7HllyX8qpexgSulBhQvl7XjxCydafIt3Z4BrAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAjUlEQVR42tWRywnDMAxAhSbJRukGPtgDdJSO0k7U4INPvthgjP+VSlsSkkvpqYKH4EnCFkKl1Hhxl1LOQIFaa2Ccc1Nr7SqEmDGEAIwxBrz3QIUL9t7hjbUWaq3TRqaUWMJGMjS+l4edfy2/XHOMAWt+eJ3FTuacWS5YSgEmxviU9M/z58R0tIXEifLtATSUfIsSwhegAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAdUlEQVR42u2TsQ3AIAwE2YARMkJGyCiMwiiMwgjUFMAIjOC8lMJdiIjd+aSrr3i9MwzjHXoYMOgFmAIvvQCT4aEXYNLvEK2ZMEKvFODQVqC1Rl/sve8Faq20cMIIvUYgQR5ZMJDh6RixQIF8NMHAgMEZhrHNDU+1T3s3o0CaAAAAAElFTkSuQmCC"/><element name="playButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABhUlEQVR42uXVzUoCYRTGcXNGR3HSDPtASyIhrIjaFJlBRBRUdAUGQQurdVfSrl2LuhEvYxR1IYroRhCEWU1/4R2Yxcz4MUlQB34bGc6D58y8r+/vl2EYczNpKvitzN9/orEEGUEoQhAyJDNs2gAJCiKIYVGIQUUIAWvQNM2jWMEGtoRNpJBAFOGJgsRDAahYRRbHuMAVznGEHaSxZBNkvyPLQhXEkUEew+riE88o4AYn2BVBCcxDgWz+G6fxhLGMPdzBWh184RUPuEUOWaSwgBBkpwAZESRxiALsqoV3EXSPSxwgLUIUc1xOAWvI4RFupeENRVxjH0moCMBvF6BiHXkUMap0lPCCM2QQh2LuwingFE8Ytwa4wTYSCEEaGVCtVo1x1Gq1CQPEiDRNM9yUy2W92WyWdF13HJHrkt2aNxoNbTAYuC555Gtq17her7f6/f7HmK+p+4dmbcysO71ez8OHZnNUDBtXKpVuu932clTM/rCb/XHt/cL5/SvT+6XvKcz3r+sbpPMfjCOvfIMAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAN0lEQVR42u3NoQ0AMAwDwe6/YYBncWlUyQFBBX+SickfADM/0k+AQCbJffHfqir3hZ/ADwEAowtQ1mmQzb8rQgAAAABJRU5ErkJggg=="/><element name="pauseButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABdUlEQVR42t2WzWrCQBSFq1FSaSjaFi1iF6UFtdBdF6WhC0Hoym3BlSAu+wbddSF9xfyTJ7k9gRMJuY2Oi2w88BG5zLlHZiYzOTttiUijyP768Y2bxCKVv0nD+B/T2AY2OAcdPnOKNZtjrdx/KMCi6QJ0wTW44fOKFGtdjrXzEJPml2AA7sEEPIExeCRj1iYcM6CnOoTz2AYOuAVT8Arm4APMwDuZsTbnmCk9Dns0qxbVBj3wAFzR+iRlufT02IOLrqenA/rgGSxE64uUtaCnzx7WfwEtLtYQvIClaH2Tspb0DNmjtS9gxHldidYPKWtFz+hQgAPuwBtYi9aWlLXOPPQ6JgEu2IjWLylrQ89xAVEUSRzHkiSJpGm6C8jqBVSA8RR5nie+70sQBHmjbUZWL6CmyHiRVQAXWQfoRTbapiqA21QH6G1q9KJl5jwkDMPdi6YCzF40fVSoAB4VKqDiqKj1sKv9uK71wqn9yqzt0q/vs+Wk9QeSkdKwXIKzCgAAAABJRU5ErkJggg=="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAfUlEQVR42u2MwQnAIAxFu4EjOIIjOFJH6EiCF8fw7BQZwf5AegkU2tje8uGR5Afe5vH8mTHGZG5+EXSzSPoMCEyzCPd+9SYRZgCFb7MIJNB5XxURT7OotTYFkql5Jqq1TiGBzrvinUj2AMqSSHXHikj3GZBVpH8R9M3j+Tgn8lcGnlSSd08AAAAASUVORK5CYII="/><element name="prevButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABhUlEQVR42uXUz0oCURTH8VKz/BNFmZJ/iMAoEmohlRRI7Yp2Qa0igyJc9Qot2vUGbnwB3yJXPYKaCi5m62LQzSymr3KE09hAi1nVgQ93hnv4wZ259878o7Jte/YXfADPcAvwIeDgFwHMKYFJoDPILw0hREQYCyKMKBZlDCEIvzMkiAhWEEdCxlURRwoZJBGTwOA4SC0nLJMb2MGujFlsIYc8DrCPrIRHZtR3mccSMtI0qTMUcYoLXKGMTxxiE8t6WSHEsI2iCirhDg94RgVDmTtHDmvjILWsBPZwqYJe8Io3vEPXDfJY10ERJGXiWjVXUYMBZ5VQQMoZlMIRblVzHSZ+qkccI62DokijgHvVbMGtnnCCjGtQu922R7rdriXPU3SQ69IajYY9MhgM6p1Ox5R3zbE0l4+tmquWZdV6vZ7hDNIf2/X3T5r17zcM40MH6d/vuiGleWpD9vv9SrPZHDLn2JAuR0QFTR0R0zTLrVbr2xHx7NB6do14drF5dtV6c/n/7foCpva8IJ04vWUAAAAASUVORK5CYII="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAdklEQVR42u3OwQnAIAyF4WzgCB3BERypI3QkwYtjeHaKjGBfIeClFmvaWx58KAg/ks329WqtBbbBW7vMhhowBH2o2/WhLoJTh0QBrw4JfhXKObcBlnMulFJqNwp4uS+HIjjCNKGDZKshhkCYJlRge/ot2Ww/7gSJGQaejWvrvwAAAABJRU5ErkJggg=="/><element name="nextButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABjElEQVR42uXUPUvDQBwGcNvUatOK4kuKfUEERVGwg/iCguimuAk6iQqKOPkVHLr5DVz8An4LO/kR2jQtZMjaIbRLhvOpPOHOJMahnfQPP5IcyXO5S+5G/ngJIRKUpMRvwiEyIAWjPl5rlApIhgJ5YxoykIMJHnUYJx2ylGFHWjAozQdnoQBlKIIBM2RAnsdpBqa/hbHRgCWowBZswjoss30V1nhcYKe6P0w/aAoWYRua8ABncAKHcABHQlaFbz0JY/589YPm2Psxb+zBCzzCLVzBtWAxeIVvlQHND5rnUC5ArXd4hio8Ke2nsAF5OTwEcWJ32WuwHHiDV6XtnB0XIKsGlWAP7iCqXKgp15ewA8VgUBn24R5+Kk85v+EISpCLDLIsS0Rpt9sez+OC5NDq9boIarVabrfbrfE6bmhysoMhtm07nud9TTbb4iZbfn41xHGcD/Xzsz3u88sfsn9jo9HodTqd0A/JoLgfUi4R0zSbrutGLhEGxS2RwRftMLeRwTe2oW21g2/+/6c+AdO5vCABA1zBAAAAAElFTkSuQmCC"/><element name="elapsedBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="timeSliderCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALElEQVQY02NkQAOMg1aAmZn5P4oALy8vqoCYmBiqgIKCAqqAmpoaxQJDJsQA+54Krz/ExkoAAAAASUVORK5CYII="/><element name="timeSliderRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAWklEQVR42tWLsQlAIQwFBcVKGyEGK61cJ/tXGeVptPjwN/DgQnIQ9xYxRgkhqPceLqUkW5g5Z7g91BYiQq31BDAzxhjmDb13zDnN+/IP0lr7glFKkX3oCc+wAHpnIpi5hlqoAAAAAElFTkSuQmCC"/><element name="timeSliderRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAVklEQVR42tXJMQ4AIQhEURKMFZZCrLDyOty/4ijsYuJWewEn+c0buGeIGKUUr7XahtZaENHJgJmj9x7vkTnMOSMTkY2w1opMVX/BPxhjJNgBFxGDq/YAy/oipxG/oRoAAAAASUVORK5CYII="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAE0lEQVQYV2NgGErgPxoeKIGhAQB1/x/hLROY4wAAAABJRU5ErkJggg=="/><element name="timeSliderBufferCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQYlWNgGGrAH4jvA/F/GOc/EobLwAX+ExTA0IJhKIa1QwMAAIX5GqOIS3lSAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQY02NgGErgPxDfB2J/ZAEY9kcXuI8u8J+gwH2chqJYOzQAALXhGqOFxXzUAAAAAElFTkSuQmCC"/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALUlEQVQYV2NgGCqA8T8QIAuwoPEZWD58+IAq8Pr1a1IF3r59iyrw9+9fhqEJABv9F+gP7YohAAAAAElFTkSuQmCC"/><element name="timeSliderProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAASklEQVR42tXDQQ0AIAwDwDqcPhLQgAlM8JqDORilnyVY4JLDX0iaOgWZaeccVkSEKyv23nxjrcU35pyurBhjWO+dFZDWmqkr8Y0Lr65i67XRzKcAAAAASUVORK5CYII="/><element name="timeSliderProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAS0lEQVQY09XDQQ0AIRAEwXa4+iYBDZjABC8c4ADmHheStUAlBc/wb9oOAM45vvfewVrL6WSM4Zzeu3Naa04npRTftdZAkiVNScFTPhkFYuvY2zeUAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAcCAYAAABYvS47AAAAwElEQVR42tWTPQrCQBCF84OsYJCIYEQrsZAU6QKx9xheyG4L6zTZs3iInGZ9Tx4iAWHaDHwwvPlgyWY2mVvFGNNf/gmZyEUm0q+kwQI4sBROWf6R2ShcgRJsRanM0UnUrEEFTuBC1FeaOYoF2IMaXMGNqK81KyhuwDmEcB/H8RVV7JlxRofiDjTe+0eclLKGDsUDaPu+91NRWUuH4hF0wzA8p6Kyjo5ZNB9t/hjz9Zgv3PwLzUthXjPT4hqewrzqDfMnQ2tu8Pr1AAAAAElFTkSuQmCC"/><element name="durationBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="hdButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAMAAACu5JSlAAAAZlBMVEUAAACysrLZ2dkmJiYuLi4xMTE3Nzc8PDxAQEBJSUlRUVFSUlJaWlpdXV1jY2NpaWlsbGx0dHR3d3d4eHh9fX2KioqPj4+SkpKVlZWXl5ehoaGpqamsrKyysrK3t7fCwsLNzc3Z2dkN+/dcAAAAA3RSTlMAf3+Sa81KAAAAh0lEQVQoU+3J0RpCQBCA0dW/i02KpEIzzPu/ZJc+7CM4t8e5k3PuYgmX9VNttv2W2iww9gDhe/iK3mZYHhRVIBwe+l9PYQWjzbB/BYB6gdl096ra4WP0PD/kqh25qq4vIjfuIvBuuMrkaURk8yUvGUAiefSU0/5hkJZSPECcZP8J62epztzpDzcuFrDsGN7pAAAAAElFTkSuQmCC"/><element name="hdButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACFUlEQVR42u2WsWoCQRCGE42I5AikkSBaGSwsAiIpQi4BK0vF+qwEjb1gaWMlaGfvA5xYWvgCNraChY0+gU+wmR3+DcPGC0lQrnHg43bvbv5/d25v764uYYdS6voc/MY0AqLEzYmICt3roJlGiRgRJxLELXD+g8hPQDPGHnIAwjiOpHsiSaSINMj8CeRBIwlNBx7RY8Z3xAORJZ6IZ+KFeCXcP/KK3GdoZbU2POLGPIJyOLiYJ96ICuERDaJJtIiPX9JCTgMaFWjm4eHIBRZHWR6Jd8JXpw8f2o/aS5Y8QSRRnqo6X1ThkTTmN1iRKTwfz87o9/sql8updrutTBSLRT63WCzUZDLhtoCvT6dTW8qDR8o2T2OBNL5leJ4WZBMd+/3+y+RwOKhut8vtUqnE92JgfLSiAY+0NHeIDFZo085gI5gvl0s+GjMKPpoq2IOzogmPzDFzl1eriPV6zSI2eAw8c/TZ1M6RAW33R/PtdqsMo9GIRQqFgqrVagy1+dxwOFSz2YzbrutaOeIckOaBZd9sNgro2bFQp9Mx575m5fu+6vV63K7X63xttVqZwfE1qSXLHrjgZEK5XGah8XjM/fl8bsx1nyuBWcqq6DweiNSSCy7wVZMJMNKm3B8MBkac+zCT8CBgLLFetYBNBjefHLnJBG6vu93OP7Wx1pTba6gfllA/qaH+TIT6GxXaD2Q4v86XoPgE1h55oNE1QD4AAAAASUVORK5CYII="/><element name="ccButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAMAAACqEUSYAAAAXVBMVEUAAACysrLZ2dkmJiYuLi4xMTFAQEBHR0dJSUlKSkpRUVFSUlJaWlpdXV1jY2N0dHR9fX1/f3+Pj4+SkpKVlZWXl5ehoaGpqamsrKytra2ysrK3t7fCwsLNzc3Z2dky1qB2AAAAA3RSTlMAf3+Sa81KAAAAe0lEQVR42uXNQRKCMBAAQWCCIgGCGEU3sv9/JpXykCLxB8y1D1OdsEaLmqT6p6M6wKn6FuyWaUQL9zdcW2yuLV49dmTUL2S6gcYsr+IbwgdC7MYj/EoqIoZFHF1PL08QkYNO0MG8wMUw5LoOwCQyG+jWTMuS1iXW1SnbAaDLE32SOX+lAAAAAElFTkSuQmCC"/><element name="ccButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAB8UlEQVR42uWWsWoCQRCGEzUcEhFsQpCzUiwsBBGLoElrp0HbsxI09j6ClaXgW5xYWvgCNhaWFjb6BD7BZmb5HWSXXAw5rnHg43bd3f/fG+f27uE+Qyn1GCa3mMVAnEj8k7jowdwyxKQnwiGSxDNI/Qmsg4YDzbh15/jRwaIM8UJkCRfkbsQFWWhkoOmwh2nqEGnilcgTZaJGvBF1onEjdaypQSMPzbRlzLvBYIl4J9qER/SJATEkvn5hiLl9rG1DqwTtFFId06ZIQ4H4IHwVXvjQLMDDkcJC/svEpwo5oFmGR1JSjD++ptNixGQyUcViUeD+JRaLhapWqzLmeZ46n8+mhAftLKo6cTF1UQB921AEpT2bzdRms5F+q9Vic5lnRB/armmaI+ooBAkI6TvCnYnwaDTitr5ynE4n2YQRA9aGR8o0baAKOXSaRMQOufP1eq2CApqNQNPD4aCY3W4nptS36Ha7emy5XHL/R4JNkd79fq8uVCoVLez7vu5Pp1Pd73Q6qtfrcZuvemy1WskmrzQC0yuFdL1gPB5rERhJez6f80ak32w29QbxHxumdiFZj8z1gu12KwUD9EYwzuYwk43xGsPUfmSswwGTwyLwcJBj8Hg8+mEZklbgMRj9gR/9qy36l3j0nyuRfphF+wl69/ENcVv6gzz3ulwAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAA30lEQVR42u2UzQmEMBCFtwNLsARLSAkpwVJSwpZgCQEv6skS5iieLCElzL6FJwxCDlllT3nwkb8hXxLQV01Nzc/Z9739l8gBBRE0j94AiBk3oAceJCCPCM2GauY6zh3AsR/vit5AT8zzBbZCoWdNWypQS0YmQM2tekpDkWzbNs1xqRMQwGraMtk8z5rD1k3TJJgLYF2WZfi2oEw2jqPm4HoHhHMOJNCDAxTLnGHIyALXhRLPmnsfOU+dTpkRJooc+/F1N/bpzLjhITxFAp77i1w3440UxALRzQPU1NTk8gF0y3zyjAvd3AAAAABJRU5ErkJggg=="/><element name="muteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAC2UlEQVR42u3WPUwTYRzHcWmBFnqKBYpAHVSQoEB8QTQaiMSILhgDiiFxUBMSlUETnYiDg9GJmDA44OCgo8bF18EFibq5MEBpeUsDIaVAm6P02qTUb5N/k5P2oNg46ZN88tz1yT2//p9e77lt/1u6Fo/Hc9L5GwEmmJGrY4bpz0JlcoOAPFhRCAU2FMAi46YtBa4LyEM+LBKwHSUoh1OUYaeM5yUDtxpSAAVFKJZJd6MGh9GEY6jHXjigpAQaBskySQWlcMpE+3FQJj+DDtxBN9pxCjUogw25yEkJEWbkw4ZiqaBWJm9GK86jEz0YRKKNok9Cm1El11th/i1QF2TBDuxCtYS0oQv3MIObuI+nGMIwIljAQ1xGI5xQINWlBhXBiTqclgtv4xXCUsUTDOADotAwIsce9OIsqmFHPkzJsORvpKACDVLNNfThJ/TtBb7ADRfCEjQm4/3okHkcyaXU3xAW2FEtFW3U3uAbVDn3IQYvQhjGVTSiHIX6MDMK4EA9LsRisbgR2jt8wg/OtbW1NZU+Qu+nX6T/zth1nEBl8q5cH1aGQ+icmpqKG9GHeb1ebWlpSZ2bm4v4fL7A7OzsIn1GYQ7Uod3lcsWN0N6GQqGhyclJNXG+srLic7vdseXlZa/H4wkRnLKMRr9ZFVr8fv8jLh4MBAKv+fbudWEvCfs8Pz/vUVXVRbXaxMRENBgMjiXGV1dX094g6e7GcqmuFVfQiwcszfvx8fGwhPXjGYEf+SxKNRqhI4nj6elpw1vf6A9dgRo0yUWXcINv/piJvRzfRV80Gh1gBb6yAsMERahugc82/FOnC1RQonvYHkELzoXD4S76i+jGLYKeJ6qlolGCtvC4gv5Jr9tGKrEPB9CAoziJNnRqmtaz2YM40+3FCgV2OHT71x7UStXH0ZTJFpNpqEWqtUnFRShFxWabZ1bvHLpd2yrhijB4LcjyXSSLF56sw4WE/HPtFwoiecfnKRGcAAAAAElFTkSuQmCC"/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAk0lEQVR42u2NwQnDMAxFtUFH6AgdISN0hI6UEf4Oxgdvkas9RUZQ/yEBYdChgoZC9eCBLBs/SZLkjxlj3Ol2RehJd6rfDq1UT81eKcwZVCMB9Zw/p7CzfErvXT2ndzB3kAitNfUUQ60V555zLFZKUU/zBscOdo7EFiOcmFLMcQli4y+6Bz4LBx90E3JV8CZJkvwsb8qa9F25tXYIAAAAAElFTkSuQmCC"/><element name="unmuteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAACOUlEQVR42u3WS2sTURjG8ZqJuTSJTW1T26YqrWmN1jt2ISpWTb1ABS3iRkS84WUndlNQFN34Fdy5d+U36MJVQVroKgnmvgqBZBV3Gf8DTyQMzMggRZC+8CNnJsn75CRnzqRvu/6/Mk1zRw8fwBhbEeSDAT92ih+cU7D8dYiahxFFTPoR1HOG+Fxm7h6kRiE1H8Y49iKJEcQRRRghhQegmTuFKkQMBBDBbkwgjVOY0+Mh7McoEhjSa+OIIawehluYgSB2YQ9SOI0MbuEFfuCizs8ijYOYwRSSCo8g0J2hU9AAkmp0AbfxDJ/RhlV3sYgFZPR4GedwApMKDMNvD+v+RlGM4aga3McKvqO3XuKhxt/wFI+xClOBScTU12dfEEEMIqUZudU7vMKajjewrvGqZjiFOAL2MANhJHAENzqdjumE+ojXeMvxJkyxAh/hEqYxiKBT2AiOY6lQKJhOesNqtdpm93y1WvUUlsAsFrPZrOmEeo/lcrm8Zh1XKpUNxuvWuFgsun6N9t/sAM43Go0PzWbzU6vV+sInztvClvHEGpdKpd8LxArinPMCsa9GjGp287iD51ip1+tfc7ncTzV7gJu4igVc8bL07Rf0GGYwhwyWcI9Zvsnn80XG13EGx3AYafzxonYKjOoNE2pyEmcx3263r2nLmu7ZJ4e9b1ew7fQxhY5jUgEp7FPIAPq9bcTut5cQoohjSOKIIKjGhrjeYryEBhWMnnuZ9+buoaJgUcjW/xeRvu36F/ULlStUoyVtQSYAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2R0QnAIAxEu1lWc5/+ZYKs4TTWjwS0qIFrP+/BkYMLOdCLELKn1tpG5TleYF2yyMUzvCAOZDtwgU85PJGE/+NPyuTJG1Uts/9+sI0+y6GCrtunLHKJHbjAZYcd8x28IJTmhJAtD4gEt9ueDIktAAAAAElFTkSuQmCC"/><element name="fullscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACFUlEQVR42t2W324SURCHhS67VCoFbYhRkbQsaCwVSwgUaZP2yia9Mb6MN41vYfpIfYIm5QIegJfA3yTfSU52c1i98KabfGGYmd+cPX+Gw7On+2w2m5JPUfxfC5dhB8pQKooXvjGCiohFFRJ8EVTwVSHGtxOckSuOsCb2xUsDe0/swl42jiZxg2wr/kK0REf0DOzX4hXIzsVbaPODsH4VUSOxL8biwsD+SCEhOx/vo61Rq5zd1JipdhBkn6k4hmk2iKZDjdhtuj9Awnqm4twTPopf4lKM4BLfo0tCk1IjCQ3QFF0xR+QK/BBXYgxX+PycOdpmaAC3RG1xiui7uMWeic8ww3dLzgZNO7tEoU1OxYhpX7Dmd+KDgT0ldk5umt/k/DGtioZ4y/E7EUMx4JQcQR/fkJwemgY1OKbhAd6wnscU+ESRQ+jhOyGniyY4QFlE4rk4sCKIJyzFaLVa/XaNhT0iNiH30LTUiEJ9UGeqg8ViYRv3TVxjj80PY3zXloM9QFvf1gcN3mRiIr3pvX2u1+ufHMMvMDefn2MatI2iPjgSZyYylsvlg77fiK/umGLfWMzlmQbt3/UBQoc7530IxLf3QeT3AYIZbzbE9w5SfGfknGb6IAr1Qez9XL8XXabdxtc0sNvEuuS20MZFd0LsXThNqOOrQg0fcS6cXPHiKzOB2L8yg3GKG4WXfoBSUfz//W15ss8fvEcYMYnLr+AAAAAASUVORK5CYII="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2Q0QnAMAhEu5kD588JXMNpbIUEpCBpe5+9B4JczF3MQQjpcfeBz+4vxpMe2ULSIF9YjaqWM+hXWRrdA2YZah61Wv2/qGrU6nQkQK6yLmCeCbzFCmk02FxWX/WyYXw1H69mCSEtJ16St50Fqd0HAAAAAElFTkSuQmCC"/><element name="normalscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACDUlEQVR42u2Vy0ojURCGZ9Kmk4A63cYLMhdE28tCECUgxCuzGBDc6AgO7uYizKAP4NKNb6S+g08gSZO8QZ7h+Bd8ScDDIZmsLfhIpc7/V53uPnS/e4uRwjn3vsto2sHiggdrw2iGaT4miiKGEhShBDEU8YSH9Jr3G4yLSZGID+Q9qCXk0rIBhoSaj4kyxlnxUXyBz+ITKKcuDdoEb+9KQrufEHPiXqyLLVETmwDUpEE7h7cYGhBxmQk72xAWR+KY/Bs4akfkG3gSekTebaJYFlWxKLbFDQ2e+P0BvRqabTxVekT+M+gPmBKZ2BWn4tn146czCNa+o83wlkNXUGAxRVx3fvyC11HHk9KjQFtvQIxoSeyIE/Fb/BWX5EK5auQnaJfwxsMMyMSeOKPZVX8IzVUjP0Ob+QP8Y1rhPq6Kg2az6Yw8z12j0XCKf4blVuuum9Y8eCvBY8ritFgTXzudzl273c4VzlBcG93/tmYa05oHb2XQMZ0RK2JfnFujVquVs9M/huVWY+g52hXzDjqmJe7jgqhZI+3wVvkFA04N8gtbI6/hSekRhV4VMS+vee3uAeOeOOSs1w3yQ9Zq0j6aB2/sPwP/ZTeFYUEsc/mZWISM2jKaeTzeyy50FWV2k/LgquQJpNSmySfxeLsPfnAQlzCC1dgAoInxDP9Vg8gAauG1//82I/ZM1DztW4wSL9xQTRdfTNL0AAAAAElFTkSuQmCC"/></elements></component><component name="display"><settings><setting name="bufferinterval" value="100"/><setting name="bufferrotation" value="45"/><setting name="fontcolor" value="cccccc"/><setting name="overcolor" value="ffffff"/><setting name="fontsize" value="15"/><setting name="fontweight" value="normal"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA8CAIAAAAok0etAAAAJUlEQVR42mNKTU1lunnzJtP///+ZGBgYwDQ6xiVOrhw1zSNRPQBu5Zagca3K1AAAAABJRU5ErkJggg=="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAnElEQVR42u2WvQ2DMBCFv8I1M3gjMoTpMwqjkI1S0RnJEhaiuZcFEuyCBCnyqz+9+9XpHMAwDD0wAp4PciGEXtK0risxRvZ9fw+a2ZhzZp5njuTMzC/LQklOEtu21YGSyqCZ1YHfcazR1Tle6FjVnr+q+vz2XJxjW4p2Utr2tFn/OvT5s5b0BHwJdmZ2Bybg0NmllB5d190kHb5cL8J5WhbWZJeBAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAmklEQVR42mNKTU39jwffB2J/BiBgunnzJgM2/PjxY4bPnz8r/P//f0NKSoo/E5DBgA1//fqV4enTpyDFDP/+/ZvAxEAAvHnzBqRQAaeJMPzz508wTVAhDBOlEGg1LUxkIAIMtBsH0ERigmf4+XpggodGbhxNFKNFymiRMhrXA1Gk0D+uoQH+gIkIRSCrC5gIeOIBkA74+PHjRgDhswBcaL43lQAAAABJRU5ErkJggg=="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAFy0lEQVR42oWXy2sk1xWHv1vvR1erNeqWZ2TFiSQ/ZI2GMBDygsRhTIwZgg3ZeeFV9lnlT8giS/8BhqxCICYJ2TgPhzEhYLJQFgMT2SN79JhoMq1Hq7tVXV3ve7PoktQjd8sHCpq6zVfn8TvnVAkumRLnPzV0LFw8XCwgI2ZITEaJFIqJZlxCneEEAg0bn0Y8176eB2CG19tuhx4DUpRiMtIYw40gooJqGHjMHi5urzt39JZgeHRwb/nBPJRIFOWVHqoRzEDHQKvOTGpxc/uW+zNnzUcQoy9vvx/EbkxKgWS6h0og0DGxcbAxERRIdIKDBfeOszZPgCDmcE2+3n68dMyADJSYFLRx7p2JS0B9a34YCGEMb3aQ+HJGb/kEGIBPQLyUB1joiLXGYx1FwmBSyAIDm2DY2ljVX9WXoXzy8db6f1tSM8V5UkGghwB/t36x0iYfBR2xj3wWKNDQcahvrNo/Mr7joZPcSlYffPT9XTsbnCTE+EDKkPy4FvaK9xaGWZ5XBJ9FHl8A9Sp/NrWtr8Xftl5v0STAFqqhiqx94/TpQC1krZKYHtFm+PsXtz7IP9E7RaLiswxaJGSXQ9Yxh4G+7FHHAmoqE/ELHe+lg6WHX/y6fC1tqqDYHt5bfuAe/9PtFZHMxgviXGTyQthCCNDPNaODoQqi2d6tk6c7eYByw5faboferugY+ZQ+OcshSHIjKp8k6wk+UBAruW+dEjJ01NIhJuqs9XpG1sjUMx4mX+4URXHz6ONPk1c6Sym6ign7w/vrbQYMKBAIFJKcgvzW8aafaWO4bFw6QmlomKOubV/fXHVv21/HlPvx/dbm6i5dIopKFhKFRKJEnefQK0LJHuk40MDAxsGjhp/4O3PdQEo3Wmk3OvQZkFBWQDW6hAJMrmEDIf1xFYJQNjZ+P9iaLwLLDNQLoZORkVSjKqn8U6M/f6kGGgEmkBOOwEIF+FvNf78ys2bXhC6j5PPbO8+fEBGTkI+GwLTZh80i1nkm90nBwOoFGy83f+Dd8IUgFdq1f+Vv9IOclOIrcNoYDiwW2UFqmJtzM2vejRYt1VJNVXvOe3mzXlVVwlQcBGO4ETIAAyNxzZqHjwF4KmEwN3TQERe5m2LmpDuVnsYnColSqCtRV5hG4cT5ICFBVc2QDdyEEoX4Cmg+6Y5Gvtbpb0ZPO5zQEx0RtvsPb3arAa9dCQwvZkxV5xAMskb4ra0N8rUoEE5+cvrZd3fqKQqdEjV9uwGS/UuykWfC9nrBw1bma1pQrHT9mISEjIyC/ErhTBS2gY6NjYODGZob9T23KN3oe4fLAxIyCqSQSlwS0BWtpyEwMbBxP2v87RszC1Zd09J+/+nSzk/axOQUVXEu2m9m+nAwUECBRgl/Xphfqc066Cp1rcauejRYGe1fdY5UijXz0wsc6CzyaAwolBKAQnxU9+e9RkP5CDKEk9345GBlQHHmW9U7cu+aZTwzXi1qz66A0aF27DmBjYsGWHg49Y6HgfmF8buga0KQvd37Zk5pOsXl0kzcKUqq8ccKkKVC/MP7zYI7YxlwlP+qe3fv3YGrlQKyK9++FAo5F+10k/mYUcgxcf/58Ej/4+J803UsBTm+/SG3P38x+o93CTe2U7Tz7BRvdvP/hftdTuhyQq93sP/Dk3u+2/CdgDoz1Jlxm7N/mPllKEpLjOGi8Z1igFBKIClI39n+LcOoNiuITsODH+/OJU9cXbexlQ7Y5NTs0HpN3Xn81wXLrLyM2J8UsqQkaw1+/vAvhx0floZv9MhRqSykHJtEUgJ8kPKoUc8MYMhwQg6FUlACkuLNFA1GAkFoSZJnKsMGCjLivJmNVNHvTevFqmFQlBRkJAwZkpCSk7/VOzg5jUMGRIT04qPuT/uV1KfYuWyEUiO/RrNWAQLxanp370Oas56paVF61L27t55Ne3c9l9u4KXHpVEe/b/6pEVoXwqa8av4Iplr1VaChoVVejzKrrlpd/wdqZ96EzbsuCAAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACL0lEQVR42u2T64nCUBCF7SAlpIQtISVYQkrYElKCJaSElHBL8LfPKD7wyUXxgYrOzkCyHC6b3LgasywOfBDuOTNzcklq73rXfygiqjMxk1YsZ38lXIOyq1F1OI/s5VUZsAlBNOMlaDhvVhXOZ7B80D4ztNeV+VNY9VdUzg3VM/5srM9XhXOMb0zleJXxjTqlB7xer8HtdiPAy/KKhl7pLTXc5XJxGc1QggJNIXgOfs24pQU8nU4hQynn89kFjZD0XDyGFpYS7nA4uMfjkYAQddQEQwtRk1lPD7jb7SKGUvb7vWvoTdCbqIkXNCF6arjNZuNtt1sCAtPDZwp09YMe4AyZ+bSAWmvFUILm4Y7Fo0xderQUep5Rq9XKW6/XBAQ/+fi8AZ5GhicwZj1+i4vFIl4ul5QQZ/lYC8AX5Pi+58nsh8LNZjOfoZT5fO7neAPwZgaUGeIB/F+Fm0wmznQ6jRlKyH1b1uvgred5zbmy6+6Ao9EoGI/HBHh5ftF/6SXZdVe44XDoMJqhBFWgxwO/V8CvwK+Z4rfY7/eDOI4JsC4cDAYO4yVYl8lM3CE7C4XrdrsuQym9Xi+qlVQyW3YArrWp3W6HDKV0Oh1usler1fLTHnku0iOzxQ+EtiUfDAHYYOsl5I6+0Oj9yDNHYNSM84KADqOhNyq65K5fX/wP9tpfznrV9kWu7dbtn1bxgCHj1sorfKmwaEDFUMUo21XrCsNpyVD4yl8GflLvetcfqy+dCCa6ODMoXAAAAABJRU5ErkJggg=="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAArElEQVR42u3YywnAIBBFUTtJaSnFUqzLhVjKZDZmI8HfGx3CPLj7AyKIjoic5pwBDWhAA+oBei5wlxMYClgGh6KBcKgUEAaVBi5DdwGnobuBw9BTwG7oaWATqgX4CdUGrKBagWX3MjCl5DmSKOe8Dowxeo7ABQ5zxGDgC4NdEhCwgmkBfsJOA5uwU8Bu2G7gMGwXcBomDVyGSQFhMDQQDkO+ZuxnwYAGNOAfgQ8LTbXBn1RvGQAAAABJRU5ErkJggg=="/><element name="playIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACJElEQVR42u2YS0sCURTHNc3sTWEPelMQUQQtKnptIojosWgdFLTIFu2qdZ8i6Cv0BVq3KUi3IqgI4hN0rS5v/xtnahh1Gqd7Z0bowA/EWcyPM/ece+9xMcZcTsbVcoJ6gedul4VhSJBLEW0a3LKFdQVVYh7gBT7QQfjoP48ia5egh4S6QT8YJPjvHuAH7bJEGwpq5PrACJgB88QsGAcBet4pQ1RPsI1eyLM0ChbABtgD+2AXrINFMAWGZIg2ajNKQfDsDYA5sA2ewRt4ANfgDByCLbAEpkWL6gl66CXDYBmcgBf2E1HwCG7BBTiWIaon6KXCGANrlK1XVhtx8ATuZYgaEZwAm+ASvLPGkZAh+psgL5BJWn9X4IP9HkJFjQrugCAIMeMhRLQZQV61YdZ86Ikq7amXGr5XK2mFYCPRI1rbi/QOvjt1UTa/Ja0U1IregXNwAFZpZwpoJe0QVLcn3kdvwCntUrOUST+tSVsFlYjQzsQ3ghXquz2URUcIKvFEa3Kaqlv5zMYFi8ViOJlMMhmUSqW/CxYKhXAsFmMiSafTkXK5LOYTixTMZDLxSqUitkhECEIsUa1W5bSZvwiqxOQ1ajOCdcSkbXVBCIYEiQk/LHwdt/L5/IdVYqYOrBB8t0rM1JE/l8u91msXMsRMXZqy2eyLqsFGqY/ZdmmquXZC6jmVSr1R57fv2un4i3tLjD4cPzxqifGb4weYjh0B/0/5m+QT3Dh1BNFdpj4AAAAASUVORK5CYII="/><element name="replayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABxUlEQVR42u2XwY3CMBBF0wElpARKcAkpISWkhJRACS5hS3AJnOHAwoEDB2QOHJCQmP2DcrBGycZ2BtiVMtKTEGLe/NixJYq55prrxUVEBjSgBStgu88NMJ8KVXZBPI2XBxaU7wi2AJbyy7LjVeGWwNP08uzSDlcDPzLUCcZ+X79j5RyofumtgNNeSfnO+QG5SfCYIc+kd3LgQKxzpNzT9cqy2VfJ4BPr70iptXpG42JXWcXH4+EBBbhCqdgl3D5JcL/fDSBBpRWQXT3++N253W4NoABfKBc7xYwmuvl6vbaAApx2QHaKGW108+VysYAC1AOyU8yID3g+n1eAAtQDslPMiA94Op1aQAHqAdkpZsQHPB6PDaAA9UPCTjEj/pAcDgcDSJB1zez3e9Pjr3r8Jkm82+08oADe5lSH6Xqt+N4Jd/oObbdbCyhks9mYREcd9D9DskN6gU0OCFEJSODBIsGxEv22c5Ag7/9KJyTBV0K/AzSCLXKLV6vnieuEftkr+RY7khVyGQyqJ74iEp0/TxBVTGKPedX2aj1UC+jPhuTDBEgvpH7AdUJA/4GAw2GAAy2oNQ7KlEt+DWwXxoBFMddc/6x+ACbEv+zn5grUAAAAAElFTkSuQmCC"/><element name="replayIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAGZklEQVR42rWYTWxUVRiGoTPM0LG20IEypUCKTX9IhCK0iqAVGtQAIUasAyaAWkaJJlZMhigs8CcaEhdSdSNx0bhRFrqQjS66BTFGFiSFgC2/bWkhQIFSZ4pwfW/ynOTkwO3l9yZPAnfO+b53vvOd95zpuLt9PM8bb1EgIhB1iECBPWfcw3psUQiYIOKiUCTEIw4JPoszNmqLfRjCIkYUyYtFqSgT5aJCzIAK3pUxppg5RmzkgQh1KjZRFJEwJSpFrZgnGsQisRgW8W4eYyqZU0qMiXZF70dcRMRYslKqUyMWiCaxUrSI9aJVZKCVdy2MaWJODTFKiRkz1bxXcXGWJyWqRaN4QaTF2yIrOkSn2C8Oii7+3clnWcammdtIrBSx4wEiQ8VNFCV847limVgn2kQ7QvIi7Mkztp2564g1l9gl5ELkHVaOiTPFfLGCpdspjoh7fY4QI0PM+eQosSsZtiFilH4GAVaJd0UH1bivhxgdxFxFjhnkjAVuHARGad4US7CCQL+JfEjSs6IfzoaOV0xiryBXitxRBAb2XZLd1iwyIZUbEHvFJ2KreB+28m6vGAipZIZcNeR2+hGBGGgR5W6kmXcGiBsVv4odYrNIYyfLYaVI89kOxo4GiNxJrkZyF6FlvNt7cfypFjtoC9gQQ2K3yBK4GY+rE1VQx7tmxmSZMxSwcdrIWYuGuOlFu/cSopzAa7EF9xkl0QdiDSdGNfOSogSSvKtmzBrm7A6oZDs5FzAvYXrRXt5ijqQmjLXLjcJSZUnYKGYjpohvHYM475KMaWROlhju00XOJjRIC8vsLG8d/ZO9efNmTngWA/TTOqoymzmFBONqJbhY8FkpYxcxd4cfy4mdQ/xKUWcv8ziCFXLzqBctN27c6Lh+/bpno3d7afpmli7JPPfQdy8ZhYytZu5mP9Zt4nf4udFQxryIEWj6r0Fs0ITOXC7nWeSxjbTpE2u3FYQYv3GH6cxN+7H8mHYOP6efGw30oQRa5lzBMrRqwv7h4WHPMDIychZvM0uQDDma3Crir7SQYvkx7Rx+Tj83GiqMaRuBxv8Wi4wmdA0NDXmGK1eu9GHAy7GRSeZYCrt5O71YLZ4XW/yYdo5r164dwLQXGz8MFKjJBy9cuOCBHyBYYHDV4ggrwnqmWR67RTH77RxXr14NFugu8eXLl/cPDg564Adwltgx09tsDERNFeUkrKIHXxIf+jHtHMoZtMS3bhJ9u86+vj7P0N/fbzbJq+IJxtoHu3ueT0JUragn7tNU7w3xhR/TzqGcQZvkVptRuTtOnTrl2egb+jbzlnhOPIYIU0X7qvYoFZgnll68eHE79vGa2CS2q4V+d+MrZ4DNBBj1iRMncsePH/cMZ86c8Zd5m3iZICmRsHzQvQ0tu3Tp0uea61fob/3/Yy4G3/X29p63YytXoFEHHnUS1HXs2DHPRsuwhz551jqSYoiLIjhFG7xy7ty5PWauRPXo3c+q1J9uXOU6zCHgHnXBlwX51K6jR496NgqWy+fzH+nzF+2bhznaWN5ZYololai/7Pmq5HnF+M+Nq1zfcAwudC8LY1233jt9+vRhN5iW4xBLMcdcMAkWoy+rsKM2je1jXiCq3j84xConJg4RfGFNj46OfuZXzQ44MDDwAwJqxGQRt08LkqwW2zQ3P5a47u7uER1x32vsO2Ipl4oSx2Mdi8Dx2a0btOPalehfBfT96kes5imW0vRg1HGCtJbt27Dq6fTYp7G7RCsGPZM24UYd8KMJ15+DyBY1+9c+3OmeoXpTERW1e5jqb/Q3VJjAXj0a+5UlcFaYQNvLUghp8EXBQqo7zbrNROzjEkPeJCM+gJAxUZ934a/uDi4Y8+8xJJyC6VZChblBW/ZSYAmcyQ7OnDx5shsRoWjsPusAcHowWOQE+7CHIucGTdWxGAlkqd7s6ekZRMCdMMwXqwwT6C63ERoDhHG8gVXBCvOTNUiMv7NlP/16/lBf/6Ij9FNsq15Mt3923tWfel1RDHONfpp4XDt/IzbSpx47JDH7tGl+km196Z/FXN0yYi2eu5DqTXZ+uN/341rUZBIt4GLawg3ldbEei1qNjy5BWB2tUWqf7Q9WIH2IRSWxizmcyU9Cg6jnfRVjyhlfbHrbFfcwRCZo9ClY1XQoF2UImsSmSlD52IOtXPiPpBiJEwF/9TcbLupuOjfu/32eYAv3OqcpAAAAAElFTkSuQmCC"/></elements></component><component name="dock"><settings><setting name="iconalpha" value="0.75"/><setting name="iconalphaactive" value="0.5"/><setting name="iconalphaover" value="1"/><setting name="margin" value="8"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABD0lEQVR42u2XQQ6CMBREm97BeCnjIQjcxLt4KVckrKuphYIC/jEtKRu3fxaSDGlh0ZeZ/2mxRq66rs+iW9M0bw1hbTCAxVZVdVqW5eq9P7Rte9cQ1gYDWOw8zxd5ELque4QQeg1hbTCAxQrZ0Tn3XNd11BQYwAKgkUmI7DsQyklTYAALn0Nyi4lyVBZciltkDNpFpu3QrqizZcoiLeqi7dUj2xxKFa6q/C3idIiyywgiI3ZIBi9th8BQdhmFdl3GuJepn4fy8eMf2c/IEtBEENnEu9uz1BBvlzFGRvHXwRmZUMU0icpCUUfL4E7pEhwayvOIllLbD3DIY2KMUSvsvDZYrHPuLYM+v9BQgunB8gFJekgEq5c0PwAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR42mP4//8/AzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><settings><setting name="activecolor" value="bfbfbf"/><setting name="backgroundcolor" value="262626"/><setting name="fontcolor" value="999999"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="overcolor" value="cccccc"/><setting name="titlecolor" value="cccccc"/><setting name="titleactivecolor" value="ffffff"/><setting name="titleovercolor" value="ffffff"/><setting name="titlesize" value="13"/><setting name="titleweight" value="normal"/></settings><elements><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAACCAIAAABANcwGAAAAKElEQVR42mNhGPqAmZmZiYkJQsIZuLgsvr6+Q9q3/2Dg79+/yAxcXADiODDtLQ68BAAAAABJRU5ErkJggg=="/><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAMElEQVR42u3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXA2RQAAEB5C4HAAAAAElFTkSuQmCC"/><element name="itemActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAkklEQVR42u3QsQkAIAxFQQsHy/4LqYWohYW9IAj34ENIeTkiRvq7vlb3ynHXB/+Wk64CCBAgQIACCBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQAEECBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQJ1NmcoiAdM9H4IAAAAASUVORK5CYII="/><element name="itemImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAAAAACpLjUBAAAAeklEQVR42mPiJQswMXCSARiYGFjIAEBtZAEmRnJ0MZJrG321jfpt1G+DzW8jMUj2lzMwlO8n2W87PMrLPXaQ7LfOHR4eOzpJ99vLe/deku63eItDhyziSfab5fGFC49bkuy3jIUMDAszRtPkaDYd9duo34aT3/6TARgA1wJNszqw3XsAAAAASUVORK5CYII="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAEElEQVR42mNiIA78J4AJAgCXsgf7Men2/QAAAABJRU5ErkJggg=="/><element name="sliderRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAJklEQVR42mNgIA78J4CpBu7jseQ+NS3yx2ORPwOVgT+az+6TYgkAKMIaoyp3CGoAAAAASUVORK5CYII="/><element name="sliderRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAALElEQVR42mNgIB74A/F9IP4PxfehYlQF/kgWoGOqWnYfj0X3qWnRfwKYIAAAPu0ao3yGmCgAAAAASUVORK5CYII="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAMElEQVR42mP+//8/Q0NDA16sqqr6Pycnp6G0tLShqqqqoba2tgEEGhsbG6CgkZAZAEhcK/uBtK2eAAAAAElFTkSuQmCC"/><element name="sliderThumbCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUElEQVR42q3NoREAIQwEwHSYJjOo1IBIDfEx+EgEDMfLVwyCbWDphoig1gp3R2sNmYneO+acWGuBXimlxCEKekVV+RAxvWRm/EXxi2KMcZ1sxLJpnEUZrv0AAAAASUVORK5CYII="/><element name="sliderThumbCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUklEQVR42q3NoREAIQwFUTpMk0wUNSBSAz4mPhIBk8/JUwwiW8C+8pqI0BhDzQzujjmnrrWoZNZao947Pgg/CHtvREQexsx6gTQNqrXiAuHlcQDl9mmceNYnwwAAAABJRU5ErkJggg=="/></elements></component><component name="tooltip"><settings><setting name="fontcase" value="normal"/><setting name="fontcolor" value="cccccc"/><setting name="fontsize" value="12"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="cccccc"/><setting name="overcolor" value="ffffff"/></settings><elements><element name="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAASklEQVR42p3KQQ2AMAAEwXOAi/lWSqUgpZIqASmVAN+GNECYZH8bHDhfOoLyYSxJEuwP054Z+mLqucOGMU0DW1ZQp7HmCRpa/roABHU6b1RN/woAAAAASUVORK5CYII="/><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTopLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVR42mNgAAI1NTV/IL4PxP9hnP8wzACTQRb4j4wBSrYUAF5mO7QAAAAASUVORK5CYII="/><element name="capTopRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVR42mNQU1P7D8T3gdifAQSgAjDsjy5wH13gPwBoAhQA/dBvkQAAAABJRU5ErkJggg=="/><element name="capBottomLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHUlEQVR42mNQU1P7j4wZgMR9dAF/FAEQgAqCVQIAxzkUAKo9yiMAAAAASUVORK5CYII="/><element name="capBottomRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHElEQVR42mNQU1P7j4wZ0ATuowv4wwTugzlAAADkhRQAhODqdgAAAABJRU5ErkJggg=="/><element name="menuTopHD" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAYCAYAAABtGnqsAAABKUlEQVR42u2WYQ2DMBSEcYCESuAHAioBCZOAhOFgEiahEpCAhEpAQtcu1+TSwSDbfrDtvuQFWtpHe7lXqCohhBAPDMPQxBhjhBhzjDM9O3MbfWmspfYVc82zeegPlCMUkfpc8f4aa2qOKl5eYI+2iTHlTewU0Mc4bQnPAq6No/UYtN1SniMJmDbuFhzp9wgYr11yIO6ndwWknPd3cM6jCrhValsCJod0VMrduwJS3nDY0qWF9tlB1Gf2OBDlVp5j7kMCpvzjN3xATD6kIYjjcwclPi6dUXhWiu/x7D8EJJFmOMvDSX3hOI/rTOJOuWRp7CWLQnPGLMZPCkjOsuTEtLG6+LDY4lfFruRp4ELLsTQH48xaHv1kCiGEECLStm1QvB5ykBBCiJe5AX69621Fd8YvAAAAAElFTkSuQmCC"/><element name="menuTopCC" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAABjklEQVR42u1X3c2DMAzsBhmBEXhggIzACIzACGUDRmCEjsAIGSEjMAIfkS7oegr0oQ/9IvkkC2HH+fHZDjweBoPBYDAIpmlqD1kP2Q/ZDhnEPsA2kM5Dt5PfWNBnSfpnEpojvUfYwyE92ZJulPXWi/3ONQff5eDhvcG7pzGvFJwcAA2I+DUcRFnrJABkhTwe8yX/lgiIYl9pP0/af9CkqYmAlN0v0TV08HTASAdvSgRAF4S4OwJiDjbZEykLVwAFnQlYMJfT/dZIwFtbKNjHXOIga6aAxOyPoATxvSNgL6zFQd7xXLEu2xzmCpCTjBoJOLNOKqClrH7r9RcEjBqEDwRsmrVcjURAbm09V4O00EXPUBMBDfde7rGwRRm/aEbezH1HwMxBo17eqy9d1iu1r/6ujdZ4D2wo94inQ5BmGdvD/i0BDkTn9d6+Zgq+Qb6CNmpBm94ntX4NeamEttRbMc59OjS3iqvLEjpfaF/+qi3KPrz9SBgMBoPBYDD8a3Rdt5v8TiwDDQaDwWD4Ef4AO4h4lB2vwSEAAAAASUVORK5CYII="/><element name="menuOption" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAuElEQVR42u2SQQqGIBCF/wOU1UYUMjAiQdSTeI4O2DnmUL9PatVq3AUNPBhEPt6bmd9XL6u+77uiXHRAV9+1wvais4iEEFXor7e9xdkJiJSSjDG0LAsppWgYhgplOb2iVdi2bRRCqHLOkdb6dpo5wAPu4AyglFJVjJGstTSOI+EPF4iYD+C6rjRNExuIyJgZYgJU5b2neZ7vBWX2UrAAzAwx4QwwuLuX0no2mBlAcMY4G85hf/Wu+gNm+kvWRCvtuQAAAABJRU5ErkJggg=="/><element name="menuOptionOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="menuOptionActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="volumeCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAAPklEQVR42u3MoREAIAwDQDpI95+xVwG2AjziY3IR+ViPZOaeu7tXVc2O2y+AQCAQCAQCgUAgEAgEAoHAP8ADVGLAaqN7TdUAAAAASUVORK5CYII="/><element name="volumeRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAXklEQVR42pXOMQrAIAyFYUGSIeqQuLh4Ju8/eZRXIhQ6WMHhhxDIRwKAsKv3jm+tNagqcs4gIvzdhQM4d2BKCcw8r8FSyqi1Lsgzs/WdgzHGcQ2+qIhMhzyffXe6eQBmfbZnUQ+tqAAAAABJRU5ErkJggg=="/><element name="volumeRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAX0lEQVR42p2OsQrAIAxEhRAHoxB1cfGb/P/JTzkboVsttMODcOEe5wC4EymlEUKYMUYYdlv21jk+VHXUWtFa25RStlREQETjs7D3Pi9wY9Kc8xZ67+cfIZ6EtpKZceot+LS2cEn/XGYAAAAASUVORK5CYII="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAASUlEQVR42u3MQQ0AUQjE0CFYgARQjGvWwBewh/beZ3enV7t77q7MVFWpuzUzigiZmSTZ6zNAQEBAQEBAQEBAQEBAQEBAQMB/gB8nJqOYNsUfIAAAAABJRU5ErkJggg=="/><element name="volumeProgressCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVUlEQVR42pXMwQkAIQxE0XSYshQtImXYhh3kKFiD+L3s3iTgwBz/E0BuTylRSsHMaK3Re2fOyd6bb9dOAtAD0J/BnLMGoD6DgNRa1cz8B8cYvtbSqDn4F/TaDHcq1wAAAABJRU5ErkJggg=="/><element name="volumeProgressCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVElEQVR42mP5//8/Ay7Q09PjLyIiMkFCQkJBUlKSQVxc/IGoqGgBMzPzRlx6WHBJdHZ2+jMxMW1AFgMapAAVCwDijSQZCHT5BAbcYALJBgKBAjlyAHZIEpxZZYn/AAAAAElFTkSuQmCC"/><element name="volumeThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAnklEQVR42mP4//8/AxbMBMTsQMwHxMJALALFwlAxdqgaDL24DOMGYoVly5ZFVldXz6ysrFwOwiA2SAwkB1XDRMhARqjtigcPHsw/d+7c9Z9A8B8KQGyQGEgOpAaqlpGQgSAv2Vy7du38fxwAKmcDVYvXQCZoOHkjuwwdQOW8oWqZCBkICvyA/4RBAFQt/Q2kqpepHilUTzZUT9gUZz0ACDf945eBHBQAAAAASUVORK5CYII="/></elements></component></components></skin>';
        this.xml = a.utils.parseXML(this.text);
        return this
    }
})(jwplayer);
(function (g) {
    var n = jwplayer.utils,
        o = jwplayer.events,
        p = o.state,
        l = n.css,
        m = document,
        a = ".jwdisplay",
        i = ".jwpreview",
        k = ".jwerror",
        d = true,
        j = false,
        b = "absolute",
        c = "none",
        h = "100%",
        e = "hidden",
        f = "opacity .25s, background-image .25s, color .25s";
    g.display = function (t, O) {
        var s = t,
            G = t.skin,
            aa, ad, K, v, I, V, Y, q = j,
            ae = {}, T = j,
            Z = j,
            W = {}, r, L, R, M, ab = n.extend({
                showicons: d,
                bufferrotation: 45,
                bufferinterval: 100,
                fontcolor: "#ccc",
                overcolor: "#fff",
                fontsize: 15,
                fontweight: ""
            }, G.getComponentSettings("display"), O),
            Q = new o.eventdispatcher(),
            w;
        n.extend(this, Q);

        function X() {
            aa = m.createElement("div");
            aa.id = s.id + "_display";
            aa.className = "jwdisplay";
            ad = m.createElement("div");
            ad.className = "jwpreview jw" + s.jwGetStretching();
            aa.appendChild(ad);
            s.jwAddEventListener(o.JWPLAYER_PLAYER_STATE, z);
            s.jwAddEventListener(o.JWPLAYER_PLAYLIST_ITEM, y);
            s.jwAddEventListener(o.JWPLAYER_PLAYLIST_COMPLETE, S);
            s.jwAddEventListener(o.JWPLAYER_MEDIA_ERROR, x);
            s.jwAddEventListener(o.JWPLAYER_ERROR, x);
            aa.addEventListener("click", ac, j);
            U();
            z({
                newstate: p.IDLE
            })
        }

        function ac(af) {
            if (w) {
                w(af);
                return
            }
            switch (s.jwGetState()) {
            case p.PLAYING:
            case p.BUFFERING:
                s.jwPause();
                break;
            default:
                s.jwPlay();
                break
            }
            Q.sendEvent(o.JWPLAYER_DISPLAY_CLICK)
        }
        this.clickHandler = ac;

        function U() {
            var af = {
                font: ab.fontweight + " " + ab.fontsize + "px/" + (parseInt(ab.fontsize) + 3) + "px Arial,Helvetica,sans-serif",
                color: ab.fontcolor
            }, ag = {
                    color: ab.overcolor
                };
            L = new g.displayicon(aa.id + "_button", s, af, ag);
            aa.appendChild(L.element())
        }

        function B(af, ag) {
            if (!ab.showicons) {
                return
            }
            if (af || ag) {
                L.setRotation(af == "buffer" ? parseInt(ab.bufferrotation) : 0, parseInt(ab.bufferinterval));
                L.setIcon(af);
                L.setText(ag)
            } else {
                L.hide()
            }
        }

        function y() {
            C();
            K = s.jwGetPlaylist()[s.jwGetPlaylistIndex()];
            var af = K ? K.image : "";
            M = undefined;
            u(af)
        }

        function u(af) {
            if (v != af) {
                if (v) {
                    N(i, j)
                }
                v = af;
                J()
            } else {
                if (v) {
                    N(i, d)
                }
            }
            A(s.jwGetState())
        }

        function S() {
            Z = d;
            B("replay");
            var af = s.jwGetPlaylist()[0];
            u(af.image)
        }
        var H;

        function F() {
            return R ? R : (s ? s.jwGetState() : p.IDLE)
        }

        function z(af) {
            clearTimeout(H);
            H = setTimeout(function () {
                A(af.newstate)
            }, 100)
        }

        function A(ag) {
            ag = F();
            if (ag != M) {
                M = ag;
                if (L) {
                    L.setRotation(0)
                }
                switch (ag) {
                case p.IDLE:
                    if (!T && !Z) {
                        if (v && !q) {
                            N(i, d)
                        }
                        var af = true;
                        if (s._model && s._model.config.displaytitle === false) {
                            af = false
                        }
                        B("play", (K && af) ? K.title : "")
                    }
                    break;
                case p.BUFFERING:
                    C();
                    Z = j;
                    B("buffer");
                    break;
                case p.PLAYING:
                    B();
                    break;
                case p.PAUSED:
                    B("play");
                    break
                }
            }
        }
        this.forceState = function (af) {
            R = af;
            A(af);
            this.show()
        };
        this.releaseState = function (af) {
            R = null;
            A(af);
            this.show()
        };
        this.hidePreview = function (af) {
            q = af;
            N(i, !af)
        };
        this.element = function () {
            return aa
        };

        function P(af) {
            return "#" + aa.id + " " + af
        }

        function J() {
            if (v) {
                var af = new Image();
                af.addEventListener("load", E, j);
                af.src = v
            } else {
                l(P(i), {
                    "background-image": undefined
                });
                N(i, j);
                I = V = 0
            }
        }

        function E() {
            I = this.width;
            V = this.height;
            A(s.jwGetState());
            D();
            if (v) {
                l(P(i), {
                    "background-image": "url(" + v + ")"
                })
            }
        }

        function x(af) {
            T = d;
            B("error", af.message)
        }

        function C() {
            T = j;
            if (ae.error) {
                ae.error.setText()
            }
        }

        function D() {
            if (aa.clientWidth * aa.clientHeight > 0) {
                n.stretch(s.jwGetStretching(), ad, aa.clientWidth, aa.clientHeight, I, V)
            }
        }
        this.redraw = D;

        function N(af, ag) {
            if (!n.exists(W[af])) {
                W[af] = false
            }
            if (W[af] != ag) {
                W[af] = ag;
                l(P(af), {
                    opacity: ag ? 1 : 0,
                    visibility: ag ? "visible" : "hidden"
                })
            }
        }
        this.show = function () {
            if (L && F() != p.PLAYING) {
                L.show()
            }
        };
        this.hide = function () {
            if (L) {
                L.hide()
            }
        };
        this.setAlternateClickHandler = function (af) {
            w = af
        };
        this.revertAlternateClickHandler = function () {
            w = undefined
        };
        X()
    };
    l(a, {
        position: b,
        cursor: "pointer",
        width: h,
        height: h,
        overflow: e
    });
    l(a + " .jwpreview", {
        position: b,
        width: h,
        height: h,
        background: "no-repeat center",
        overflow: e,
        opacity: 0
    });
    l(a + ", " + a + " *", {
        "-webkit-transition": f,
        "-moz-transition": f,
        "-o-transition": f
    })
})(jwplayer.html5);
(function (d) {
    var i = jwplayer.utils,
        k = jwplayer.events,
        l = k.state,
        g = i.css,
        c = ".jwdisplayIcon",
        f = undefined,
        h = document,
        b = "none",
        e = "100%",
        j = "center",
        a = "absolute";
    d.displayicon = function (J, E, u, B) {
        var K = E,
            x = K.skin,
            q = J,
            y, L, Q, A, w, p, C, G, F = 0;

        function z() {
            y = N("jwdisplayIcon");
            y.id = q;
            v();
            p = N("jwtext", y, u, B);
            C = N("icon", y);
            n();
            o()
        }

        function s(R, S) {
            return "#" + q + (S ? ":hover" : "") + " " + (R ? R : "")
        }

        function N(S, U, T, R) {
            var V = h.createElement("div");
            V.className = S;
            if (U) {
                U.appendChild(V)
            }
            O(S, "." + S, T, R);
            return V
        }

        function v() {
            L = H("background");
            Q = H("capLeft");
            A = H("capRight");
            w = (Q.width * A.width > 0);
            var R = {
                "background-image": "url(" + Q.src + "), url(" + L.src + "), url(" + A.src + ")",
                "background-position": "left,center,right",
                "background-repeat": "no-repeat",
                padding: "0 " + A.width + "px 0 " + Q.width + "px",
                height: L.height,
                "margin-top": L.height / -2
            };
            g(s(), R);
            if (L.overSrc) {
                R["background-image"] = "url(" + Q.overSrc + "), url(" + L.overSrc + "), url(" + A.overSrc + ")"
            }
            g("#" + K.id + " .jwdisplay:hover " + s(), R)
        }

        function O(T, R, V, S) {
            var U = H(T);
            if (T == "replayIcon" && !U.src) {
                U = H("playIcon")
            }
            V = i.extend({}, V);
            if (T.indexOf("Icon") > 0) {
                F = U.width
            }
            if (U.src) {
                V["background-image"] = "url(" + U.src + ")";
                V.width = U.width
            }
            g(s(R), V);
            S = i.extend({}, S);
            if (U.overSrc) {
                S["background-image"] = "url(" + U.overSrc + ")"
            }
            G = U;
            g("#" + K.id + " .jwdisplay:hover " + (R ? R : s()), S)
        }

        function H(S) {
            var T = x.getSkinElement("display", S),
                R = x.getSkinElement("display", S + "Over");
            if (T) {
                T.overSrc = (R && R.src) ? R.src : "";
                return T
            }
            return {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function o() {
            var S = w || (F == 0),
                T = "px " + e,
                R;
            g(s(".jwtext"), {
                display: (p.innerHTML && S) ? f : b
            });
            setTimeout(function () {
                R = Math.max(G.width, i.bounds(y).width - A.width - Q.width);
                if (i.isFF() || i.isIE()) {
                    R++
                }
                if (i.isChrome() && y.parentNode.clientWidth % 2 == 1) {
                    R++
                }
                g(s(), {
                    "background-size": [Q.width + T, R + T, A.width + T].join(",")
                }, true)
            }, 0)
        }
        this.element = function () {
            return y
        };
        this.setText = function (S) {
            var R = p.style;
            p.innerHTML = S ? S.replace(":", ":<br>") : "";
            R.height = "0";
            R.display = "block";
            if (S) {
                while (m(p) > 2) {
                    p.innerHTML = p.innerHTML.replace(/(.*) .*$/, "$1...")
                }
            }
            R.height = "";
            R.display = "";
            o()
        };
        this.setIcon = function (S) {
            var R = N("icon");
            R.id = y.id + "_" + S;
            O(S + "Icon", "#" + R.id);
            if (y.contains(C)) {
                y.replaceChild(R, C)
            } else {
                y.appendChild(R)
            }
            C = R
        };
        var t, r = 0,
            P;

        function I(S, R) {
            clearInterval(t);
            P = 0;
            r = S;
            if (S == 0) {
                M()
            } else {
                t = setInterval(M, R)
            }
        }

        function M() {
            P = (P + r) % 360;
            i.rotate(C, P)
        }
        this.setRotation = I;

        function m(R) {
            return Math.floor(R.scrollHeight / h.defaultView.getComputedStyle(R, null).lineHeight.replace("px", ""))
        }
        var n = this.hide = function () {
            y.style.opacity = 0
        };
        var D = this.show = function () {
            y.style.opacity = 1
        };
        z()
    };
    g(c, {
        display: "table",
        cursor: "pointer",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%"
    }, true);
    g(c + " div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": j
    });
    g(c + " div", {
        "vertical-align": "middle"
    }, true);
    g(c + " .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": j,
        "-webkit-user-select": b,
        "-moz-user-select": b,
        "-ms-user-select": b,
        "user-select": b
    })
})(jwplayer.html5);
(function (e) {
    var k = jwplayer.utils,
        m = jwplayer.events,
        n = m.state,
        i = k.css,
        d = k.bounds,
        b = ".jwdock",
        h = ".jwdockbuttons",
        g = undefined,
        j = document,
        c = "none",
        a = "block",
        f = "100%",
        l = "center";
    e.dock = function (y, H) {
        var B = y,
            A = {
                iconalpha: 0.75,
                iconalphaactive: 0.5,
                iconalphaover: 1,
                margin: 8
            }, t = k.extend({}, A, H),
            o = B.id + "_dock",
            u = B.skin,
            J, D = 0,
            r = {}, s = {}, v, E, I, C = this;

        function w() {
            C.visible = false;
            v = G("div", "jwdock");
            E = G("div", "jwdockbuttons");
            v.appendChild(E);
            v.id = o;
            x();
            setTimeout(function () {
                I = d(v)
            })
        }

        function x() {
            var L = z("button"),
                M = z("buttonOver"),
                N = z("buttonActive");
            if (!L) {
                return
            }
            i(p(), {
                height: L.height,
                padding: t.margin
            });
            i(h, {
                height: L.height
            });
            i(p("button"), {
                width: L.width,
                cursor: "pointer",
                border: c,
                background: L.src
            });
            if (M.src) {
                i(p("button:hover"), {
                    background: M.src
                })
            }
            if (N.src) {
                i(p("button:active"), {
                    background: N.src
                })
            }
            i(p("button>div"), {
                opacity: t.iconalpha
            });
            i(p("button:hover>div"), {
                opacity: t.iconalphaover
            });
            i(p("button:active>div"), {
                opacity: t.iconalphaactive
            });
            i(p(".jwoverlay"), {
                top: t.margin + L.height
            });
            F("capLeft", E);
            F("capRight", E);
            F("divider")
        }

        function F(N, M) {
            var L = z(N);
            i(p("." + N), {
                width: L.width,
                background: L.src
            });
            return G("div", N, M)
        }

        function p(L, M) {
            return "#" + o + " " + (L ? L : "")
        }

        function G(N, L, M) {
            var O = j.createElement(N);
            if (L) {
                O.className = L
            }
            if (M) {
                M.appendChild(O)
            }
            return O
        }

        function z(L) {
            var M = u.getSkinElement("dock", L);
            return M ? M : {
                width: 0,
                height: 0,
                src: ""
            }
        }
        C.redraw = function () {
            I = d(v)
        };

        function K(M) {
            var P = s[M],
                L, O = r[M],
                Q, N = d(O.icon);
            P.offsetX(0);
            Q = d(v);
            i("#" + P.element().id, {
                left: N.left - Q.left + N.width / 2
            });
            L = d(P.element());
            if (Q.left > L.left) {
                P.offsetX(Q.left - L.left + 8)
            }
        }
        C.element = function () {
            return v
        };
        C.offset = function (L) {
            i(p(), {
                "margin-left": L
            })
        };
        C.hide = function () {
            if (!C.visible) {
                return
            }
            C.visible = false;
            v.style.opacity = 0;
            setTimeout(function () {
                v.style.display = c
            }, 150)
        };
        C.show = function () {
            if (C.visible || !D) {
                return
            }
            C.visible = true;
            v.style.display = a;
            setTimeout(function () {
                v.style.opacity = 1
            }, 0)
        };
        C.addButton = function (L, T, P, M) {
            if (r[M]) {
                return
            }
            var N = G("div", "divider", E),
                O = G("button", null, E),
                S = G("div", null, O);
            S.id = o + "_" + M;
            S.innerHTML = "&nbsp;";
            i("#" + S.id, {
                "background-image": L
            });
            if (typeof P == "string") {
                P = new Function(P)
            }
            O.addEventListener("click", function (V) {
                P(V);
                V.preventDefault()
            });
            r[M] = {
                element: O,
                label: T,
                divider: N,
                icon: S
            };
            if (T) {
                var U = new e.overlay(S.id + "_tooltip", u, true),
                    Q = G("div");
                Q.id = S.id + "_label";
                Q.innerHTML = T;
                i("#" + Q.id, {
                    padding: 3
                });
                U.setContents(Q);
                var R;
                O.addEventListener("mouseover", function () {
                    clearTimeout(R);
                    K(M);
                    U.show();
                    k.foreach(s, function (V, W) {
                        if (V != M) {
                            W.hide()
                        }
                    })
                }, false);
                O.addEventListener("mouseout", function () {
                    R = setTimeout(U.hide, 100)
                }, false);
                v.appendChild(U.element());
                s[M] = U
            }
            D++;
            q()
        };
        C.removeButton = function (L) {
            if (r[L]) {
                E.removeChild(r[L].element);
                E.removeChild(r[L].divider);
                delete r[L];
                D--;
                q()
            }
        };
        C.numButtons = function () {
            return D
        };

        function q() {
            i(h + " .capLeft, " + h + " .capRight", {
                display: D ? a : c
            })
        }
        w()
    };
    i(b, {
        opacity: 0,
        display: c
    });
    i(b + " > *", {
        height: f,
        "float": "left"
    });
    i(b + " > .jwoverlay", {
        height: "auto",
        "float": c,
        "z-index": 99
    });
    i(h + " button", {
        position: "relative"
    });
    i(h + " > *", {
        height: f,
        "float": "left"
    });
    i(h + " .divider", {
        display: c
    });
    i(h + " button ~ .divider", {
        display: a
    });
    i(h + " .capLeft, " + h + " .capRight", {
        display: c
    });
    i(h + " .capRight", {
        "float": "right"
    });
    i(h + " button > div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    k.transitionStyle(b, "background .15s, opacity .15s");
    k.transitionStyle(b + " .jwoverlay", "opacity .15s");
    k.transitionStyle(h + " button div", "opacity .15s")
})(jwplayer.html5);
(function (a) {
    var e = jwplayer,
        c = e.utils,
        d = e.events,
        b = d.state,
        f = e.playlist;
    a.instream = function (o, i, j, M) {
        var R = {
            controlbarseekable: "never",
            controlbarpausable: true,
            controlbarstoppable: true,
            playlistclickable: true
        };
        var H, Q, n = o,
            l = i,
            k = j,
            B = M,
            r, E, m, J, h, L, O, D, u, S = false,
            g, C, x, w = this,
            G = false,
            A = true;
        this.load = function (U, T) {
            if (c.isAndroid(2.3)) {
                K({
                    type: d.JWPLAYER_ERROR,
                    message: "Error loading instream: Cannot play instream on Android 2.3"
                });
                return
            }
            S = true;
            Q = c.extend(R, T);
            H = new f.item(U);
            C = document.createElement("div");
            C.id = w.id + "_instream_container";
            r = B.detachMedia();
            P();
            x = new a.model({}, O);
            p();
            x.addEventListener(d.JWPLAYER_ERROR, K);
            L = l.playlist[l.item];
            h = l.getVideo().checkComplete() ? b.IDLE : o.jwGetState();
            if (B.checkBeforePlay()) {
                h = b.PLAYING;
                A = false
            }
            E = r.src ? r.src : r.currentSrc;
            m = r.innerHTML;
            J = r.currentTime;
            x.setPlaylist([U]);
            if (!G) {
                if (h == b.BUFFERING || h == b.PLAYING) {
                    r.pause()
                }
                u = new a.display(w);
                u.setAlternateClickHandler(function (V) {
                    if (x.state == b.PAUSED) {
                        w.jwInstreamPlay()
                    } else {
                        w.jwInstreamPause();
                        y(d.JWPLAYER_INSTREAM_CLICK, V)
                    }
                });
                C.appendChild(u.element());
                if (!c.isMobile()) {
                    D = new a.controlbar(w);
                    C.appendChild(D.element());
                    if (n.jwGetControls()) {
                        D.show();
                        u.show()
                    }
                }
                k.setupInstream(C, D, u, r);
                I();
                O.load(x.playlist[0])
            }
        };

        function K(U) {
            if (U.type == d.JWPLAYER_MEDIA_ERROR) {
                var T = c.extend({}, U);
                T.type = d.JWPLAYER_ERROR;
                y(T.type, T)
            } else {
                y(U.type, U)
            }
            G = true;
            w.jwInstreamDestroy(false)
        }
        this.jwInstreamDestroy = function (T) {
            if (!S) {
                return
            }
            S = false;
            if (h != b.IDLE) {
                O.load(L, false)
            } else {
                O.stop()
            }
            g.resetEventListeners();
            if (!G) {
                u.revertAlternateClickHandler()
            }
            O.detachMedia();
            k.destroyInstream();
            if (D) {
                try {
                    D.element().parentNode.removeChild(D.getDisplayElement())
                } catch (U) {}
            }
            y(d.JWPLAYER_INSTREAM_DESTROYED, {
                reason: (T ? "complete" : "destroyed")
            }, true);
            B.attachMedia();
            if (h == b.BUFFERING || h == b.PLAYING) {
                r.play();
                if (l.playlist[l.item] == L) {
                    if (A) {
                        l.getVideo().seek(J)
                    }
                }
            }
            return
        };
        this.jwInstreamAddEventListener = function (T, U) {
            g.addEventListener(T, U)
        };
        this.jwInstreamRemoveEventListener = function (T, U) {
            g.removeEventListener(T, U)
        };
        this.jwInstreamPlay = function () {
            if (!S) {
                return
            }
            O.play(true);
            l.state = jwplayer.events.state.PLAYING;
            if (n.jwGetControls()) {
                u.show()
            }
        };
        this.jwInstreamPause = function () {
            if (!S) {
                return
            }
            O.pause(true);
            l.state = jwplayer.events.state.PAUSED;
            if (n.jwGetControls()) {
                u.show()
            }
        };
        this.jwInstreamSeek = function (T) {
            if (!S) {
                return
            }
            O.seek(T)
        };

        function N() {
            g = new d.eventdispatcher();
            n.jwAddEventListener(d.JWPLAYER_RESIZE, I);
            n.jwAddEventListener(d.JWPLAYER_FULLSCREEN, s)
        }

        function p() {
            x.setVolume(l.volume);
            x.setMute(l.mute)
        }

        function P() {
            O = new a.video(r);
            O.addGlobalListener(q);
            O.addEventListener(d.JWPLAYER_MEDIA_META, z);
            O.addEventListener(d.JWPLAYER_MEDIA_COMPLETE, F);
            O.addEventListener(d.JWPLAYER_MEDIA_BUFFER_FULL, t);
            O.addEventListener(d.JWPLAYER_MEDIA_ERROR, K);
            O.addEventListener(d.JWPLAYER_PLAYER_STATE, v);
            O.attachMedia();
            O.mute(l.mute);
            O.volume(l.volume)
        }

        function q(T) {
            if (S) {
                y(T.type, T)
            }
        }

        function s(T) {
            q(T);
            I()
        }

        function t(T) {
            if (S) {
                O.play()
            }
        }

        function F(T) {
            if (S) {
                setTimeout(function () {
                    w.jwInstreamDestroy(true)
                }, 10)
            }
        }

        function z(T) {
            if (T.width && T.height) {
                k.resizeMedia()
            }
        }

        function y(T, U, V) {
            if (S || V) {
                g.sendEvent(T, U)
            }
        }

        function I() {
            if (D) {
                D.redraw()
            }
            if (u) {
                u.redraw()
            }
        }

        function v(T) {
            if (!S) {
                return
            }
            l.state = T.newstate
        }
        this.jwPlay = function (T) {
            if (Q.controlbarpausable.toString().toLowerCase() == "true") {
                this.jwInstreamPlay()
            }
        };
        this.jwPause = function (T) {
            if (Q.controlbarpausable.toString().toLowerCase() == "true") {
                this.jwInstreamPause()
            }
        };
        this.jwStop = function () {
            if (Q.controlbarstoppable.toString().toLowerCase() == "true") {
                this.jwInstreamDestroy();
                n.jwStop()
            }
        };
        this.jwSeek = function (T) {
            switch (Q.controlbarseekable.toLowerCase()) {
            case "never":
                return;
            case "always":
                this.jwInstreamSeek(T);
                break;
            case "backwards":
                if (x.position > T) {
                    this.jwInstreamSeek(T)
                }
                break
            }
        };
        this.jwSeekDrag = function (T) {
            x.seekDrag(T)
        };
        this.jwGetPosition = function () {};
        this.jwGetDuration = function () {};
        this.jwGetWidth = n.jwGetWidth;
        this.jwGetHeight = n.jwGetHeight;
        this.jwGetFullscreen = n.jwGetFullscreen;
        this.jwSetFullscreen = n.jwSetFullscreen;
        this.jwGetVolume = function () {
            return l.volume
        };
        this.jwSetVolume = function (T) {
            x.setVolume(T);
            n.jwSetVolume(T)
        };
        this.jwGetMute = function () {
            return l.mute
        };
        this.jwSetMute = function (T) {
            x.setMute(T);
            n.jwSetMute(T)
        };
        this.jwGetState = function () {
            return l.state
        };
        this.jwGetPlaylist = function () {
            return [H]
        };
        this.jwGetPlaylistIndex = function () {
            return 0
        };
        this.jwGetStretching = function () {
            return l.config.stretching
        };
        this.jwAddEventListener = function (U, T) {
            g.addEventListener(U, T)
        };
        this.jwRemoveEventListener = function (U, T) {
            g.removeEventListener(U, T)
        };
        this.jwSetCurrentQuality = function () {};
        this.jwGetQualityLevels = function () {
            return []
        };
        this.skin = n.skin;
        this.id = n.id + "_instream";
        N();
        return this
    }
})(jwplayer.html5);
(function (c) {
    var m = c.utils,
        h = c.html5,
        l = m.css,
        o = c.events.state,
        i = undefined,
        j = "free",
        f = "pro",
        g = "premium",
        n = "ads",
        e = "open",
        p = "http://www.longtailvideo.com/jwpabout/?a=l&v=",
        a = "visible",
        d = "hidden",
        k = ".jwlogo";
    var b = h.logo = function (x, y) {
        var D = x,
            E = D.id + "_logo",
            u, r, v = b.defaults,
            C = false;

        function w() {
            B();
            s()
        }

        function B() {
            var F = "o";
            if (D.edition) {
                F = z(D.edition())
            }
            if (F == "o" || F == "f") {
                v.link = ""
            }
            u = m.extend({}, v, y);
            u.hide = (u.hide.toString() == "true")
        }

        function s() {
            r = document.createElement("img");
            r.className = "jwlogo";
            r.id = E;
            if (!u.file) {
                r.style.display = "none";
                return
            }
            var F = (/(\w+)-(\w+)/).exec(u.position),
                G = {}, H = u.margin;
            if (F.length == 3) {
                G[F[1]] = H;
                G[F[2]] = H
            } else {
                G.top = G.right = H
            }
            l(q(), G);
            r.src = "";
            r.onclick = A
        }
        this.resize = function (G, F) {};
        this.element = function () {
            return r
        };
        this.offset = function (F) {
            l(q(), {
                "margin-bottom": F
            })
        };
        this.position = function () {
            return u.position
        };
        this.margin = function () {
            return parseInt(u.margin)
        };

        function t() {
            if (D.jwGetState() == o.IDLE || D.jwGetState() == o.PAUSED) {
                D.jwPlay()
            } else {
                D.jwPause()
            }
        }

        function A(F) {
            if (m.exists(F)) {
                F.stopPropagation()
            }
            if (!C || !u.link) {
                t()
            }
            if (C && u.link) {
                D.jwPause();
                D.jwSetFullscreen(false);
                window.open(u.link, u.linktarget)
            }
            return
        }

        function z(F) {
            if (F == f) {
                return "p"
            } else {
                if (F == g) {
                    return "r"
                } else {
                    if (F == n) {
                        return "a"
                    } else {
                        if (F == j) {
                            return "f"
                        } else {
                            return "o"
                        }
                    }
                }
            }
        }

        function q(F) {
            return "#" + E + " " + (F ? F : "")
        }
        this.hide = function (F) {
            if (u.hide || F) {
                C = false;
                r.style.visibility = "hidden";
                r.style.opacity = 0
            }
        };
        this.show = function () {
            C = true;
            r.style.visibility = "visible";
            r.style.opacity = 1
        };
        w();
        return this
    };
    b.defaults = {
        prefix: m.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: false,
        position: "top-right"
    };
    l(k, {
        cursor: "pointer",
        position: "absolute",
        "z-index": 100,
        opacity: 0
    });
    m.transitionStyle(k, "visibility .15s, opacity .15s")
})(jwplayer);
(function (c) {
    var f = c.html5,
        j = c.utils,
        i = j.css,
        h = "jwmenu",
        d = "jwoption",
        g = undefined,
        a = "#ffffff",
        b = "#cccccc";
    f.menu = function (l, m, A, s) {
        var w = A,
            y = l,
            x = m,
            n = s,
            p = new f.overlay(x + "_overlay", A),
            q = j.extend({
                fontcase: g,
                fontcolor: b,
                fontsize: 11,
                fontweight: g,
                activecolor: a,
                overcolor: a
            }, A.getComponentSettings("tooltip")),
            o, z = [];

        function v() {
            o = t(h);
            o.id = x;
            var F = r("menuTop" + l),
                D = r("menuOption"),
                C = r("menuOptionOver"),
                E = r("menuOptionActive");
            if (F) {
                o.appendChild(F.image)
            }
            if (D) {
                var B = "#" + m + " ." + d;
                i(B, {
                    "background-image": D.src,
                    height: D.height,
                    color: q.fontcolor,
                    "padding-left": D.width,
                    font: q.fontweight + " " + q.fontsize + "px Arial,Helvetica,sans-serif",
                    "line-height": D.height,
                    "text-transform": (q.fontcase == "upper") ? "uppercase" : g
                });
                i(B + ":hover", {
                    "background-image": C.src ? C.src : g,
                    color: q.overcolor
                });
                i(B + ".active", {
                    "background-image": E.src ? E.src : g,
                    color: q.activecolor
                })
            }
            p.setContents(o)
        }
        this.element = function () {
            return p.element()
        };
        this.addOption = function (B, D) {
            var C = t(d, o);
            C.id = x + "_option_" + D;
            C.innerHTML = B;
            C.addEventListener("click", u(z.length, D));
            z.push(C)
        };

        function u(B, C) {
            return function () {
                k(B);
                if (n) {
                    n(C)
                }
            }
        }
        this.clearOptions = function () {
            while (z.length > 0) {
                o.removeChild(z.pop())
            }
        };
        var k = this.setActive = function (B) {
            for (var C = 0; C < z.length; C++) {
                var D = z[C];
                D.className = D.className.replace(" active", "");
                if (C == B) {
                    D.className += " active"
                }
            }
        };

        function t(C, B) {
            var D = document.createElement("div");
            if (C) {
                D.className = C
            }
            if (B) {
                B.appendChild(D)
            }
            return D
        }

        function r(B) {
            var C = A.getSkinElement("tooltip", B);
            return C ? C : {
                width: 0,
                height: 0,
                src: g
            }
        }
        this.show = p.show;
        this.hide = p.hide;
        this.offsetX = p.offsetX;
        v()
    };

    function e(k) {
        return "." + k.replace(/ /g, " .")
    }
    i(e(h + " " + d), {
        "background-repeat": "no-repeat",
        cursor: "pointer",
        position: "relative"
    })
})(jwplayer);
(function (b) {
    var a = jwplayer.utils,
        d = jwplayer.events,
        e = undefined,
        c = true,
        f = false;
    b.model = function (j, i) {
        var p = this,
            l, r, s = a.getCookies(),
            g = {
                controlbar: {},
                display: {}
            }, n = {
                autostart: f,
                controls: c,
                debug: e,
                fullscreen: f,
                height: 320,
                mobilecontrols: f,
                mute: f,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                repeat: f,
                skin: e,
                stretching: a.stretching.UNIFORM,
                width: 480,
                volume: 90
            };

        function o(t) {
            a.foreach(t, function (u, v) {
                t[u] = a.serialize(v)
            });
            return t
        }

        function q() {
            a.extend(p, new d.eventdispatcher());
            p.config = o(a.extend({}, n, s, j));
            a.extend(p, {
                id: j.id,
                state: d.state.IDLE,
                duration: -1,
                position: 0,
                buffer: 0
            }, p.config);
            p.playlist = [];
            p.setItem(0);
            if (i) {
                l = i;
                r = l.getTag()
            } else {
                r = document.createElement("video");
                l = new b.video(r)
            }
            l.volume(p.volume);
            l.mute(p.mute);
            l.addGlobalListener(k)
        }
        var m = {};
        m[d.JWPLAYER_MEDIA_MUTE] = "mute";
        m[d.JWPLAYER_MEDIA_VOLUME] = "volume";
        m[d.JWPLAYER_PLAYER_STATE] = "newstate->state";
        m[d.JWPLAYER_MEDIA_BUFFER] = "bufferPercent->buffer";
        m[d.JWPLAYER_MEDIA_TIME] = "position,duration";

        function k(t) {
            var A = (m[t.type] ? m[t.type].split(",") : []),
                x, z;
            if (A.length > 0) {
                for (x = 0; x < A.length; x++) {
                    var v = A[x],
                        w = v.split("->"),
                        y = w[0],
                        u = w[1] ? w[1] : y;
                    if (p[u] != t[y]) {
                        p[u] = t[y];
                        z = true
                    }
                }
                if (z) {
                    p.sendEvent(t.type, t)
                }
            } else {
                p.sendEvent(t.type, t)
            }
        }
        p.getVideo = function () {
            return l
        };
        p.seekDrag = function (t) {
            l.seekDrag(t)
        };
        p.setFullscreen = function (t) {
            if (t != p.fullscreen) {
                p.fullscreen = t;
                p.sendEvent(d.JWPLAYER_FULLSCREEN, {
                    fullscreen: t
                })
            }
        };
        p.setPlaylist = function (t) {
            p.playlist = h(t);
            if (p.playlist.length == 0) {
                p.sendEvent(d.JWPLAYER_ERROR, {
                    message: "Error loading playlist: No playable sources found"
                })
            } else {
                p.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: jwplayer(p.id).getPlaylist()
                });
                p.item = -1;
                p.setItem(0)
            }
        };

        function h(y) {
            var v = [];
            for (var u = 0; u < y.length; u++) {
                var w = a.extend({}, y[u]);
                w.sources = a.filterSources(w.sources);
                if (w.sources.length > 0) {
                    for (var t = 0; t < w.sources.length; t++) {
                        var x = w.sources[t];
                        if (!x.label) {
                            x.label = t.toString()
                        }
                    }
                    v.push(w)
                }
            }
            return v
        }
        p.setItem = function (t) {
            var u;
            var v = false;
            if (t == p.playlist.length || t < -1) {
                u = 0;
                v = true
            } else {
                if (t == -1 || t > p.playlist.length) {
                    u = p.playlist.length - 1
                } else {
                    u = t
                }
            } if (v || u != p.item) {
                p.item = u;
                p.sendEvent(d.JWPLAYER_PLAYLIST_ITEM, {
                    index: p.item
                })
            }
        };
        p.setVolume = function (t) {
            if (p.mute && t > 0) {
                p.setMute(f)
            }
            t = Math.round(t);
            if (!p.mute) {
                a.saveCookie("volume", t)
            }
            k({
                type: d.JWPLAYER_MEDIA_VOLUME,
                volume: t
            });
            l.volume(t)
        };
        p.setMute = function (t) {
            if (!a.exists(t)) {
                t = !p.mute
            }
            a.saveCookie("mute", t);
            k({
                type: d.JWPLAYER_MEDIA_MUTE,
                mute: t
            });
            l.mute(t)
        };
        p.componentConfig = function (t) {
            return g[t]
        };
        q()
    }
})(jwplayer.html5);
(function (j) {
    var e = j.html5,
        q = j.utils,
        m = q.css,
        r = q.transitionStyle,
        c = "relative",
        d = "absolute",
        g = "hidden",
        i = "100%",
        p = "opacity .15s, visibility .15s, left .01s linear",
        k = ".jwoverlay",
        a = "jwcontents",
        o = "top",
        f = "bottom",
        h = "right",
        l = "left",
        s = "#ffffff",
        t = undefined,
        b = document,
        n = {
            fontcase: t,
            fontcolor: s,
            fontsize: 12,
            fontweight: t,
            activecolor: s,
            overcolor: s
        };
    e.overlay = function (G, J, D) {
        var A = J,
            w = G,
            B, P, H = 0,
            I, M, L = D,
            u = q.extend({}, n, A.getComponentSettings("tooltip")),
            y = {}, K = this;

        function C() {
            B = N(k.replace(".", ""));
            B.id = w;
            I = x("arrow", "jwarrow")[1];
            M = I.height;
            m(z("jwarrow"), {
                position: d,
                bottom: L ? t : 0,
                top: L ? 0 : t,
                width: I.width,
                height: M,
                left: "50%"
            });
            O(o, l);
            O(f, l);
            O(o, h);
            O(f, h);
            O(l);
            O(h);
            O(o);
            O(f);
            x("background", "jwback");
            m(z("jwback"), {
                left: y.left,
                right: y.right,
                top: y.top,
                bottom: y.bottom
            });
            P = N(a, B);
            m(z(a) + " *", {
                color: u.fontcolor,
                font: u.fontweight + " " + (u.fontsize) + "px Arial,Helvetica,sans-serif",
                "text-transform": (u.fontcase == "upper") ? "uppercase" : t
            });
            if (L) {
                q.transform(z("jwarrow"), "rotate(180deg)")
            }
            m(z(), {
                padding: (y.top + 1) + "px " + y.right + "px " + (y.bottom + 1) + "px " + y.left + "px"
            });
            K.showing = false
        }

        function z(Q) {
            return "#" + w + (Q ? " ." + Q : "")
        }

        function N(R, Q) {
            var S = b.createElement("div");
            if (R) {
                S.className = R
            }
            if (Q) {
                Q.appendChild(S)
            }
            return S
        }

        function x(Q, S) {
            var R = F(Q),
                T = N(S, B);
            m(z(S.replace(" ", ".")), {
                "background-image": R.src
            });
            return [T, R]
        }

        function O(W, V) {
            if (!V) {
                V = ""
            }
            var S = x("cap" + W + V, "jwborder jw" + W + (V ? V : "")),
                Q = S[0],
                T = S[1],
                R = {
                    "background-image": T.src,
                    width: (W == l || V == l || W == h || V == h) ? T.width : t,
                    height: (W == o || V == o || W == f || V == f) ? T.height : t
                };
            R[W] = ((W == f && !L) || (W == o && L)) ? M : 0;
            if (V) {
                R[V] = 0
            }
            m(z(Q.className.replace(/ /g, ".")), R);
            var U = {}, Y = {}, X = {
                    left: T.width,
                    right: T.width,
                    top: (L ? M : 0) + T.height,
                    bottom: (L ? 0 : M) + T.height
                };
            if (V) {
                U[V] = X[V];
                U[W] = 0;
                Y[W] = X[W];
                Y[V] = 0;
                m(z("jw" + W), U);
                m(z("jw" + V), Y);
                y[W] = X[W];
                y[V] = X[V]
            }
        }
        K.element = function () {
            return B
        };
        var E;
        K.setContents = function (Q) {
            q.empty(P);
            P.appendChild(Q);
            clearTimeout(E);
            E = setTimeout(v, 0)
        };
        K.offsetX = function (Q) {
            H = Q;
            clearTimeout(E);
            v()
        };

        function v() {
            if (B.clientWidth == 0) {
                return
            }
            m(z(), {
                "margin-left": Math.round(H - B.clientWidth / 2)
            });
            m(z("jwarrow"), {
                "margin-left": Math.round((I.width / -2) - H)
            })
        }
        K.borderWidth = function () {
            return y.left
        };

        function F(Q) {
            var R = A.getSkinElement("tooltip", Q);
            if (R) {
                return R
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: t,
                    ready: false
                }
            }
        }
        K.show = function () {
            K.showing = true;
            B.style.opacity = 1;
            B.style.visibility = "visible"
        };
        K.hide = function () {
            K.showing = false;
            B.style.opacity = 0;
            B.style.visibility = g
        };
        C()
    };
    m(k, {
        position: d,
        visibility: g,
        opacity: 0
    });
    m(k + " .jwcontents", {
        position: c,
        "z-index": 1
    });
    m(k + " .jwborder", {
        position: d,
        "background-size": i + " " + i
    }, true);
    m(k + " .jwback", {
        position: d,
        "background-size": i + " " + i
    });
    r(k, p)
})(jwplayer);
(function (b) {
    var a = jwplayer.utils;
    b.player = function (e) {
        var o = this,
            m, j, k, d;

        function n() {
            m = new b.model(e);
            o.id = m.id;
            j = new b.view(o, m);
            k = new b.controller(m, j);
            o._model = m;
            jwplayer.utils.css.block();
            g();
            var p = new b.setup(m, j, k);
            p.addEventListener(jwplayer.events.JWPLAYER_READY, h);
            p.addEventListener(jwplayer.events.JWPLAYER_ERROR, l);
            p.start()
        }

        function h(p) {
            k.playerReady(p);
            a.css.unblock()
        }

        function l(p) {
            a.log("There was a problem setting up the player: ", p);
            a.css.unblock()
        }

        function f() {
            var r = m.playlist,
                p = [];
            for (var q = 0; q < r.length; q++) {
                p.push(c(r[q]))
            }
            return p
        }

        function c(p) {
            var q = {
                description: p.description,
                file: p.file,
                image: p.image,
                mediaid: p.mediaid,
                title: p.title
            };
            a.foreach(p, function (r, s) {
                q[r] = s
            });
            q.sources = [];
            q.tracks = [];
            if (p.sources.length > 0) {
                a.foreach(p.sources, function (r, s) {
                    var t = {
                        file: s.file,
                        type: s.type ? s.type : undefined,
                        label: s.label,
                        "default": s["default"] ? true : false
                    };
                    q.sources.push(t)
                })
            }
            if (p.tracks.length > 0) {
                a.foreach(p.tracks, function (t, s) {
                    var r = {
                        file: s.file,
                        kind: s.kind ? s.kind : undefined,
                        label: s.label,
                        "default": s["default"] ? true : false
                    };
                    q.tracks.push(r)
                })
            }
            if (!p.file && p.sources.length > 0) {
                q.file = p.sources[0].file
            }
            return q
        }

        function g() {
            o.jwPlay = k.play;
            o.jwPause = k.pause;
            o.jwStop = k.stop;
            o.jwSeek = k.seek;
            o.jwSetVolume = k.setVolume;
            o.jwSetMute = k.setMute;
            o.jwLoad = k.load;
            o.jwPlaylistNext = k.next;
            o.jwPlaylistPrev = k.prev;
            o.jwPlaylistItem = k.item;
            o.jwSetFullscreen = k.setFullscreen;
            o.jwResize = j.resize;
            o.jwSeekDrag = m.seekDrag;
            o.jwSetStretching = k.setStretching;
            o.jwGetQualityLevels = k.getQualityLevels;
            o.jwGetCurrentQuality = k.getCurrentQuality;
            o.jwSetCurrentQuality = k.setCurrentQuality;
            o.jwGetCaptionsList = k.getCaptionsList;
            o.jwGetCurrentCaptions = k.getCurrentCaptions;
            o.jwSetCurrentCaptions = k.setCurrentCaptions;
            o.jwSetControls = j.setControls;
            o.jwGetSafeRegion = j.getSafeRegion;
            o.jwForceState = j.forceState;
            o.jwReleaseState = j.releaseState;
            o.jwGetPlaylistIndex = i("item");
            o.jwGetPosition = i("position");
            o.jwGetDuration = i("duration");
            o.jwGetBuffer = i("buffer");
            o.jwGetWidth = i("width");
            o.jwGetHeight = i("height");
            o.jwGetFullscreen = i("fullscreen");
            o.jwGetVolume = i("volume");
            o.jwGetMute = i("mute");
            o.jwGetState = i("state");
            o.jwGetStretching = i("stretching");
            o.jwGetPlaylist = f;
            o.jwGetControls = i("controls");
            o.jwDetachMedia = k.detachMedia;
            o.jwAttachMedia = k.attachMedia;
            o.jwPlayAd = function (q) {
                var p = jwplayer(o.id).plugins;
                if (p.vast) {
                    p.vast.jwPlayAd(q)
                }
            };
            o.jwLoadInstream = function (q, p) {
                if (!d) {
                    d = new b.instream(o, m, j, k)
                }
                d.load(q, p)
            };
            o.jwInstreamPlay = function () {
                if (d) {
                    d.jwInstreamPlay()
                }
            };
            o.jwInstreamPause = function () {
                if (d) {
                    d.jwInstreamPause()
                }
            };
            o.jwInstreamDestroy = function () {
                if (d) {
                    d.jwInstreamDestroy()
                }
                d = undefined
            };
            o.jwInstreamAddEventListener = function (p, q) {
                if (d) {
                    d.jwInstreamAddEventListener(p, q)
                }
            };
            o.jwInstreamRemoveEventListener = function (p, q) {
                if (d) {
                    d.jwInstreamRemoveEventListener(p, q)
                }
            };
            o.jwPlayerDestroy = function () {
                if (j) {
                    j.destroy()
                }
            };
            o.jwIsBeforePlay = function () {
                return k.checkBeforePlay()
            };
            o.jwIsBeforeComplete = function () {
                return m.getVideo().checkComplete()
            };
            o.jwAddEventListener = k.addEventListener;
            o.jwRemoveEventListener = k.removeEventListener;
            o.jwDockAddButton = j.addButton;
            o.jwDockRemoveButton = j.removeButton
        }

        function i(p) {
            return function () {
                return m[p]
            }
        }
        n()
    }
})(jwplayer.html5);
(function (g) {
    var b = "#FFFFFF",
        d = "#CCCCCC",
        k = "#333333",
        h = "#999999",
        j = "normal",
        f = {
            size: 180,
            backgroundcolor: k,
            fontcolor: h,
            overcolor: d,
            activecolor: d,
            titlecolor: d,
            titleovercolor: b,
            titleactivecolor: b,
            fontweight: j,
            titleweight: j,
            fontsize: 11,
            titlesize: 13
        }, p = jwplayer.events,
        n = jwplayer.utils,
        l = n.css,
        o = ".jwplaylist",
        m = document,
        a = "absolute",
        c = "relative",
        e = "hidden",
        i = "100%";
    g.playlistcomponent = function (I, U) {
        var N = I,
            A = N.skin,
            r = n.extend({}, f, N.skin.getComponentSettings("playlist"), U),
            O, B, q, t, z = -1,
            C, s, v = -1,
            u = 60,
            w = {
                background: undefined,
                divider: undefined,
                item: undefined,
                itemOver: undefined,
                itemImage: undefined,
                itemActive: undefined
            }, P = this;
        P.element = function () {
            return O
        };
        P.redraw = function () {
            if (s) {
                s.redraw()
            }
        };
        P.show = function () {
            n.show(O)
        };
        P.hide = function () {
            n.hide(O)
        };

        function y() {
            O = S("div", "jwplaylist");
            O.id = N.id + "_jwplayer_playlistcomponent";
            B = S("div", "jwlistcontainer");
            T(O, B);
            R();
            if (w.item) {
                u = w.item.height
            }
            G();
            N.jwAddEventListener(p.JWPLAYER_PLAYLIST_LOADED, J);
            N.jwAddEventListener(p.JWPLAYER_PLAYLIST_ITEM, L);
            E()
        }

        function E() {
            var V = setInterval(function () {
                var X = m.getElementById(O.id),
                    W = n.bounds(X).height;
                if (X != O) {
                    clearInterval(V)
                } else {
                    if (W != v) {
                        v = W;
                        P.redraw()
                    }
                }
            }, 200)
        }

        function x(V) {
            return "#" + O.id + (V ? " ." + V : "")
        }

        function G() {
            var Y = 0,
                X = 0,
                V = 0;
            n.clearCss(x());
            l(x(), {
                "background-color": r.backgroundcolor
            });
            l(x("jwlist"), {
                "background-image": w.background ? " url(" + w.background.src + ")" : ""
            });
            l(x("jwlist *"), {
                color: r.fontcolor,
                font: r.fontweight + " " + r.fontsize + "px Arial, Helvetica, sans-serif"
            });
            if (w.itemImage) {
                Y = (u - w.itemImage.height) / 2 + "px ";
                X = w.itemImage.width;
                V = w.itemImage.height
            } else {
                X = u * 4 / 3;
                V = u
            } if (w.divider) {
                l(x("jwplaylistdivider"), {
                    "background-image": "url(" + w.divider.src + ")",
                    "background-size": i + " " + w.divider.height + "px",
                    width: i,
                    height: w.divider.height
                })
            }
            l(x("jwplaylistimg"), {
                height: V,
                width: X,
                margin: Y ? (Y + Y + Y + Y) : "0 5px 0 0"
            });
            l(x("jwlist li"), {
                "background-image": w.item ? "url(" + w.item.src + ")" : "",
                height: u,
                "background-size": i + " " + u + "px",
                cursor: "pointer"
            });
            var W = {
                overflow: "hidden"
            };
            if (r.activecolor !== "") {
                W.color = r.activecolor
            }
            if (w.itemActive) {
                W["background-image"] = "url(" + w.itemActive.src + ")"
            }
            l(x("jwlist li.active"), W);
            l(x("jwlist li.active .jwtitle"), {
                color: r.titleactivecolor
            });
            var Z = {
                overflow: "hidden"
            };
            if (r.overcolor !== "") {
                Z.color = r.overcolor
            }
            if (w.itemOver) {
                Z["background-image"] = "url(" + w.itemOver.src + ")"
            }
            l(x("jwlist li:hover"), Z);
            l(x("jwlist li:hover .jwtitle"), {
                color: r.titleovercolor
            });
            l(x("jwtextwrapper"), {
                height: u - 5,
                position: c
            });
            l(x("jwtitle"), {
                height: 15,
                overflow: "hidden",
                display: "inline-block",
                width: i,
                color: r.titlecolor,
                "margin-top": Y ? Y : 7,
                "line-height": 13,
                "font-size": r.titlesize,
                "font-weight": r.titleweight
            });
            l(x("jwdescription"), {
                display: "block",
                "font-size": r.fontsize,
                "line-height": 19,
                "margin-top": 5,
                overflow: "hidden",
                height: u,
                position: c
            })
        }

        function F() {
            var V = S("ul", "jwlist");
            V.id = O.id + "_ul" + Math.round(Math.random() * 10000000);
            return V
        }

        function H(Y) {
            var ad = q[Y],
                ac = S("li", "jwitem"),
                W;
            ac.id = t.id + "_item_" + Y;
            if (Y > 0) {
                W = S("div", "jwplaylistdivider");
                T(ac, W)
            }
            var Z = S("div", "jwplaylistimg jwfill");
            if (M() && (ad.image || ad["playlist.image"] || w.itemImage)) {
                var aa;
                if (ad["playlist.image"]) {
                    aa = ad["playlist.image"]
                } else {
                    if (ad.image) {
                        aa = ad.image
                    } else {
                        if (w.itemImage) {
                            aa = w.itemImage.src
                        }
                    }
                }
                l("#" + ac.id + " .jwplaylistimg", {
                    "background-image": aa ? "url(" + aa + ")" : null
                });
                T(ac, Z)
            }
            var V = S("div", "jwtextwrapper");
            var ab = S("span", "jwtitle");
            ab.innerHTML = (ad && ad.title) ? ad.title : "";
            T(V, ab);
            if (ad.description) {
                var X = S("span", "jwdescription");
                X.innerHTML = ad.description;
                T(V, X)
            }
            T(ac, V);
            return ac
        }

        function S(W, V) {
            var X = m.createElement(W);
            if (V) {
                X.className = V
            }
            return X
        }

        function T(V, W) {
            V.appendChild(W)
        }

        function J(W) {
            B.innerHTML = "";
            q = K();
            if (!q) {
                return
            }
            t = F();
            for (var X = 0; X < q.length; X++) {
                var V = H(X);
                V.onclick = Q(X);
                T(t, V)
            }
            z = N.jwGetPlaylistIndex();
            if (n.isIOS() && window.iScroll) {
                O.innerHTML = "";
                T(O, t);
                t.style.height = u * q.length + "px";
                var Y = new iScroll(O.id)
            } else {
                T(B, t);
                s = new g.playlistslider(O.id + "_slider", N.skin, O, t)
            }
        }

        function K() {
            var W = N.jwGetPlaylist();
            var X = [];
            for (var V = 0; V < W.length; V++) {
                if (!W[V]["ova.hidden"]) {
                    X.push(W[V])
                }
            }
            return X
        }

        function Q(V) {
            return function () {
                C = V;
                N.jwPlaylistItem(V);
                N.jwPlay(true)
            }
        }

        function D() {
            var V = N.jwGetPlaylistIndex();
            if (V == C) {
                return
            }
            C = -1;
            if (n.isIOS() && window.iScroll) {
                t.scrollTop = V * u
            } else {
                if (s && s.visible()) {
                    s.thumbPosition(V / (N.jwGetPlaylist().length - 1))
                }
            }
        }

        function M() {
            return true
        }

        function L(V) {
            if (z >= 0) {
                m.getElementById(t.id + "_item_" + z).className = "jwitem";
                z = V.index
            }
            m.getElementById(t.id + "_item_" + V.index).className = "jwitem active";
            D()
        }

        function R() {
            n.foreach(w, function (W, V) {
                w[W] = A.getSkinElement("playlist", W)
            })
        }
        y();
        return this
    };
    l(o, {
        position: a,
        width: i,
        height: i
    });
    n.dragStyle(o, "none");
    l(o + " .jwplaylistimg", {
        position: c,
        width: i,
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: e
    });
    l(o + " .jwlist", {
        position: a,
        width: i,
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: e
    });
    l(o + " .jwlistcontainer", {
        position: a,
        overflow: e,
        width: i,
        height: i
    });
    l(o + " .jwlist li", {
        width: i
    });
    l(o + " .jwtextwrapper", {
        overflow: e
    });
    l(o + " .jwplaylistdivider", {
        position: a
    })
})(jwplayer.html5);
(function (b) {
    var d = jwplayer,
        a = d.utils,
        c = d.events;
    b.playlistloader = function () {
        var g = new c.eventdispatcher();
        a.extend(this, g);
        this.load = function (j) {
            a.ajax(j, h, f)
        };

        function h(k) {
            try {
                var n = k.responseXML.childNodes;
                var o = "";
                for (var j = 0; j < n.length; j++) {
                    o = n[j];
                    if (o.nodeType != o.COMMENT_NODE) {
                        break
                    }
                }
                if (b.parsers.localName(o) == "xml") {
                    o = o.nextSibling
                }
                if (b.parsers.localName(o) != "rss") {
                    e("Not a valid RSS feed");
                    return
                }
                var m = new d.playlist(b.parsers.rssparser.parse(o));
                m = i(m);
                if (m && m.length && m[0].sources && m[0].sources.length && m[0].sources[0].file) {
                    g.sendEvent(c.JWPLAYER_PLAYLIST_LOADED, {
                        playlist: m
                    })
                } else {
                    e("No playable sources found")
                }
            } catch (l) {
                e()
            }
        }

        function i(n) {
            if (!n) {
                return
            }
            var l = [],
                k, m, j;
            for (k = 0; k < n.length; k++) {
                m = n[k];
                j = a.filterSources(m.sources);
                if (j && j.length) {
                    m.sources = j;
                    l.push(m)
                }
            }
            return l
        }

        function f(j) {
            e(j.match(/invalid/i) ? "Not a valid RSS feed" : "")
        }

        function e(j) {
            g.sendEvent(c.JWPLAYER_ERROR, {
                message: j ? j : "Error loading file"
            })
        }
    }
})(jwplayer.html5);
(function (j) {
    var a = jwplayer.events,
        r = jwplayer.utils,
        n = r.css,
        b = "jwslider",
        p = "jwslidertop",
        h = "jwsliderbottom",
        f = "jwrail",
        q = "jwrailtop",
        o = "jwrailback",
        m = "jwrailbottom",
        c = "jwthumb",
        u = "jwthumbtop",
        i = "jwthumbback",
        t = "jwthumbbottom",
        e = document,
        s = window,
        v = undefined,
        g = "absolute",
        k = "hidden",
        l = "100%";
    j.playlistslider = function (T, K, H, X) {
        var M = K,
            V = T,
            Y = X,
            af, C, ac, Q, ag = 0,
            U, ad, ai = true,
            D, P, ab, y, aa, w, E, O, S, ae, J;
        this.element = function () {
            return af
        };
        this.visible = function () {
            return ai
        };

        function G() {
            var ak, aj;
            af = ah(b, null, H);
            af.id = T;
            af.addEventListener("mousedown", B, false);
            af.addEventListener("click", Z, false);
            N();
            S = D.height;
            ae = P.height;
            n(W(), {
                width: ab.width
            });
            n(W(f), {
                top: S,
                bottom: ae
            });
            n(W(c), {
                top: S
            });
            ak = ah(p, D, af);
            aj = ah(h, P, af);
            C = ah(f, null, af);
            ac = ah(c, null, af);
            ak.addEventListener("mousedown", x(-1), false);
            aj.addEventListener("mousedown", x(1), false);
            ah(q, y, C);
            ah(o, ab, C, true);
            ah(m, aa, C);
            n(W(o), {
                top: y.height,
                bottom: aa.height
            });
            ah(u, E, ac);
            ah(i, w, ac, true);
            ah(t, O, ac);
            n(W(i), {
                top: E.height,
                bottom: O.height
            });
            I();
            if (Y) {
                Y.addEventListener("mousewheel", A, false);
                Y.addEventListener("DOMMouseScroll", A, false)
            }
        }

        function W(aj) {
            return "#" + af.id + (aj ? " ." + aj : "")
        }

        function ah(am, al, ak, aj) {
            var an = e.createElement("div");
            if (am) {
                an.className = am;
                if (al) {
                    n(W(am), {
                        "background-image": al.src ? al.src : v,
                        "background-repeat": aj ? "repeat-y" : "no-repeat",
                        height: aj ? v : al.height
                    })
                }
            }
            if (ak) {
                ak.appendChild(an)
            }
            return an
        }

        function N() {
            D = F("sliderCapTop");
            P = F("sliderCapBottom");
            ab = F("sliderRail");
            y = F("sliderRailCapTop");
            aa = F("sliderRailCapBottom");
            w = F("sliderThumb");
            E = F("sliderThumbCapTop");
            O = F("sliderThumbCapBottom")
        }

        function F(aj) {
            var ak = M.getSkinElement("playlist", aj);
            return ak ? ak : {
                width: 0,
                height: 0,
                src: v
            }
        }
        var I = this.redraw = function () {
            clearTimeout(J);
            J = setTimeout(function () {
                if (Y && Y.clientHeight) {
                    R(Y.parentNode.clientHeight / Y.clientHeight)
                } else {
                    J = setTimeout(I, 10)
                }
            }, 0)
        };

        function A(aj) {
            if (!ai) {
                return
            }
            aj = aj ? aj : s.event;
            var ak = aj.detail ? aj.detail * -1 : aj.wheelDelta / 40;
            L(ag - ak / 10);
            if (aj.stopPropagation) {
                aj.stopPropagation()
            }
            if (aj.preventDefault) {
                aj.preventDefault()
            }
            aj.cancelBubble = true;
            aj.cancel = true;
            aj.returnValue = false;
            return false
        }

        function R(aj) {
            if (aj < 0) {
                aj = 0
            }
            if (aj > 1) {
                ai = false
            } else {
                ai = true;
                n(W(c), {
                    height: Math.max(C.clientHeight * aj, E.height + O.height)
                })
            }
            n(W(), {
                visibility: ai ? "visible" : k
            });
            if (Y) {
                Y.style.width = ai ? Y.parentElement.clientWidth - ab.width + "px" : ""
            }
        }
        var L = this.thumbPosition = function (aj) {
            if (isNaN(aj)) {
                aj = 0
            }
            ag = Math.max(0, Math.min(1, aj));
            n(W(c), {
                top: S + (C.clientHeight - ac.clientHeight) * ag
            });
            if (X) {
                X.style.top = (af.clientHeight - X.scrollHeight) * ag + "px"
            }
        };

        function B(aj) {
            if (aj.button == 0) {
                Q = true
            }
            e.onselectstart = function () {
                return false
            };
            s.addEventListener("mousemove", Z, false);
            s.addEventListener("mouseup", z, false)
        }

        function Z(aj) {
            if (Q || aj.type == "click") {
                var ao = r.bounds(C),
                    al = ac.clientHeight / 2,
                    ak = ao.height - al,
                    an = aj.pageY - ao.top,
                    am = (an - al) / (ak - al);
                L(am)
            }
        }

        function x(aj) {
            return function (ak) {
                if (ak.button > 0) {
                    return
                }
                L(ag + (aj * 0.05));
                U = setTimeout(function () {
                    ad = setInterval(function () {
                        L(ag + (aj * 0.05))
                    }, 50)
                }, 500)
            }
        }

        function z() {
            Q = false;
            s.removeEventListener("mousemove", Z);
            s.removeEventListener("mouseup", z);
            e.onselectstart = v;
            clearTimeout(U);
            clearInterval(ad)
        }
        G();
        return this
    };

    function d() {
        var w = [],
            x;
        for (x = 0; x < arguments.length; x++) {
            w.push(".jwplaylist ." + arguments[x])
        }
        return w.join(",")
    }
    n(d(b), {
        position: g,
        height: l,
        visibility: k,
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: k
    });
    n(d(b) + " *", {
        position: g,
        width: l,
        "background-position": "center",
        "background-size": l + " " + l,
        overflow: k
    });
    n(d(p, q, u), {
        top: 0
    });
    n(d(h, m, t), {
        bottom: 0
    })
})(jwplayer.html5);
(function (e) {
    var k = jwplayer.utils,
        i = k.css,
        a = "9boxPlayer",
        l = "http://9box.vn/",
        j = document,
        h = ".jwclick",
        g = h + "_item",
        f = "100%",
        b = "none",
        d = "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        c = "#FFF";
    e.rightclick = function (q, o) {
        var w = q,
            p, v = k.extend({
                aboutlink: l,
                abouttext: a
            }, o),
            m = false,
            x, r;

        function u() {
            p = j.getElementById(w.id);
            x = s(h);
            x.id = w.id + "_menu";
            x.style.display = b;
            p.oncontextmenu = n;
            x.onmouseover = function () {
                m = true
            };
            x.onmouseout = function () {
                m = false
            };
            j.addEventListener("mousedown", y, false);
            r = s(g);
            r.innerHTML = v.abouttext;
            r.onclick = t;
            x.appendChild(r);
            p.appendChild(x)
        }

        function s(z) {
            var A = j.createElement("div");
            A.className = z.replace(".", "");
            return A
        }

        function t() {
            window.location.href = v.aboutlink
        }

        function n(z) {
            if (m) {
                return
            }
            if (z == null) {
                z = window.event
            }
            var C = z.target != null ? z.target : z.srcElement,
                A = k.bounds(p),
                B = A.top,
                D = A.left;
            x.style.display = b;
            x.style.left = z.pageX - D + "px";
            x.style.top = z.pageY - B + "px";
            x.style.display = "block";
            z.preventDefault()
        }

        function y() {
            if (m) {
                return
            } else {
                x.style.display = b
            }
        }
        this.element = function () {
            return x
        };
        this.destroy = function () {
            j.removeEventListener("mousedown", y, false)
        };
        u()
    };
    i(h, {
        "background-color": c,
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": d,
        "-moz-box-shadow": d,
        "box-shadow": d,
        position: "absolute",
        "z-index": 999
    }, true);
    i(h + " div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": c,
        border: "none",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        color: "inherit"
    }, true);
    i(g, {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, true);
    i(g + ":hover", {
        "background-color": "#595959",
        color: c
    }, true);
    i(g + " a", {
        "text-decoration": b,
        color: "#000"
    }, true);
    i(h + " hr", {
        width: f,
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, true)
})(jwplayer.html5);
(function (f) {
    var h = jwplayer,
        k = h.utils,
        l = h.events,
        a = h.playlist,
        i = 1,
        e = 2,
        d = 3,
        j = 4,
        c = 5,
        b = 6,
        g = 7;
    f.setup = function (s, H, I) {
        var L = s,
            p = H,
            F = I,
            u = {}, C = {}, A, z = new l.eventdispatcher(),
            v = false,
            w = [];

        function t() {
            r(i, o);
            r(e, Q, i);
            r(d, y, i);
            r(j, K, d);
            r(c, P, j + "," + e);
            r(b, J, c + "," + d);
            r(g, D, b)
        }

        function r(R, T, S) {
            w.push({
                name: R,
                method: T,
                depends: S
            })
        }

        function G() {
            for (var T = 0; T < w.length; T++) {
                var R = w[T];
                if (O(R.depends)) {
                    w.splice(T, 1);
                    try {
                        R.method();
                        G()
                    } catch (S) {
                        x(S.message)
                    }
                    return
                }
            }
            if (w.length > 0 && !v) {
                setTimeout(G, 500)
            }
        }

        function O(T) {
            if (!T) {
                return true
            }
            var S = T.toString().split(",");
            for (var R = 0; R < S.length; R++) {
                if (!u[S[R]]) {
                    return false
                }
            }
            return true
        }

        function n(R) {
            u[R] = true
        }

        function o() {
            if (s.edition && s.edition() == "invalid") {
                x("Error setting up player: Invalid license key")
            } else {
                n(i)
            }
        }

        function Q() {
            A = new f.skin();
            A.load(L.config.skin, B, N)
        }

        function B(R) {
            n(e)
        }

        function N(R) {
            x("Error loading skin: " + R)
        }

        function y() {
            switch (k.typeOf(L.config.playlist)) {
            case "string":
                var R = new f.playlistloader();
                R.addEventListener(l.JWPLAYER_PLAYLIST_LOADED, m);
                R.addEventListener(l.JWPLAYER_ERROR, E);
                R.load(L.config.playlist);
                break;
            case "array":
                q(new a(L.config.playlist))
            }
        }

        function m(R) {
            q(R.playlist)
        }

        function q(R) {
            L.setPlaylist(R);
            if (L.playlist[0].sources.length == 0) {
                x("Error loading playlist: No playable sources found")
            } else {
                n(d)
            }
        }

        function E(R) {
            x("Error loading playlist: " + R.message)
        }

        function K() {
            var S = L.playlist[L.item].image;
            if (S) {
                var R = new Image();
                R.addEventListener("load", M, false);
                R.addEventListener("error", M, false);
                R.src = S;
                setTimeout(M, 500)
            } else {
                n(j)
            }
        }

        function M() {
            n(j)
        }

        function P() {
            p.setup(A);
            n(c)
        }

        function J() {
            n(b)
        }

        function D() {
            z.sendEvent(l.JWPLAYER_READY);
            n(g)
        }

        function x(R) {
            v = true;
            z.sendEvent(l.JWPLAYER_ERROR, {
                message: R
            });
            p.setupError(R)
        }
        k.extend(this, z);
        this.start = G;
        t()
    }
})(jwplayer.html5);
(function (a) {
    a.skin = function () {
        var b = {};
        var d = false;
        this.load = function (g, f, e) {
            new a.skinloader(g, function (h) {
                d = true;
                b = h;
                if (typeof f == "function") {
                    f()
                }
            }, function (h) {
                if (typeof e == "function") {
                    e(h)
                }
            })
        };
        this.getSkinElement = function (e, f) {
            e = c(e);
            f = c(f);
            if (d) {
                try {
                    return b[e].elements[f]
                } catch (g) {
                    jwplayer.utils.log("No such skin component / element: ", [e, f])
                }
            }
            return null
        };
        this.getComponentSettings = function (e) {
            e = c(e);
            if (d && b && b[e]) {
                return b[e].settings
            }
            return null
        };
        this.getComponentLayout = function (e) {
            e = c(e);
            if (d) {
                var f = b[e].layout;
                if (f && (f.left || f.right || f.center)) {
                    return b[e].layout
                }
            }
            return null
        };

        function c(e) {
            return e.toLowerCase()
        }
    }
})(jwplayer.html5);
(function (b) {
    var a = jwplayer.utils,
        d = a.foreach,
        c = "Skin formatting error";
    b.skinloader = function (g, l, i) {
        var j = {}, n = l,
            v = i,
            s = true,
            w, x = g,
            h = false,
            u;

        function z() {
            if (typeof x != "string" || x === "") {
                y(b.defaultskin().xml)
            } else {
                if (a.extension(x) != "xml") {
                    v("Skin not a valid file type");
                    return
                }
                var A = new b.skinloader("", o, v)
            }
        }

        function o(A) {
            j = A;
            a.ajax(a.getAbsolutePath(x), function (B) {
                try {
                    if (a.exists(B.responseXML)) {
                        y(B.responseXML);
                        return
                    }
                } catch (C) {
                    v(c)
                }
            }, function (B) {
                v(B)
            })
        }

        function m(A, B) {
            return A ? A.getElementsByTagName(B) : null
        }

        function y(F) {
            var E = m(F, "skin")[0],
                M = m(E, "component"),
                Y = E.getAttribute("target");
            if (!Y || parseFloat(Y) > parseFloat(jwplayer.version)) {
                v("Incompatible player version")
            }
            if (M.length === 0) {
                n(j);
                return
            }
            for (var P = 0; P < M.length; P++) {
                var K = k(M[P].getAttribute("name")),
                    J = {
                        settings: {},
                        elements: {},
                        layout: {}
                    }, O = m(m(M[P], "elements")[0], "element");
                j[K] = J;
                for (var N = 0; N < O.length; N++) {
                    q(O[N], K)
                }
                var G = m(M[P], "settings")[0];
                if (G && G.childNodes.length > 0) {
                    var S = m(G, "setting");
                    for (var X = 0; X < S.length; X++) {
                        var Z = S[X].getAttribute("name");
                        var Q = S[X].getAttribute("value");
                        if (/color$/.test(Z)) {
                            Q = a.stringToColor(Q)
                        }
                        J.settings[k(Z)] = Q
                    }
                }
                var T = m(M[P], "layout")[0];
                if (T && T.childNodes.length > 0) {
                    var U = m(T, "group");
                    for (var D = 0; D < U.length; D++) {
                        var I = U[D],
                            H = {
                                elements: []
                            };
                        J.layout[k(I.getAttribute("position"))] = H;
                        for (var W = 0; W < I.attributes.length; W++) {
                            var L = I.attributes[W];
                            H[L.name] = L.value
                        }
                        var V = m(I, "*");
                        for (var C = 0; C < V.length; C++) {
                            var A = V[C];
                            H.elements.push({
                                type: A.tagName
                            });
                            for (var B = 0; B < A.attributes.length; B++) {
                                var R = A.attributes[B];
                                H.elements[C][k(R.name)] = R.value
                            }
                            if (!a.exists(H.elements[C].name)) {
                                H.elements[C].name = A.tagName
                            }
                        }
                    }
                }
                s = false;
                p()
            }
        }

        function p() {
            clearInterval(w);
            if (!h) {
                w = setInterval(function () {
                    f()
                }, 100)
            }
        }

        function q(F, E) {
            E = k(E);
            var D = new Image(),
                A = k(F.getAttribute("name")),
                C = F.getAttribute("src"),
                H;
            if (C.indexOf("data:image/png;base64,") === 0) {
                H = C
            } else {
                var B = a.getAbsolutePath(x);
                var G = B.substr(0, B.lastIndexOf("/"));
                H = [G, E, C].join("/")
            }
            j[E].elements[A] = {
                height: 0,
                width: 0,
                src: "",
                ready: false,
                image: D
            };
            D.onload = function (I) {
                r(D, A, E)
            };
            D.onerror = function (I) {
                h = true;
                p();
                v("Skin image not found: " + this.src)
            };
            D.src = H
        }

        function e() {
            d(j, function (A, B) {
                d(B.elements, function (C, E) {
                    var D = E.image;
                    D.onload = null;
                    D.onerror = null;
                    delete E.image;
                    delete B.elements[C]
                });
                delete j[A]
            })
        }

        function f() {
            var A = true;
            d(j, function (B, C) {
                if (B != "properties") {
                    d(C.elements, function (E, D) {
                        if (!t(B, E).ready) {
                            A = false
                        }
                    })
                }
            });
            if (!A) {
                return
            }
            if (s == false) {
                clearInterval(w);
                n(j)
            }
        }

        function r(B, D, C) {
            var A = t(C, D);
            if (A) {
                A.height = B.height;
                A.width = B.width;
                A.src = B.src;
                A.ready = true;
                p()
            } else {
                a.log("Loaded an image for a missing element: " + C + "." + D)
            }
        }

        function t(A, B) {
            return j[k(A)] ? j[k(A)].elements[k(B)] : null
        }

        function k(A) {
            return A ? A.toLowerCase() : ""
        }
        z()
    }
})(jwplayer.html5);
(function (b) {
    var a = jwplayer.utils,
        c = jwplayer.events,
        d = a.css;
    b.thumbs = function (g) {
        var m, l, k, j, p, o = g,
            h = new c.eventdispatcher();
        a.extend(this, h);

        function n() {
            m = document.createElement("div");
            m.id = o
        }

        function s(u) {
            d(e(), {
                display: "none"
            });
            if (u) {
                p = u.split("?")[0].split("/").slice(0, -1).join("/");
                new b.parsers.srt(q, r, true).load(u)
            }
        }

        function q(u) {
            if (!a.typeOf(u) == "array") {
                return r("Invalid data")
            }
            j = u;
            d(e(), {
                display: "block"
            })
        }

        function r(u) {
            a.log("Thumbnails could not be loaded: " + u)
        }

        function e() {
            return "#" + o
        }

        function f(u) {
            if (u.indexOf("://") < 0) {
                u = p ? p + "/" + u : u
            }
            var A = u.indexOf("#xywh");
            if (A > 0) {
                try {
                    var F = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/,
                        w = F.exec(u),
                        z = w[1],
                        D = w[2] * -1,
                        C = w[3] * -1,
                        v = w[4],
                        E = w[5];
                    d(e(), {
                        "background-image": z,
                        "background-position": D + "px " + C + "px",
                        width: v,
                        height: E
                    })
                } catch (B) {
                    r("Could not parse thumbnail")
                }
            } else {
                var z = new Image();
                z.addEventListener("load", i, false);
                z.src = u
            }
        }

        function i(u) {
            var v = u.target;
            d(e(), {
                "background-image": v.src,
                "background-position": "0 0",
                width: v.width,
                height: v.height
            })
        }
        this.load = function (u) {
            s(u)
        };
        this.element = function () {
            return m
        };
        var t = this.updateTimeline = function (v) {
            var u = 0;
            if (!j) {
                return
            }
            while (u < j.length && v > j[u].end) {
                u++
            }
            if (u == j.length) {
                u--
            }
            if (j[u].text) {
                f(j[u].text)
            }
        };
        n()
    }
})(jwplayer.html5);
(function (c) {
    var a = c.utils,
        d = c.events,
        b = d.state;
    c.html5.video = function (Z) {
        var q = a.isIE(),
            T = {
                abort: B,
                canplay: r,
                canplaythrough: B,
                durationchange: E,
                emptied: B,
                ended: l,
                error: m,
                loadeddata: B,
                loadedmetadata: r,
                loadstart: B,
                pause: Y,
                play: Y,
                playing: Y,
                progress: F,
                ratechange: B,
                readystatechange: B,
                seeked: J,
                seeking: q ? v : B,
                stalled: B,
                suspend: B,
                timeupdate: aa,
                volumechange: j,
                waiting: v
            }, z = a.extensionmap,
            H, O, ag, w, af, o, W, ae, N, U, I, e = b.IDLE,
            P, n = -1,
            L = -1,
            Q = new d.eventdispatcher(),
            t = false,
            K, G = -1,
            M = a.isAndroid(),
            g = this,
            ah = false,
            y = false;
        a.extend(g, Q);

        function ab(ai) {
            w = ai;
            V();
            w.controls = true;
            w.controls = false;
            w.setAttribute("x-webkit-airplay", "allow");
            t = true
        }

        function V() {
            a.foreach(T, function (ai, aj) {
                w.addEventListener(ai, aj, false)
            })
        }

        function s(ai, aj) {
            if (t) {
                Q.sendEvent(ai, aj)
            }
        }

        function B(ai) {}

        function E(aj) {
            B(aj);
            if (!t) {
                return
            }
            var ai = ad(w.duration);
            if (af != ai) {
                af = ai
            }
            if (M && U > 0 && ai > U) {
                C(U)
            }
            aa()
        }

        function aa(ai) {
            B(ai);
            if (!t) {
                return
            }
            if (e == b.PLAYING && !I) {
                o = ad(w.currentTime);
                s(d.JWPLAYER_MEDIA_TIME, {
                    position: o,
                    duration: af
                })
            }
        }

        function ad(ai) {
            return Number(ai.toFixed(1))
        }

        function r(ai) {
            B(ai);
            if (!t) {
                return
            }
            if (!ae) {
                ae = true;
                p()
            }
            if (ai.type == "loadedmetadata") {
                if (w.muted) {
                    w.muted = false;
                    w.muted = true
                }
                s(d.JWPLAYER_MEDIA_META, {
                    duration: w.duration,
                    height: w.videoHeight,
                    width: w.videoWidth
                })
            }
        }

        function F(ai) {
            B(ai);
            if (ae && U > 0 && !M) {
                if (q) {
                    setTimeout(function () {
                        C(U)
                    }, 200)
                } else {
                    C(U)
                }
            }
        }

        function p() {
            if (!N) {
                N = true;
                s(d.JWPLAYER_MEDIA_BUFFER_FULL)
            }
        }

        function Y(ai) {
            B(ai);
            if (!t || I) {
                return
            }
            if (w.paused) {
                if (w.currentTime == w.duration && w.duration > 3) {} else {
                    f()
                }
            } else {
                if (a.isFF() && ai.type == "play" && e == b.BUFFERING) {
                    return
                } else {
                    x(b.PLAYING)
                }
            }
        }

        function v(ai) {
            B(ai);
            if (!t) {
                return
            }
            if (!I) {
                x(b.BUFFERING)
            }
        }

        function m(ai) {
            if (!t) {
                return
            }
            a.log("Error playing media: %o", w.error);
            Q.sendEvent(d.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading media: File could not be played"
            });
            x(b.IDLE)
        }

        function k(al) {
            var ai;
            if (a.typeOf(al) == "array" && al.length > 0) {
                ai = [];
                for (var ak = 0; ak < al.length; ak++) {
                    var am = al[ak],
                        aj = {};
                    aj.label = S(am) ? S(am) : ak;
                    ai[ak] = aj
                }
            }
            return ai
        }

        function i(aj) {
            var ai = k(aj);
            if (ai) {
                Q.sendEvent(d.JWPLAYER_MEDIA_LEVELS, {
                    levels: ai,
                    currentQuality: G
                })
            }
        }

        function S(ai) {
            if (ai.label) {
                return ai.label
            } else {
                return 0
            }
        }
        g.load = function (ai) {
            if (!t) {
                return
            }
            ah = false;
            H = ai;
            U = 0;
            af = ai.duration ? ai.duration : -1;
            o = 0;
            K = H.sources;
            D();
            i(K);
            u()
        };

        function D() {
            if (G < 0) {
                G = 0
            }
            for (var aj = 0; aj < K.length; aj++) {
                if (K[aj]["default"]) {
                    G = aj;
                    break
                }
            }
            var ak = a.getCookies(),
                ai = ak.qualityLabel;
            if (ai) {
                for (aj = 0; aj < K.length; aj++) {
                    if (K[aj]["label"] == ai) {
                        G = aj;
                        break
                    }
                }
            }
        }

        function u() {
            ae = false;
            N = false;
            O = K[G];
            x(b.BUFFERING);
            w.src = O.file;
            w.load();
            n = setInterval(h, 100);
            if (a.isIPod() || a.isAndroid(2.3)) {
                p()
            }
        }
        var A = g.stop = function () {
            if (!t) {
                return
            }
            w.removeAttribute("src");
            if (!q) {
                w.load()
            }
            G = -1;
            clearInterval(n);
            x(b.IDLE)
        };
        g.play = function () {
            if (t && !I) {
                w.play()
            }
        };
        var f = g.pause = function () {
            if (t) {
                w.pause();
                x(b.PAUSED)
            }
        };
        g.seekDrag = function (ai) {
            if (!t) {
                return
            }
            I = ai;
            if (ai) {
                w.pause()
            } else {
                w.play()
            }
        };
        var C = g.seek = function (ai) {
            if (!t) {
                return
            }
            if (ae) {
                U = 0;
                w.currentTime = ai
            } else {
                U = ai
            }
        };

        function J(ai) {
            B(ai);
            if (!I) {
                s(d.JWPLAYER_MEDIA_SEEK, {
                    position: o,
                    offset: w.currentTime
                });
                if (e != b.PAUSED) {
                    x(b.PLAYING)
                }
            }
        }
        var ac = g.volume = function (ai) {
            if (a.exists(ai)) {
                w.volume = Math.min(Math.max(0, ai / 100), 1);
                P = w.volume * 100
            }
        };

        function j(ai) {
            s(d.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(w.volume * 100)
            });
            s(d.JWPLAYER_MEDIA_MUTE, {
                mute: w.muted
            })
        }
        g.mute = function (ai) {
            if (!a.exists(ai)) {
                ai = !w.muted
            }
            if (ai) {
                P = w.volume * 100;
                w.muted = true
            } else {
                ac(P);
                w.muted = false
            }
        };

        function x(ai) {
            if (ai == b.PAUSED && e == b.IDLE) {
                return
            }
            if (I) {
                return
            }
            if (e != ai) {
                var aj = e;
                e = ai;
                s(d.JWPLAYER_PLAYER_STATE, {
                    oldstate: aj,
                    newstate: ai
                })
            }
        }

        function h() {
            if (!t) {
                return
            }
            var ai = R();
            if (ai != L) {
                L = ai;
                s(d.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(L * 100)
                })
            }
            if (ai >= 1) {
                clearInterval(n)
            }
        }

        function R() {
            if (w.buffered.length == 0 || w.duration == 0) {
                return 0
            } else {
                return w.buffered.end(w.buffered.length - 1) / w.duration
            }
        }

        function l(ai) {
            B(ai);
            if (t) {
                X()
            }
        }

        function X() {
            ah = true;
            if (e != b.IDLE) {
                G = -1;
                y = true;
                s(d.JWPLAYER_MEDIA_BEFORECOMPLETE);
                if (t) {
                    x(b.IDLE);
                    y = false;
                    s(d.JWPLAYER_MEDIA_COMPLETE)
                }
            }
        }
        this.checkComplete = function () {
            return y
        };
        g.detachMedia = function () {
            t = false;
            return w
        };
        g.attachMedia = function (ai) {
            t = true;
            if (!ai) {
                ae = false
            }
            if (y) {
                x(b.IDLE);
                s(d.JWPLAYER_MEDIA_COMPLETE);
                y = false
            }
        };
        g.getTag = function () {
            return w
        };
        g.audioMode = function () {
            if (!K) {
                return false
            }
            var ai = K[0].type;
            return (ai == "aac" || ai == "mp3" || ai == "vorbis")
        };
        g.setCurrentQuality = function (aj) {
            if (G == aj) {
                return
            }
            aj = parseInt(aj);
            if (aj >= 0) {
                if (K && K.length > aj) {
                    G = aj;
                    a.saveCookie("qualityLabel", K[aj].label);
                    s(d.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                        currentQuality: aj,
                        levels: k(K)
                    });
                    var ai = w.currentTime;
                    u();
                    g.seek(ai)
                }
            }
        };
        g.getCurrentQuality = function () {
            return G
        };
        g.getQualityLevels = function () {
            return k(K)
        };
        ab(Z)
    }
})(jwplayer);
(function (n) {
    var s = jwplayer,
        A = s.utils,
        c = jwplayer.events,
        i = c.state,
        u = A.css,
        w = A.bounds,
        z = A.isMobile(),
        g = A.isIPad(),
        D = A.isIPod(),
        k = A.isAndroid(),
        E = A.isIOS(),
        j = document,
        r = "jwplayer",
        e = "aspectMode",
        d = "." + r + ".jwfullscreen",
        t = "jwmain",
        C = "jwinstream",
        B = "jwvideo",
        f = "jwcontrols",
        b = "jwaspect",
        h = "jwplaylistcontainer",
        m = true,
        v = false,
        y = "opacity .5s ease",
        q = "100%",
        l = "absolute",
        x = " !important",
        o = "hidden",
        a = "none",
        p = "block";
    n.view = function (W, aa) {
        var aH = W,
            H = aa,
            aS, aV, aK, ab, R, aN = 0,
            aC = 2000,
            aj, at, aB, L, ag, az = v,
            aJ, aP, ah, aA, M, ax = A.extend({}, H.componentConfig("logo")),
            aM, O, aE, Q = (H.mobilecontrols),
            aq = v,
            av, an, ap, K, P = v,
            Z = new c.eventdispatcher();
        A.extend(this, Z);

        function aI() {
            aS = aR("div", r + " playlist-" + H.playlistposition);
            aS.id = aH.id;
            if (H.aspectratio) {
                u("." + r, {
                    display: "inline-block"
                });
                aS.className = aS.className.replace(r, r + " " + e)
            }
            U(H.width, H.height);
            var a2 = document.getElementById(aH.id);
            a2.parentNode.replaceChild(aS, a2)
        }
        this.getCurrentCaptions = function () {
            return aM.getCurrentCaptions()
        };
        this.setCurrentCaptions = function (a2) {
            aM.setCurrentCaptions(a2)
        };
        this.getCaptionsList = function () {
            return aM.getCaptionsList()
        };
        this.setup = function (a4) {
            if (aq) {
                return
            }
            aH.skin = a4;
            aV = aR("span", t);
            at = aR("span", B);
            aj = H.getVideo().getTag();
            at.appendChild(aj);
            aK = aR("span", f);
            ag = aR("span", C);
            R = aR("span", h);
            ab = aR("span", b);
            V();
            aV.appendChild(at);
            aV.appendChild(aK);
            aV.appendChild(ag);
            aS.appendChild(aV);
            aS.appendChild(ab);
            aS.appendChild(R);
            j.addEventListener("webkitfullscreenchange", I, v);
            aj.addEventListener("webkitbeginfullscreen", I, v);
            aj.addEventListener("webkitendfullscreen", I, v);
            j.addEventListener("mozfullscreenchange", I, v);
            j.addEventListener("keydown", aD, v);
            aH.jwAddEventListener(c.JWPLAYER_PLAYER_READY, aU);
            aH.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, S);
            aH.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, aQ);
            S({
                newstate: i.IDLE
            });
            aK.addEventListener("mouseout", function () {
                clearTimeout(aN);
                aN = setTimeout(af, 10)
            }, v);
            aK.addEventListener("mousemove", aW, v);
            if (A.isIE()) {
                at.addEventListener("mousemove", aW, v);
                at.addEventListener("click", ah.clickHandler)
            }
            ac(aP);
            ac(aA);
            ac(M);
            u("#" + aS.id + "." + e + " ." + b, {
                "margin-top": H.aspectratio,
                display: p
            });
            var a2 = A.exists(H.aspectratio) ? parseFloat(H.aspectratio) : 100,
                a3 = H.playlistsize;
            u("#" + aS.id + ".playlist-right ." + b, {
                "margin-bottom": -1 * a3 * (a2 / 100) + "px"
            });
            u("#" + aS.id + ".playlist-right ." + h, {
                width: a3 + "px",
                right: 0,
                top: 0,
                height: "100%"
            });
            u("#" + aS.id + ".playlist-bottom ." + b, {
                "padding-bottom": a3 + "px"
            });
            u("#" + aS.id + ".playlist-bottom ." + h, {
                width: "100%",
                height: a3 + "px",
                bottom: 0
            });
            u("#" + aS.id + ".playlist-right ." + t, {
                right: a3 + "px"
            });
            u("#" + aS.id + ".playlist-bottom ." + t, {
                bottom: a3 + "px"
            })
        };

        function ac(a2) {
            if (a2) {
                a2.element().addEventListener("mousemove", ai, v);
                a2.element().addEventListener("mouseout", aX, v)
            }
        }

        function aR(a3, a2) {
            var a4 = j.createElement(a3);
            if (a2) {
                a4.className = a2
            }
            return a4
        }

        function aW() {
            clearTimeout(aN);
            if (aH.jwGetState() == i.PLAYING || aH.jwGetState() == i.PAUSED) {
                al();
                if (!P) {
                    aN = setTimeout(af, aC)
                }
            }
        }

        function ai() {
            clearTimeout(aN);
            P = m
        }

        function aX() {
            P = v
        }

        function af(a2) {
            if (aH.jwGetState() != i.BUFFERING) {
                aG();
                ar();
                G()
            }
            clearTimeout(aN);
            aN = 0
        }

        function aF(a2) {
            Z.sendEvent(a2.type, a2)
        }

        function V() {
            var a4 = H.width,
                a2 = H.height,
                a5 = H.componentConfig("controlbar"),
                a3 = H.componentConfig("display");
            ad(a2);
            aM = new n.captions(aH, H.captions);
            aM.addEventListener(c.JWPLAYER_CAPTIONS_LIST, aF);
            aM.addEventListener(c.JWPLAYER_CAPTIONS_CHANGED, aF);
            aK.appendChild(aM.element());
            ah = new n.display(aH, a3);
            ah.addEventListener(c.JWPLAYER_DISPLAY_CLICK, aF);
            if (aE) {
                ah.hidePreview(m)
            }
            aK.appendChild(ah.element());
            M = new n.logo(aH, ax);
            aK.appendChild(M.element());
            aA = new n.dock(aH, H.componentConfig("dock"));
            aK.appendChild(aA.element());
            if (aH.edition) {
                ap = new n.rightclick(aH, {
                    abouttext: H.abouttext,
                    aboutlink: H.aboutlink
                })
            } else {
                ap = new n.rightclick(aH, {})
            } if (H.playlistsize && H.playlistposition && H.playlistposition != a) {
                O = new n.playlistcomponent(aH, {});
                R.appendChild(O.element())
            }
            if (!z || Q) {
                aP = new n.controlbar(aH, a5);
                aK.appendChild(aP.element());
                if (Q) {
                    al()
                }
            }
            setTimeout(function () {
                U(H.width, H.height)
            }, 0)
        }
        var au = this.fullscreen = function (a2) {
            if (!A.exists(a2)) {
                a2 = !H.fullscreen
            }
            if (a2) {
                if (!H.fullscreen) {
                    N(m);
                    if (aS.requestFullScreen) {
                        aS.requestFullScreen()
                    } else {
                        if (aS.mozRequestFullScreen) {
                            aS.mozRequestFullScreen()
                        } else {
                            if (aS.webkitRequestFullScreen) {
                                aS.webkitRequestFullScreen()
                            }
                        }
                    }
                    H.setFullscreen(m)
                }
            } else {
                N(v);
                if (H.fullscreen) {
                    H.setFullscreen(v);
                    if (j.cancelFullScreen) {
                        j.cancelFullScreen()
                    } else {
                        if (j.mozCancelFullScreen) {
                            j.mozCancelFullScreen()
                        } else {
                            if (j.webkitCancelFullScreen) {
                                j.webkitCancelFullScreen()
                            } else {
                                if (aj.webkitExitFullScreen) {
                                    aj.webkitExitFullScreen()
                                }
                            }
                        }
                    }
                }
                if (g && aH.jwGetState() == i.PAUSED) {
                    setTimeout(am, 500)
                }
            }
            aY(aP);
            aY(ah);
            aY(aA);
            ao();
            if (H.fullscreen) {
                K = setInterval(ao, 200)
            } else {
                clearInterval(K)
            }
            setTimeout(function () {
                var a3 = A.bounds(aV);
                H.width = a3.width;
                H.height = a3.height;
                Z.sendEvent(c.JWPLAYER_RESIZE)
            }, 0)
        };

        function aY(a2) {
            if (a2) {
                a2.redraw()
            }
        }

        function U(a4, a2) {
            if (A.exists(a4) && A.exists(a2)) {
                H.width = a4;
                H.height = a2
            }
            aS.style.width = isNaN(a4) ? a4 : a4 + "px";
            if (aS.className.indexOf(e) == -1) {
                aS.style.height = isNaN(a2) ? a2 : a2 + "px"
            }
            if (ah) {
                ah.redraw()
            }
            if (aP) {
                aP.redraw()
            }
            if (M) {
                M.offset(aP && M.position().indexOf("bottom") >= 0 ? aP.height() + aP.margin() : 0);
                setTimeout(function () {
                    if (aA) {
                        aA.offset(M.position() == "top-left" ? M.element().clientWidth + M.margin() : 0)
                    }
                }, 500)
            }
            var a6 = H.playlistsize,
                a7 = H.playlistposition;
            ad(a2);
            if (O && a6 && (a7 == "right" || a7 == "bottom")) {
                O.redraw();
                var a3 = {
                    display: p
                }, a5 = {};
                a3[a7] = 0;
                a5[a7] = a6;
                if (a7 == "right") {
                    a3.width = a6
                } else {
                    a3.height = a6
                }
                u(ay(h), a3);
                u(ay(t), a5)
            }
            ao();
            Z.sendEvent(c.JWPLAYER_RESIZE);
            return
        }

        function ad(a2) {
            aE = ak(a2);
            if (aP) {
                if (aE) {
                    aP.audioMode(m);
                    al();
                    ah.hidePreview(m);
                    F();
                    aT(v)
                } else {
                    aP.audioMode(v);
                    ae(aH.jwGetState())
                }
            }
            if (M && aE) {
                G()
            }
            aS.style.backgroundColor = aE ? "transparent" : "#000"
        }

        function ak(a2) {
            if (z && !Q) {
                return v
            } else {
                if (a2.toString().indexOf("%") > 0) {
                    return v
                } else {
                    if (H.playlistposition == "bottom") {
                        return a2 <= (40 + H.playlistsize)
                    } else {
                        return a2 <= 40
                    }
                }
            }
        }

        function ao() {
            if (aj && aS.className.indexOf(e) == -1) {
                A.stretch(H.stretching, aj, at.clientWidth, at.clientHeight, aj.videoWidth, aj.videoHeight)
            }
        }
        this.resize = U;
        this.resizeMedia = ao;
        var aw = this.completeSetup = function () {
            u(ay(), {
                opacity: 1
            })
        };

        function aD(a2) {
            if (H.fullscreen) {
                switch (a2.keyCode) {
                case 27:
                    au(v);
                    break
                }
            }
        }

        function N(a2) {
            if (E) {
                return
            }
            if (a2) {
                aS.className += " jwfullscreen";
                (j.getElementsByTagName("body")[0]).style["overflow-y"] = o
            } else {
                aS.className = aS.className.replace(/\s+jwfullscreen/, "");
                (j.getElementsByTagName("body")[0]).style["overflow-y"] = ""
            }
        }

        function Y() {
            var a2 = [j.mozFullScreenElement, j.webkitCurrentFullScreenElement, aj.webkitDisplayingFullscreen];
            for (var a3 = 0; a3 < a2.length; a3++) {
                if (a2[a3] && (!a2[a3].id || a2[a3].id == aH.id)) {
                    return m
                }
            }
            return v
        }

        function I(a2) {
            var a3 = Y();
            if (H.fullscreen != a3) {
                au(a3)
            }
        }

        function J() {
            if (aP) {
                aP.show()
            }
        }

        function aG() {
            if (aP && !aE && !Q) {
                aP.hide()
            }
        }

        function X() {
            if (aA && !aE && (!z || av)) {
                aA.show()
            }
        }

        function ar() {
            if (aA && !(av || Q)) {
                aA.hide()
            }
        }

        function aL() {
            if (M && !aE) {
                M.show()
            }
        }

        function G() {
            if (M && (!Q || aE)) {
                M.hide(aE)
            }
        }

        function am() {
            if (ah && H.controls && !aE) {
                if (!D || aH.jwGetState() == i.IDLE) {
                    ah.show()
                }
            }
            if (z && !Q) {
                if (k) {
                    aK.style.display = p
                }
                if (!(z && H.fullscreen)) {
                    aj.controls = false
                }
            }
        }

        function F() {
            if (ah) {
                if (z && !Q) {
                    if (k && H.controls) {
                        aK.style.display = a
                    }
                    aj.controls = H.controls
                }
                ah.hide()
            }
        }

        function aZ() {
            aG();
            ar();
            G()
        }

        function al() {
            if (H.controls || aE) {
                J();
                X()
            }
            aL()
        }

        function a1(a3, a2) {
            if (a2.right < a3.left || a2.left > a3.right) {
                return a3
            }
            if (a2.bottom < a3.top || a2.top > a3.bottom) {
                return a3
            }
            var a4 = (a2.y > a2.height / 2),
                a5 = {
                    x: a3.x,
                    y: a4 ? a3.y : a2.bottom,
                    width: a3.width
                }
        }

        function aT(a2) {
            a2 = a2 && !aE;
            u(ay(B), {
                visibility: a2 ? "visible" : o,
                opacity: a2 ? 1 : 0
            })
        }

        function aQ() {
            av = m;
            au(false);
            if (H.controls) {
                X()
            }
        }

        function aU(a2) {
            an = m
        }
        var aO;

        function S(a2) {
            av = v;
            clearTimeout(aO);
            aO = setTimeout(function () {
                ae(a2.newstate)
            }, 100)
        }

        function ae(a2) {
            switch (a2) {
            case i.PLAYING:
                if (!H.getVideo().audioMode() || z) {
                    aT(m);
                    ao();
                    ah.hidePreview(m);
                    if (z) {
                        if (!(g && Q)) {
                            F()
                        }
                    }
                } else {
                    aT(v);
                    ah.hidePreview(aE)
                }
                aW();
                break;
            case i.IDLE:
                aT(v);
                af();
                if (!aE) {
                    ah.hidePreview(v);
                    am();
                    if (!ax.hide) {
                        aL()
                    }
                }
                break;
            case i.BUFFERING:
                am();
                if (z) {
                    aT(m)
                } else {
                    al()
                }
                break;
            case i.PAUSED:
                am();
                if (!z || Q) {
                    al()
                }
                break
            }
        }

        function ay(a2) {
            return "#" + aH.id + (a2 ? " ." + a2 : "")
        }
        this.setupInstream = function (a2, a5, a4, a3) {
            a0(ay(C), m);
            a0(ay(f), v);
            ag.appendChild(a2);
            _instreamVideo = a3;
            L = a4;
            aB = a5;
            S({
                newstate: i.PLAYING
            });
            if (z) {
                aJ = aH.jwGetControls();
                console.log(aJ);
                aH.jwSetControls(v)
            }
            az = m
        };
        var T = this.destroyInstream = function () {
            a0(ay(C), v);
            a0(ay(f), m);
            ag.innerHTML = "";
            _instreamVideo = null;
            az = v;
            if (z) {
                aH.jwSetControls(aJ)
            }
        };
        this.setupError = function (a2) {
            aq = true;
            jwplayer.embed.errorScreen(aS, a2);
            aw()
        };

        function a0(a2, a3) {
            u(a2, {
                display: a3 ? p : a
            })
        }
        this.addButton = function (a4, a2, a3, a5) {
            if (aA) {
                aA.addButton(a4, a2, a3, a5)
            }
        };
        this.removeButton = function (a2) {
            if (aA) {
                aA.removeButton(a2)
            }
        };
        this.setControls = function (a3) {
            var a4 = H.controls,
                a2 = a3 ? m : v;
            H.controls = a2;
            if (a2 != a4) {
                if (a2) {
                    am()
                } else {
                    aZ();
                    F()
                } if (az) {
                    if (a3) {
                        aB.show();
                        L.show()
                    } else {
                        aB.hide();
                        L.hide()
                    }
                }
                Z.sendEvent(c.JWPLAYER_CONTROLS, {
                    controls: a2
                })
            }
        };
        this.forceState = function (a2) {
            ah.forceState(a2)
        };
        this.releaseState = function () {
            ah.releaseState(aH.jwGetState())
        };
        this.getSafeRegion = function () {
            var a9 = H.controls,
                ba = A.bounds(aV),
                a4 = ba.top,
                a7 = A.bounds(aP ? aP.element() : null),
                a3 = (aA.numButtons() > 0),
                a6 = A.bounds(aA.element()),
                a5 = A.bounds(M.element()),
                a8 = (M.position().indexOf("top") == 0),
                a2 = {};
            a2.x = 0;
            a2.y = Math.max(a3 ? (a6.top + a6.height - a4) : 0, a8 ? (a5.top + a5.height - a4) : 0);
            a2.width = ba.width;
            if (a7.height) {
                a2.height = (a8 ? a7.top : a5.top) - a2.y - a4
            } else {
                a2.height = ba.height - a2.y
            }
            return {
                x: 0,
                y: a9 ? a2.y : 0,
                width: a9 ? a2.width : 0,
                height: a9 ? a2.height : 0
            }
        };
        this.destroy = function () {
            j.removeEventListener("webkitfullscreenchange", I, v);
            j.removeEventListener("mozfullscreenchange", I, v);
            aj.removeEventListener("webkitbeginfullscreen", I, v);
            aj.removeEventListener("webkitendfullscreen", I, v);
            j.removeEventListener("keydown", aD, v);
            if (ap) {
                ap.destroy()
            }
        };
        aI()
    };
    u("." + r, {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": A.isMobile() ? 200 : 0,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + t, {
        position: l,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + B + " ,." + f, {
        position: l,
        height: q,
        width: q,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + B, {
        overflow: o,
        visibility: o,
        opacity: 0,
        cursor: "pointer"
    });
    u("." + B + " video", {
        background: "transparent",
        width: q,
        height: q
    });
    u("." + h, {
        position: l,
        height: q,
        width: q,
        display: a
    });
    u("." + C, {
        position: l,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    u("." + b, {
        display: "none"
    });
    u("." + r + "." + e, {
        height: "auto"
    });
    u(d, {
        width: q,
        height: q,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1000,
        position: "fixed"
    }, m);
    u(d + " ." + t, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, m);
    u(d + " ." + h, {
        display: a
    }, m);
    u("." + r + " .jwuniform", {
        "background-size": "contain" + x
    });
    u("." + r + " .jwfill", {
        "background-size": "cover" + x,
        "background-position": "center"
    });
    u("." + r + " .jwexactfit", {
        "background-size": q + " " + q + x
    })
})(jwplayer.html5);
(function (a) {
    a.html5 = {};
    a.html5.version = "6.5.3529"
})(jwplayer);
(function (a) {
    var f = document,
        d = window;
    a.serialize = function (h) {
        if (h == null) {
            return null
        } else {
            if (h.toString().toLowerCase() == "true") {
                return true
            } else {
                if (h.toString().toLowerCase() == "false") {
                    return false
                } else {
                    if (isNaN(Number(h)) || h.length > 5 || h.length == 0) {
                        return h
                    } else {
                        return Number(h)
                    }
                }
            }
        }
    };
    a.filterSources = function (j) {
        var n, o, h = a.extensionmap;
        if (j) {
            o = [];
            for (var l = 0; l < j.length; l++) {
                var m = j[l].type,
                    k = j[l].file;
                if (!m) {
                    m = h.extType(a.extension(k));
                    j[l].type = m
                }
                if (a.canPlayHTML5(m)) {
                    if (!n) {
                        n = m
                    }
                    if (m == n) {
                        o.push(a.extend({}, j[l]))
                    }
                }
            }
        }
        return o
    };
    a.canPlayHTML5 = function (h) {
        if (a.isAndroid() && (h == "hls" || h == "m3u" || h == "m3u8")) {
            return false
        }
        var i = a.extensionmap.types[h];
        return ( !! i && jwplayer.vid.canPlayType(i))
    };
    a.ajax = function (l, k, h) {
        var j;
        if (l.indexOf("#") > 0) {
            l = l.replace(/#.*$/, "")
        }
        if (b(l) && a.exists(d.XDomainRequest)) {
            j = new XDomainRequest();
            j.onload = e(j, l, k, h);
            j.onerror = c(h, l, j)
        } else {
            if (a.exists(d.XMLHttpRequest)) {
                j = new XMLHttpRequest();
                j.onreadystatechange = g(j, l, k, h);
                j.onerror = c(h, l)
            } else {
                if (h) {
                    h()
                }
            }
        }
        try {
            j.open("GET", l, true);
            j.send(null)
        } catch (i) {
            if (h) {
                h(l)
            }
        }
        return j
    };

    function b(h) {
        if (h && h.indexOf("://") >= 0) {
            if (h.split("/")[2] != d.location.href.split("/")[2]) {
                return true
            }
        }
        return false
    }

    function c(h, j, i) {
        return function () {
            h("Error loading file")
        }
    }

    function g(i, k, j, h) {
        return function () {
            if (i.readyState === 4) {
                switch (i.status) {
                case 200:
                    e(i, k, j, h)();
                    break;
                case 404:
                    h("File not found")
                }
            }
        }
    }

    function e(i, k, j, h) {
        return function () {
            try {
                var l = i.responseXML;
                if (l && l.firstChild) {
                    return j(i)
                }
            } catch (n) {}
            var m = a.parseXML(i.responseText);
            if (m && m.firstChild) {
                i = a.extend({}, i, {
                    responseXML: m
                })
            } else {
                if (h) {
                    h(i.responseText ? "Invalid XML" : k)
                }
                return
            }
            j(i)
        }
    }
    a.parseXML = function (h) {
        try {
            var i;
            if (d.DOMParser) {
                i = (new DOMParser()).parseFromString(h, "text/xml");
                try {
                    if (i.childNodes[0].firstChild.nodeName == "parsererror") {
                        return
                    }
                } catch (j) {}
            } else {
                i = new ActiveXObject("Microsoft.XMLDOM");
                i.async = "false";
                i.loadXML(h)
            }
            return i
        } catch (j) {
            return
        }
    };
    a.parseDimension = function (h) {
        if (typeof h == "string") {
            if (h === "") {
                return 0
            } else {
                if (h.lastIndexOf("%") > -1) {
                    return h
                } else {
                    return parseInt(h.replace("px", ""), 10)
                }
            }
        }
        return h
    };
    a.timeFormat = function (j) {
        if (j > 0) {
            var i = Math.floor(j / 3600),
                k = Math.floor((j - i * 3600) / 60),
                h = Math.floor(j % 60);
            return (i ? i + ":" : "") + (k < 10 ? "0" : "") + k + ":" + (h < 10 ? "0" : "") + h
        } else {
            return "00:00"
        }
    };
    a.seconds = function (j) {
        j = j.replace(",", ".");
        var h = j.split(":");
        var i = 0;
        if (j.substr(-1) == "s") {
            i = Number(j.substr(0, j.length - 1))
        } else {
            if (j.substr(-1) == "m") {
                i = Number(j.substr(0, j.length - 1)) * 60
            } else {
                if (j.substr(-1) == "h") {
                    i = Number(j.substr(0, j.length - 1)) * 3600
                } else {
                    if (h.length > 1) {
                        i = Number(h[h.length - 1]);
                        i += Number(h[h.length - 2]) * 60;
                        if (h.length == 3) {
                            i += Number(h[h.length - 3]) * 3600
                        }
                    } else {
                        i = Number(j)
                    }
                }
            }
        }
        return i
    };
    a.bounds = function (i) {
        if (!i) {
            return {
                left: 0,
                right: 0,
                width: 0,
                height: 0,
                top: 0,
                bottom: 0
            }
        }
        var m = i,
            l = 0,
            k = 0,
            j = isNaN(i.offsetWidth) ? 0 : i.offsetWidth,
            h = isNaN(i.offsetHeight) ? 0 : i.offsetHeight;
        do {
            l += isNaN(m.offsetLeft) ? 0 : m.offsetLeft;
            k += isNaN(m.offsetTop) ? 0 : m.offsetTop
        } while (m = m.offsetParent);
        return {
            left: l,
            top: k,
            width: j,
            height: h,
            right: l + j,
            bottom: k + h
        }
    };
    a.empty = function (h) {
        if (!h) {
            return
        }
        while (h.childElementCount > 0) {
            h.removeChild(h.children[0])
        }
    }
})(jwplayer.utils);
(function (p) {
    var a = {}, n, c = {}, j = 0,
        o = p.exists,
        d = p.foreach,
        e = {}, f = false,
        b = ".jwplayer ";

    function l() {
        var r = document.createElement("style");
        r.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(r);
        return r
    }
    var m = p.css = function (r, t, s) {
        if (!a[r]) {
            if (f) {
                a[r] = l()
            } else {
                if (!n || n.sheet.cssRules.length > 50000) {
                    n = l()
                }
                a[r] = n
            }
        }
        if (!o(s)) {
            s = false
        }
        if (!c[r]) {
            c[r] = {}
        }
        d(t, function (u, v) {
            v = q(u, v, s);
            if (o(c[r][u]) && !o(v)) {
                delete c[r][u]
            } else {
                if (o(v)) {
                    c[r][u] = v
                }
            }
        });
        if (j > 0) {
            return
        }
        k(r)
    };
    m.block = function () {
        j++
    };
    m.unblock = function () {
        j = Math.max(j - 1, 0);
        if (j == 0) {
            i()
        }
    };
    var i = function () {
        d(a, function (r, s) {
            k(r)
        })
    };

    function q(t, u, r) {
        if (typeof u === "undefined") {
            return undefined
        }
        var s = r ? " !important" : "";
        if (!isNaN(u)) {
            switch (t) {
            case "z-index":
            case "opacity":
                return u + s;
                break;
            default:
                if (t.match(/color/i)) {
                    return "#" + p.pad(u.toString(16).replace(/^0x/i, ""), 6) + s
                } else {
                    if (u === 0) {
                        return 0 + s
                    } else {
                        return Math.ceil(u) + "px" + s
                    }
                }
                break
            }
        } else {
            if ( !! u.match(/png|gif|jpe?g/i) && u.indexOf("url") < 0) {
                return "url(" + u + ")"
            }
            return u + s
        }
    }

    function k(r) {
        if (f) {
            a[r].innerHTML = g(r);
            return
        }
        var s = a[r].sheet,
            t = e[r];
        if (s) {
            var u = s.cssRules;
            if (p.exists(t) && t < u.length && u[t].selectorText == r) {
                s.deleteRule(t)
            } else {
                e[r] = u.length
            }
            s.insertRule(g(r), e[r])
        }
    }

    function g(r) {
        var s = r + "{\n";
        var t = c[r];
        d(t, function (u, v) {
            s += "  " + u + ": " + v + ";\n"
        });
        s += "}\n";
        return s
    }
    p.clearCss = function (r) {
        d(c, function (s, t) {
            if (s.indexOf(r) >= 0) {
                delete c[s]
            }
        });
        d(a, function (s, t) {
            if (s.indexOf(r) >= 0) {
                k(s)
            }
        })
    };
    p.transform = function (s, u) {
        var r = "-transform",
            t;
        u = u ? u : "";
        if (typeof s == "string") {
            t = {};
            t["-webkit" + r] = u;
            t["-ms" + r] = u;
            t["-moz" + r] = u;
            t["-o" + r] = u;
            p.css(s, t)
        } else {
            r = "Transform";
            t = s.style;
            t["webkit" + r] = u;
            t["Moz" + r] = u;
            t["ms" + r] = u;
            t["O" + r] = u
        }
    };
    p.dragStyle = function (r, s) {
        p.css(r, {
            "-webkit-user-select": s,
            "-moz-user-select": s,
            "-ms-user-select": s,
            "-webkit-user-drag": s,
            "user-select": s,
            "user-drag": s
        })
    };
    p.transitionStyle = function (r, s) {
        if (navigator.userAgent.match(/5\.\d(\.\d)? safari/i)) {
            return
        }
        p.css(r, {
            "-webkit-transition": s,
            "-moz-transition": s,
            "-o-transition": s
        })
    };
    p.rotate = function (r, s) {
        p.transform(r, "rotate(" + s + "deg)")
    };

    function h() {
        m(b + ["", "div", "span", "a", "img", "ul", "li", "video"].join("," + b) + ", .jwclick", {
            margin: 0,
            padding: 0,
            border: 0,
            color: "#000000",
            "font-size": "100%",
            font: "inherit",
            "vertical-align": "baseline",
            "background-color": "transparent",
            "text-align": "left",
            direction: "ltr"
        });
        m(b + "ul", {
            "list-style": "none"
        })
    }
    h()
})(jwplayer.utils);
(function (a) {
    a.scale = function (e, d, c, h, i) {
        var g, f = a.exists;
        if (!f(d)) {
            d = 1
        }
        if (!f(c)) {
            c = 1
        }
        if (!f(h)) {
            h = 0
        }
        if (!f(i)) {
            i = 0
        }
        if (d == 1 && c == 1 && h == 0 && i == 0) {
            g = ""
        } else {
            g = "scale(" + d + "," + c + ") translate(" + h + "px," + i + "px)"
        }
        a.transform(e, g)
    };
    a.stretch = function (k, p, o, h, m, i) {
        if (!p) {
            return
        }
        if (!k) {
            k = b.UNIFORM
        }
        if (!o || !h || !m || !i) {
            return
        }
        var d = o / m,
            g = h / i,
            n = 0,
            j = 0,
            c = {}, e = (p.tagName.toLowerCase() == "video"),
            f = false,
            l;
        if (e) {
            a.transform(p)
        }
        l = "jw" + k.toLowerCase();
        switch (k.toLowerCase()) {
        case b.FILL:
            if (d > g) {
                m = m * d;
                i = i * d
            } else {
                m = m * g;
                i = i * g
            }
        case b.NONE:
            d = g = 1;
        case b.EXACTFIT:
            f = true;
            break;
        case b.UNIFORM:
        default:
            if (d > g) {
                if (m * g / o > 0.95) {
                    f = true;
                    l = "jwexactfit"
                } else {
                    m = m * g;
                    i = i * g
                }
            } else {
                if (i * d / h > 0.95) {
                    f = true;
                    l = "jwexactfit"
                } else {
                    m = m * d;
                    i = i * d
                }
            } if (f) {
                g = Math.ceil(100 * h / i) / 100;
                d = Math.ceil(100 * o / m) / 100
            }
            break
        }
        if (e) {
            if (f) {
                p.style.width = m + "px";
                p.style.height = i + "px";
                n = ((o - m) / 2) / d;
                j = ((h - i) / 2) / g;
                a.scale(p, d, g, n, j)
            } else {
                p.style.width = "";
                p.style.height = ""
            }
        } else {
            p.className = p.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "");
            p.className += " " + l
        }
    };
    var b = a.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    }
})(jwplayer.utils);
(function (a) {
    a.parsers = {
        localName: function (b) {
            if (!b) {
                return ""
            } else {
                if (b.localName) {
                    return b.localName
                } else {
                    if (b.baseName) {
                        return b.baseName
                    } else {
                        return ""
                    }
                }
            }
        },
        textContent: function (b) {
            if (!b) {
                return ""
            } else {
                if (b.textContent) {
                    return b.textContent
                } else {
                    if (b.text) {
                        return b.text
                    } else {
                        return ""
                    }
                }
            }
        },
        getChildNode: function (c, b) {
            return c.childNodes[b]
        },
        numChildren: function (b) {
            if (b.childNodes) {
                return b.childNodes.length
            } else {
                return 0
            }
        }
    }
})(jwplayer.html5);
(function (a) {
    a.dfxp = function (g, b) {
        var d, c, i = jwplayer.utils.seconds;

        function h(k) {
            if (k == 0) {
                b("Crossdomain loading denied: " + c)
            } else {
                if (k == 404) {
                    b("DFXP File not found: " + c)
                } else {
                    b("Error " + k + " loading DFXP file: " + c)
                }
            }
        }
        this.load = function (l) {
            c = l;
            try {
                d.open("GET", l, true);
                d.send(null)
            } catch (k) {
                b("Error loading DFXP File: " + l)
            }
        };

        function f(o) {
            var l = [{
                begin: 0,
                text: ""
            }];
            o = o.replace(/^\s+/, "").replace(/\s+$/, "");
            var n = o.split("</p>");
            var p = [];
            for (var k = 0; k < n.length; k++) {
                if (n[k].indexOf("<p") >= 0) {
                    n[k] = n[k].substr(n[k].indexOf("<p") + 2).replace(/^\s+/, "").replace(/\s+$/, "");
                    p.push(n[k])
                }
            }
            n = p;
            for (k = 0; k < n.length; k++) {
                var m = j(n[k]);
                if (m.text) {
                    l.push(m);
                    if (m.end) {
                        l.push({
                            begin: m.end,
                            text: ""
                        });
                        delete m.end
                    }
                }
            }
            if (l.length > 1) {
                g(l)
            } else {
                b("Invalid DFXP file: " + c)
            }
        }

        function j(n) {
            var m = {};
            try {
                var k = n.indexOf('begin="');
                n = n.substr(k + 7);
                k = n.indexOf('" end="');
                m.begin = i(n.substr(0, k));
                n = n.substr(k + 7);
                k = n.indexOf('">');
                m.end = i(n.substr(0, k));
                n = n.substr(k + 2);
                m.text = n
            } catch (l) {}
            return m
        }

        function e() {
            d = new XMLHttpRequest();
            d.onreadystatechange = function () {
                if (d.readyState === 4) {
                    if (d.status === 200) {
                        f(d.responseText)
                    } else {
                        h(d.status)
                    }
                }
            }
        }
        e()
    }
})(jwplayer.html5.parsers);
(function (b) {
    var a = b.html5.parsers;
    var d = a.jwparser = function () {};
    var c = "jwplayer";
    d.parseEntry = function (l, p) {
        var e = [],
            n = [],
            m = b.utils.xmlAttribute,
            f = "default",
            q = "label",
            j = "file",
            o = "type";
        for (var k = 0; k < l.childNodes.length; k++) {
            var h = l.childNodes[k];
            if (h.prefix == c) {
                var g = a.localName(h);
                if (g == "source") {
                    delete p.sources;
                    e.push({
                        file: m(h, j),
                        "default": m(h, f),
                        label: m(h, q),
                        type: m(h, o)
                    })
                } else {
                    if (g == "track") {
                        delete p.tracks;
                        n.push({
                            file: m(h, j),
                            "default": m(h, f),
                            kind: m(h, "kind"),
                            label: m(h, q)
                        })
                    } else {
                        p[g] = b.utils.serialize(a.textContent(h));
                        if (g == "file" && p.sources) {
                            delete p.sources
                        }
                    }
                }
            }
            if (!p[j]) {
                p[j] = p.link
            }
        }
        if (e.length) {
            p.sources = [];
            for (k = 0; k < e.length; k++) {
                if (e[k].file.length > 0) {
                    e[k][f] = (e[k][f] == "true") ? true : false;
                    if (!e[k].label.length) {
                        delete e[k].label
                    }
                    p.sources.push(e[k])
                }
            }
        }
        if (n.length) {
            p.tracks = [];
            for (k = 0; k < n.length; k++) {
                if (n[k].file.length > 0) {
                    n[k][f] = (n[k][f] == "true") ? true : false;
                    n[k].kind = (!n[k].kind.length) ? "captions" : n[k].kind;
                    if (!n[k].label.length) {
                        delete n[k].label
                    }
                    p.tracks.push(n[k])
                }
            }
        }
        return p
    }
})(jwplayer);
(function (e) {
    var b = jwplayer.utils,
        h = b.xmlAttribute,
        c = e.localName,
        a = e.textContent,
        d = e.numChildren;
    var g = e.mediaparser = function () {};
    var f = "media";
    g.parseGroup = function (m, q) {
        var k, n, p = "tracks",
            o = [];

        function l(i) {
            var s = {
                zh: "Chinese",
                nl: "Dutch",
                en: "English",
                fr: "French",
                de: "German",
                it: "Italian",
                ja: "Japanese",
                pt: "Portuguese",
                ru: "Russian",
                es: "Spanish"
            };
            if (s[i]) {
                return s[i]
            }
            return i
        }
        for (n = 0; n < d(m); n++) {
            k = m.childNodes[n];
            if (k.prefix == f) {
                if (!c(k)) {
                    continue
                }
                switch (c(k).toLowerCase()) {
                case "content":
                    if (h(k, "duration")) {
                        q.duration = b.seconds(h(k, "duration"))
                    }
                    if (d(k) > 0) {
                        q = g.parseGroup(k, q)
                    }
                    if (h(k, "url")) {
                        if (!q.sources) {
                            q.sources = []
                        }
                        q.sources.push({
                            file: h(k, "url"),
                            type: h(k, "type"),
                            width: h(k, "width"),
                            label: h(k, "label")
                        })
                    }
                    break;
                case "title":
                    q.title = a(k);
                    break;
                case "description":
                    q.description = a(k);
                    break;
                case "guid":
                    q.mediaid = a(k);
                    break;
                case "thumbnail":
                    if (!q.image) {
                        q.image = h(k, "url")
                    }
                    break;
                case "player":
                    var j = k.url;
                    break;
                case "group":
                    g.parseGroup(k, q);
                    break;
                case "subtitle":
                    var r = {};
                    r.file = h(k, "url");
                    r.kind = "captions";
                    if (h(k, "lang").length > 0) {
                        r.label = l(h(k, "lang"))
                    }
                    o.push(r)
                }
            }
        }
        if (!q.hasOwnProperty(p)) {
            q[p] = []
        }
        for (n = 0; n < o.length; n++) {
            q[p].push(o[n])
        }
        return q
    }
})(jwplayer.html5.parsers);
(function (g) {
    var b = jwplayer.utils,
        a = g.textContent,
        e = g.getChildNode,
        f = g.numChildren,
        d = g.localName;
    g.rssparser = {};
    g.rssparser.parse = function (o) {
        var h = [];
        for (var m = 0; m < f(o); m++) {
            var n = e(o, m),
                k = d(n).toLowerCase();
            if (k == "channel") {
                for (var l = 0; l < f(n); l++) {
                    var p = e(n, l);
                    if (d(p).toLowerCase() == "item") {
                        h.push(c(p))
                    }
                }
            }
        }
        return h
    };

    function c(l) {
        var m = {};
        for (var j = 0; j < l.childNodes.length; j++) {
            var k = l.childNodes[j];
            var h = d(k);
            if (!h) {
                continue
            }
            switch (h.toLowerCase()) {
            case "enclosure":
                m.file = b.xmlAttribute(k, "url");
                break;
            case "title":
                m.title = a(k);
                break;
            case "guid":
                m.mediaid = a(k);
                break;
            case "pubdate":
                m.date = a(k);
                break;
            case "description":
                m.description = a(k);
                break;
            case "link":
                m.link = a(k);
                break;
            case "category":
                if (m.tags) {
                    m.tags += a(k)
                } else {
                    m.tags = a(k)
                }
                break
            }
        }
        m = g.mediaparser.parseGroup(l, m);
        m = g.jwparser.parseEntry(l, m);
        return new jwplayer.playlist.item(m)
    }
})(jwplayer.html5.parsers);
(function (a) {
    a.srt = function (i, b, f) {
        var e, d, m = jwplayer.utils,
            l = m.seconds;

        function j(n) {
            if (n == 0) {
                b("Crossdomain loading denied: " + d)
            } else {
                if (n == 404) {
                    b("SRT File not found: " + d)
                } else {
                    b("Error " + n + " loading SRT file: " + d)
                }
            }
        }
        this.load = function (o) {
            d = o;
            try {
                if (c(o) && m.exists(window.XDomainRequest)) {
                    e = new XDomainRequest();
                    e.onload = function () {
                        var p = e.responseText;
                        h(p)
                    };
                    e.onerror = function () {
                        var p = e.status;
                        j(p)
                    }
                }
                e.open("GET", o, true);
                e.send(null)
            } catch (n) {
                b("Error loading SRT File: " + o)
            }
        };

        function h(r) {
            var o = f ? [] : [{
                begin: 0,
                text: ""
            }];
            r = r.replace(/^\s+/, "").replace(/\s+$/, "");
            var q = r.split("\r\n\r\n");
            if (q.length == 1) {
                q = r.split("\n\n")
            }
            for (var n = 0; n < q.length; n++) {
                if (q[n] == "WEBVTT") {
                    continue
                }
                var p = k(q[n]);
                if (p.text) {
                    o.push(p);
                    if (p.end && !f) {
                        o.push({
                            begin: p.end,
                            text: ""
                        });
                        delete p.end
                    }
                }
            }
            if (o.length > 1) {
                i(o)
            } else {
                b("Invalid SRT file: " + d)
            }
        }

        function k(s) {
            var r = {};
            var t = s.split("\r\n");
            if (t.length == 1) {
                t = s.split("\n")
            }
            try {
                var n = 1;
                if (t[0].indexOf(" --> ") > 0) {
                    n = 0
                }
                var p = t[n].indexOf(" --> ");
                if (p > 0) {
                    r.begin = l(t[n].substr(0, p));
                    r.end = l(t[n].substr(p + 5))
                }
                if (t[n + 1]) {
                    r.text = t[n + 1];
                    for (var q = n + 2; q < t.length; q++) {
                        r.text += "<br/>" + t[q]
                    }
                }
            } catch (o) {}
            return r
        }

        function c(n) {
            if (n && n.indexOf("://") >= 0) {
                if (n.split("/")[2] != window.location.href.split("/")[2]) {
                    return true
                }
            }
            return false
        }

        function g() {
            e = new XMLHttpRequest();
            e.onreadystatechange = function () {
                if (e.readyState === 4) {
                    if (e.status === 200) {
                        h(e.responseText)
                    } else {
                        j(e.status)
                    }
                }
            }
        }
        g()
    }
})(jwplayer.html5.parsers);
(function (e) {
    var j = jwplayer.utils,
        k = jwplayer.events,
        l = k.state,
        h = j.css,
        g = "playing",
        i = document,
        a = ".jwcaptions",
        b = "absolute",
        c = "none",
        f = "100%",
        d = "hidden";
    e.captions = function (I, u) {
        var O = I,
            v, w, L = {
                back: true,
                color: "#FFFFFF",
                fontSize: 15
            }, K = {
                fontFamily: "Arial,sans-serif",
                fontStyle: "normal",
                fontWeight: "normal",
                textDecoration: "none"
            }, S, R, y, s = [],
            r = 0,
            T = false,
            G, B = new k.eventdispatcher();
        j.extend(this, B);

        function E() {
            v = i.createElement("div");
            v.id = O.id + "_caption";
            v.className = "jwcaptions";
            O.jwAddEventListener(k.JWPLAYER_PLAYER_STATE, C);
            O.jwAddEventListener(k.JWPLAYER_PLAYLIST_ITEM, N);
            O.jwAddEventListener(k.JWPLAYER_MEDIA_ERROR, M);
            O.jwAddEventListener(k.JWPLAYER_ERROR, M);
            O.jwAddEventListener(k.JWPLAYER_READY, t);
            O.jwAddEventListener(k.JWPLAYER_MEDIA_TIME, m);
            O.jwAddEventListener(k.JWPLAYER_FULLSCREEN, x);
            O.jwAddEventListener(k.JWPLAYER_RESIZE, n)
        }

        function n(V) {
            q(false)
        }

        function M(V) {
            j.log("CAPTIONS(" + V + ")")
        }

        function H() {
            R = "idle";
            q(false)
        }

        function C(V) {
            switch (V.newstate) {
            case l.IDLE:
                H();
                break;
            case l.PLAYING:
                A();
                break
            }
        }

        function x(V) {
            T = V.fullscreen;
            if (V.fullscreen) {
                J();
                setTimeout(J, 500)
            } else {
                q(true)
            }
        }

        function J() {
            var V = v.offsetHeight,
                W = v.offsetWidth;
            if (V != 0 && W != 0) {
                S.resize(W, Math.round(V * 0.94))
            }
        }

        function N(W) {
            y = 0;
            s = [];
            S.update(0);
            var ae = O.jwGetPlaylist()[O.jwGetPlaylistIndex()],
                ab = ae.tracks,
                aa = [],
                Z = 0,
                ac = "",
                V = 0,
                X = "";
            for (Z = 0; Z < ab.length; Z++) {
                var Y = ab[Z].kind.toLowerCase();
                if (Y == "captions" || Y == "subtitles") {
                    aa.push(ab[Z])
                }
            }
            r = 0;
            for (Z = 0; Z < aa.length; Z++) {
                X = aa[Z].file;
                if (X) {
                    if (!aa[Z].label) {
                        aa[Z].label = Z.toString()
                    }
                    s.push(aa[Z])
                }
            }
            for (Z = 0; Z < s.length; Z++) {
                if (s[Z]["default"]) {
                    V = Z + 1;
                    break
                }
            }
            var ad = j.getCookies(),
                ac = ad.captionLabel;
            if (ac) {
                ab = p();
                for (Z = 0; Z < ab.length; Z++) {
                    if (ac == ab[Z].label) {
                        V = Z;
                        break
                    }
                }
            }
            o(V);
            q(false);
            P(k.JWPLAYER_CAPTIONS_LIST, p(), r)
        }

        function U(V) {
            G = V;
            j.ajax(V, z, F)
        }

        function z(W) {
            var X = W.responseXML.firstChild,
                V;
            if (e.parsers.localName(X) == "tt") {
                V = new jwplayer.html5.parsers.dfxp(Q, M)
            } else {
                V = new jwplayer.html5.parsers.srt(Q, M)
            }
            V.load(G)
        }

        function F(W) {
            var V = new jwplayer.html5.parsers.srt(Q, M);
            V.load(G)
        }

        function Q(V) {
            S.populate(V);
            if (y < s.length) {
                s[y].data = V
            }
            q(false)
        }

        function A(V) {
            R = g;
            q(false)
        }

        function q(V) {
            if (j.isMobile() || !s.length) {
                S.hide()
            } else {
                if (R == g && r > 0) {
                    S.show();
                    if (T) {
                        x({
                            fullscreen: true
                        });
                        return
                    }
                    D();
                    if (V) {
                        setTimeout(D, 500)
                    }
                } else {
                    S.hide()
                }
            }
        }

        function D() {
            S.resize()
        }

        function t() {
            j.foreach(L, function (V, W) {
                if (u && u[V.toLowerCase()] != undefined) {
                    if (V == "color") {
                        K.color = "#" + String(u.color).substr(-6)
                    } else {
                        K[V] = u[V.toLowerCase()]
                    }
                } else {
                    K[V] = W
                }
            });
            S = new jwplayer.html5.captions.renderer(K, v);
            q(false)
        }

        function o(V) {
            if (V > 0) {
                y = V - 1;
                r = V
            } else {
                r = 0
            } if (y >= s.length) {
                return
            }
            if (s[y].data) {
                S.populate(s[y].data)
            } else {
                U(s[y].file)
            }
            q(false)
        }

        function m(V) {
            S.update(V.position)
        }

        function P(Y, X, W) {
            var V = {
                type: Y,
                tracks: X,
                track: W
            };
            B.sendEvent(Y, V)
        }

        function p() {
            var W = new Array();
            W.push({
                label: "Off"
            });
            for (var V = 0; V < s.length; V++) {
                W.push({
                    label: s[V].label
                })
            }
            return W
        }
        this.element = function () {
            return v
        };
        this.getCaptionsList = function () {
            return p()
        };
        this.getCurrentCaptions = function () {
            return r
        };
        this.setCurrentCaptions = function (W) {
            if (W >= 0 && r != W && W <= s.length) {
                o(W);
                var V = p();
                j.saveCookie("captionLabel", V[r].label);
                P(k.JWPLAYER_CAPTIONS_CHANGED, V, r)
            }
        };
        E()
    };
    h(a, {
        position: b,
        cursor: "pointer",
        width: f,
        height: f,
        overflow: d
    })
})(jwplayer.html5);
(function (a) {
    var b = jwplayer.utils.foreach;
    a.captions.renderer = function (q, h) {
        var p, g, o, j, n, k, c = "visible",
            f;
        this.hide = function () {
            d(g, {
                display: "none"
            });
            if (f) {
                clearInterval(f);
                f = null
            }
        };
        this.populate = function (r) {
            j = -1;
            p = r;
            e()
        };

        function l(r) {
            d(g, {
                visibility: "hidden"
            });
            o.innerHTML = r;
            if (r == "") {
                c = "hidden"
            } else {
                c = "visible"
            }
            setTimeout(m, 20)
        }
        this.resize = function () {
            m()
        };

        function m() {
            var t = g.clientWidth,
                s = Math.round(q.fontSize * Math.pow(t / 400, 0.6)),
                r = Math.round(s * 1.4);
            d(o, {
                maxWidth: t + "px",
                fontSize: s + "px",
                lineHeight: r + "px",
                visibility: c
            })
        }

        function e() {
            var s = -1;
            for (var r = 0; r < p.length; r++) {
                if (p[r]["begin"] <= k && (r == p.length - 1 || p[r + 1]["begin"] >= k)) {
                    s = r;
                    break
                }
            }
            if (s == -1) {
                l("")
            } else {
                if (s != j) {
                    j = s;
                    l(p[r]["text"])
                }
            }
        }

        function i() {
            g = document.createElement("div");
            o = document.createElement("span");
            g.appendChild(o);
            h.appendChild(g);
            d(g, {
                display: "block",
                height: "auto",
                position: "absolute",
                bottom: "20px",
                textAlign: "center",
                width: "100%"
            });
            d(o, {
                color: "#" + q.color.substr(-6),
                display: "inline-block",
                fontFamily: q.fontFamily,
                fontStyle: q.fontStyle,
                fontWeight: q.fontWeight,
                height: "auto",
                margin: "auto",
                position: "relative",
                textAlign: "center",
                textDecoration: q.textDecoration,
                wordWrap: "break-word",
                width: "auto"
            });
            if (q.back) {
                d(o, {
                    background: "#000"
                })
            } else {
                d(o, {
                    textShadow: "-2px 0px 1px #000,2px 0px 1px #000,0px -2px 1px #000,0px 2px 1px #000,-1px 1px 1px #000,1px 1px 1px #000,1px -1px 1px #000,1px 1px 1px #000"
                })
            }
        }
        i();
        this.show = function () {
            d(g, {
                display: "block"
            });
            if (!f) {
                f = setInterval(m, 250)
            }
            m()
        };

        function d(s, r) {
            b(r, function (t, u) {
                s.style[t] = u
            })
        }
        this.update = function (r) {
            k = r;
            if (p) {
                e()
            }
        }
    }
})(jwplayer.html5);
(function (p) {
    var l = p.html5,
        y = p.utils,
        c = p.events,
        g = c.state,
        s = y.css,
        B = y.transitionStyle,
        d = "button",
        r = "text",
        h = "divider",
        u = "slider",
        j = "relative",
        k = "absolute",
        b = "none",
        q = "block",
        z = "inline",
        o = "inline-block",
        m = "hidden",
        e = "left",
        F = "right",
        n = "100%",
        w = "opacity .15s, background .15s, visibility .15s",
        D = 150,
        v = {
            display: b
        }, a = {
            display: E
        }, C = ".jwcontrolbar",
        t = false,
        i = true,
        A = null,
        E = undefined,
        x = window,
        f = document;
    l.controlbar = function (ai, aY) {
        var bc, Y, N = ao("divider", h),
            J = {
                margin: 8,
                maxwidth: 800,
                font: "Arial,sans-serif",
                fontsize: 11,
                fontcolor: parseInt("eeeeee", 16),
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [ao("play", d), N, ao("prev", d), ao("next", d), ao("divider", h, "nextdiv"), ao("elapsed", r)]
                    },
                    center: {
                        position: "center",
                        elements: [ao("time", u)]
                    },
                    right: {
                        position: "right",
                        elements: [ao("duration", r), N, ao("hd", d), ao("cc", d), N, ao("mute", d), ao("volume", u), N, ao("fullscreen", d)]
                    }
                }
            }, aI, bf, ax, R, bv, aN, bG, an, ba, ay, br, ak, by, bp, aM, aC, Z, bo, bJ, ar, ap, bD, U, aZ, aD, M, a2, a9, bb = t,
            aX = t,
            a0 = 0,
            W = 0,
            bz = {
                play: "pause",
                mute: "unmute",
                fullscreen: "normalscreen"
            }, bL = {
                play: t,
                mute: t,
                fullscreen: t
            }, bk = {
                play: al,
                mute: bF,
                fullscreen: aU,
                next: bd,
                prev: aL
            }, bI = {
                time: bK,
                volume: aT
            }, O = {}, ah = this;

        function ao(bN, bP, bO) {
            return {
                name: bN,
                type: bP,
                className: bO
            }
        }

        function bj() {
            ax = {};
            bc = ai;
            aN = bc.id + "_controlbar";
            bG = an = 0;
            bv = aQ();
            bv.id = aN;
            bv.className = "jwcontrolbar";
            Y = bc.skin;
            bf = Y.getComponentLayout("controlbar");
            if (!bf) {
                bf = J.layout
            }
            y.clearCss("#" + aN);
            bC();
            a1();
            aa();
            setTimeout(function () {
                P();
                bE()
            }, 0);
            at();
            ah.visible = false
        }

        function aa() {
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_TIME, bm);
            bc.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, ad);
            bc.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, aV);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_MUTE, bE);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_VOLUME, P);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_BUFFER, ag);
            bc.jwAddEventListener(c.JWPLAYER_FULLSCREEN, az);
            bc.jwAddEventListener(c.JWPLAYER_PLAYLIST_LOADED, at);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_LEVELS, bH);
            bc.jwAddEventListener(c.JWPLAYER_MEDIA_LEVEL_CHANGED, bh);
            bc.jwAddEventListener(c.JWPLAYER_CAPTIONS_LIST, bx);
            bc.jwAddEventListener(c.JWPLAYER_CAPTIONS_CHANGED, am);
            bv.addEventListener("mouseover", function (bN) {
                x.addEventListener("mousemove", T, t);
                x.addEventListener("mouseup", T, t);
                x.addEventListener("mousedown", aF, t)
            }, false);
            bv.addEventListener("mouseout", function (bN) {
                x.removeEventListener("mousemove", T);
                x.removeEventListener("mouseup", T);
                x.removeEventListener("mousedown", aF);
                f.onselectstart = null
            }, false)
        }

        function bm(bO) {
            var bN = t,
                bP;
            if (ax.elapsed) {
                bP = y.timeFormat(bO.position);
                ax.elapsed.innerHTML = bP;
                bN = (bP.length != y.timeFormat(an).length)
            }
            if (ax.duration) {
                bP = y.timeFormat(bO.duration);
                ax.duration.innerHTML = bP;
                bN = (bN || (bP.length != y.timeFormat(bG).length))
            }
            if (bO.duration > 0) {
                av(bO.position / bO.duration)
            } else {
                av(0)
            }
            bG = bO.duration;
            an = bO.position;
            if (bN) {
                aS()
            }
        }

        function ad(bN) {
            switch (bN.newstate) {
            case g.BUFFERING:
            case g.PLAYING:
                s(aW(".jwtimeSliderThumb"), {
                    opacity: 1
                });
                L("play", i);
                break;
            case g.PAUSED:
                if (!aX) {
                    L("play", t)
                }
                break;
            case g.IDLE:
                L("play", t);
                s(aW(".jwtimeSliderThumb"), {
                    opacity: 0
                });
                if (ax.timeRail) {
                    ax.timeRail.className = "jwrail";
                    setTimeout(function () {
                        ax.timeRail.className += " jwsmooth"
                    }, 100)
                }
                au(0);
                bm({
                    position: 0,
                    duration: 0
                });
                break
            }
        }

        function aV(bN) {
            var bO = bc.jwGetPlaylist()[bN.index].tracks;
            if (y.typeOf(bO) == "array") {
                for (var bP = 0; bP < bO.length; bP++) {
                    if (bO[bP].file && bO[bP].kind && bO[bP].kind.toLowerCase() == "thumbnails") {
                        ar.load(bO[bP].file);
                        return
                    }
                }
            }
            ar.load()
        }

        function bE() {
            var bN = bc.jwGetMute();
            L("mute", bN);
            H(bN ? 0 : by)
        }

        function P() {
            by = bc.jwGetVolume() / 100;
            H(by)
        }

        function ag(bN) {
            au(bN.bufferPercent / 100)
        }

        function az(bN) {
            L("fullscreen", bN.fullscreen);
            bt()
        }

        function at(bN) {
            s(aW(".jwhd"), v);
            s(aW(".jwcc"), v);
            bt();
            aS()
        }

        function bH(bN) {
            ba = bN.levels;
            if (ba && ba.length > 1 && U) {
                s(aW(".jwhd"), {
                    display: E
                });
                U.clearOptions();
                for (var bO = 0; bO < ba.length; bO++) {
                    U.addOption(ba[bO].label, bO)
                }
                bh(bN)
            } else {
                s(aW(".jwhd"), {
                    display: "none"
                })
            }
            aS()
        }

        function bh(bN) {
            ay = bN.currentQuality;
            if (U && ay >= 0) {
                U.setActive(bN.currentQuality)
            }
        }

        function bx(bN) {
            br = bN.tracks;
            if (br && br.length > 1 && aD) {
                s(aW(".jwcc"), {
                    display: E
                });
                aD.clearOptions();
                for (var bO = 0; bO < br.length; bO++) {
                    aD.addOption(br[bO].label, bO)
                }
                am(bN)
            } else {
                s(aW(".jwcc"), {
                    display: "none"
                })
            }
            aS()
        }

        function am(bN) {
            if (!br) {
                return
            }
            ak = bN.track;
            if (aD && ak >= 0) {
                aD.setActive(bN.track)
            }
        }

        function bs() {
            return ( !! f.querySelector("#" + bc.id + " .jwplaylist") && !bc.jwGetFullscreen())
        }

        function bC() {
            aI = y.extend({}, J, Y.getComponentSettings("controlbar"), aY);
            R = aJ("background").height;
            s("#" + aN, {
                height: R,
                bottom: bb ? 0 : aI.margin
            });
            s(aW(".jwtext"), {
                font: aI.fontsize + "px/" + aJ("background").height + "px " + aI.font,
                color: aI.fontcolor,
                "font-weight": aI.fontweight
            });
            s(aW(".jwoverlay"), {
                bottom: R
            });
            if (aI.maxwidth > 0) {
                s(aW(), {
                    "max-width": aI.maxwidth
                })
            }
        }

        function aW(bN) {
            return "#" + aN + (bN ? " " + bN : "")
        }

        function aQ() {
            return bw("span")
        }

        function bw(bN) {
            return f.createElement(bN)
        }

        function a1() {
            var bP = aq("capLeft");
            var bO = aq("capRight");
            var bN = aq("background", {
                position: k,
                left: aJ("capLeft").width,
                right: aJ("capRight").width,
                "background-repeat": "repeat-x"
            }, i);
            if (bN) {
                a3(bv, bN)
            }
            if (bP) {
                a3(bv, bP)
            }
            bl();
            if (bO) {
                a3(bv, bO)
            }
        }

        function aR(bN) {
            switch (bN.type) {
            case h:
                return aB(bN);
                break;
            case r:
                return bM(bN.name);
                break;
            case d:
                if (bN.name != "blank") {
                    return X(bN.name)
                }
                break;
            case u:
                return aw(bN.name);
                break
            }
        }

        function aq(bP, bO, bQ, bU, bR) {
            var bT = aQ();
            bT.className = "jw" + bP;
            var bN = bU ? " left center" : " center";
            var bV = aJ(bP);
            bT.innerHTML = "&nbsp;";
            if (!bV || bV.src == "") {
                return
            }
            var bS;
            if (bQ) {
                bS = {
                    background: "url('" + bV.src + "') repeat-x " + bN,
                    height: bR ? bV.height : E
                }
            } else {
                bS = {
                    background: "url('" + bV.src + "') no-repeat" + bN,
                    width: bV.width,
                    height: bR ? bV.height : E
                }
            }
            bT.skin = bV;
            s(aW(".jw" + bP), y.extend(bS, bO));
            ax[bP] = bT;
            return bT
        }

        function X(bP) {
            if (!aJ(bP + "Button").src) {
                return A
            }
            var bR = aQ();
            bR.className = "jw" + bP + " jwbuttoncontainer";
            var bQ = bw("button");
            bQ.addEventListener("click", aj(bP), t);
            bQ.innerHTML = "&nbsp;";
            a3(bR, bQ);
            var bS = aJ(bP + "Button");
            var bO = aJ(bP + "ButtonOver");
            bg(aW(".jw" + bP + " button"), bS, bO);
            var bN = bz[bP];
            if (bN) {
                bg(aW(".jw" + bP + ".jwtoggle button"), aJ(bN + "Button"), aJ(bN + "ButtonOver"))
            }
            ax[bP] = bR;
            return bR
        }

        function bg(bN, bO, bP) {
            if (!bO.src) {
                return
            }
            s(bN, {
                width: bO.width,
                background: "url(" + bO.src + ") center no-repeat"
            });
            if (bP.src) {
                s(bN + ":hover", {
                    background: "url(" + bP.src + ") center no-repeat"
                })
            }
        }

        function aj(bN) {
            return function (bO) {
                if (bk[bN]) {
                    bk[bN]()
                }
                bO.preventDefault()
            }
        }

        function al() {
            if (bL.play) {
                bc.jwPause()
            } else {
                bc.jwPlay()
            }
        }

        function bF() {
            bc.jwSetMute(!bL.mute);
            bE({
                mute: bL.mute
            })
        }

        function aP(bN) {
            y.foreach(O, function (bP, bO) {
                if (bP != bN) {
                    bO.hide()
                }
            })
        }

        function V() {
            if (bb) {
                return
            }
            bp.show();
            aP("volume")
        }

        function aT(bN) {
            H(bN);
            if (bN < 0.1) {
                bN = 0
            }
            if (bN > 0.9) {
                bN = 1
            }
            bc.jwSetVolume(bN * 100)
        }

        function bu() {
            if (bb) {
                return
            }
            M.show();
            aP("fullscreen")
        }

        function bK(bN) {
            bc.jwSeek(bN * bG)
        }

        function aU() {
            bc.jwSetFullscreen()
        }

        function bd() {
            bc.jwPlaylistNext()
        }

        function aL() {
            bc.jwPlaylistPrev()
        }

        function L(bN, bO) {
            if (!y.exists(bO)) {
                bO = !bL[bN]
            }
            if (ax[bN]) {
                ax[bN].className = "jw" + bN + (bO ? " jwtoggle jwtoggling" : " jwtoggling");
                setTimeout(function () {
                    ax[bN].className = ax[bN].className.replace(" jwtoggling", "")
                }, 100)
            }
            bL[bN] = bO
        }

        function aA(bN) {
            return aN + "_" + bN
        }

        function bM(bN, bR) {
            var bP = {};
            var bQ = aJ(bN + "Background");
            if (bQ.src) {
                var bO = aQ();
                bO.id = aA(bN);
                bO.className = "jwtext jw" + bN;
                bP.background = "url(" + bQ.src + ") no-repeat center";
                bP["background-size"] = "100% " + aJ("background").height + "px";
                s(aW(".jw" + bN), bP);
                bO.innerHTML = "00:00";
                ax[bN] = bO;
                return bO
            }
            return null
        }

        function aB(bO) {
            var bN;
            if (bO.width) {
                bN = aQ();
                bN.className = "jwblankDivider";
                s(bN, {
                    width: parseInt(bO.width)
                })
            } else {
                if (bO.element) {
                    bN = aq(bO.element)
                } else {
                    bN = aq(bO.name);
                    if (!bN) {
                        bN = aQ();
                        bN.className = "jwblankDivider"
                    }
                }
            } if (bO.className) {
                bN.className += " " + bO.className
            }
            return bN
        }

        function aG() {
            if (ba && ba.length > 1) {
                if (bD) {
                    clearTimeout(bD);
                    bD = undefined
                }
                U.show();
                aP("hd")
            }
        }

        function af() {
            if (br && br.length > 1) {
                if (aZ) {
                    clearTimeout(aZ);
                    aZ = undefined
                }
                aD.show();
                aP("cc")
            }
        }

        function a5(bN) {
            if (bN >= 0 && bN < ba.length) {
                bc.jwSetCurrentQuality(bN);
                U.hide()
            }
        }

        function ae(bN) {
            if (bN >= 0 && bN < br.length) {
                bc.jwSetCurrentCaptions(bN);
                aD.hide()
            }
        }

        function aK() {
            L("cc")
        }

        function aw(bN) {
            var bP = aQ(),
                bQ = bN + (bN == "time" ? "Slider" : ""),
                bW = bQ + "Cap",
                bS = bN == "volume",
                bR = bS ? "Top" : "Left",
                bY = bS ? "Bottom" : "Right",
                bU = aq(bW + bR, A, t, t, bS),
                bV = aq(bW + bY, A, t, t, bS),
                bO = be(bN, bS, bR, bY),
                bZ = aJ(bW + bR),
                bX = aJ(bW + bR),
                bT = aJ(bN + "SliderRail");
            bP.className = "jwslider jw" + bN;
            if (bU) {
                a3(bP, bU)
            }
            a3(bP, bO);
            if (bV) {
                if (bS) {
                    bV.className += " jwcapBottom"
                }
                a3(bP, bV)
            }
            s(aW(".jw" + bN + " .jwrail"), {
                left: bS ? E : bZ.width,
                right: bS ? E : bX.width,
                top: bS ? bZ.height : E,
                bottom: bS ? bX.height : E,
                width: bS ? n : E,
                height: bS ? "auto" : E
            });
            ax[bN] = bP;
            bP.vertical = bS;
            if (bN == "time") {
                bo = new l.overlay(aN + "_timetooltip", Y);
                ar = new l.thumbs(aN + "_thumb");
                ap = bw("div");
                ap.className = "jwoverlaytext";
                bJ = bw("div");
                a3(bJ, ar.element());
                a3(bJ, ap);
                bo.setContents(bJ);
                aC = bO;
                Q(0);
                a3(bO, bo.element());
                bA(bP);
                av(0);
                au(0)
            } else {
                if (bN == "volume") {
                    ac(bP, bS, bR, bY)
                }
            }
            return bP
        }

        function be(bO, bT, bS, b2) {
            var bP = aQ(),
                bV = ["Rail", "Buffer", "Progress"],
                bZ;
            bP.className = "jwrail jwsmooth";
            for (var bX = 0; bX < bV.length; bX++) {
                var bR = (bO == "time" ? "Slider" : ""),
                    bY = bO + bR + bV[bX],
                    bW = aq(bY, A, !bT, (bO == "volume")),
                    bU = aq(bY + "Cap" + bS, A, t, t, bT),
                    b0 = aq(bY + "Cap" + b2, A, t, t, bT),
                    b3 = aJ(bY + "Cap" + bS),
                    b1 = aJ(bY + "Cap" + b2);
                if (bW) {
                    var bQ = aQ();
                    bQ.className = "jwrailgroup " + bV[bX];
                    if (bU) {
                        a3(bQ, bU)
                    }
                    a3(bQ, bW);
                    if (b0) {
                        a3(bQ, b0);
                        b0.className += " jwcap" + (bT ? "Bottom" : "Right")
                    }
                    s(aW(".jwrailgroup." + bV[bX]), {
                        "min-width": (bT ? E : b3.width + b1.width)
                    });
                    bQ.capSize = bT ? b3.height + b1.height : b3.width + b1.width;
                    s(aW("." + bW.className), {
                        left: bT ? E : b3.width,
                        right: bT ? E : b1.width,
                        top: bT ? b3.height : E,
                        bottom: bT ? b1.height : E,
                        height: bT ? "auto" : E
                    });
                    if (bX == 2) {
                        bZ = bQ
                    }
                    ax[bY] = bQ;
                    a3(bP, bQ)
                }
            }
            var bN = aq(bO + bR + "Thumb", A, t, t, bT);
            if (bN) {
                s(aW("." + bN.className), {
                    opacity: bO == "time" ? 0 : 1,
                    "margin-top": bT ? bN.skin.height / -2 : E
                });
                bN.className += " jwthumb";
                a3(bT && bZ ? bZ : bP, bN)
            }
            bP.addEventListener("mousedown", a7(bO), t);
            if (bO == "time") {
                bP.addEventListener("mousemove", bi, t);
                bP.addEventListener("mouseout", ab, t)
            }
            ax[bO + "Rail"] = bP;
            return bP
        }

        function a4() {
            var bN = bc.jwGetState();
            return (bN == g.IDLE)
        }

        function aF(bN) {
            bN.preventDefault();
            f.onselectstart = function () {
                return t
            }
        }

        function a7(bN) {
            return (function (bO) {
                if (bO.button != 0) {
                    return
                }
                ax[bN + "Rail"].className = "jwrail";
                if (bN == "time") {
                    if (!a4()) {
                        bc.jwSeekDrag(i);
                        aX = bN
                    }
                } else {
                    aX = bN
                }
            })
        }

        function T(bN) {
            var bP = (new Date()).getTime();
            if (bP - W > 50) {
                aO(bN);
                W = bP
            }
            if (!aX || bN.button != 0) {
                return
            }
            var bR = ax[aX].getElementsByClassName("jwrail")[0],
                bS = y.bounds(bR),
                bO = aX,
                bQ = ax[bO].vertical ? (bS.bottom - bN.pageY) / bS.height : (bN.pageX - bS.left) / bS.width;
            if (bN.type == "mouseup") {
                if (bO == "time") {
                    bc.jwSeekDrag(t)
                }
                ax[bO + "Rail"].className = "jwrail jwsmooth";
                aX = A;
                bI[bO](bQ)
            } else {
                if (aX == "time") {
                    av(bQ)
                } else {
                    H(bQ)
                } if (bP - a0 > 500) {
                    a0 = bP;
                    bI[aX](bQ)
                }
            }
            return false
        }

        function bi(bN) {
            if (bo && bG && !bb) {
                a6(bo);
                bo.show()
            }
        }

        function ab(bN) {
            if (bo) {
                bo.hide()
            }
        }

        function aO(bO) {
            Z = y.bounds(aC);
            if (!Z || Z.width == 0) {
                return
            }
            var bP = bo.element(),
                bN = (bO.pageX - Z.left) - x.pageXOffset;
            if (bN >= 0 && bN <= Z.width) {
                bP.style.left = Math.round(bN) + "px";
                Q(bG * bN / Z.width);
                aM = y.bounds(bv)
            }
        }

        function Q(bN) {
            ap.innerHTML = y.timeFormat(bN);
            ar.updateTimeline(bN);
            bo.setContents(bJ);
            aM = y.bounds(bv);
            a6(bo)
        }

        function bA(bN) {
            if (ax.timeSliderThumb) {
                s(aW(".jwtimeSliderThumb"), {
                    "margin-left": (aJ("timeSliderThumb").width / -2)
                })
            }
            au(0);
            av(0)
        }

        function ac(bP, bN, bR, bO) {
            var bQ = "volume";
            s(aW(".jwvolume"), {
                width: aJ(bQ + "Rail").width + (bN ? 0 : aJ(bQ + "Cap" + bR).width + aJ(bQ + "Cap" + bO).width),
                height: bN ? (aJ(bQ + "Cap" + bR).height + aJ(bQ + "Rail").height + aJ(bQ + "RailCap" + bR).height + aJ(bQ + "RailCap" + bO).height + aJ(bQ + "Cap" + bO).height) : E
            });
            if (bN) {
                bP.className += " jwvertical"
            }
        }
        var S = {};

        function bl() {
            G("left");
            G("center");
            G("right");
            a3(bv, S.left);
            a3(bv, S.center);
            a3(bv, S.right);
            bq();
            s(aW(".jwright"), {
                right: aJ("capRight").width
            })
        }

        function bq() {
            if (ax.hd) {
                U = new l.menu("hd", aN + "_hd", Y, a5);
                bB(U, ax.hd, aG, K);
                O.hd = U
            }
            if (ax.cc) {
                aD = new l.menu("cc", aN + "_cc", Y, ae);
                bB(aD, ax.cc, af, bn);
                O.cc = aD
            }
            if (ax.mute && ax.volume && ax.volume.vertical) {
                bp = new l.overlay(aN + "_volumeoverlay", Y);
                bp.setContents(ax.volume);
                bB(bp, ax.mute, V);
                O.volume = bp
            }
            if (ax.fullscreen) {
                M = new l.overlay(aN + "_fullscreenoverlay", Y);
                var bN = bw("div");
                bN.className = "jwoverlaytext";
                bN.innerHTML = "Fullscreen";
                M.setContents(bN);
                bB(M, ax.fullscreen, bu);
                O.fullscreen = M
            }
        }

        function bn() {
            aZ = setTimeout(aD.hide, 500)
        }

        function K() {
            bD = setTimeout(U.hide, 500)
        }

        function bB(bN, bP, bQ, bR) {
            var bO = bN.element();
            a3(bP, bO);
            bP.addEventListener("mousemove", bQ, t);
            if (bR) {
                bP.addEventListener("mouseout", bR, t)
            } else {
                bP.addEventListener("mouseout", bN.hide, t)
            }
            s("#" + bO.id, {
                left: "50%"
            })
        }

        function G(bO) {
            var bN = aQ();
            bN.className = "jwgroup jw" + bO;
            S[bO] = bN;
            if (bf[bO]) {
                I(bf[bO], S[bO])
            }
        }

        function I(bQ, bN) {
            if (bQ && bQ.elements.length > 0) {
                for (var bP = 0; bP < bQ.elements.length; bP++) {
                    var bO = aR(bQ.elements[bP]);
                    if (bO) {
                        if (bQ.elements[bP].name == "volume" && bO.vertical) {
                            bp = new l.overlay(aN + "_volumeOverlay", Y);
                            bp.setContents(bO)
                        } else {
                            a3(bN, bO)
                        }
                    }
                }
            }
        }
        var aS = function () {
            clearTimeout(a2);
            a2 = setTimeout(ah.redraw, 0)
        };
        ah.redraw = function () {
            bC();
            var bP = aJ("capLeft"),
                bO = aJ("capRight");
            s(aW(".jwgroup.jwcenter"), {
                left: Math.round(y.parseDimension(S.left.offsetWidth) + bP.width),
                right: Math.round(y.parseDimension(S.right.offsetWidth) + bO.width)
            });
            var bN = (bv.parentNode.clientWidth > aI.maxwidth),
                bQ = bb ? 0 : aI.margin;
            s(aW(), {
                left: bN ? "50%" : bQ,
                right: bN ? E : bQ,
                "margin-left": bN ? bv.clientWidth / -2 : E,
                width: bN ? n : E
            });
            aE()
        };

        function bt() {
            if (bc.jwGetPlaylist().length > 1 && !bs()) {
                s(aW(".jwnext"), a);
                s(aW(".jwprev"), a);
                s(aW(".nextdiv"), a)
            } else {
                s(aW(".jwnext"), v);
                s(aW(".jwprev"), v);
                s(aW(".nextdiv"), v)
            }
        }

        function aE() {
            var bP, bO, bN;
            aM = y.bounds(bv);
            y.foreach(O, function (bR, bQ) {
                a6(bQ)
            })
        }

        function a6(bN, bP) {
            if (!aM) {
                aM = y.bounds(bv)
            }
            bN.offsetX(0);
            var bO = y.bounds(bN.element());
            if (bO.right > aM.right) {
                bN.offsetX(aM.right - bO.right)
            } else {
                if (bO.left < aM.left) {
                    bN.offsetX(aM.left - bO.left)
                }
            }
        }
        ah.audioMode = function (bN) {
            if (bN != bb) {
                bb = bN;
                s(aW(".jwfullscreen"), {
                    display: bN ? b : E
                });
                s(aW(".jwhd"), {
                    display: bN ? b : E
                });
                s(aW(".jwcc"), {
                    display: bN ? b : E
                });
                aS()
            }
        };
        ah.element = function () {
            return bv
        };
        ah.margin = function () {
            return parseInt(aI.margin)
        };
        ah.height = function () {
            return R
        };

        function au(bN) {
            bN = Math.min(Math.max(0, bN), 1);
            if (ax.timeSliderBuffer) {
                ax.timeSliderBuffer.style.width = bN * 100 + "%";
                ax.timeSliderBuffer.style.opacity = bN > 0 ? 1 : 0
            }
        }

        function aH(bQ, bU) {
            var bO = ax[bQ].vertical,
                bT = bQ + (bQ == "time" ? "Slider" : ""),
                bS = 100 * Math.min(Math.max(0, bU), 1) + "%",
                bP = ax[bT + "Progress"],
                bN = ax[bT + "Thumb"],
                bR = t;
            if (bP) {
                if (bO) {
                    bP.style.height = bS;
                    bP.style.bottom = 0;
                    if (bP.clientHeight <= bP.capSize) {
                        bR = i
                    }
                } else {
                    bP.style.width = bS;
                    if (bP.clientWidth <= bP.capSize) {
                        bR = i
                    }
                }
                bP.style.opacity = ((!bR && bU > 0) || aX) ? 1 : 0
            }
            if (bN) {
                if (bO) {
                    bN.style.top = 0
                } else {
                    bN.style.left = bS
                }
            }
        }

        function H(bN) {
            aH("volume", bN)
        }

        function av(bN) {
            aH("time", bN)
        }

        function aJ(bN) {
            var bO = Y.getSkinElement(bN.indexOf("volume") == 0 ? "tooltip" : "controlbar", bN);
            if (bO) {
                return bO
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: E,
                    ready: t
                }
            }
        }

        function a3(bN, bO) {
            bN.appendChild(bO)
        }
        ah.show = function () {
            if (ah.visible) {
                return
            }
            a8();
            ah.visible = true;
            bv.style.display = o;
            aS();
            bE();
            a9 = setTimeout(function () {
                bv.style.opacity = 1
            }, 10)
        };

        function a8() {
            clearTimeout(a9);
            a9 = E
        }
        ah.hide = function () {
            if (!ah.visible) {
                return
            }
            ah.visible = false;
            bv.style.opacity = 0;
            a8();
            a9 = setTimeout(function () {
                bv.style.display = b
            }, D)
        };
        bj()
    };
    s(C, {
        position: k,
        opacity: 0,
        display: b
    });
    s(C + " span", {
        height: n
    });
    y.dragStyle(C + " span", b);
    s(C + " .jwgroup", {
        display: z
    });
    s(C + " span, " + C + " .jwgroup button," + C + " .jwleft", {
        position: j,
        "float": e
    });
    s(C + " .jwright", {
        position: k
    });
    s(C + " .jwcenter", {
        position: k
    });
    s(C + " buttoncontainer," + C + " button", {
        display: o,
        height: n,
        border: b,
        cursor: "pointer"
    });
    s(C + " .jwcapRight," + C + " .jwtimeSliderCapRight," + C + " .jwvolumeCapRight", {
        right: 0,
        position: k
    });
    s(C + " .jwcapBottom", {
        bottom: 0,
        position: k
    });
    s(C + " .jwtime", {
        position: k,
        height: n,
        width: n,
        left: 0
    });
    s(C + " .jwthumb", {
        position: k,
        height: n,
        cursor: "pointer"
    });
    s(C + " .jwrail", {
        position: k,
        cursor: "pointer"
    });
    s(C + " .jwrailgroup", {
        position: k,
        width: n
    });
    s(C + " .jwrailgroup span", {
        position: k
    });
    s(C + " .jwdivider+.jwdivider", {
        display: b
    });
    s(C + " .jwtext", {
        padding: "0 5px",
        "text-align": "center"
    });
    s(C + " .jwoverlaytext", {
        padding: 3,
        "text-align": "center"
    });
    s(C + " .jwvertical *", {
        display: q
    });
    B(C, w);
    B(C + " button", w);
    B(C + " .jwtime .jwsmooth span", w + ", width .15s linear, left .05s linear");
    B(C + " .jwtoggling", b)
})(jwplayer);
(function (d) {
    var c = d.html5,
        a = d.utils,
        e = d.events,
        b = e.state;
    c.controller = function (i, j) {
        var n = i,
            k = j,
            r = i.getVideo(),
            y = this,
            K = new e.eventdispatcher(n.id, n.config.debug),
            t = false,
            o = -1,
            C, L, P = false,
            g, A = [];
        a.extend(this, K);

        function Q() {
            n.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, s);
            n.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, function (U) {
                setTimeout(F, 25)
            });
            n.addEventListener(e.JWPLAYER_MEDIA_ERROR, function (V) {
                var U = a.extend({}, V);
                U.type = e.JWPLAYER_ERROR;
                K.sendEvent(U.type, U)
            })
        }

        function u(U) {
            if (!t) {
                k.completeSetup();
                K.sendEvent(U.type, U);
                if (d.utils.exists(window.jwplayer.playerReady)) {
                    d.playerReady(U)
                }
                n.addGlobalListener(p);
                k.addGlobalListener(p);
                K.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: d(n.id).getPlaylist()
                });
                K.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: n.item
                });
                N();
                if (n.autostart && !a.isMobile()) {
                    G()
                }
                t = true;
                while (A.length > 0) {
                    var V = A.shift();
                    E(V.method, V.arguments)
                }
            }
        }

        function p(U) {
            K.sendEvent(U.type, U)
        }

        function s(U) {
            r.play()
        }

        function N(U) {
            z(true);
            switch (a.typeOf(U)) {
            case "string":
                S(U);
                break;
            case "object":
            case "array":
                n.setPlaylist(new d.playlist(U));
                break;
            case "number":
                n.setItem(U);
                break
            }
        }

        function S(V) {
            var U = new c.playlistloader();
            U.addEventListener(e.JWPLAYER_PLAYLIST_LOADED, function (W) {
                N(W.playlist)
            });
            U.addEventListener(e.JWPLAYER_ERROR, function (W) {
                N([]);
                W.message = "Could not load playlist: " + W.message;
                p(W)
            });
            U.load(V)
        }

        function G(V) {
            if (!a.exists(V)) {
                V = true
            }
            if (!V) {
                return h()
            }
            try {
                if (o >= 0) {
                    N(o);
                    o = -1
                }
                if (!C) {
                    C = true;
                    K.sendEvent(e.JWPLAYER_MEDIA_BEFOREPLAY);
                    C = false;
                    if (g) {
                        g = false;
                        L = null;
                        return
                    }
                }
                if (f()) {
                    if (n.playlist.length == 0) {
                        return false
                    }
                    r.load(n.playlist[n.item])
                } else {
                    if (n.state == b.PAUSED) {
                        r.play()
                    }
                }
                return true
            } catch (U) {
                K.sendEvent(e.JWPLAYER_ERROR, U);
                L = null
            }
            return false
        }

        function z(U) {
            L = null;
            try {
                if (!f()) {
                    r.stop()
                } else {
                    if (!U) {
                        P = true
                    }
                } if (C) {
                    g = true
                }
                return true
            } catch (V) {
                K.sendEvent(e.JWPLAYER_ERROR, V)
            }
            return false
        }

        function h(V) {
            L = null;
            if (!a.exists(V)) {
                V = true
            }
            if (!V) {
                return G()
            }
            try {
                switch (n.state) {
                case b.PLAYING:
                case b.BUFFERING:
                    r.pause();
                    break;
                default:
                    if (C) {
                        g = true
                    }
                }
                return true
            } catch (U) {
                K.sendEvent(e.JWPLAYER_ERROR, U)
            }
            return false
        }

        function f() {
            return (n.state == b.IDLE)
        }

        function B(U) {
            if (n.state != b.PLAYING) {
                G(true)
            }
            r.seek(U)
        }

        function w(U) {
            k.fullscreen(U)
        }

        function q(U) {
            n.stretching = U;
            k.resize()
        }

        function H(U) {
            N(U);
            G()
        }

        function I() {
            H(n.item - 1)
        }

        function l() {
            H(n.item + 1)
        }

        function F() {
            if (!f()) {
                return
            } else {
                if (P) {
                    P = false;
                    return
                }
            }
            L = F;
            if (n.repeat) {
                l()
            } else {
                if (n.item == n.playlist.length - 1) {
                    o = 0;
                    z(true);
                    setTimeout(function () {
                        K.sendEvent(e.JWPLAYER_PLAYLIST_COMPLETE)
                    }, 0)
                } else {
                    l()
                }
            }
        }

        function x(U) {
            r.setCurrentQuality(U)
        }

        function R() {
            if (r) {
                return r.getCurrentQuality()
            } else {
                return -1
            }
        }

        function O() {
            if (r) {
                return r.getQualityLevels()
            } else {
                return null
            }
        }

        function T(U) {
            k.setCurrentCaptions(U)
        }

        function J() {
            return k.getCurrentCaptions()
        }

        function D() {
            return k.getCaptionsList()
        }

        function v() {
            try {
                return n.getVideo().detachMedia()
            } catch (U) {
                return null
            }
        }

        function m(W) {
            try {
                var U = n.getVideo().attachMedia(W);
                if (typeof L == "function") {
                    L()
                }
            } catch (V) {
                return null
            }
        }

        function M(U) {
            return function () {
                if (t) {
                    E(U, arguments)
                } else {
                    A.push({
                        method: U,
                        arguments: arguments
                    })
                }
            }
        }

        function E(X, V) {
            var U = [],
                W;
            for (W = 0; W < V.length; W++) {
                U.push(V[W])
            }
            X.apply(this, U)
        }
        this.play = M(G);
        this.pause = M(h);
        this.seek = M(B);
        this.stop = function () {
            P = true;
            M(z)()
        };
        this.load = M(N);
        this.next = M(l);
        this.prev = M(I);
        this.item = M(H);
        this.setVolume = M(n.setVolume);
        this.setMute = M(n.setMute);
        this.setFullscreen = M(w);
        this.setStretching = M(q);
        this.detachMedia = v;
        this.attachMedia = m;
        this.setCurrentQuality = M(x);
        this.getCurrentQuality = R;
        this.getQualityLevels = O;
        this.setCurrentCaptions = M(T);
        this.getCurrentCaptions = J;
        this.getCaptionsList = D;
        this.checkBeforePlay = function () {
            return C
        };
        this.playerReady = u;
        Q()
    }
})(jwplayer);
(function (a) {
    a.html5.defaultskin = function () {
        this.text = '<?xml version="1.0" ?><skin author="LongTail Video" name="Six" version="2.0" target="6.0"><components><component name="controlbar"><settings><setting name="margin" value="8"/><setting name="fontcolor" value="eeeeee"/><setting name="fontsize" value="11"/><setting name="fontweight" value="bold"/><setting name="maxwidth" value="800"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAIAAAD5ZqGGAAAAJklEQVR42mNKSUlhevToEdPXr1+Z/v37RxH+//8/htjv379BZgMA4j5LOzqaqAsAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAh0lEQVR42t2RywnDMAxAhSbJRukGPtgDdJSO0k7U4IOPBhuM8b9SIAG3p0JPFTwETxJICIFCSrkqpZ7EYFAIsbbW7s65RWsNDJK4ee/BGAMhhB2stS7WWui9n7CEGOMsaXwSZ+d/yR+cOcaY+HL8vcByyzl/7HllyX8qpexgSulBhQvl7XjxCydafIt3Z4BrAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAjUlEQVR42tWRywnDMAxAhSbJRukGPtgDdJSO0k7U4INPvthgjP+VSlsSkkvpqYKH4EnCFkKl1Hhxl1LOQIFaa2Ccc1Nr7SqEmDGEAIwxBrz3QIUL9t7hjbUWaq3TRqaUWMJGMjS+l4edfy2/XHOMAWt+eJ3FTuacWS5YSgEmxviU9M/z58R0tIXEifLtATSUfIsSwhegAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAdUlEQVR42u2TsQ3AIAwE2YARMkJGyCiMwiiMwgjUFMAIjOC8lMJdiIjd+aSrr3i9MwzjHXoYMOgFmAIvvQCT4aEXYNLvEK2ZMEKvFODQVqC1Rl/sve8Faq20cMIIvUYgQR5ZMJDh6RixQIF8NMHAgMEZhrHNDU+1T3s3o0CaAAAAAElFTkSuQmCC"/><element name="playButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABhUlEQVR42uXVzUoCYRTGcXNGR3HSDPtASyIhrIjaFJlBRBRUdAUGQQurdVfSrl2LuhEvYxR1IYroRhCEWU1/4R2Yxcz4MUlQB34bGc6D58y8r+/vl2EYczNpKvitzN9/orEEGUEoQhAyJDNs2gAJCiKIYVGIQUUIAWvQNM2jWMEGtoRNpJBAFOGJgsRDAahYRRbHuMAVznGEHaSxZBNkvyPLQhXEkUEew+riE88o4AYn2BVBCcxDgWz+G6fxhLGMPdzBWh184RUPuEUOWaSwgBBkpwAZESRxiALsqoV3EXSPSxwgLUIUc1xOAWvI4RFupeENRVxjH0moCMBvF6BiHXkUMap0lPCCM2QQh2LuwingFE8Ytwa4wTYSCEEaGVCtVo1x1Gq1CQPEiDRNM9yUy2W92WyWdF13HJHrkt2aNxoNbTAYuC555Gtq17her7f6/f7HmK+p+4dmbcysO71ez8OHZnNUDBtXKpVuu932clTM/rCb/XHt/cL5/SvT+6XvKcz3r+sbpPMfjCOvfIMAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAN0lEQVR42u3NoQ0AMAwDwe6/YYBncWlUyQFBBX+SickfADM/0k+AQCbJffHfqir3hZ/ADwEAowtQ1mmQzb8rQgAAAABJRU5ErkJggg=="/><element name="pauseButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABdUlEQVR42t2WzWrCQBSFq1FSaSjaFi1iF6UFtdBdF6WhC0Hoym3BlSAu+wbddSF9xfyTJ7k9gRMJuY2Oi2w88BG5zLlHZiYzOTttiUijyP768Y2bxCKVv0nD+B/T2AY2OAcdPnOKNZtjrdx/KMCi6QJ0wTW44fOKFGtdjrXzEJPml2AA7sEEPIExeCRj1iYcM6CnOoTz2AYOuAVT8Arm4APMwDuZsTbnmCk9Dns0qxbVBj3wAFzR+iRlufT02IOLrqenA/rgGSxE64uUtaCnzx7WfwEtLtYQvIClaH2Tspb0DNmjtS9gxHldidYPKWtFz+hQgAPuwBtYi9aWlLXOPPQ6JgEu2IjWLylrQ89xAVEUSRzHkiSJpGm6C8jqBVSA8RR5nie+70sQBHmjbUZWL6CmyHiRVQAXWQfoRTbapiqA21QH6G1q9KJl5jwkDMPdi6YCzF40fVSoAB4VKqDiqKj1sKv9uK71wqn9yqzt0q/vs+Wk9QeSkdKwXIKzCgAAAABJRU5ErkJggg=="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAfUlEQVR42u2MwQnAIAxFu4EjOIIjOFJH6EiCF8fw7BQZwf5AegkU2tje8uGR5Afe5vH8mTHGZG5+EXSzSPoMCEyzCPd+9SYRZgCFb7MIJNB5XxURT7OotTYFkql5Jqq1TiGBzrvinUj2AMqSSHXHikj3GZBVpH8R9M3j+Tgn8lcGnlSSd08AAAAASUVORK5CYII="/><element name="prevButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABhUlEQVR42uXUz0oCURTH8VKz/BNFmZJ/iMAoEmohlRRI7Yp2Qa0igyJc9Qot2vUGbnwB3yJXPYKaCi5m62LQzSymr3KE09hAi1nVgQ93hnv4wZ259878o7Jte/YXfADPcAvwIeDgFwHMKYFJoDPILw0hREQYCyKMKBZlDCEIvzMkiAhWEEdCxlURRwoZJBGTwOA4SC0nLJMb2MGujFlsIYc8DrCPrIRHZtR3mccSMtI0qTMUcYoLXKGMTxxiE8t6WSHEsI2iCirhDg94RgVDmTtHDmvjILWsBPZwqYJe8Io3vEPXDfJY10ERJGXiWjVXUYMBZ5VQQMoZlMIRblVzHSZ+qkccI62DokijgHvVbMGtnnCCjGtQu922R7rdriXPU3SQ69IajYY9MhgM6p1Ox5R3zbE0l4+tmquWZdV6vZ7hDNIf2/X3T5r17zcM40MH6d/vuiGleWpD9vv9SrPZHDLn2JAuR0QFTR0R0zTLrVbr2xHx7NB6do14drF5dtV6c/n/7foCpva8IJ04vWUAAAAASUVORK5CYII="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAdklEQVR42u3OwQnAIAyF4WzgCB3BERypI3QkwYtjeHaKjGBfIeClFmvaWx58KAg/ks329WqtBbbBW7vMhhowBH2o2/WhLoJTh0QBrw4JfhXKObcBlnMulFJqNwp4uS+HIjjCNKGDZKshhkCYJlRge/ot2Ww/7gSJGQaejWvrvwAAAABJRU5ErkJggg=="/><element name="nextButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABjElEQVR42uXUPUvDQBwGcNvUatOK4kuKfUEERVGwg/iCguimuAk6iQqKOPkVHLr5DVz8An4LO/kR2jQtZMjaIbRLhvOpPOHOJMahnfQPP5IcyXO5S+5G/ngJIRKUpMRvwiEyIAWjPl5rlApIhgJ5YxoykIMJHnUYJx2ylGFHWjAozQdnoQBlKIIBM2RAnsdpBqa/hbHRgCWowBZswjoss30V1nhcYKe6P0w/aAoWYRua8ABncAKHcABHQlaFbz0JY/589YPm2Psxb+zBCzzCLVzBtWAxeIVvlQHND5rnUC5ArXd4hio8Ke2nsAF5OTwEcWJ32WuwHHiDV6XtnB0XIKsGlWAP7iCqXKgp15ewA8VgUBn24R5+Kk85v+EISpCLDLIsS0Rpt9sez+OC5NDq9boIarVabrfbrfE6bmhysoMhtm07nud9TTbb4iZbfn41xHGcD/Xzsz3u88sfsn9jo9HodTqd0A/JoLgfUi4R0zSbrutGLhEGxS2RwRftMLeRwTe2oW21g2/+/6c+AdO5vCABA1zBAAAAAElFTkSuQmCC"/><element name="elapsedBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="timeSliderCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALElEQVQY02NkQAOMg1aAmZn5P4oALy8vqoCYmBiqgIKCAqqAmpoaxQJDJsQA+54Krz/ExkoAAAAASUVORK5CYII="/><element name="timeSliderRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAWklEQVR42tWLsQlAIQwFBcVKGyEGK61cJ/tXGeVptPjwN/DgQnIQ9xYxRgkhqPceLqUkW5g5Z7g91BYiQq31BDAzxhjmDb13zDnN+/IP0lr7glFKkX3oCc+wAHpnIpi5hlqoAAAAAElFTkSuQmCC"/><element name="timeSliderRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAVklEQVR42tXJMQ4AIQhEURKMFZZCrLDyOty/4ijsYuJWewEn+c0buGeIGKUUr7XahtZaENHJgJmj9x7vkTnMOSMTkY2w1opMVX/BPxhjJNgBFxGDq/YAy/oipxG/oRoAAAAASUVORK5CYII="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAE0lEQVQYV2NgGErgPxoeKIGhAQB1/x/hLROY4wAAAABJRU5ErkJggg=="/><element name="timeSliderBufferCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQYlWNgGGrAH4jvA/F/GOc/EobLwAX+ExTA0IJhKIa1QwMAAIX5GqOIS3lSAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQY02NgGErgPxDfB2J/ZAEY9kcXuI8u8J+gwH2chqJYOzQAALXhGqOFxXzUAAAAAElFTkSuQmCC"/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALUlEQVQYV2NgGCqA8T8QIAuwoPEZWD58+IAq8Pr1a1IF3r59iyrw9+9fhqEJABv9F+gP7YohAAAAAElFTkSuQmCC"/><element name="timeSliderProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAASklEQVR42tXDQQ0AIAwDwDqcPhLQgAlM8JqDORilnyVY4JLDX0iaOgWZaeccVkSEKyv23nxjrcU35pyurBhjWO+dFZDWmqkr8Y0Lr65i67XRzKcAAAAASUVORK5CYII="/><element name="timeSliderProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAS0lEQVQY09XDQQ0AIRAEwXa4+iYBDZjABC8c4ADmHheStUAlBc/wb9oOAM45vvfewVrL6WSM4Zzeu3Naa04npRTftdZAkiVNScFTPhkFYuvY2zeUAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAcCAYAAABYvS47AAAAwElEQVR42tWTPQrCQBCF84OsYJCIYEQrsZAU6QKx9xheyG4L6zTZs3iInGZ9Tx4iAWHaDHwwvPlgyWY2mVvFGNNf/gmZyEUm0q+kwQI4sBROWf6R2ShcgRJsRanM0UnUrEEFTuBC1FeaOYoF2IMaXMGNqK81KyhuwDmEcB/H8RVV7JlxRofiDjTe+0eclLKGDsUDaPu+91NRWUuH4hF0wzA8p6Kyjo5ZNB9t/hjz9Zgv3PwLzUthXjPT4hqewrzqDfMnQ2tu8Pr1AAAAAElFTkSuQmCC"/><element name="durationBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="hdButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAMAAACu5JSlAAAAZlBMVEUAAACysrLZ2dkmJiYuLi4xMTE3Nzc8PDxAQEBJSUlRUVFSUlJaWlpdXV1jY2NpaWlsbGx0dHR3d3d4eHh9fX2KioqPj4+SkpKVlZWXl5ehoaGpqamsrKyysrK3t7fCwsLNzc3Z2dkN+/dcAAAAA3RSTlMAf3+Sa81KAAAAh0lEQVQoU+3J0RpCQBCA0dW/i02KpEIzzPu/ZJc+7CM4t8e5k3PuYgmX9VNttv2W2iww9gDhe/iK3mZYHhRVIBwe+l9PYQWjzbB/BYB6gdl096ra4WP0PD/kqh25qq4vIjfuIvBuuMrkaURk8yUvGUAiefSU0/5hkJZSPECcZP8J62epztzpDzcuFrDsGN7pAAAAAElFTkSuQmCC"/><element name="hdButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACFUlEQVR42u2WsWoCQRCGE42I5AikkSBaGSwsAiIpQi4BK0vF+qwEjb1gaWMlaGfvA5xYWvgCNraChY0+gU+wmR3+DcPGC0lQrnHg43bvbv5/d25v764uYYdS6voc/MY0AqLEzYmICt3roJlGiRgRJxLELXD+g8hPQDPGHnIAwjiOpHsiSaSINMj8CeRBIwlNBx7RY8Z3xAORJZ6IZ+KFeCXcP/KK3GdoZbU2POLGPIJyOLiYJ96ICuERDaJJtIiPX9JCTgMaFWjm4eHIBRZHWR6Jd8JXpw8f2o/aS5Y8QSRRnqo6X1ThkTTmN1iRKTwfz87o9/sql8updrutTBSLRT63WCzUZDLhtoCvT6dTW8qDR8o2T2OBNL5leJ4WZBMd+/3+y+RwOKhut8vtUqnE92JgfLSiAY+0NHeIDFZo085gI5gvl0s+GjMKPpoq2IOzogmPzDFzl1eriPV6zSI2eAw8c/TZ1M6RAW33R/PtdqsMo9GIRQqFgqrVagy1+dxwOFSz2YzbrutaOeIckOaBZd9sNgro2bFQp9Mx575m5fu+6vV63K7X63xttVqZwfE1qSXLHrjgZEK5XGah8XjM/fl8bsx1nyuBWcqq6DweiNSSCy7wVZMJMNKm3B8MBkac+zCT8CBgLLFetYBNBjefHLnJBG6vu93OP7Wx1pTba6gfllA/qaH+TIT6GxXaD2Q4v86XoPgE1h55oNE1QD4AAAAASUVORK5CYII="/><element name="ccButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAMAAACqEUSYAAAAXVBMVEUAAACysrLZ2dkmJiYuLi4xMTFAQEBHR0dJSUlKSkpRUVFSUlJaWlpdXV1jY2N0dHR9fX1/f3+Pj4+SkpKVlZWXl5ehoaGpqamsrKytra2ysrK3t7fCwsLNzc3Z2dky1qB2AAAAA3RSTlMAf3+Sa81KAAAAe0lEQVR42uXNQRKCMBAAQWCCIgGCGEU3sv9/JpXykCLxB8y1D1OdsEaLmqT6p6M6wKn6FuyWaUQL9zdcW2yuLV49dmTUL2S6gcYsr+IbwgdC7MYj/EoqIoZFHF1PL08QkYNO0MG8wMUw5LoOwCQyG+jWTMuS1iXW1SnbAaDLE32SOX+lAAAAAElFTkSuQmCC"/><element name="ccButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAB8UlEQVR42uWWsWoCQRCGEzUcEhFsQpCzUiwsBBGLoElrp0HbsxI09j6ClaXgW5xYWvgCNhaWFjb6BD7BZmb5HWSXXAw5rnHg43bd3f/fG+f27uE+Qyn1GCa3mMVAnEj8k7jowdwyxKQnwiGSxDNI/Qmsg4YDzbh15/jRwaIM8UJkCRfkbsQFWWhkoOmwh2nqEGnilcgTZaJGvBF1onEjdaypQSMPzbRlzLvBYIl4J9qER/SJATEkvn5hiLl9rG1DqwTtFFId06ZIQ4H4IHwVXvjQLMDDkcJC/svEpwo5oFmGR1JSjD++ptNixGQyUcViUeD+JRaLhapWqzLmeZ46n8+mhAftLKo6cTF1UQB921AEpT2bzdRms5F+q9Vic5lnRB/armmaI+ooBAkI6TvCnYnwaDTitr5ynE4n2YQRA9aGR8o0baAKOXSaRMQOufP1eq2CApqNQNPD4aCY3W4nptS36Ha7emy5XHL/R4JNkd79fq8uVCoVLez7vu5Pp1Pd73Q6qtfrcZuvemy1WskmrzQC0yuFdL1gPB5rERhJez6f80ak32w29QbxHxumdiFZj8z1gu12KwUD9EYwzuYwk43xGsPUfmSswwGTwyLwcJBj8Hg8+mEZklbgMRj9gR/9qy36l3j0nyuRfphF+wl69/ENcVv6gzz3ulwAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAA30lEQVR42u2UzQmEMBCFtwNLsARLSAkpwVJSwpZgCQEv6skS5iieLCElzL6FJwxCDlllT3nwkb8hXxLQV01Nzc/Z9739l8gBBRE0j94AiBk3oAceJCCPCM2GauY6zh3AsR/vit5AT8zzBbZCoWdNWypQS0YmQM2tekpDkWzbNs1xqRMQwGraMtk8z5rD1k3TJJgLYF2WZfi2oEw2jqPm4HoHhHMOJNCDAxTLnGHIyALXhRLPmnsfOU+dTpkRJooc+/F1N/bpzLjhITxFAp77i1w3440UxALRzQPU1NTk8gF0y3zyjAvd3AAAAABJRU5ErkJggg=="/><element name="muteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAC2UlEQVR42u3WPUwTYRzHcWmBFnqKBYpAHVSQoEB8QTQaiMSILhgDiiFxUBMSlUETnYiDg9GJmDA44OCgo8bF18EFibq5MEBpeUsDIaVAm6P02qTUb5N/k5P2oNg46ZN88tz1yT2//p9e77lt/1u6Fo/Hc9L5GwEmmJGrY4bpz0JlcoOAPFhRCAU2FMAi46YtBa4LyEM+LBKwHSUoh1OUYaeM5yUDtxpSAAVFKJZJd6MGh9GEY6jHXjigpAQaBskySQWlcMpE+3FQJj+DDtxBN9pxCjUogw25yEkJEWbkw4ZiqaBWJm9GK86jEz0YRKKNok9Cm1El11th/i1QF2TBDuxCtYS0oQv3MIObuI+nGMIwIljAQ1xGI5xQINWlBhXBiTqclgtv4xXCUsUTDOADotAwIsce9OIsqmFHPkzJsORvpKACDVLNNfThJ/TtBb7ADRfCEjQm4/3okHkcyaXU3xAW2FEtFW3U3uAbVDn3IQYvQhjGVTSiHIX6MDMK4EA9LsRisbgR2jt8wg/OtbW1NZU+Qu+nX6T/zth1nEBl8q5cH1aGQ+icmpqKG9GHeb1ebWlpSZ2bm4v4fL7A7OzsIn1GYQ7Uod3lcsWN0N6GQqGhyclJNXG+srLic7vdseXlZa/H4wkRnLKMRr9ZFVr8fv8jLh4MBAKv+fbudWEvCfs8Pz/vUVXVRbXaxMRENBgMjiXGV1dX094g6e7GcqmuFVfQiwcszfvx8fGwhPXjGYEf+SxKNRqhI4nj6elpw1vf6A9dgRo0yUWXcINv/piJvRzfRV80Gh1gBb6yAsMERahugc82/FOnC1RQonvYHkELzoXD4S76i+jGLYKeJ6qlolGCtvC4gv5Jr9tGKrEPB9CAoziJNnRqmtaz2YM40+3FCgV2OHT71x7UStXH0ZTJFpNpqEWqtUnFRShFxWabZ1bvHLpd2yrhijB4LcjyXSSLF56sw4WE/HPtFwoiecfnKRGcAAAAAElFTkSuQmCC"/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAk0lEQVR42u2NwQnDMAxFtUFH6AgdISN0hI6UEf4Oxgdvkas9RUZQ/yEBYdChgoZC9eCBLBs/SZLkjxlj3Ol2RehJd6rfDq1UT81eKcwZVCMB9Zw/p7CzfErvXT2ndzB3kAitNfUUQ60V555zLFZKUU/zBscOdo7EFiOcmFLMcQli4y+6Bz4LBx90E3JV8CZJkvwsb8qa9F25tXYIAAAAAElFTkSuQmCC"/><element name="unmuteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAACOUlEQVR42u3WS2sTURjG8ZqJuTSJTW1T26YqrWmN1jt2ISpWTb1ABS3iRkS84WUndlNQFN34Fdy5d+U36MJVQVroKgnmvgqBZBV3Gf8DTyQMzMggRZC+8CNnJsn75CRnzqRvu/6/Mk1zRw8fwBhbEeSDAT92ih+cU7D8dYiahxFFTPoR1HOG+Fxm7h6kRiE1H8Y49iKJEcQRRRghhQegmTuFKkQMBBDBbkwgjVOY0+Mh7McoEhjSa+OIIawehluYgSB2YQ9SOI0MbuEFfuCizs8ijYOYwRSSCo8g0J2hU9AAkmp0AbfxDJ/RhlV3sYgFZPR4GedwApMKDMNvD+v+RlGM4aga3McKvqO3XuKhxt/wFI+xClOBScTU12dfEEEMIqUZudU7vMKajjewrvGqZjiFOAL2MANhJHAENzqdjumE+ojXeMvxJkyxAh/hEqYxiKBT2AiOY6lQKJhOesNqtdpm93y1WvUUlsAsFrPZrOmEeo/lcrm8Zh1XKpUNxuvWuFgsun6N9t/sAM43Go0PzWbzU6vV+sInztvClvHEGpdKpd8LxArinPMCsa9GjGp287iD51ip1+tfc7ncTzV7gJu4igVc8bL07Rf0GGYwhwyWcI9Zvsnn80XG13EGx3AYafzxonYKjOoNE2pyEmcx3263r2nLmu7ZJ4e9b1ew7fQxhY5jUgEp7FPIAPq9bcTut5cQoohjSOKIIKjGhrjeYryEBhWMnnuZ9+buoaJgUcjW/xeRvu36F/ULlStUoyVtQSYAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2R0QnAIAxEu1lWc5/+ZYKs4TTWjwS0qIFrP+/BkYMLOdCLELKn1tpG5TleYF2yyMUzvCAOZDtwgU85PJGE/+NPyuTJG1Uts/9+sI0+y6GCrtunLHKJHbjAZYcd8x28IJTmhJAtD4gEt9ueDIktAAAAAElFTkSuQmCC"/><element name="fullscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACFUlEQVR42t2W324SURCHhS67VCoFbYhRkbQsaCwVSwgUaZP2yia9Mb6MN41vYfpIfYIm5QIegJfA3yTfSU52c1i98KabfGGYmd+cPX+Gw7On+2w2m5JPUfxfC5dhB8pQKooXvjGCiohFFRJ8EVTwVSHGtxOckSuOsCb2xUsDe0/swl42jiZxg2wr/kK0REf0DOzX4hXIzsVbaPODsH4VUSOxL8biwsD+SCEhOx/vo61Rq5zd1JipdhBkn6k4hmk2iKZDjdhtuj9Awnqm4twTPopf4lKM4BLfo0tCk1IjCQ3QFF0xR+QK/BBXYgxX+PycOdpmaAC3RG1xiui7uMWeic8ww3dLzgZNO7tEoU1OxYhpX7Dmd+KDgT0ldk5umt/k/DGtioZ4y/E7EUMx4JQcQR/fkJwemgY1OKbhAd6wnscU+ESRQ+jhOyGniyY4QFlE4rk4sCKIJyzFaLVa/XaNhT0iNiH30LTUiEJ9UGeqg8ViYRv3TVxjj80PY3zXloM9QFvf1gcN3mRiIr3pvX2u1+ufHMMvMDefn2MatI2iPjgSZyYylsvlg77fiK/umGLfWMzlmQbt3/UBQoc7530IxLf3QeT3AYIZbzbE9w5SfGfknGb6IAr1Qez9XL8XXabdxtc0sNvEuuS20MZFd0LsXThNqOOrQg0fcS6cXPHiKzOB2L8yg3GKG4WXfoBSUfz//W15ss8fvEcYMYnLr+AAAAAASUVORK5CYII="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2Q0QnAMAhEu5kD588JXMNpbIUEpCBpe5+9B4JczF3MQQjpcfeBz+4vxpMe2ULSIF9YjaqWM+hXWRrdA2YZah61Wv2/qGrU6nQkQK6yLmCeCbzFCmk02FxWX/WyYXw1H69mCSEtJ16St50Fqd0HAAAAAElFTkSuQmCC"/><element name="normalscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACDUlEQVR42u2Vy0ojURCGZ9Kmk4A63cYLMhdE28tCECUgxCuzGBDc6AgO7uYizKAP4NKNb6S+g08gSZO8QZ7h+Bd8ScDDIZmsLfhIpc7/V53uPnS/e4uRwjn3vsto2sHiggdrw2iGaT4miiKGEhShBDEU8YSH9Jr3G4yLSZGID+Q9qCXk0rIBhoSaj4kyxlnxUXyBz+ITKKcuDdoEb+9KQrufEHPiXqyLLVETmwDUpEE7h7cYGhBxmQk72xAWR+KY/Bs4akfkG3gSekTebaJYFlWxKLbFDQ2e+P0BvRqabTxVekT+M+gPmBKZ2BWn4tn146czCNa+o83wlkNXUGAxRVx3fvyC11HHk9KjQFtvQIxoSeyIE/Fb/BWX5EK5auQnaJfwxsMMyMSeOKPZVX8IzVUjP0Ob+QP8Y1rhPq6Kg2az6Yw8z12j0XCKf4blVuuum9Y8eCvBY8ritFgTXzudzl273c4VzlBcG93/tmYa05oHb2XQMZ0RK2JfnFujVquVs9M/huVWY+g52hXzDjqmJe7jgqhZI+3wVvkFA04N8gtbI6/hSekRhV4VMS+vee3uAeOeOOSs1w3yQ9Zq0j6aB2/sPwP/ZTeFYUEsc/mZWISM2jKaeTzeyy50FWV2k/LgquQJpNSmySfxeLsPfnAQlzCC1dgAoInxDP9Vg8gAauG1//82I/ZM1DztW4wSL9xQTRdfTNL0AAAAAElFTkSuQmCC"/></elements></component><component name="display"><settings><setting name="bufferinterval" value="100"/><setting name="bufferrotation" value="45"/><setting name="fontcolor" value="cccccc"/><setting name="overcolor" value="ffffff"/><setting name="fontsize" value="15"/><setting name="fontweight" value="normal"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA8CAIAAAAok0etAAAAJUlEQVR42mNKTU1lunnzJtP///+ZGBgYwDQ6xiVOrhw1zSNRPQBu5Zagca3K1AAAAABJRU5ErkJggg=="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAnElEQVR42u2WvQ2DMBCFv8I1M3gjMoTpMwqjkI1S0RnJEhaiuZcFEuyCBCnyqz+9+9XpHMAwDD0wAp4PciGEXtK0risxRvZ9fw+a2ZhzZp5njuTMzC/LQklOEtu21YGSyqCZ1YHfcazR1Tle6FjVnr+q+vz2XJxjW4p2Utr2tFn/OvT5s5b0BHwJdmZ2Bybg0NmllB5d190kHb5cL8J5WhbWZJeBAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAmklEQVR42mNKTU39jwffB2J/BiBgunnzJgM2/PjxY4bPnz8r/P//f0NKSoo/E5DBgA1//fqV4enTpyDFDP/+/ZvAxEAAvHnzBqRQAaeJMPzz508wTVAhDBOlEGg1LUxkIAIMtBsH0ERigmf4+XpggodGbhxNFKNFymiRMhrXA1Gk0D+uoQH+gIkIRSCrC5gIeOIBkA74+PHjRgDhswBcaL43lQAAAABJRU5ErkJggg=="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAFy0lEQVR42oWXy2sk1xWHv1vvR1erNeqWZ2TFiSQ/ZI2GMBDygsRhTIwZgg3ZeeFV9lnlT8giS/8BhqxCICYJ2TgPhzEhYLJQFgMT2SN79JhoMq1Hq7tVXV3ve7PoktQjd8sHCpq6zVfn8TvnVAkumRLnPzV0LFw8XCwgI2ZITEaJFIqJZlxCneEEAg0bn0Y8176eB2CG19tuhx4DUpRiMtIYw40gooJqGHjMHi5urzt39JZgeHRwb/nBPJRIFOWVHqoRzEDHQKvOTGpxc/uW+zNnzUcQoy9vvx/EbkxKgWS6h0og0DGxcbAxERRIdIKDBfeOszZPgCDmcE2+3n68dMyADJSYFLRx7p2JS0B9a34YCGEMb3aQ+HJGb/kEGIBPQLyUB1joiLXGYx1FwmBSyAIDm2DY2ljVX9WXoXzy8db6f1tSM8V5UkGghwB/t36x0iYfBR2xj3wWKNDQcahvrNo/Mr7joZPcSlYffPT9XTsbnCTE+EDKkPy4FvaK9xaGWZ5XBJ9FHl8A9Sp/NrWtr8Xftl5v0STAFqqhiqx94/TpQC1krZKYHtFm+PsXtz7IP9E7RaLiswxaJGSXQ9Yxh4G+7FHHAmoqE/ELHe+lg6WHX/y6fC1tqqDYHt5bfuAe/9PtFZHMxgviXGTyQthCCNDPNaODoQqi2d6tk6c7eYByw5faboferugY+ZQ+OcshSHIjKp8k6wk+UBAruW+dEjJ01NIhJuqs9XpG1sjUMx4mX+4URXHz6ONPk1c6Sym6ign7w/vrbQYMKBAIFJKcgvzW8aafaWO4bFw6QmlomKOubV/fXHVv21/HlPvx/dbm6i5dIopKFhKFRKJEnefQK0LJHuk40MDAxsGjhp/4O3PdQEo3Wmk3OvQZkFBWQDW6hAJMrmEDIf1xFYJQNjZ+P9iaLwLLDNQLoZORkVSjKqn8U6M/f6kGGgEmkBOOwEIF+FvNf78ys2bXhC6j5PPbO8+fEBGTkI+GwLTZh80i1nkm90nBwOoFGy83f+Dd8IUgFdq1f+Vv9IOclOIrcNoYDiwW2UFqmJtzM2vejRYt1VJNVXvOe3mzXlVVwlQcBGO4ETIAAyNxzZqHjwF4KmEwN3TQERe5m2LmpDuVnsYnColSqCtRV5hG4cT5ICFBVc2QDdyEEoX4Cmg+6Y5Gvtbpb0ZPO5zQEx0RtvsPb3arAa9dCQwvZkxV5xAMskb4ra0N8rUoEE5+cvrZd3fqKQqdEjV9uwGS/UuykWfC9nrBw1bma1pQrHT9mISEjIyC/ErhTBS2gY6NjYODGZob9T23KN3oe4fLAxIyCqSQSlwS0BWtpyEwMbBxP2v87RszC1Zd09J+/+nSzk/axOQUVXEu2m9m+nAwUECBRgl/Xphfqc066Cp1rcauejRYGe1fdY5UijXz0wsc6CzyaAwolBKAQnxU9+e9RkP5CDKEk9345GBlQHHmW9U7cu+aZTwzXi1qz66A0aF27DmBjYsGWHg49Y6HgfmF8buga0KQvd37Zk5pOsXl0kzcKUqq8ccKkKVC/MP7zYI7YxlwlP+qe3fv3YGrlQKyK9++FAo5F+10k/mYUcgxcf/58Ej/4+J803UsBTm+/SG3P38x+o93CTe2U7Tz7BRvdvP/hftdTuhyQq93sP/Dk3u+2/CdgDoz1Jlxm7N/mPllKEpLjOGi8Z1igFBKIClI39n+LcOoNiuITsODH+/OJU9cXbexlQ7Y5NTs0HpN3Xn81wXLrLyM2J8UsqQkaw1+/vAvhx0floZv9MhRqSykHJtEUgJ8kPKoUc8MYMhwQg6FUlACkuLNFA1GAkFoSZJnKsMGCjLivJmNVNHvTevFqmFQlBRkJAwZkpCSk7/VOzg5jUMGRIT04qPuT/uV1KfYuWyEUiO/RrNWAQLxanp370Oas56paVF61L27t55Ne3c9l9u4KXHpVEe/b/6pEVoXwqa8av4Iplr1VaChoVVejzKrrlpd/wdqZ96EzbsuCAAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACL0lEQVR42u2T64nCUBCF7SAlpIQtISVYQkrYElKCJaSElHBL8LfPKD7wyUXxgYrOzkCyHC6b3LgasywOfBDuOTNzcklq73rXfygiqjMxk1YsZ38lXIOyq1F1OI/s5VUZsAlBNOMlaDhvVhXOZ7B80D4ztNeV+VNY9VdUzg3VM/5srM9XhXOMb0zleJXxjTqlB7xer8HtdiPAy/KKhl7pLTXc5XJxGc1QggJNIXgOfs24pQU8nU4hQynn89kFjZD0XDyGFpYS7nA4uMfjkYAQddQEQwtRk1lPD7jb7SKGUvb7vWvoTdCbqIkXNCF6arjNZuNtt1sCAtPDZwp09YMe4AyZ+bSAWmvFUILm4Y7Fo0xderQUep5Rq9XKW6/XBAQ/+fi8AZ5GhicwZj1+i4vFIl4ul5QQZ/lYC8AX5Pi+58nsh8LNZjOfoZT5fO7neAPwZgaUGeIB/F+Fm0wmznQ6jRlKyH1b1uvgred5zbmy6+6Ao9EoGI/HBHh5ftF/6SXZdVe44XDoMJqhBFWgxwO/V8CvwK+Z4rfY7/eDOI4JsC4cDAYO4yVYl8lM3CE7C4XrdrsuQym9Xi+qlVQyW3YArrWp3W6HDKV0Oh1usler1fLTHnku0iOzxQ+EtiUfDAHYYOsl5I6+0Oj9yDNHYNSM84KADqOhNyq65K5fX/wP9tpfznrV9kWu7dbtn1bxgCHj1sorfKmwaEDFUMUo21XrCsNpyVD4yl8GflLvetcfqy+dCCa6ODMoXAAAAABJRU5ErkJggg=="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAArElEQVR42u3YywnAIBBFUTtJaSnFUqzLhVjKZDZmI8HfGx3CPLj7AyKIjoic5pwBDWhAA+oBei5wlxMYClgGh6KBcKgUEAaVBi5DdwGnobuBw9BTwG7oaWATqgX4CdUGrKBagWX3MjCl5DmSKOe8Dowxeo7ABQ5zxGDgC4NdEhCwgmkBfsJOA5uwU8Bu2G7gMGwXcBomDVyGSQFhMDQQDkO+ZuxnwYAGNOAfgQ8LTbXBn1RvGQAAAABJRU5ErkJggg=="/><element name="playIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACJElEQVR42u2YS0sCURTHNc3sTWEPelMQUQQtKnptIojosWgdFLTIFu2qdZ8i6Cv0BVq3KUi3IqgI4hN0rS5v/xtnahh1Gqd7Z0bowA/EWcyPM/ece+9xMcZcTsbVcoJ6gedul4VhSJBLEW0a3LKFdQVVYh7gBT7QQfjoP48ia5egh4S6QT8YJPjvHuAH7bJEGwpq5PrACJgB88QsGAcBet4pQ1RPsI1eyLM0ChbABtgD+2AXrINFMAWGZIg2ajNKQfDsDYA5sA2ewRt4ANfgDByCLbAEpkWL6gl66CXDYBmcgBf2E1HwCG7BBTiWIaon6KXCGANrlK1XVhtx8ATuZYgaEZwAm+ASvLPGkZAh+psgL5BJWn9X4IP9HkJFjQrugCAIMeMhRLQZQV61YdZ86Ikq7amXGr5XK2mFYCPRI1rbi/QOvjt1UTa/Ja0U1IregXNwAFZpZwpoJe0QVLcn3kdvwCntUrOUST+tSVsFlYjQzsQ3ghXquz2URUcIKvFEa3Kaqlv5zMYFi8ViOJlMMhmUSqW/CxYKhXAsFmMiSafTkXK5LOYTixTMZDLxSqUitkhECEIsUa1W5bSZvwiqxOQ1ajOCdcSkbXVBCIYEiQk/LHwdt/L5/IdVYqYOrBB8t0rM1JE/l8u91msXMsRMXZqy2eyLqsFGqY/ZdmmquXZC6jmVSr1R57fv2un4i3tLjD4cPzxqifGb4weYjh0B/0/5m+QT3Dh1BNFdpj4AAAAASUVORK5CYII="/><element name="replayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABxUlEQVR42u2XwY3CMBBF0wElpARKcAkpISWkhJRACS5hS3AJnOHAwoEDB2QOHJCQmP2DcrBGycZ2BtiVMtKTEGLe/NixJYq55prrxUVEBjSgBStgu88NMJ8KVXZBPI2XBxaU7wi2AJbyy7LjVeGWwNP08uzSDlcDPzLUCcZ+X79j5RyofumtgNNeSfnO+QG5SfCYIc+kd3LgQKxzpNzT9cqy2VfJ4BPr70iptXpG42JXWcXH4+EBBbhCqdgl3D5JcL/fDSBBpRWQXT3++N253W4NoABfKBc7xYwmuvl6vbaAApx2QHaKGW108+VysYAC1AOyU8yID3g+n1eAAtQDslPMiA94Op1aQAHqAdkpZsQHPB6PDaAA9UPCTjEj/pAcDgcDSJB1zez3e9Pjr3r8Jkm82+08oADe5lSH6Xqt+N4Jd/oObbdbCyhks9mYREcd9D9DskN6gU0OCFEJSODBIsGxEv22c5Ag7/9KJyTBV0K/AzSCLXKLV6vnieuEftkr+RY7khVyGQyqJ74iEp0/TxBVTGKPedX2aj1UC+jPhuTDBEgvpH7AdUJA/4GAw2GAAy2oNQ7KlEt+DWwXxoBFMddc/6x+ACbEv+zn5grUAAAAAElFTkSuQmCC"/><element name="replayIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAGZklEQVR42rWYTWxUVRiGoTPM0LG20IEypUCKTX9IhCK0iqAVGtQAIUasAyaAWkaJJlZMhigs8CcaEhdSdSNx0bhRFrqQjS66BTFGFiSFgC2/bWkhQIFSZ4pwfW/ynOTkwO3l9yZPAnfO+b53vvOd95zpuLt9PM8bb1EgIhB1iECBPWfcw3psUQiYIOKiUCTEIw4JPoszNmqLfRjCIkYUyYtFqSgT5aJCzIAK3pUxppg5RmzkgQh1KjZRFJEwJSpFrZgnGsQisRgW8W4eYyqZU0qMiXZF70dcRMRYslKqUyMWiCaxUrSI9aJVZKCVdy2MaWJODTFKiRkz1bxXcXGWJyWqRaN4QaTF2yIrOkSn2C8Oii7+3clnWcammdtIrBSx4wEiQ8VNFCV847limVgn2kQ7QvIi7Mkztp2564g1l9gl5ELkHVaOiTPFfLGCpdspjoh7fY4QI0PM+eQosSsZtiFilH4GAVaJd0UH1bivhxgdxFxFjhnkjAVuHARGad4US7CCQL+JfEjSs6IfzoaOV0xiryBXitxRBAb2XZLd1iwyIZUbEHvFJ2KreB+28m6vGAipZIZcNeR2+hGBGGgR5W6kmXcGiBsVv4odYrNIYyfLYaVI89kOxo4GiNxJrkZyF6FlvNt7cfypFjtoC9gQQ2K3yBK4GY+rE1VQx7tmxmSZMxSwcdrIWYuGuOlFu/cSopzAa7EF9xkl0QdiDSdGNfOSogSSvKtmzBrm7A6oZDs5FzAvYXrRXt5ijqQmjLXLjcJSZUnYKGYjpohvHYM475KMaWROlhju00XOJjRIC8vsLG8d/ZO9efNmTngWA/TTOqoymzmFBONqJbhY8FkpYxcxd4cfy4mdQ/xKUWcv8ziCFXLzqBctN27c6Lh+/bpno3d7afpmli7JPPfQdy8ZhYytZu5mP9Zt4nf4udFQxryIEWj6r0Fs0ITOXC7nWeSxjbTpE2u3FYQYv3GH6cxN+7H8mHYOP6efGw30oQRa5lzBMrRqwv7h4WHPMDIychZvM0uQDDma3Crir7SQYvkx7Rx+Tj83GiqMaRuBxv8Wi4wmdA0NDXmGK1eu9GHAy7GRSeZYCrt5O71YLZ4XW/yYdo5r164dwLQXGz8MFKjJBy9cuOCBHyBYYHDV4ggrwnqmWR67RTH77RxXr14NFugu8eXLl/cPDg564Adwltgx09tsDERNFeUkrKIHXxIf+jHtHMoZtMS3bhJ9u86+vj7P0N/fbzbJq+IJxtoHu3ueT0JUragn7tNU7w3xhR/TzqGcQZvkVptRuTtOnTrl2egb+jbzlnhOPIYIU0X7qvYoFZgnll68eHE79vGa2CS2q4V+d+MrZ4DNBBj1iRMncsePH/cMZ86c8Zd5m3iZICmRsHzQvQ0tu3Tp0uea61fob/3/Yy4G3/X29p63YytXoFEHHnUS1HXs2DHPRsuwhz551jqSYoiLIjhFG7xy7ty5PWauRPXo3c+q1J9uXOU6zCHgHnXBlwX51K6jR496NgqWy+fzH+nzF+2bhznaWN5ZYololai/7Pmq5HnF+M+Nq1zfcAwudC8LY1233jt9+vRhN5iW4xBLMcdcMAkWoy+rsKM2je1jXiCq3j84xConJg4RfGFNj46OfuZXzQ44MDDwAwJqxGQRt08LkqwW2zQ3P5a47u7uER1x32vsO2Ipl4oSx2Mdi8Dx2a0btOPalehfBfT96kes5imW0vRg1HGCtJbt27Dq6fTYp7G7RCsGPZM24UYd8KMJ15+DyBY1+9c+3OmeoXpTERW1e5jqb/Q3VJjAXj0a+5UlcFaYQNvLUghp8EXBQqo7zbrNROzjEkPeJCM+gJAxUZ934a/uDi4Y8+8xJJyC6VZChblBW/ZSYAmcyQ7OnDx5shsRoWjsPusAcHowWOQE+7CHIucGTdWxGAlkqd7s6ekZRMCdMMwXqwwT6C63ERoDhHG8gVXBCvOTNUiMv7NlP/16/lBf/6Ij9FNsq15Mt3923tWfel1RDHONfpp4XDt/IzbSpx47JDH7tGl+km196Z/FXN0yYi2eu5DqTXZ+uN/341rUZBIt4GLawg3ldbEei1qNjy5BWB2tUWqf7Q9WIH2IRSWxizmcyU9Cg6jnfRVjyhlfbHrbFfcwRCZo9ClY1XQoF2UImsSmSlD52IOtXPiPpBiJEwF/9TcbLupuOjfu/32eYAv3OqcpAAAAAElFTkSuQmCC"/></elements></component><component name="dock"><settings><setting name="iconalpha" value="0.75"/><setting name="iconalphaactive" value="0.5"/><setting name="iconalphaover" value="1"/><setting name="margin" value="8"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABD0lEQVR42u2XQQ6CMBREm97BeCnjIQjcxLt4KVckrKuphYIC/jEtKRu3fxaSDGlh0ZeZ/2mxRq66rs+iW9M0bw1hbTCAxVZVdVqW5eq9P7Rte9cQ1gYDWOw8zxd5ELque4QQeg1hbTCAxQrZ0Tn3XNd11BQYwAKgkUmI7DsQyklTYAALn0Nyi4lyVBZciltkDNpFpu3QrqizZcoiLeqi7dUj2xxKFa6q/C3idIiyywgiI3ZIBi9th8BQdhmFdl3GuJepn4fy8eMf2c/IEtBEENnEu9uz1BBvlzFGRvHXwRmZUMU0icpCUUfL4E7pEhwayvOIllLbD3DIY2KMUSvsvDZYrHPuLYM+v9BQgunB8gFJekgEq5c0PwAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR42mP4//8/AzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><settings><setting name="activecolor" value="bfbfbf"/><setting name="backgroundcolor" value="262626"/><setting name="fontcolor" value="999999"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="overcolor" value="cccccc"/><setting name="titlecolor" value="cccccc"/><setting name="titleactivecolor" value="ffffff"/><setting name="titleovercolor" value="ffffff"/><setting name="titlesize" value="13"/><setting name="titleweight" value="normal"/></settings><elements><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAACCAIAAABANcwGAAAAKElEQVR42mNhGPqAmZmZiYkJQsIZuLgsvr6+Q9q3/2Dg79+/yAxcXADiODDtLQ68BAAAAABJRU5ErkJggg=="/><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAMElEQVR42u3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXA2RQAAEB5C4HAAAAAElFTkSuQmCC"/><element name="itemActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAkklEQVR42u3QsQkAIAxFQQsHy/4LqYWohYW9IAj34ENIeTkiRvq7vlb3ynHXB/+Wk64CCBAgQIACCBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQAEECBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQJ1NmcoiAdM9H4IAAAAASUVORK5CYII="/><element name="itemImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAAAAACpLjUBAAAAeklEQVR42mPiJQswMXCSARiYGFjIAEBtZAEmRnJ0MZJrG321jfpt1G+DzW8jMUj2lzMwlO8n2W87PMrLPXaQ7LfOHR4eOzpJ99vLe/deku63eItDhyziSfab5fGFC49bkuy3jIUMDAszRtPkaDYd9duo34aT3/6TARgA1wJNszqw3XsAAAAASUVORK5CYII="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAEElEQVR42mNiIA78J4AJAgCXsgf7Men2/QAAAABJRU5ErkJggg=="/><element name="sliderRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAJklEQVR42mNgIA78J4CpBu7jseQ+NS3yx2ORPwOVgT+az+6TYgkAKMIaoyp3CGoAAAAASUVORK5CYII="/><element name="sliderRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAALElEQVR42mNgIB74A/F9IP4PxfehYlQF/kgWoGOqWnYfj0X3qWnRfwKYIAAAPu0ao3yGmCgAAAAASUVORK5CYII="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAMElEQVR42mP+//8/Q0NDA16sqqr6Pycnp6G0tLShqqqqoba2tgEEGhsbG6CgkZAZAEhcK/uBtK2eAAAAAElFTkSuQmCC"/><element name="sliderThumbCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUElEQVR42q3NoREAIQwEwHSYJjOo1IBIDfEx+EgEDMfLVwyCbWDphoig1gp3R2sNmYneO+acWGuBXimlxCEKekVV+RAxvWRm/EXxi2KMcZ1sxLJpnEUZrv0AAAAASUVORK5CYII="/><element name="sliderThumbCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUklEQVR42q3NoREAIQwFUTpMk0wUNSBSAz4mPhIBk8/JUwwiW8C+8pqI0BhDzQzujjmnrrWoZNZao947Pgg/CHtvREQexsx6gTQNqrXiAuHlcQDl9mmceNYnwwAAAABJRU5ErkJggg=="/></elements></component><component name="tooltip"><settings><setting name="fontcase" value="normal"/><setting name="fontcolor" value="cccccc"/><setting name="fontsize" value="12"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="cccccc"/><setting name="overcolor" value="ffffff"/></settings><elements><element name="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAASklEQVR42p3KQQ2AMAAEwXOAi/lWSqUgpZIqASmVAN+GNECYZH8bHDhfOoLyYSxJEuwP054Z+mLqucOGMU0DW1ZQp7HmCRpa/roABHU6b1RN/woAAAAASUVORK5CYII="/><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTopLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVR42mNgAAI1NTV/IL4PxP9hnP8wzACTQRb4j4wBSrYUAF5mO7QAAAAASUVORK5CYII="/><element name="capTopRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVR42mNQU1P7D8T3gdifAQSgAjDsjy5wH13gPwBoAhQA/dBvkQAAAABJRU5ErkJggg=="/><element name="capBottomLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHUlEQVR42mNQU1P7j4wZgMR9dAF/FAEQgAqCVQIAxzkUAKo9yiMAAAAASUVORK5CYII="/><element name="capBottomRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHElEQVR42mNQU1P7j4wZ0ATuowv4wwTugzlAAADkhRQAhODqdgAAAABJRU5ErkJggg=="/><element name="menuTopHD" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAYCAYAAABtGnqsAAABKUlEQVR42u2WYQ2DMBSEcYCESuAHAioBCZOAhOFgEiahEpCAhEpAQtcu1+TSwSDbfrDtvuQFWtpHe7lXqCohhBAPDMPQxBhjhBhzjDM9O3MbfWmspfYVc82zeegPlCMUkfpc8f4aa2qOKl5eYI+2iTHlTewU0Mc4bQnPAq6No/UYtN1SniMJmDbuFhzp9wgYr11yIO6ndwWknPd3cM6jCrhValsCJod0VMrduwJS3nDY0qWF9tlB1Gf2OBDlVp5j7kMCpvzjN3xATD6kIYjjcwclPi6dUXhWiu/x7D8EJJFmOMvDSX3hOI/rTOJOuWRp7CWLQnPGLMZPCkjOsuTEtLG6+LDY4lfFruRp4ELLsTQH48xaHv1kCiGEECLStm1QvB5ykBBCiJe5AX69621Fd8YvAAAAAElFTkSuQmCC"/><element name="menuTopCC" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAABjklEQVR42u1X3c2DMAzsBhmBEXhggIzACIzACGUDRmCEjsAIGSEjMAIfkS7oegr0oQ/9IvkkC2HH+fHZDjweBoPBYDAIpmlqD1kP2Q/ZDhnEPsA2kM5Dt5PfWNBnSfpnEpojvUfYwyE92ZJulPXWi/3ONQff5eDhvcG7pzGvFJwcAA2I+DUcRFnrJABkhTwe8yX/lgiIYl9pP0/af9CkqYmAlN0v0TV08HTASAdvSgRAF4S4OwJiDjbZEykLVwAFnQlYMJfT/dZIwFtbKNjHXOIga6aAxOyPoATxvSNgL6zFQd7xXLEu2xzmCpCTjBoJOLNOKqClrH7r9RcEjBqEDwRsmrVcjURAbm09V4O00EXPUBMBDfde7rGwRRm/aEbezH1HwMxBo17eqy9d1iu1r/6ujdZ4D2wo94inQ5BmGdvD/i0BDkTn9d6+Zgq+Qb6CNmpBm94ntX4NeamEttRbMc59OjS3iqvLEjpfaF/+qi3KPrz9SBgMBoPBYDD8a3Rdt5v8TiwDDQaDwWD4Ef4AO4h4lB2vwSEAAAAASUVORK5CYII="/><element name="menuOption" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAuElEQVR42u2SQQqGIBCF/wOU1UYUMjAiQdSTeI4O2DnmUL9PatVq3AUNPBhEPt6bmd9XL6u+77uiXHRAV9+1wvais4iEEFXor7e9xdkJiJSSjDG0LAsppWgYhgplOb2iVdi2bRRCqHLOkdb6dpo5wAPu4AyglFJVjJGstTSOI+EPF4iYD+C6rjRNExuIyJgZYgJU5b2neZ7vBWX2UrAAzAwx4QwwuLuX0no2mBlAcMY4G85hf/Wu+gNm+kvWRCvtuQAAAABJRU5ErkJggg=="/><element name="menuOptionOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="menuOptionActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="volumeCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAAPklEQVR42u3MoREAIAwDQDpI95+xVwG2AjziY3IR+ViPZOaeu7tXVc2O2y+AQCAQCAQCgUAgEAgEAoHAP8ADVGLAaqN7TdUAAAAASUVORK5CYII="/><element name="volumeRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAXklEQVR42pXOMQrAIAyFYUGSIeqQuLh4Ju8/eZRXIhQ6WMHhhxDIRwKAsKv3jm+tNagqcs4gIvzdhQM4d2BKCcw8r8FSyqi1Lsgzs/WdgzHGcQ2+qIhMhzyffXe6eQBmfbZnUQ+tqAAAAABJRU5ErkJggg=="/><element name="volumeRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAX0lEQVR42p2OsQrAIAxEhRAHoxB1cfGb/P/JTzkboVsttMODcOEe5wC4EymlEUKYMUYYdlv21jk+VHXUWtFa25RStlREQETjs7D3Pi9wY9Kc8xZ67+cfIZ6EtpKZceot+LS2cEn/XGYAAAAASUVORK5CYII="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAASUlEQVR42u3MQQ0AUQjE0CFYgARQjGvWwBewh/beZ3enV7t77q7MVFWpuzUzigiZmSTZ6zNAQEBAQEBAQEBAQEBAQEBAQMB/gB8nJqOYNsUfIAAAAABJRU5ErkJggg=="/><element name="volumeProgressCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVUlEQVR42pXMwQkAIQxE0XSYshQtImXYhh3kKFiD+L3s3iTgwBz/E0BuTylRSsHMaK3Re2fOyd6bb9dOAtAD0J/BnLMGoD6DgNRa1cz8B8cYvtbSqDn4F/TaDHcq1wAAAABJRU5ErkJggg=="/><element name="volumeProgressCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVElEQVR42mP5//8/Ay7Q09PjLyIiMkFCQkJBUlKSQVxc/IGoqGgBMzPzRlx6WHBJdHZ2+jMxMW1AFgMapAAVCwDijSQZCHT5BAbcYALJBgKBAjlyAHZIEpxZZYn/AAAAAElFTkSuQmCC"/><element name="volumeThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAnklEQVR42mP4//8/AxbMBMTsQMwHxMJALALFwlAxdqgaDL24DOMGYoVly5ZFVldXz6ysrFwOwiA2SAwkB1XDRMhARqjtigcPHsw/d+7c9Z9A8B8KQGyQGEgOpAaqlpGQgSAv2Vy7du38fxwAKmcDVYvXQCZoOHkjuwwdQOW8oWqZCBkICvyA/4RBAFQt/Q2kqpepHilUTzZUT9gUZz0ACDf945eBHBQAAAAASUVORK5CYII="/></elements></component></components></skin>';
        this.xml = a.utils.parseXML(this.text);
        return this
    }
})(jwplayer);
(function (g) {
    var n = jwplayer.utils,
        o = jwplayer.events,
        p = o.state,
        l = n.css,
        m = document,
        a = ".jwdisplay",
        i = ".jwpreview",
        k = ".jwerror",
        d = true,
        j = false,
        b = "absolute",
        c = "none",
        h = "100%",
        e = "hidden",
        f = "opacity .25s, background-image .25s, color .25s";
    g.display = function (t, O) {
        var s = t,
            G = t.skin,
            aa, ad, K, v, I, V, Y, q = j,
            ae = {}, T = j,
            Z = j,
            W = {}, r, L, R, M, ab = n.extend({
                showicons: d,
                bufferrotation: 45,
                bufferinterval: 100,
                fontcolor: "#ccc",
                overcolor: "#fff",
                fontsize: 15,
                fontweight: ""
            }, G.getComponentSettings("display"), O),
            Q = new o.eventdispatcher(),
            w;
        n.extend(this, Q);

        function X() {
            aa = m.createElement("div");
            aa.id = s.id + "_display";
            aa.className = "jwdisplay";
            ad = m.createElement("div");
            ad.className = "jwpreview jw" + s.jwGetStretching();
            aa.appendChild(ad);
            s.jwAddEventListener(o.JWPLAYER_PLAYER_STATE, z);
            s.jwAddEventListener(o.JWPLAYER_PLAYLIST_ITEM, y);
            s.jwAddEventListener(o.JWPLAYER_PLAYLIST_COMPLETE, S);
            s.jwAddEventListener(o.JWPLAYER_MEDIA_ERROR, x);
            s.jwAddEventListener(o.JWPLAYER_ERROR, x);
            aa.addEventListener("click", ac, j);
            U();
            z({
                newstate: p.IDLE
            })
        }

        function ac(af) {
            if (w) {
                w(af);
                return
            }
            switch (s.jwGetState()) {
            case p.PLAYING:
            case p.BUFFERING:
                s.jwPause();
                break;
            default:
                s.jwPlay();
                break
            }
            Q.sendEvent(o.JWPLAYER_DISPLAY_CLICK)
        }
        this.clickHandler = ac;

        function U() {
            var af = {
                font: ab.fontweight + " " + ab.fontsize + "px/" + (parseInt(ab.fontsize) + 3) + "px Arial,Helvetica,sans-serif",
                color: ab.fontcolor
            }, ag = {
                    color: ab.overcolor
                };
            L = new g.displayicon(aa.id + "_button", s, af, ag);
            aa.appendChild(L.element())
        }

        function B(af, ag) {
            if (!ab.showicons) {
                return
            }
            if (af || ag) {
                L.setRotation(af == "buffer" ? parseInt(ab.bufferrotation) : 0, parseInt(ab.bufferinterval));
                L.setIcon(af);
                L.setText(ag)
            } else {
                L.hide()
            }
        }

        function y() {
            C();
            K = s.jwGetPlaylist()[s.jwGetPlaylistIndex()];
            var af = K ? K.image : "";
            M = undefined;
            u(af)
        }

        function u(af) {
            if (v != af) {
                if (v) {
                    N(i, j)
                }
                v = af;
                J()
            } else {
                if (v) {
                    N(i, d)
                }
            }
            A(s.jwGetState())
        }

        function S() {
            Z = d;
            B("replay");
            var af = s.jwGetPlaylist()[0];
            u(af.image)
        }
        var H;

        function F() {
            return R ? R : (s ? s.jwGetState() : p.IDLE)
        }

        function z(af) {
            clearTimeout(H);
            H = setTimeout(function () {
                A(af.newstate)
            }, 100)
        }

        function A(ag) {
            ag = F();
            if (ag != M) {
                M = ag;
                if (L) {
                    L.setRotation(0)
                }
                switch (ag) {
                case p.IDLE:
                    if (!T && !Z) {
                        if (v && !q) {
                            N(i, d)
                        }
                        var af = true;
                        if (s._model && s._model.config.displaytitle === false) {
                            af = false
                        }
                        B("play", (K && af) ? K.title : "")
                    }
                    break;
                case p.BUFFERING:
                    C();
                    Z = j;
                    B("buffer");
                    break;
                case p.PLAYING:
                    B();
                    break;
                case p.PAUSED:
                    B("play");
                    break
                }
            }
        }
        this.forceState = function (af) {
            R = af;
            A(af);
            this.show()
        };
        this.releaseState = function (af) {
            R = null;
            A(af);
            this.show()
        };
        this.hidePreview = function (af) {
            q = af;
            N(i, !af)
        };
        this.element = function () {
            return aa
        };

        function P(af) {
            return "#" + aa.id + " " + af
        }

        function J() {
            if (v) {
                var af = new Image();
                af.addEventListener("load", E, j);
                af.src = v
            } else {
                l(P(i), {
                    "background-image": undefined
                });
                N(i, j);
                I = V = 0
            }
        }

        function E() {
            I = this.width;
            V = this.height;
            A(s.jwGetState());
            D();
            if (v) {
                l(P(i), {
                    "background-image": "url(" + v + ")"
                })
            }
        }

        function x(af) {
            T = d;
            B("error", af.message)
        }

        function C() {
            T = j;
            if (ae.error) {
                ae.error.setText()
            }
        }

        function D() {
            if (aa.clientWidth * aa.clientHeight > 0) {
                n.stretch(s.jwGetStretching(), ad, aa.clientWidth, aa.clientHeight, I, V)
            }
        }
        this.redraw = D;

        function N(af, ag) {
            if (!n.exists(W[af])) {
                W[af] = false
            }
            if (W[af] != ag) {
                W[af] = ag;
                l(P(af), {
                    opacity: ag ? 1 : 0,
                    visibility: ag ? "visible" : "hidden"
                })
            }
        }
        this.show = function () {
            if (L && F() != p.PLAYING) {
                L.show()
            }
        };
        this.hide = function () {
            if (L) {
                L.hide()
            }
        };
        this.setAlternateClickHandler = function (af) {
            w = af
        };
        this.revertAlternateClickHandler = function () {
            w = undefined
        };
        X()
    };
    l(a, {
        position: b,
        cursor: "pointer",
        width: h,
        height: h,
        overflow: e
    });
    l(a + " .jwpreview", {
        position: b,
        width: h,
        height: h,
        background: "no-repeat center",
        overflow: e,
        opacity: 0
    });
    l(a + ", " + a + " *", {
        "-webkit-transition": f,
        "-moz-transition": f,
        "-o-transition": f
    })
})(jwplayer.html5);
(function (d) {
    var i = jwplayer.utils,
        k = jwplayer.events,
        l = k.state,
        g = i.css,
        c = ".jwdisplayIcon",
        f = undefined,
        h = document,
        b = "none",
        e = "100%",
        j = "center",
        a = "absolute";
    d.displayicon = function (J, E, u, B) {
        var K = E,
            x = K.skin,
            q = J,
            y, L, Q, A, w, p, C, G, F = 0;

        function z() {
            y = N("jwdisplayIcon");
            y.id = q;
            v();
            p = N("jwtext", y, u, B);
            C = N("icon", y);
            n();
            o()
        }

        function s(R, S) {
            return "#" + q + (S ? ":hover" : "") + " " + (R ? R : "")
        }

        function N(S, U, T, R) {
            var V = h.createElement("div");
            V.className = S;
            if (U) {
                U.appendChild(V)
            }
            O(S, "." + S, T, R);
            return V
        }

        function v() {
            L = H("background");
            Q = H("capLeft");
            A = H("capRight");
            w = (Q.width * A.width > 0);
            var R = {
                "background-image": "url(" + Q.src + "), url(" + L.src + "), url(" + A.src + ")",
                "background-position": "left,center,right",
                "background-repeat": "no-repeat",
                padding: "0 " + A.width + "px 0 " + Q.width + "px",
                height: L.height,
                "margin-top": L.height / -2
            };
            g(s(), R);
            if (L.overSrc) {
                R["background-image"] = "url(" + Q.overSrc + "), url(" + L.overSrc + "), url(" + A.overSrc + ")"
            }
            g("#" + K.id + " .jwdisplay:hover " + s(), R)
        }

        function O(T, R, V, S) {
            var U = H(T);
            if (T == "replayIcon" && !U.src) {
                U = H("playIcon")
            }
            V = i.extend({}, V);
            if (T.indexOf("Icon") > 0) {
                F = U.width
            }
            if (U.src) {
                V["background-image"] = "url(" + U.src + ")";
                V.width = U.width
            }
            g(s(R), V);
            S = i.extend({}, S);
            if (U.overSrc) {
                S["background-image"] = "url(" + U.overSrc + ")"
            }
            G = U;
            g("#" + K.id + " .jwdisplay:hover " + (R ? R : s()), S)
        }

        function H(S) {
            var T = x.getSkinElement("display", S),
                R = x.getSkinElement("display", S + "Over");
            if (T) {
                T.overSrc = (R && R.src) ? R.src : "";
                return T
            }
            return {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function o() {
            var S = w || (F == 0),
                T = "px " + e,
                R;
            g(s(".jwtext"), {
                display: (p.innerHTML && S) ? f : b
            });
            setTimeout(function () {
                R = Math.max(G.width, i.bounds(y).width - A.width - Q.width);
                if (i.isFF() || i.isIE()) {
                    R++
                }
                if (i.isChrome() && y.parentNode.clientWidth % 2 == 1) {
                    R++
                }
                g(s(), {
                    "background-size": [Q.width + T, R + T, A.width + T].join(",")
                }, true)
            }, 0)
        }
        this.element = function () {
            return y
        };
        this.setText = function (S) {
            var R = p.style;
            p.innerHTML = S ? S.replace(":", ":<br>") : "";
            R.height = "0";
            R.display = "block";
            if (S) {
                while (m(p) > 2) {
                    p.innerHTML = p.innerHTML.replace(/(.*) .*$/, "$1...")
                }
            }
            R.height = "";
            R.display = "";
            o()
        };
        this.setIcon = function (S) {
            var R = N("icon");
            R.id = y.id + "_" + S;
            O(S + "Icon", "#" + R.id);
            if (y.contains(C)) {
                y.replaceChild(R, C)
            } else {
                y.appendChild(R)
            }
            C = R
        };
        var t, r = 0,
            P;

        function I(S, R) {
            clearInterval(t);
            P = 0;
            r = S;
            if (S == 0) {
                M()
            } else {
                t = setInterval(M, R)
            }
        }

        function M() {
            P = (P + r) % 360;
            i.rotate(C, P)
        }
        this.setRotation = I;

        function m(R) {
            return Math.floor(R.scrollHeight / h.defaultView.getComputedStyle(R, null).lineHeight.replace("px", ""))
        }
        var n = this.hide = function () {
            y.style.opacity = 0
        };
        var D = this.show = function () {
            y.style.opacity = 1
        };
        z()
    };
    g(c, {
        display: "table",
        cursor: "pointer",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%"
    }, true);
    g(c + " div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": j
    });
    g(c + " div", {
        "vertical-align": "middle"
    }, true);
    g(c + " .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": j,
        "-webkit-user-select": b,
        "-moz-user-select": b,
        "-ms-user-select": b,
        "user-select": b
    })
})(jwplayer.html5);
(function (e) {
    var k = jwplayer.utils,
        m = jwplayer.events,
        n = m.state,
        i = k.css,
        d = k.bounds,
        b = ".jwdock",
        h = ".jwdockbuttons",
        g = undefined,
        j = document,
        c = "none",
        a = "block",
        f = "100%",
        l = "center";
    e.dock = function (y, H) {
        var B = y,
            A = {
                iconalpha: 0.75,
                iconalphaactive: 0.5,
                iconalphaover: 1,
                margin: 8
            }, t = k.extend({}, A, H),
            o = B.id + "_dock",
            u = B.skin,
            J, D = 0,
            r = {}, s = {}, v, E, I, C = this;

        function w() {
            C.visible = false;
            v = G("div", "jwdock");
            E = G("div", "jwdockbuttons");
            v.appendChild(E);
            v.id = o;
            x();
            setTimeout(function () {
                I = d(v)
            })
        }

        function x() {
            var L = z("button"),
                M = z("buttonOver"),
                N = z("buttonActive");
            if (!L) {
                return
            }
            i(p(), {
                height: L.height,
                padding: t.margin
            });
            i(h, {
                height: L.height
            });
            i(p("button"), {
                width: L.width,
                cursor: "pointer",
                border: c,
                background: L.src
            });
            if (M.src) {
                i(p("button:hover"), {
                    background: M.src
                })
            }
            if (N.src) {
                i(p("button:active"), {
                    background: N.src
                })
            }
            i(p("button>div"), {
                opacity: t.iconalpha
            });
            i(p("button:hover>div"), {
                opacity: t.iconalphaover
            });
            i(p("button:active>div"), {
                opacity: t.iconalphaactive
            });
            i(p(".jwoverlay"), {
                top: t.margin + L.height
            });
            F("capLeft", E);
            F("capRight", E);
            F("divider")
        }

        function F(N, M) {
            var L = z(N);
            i(p("." + N), {
                width: L.width,
                background: L.src
            });
            return G("div", N, M)
        }

        function p(L, M) {
            return "#" + o + " " + (L ? L : "")
        }

        function G(N, L, M) {
            var O = j.createElement(N);
            if (L) {
                O.className = L
            }
            if (M) {
                M.appendChild(O)
            }
            return O
        }

        function z(L) {
            var M = u.getSkinElement("dock", L);
            return M ? M : {
                width: 0,
                height: 0,
                src: ""
            }
        }
        C.redraw = function () {
            I = d(v)
        };

        function K(M) {
            var P = s[M],
                L, O = r[M],
                Q, N = d(O.icon);
            P.offsetX(0);
            Q = d(v);
            i("#" + P.element().id, {
                left: N.left - Q.left + N.width / 2
            });
            L = d(P.element());
            if (Q.left > L.left) {
                P.offsetX(Q.left - L.left + 8)
            }
        }
        C.element = function () {
            return v
        };
        C.offset = function (L) {
            i(p(), {
                "margin-left": L
            })
        };
        C.hide = function () {
            if (!C.visible) {
                return
            }
            C.visible = false;
            v.style.opacity = 0;
            setTimeout(function () {
                v.style.display = c
            }, 150)
        };
        C.show = function () {
            if (C.visible || !D) {
                return
            }
            C.visible = true;
            v.style.display = a;
            setTimeout(function () {
                v.style.opacity = 1
            }, 0)
        };
        C.addButton = function (L, T, P, M) {
            if (r[M]) {
                return
            }
            var N = G("div", "divider", E),
                O = G("button", null, E),
                S = G("div", null, O);
            S.id = o + "_" + M;
            S.innerHTML = "&nbsp;";
            i("#" + S.id, {
                "background-image": L
            });
            if (typeof P == "string") {
                P = new Function(P)
            }
            O.addEventListener("click", function (V) {
                P(V);
                V.preventDefault()
            });
            r[M] = {
                element: O,
                label: T,
                divider: N,
                icon: S
            };
            if (T) {
                var U = new e.overlay(S.id + "_tooltip", u, true),
                    Q = G("div");
                Q.id = S.id + "_label";
                Q.innerHTML = T;
                i("#" + Q.id, {
                    padding: 3
                });
                U.setContents(Q);
                var R;
                O.addEventListener("mouseover", function () {
                    clearTimeout(R);
                    K(M);
                    U.show();
                    k.foreach(s, function (V, W) {
                        if (V != M) {
                            W.hide()
                        }
                    })
                }, false);
                O.addEventListener("mouseout", function () {
                    R = setTimeout(U.hide, 100)
                }, false);
                v.appendChild(U.element());
                s[M] = U
            }
            D++;
            q()
        };
        C.removeButton = function (L) {
            if (r[L]) {
                E.removeChild(r[L].element);
                E.removeChild(r[L].divider);
                delete r[L];
                D--;
                q()
            }
        };
        C.numButtons = function () {
            return D
        };

        function q() {
            i(h + " .capLeft, " + h + " .capRight", {
                display: D ? a : c
            })
        }
        w()
    };
    i(b, {
        opacity: 0,
        display: c
    });
    i(b + " > *", {
        height: f,
        "float": "left"
    });
    i(b + " > .jwoverlay", {
        height: "auto",
        "float": c,
        "z-index": 99
    });
    i(h + " button", {
        position: "relative"
    });
    i(h + " > *", {
        height: f,
        "float": "left"
    });
    i(h + " .divider", {
        display: c
    });
    i(h + " button ~ .divider", {
        display: a
    });
    i(h + " .capLeft, " + h + " .capRight", {
        display: c
    });
    i(h + " .capRight", {
        "float": "right"
    });
    i(h + " button > div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    k.transitionStyle(b, "background .15s, opacity .15s");
    k.transitionStyle(b + " .jwoverlay", "opacity .15s");
    k.transitionStyle(h + " button div", "opacity .15s")
})(jwplayer.html5);
(function (a) {
    var e = jwplayer,
        c = e.utils,
        d = e.events,
        b = d.state,
        f = e.playlist;
    a.instream = function (o, i, j, M) {
        var R = {
            controlbarseekable: "never",
            controlbarpausable: true,
            controlbarstoppable: true,
            playlistclickable: true
        };
        var H, Q, n = o,
            l = i,
            k = j,
            B = M,
            r, E, m, J, h, L, O, D, u, S = false,
            g, C, x, w = this,
            G = false,
            A = true;
        this.load = function (U, T) {
            if (c.isAndroid(2.3)) {
                K({
                    type: d.JWPLAYER_ERROR,
                    message: "Error loading instream: Cannot play instream on Android 2.3"
                });
                return
            }
            S = true;
            Q = c.extend(R, T);
            H = new f.item(U);
            C = document.createElement("div");
            C.id = w.id + "_instream_container";
            r = B.detachMedia();
            P();
            x = new a.model({}, O);
            p();
            x.addEventListener(d.JWPLAYER_ERROR, K);
            L = l.playlist[l.item];
            h = l.getVideo().checkComplete() ? b.IDLE : o.jwGetState();
            if (B.checkBeforePlay()) {
                h = b.PLAYING;
                A = false
            }
            E = r.src ? r.src : r.currentSrc;
            m = r.innerHTML;
            J = r.currentTime;
            x.setPlaylist([U]);
            if (!G) {
                if (h == b.BUFFERING || h == b.PLAYING) {
                    r.pause()
                }
                u = new a.display(w);
                u.setAlternateClickHandler(function (V) {
                    if (x.state == b.PAUSED) {
                        w.jwInstreamPlay()
                    } else {
                        w.jwInstreamPause();
                        y(d.JWPLAYER_INSTREAM_CLICK, V)
                    }
                });
                C.appendChild(u.element());
                if (!c.isMobile()) {
                    D = new a.controlbar(w);
                    C.appendChild(D.element());
                    if (n.jwGetControls()) {
                        D.show();
                        u.show()
                    }
                }
                k.setupInstream(C, D, u, r);
                I();
                O.load(x.playlist[0])
            }
        };

        function K(U) {
            if (U.type == d.JWPLAYER_MEDIA_ERROR) {
                var T = c.extend({}, U);
                T.type = d.JWPLAYER_ERROR;
                y(T.type, T)
            } else {
                y(U.type, U)
            }
            G = true;
            w.jwInstreamDestroy(false)
        }
        this.jwInstreamDestroy = function (T) {
            if (!S) {
                return
            }
            S = false;
            if (h != b.IDLE) {
                O.load(L, false)
            } else {
                O.stop()
            }
            g.resetEventListeners();
            if (!G) {
                u.revertAlternateClickHandler()
            }
            O.detachMedia();
            k.destroyInstream();
            if (D) {
                try {
                    D.element().parentNode.removeChild(D.getDisplayElement())
                } catch (U) {}
            }
            y(d.JWPLAYER_INSTREAM_DESTROYED, {
                reason: (T ? "complete" : "destroyed")
            }, true);
            B.attachMedia();
            if (h == b.BUFFERING || h == b.PLAYING) {
                r.play();
                if (l.playlist[l.item] == L) {
                    if (A) {
                        l.getVideo().seek(J)
                    }
                }
            }
            return
        };
        this.jwInstreamAddEventListener = function (T, U) {
            g.addEventListener(T, U)
        };
        this.jwInstreamRemoveEventListener = function (T, U) {
            g.removeEventListener(T, U)
        };
        this.jwInstreamPlay = function () {
            if (!S) {
                return
            }
            O.play(true);
            l.state = jwplayer.events.state.PLAYING;
            if (n.jwGetControls()) {
                u.show()
            }
        };
        this.jwInstreamPause = function () {
            if (!S) {
                return
            }
            O.pause(true);
            l.state = jwplayer.events.state.PAUSED;
            if (n.jwGetControls()) {
                u.show()
            }
        };
        this.jwInstreamSeek = function (T) {
            if (!S) {
                return
            }
            O.seek(T)
        };

        function N() {
            g = new d.eventdispatcher();
            n.jwAddEventListener(d.JWPLAYER_RESIZE, I);
            n.jwAddEventListener(d.JWPLAYER_FULLSCREEN, s)
        }

        function p() {
            x.setVolume(l.volume);
            x.setMute(l.mute)
        }

        function P() {
            O = new a.video(r);
            O.addGlobalListener(q);
            O.addEventListener(d.JWPLAYER_MEDIA_META, z);
            O.addEventListener(d.JWPLAYER_MEDIA_COMPLETE, F);
            O.addEventListener(d.JWPLAYER_MEDIA_BUFFER_FULL, t);
            O.addEventListener(d.JWPLAYER_MEDIA_ERROR, K);
            O.addEventListener(d.JWPLAYER_PLAYER_STATE, v);
            O.attachMedia();
            O.mute(l.mute);
            O.volume(l.volume)
        }

        function q(T) {
            if (S) {
                y(T.type, T)
            }
        }

        function s(T) {
            q(T);
            I()
        }

        function t(T) {
            if (S) {
                O.play()
            }
        }

        function F(T) {
            if (S) {
                setTimeout(function () {
                    w.jwInstreamDestroy(true)
                }, 10)
            }
        }

        function z(T) {
            if (T.width && T.height) {
                k.resizeMedia()
            }
        }

        function y(T, U, V) {
            if (S || V) {
                g.sendEvent(T, U)
            }
        }

        function I() {
            if (D) {
                D.redraw()
            }
            if (u) {
                u.redraw()
            }
        }

        function v(T) {
            if (!S) {
                return
            }
            l.state = T.newstate
        }
        this.jwPlay = function (T) {
            if (Q.controlbarpausable.toString().toLowerCase() == "true") {
                this.jwInstreamPlay()
            }
        };
        this.jwPause = function (T) {
            if (Q.controlbarpausable.toString().toLowerCase() == "true") {
                this.jwInstreamPause()
            }
        };
        this.jwStop = function () {
            if (Q.controlbarstoppable.toString().toLowerCase() == "true") {
                this.jwInstreamDestroy();
                n.jwStop()
            }
        };
        this.jwSeek = function (T) {
            switch (Q.controlbarseekable.toLowerCase()) {
            case "never":
                return;
            case "always":
                this.jwInstreamSeek(T);
                break;
            case "backwards":
                if (x.position > T) {
                    this.jwInstreamSeek(T)
                }
                break
            }
        };
        this.jwSeekDrag = function (T) {
            x.seekDrag(T)
        };
        this.jwGetPosition = function () {};
        this.jwGetDuration = function () {};
        this.jwGetWidth = n.jwGetWidth;
        this.jwGetHeight = n.jwGetHeight;
        this.jwGetFullscreen = n.jwGetFullscreen;
        this.jwSetFullscreen = n.jwSetFullscreen;
        this.jwGetVolume = function () {
            return l.volume
        };
        this.jwSetVolume = function (T) {
            x.setVolume(T);
            n.jwSetVolume(T)
        };
        this.jwGetMute = function () {
            return l.mute
        };
        this.jwSetMute = function (T) {
            x.setMute(T);
            n.jwSetMute(T)
        };
        this.jwGetState = function () {
            return l.state
        };
        this.jwGetPlaylist = function () {
            return [H]
        };
        this.jwGetPlaylistIndex = function () {
            return 0
        };
        this.jwGetStretching = function () {
            return l.config.stretching
        };
        this.jwAddEventListener = function (U, T) {
            g.addEventListener(U, T)
        };
        this.jwRemoveEventListener = function (U, T) {
            g.removeEventListener(U, T)
        };
        this.jwSetCurrentQuality = function () {};
        this.jwGetQualityLevels = function () {
            return []
        };
        this.skin = n.skin;
        this.id = n.id + "_instream";
        N();
        return this
    }
})(jwplayer.html5);
(function (c) {
    var m = c.utils,
        h = c.html5,
        l = m.css,
        o = c.events.state,
        i = undefined,
        j = "free",
        f = "pro",
        g = "premium",
        n = "ads",
        e = "open",
        p = "http://www.longtailvideo.com/jwpabout/?a=l&v=",
        a = "visible",
        d = "hidden",
        k = ".jwlogo";
    var b = h.logo = function (x, y) {
        var D = x,
            E = D.id + "_logo",
            u, r, v = b.defaults,
            C = false;

        function w() {
            B();
            s()
        }

        function B() {
            var F = "o";
            if (D.edition) {
                F = z(D.edition())
            }
            if (F == "o" || F == "f") {
                v.link = ""
            }
            u = m.extend({}, v, y);
            u.hide = (u.hide.toString() == "true")
        }

        function s() {
            r = document.createElement("img");
            r.className = "jwlogo";
            r.id = E;
            if (!u.file) {
                r.style.display = "none";
                return
            }
            var F = (/(\w+)-(\w+)/).exec(u.position),
                G = {}, H = u.margin;
            if (F.length == 3) {
                G[F[1]] = H;
                G[F[2]] = H
            } else {
                G.top = G.right = H
            }
            l(q(), G);
            r.src = "";
            r.onclick = A
        }
        this.resize = function (G, F) {};
        this.element = function () {
            return r
        };
        this.offset = function (F) {
            l(q(), {
                "margin-bottom": F
            })
        };
        this.position = function () {
            return u.position
        };
        this.margin = function () {
            return parseInt(u.margin)
        };

        function t() {
            if (D.jwGetState() == o.IDLE || D.jwGetState() == o.PAUSED) {
                D.jwPlay()
            } else {
                D.jwPause()
            }
        }

        function A(F) {
            if (m.exists(F)) {
                F.stopPropagation()
            }
            if (!C || !u.link) {
                t()
            }
            if (C && u.link) {
                D.jwPause();
                D.jwSetFullscreen(false);
                window.open(u.link, u.linktarget)
            }
            return
        }

        function z(F) {
            if (F == f) {
                return "p"
            } else {
                if (F == g) {
                    return "r"
                } else {
                    if (F == n) {
                        return "a"
                    } else {
                        if (F == j) {
                            return "f"
                        } else {
                            return "o"
                        }
                    }
                }
            }
        }

        function q(F) {
            return "#" + E + " " + (F ? F : "")
        }
        this.hide = function (F) {
            if (u.hide || F) {
                C = false;
                r.style.visibility = "hidden";
                r.style.opacity = 0
            }
        };
        this.show = function () {
            C = true;
            r.style.visibility = "visible";
            r.style.opacity = 1
        };
        w();
        return this
    };
    b.defaults = {
        prefix: m.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: false,
        position: "top-right"
    };
    l(k, {
        cursor: "pointer",
        position: "absolute",
        "z-index": 100,
        opacity: 0
    });
    m.transitionStyle(k, "visibility .15s, opacity .15s")
})(jwplayer);
(function (c) {
    var f = c.html5,
        j = c.utils,
        i = j.css,
        h = "jwmenu",
        d = "jwoption",
        g = undefined,
        a = "#ffffff",
        b = "#cccccc";
    f.menu = function (l, m, A, s) {
        var w = A,
            y = l,
            x = m,
            n = s,
            p = new f.overlay(x + "_overlay", A),
            q = j.extend({
                fontcase: g,
                fontcolor: b,
                fontsize: 11,
                fontweight: g,
                activecolor: a,
                overcolor: a
            }, A.getComponentSettings("tooltip")),
            o, z = [];

        function v() {
            o = t(h);
            o.id = x;
            var F = r("menuTop" + l),
                D = r("menuOption"),
                C = r("menuOptionOver"),
                E = r("menuOptionActive");
            if (F) {
                o.appendChild(F.image)
            }
            if (D) {
                var B = "#" + m + " ." + d;
                i(B, {
                    "background-image": D.src,
                    height: D.height,
                    color: q.fontcolor,
                    "padding-left": D.width,
                    font: q.fontweight + " " + q.fontsize + "px Arial,Helvetica,sans-serif",
                    "line-height": D.height,
                    "text-transform": (q.fontcase == "upper") ? "uppercase" : g
                });
                i(B + ":hover", {
                    "background-image": C.src ? C.src : g,
                    color: q.overcolor
                });
                i(B + ".active", {
                    "background-image": E.src ? E.src : g,
                    color: q.activecolor
                })
            }
            p.setContents(o)
        }
        this.element = function () {
            return p.element()
        };
        this.addOption = function (B, D) {
            var C = t(d, o);
            C.id = x + "_option_" + D;
            C.innerHTML = B;
            C.addEventListener("click", u(z.length, D));
            z.push(C)
        };

        function u(B, C) {
            return function () {
                k(B);
                if (n) {
                    n(C)
                }
            }
        }
        this.clearOptions = function () {
            while (z.length > 0) {
                o.removeChild(z.pop())
            }
        };
        var k = this.setActive = function (B) {
            for (var C = 0; C < z.length; C++) {
                var D = z[C];
                D.className = D.className.replace(" active", "");
                if (C == B) {
                    D.className += " active"
                }
            }
        };

        function t(C, B) {
            var D = document.createElement("div");
            if (C) {
                D.className = C
            }
            if (B) {
                B.appendChild(D)
            }
            return D
        }

        function r(B) {
            var C = A.getSkinElement("tooltip", B);
            return C ? C : {
                width: 0,
                height: 0,
                src: g
            }
        }
        this.show = p.show;
        this.hide = p.hide;
        this.offsetX = p.offsetX;
        v()
    };

    function e(k) {
        return "." + k.replace(/ /g, " .")
    }
    i(e(h + " " + d), {
        "background-repeat": "no-repeat",
        cursor: "pointer",
        position: "relative"
    })
})(jwplayer);
(function (b) {
    var a = jwplayer.utils,
        d = jwplayer.events,
        e = undefined,
        c = true,
        f = false;
    b.model = function (j, i) {
        var p = this,
            l, r, s = a.getCookies(),
            g = {
                controlbar: {},
                display: {}
            }, n = {
                autostart: f,
                controls: c,
                debug: e,
                fullscreen: f,
                height: 320,
                mobilecontrols: f,
                mute: f,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                repeat: f,
                skin: e,
                stretching: a.stretching.UNIFORM,
                width: 480,
                volume: 90
            };

        function o(t) {
            a.foreach(t, function (u, v) {
                t[u] = a.serialize(v)
            });
            return t
        }

        function q() {
            a.extend(p, new d.eventdispatcher());
            p.config = o(a.extend({}, n, s, j));
            a.extend(p, {
                id: j.id,
                state: d.state.IDLE,
                duration: -1,
                position: 0,
                buffer: 0
            }, p.config);
            p.playlist = [];
            p.setItem(0);
            if (i) {
                l = i;
                r = l.getTag()
            } else {
                r = document.createElement("video");
                l = new b.video(r)
            }
            l.volume(p.volume);
            l.mute(p.mute);
            l.addGlobalListener(k)
        }
        var m = {};
        m[d.JWPLAYER_MEDIA_MUTE] = "mute";
        m[d.JWPLAYER_MEDIA_VOLUME] = "volume";
        m[d.JWPLAYER_PLAYER_STATE] = "newstate->state";
        m[d.JWPLAYER_MEDIA_BUFFER] = "bufferPercent->buffer";
        m[d.JWPLAYER_MEDIA_TIME] = "position,duration";

        function k(t) {
            var A = (m[t.type] ? m[t.type].split(",") : []),
                x, z;
            if (A.length > 0) {
                for (x = 0; x < A.length; x++) {
                    var v = A[x],
                        w = v.split("->"),
                        y = w[0],
                        u = w[1] ? w[1] : y;
                    if (p[u] != t[y]) {
                        p[u] = t[y];
                        z = true
                    }
                }
                if (z) {
                    p.sendEvent(t.type, t)
                }
            } else {
                p.sendEvent(t.type, t)
            }
        }
        p.getVideo = function () {
            return l
        };
        p.seekDrag = function (t) {
            l.seekDrag(t)
        };
        p.setFullscreen = function (t) {
            if (t != p.fullscreen) {
                p.fullscreen = t;
                p.sendEvent(d.JWPLAYER_FULLSCREEN, {
                    fullscreen: t
                })
            }
        };
        p.setPlaylist = function (t) {
            p.playlist = h(t);
            if (p.playlist.length == 0) {
                p.sendEvent(d.JWPLAYER_ERROR, {
                    message: "Error loading playlist: No playable sources found"
                })
            } else {
                p.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: jwplayer(p.id).getPlaylist()
                });
                p.item = -1;
                p.setItem(0)
            }
        };

        function h(y) {
            var v = [];
            for (var u = 0; u < y.length; u++) {
                var w = a.extend({}, y[u]);
                w.sources = a.filterSources(w.sources);
                if (w.sources.length > 0) {
                    for (var t = 0; t < w.sources.length; t++) {
                        var x = w.sources[t];
                        if (!x.label) {
                            x.label = t.toString()
                        }
                    }
                    v.push(w)
                }
            }
            return v
        }
        p.setItem = function (t) {
            var u;
            var v = false;
            if (t == p.playlist.length || t < -1) {
                u = 0;
                v = true
            } else {
                if (t == -1 || t > p.playlist.length) {
                    u = p.playlist.length - 1
                } else {
                    u = t
                }
            } if (v || u != p.item) {
                p.item = u;
                p.sendEvent(d.JWPLAYER_PLAYLIST_ITEM, {
                    index: p.item
                })
            }
        };
        p.setVolume = function (t) {
            if (p.mute && t > 0) {
                p.setMute(f)
            }
            t = Math.round(t);
            if (!p.mute) {
                a.saveCookie("volume", t)
            }
            k({
                type: d.JWPLAYER_MEDIA_VOLUME,
                volume: t
            });
            l.volume(t)
        };
        p.setMute = function (t) {
            if (!a.exists(t)) {
                t = !p.mute
            }
            a.saveCookie("mute", t);
            k({
                type: d.JWPLAYER_MEDIA_MUTE,
                mute: t
            });
            l.mute(t)
        };
        p.componentConfig = function (t) {
            return g[t]
        };
        q()
    }
})(jwplayer.html5);
(function (j) {
    var e = j.html5,
        q = j.utils,
        m = q.css,
        r = q.transitionStyle,
        c = "relative",
        d = "absolute",
        g = "hidden",
        i = "100%",
        p = "opacity .15s, visibility .15s, left .01s linear",
        k = ".jwoverlay",
        a = "jwcontents",
        o = "top",
        f = "bottom",
        h = "right",
        l = "left",
        s = "#ffffff",
        t = undefined,
        b = document,
        n = {
            fontcase: t,
            fontcolor: s,
            fontsize: 12,
            fontweight: t,
            activecolor: s,
            overcolor: s
        };
    e.overlay = function (G, J, D) {
        var A = J,
            w = G,
            B, P, H = 0,
            I, M, L = D,
            u = q.extend({}, n, A.getComponentSettings("tooltip")),
            y = {}, K = this;

        function C() {
            B = N(k.replace(".", ""));
            B.id = w;
            I = x("arrow", "jwarrow")[1];
            M = I.height;
            m(z("jwarrow"), {
                position: d,
                bottom: L ? t : 0,
                top: L ? 0 : t,
                width: I.width,
                height: M,
                left: "50%"
            });
            O(o, l);
            O(f, l);
            O(o, h);
            O(f, h);
            O(l);
            O(h);
            O(o);
            O(f);
            x("background", "jwback");
            m(z("jwback"), {
                left: y.left,
                right: y.right,
                top: y.top,
                bottom: y.bottom
            });
            P = N(a, B);
            m(z(a) + " *", {
                color: u.fontcolor,
                font: u.fontweight + " " + (u.fontsize) + "px Arial,Helvetica,sans-serif",
                "text-transform": (u.fontcase == "upper") ? "uppercase" : t
            });
            if (L) {
                q.transform(z("jwarrow"), "rotate(180deg)")
            }
            m(z(), {
                padding: (y.top + 1) + "px " + y.right + "px " + (y.bottom + 1) + "px " + y.left + "px"
            });
            K.showing = false
        }

        function z(Q) {
            return "#" + w + (Q ? " ." + Q : "")
        }

        function N(R, Q) {
            var S = b.createElement("div");
            if (R) {
                S.className = R
            }
            if (Q) {
                Q.appendChild(S)
            }
            return S
        }

        function x(Q, S) {
            var R = F(Q),
                T = N(S, B);
            m(z(S.replace(" ", ".")), {
                "background-image": R.src
            });
            return [T, R]
        }

        function O(W, V) {
            if (!V) {
                V = ""
            }
            var S = x("cap" + W + V, "jwborder jw" + W + (V ? V : "")),
                Q = S[0],
                T = S[1],
                R = {
                    "background-image": T.src,
                    width: (W == l || V == l || W == h || V == h) ? T.width : t,
                    height: (W == o || V == o || W == f || V == f) ? T.height : t
                };
            R[W] = ((W == f && !L) || (W == o && L)) ? M : 0;
            if (V) {
                R[V] = 0
            }
            m(z(Q.className.replace(/ /g, ".")), R);
            var U = {}, Y = {}, X = {
                    left: T.width,
                    right: T.width,
                    top: (L ? M : 0) + T.height,
                    bottom: (L ? 0 : M) + T.height
                };
            if (V) {
                U[V] = X[V];
                U[W] = 0;
                Y[W] = X[W];
                Y[V] = 0;
                m(z("jw" + W), U);
                m(z("jw" + V), Y);
                y[W] = X[W];
                y[V] = X[V]
            }
        }
        K.element = function () {
            return B
        };
        var E;
        K.setContents = function (Q) {
            q.empty(P);
            P.appendChild(Q);
            clearTimeout(E);
            E = setTimeout(v, 0)
        };
        K.offsetX = function (Q) {
            H = Q;
            clearTimeout(E);
            v()
        };

        function v() {
            if (B.clientWidth == 0) {
                return
            }
            m(z(), {
                "margin-left": Math.round(H - B.clientWidth / 2)
            });
            m(z("jwarrow"), {
                "margin-left": Math.round((I.width / -2) - H)
            })
        }
        K.borderWidth = function () {
            return y.left
        };

        function F(Q) {
            var R = A.getSkinElement("tooltip", Q);
            if (R) {
                return R
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: t,
                    ready: false
                }
            }
        }
        K.show = function () {
            K.showing = true;
            B.style.opacity = 1;
            B.style.visibility = "visible"
        };
        K.hide = function () {
            K.showing = false;
            B.style.opacity = 0;
            B.style.visibility = g
        };
        C()
    };
    m(k, {
        position: d,
        visibility: g,
        opacity: 0
    });
    m(k + " .jwcontents", {
        position: c,
        "z-index": 1
    });
    m(k + " .jwborder", {
        position: d,
        "background-size": i + " " + i
    }, true);
    m(k + " .jwback", {
        position: d,
        "background-size": i + " " + i
    });
    r(k, p)
})(jwplayer);
(function (b) {
    var a = jwplayer.utils;
    b.player = function (e) {
        var o = this,
            m, j, k, d;

        function n() {
            m = new b.model(e);
            o.id = m.id;
            j = new b.view(o, m);
            k = new b.controller(m, j);
            o._model = m;
            jwplayer.utils.css.block();
            g();
            var p = new b.setup(m, j, k);
            p.addEventListener(jwplayer.events.JWPLAYER_READY, h);
            p.addEventListener(jwplayer.events.JWPLAYER_ERROR, l);
            p.start()
        }

        function h(p) {
            k.playerReady(p);
            a.css.unblock()
        }

        function l(p) {
            a.log("There was a problem setting up the player: ", p);
            a.css.unblock()
        }

        function f() {
            var r = m.playlist,
                p = [];
            for (var q = 0; q < r.length; q++) {
                p.push(c(r[q]))
            }
            return p
        }

        function c(p) {
            var q = {
                description: p.description,
                file: p.file,
                image: p.image,
                mediaid: p.mediaid,
                title: p.title
            };
            a.foreach(p, function (r, s) {
                q[r] = s
            });
            q.sources = [];
            q.tracks = [];
            if (p.sources.length > 0) {
                a.foreach(p.sources, function (r, s) {
                    var t = {
                        file: s.file,
                        type: s.type ? s.type : undefined,
                        label: s.label,
                        "default": s["default"] ? true : false
                    };
                    q.sources.push(t)
                })
            }
            if (p.tracks.length > 0) {
                a.foreach(p.tracks, function (t, s) {
                    var r = {
                        file: s.file,
                        kind: s.kind ? s.kind : undefined,
                        label: s.label,
                        "default": s["default"] ? true : false
                    };
                    q.tracks.push(r)
                })
            }
            if (!p.file && p.sources.length > 0) {
                q.file = p.sources[0].file
            }
            return q
        }

        function g() {
            o.jwPlay = k.play;
            o.jwPause = k.pause;
            o.jwStop = k.stop;
            o.jwSeek = k.seek;
            o.jwSetVolume = k.setVolume;
            o.jwSetMute = k.setMute;
            o.jwLoad = k.load;
            o.jwPlaylistNext = k.next;
            o.jwPlaylistPrev = k.prev;
            o.jwPlaylistItem = k.item;
            o.jwSetFullscreen = k.setFullscreen;
            o.jwResize = j.resize;
            o.jwSeekDrag = m.seekDrag;
            o.jwSetStretching = k.setStretching;
            o.jwGetQualityLevels = k.getQualityLevels;
            o.jwGetCurrentQuality = k.getCurrentQuality;
            o.jwSetCurrentQuality = k.setCurrentQuality;
            o.jwGetCaptionsList = k.getCaptionsList;
            o.jwGetCurrentCaptions = k.getCurrentCaptions;
            o.jwSetCurrentCaptions = k.setCurrentCaptions;
            o.jwSetControls = j.setControls;
            o.jwGetSafeRegion = j.getSafeRegion;
            o.jwForceState = j.forceState;
            o.jwReleaseState = j.releaseState;
            o.jwGetPlaylistIndex = i("item");
            o.jwGetPosition = i("position");
            o.jwGetDuration = i("duration");
            o.jwGetBuffer = i("buffer");
            o.jwGetWidth = i("width");
            o.jwGetHeight = i("height");
            o.jwGetFullscreen = i("fullscreen");
            o.jwGetVolume = i("volume");
            o.jwGetMute = i("mute");
            o.jwGetState = i("state");
            o.jwGetStretching = i("stretching");
            o.jwGetPlaylist = f;
            o.jwGetControls = i("controls");
            o.jwDetachMedia = k.detachMedia;
            o.jwAttachMedia = k.attachMedia;
            o.jwPlayAd = function (q) {
                var p = jwplayer(o.id).plugins;
                if (p.vast) {
                    p.vast.jwPlayAd(q)
                }
            };
            o.jwLoadInstream = function (q, p) {
                if (!d) {
                    d = new b.instream(o, m, j, k)
                }
                d.load(q, p)
            };
            o.jwInstreamPlay = function () {
                if (d) {
                    d.jwInstreamPlay()
                }
            };
            o.jwInstreamPause = function () {
                if (d) {
                    d.jwInstreamPause()
                }
            };
            o.jwInstreamDestroy = function () {
                if (d) {
                    d.jwInstreamDestroy()
                }
                d = undefined
            };
            o.jwInstreamAddEventListener = function (p, q) {
                if (d) {
                    d.jwInstreamAddEventListener(p, q)
                }
            };
            o.jwInstreamRemoveEventListener = function (p, q) {
                if (d) {
                    d.jwInstreamRemoveEventListener(p, q)
                }
            };
            o.jwPlayerDestroy = function () {
                if (j) {
                    j.destroy()
                }
            };
            o.jwIsBeforePlay = function () {
                return k.checkBeforePlay()
            };
            o.jwIsBeforeComplete = function () {
                return m.getVideo().checkComplete()
            };
            o.jwAddEventListener = k.addEventListener;
            o.jwRemoveEventListener = k.removeEventListener;
            o.jwDockAddButton = j.addButton;
            o.jwDockRemoveButton = j.removeButton
        }

        function i(p) {
            return function () {
                return m[p]
            }
        }
        n()
    }
})(jwplayer.html5);
(function (g) {
    var b = "#FFFFFF",
        d = "#CCCCCC",
        k = "#333333",
        h = "#999999",
        j = "normal",
        f = {
            size: 180,
            backgroundcolor: k,
            fontcolor: h,
            overcolor: d,
            activecolor: d,
            titlecolor: d,
            titleovercolor: b,
            titleactivecolor: b,
            fontweight: j,
            titleweight: j,
            fontsize: 11,
            titlesize: 13
        }, p = jwplayer.events,
        n = jwplayer.utils,
        l = n.css,
        o = ".jwplaylist",
        m = document,
        a = "absolute",
        c = "relative",
        e = "hidden",
        i = "100%";
    g.playlistcomponent = function (I, U) {
        var N = I,
            A = N.skin,
            r = n.extend({}, f, N.skin.getComponentSettings("playlist"), U),
            O, B, q, t, z = -1,
            C, s, v = -1,
            u = 60,
            w = {
                background: undefined,
                divider: undefined,
                item: undefined,
                itemOver: undefined,
                itemImage: undefined,
                itemActive: undefined
            }, P = this;
        P.element = function () {
            return O
        };
        P.redraw = function () {
            if (s) {
                s.redraw()
            }
        };
        P.show = function () {
            n.show(O)
        };
        P.hide = function () {
            n.hide(O)
        };

        function y() {
            O = S("div", "jwplaylist");
            O.id = N.id + "_jwplayer_playlistcomponent";
            B = S("div", "jwlistcontainer");
            T(O, B);
            R();
            if (w.item) {
                u = w.item.height
            }
            G();
            N.jwAddEventListener(p.JWPLAYER_PLAYLIST_LOADED, J);
            N.jwAddEventListener(p.JWPLAYER_PLAYLIST_ITEM, L);
            E()
        }

        function E() {
            var V = setInterval(function () {
                var X = m.getElementById(O.id),
                    W = n.bounds(X).height;
                if (X != O) {
                    clearInterval(V)
                } else {
                    if (W != v) {
                        v = W;
                        P.redraw()
                    }
                }
            }, 200)
        }

        function x(V) {
            return "#" + O.id + (V ? " ." + V : "")
        }

        function G() {
            var Y = 0,
                X = 0,
                V = 0;
            n.clearCss(x());
            l(x(), {
                "background-color": r.backgroundcolor
            });
            l(x("jwlist"), {
                "background-image": w.background ? " url(" + w.background.src + ")" : ""
            });
            l(x("jwlist *"), {
                color: r.fontcolor,
                font: r.fontweight + " " + r.fontsize + "px Arial, Helvetica, sans-serif"
            });
            if (w.itemImage) {
                Y = (u - w.itemImage.height) / 2 + "px ";
                X = w.itemImage.width;
                V = w.itemImage.height
            } else {
                X = u * 4 / 3;
                V = u
            } if (w.divider) {
                l(x("jwplaylistdivider"), {
                    "background-image": "url(" + w.divider.src + ")",
                    "background-size": i + " " + w.divider.height + "px",
                    width: i,
                    height: w.divider.height
                })
            }
            l(x("jwplaylistimg"), {
                height: V,
                width: X,
                margin: Y ? (Y + Y + Y + Y) : "0 5px 0 0"
            });
            l(x("jwlist li"), {
                "background-image": w.item ? "url(" + w.item.src + ")" : "",
                height: u,
                "background-size": i + " " + u + "px",
                cursor: "pointer"
            });
            var W = {
                overflow: "hidden"
            };
            if (r.activecolor !== "") {
                W.color = r.activecolor
            }
            if (w.itemActive) {
                W["background-image"] = "url(" + w.itemActive.src + ")"
            }
            l(x("jwlist li.active"), W);
            l(x("jwlist li.active .jwtitle"), {
                color: r.titleactivecolor
            });
            var Z = {
                overflow: "hidden"
            };
            if (r.overcolor !== "") {
                Z.color = r.overcolor
            }
            if (w.itemOver) {
                Z["background-image"] = "url(" + w.itemOver.src + ")"
            }
            l(x("jwlist li:hover"), Z);
            l(x("jwlist li:hover .jwtitle"), {
                color: r.titleovercolor
            });
            l(x("jwtextwrapper"), {
                height: u - 5,
                position: c
            });
            l(x("jwtitle"), {
                height: 15,
                overflow: "hidden",
                display: "inline-block",
                width: i,
                color: r.titlecolor,
                "margin-top": Y ? Y : 7,
                "line-height": 13,
                "font-size": r.titlesize,
                "font-weight": r.titleweight
            });
            l(x("jwdescription"), {
                display: "block",
                "font-size": r.fontsize,
                "line-height": 19,
                "margin-top": 5,
                overflow: "hidden",
                height: u,
                position: c
            })
        }

        function F() {
            var V = S("ul", "jwlist");
            V.id = O.id + "_ul" + Math.round(Math.random() * 10000000);
            return V
        }

        function H(Y) {
            var ad = q[Y],
                ac = S("li", "jwitem"),
                W;
            ac.id = t.id + "_item_" + Y;
            if (Y > 0) {
                W = S("div", "jwplaylistdivider");
                T(ac, W)
            }
            var Z = S("div", "jwplaylistimg jwfill");
            if (M() && (ad.image || ad["playlist.image"] || w.itemImage)) {
                var aa;
                if (ad["playlist.image"]) {
                    aa = ad["playlist.image"]
                } else {
                    if (ad.image) {
                        aa = ad.image
                    } else {
                        if (w.itemImage) {
                            aa = w.itemImage.src
                        }
                    }
                }
                l("#" + ac.id + " .jwplaylistimg", {
                    "background-image": aa ? "url(" + aa + ")" : null
                });
                T(ac, Z)
            }
            var V = S("div", "jwtextwrapper");
            var ab = S("span", "jwtitle");
            ab.innerHTML = (ad && ad.title) ? ad.title : "";
            T(V, ab);
            if (ad.description) {
                var X = S("span", "jwdescription");
                X.innerHTML = ad.description;
                T(V, X)
            }
            T(ac, V);
            return ac
        }

        function S(W, V) {
            var X = m.createElement(W);
            if (V) {
                X.className = V
            }
            return X
        }

        function T(V, W) {
            V.appendChild(W)
        }

        function J(W) {
            B.innerHTML = "";
            q = K();
            if (!q) {
                return
            }
            t = F();
            for (var X = 0; X < q.length; X++) {
                var V = H(X);
                V.onclick = Q(X);
                T(t, V)
            }
            z = N.jwGetPlaylistIndex();
            if (n.isIOS() && window.iScroll) {
                O.innerHTML = "";
                T(O, t);
                t.style.height = u * q.length + "px";
                var Y = new iScroll(O.id)
            } else {
                T(B, t);
                s = new g.playlistslider(O.id + "_slider", N.skin, O, t)
            }
        }

        function K() {
            var W = N.jwGetPlaylist();
            var X = [];
            for (var V = 0; V < W.length; V++) {
                if (!W[V]["ova.hidden"]) {
                    X.push(W[V])
                }
            }
            return X
        }

        function Q(V) {
            return function () {
                C = V;
                N.jwPlaylistItem(V);
                N.jwPlay(true)
            }
        }

        function D() {
            var V = N.jwGetPlaylistIndex();
            if (V == C) {
                return
            }
            C = -1;
            if (n.isIOS() && window.iScroll) {
                t.scrollTop = V * u
            } else {
                if (s && s.visible()) {
                    s.thumbPosition(V / (N.jwGetPlaylist().length - 1))
                }
            }
        }

        function M() {
            return true
        }

        function L(V) {
            if (z >= 0) {
                m.getElementById(t.id + "_item_" + z).className = "jwitem";
                z = V.index
            }
            m.getElementById(t.id + "_item_" + V.index).className = "jwitem active";
            D()
        }

        function R() {
            n.foreach(w, function (W, V) {
                w[W] = A.getSkinElement("playlist", W)
            })
        }
        y();
        return this
    };
    l(o, {
        position: a,
        width: i,
        height: i
    });
    n.dragStyle(o, "none");
    l(o + " .jwplaylistimg", {
        position: c,
        width: i,
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: e
    });
    l(o + " .jwlist", {
        position: a,
        width: i,
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: e
    });
    l(o + " .jwlistcontainer", {
        position: a,
        overflow: e,
        width: i,
        height: i
    });
    l(o + " .jwlist li", {
        width: i
    });
    l(o + " .jwtextwrapper", {
        overflow: e
    });
    l(o + " .jwplaylistdivider", {
        position: a
    })
})(jwplayer.html5);
(function (b) {
    var d = jwplayer,
        a = d.utils,
        c = d.events;
    b.playlistloader = function () {
        var g = new c.eventdispatcher();
        a.extend(this, g);
        this.load = function (j) {
            a.ajax(j, h, f)
        };

        function h(k) {
            try {
                var n = k.responseXML.childNodes;
                var o = "";
                for (var j = 0; j < n.length; j++) {
                    o = n[j];
                    if (o.nodeType != o.COMMENT_NODE) {
                        break
                    }
                }
                if (b.parsers.localName(o) == "xml") {
                    o = o.nextSibling
                }
                if (b.parsers.localName(o) != "rss") {
                    e("Not a valid RSS feed");
                    return
                }
                var m = new d.playlist(b.parsers.rssparser.parse(o));
                m = i(m);
                if (m && m.length && m[0].sources && m[0].sources.length && m[0].sources[0].file) {
                    g.sendEvent(c.JWPLAYER_PLAYLIST_LOADED, {
                        playlist: m
                    })
                } else {
                    e("No playable sources found")
                }
            } catch (l) {
                e()
            }
        }

        function i(n) {
            if (!n) {
                return
            }
            var l = [],
                k, m, j;
            for (k = 0; k < n.length; k++) {
                m = n[k];
                j = a.filterSources(m.sources);
                if (j && j.length) {
                    m.sources = j;
                    l.push(m)
                }
            }
            return l
        }

        function f(j) {
            e(j.match(/invalid/i) ? "Not a valid RSS feed" : "")
        }

        function e(j) {
            g.sendEvent(c.JWPLAYER_ERROR, {
                message: j ? j : "Error loading file"
            })
        }
    }
})(jwplayer.html5);
(function (j) {
    var a = jwplayer.events,
        r = jwplayer.utils,
        n = r.css,
        b = "jwslider",
        p = "jwslidertop",
        h = "jwsliderbottom",
        f = "jwrail",
        q = "jwrailtop",
        o = "jwrailback",
        m = "jwrailbottom",
        c = "jwthumb",
        u = "jwthumbtop",
        i = "jwthumbback",
        t = "jwthumbbottom",
        e = document,
        s = window,
        v = undefined,
        g = "absolute",
        k = "hidden",
        l = "100%";
    j.playlistslider = function (T, K, H, X) {
        var M = K,
            V = T,
            Y = X,
            af, C, ac, Q, ag = 0,
            U, ad, ai = true,
            D, P, ab, y, aa, w, E, O, S, ae, J;
        this.element = function () {
            return af
        };
        this.visible = function () {
            return ai
        };

        function G() {
            var ak, aj;
            af = ah(b, null, H);
            af.id = T;
            af.addEventListener("mousedown", B, false);
            af.addEventListener("click", Z, false);
            N();
            S = D.height;
            ae = P.height;
            n(W(), {
                width: ab.width
            });
            n(W(f), {
                top: S,
                bottom: ae
            });
            n(W(c), {
                top: S
            });
            ak = ah(p, D, af);
            aj = ah(h, P, af);
            C = ah(f, null, af);
            ac = ah(c, null, af);
            ak.addEventListener("mousedown", x(-1), false);
            aj.addEventListener("mousedown", x(1), false);
            ah(q, y, C);
            ah(o, ab, C, true);
            ah(m, aa, C);
            n(W(o), {
                top: y.height,
                bottom: aa.height
            });
            ah(u, E, ac);
            ah(i, w, ac, true);
            ah(t, O, ac);
            n(W(i), {
                top: E.height,
                bottom: O.height
            });
            I();
            if (Y) {
                Y.addEventListener("mousewheel", A, false);
                Y.addEventListener("DOMMouseScroll", A, false)
            }
        }

        function W(aj) {
            return "#" + af.id + (aj ? " ." + aj : "")
        }

        function ah(am, al, ak, aj) {
            var an = e.createElement("div");
            if (am) {
                an.className = am;
                if (al) {
                    n(W(am), {
                        "background-image": al.src ? al.src : v,
                        "background-repeat": aj ? "repeat-y" : "no-repeat",
                        height: aj ? v : al.height
                    })
                }
            }
            if (ak) {
                ak.appendChild(an)
            }
            return an
        }

        function N() {
            D = F("sliderCapTop");
            P = F("sliderCapBottom");
            ab = F("sliderRail");
            y = F("sliderRailCapTop");
            aa = F("sliderRailCapBottom");
            w = F("sliderThumb");
            E = F("sliderThumbCapTop");
            O = F("sliderThumbCapBottom")
        }

        function F(aj) {
            var ak = M.getSkinElement("playlist", aj);
            return ak ? ak : {
                width: 0,
                height: 0,
                src: v
            }
        }
        var I = this.redraw = function () {
            clearTimeout(J);
            J = setTimeout(function () {
                if (Y && Y.clientHeight) {
                    R(Y.parentNode.clientHeight / Y.clientHeight)
                } else {
                    J = setTimeout(I, 10)
                }
            }, 0)
        };

        function A(aj) {
            if (!ai) {
                return
            }
            aj = aj ? aj : s.event;
            var ak = aj.detail ? aj.detail * -1 : aj.wheelDelta / 40;
            L(ag - ak / 10);
            if (aj.stopPropagation) {
                aj.stopPropagation()
            }
            if (aj.preventDefault) {
                aj.preventDefault()
            }
            aj.cancelBubble = true;
            aj.cancel = true;
            aj.returnValue = false;
            return false
        }

        function R(aj) {
            if (aj < 0) {
                aj = 0
            }
            if (aj > 1) {
                ai = false
            } else {
                ai = true;
                n(W(c), {
                    height: Math.max(C.clientHeight * aj, E.height + O.height)
                })
            }
            n(W(), {
                visibility: ai ? "visible" : k
            });
            if (Y) {
                Y.style.width = ai ? Y.parentElement.clientWidth - ab.width + "px" : ""
            }
        }
        var L = this.thumbPosition = function (aj) {
            if (isNaN(aj)) {
                aj = 0
            }
            ag = Math.max(0, Math.min(1, aj));
            n(W(c), {
                top: S + (C.clientHeight - ac.clientHeight) * ag
            });
            if (X) {
                X.style.top = (af.clientHeight - X.scrollHeight) * ag + "px"
            }
        };

        function B(aj) {
            if (aj.button == 0) {
                Q = true
            }
            e.onselectstart = function () {
                return false
            };
            s.addEventListener("mousemove", Z, false);
            s.addEventListener("mouseup", z, false)
        }

        function Z(aj) {
            if (Q || aj.type == "click") {
                var ao = r.bounds(C),
                    al = ac.clientHeight / 2,
                    ak = ao.height - al,
                    an = aj.pageY - ao.top,
                    am = (an - al) / (ak - al);
                L(am)
            }
        }

        function x(aj) {
            return function (ak) {
                if (ak.button > 0) {
                    return
                }
                L(ag + (aj * 0.05));
                U = setTimeout(function () {
                    ad = setInterval(function () {
                        L(ag + (aj * 0.05))
                    }, 50)
                }, 500)
            }
        }

        function z() {
            Q = false;
            s.removeEventListener("mousemove", Z);
            s.removeEventListener("mouseup", z);
            e.onselectstart = v;
            clearTimeout(U);
            clearInterval(ad)
        }
        G();
        return this
    };

    function d() {
        var w = [],
            x;
        for (x = 0; x < arguments.length; x++) {
            w.push(".jwplaylist ." + arguments[x])
        }
        return w.join(",")
    }
    n(d(b), {
        position: g,
        height: l,
        visibility: k,
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: k
    });
    n(d(b) + " *", {
        position: g,
        width: l,
        "background-position": "center",
        "background-size": l + " " + l,
        overflow: k
    });
    n(d(p, q, u), {
        top: 0
    });
    n(d(h, m, t), {
        bottom: 0
    })
})(jwplayer.html5);
(function (e) {
    var k = jwplayer.utils,
        i = k.css,
        a = "9boxPlayer",
        l = "http://9box.vn/",
        j = document,
        h = ".jwclick",
        g = h + "_item",
        f = "100%",
        b = "none",
        d = "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        c = "#FFF";
    e.rightclick = function (q, o) {
        var w = q,
            p, v = k.extend({
                aboutlink: l,
                abouttext: a
            }, o),
            m = false,
            x, r;

        function u() {
            p = j.getElementById(w.id);
            x = s(h);
            x.id = w.id + "_menu";
            x.style.display = b;
            p.oncontextmenu = n;
            x.onmouseover = function () {
                m = true
            };
            x.onmouseout = function () {
                m = false
            };
            j.addEventListener("mousedown", y, false);
            r = s(g);
            r.innerHTML = v.abouttext;
            r.onclick = t;
            x.appendChild(r);
            p.appendChild(x)
        }

        function s(z) {
            var A = j.createElement("div");
            A.className = z.replace(".", "");
            return A
        }

        function t() {
            window.location.href = v.aboutlink
        }

        function n(z) {
            if (m) {
                return
            }
            if (z == null) {
                z = window.event
            }
            var C = z.target != null ? z.target : z.srcElement,
                A = k.bounds(p),
                B = A.top,
                D = A.left;
            x.style.display = b;
            x.style.left = z.pageX - D + "px";
            x.style.top = z.pageY - B + "px";
            x.style.display = "block";
            z.preventDefault()
        }

        function y() {
            if (m) {
                return
            } else {
                x.style.display = b
            }
        }
        this.element = function () {
            return x
        };
        this.destroy = function () {
            j.removeEventListener("mousedown", y, false)
        };
        u()
    };
    i(h, {
        "background-color": c,
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": d,
        "-moz-box-shadow": d,
        "box-shadow": d,
        position: "absolute",
        "z-index": 999
    }, true);
    i(h + " div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": c,
        border: "none",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        color: "inherit"
    }, true);
    i(g, {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, true);
    i(g + ":hover", {
        "background-color": "#595959",
        color: c
    }, true);
    i(g + " a", {
        "text-decoration": b,
        color: "#000"
    }, true);
    i(h + " hr", {
        width: f,
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, true)
})(jwplayer.html5);
(function (f) {
    var h = jwplayer,
        k = h.utils,
        l = h.events,
        a = h.playlist,
        i = 1,
        e = 2,
        d = 3,
        j = 4,
        c = 5,
        b = 6,
        g = 7;
    f.setup = function (s, H, I) {
        var L = s,
            p = H,
            F = I,
            u = {}, C = {}, A, z = new l.eventdispatcher(),
            v = false,
            w = [];

        function t() {
            r(i, o);
            r(e, Q, i);
            r(d, y, i);
            r(j, K, d);
            r(c, P, j + "," + e);
            r(b, J, c + "," + d);
            r(g, D, b)
        }

        function r(R, T, S) {
            w.push({
                name: R,
                method: T,
                depends: S
            })
        }

        function G() {
            for (var T = 0; T < w.length; T++) {
                var R = w[T];
                if (O(R.depends)) {
                    w.splice(T, 1);
                    try {
                        R.method();
                        G()
                    } catch (S) {
                        x(S.message)
                    }
                    return
                }
            }
            if (w.length > 0 && !v) {
                setTimeout(G, 500)
            }
        }

        function O(T) {
            if (!T) {
                return true
            }
            var S = T.toString().split(",");
            for (var R = 0; R < S.length; R++) {
                if (!u[S[R]]) {
                    return false
                }
            }
            return true
        }

        function n(R) {
            u[R] = true
        }

        function o() {
            if (s.edition && s.edition() == "invalid") {
                x("Error setting up player: Invalid license key")
            } else {
                n(i)
            }
        }

        function Q() {
            A = new f.skin();
            A.load(L.config.skin, B, N)
        }

        function B(R) {
            n(e)
        }

        function N(R) {
            x("Error loading skin: " + R)
        }

        function y() {
            switch (k.typeOf(L.config.playlist)) {
            case "string":
                var R = new f.playlistloader();
                R.addEventListener(l.JWPLAYER_PLAYLIST_LOADED, m);
                R.addEventListener(l.JWPLAYER_ERROR, E);
                R.load(L.config.playlist);
                break;
            case "array":
                q(new a(L.config.playlist))
            }
        }

        function m(R) {
            q(R.playlist)
        }

        function q(R) {
            L.setPlaylist(R);
            if (L.playlist[0].sources.length == 0) {
                x("Error loading playlist: No playable sources found")
            } else {
                n(d)
            }
        }

        function E(R) {
            x("Error loading playlist: " + R.message)
        }

        function K() {
            var S = L.playlist[L.item].image;
            if (S) {
                var R = new Image();
                R.addEventListener("load", M, false);
                R.addEventListener("error", M, false);
                R.src = S;
                setTimeout(M, 500)
            } else {
                n(j)
            }
        }

        function M() {
            n(j)
        }

        function P() {
            p.setup(A);
            n(c)
        }

        function J() {
            n(b)
        }

        function D() {
            z.sendEvent(l.JWPLAYER_READY);
            n(g)
        }

        function x(R) {
            v = true;
            z.sendEvent(l.JWPLAYER_ERROR, {
                message: R
            });
            p.setupError(R)
        }
        k.extend(this, z);
        this.start = G;
        t()
    }
})(jwplayer.html5);
(function (a) {
    a.skin = function () {
        var b = {};
        var d = false;
        this.load = function (g, f, e) {
            new a.skinloader(g, function (h) {
                d = true;
                b = h;
                if (typeof f == "function") {
                    f()
                }
            }, function (h) {
                if (typeof e == "function") {
                    e(h)
                }
            })
        };
        this.getSkinElement = function (e, f) {
            e = c(e);
            f = c(f);
            if (d) {
                try {
                    return b[e].elements[f]
                } catch (g) {
                    jwplayer.utils.log("No such skin component / element: ", [e, f])
                }
            }
            return null
        };
        this.getComponentSettings = function (e) {
            e = c(e);
            if (d && b && b[e]) {
                return b[e].settings
            }
            return null
        };
        this.getComponentLayout = function (e) {
            e = c(e);
            if (d) {
                var f = b[e].layout;
                if (f && (f.left || f.right || f.center)) {
                    return b[e].layout
                }
            }
            return null
        };

        function c(e) {
            return e.toLowerCase()
        }
    }
})(jwplayer.html5);
(function (b) {
    var a = jwplayer.utils,
        d = a.foreach,
        c = "Skin formatting error";
    b.skinloader = function (g, l, i) {
        var j = {}, n = l,
            v = i,
            s = true,
            w, x = g,
            h = false,
            u;

        function z() {
            if (typeof x != "string" || x === "") {
                y(b.defaultskin().xml)
            } else {
                if (a.extension(x) != "xml") {
                    v("Skin not a valid file type");
                    return
                }
                var A = new b.skinloader("", o, v)
            }
        }

        function o(A) {
            j = A;
            a.ajax(a.getAbsolutePath(x), function (B) {
                try {
                    if (a.exists(B.responseXML)) {
                        y(B.responseXML);
                        return
                    }
                } catch (C) {
                    v(c)
                }
            }, function (B) {
                v(B)
            })
        }

        function m(A, B) {
            return A ? A.getElementsByTagName(B) : null
        }

        function y(F) {
            var E = m(F, "skin")[0],
                M = m(E, "component"),
                Y = E.getAttribute("target");
            if (!Y || parseFloat(Y) > parseFloat(jwplayer.version)) {
                v("Incompatible player version")
            }
            if (M.length === 0) {
                n(j);
                return
            }
            for (var P = 0; P < M.length; P++) {
                var K = k(M[P].getAttribute("name")),
                    J = {
                        settings: {},
                        elements: {},
                        layout: {}
                    }, O = m(m(M[P], "elements")[0], "element");
                j[K] = J;
                for (var N = 0; N < O.length; N++) {
                    q(O[N], K)
                }
                var G = m(M[P], "settings")[0];
                if (G && G.childNodes.length > 0) {
                    var S = m(G, "setting");
                    for (var X = 0; X < S.length; X++) {
                        var Z = S[X].getAttribute("name");
                        var Q = S[X].getAttribute("value");
                        if (/color$/.test(Z)) {
                            Q = a.stringToColor(Q)
                        }
                        J.settings[k(Z)] = Q
                    }
                }
                var T = m(M[P], "layout")[0];
                if (T && T.childNodes.length > 0) {
                    var U = m(T, "group");
                    for (var D = 0; D < U.length; D++) {
                        var I = U[D],
                            H = {
                                elements: []
                            };
                        J.layout[k(I.getAttribute("position"))] = H;
                        for (var W = 0; W < I.attributes.length; W++) {
                            var L = I.attributes[W];
                            H[L.name] = L.value
                        }
                        var V = m(I, "*");
                        for (var C = 0; C < V.length; C++) {
                            var A = V[C];
                            H.elements.push({
                                type: A.tagName
                            });
                            for (var B = 0; B < A.attributes.length; B++) {
                                var R = A.attributes[B];
                                H.elements[C][k(R.name)] = R.value
                            }
                            if (!a.exists(H.elements[C].name)) {
                                H.elements[C].name = A.tagName
                            }
                        }
                    }
                }
                s = false;
                p()
            }
        }

        function p() {
            clearInterval(w);
            if (!h) {
                w = setInterval(function () {
                    f()
                }, 100)
            }
        }

        function q(F, E) {
            E = k(E);
            var D = new Image(),
                A = k(F.getAttribute("name")),
                C = F.getAttribute("src"),
                H;
            if (C.indexOf("data:image/png;base64,") === 0) {
                H = C
            } else {
                var B = a.getAbsolutePath(x);
                var G = B.substr(0, B.lastIndexOf("/"));
                H = [G, E, C].join("/")
            }
            j[E].elements[A] = {
                height: 0,
                width: 0,
                src: "",
                ready: false,
                image: D
            };
            D.onload = function (I) {
                r(D, A, E)
            };
            D.onerror = function (I) {
                h = true;
                p();
                v("Skin image not found: " + this.src)
            };
            D.src = H
        }

        function e() {
            d(j, function (A, B) {
                d(B.elements, function (C, E) {
                    var D = E.image;
                    D.onload = null;
                    D.onerror = null;
                    delete E.image;
                    delete B.elements[C]
                });
                delete j[A]
            })
        }

        function f() {
            var A = true;
            d(j, function (B, C) {
                if (B != "properties") {
                    d(C.elements, function (E, D) {
                        if (!t(B, E).ready) {
                            A = false
                        }
                    })
                }
            });
            if (!A) {
                return
            }
            if (s == false) {
                clearInterval(w);
                n(j)
            }
        }

        function r(B, D, C) {
            var A = t(C, D);
            if (A) {
                A.height = B.height;
                A.width = B.width;
                A.src = B.src;
                A.ready = true;
                p()
            } else {
                a.log("Loaded an image for a missing element: " + C + "." + D)
            }
        }

        function t(A, B) {
            return j[k(A)] ? j[k(A)].elements[k(B)] : null
        }

        function k(A) {
            return A ? A.toLowerCase() : ""
        }
        z()
    }
})(jwplayer.html5);
(function (b) {
    var a = jwplayer.utils,
        c = jwplayer.events,
        d = a.css;
    b.thumbs = function (g) {
        var m, l, k, j, p, o = g,
            h = new c.eventdispatcher();
        a.extend(this, h);

        function n() {
            m = document.createElement("div");
            m.id = o
        }

        function s(u) {
            d(e(), {
                display: "none"
            });
            if (u) {
                p = u.split("?")[0].split("/").slice(0, -1).join("/");
                new b.parsers.srt(q, r, true).load(u)
            }
        }

        function q(u) {
            if (!a.typeOf(u) == "array") {
                return r("Invalid data")
            }
            j = u;
            d(e(), {
                display: "block"
            })
        }

        function r(u) {
            a.log("Thumbnails could not be loaded: " + u)
        }

        function e() {
            return "#" + o
        }

        function f(u) {
            if (u.indexOf("://") < 0) {
                u = p ? p + "/" + u : u
            }
            var A = u.indexOf("#xywh");
            if (A > 0) {
                try {
                    var F = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/,
                        w = F.exec(u),
                        z = w[1],
                        D = w[2] * -1,
                        C = w[3] * -1,
                        v = w[4],
                        E = w[5];
                    d(e(), {
                        "background-image": z,
                        "background-position": D + "px " + C + "px",
                        width: v,
                        height: E
                    })
                } catch (B) {
                    r("Could not parse thumbnail")
                }
            } else {
                var z = new Image();
                z.addEventListener("load", i, false);
                z.src = u
            }
        }

        function i(u) {
            var v = u.target;
            d(e(), {
                "background-image": v.src,
                "background-position": "0 0",
                width: v.width,
                height: v.height
            })
        }
        this.load = function (u) {
            s(u)
        };
        this.element = function () {
            return m
        };
        var t = this.updateTimeline = function (v) {
            var u = 0;
            if (!j) {
                return
            }
            while (u < j.length && v > j[u].end) {
                u++
            }
            if (u == j.length) {
                u--
            }
            if (j[u].text) {
                f(j[u].text)
            }
        };
        n()
    }
})(jwplayer.html5);
(function (c) {
    var a = c.utils,
        d = c.events,
        b = d.state;
    c.html5.video = function (Z) {
        var q = a.isIE(),
            T = {
                abort: B,
                canplay: r,
                canplaythrough: B,
                durationchange: E,
                emptied: B,
                ended: l,
                error: m,
                loadeddata: B,
                loadedmetadata: r,
                loadstart: B,
                pause: Y,
                play: Y,
                playing: Y,
                progress: F,
                ratechange: B,
                readystatechange: B,
                seeked: J,
                seeking: q ? v : B,
                stalled: B,
                suspend: B,
                timeupdate: aa,
                volumechange: j,
                waiting: v
            }, z = a.extensionmap,
            H, O, ag, w, af, o, W, ae, N, U, I, e = b.IDLE,
            P, n = -1,
            L = -1,
            Q = new d.eventdispatcher(),
            t = false,
            K, G = -1,
            M = a.isAndroid(),
            g = this,
            ah = false,
            y = false;
        a.extend(g, Q);

        function ab(ai) {
            w = ai;
            V();
            w.controls = true;
            w.controls = false;
            w.setAttribute("x-webkit-airplay", "allow");
            t = true
        }

        function V() {
            a.foreach(T, function (ai, aj) {
                w.addEventListener(ai, aj, false)
            })
        }

        function s(ai, aj) {
            if (t) {
                Q.sendEvent(ai, aj)
            }
        }

        function B(ai) {}

        function E(aj) {
            B(aj);
            if (!t) {
                return
            }
            var ai = ad(w.duration);
            if (af != ai) {
                af = ai
            }
            if (M && U > 0 && ai > U) {
                C(U)
            }
            aa()
        }

        function aa(ai) {
            B(ai);
            if (!t) {
                return
            }
            if (e == b.PLAYING && !I) {
                o = ad(w.currentTime);
                s(d.JWPLAYER_MEDIA_TIME, {
                    position: o,
                    duration: af
                })
            }
        }

        function ad(ai) {
            return Number(ai.toFixed(1))
        }

        function r(ai) {
            B(ai);
            if (!t) {
                return
            }
            if (!ae) {
                ae = true;
                p()
            }
            if (ai.type == "loadedmetadata") {
                if (w.muted) {
                    w.muted = false;
                    w.muted = true
                }
                s(d.JWPLAYER_MEDIA_META, {
                    duration: w.duration,
                    height: w.videoHeight,
                    width: w.videoWidth
                })
            }
        }

        function F(ai) {
            B(ai);
            if (ae && U > 0 && !M) {
                if (q) {
                    setTimeout(function () {
                        C(U)
                    }, 200)
                } else {
                    C(U)
                }
            }
        }

        function p() {
            if (!N) {
                N = true;
                s(d.JWPLAYER_MEDIA_BUFFER_FULL)
            }
        }

        function Y(ai) {
            B(ai);
            if (!t || I) {
                return
            }
            if (w.paused) {
                if (w.currentTime == w.duration && w.duration > 3) {} else {
                    f()
                }
            } else {
                if (a.isFF() && ai.type == "play" && e == b.BUFFERING) {
                    return
                } else {
                    x(b.PLAYING)
                }
            }
        }

        function v(ai) {
            B(ai);
            if (!t) {
                return
            }
            if (!I) {
                x(b.BUFFERING)
            }
        }

        function m(ai) {
            if (!t) {
                return
            }
            a.log("Error playing media: %o", w.error);
            Q.sendEvent(d.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading media: File could not be played"
            });
            x(b.IDLE)
        }

        function k(al) {
            var ai;
            if (a.typeOf(al) == "array" && al.length > 0) {
                ai = [];
                for (var ak = 0; ak < al.length; ak++) {
                    var am = al[ak],
                        aj = {};
                    aj.label = S(am) ? S(am) : ak;
                    ai[ak] = aj
                }
            }
            return ai
        }

        function i(aj) {
            var ai = k(aj);
            if (ai) {
                Q.sendEvent(d.JWPLAYER_MEDIA_LEVELS, {
                    levels: ai,
                    currentQuality: G
                })
            }
        }

        function S(ai) {
            if (ai.label) {
                return ai.label
            } else {
                return 0
            }
        }
        g.load = function (ai) {
            if (!t) {
                return
            }
            ah = false;
            H = ai;
            U = 0;
            af = ai.duration ? ai.duration : -1;
            o = 0;
            K = H.sources;
            D();
            i(K);
            u()
        };

        function D() {
            if (G < 0) {
                G = 0
            }
            for (var aj = 0; aj < K.length; aj++) {
                if (K[aj]["default"]) {
                    G = aj;
                    break
                }
            }
            var ak = a.getCookies(),
                ai = ak.qualityLabel;
            if (ai) {
                for (aj = 0; aj < K.length; aj++) {
                    if (K[aj]["label"] == ai) {
                        G = aj;
                        break
                    }
                }
            }
        }

        function u() {
            ae = false;
            N = false;
            O = K[G];
            x(b.BUFFERING);
            w.src = O.file;
            w.load();
            n = setInterval(h, 100);
            if (a.isIPod() || a.isAndroid(2.3)) {
                p()
            }
        }
        var A = g.stop = function () {
            if (!t) {
                return
            }
            w.removeAttribute("src");
            if (!q) {
                w.load()
            }
            G = -1;
            clearInterval(n);
            x(b.IDLE)
        };
        g.play = function () {
            if (t && !I) {
                w.play()
            }
        };
        var f = g.pause = function () {
            if (t) {
                w.pause();
                x(b.PAUSED)
            }
        };
        g.seekDrag = function (ai) {
            if (!t) {
                return
            }
            I = ai;
            if (ai) {
                w.pause()
            } else {
                w.play()
            }
        };
        var C = g.seek = function (ai) {
            if (!t) {
                return
            }
            if (ae) {
                U = 0;
                w.currentTime = ai
            } else {
                U = ai
            }
        };

        function J(ai) {
            B(ai);
            if (!I) {
                s(d.JWPLAYER_MEDIA_SEEK, {
                    position: o,
                    offset: w.currentTime
                });
                if (e != b.PAUSED) {
                    x(b.PLAYING)
                }
            }
        }
        var ac = g.volume = function (ai) {
            if (a.exists(ai)) {
                w.volume = Math.min(Math.max(0, ai / 100), 1);
                P = w.volume * 100
            }
        };

        function j(ai) {
            s(d.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(w.volume * 100)
            });
            s(d.JWPLAYER_MEDIA_MUTE, {
                mute: w.muted
            })
        }
        g.mute = function (ai) {
            if (!a.exists(ai)) {
                ai = !w.muted
            }
            if (ai) {
                P = w.volume * 100;
                w.muted = true
            } else {
                ac(P);
                w.muted = false
            }
        };

        function x(ai) {
            if (ai == b.PAUSED && e == b.IDLE) {
                return
            }
            if (I) {
                return
            }
            if (e != ai) {
                var aj = e;
                e = ai;
                s(d.JWPLAYER_PLAYER_STATE, {
                    oldstate: aj,
                    newstate: ai
                })
            }
        }

        function h() {
            if (!t) {
                return
            }
            var ai = R();
            if (ai != L) {
                L = ai;
                s(d.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(L * 100)
                })
            }
            if (ai >= 1) {
                clearInterval(n)
            }
        }

        function R() {
            if (w.buffered.length == 0 || w.duration == 0) {
                return 0
            } else {
                return w.buffered.end(w.buffered.length - 1) / w.duration
            }
        }

        function l(ai) {
            B(ai);
            if (t) {
                X()
            }
        }

        function X() {
            ah = true;
            if (e != b.IDLE) {
                G = -1;
                y = true;
                s(d.JWPLAYER_MEDIA_BEFORECOMPLETE);
                if (t) {
                    x(b.IDLE);
                    y = false;
                    s(d.JWPLAYER_MEDIA_COMPLETE)
                }
            }
        }
        this.checkComplete = function () {
            return y
        };
        g.detachMedia = function () {
            t = false;
            return w
        };
        g.attachMedia = function (ai) {
            t = true;
            if (!ai) {
                ae = false
            }
            if (y) {
                x(b.IDLE);
                s(d.JWPLAYER_MEDIA_COMPLETE);
                y = false
            }
        };
        g.getTag = function () {
            return w
        };
        g.audioMode = function () {
            if (!K) {
                return false
            }
            var ai = K[0].type;
            return (ai == "aac" || ai == "mp3" || ai == "vorbis")
        };
        g.setCurrentQuality = function (aj) {
            if (G == aj) {
                return
            }
            aj = parseInt(aj);
            if (aj >= 0) {
                if (K && K.length > aj) {
                    G = aj;
                    a.saveCookie("qualityLabel", K[aj].label);
                    s(d.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                        currentQuality: aj,
                        levels: k(K)
                    });
                    var ai = w.currentTime;
                    u();
                    g.seek(ai)
                }
            }
        };
        g.getCurrentQuality = function () {
            return G
        };
        g.getQualityLevels = function () {
            return k(K)
        };
        ab(Z)
    }
})(jwplayer);
(function (n) {
    var s = jwplayer,
        A = s.utils,
        c = jwplayer.events,
        i = c.state,
        u = A.css,
        w = A.bounds,
        z = A.isMobile(),
        g = A.isIPad(),
        D = A.isIPod(),
        k = A.isAndroid(),
        E = A.isIOS(),
        j = document,
        r = "jwplayer",
        e = "aspectMode",
        d = "." + r + ".jwfullscreen",
        t = "jwmain",
        C = "jwinstream",
        B = "jwvideo",
        f = "jwcontrols",
        b = "jwaspect",
        h = "jwplaylistcontainer",
        m = true,
        v = false,
        y = "opacity .5s ease",
        q = "100%",
        l = "absolute",
        x = " !important",
        o = "hidden",
        a = "none",
        p = "block";
    n.view = function (W, aa) {
        var aH = W,
            H = aa,
            aS, aV, aK, ab, R, aN = 0,
            aC = 2000,
            aj, at, aB, L, ag, az = v,
            aJ, aP, ah, aA, M, ax = A.extend({}, H.componentConfig("logo")),
            aM, O, aE, Q = (H.mobilecontrols),
            aq = v,
            av, an, ap, K, P = v,
            Z = new c.eventdispatcher();
        A.extend(this, Z);

        function aI() {
            aS = aR("div", r + " playlist-" + H.playlistposition);
            aS.id = aH.id;
            if (H.aspectratio) {
                u("." + r, {
                    display: "inline-block"
                });
                aS.className = aS.className.replace(r, r + " " + e)
            }
            U(H.width, H.height);
            var a2 = document.getElementById(aH.id);
            a2.parentNode.replaceChild(aS, a2)
        }
        this.getCurrentCaptions = function () {
            return aM.getCurrentCaptions()
        };
        this.setCurrentCaptions = function (a2) {
            aM.setCurrentCaptions(a2)
        };
        this.getCaptionsList = function () {
            return aM.getCaptionsList()
        };
        this.setup = function (a4) {
            if (aq) {
                return
            }
            aH.skin = a4;
            aV = aR("span", t);
            at = aR("span", B);
            aj = H.getVideo().getTag();
            at.appendChild(aj);
            aK = aR("span", f);
            ag = aR("span", C);
            R = aR("span", h);
            ab = aR("span", b);
            V();
            aV.appendChild(at);
            aV.appendChild(aK);
            aV.appendChild(ag);
            aS.appendChild(aV);
            aS.appendChild(ab);
            aS.appendChild(R);
            j.addEventListener("webkitfullscreenchange", I, v);
            aj.addEventListener("webkitbeginfullscreen", I, v);
            aj.addEventListener("webkitendfullscreen", I, v);
            j.addEventListener("mozfullscreenchange", I, v);
            j.addEventListener("keydown", aD, v);
            aH.jwAddEventListener(c.JWPLAYER_PLAYER_READY, aU);
            aH.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, S);
            aH.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, aQ);
            S({
                newstate: i.IDLE
            });
            aK.addEventListener("mouseout", function () {
                clearTimeout(aN);
                aN = setTimeout(af, 10)
            }, v);
            aK.addEventListener("mousemove", aW, v);
            if (A.isIE()) {
                at.addEventListener("mousemove", aW, v);
                at.addEventListener("click", ah.clickHandler)
            }
            ac(aP);
            ac(aA);
            ac(M);
            u("#" + aS.id + "." + e + " ." + b, {
                "margin-top": H.aspectratio,
                display: p
            });
            var a2 = A.exists(H.aspectratio) ? parseFloat(H.aspectratio) : 100,
                a3 = H.playlistsize;
            u("#" + aS.id + ".playlist-right ." + b, {
                "margin-bottom": -1 * a3 * (a2 / 100) + "px"
            });
            u("#" + aS.id + ".playlist-right ." + h, {
                width: a3 + "px",
                right: 0,
                top: 0,
                height: "100%"
            });
            u("#" + aS.id + ".playlist-bottom ." + b, {
                "padding-bottom": a3 + "px"
            });
            u("#" + aS.id + ".playlist-bottom ." + h, {
                width: "100%",
                height: a3 + "px",
                bottom: 0
            });
            u("#" + aS.id + ".playlist-right ." + t, {
                right: a3 + "px"
            });
            u("#" + aS.id + ".playlist-bottom ." + t, {
                bottom: a3 + "px"
            })
        };

        function ac(a2) {
            if (a2) {
                a2.element().addEventListener("mousemove", ai, v);
                a2.element().addEventListener("mouseout", aX, v)
            }
        }

        function aR(a3, a2) {
            var a4 = j.createElement(a3);
            if (a2) {
                a4.className = a2
            }
            return a4
        }

        function aW() {
            clearTimeout(aN);
            if (aH.jwGetState() == i.PLAYING || aH.jwGetState() == i.PAUSED) {
                al();
                if (!P) {
                    aN = setTimeout(af, aC)
                }
            }
        }

        function ai() {
            clearTimeout(aN);
            P = m
        }

        function aX() {
            P = v
        }

        function af(a2) {
            if (aH.jwGetState() != i.BUFFERING) {
                aG();
                ar();
                G()
            }
            clearTimeout(aN);
            aN = 0
        }

        function aF(a2) {
            Z.sendEvent(a2.type, a2)
        }

        function V() {
            var a4 = H.width,
                a2 = H.height,
                a5 = H.componentConfig("controlbar"),
                a3 = H.componentConfig("display");
            ad(a2);
            aM = new n.captions(aH, H.captions);
            aM.addEventListener(c.JWPLAYER_CAPTIONS_LIST, aF);
            aM.addEventListener(c.JWPLAYER_CAPTIONS_CHANGED, aF);
            aK.appendChild(aM.element());
            ah = new n.display(aH, a3);
            ah.addEventListener(c.JWPLAYER_DISPLAY_CLICK, aF);
            if (aE) {
                ah.hidePreview(m)
            }
            aK.appendChild(ah.element());
            M = new n.logo(aH, ax);
            aK.appendChild(M.element());
            aA = new n.dock(aH, H.componentConfig("dock"));
            aK.appendChild(aA.element());
            if (aH.edition) {
                ap = new n.rightclick(aH, {
                    abouttext: H.abouttext,
                    aboutlink: H.aboutlink
                })
            } else {
                ap = new n.rightclick(aH, {})
            } if (H.playlistsize && H.playlistposition && H.playlistposition != a) {
                O = new n.playlistcomponent(aH, {});
                R.appendChild(O.element())
            }
            if (!z || Q) {
                aP = new n.controlbar(aH, a5);
                aK.appendChild(aP.element());
                if (Q) {
                    al()
                }
            }
            setTimeout(function () {
                U(H.width, H.height)
            }, 0)
        }
        var au = this.fullscreen = function (a2) {
            if (!A.exists(a2)) {
                a2 = !H.fullscreen
            }
            if (a2) {
                if (!H.fullscreen) {
                    N(m);
                    if (aS.requestFullScreen) {
                        aS.requestFullScreen()
                    } else {
                        if (aS.mozRequestFullScreen) {
                            aS.mozRequestFullScreen()
                        } else {
                            if (aS.webkitRequestFullScreen) {
                                aS.webkitRequestFullScreen()
                            }
                        }
                    }
                    H.setFullscreen(m)
                }
            } else {
                N(v);
                if (H.fullscreen) {
                    H.setFullscreen(v);
                    if (j.cancelFullScreen) {
                        j.cancelFullScreen()
                    } else {
                        if (j.mozCancelFullScreen) {
                            j.mozCancelFullScreen()
                        } else {
                            if (j.webkitCancelFullScreen) {
                                j.webkitCancelFullScreen()
                            } else {
                                if (aj.webkitExitFullScreen) {
                                    aj.webkitExitFullScreen()
                                }
                            }
                        }
                    }
                }
                if (g && aH.jwGetState() == i.PAUSED) {
                    setTimeout(am, 500)
                }
            }
            aY(aP);
            aY(ah);
            aY(aA);
            ao();
            if (H.fullscreen) {
                K = setInterval(ao, 200)
            } else {
                clearInterval(K)
            }
            setTimeout(function () {
                var a3 = A.bounds(aV);
                H.width = a3.width;
                H.height = a3.height;
                Z.sendEvent(c.JWPLAYER_RESIZE)
            }, 0)
        };

        function aY(a2) {
            if (a2) {
                a2.redraw()
            }
        }

        function U(a4, a2) {
            if (A.exists(a4) && A.exists(a2)) {
                H.width = a4;
                H.height = a2
            }
            aS.style.width = isNaN(a4) ? a4 : a4 + "px";
            if (aS.className.indexOf(e) == -1) {
                aS.style.height = isNaN(a2) ? a2 : a2 + "px"
            }
            if (ah) {
                ah.redraw()
            }
            if (aP) {
                aP.redraw()
            }
            if (M) {
                M.offset(aP && M.position().indexOf("bottom") >= 0 ? aP.height() + aP.margin() : 0);
                setTimeout(function () {
                    if (aA) {
                        aA.offset(M.position() == "top-left" ? M.element().clientWidth + M.margin() : 0)
                    }
                }, 500)
            }
            var a6 = H.playlistsize,
                a7 = H.playlistposition;
            ad(a2);
            if (O && a6 && (a7 == "right" || a7 == "bottom")) {
                O.redraw();
                var a3 = {
                    display: p
                }, a5 = {};
                a3[a7] = 0;
                a5[a7] = a6;
                if (a7 == "right") {
                    a3.width = a6
                } else {
                    a3.height = a6
                }
                u(ay(h), a3);
                u(ay(t), a5)
            }
            ao();
            Z.sendEvent(c.JWPLAYER_RESIZE);
            return
        }

        function ad(a2) {
            aE = ak(a2);
            if (aP) {
                if (aE) {
                    aP.audioMode(m);
                    al();
                    ah.hidePreview(m);
                    F();
                    aT(v)
                } else {
                    aP.audioMode(v);
                    ae(aH.jwGetState())
                }
            }
            if (M && aE) {
                G()
            }
            aS.style.backgroundColor = aE ? "transparent" : "#000"
        }

        function ak(a2) {
            if (z && !Q) {
                return v
            } else {
                if (a2.toString().indexOf("%") > 0) {
                    return v
                } else {
                    if (H.playlistposition == "bottom") {
                        return a2 <= (40 + H.playlistsize)
                    } else {
                        return a2 <= 40
                    }
                }
            }
        }

        function ao() {
            if (aj && aS.className.indexOf(e) == -1) {
                A.stretch(H.stretching, aj, at.clientWidth, at.clientHeight, aj.videoWidth, aj.videoHeight)
            }
        }
        this.resize = U;
        this.resizeMedia = ao;
        var aw = this.completeSetup = function () {
            u(ay(), {
                opacity: 1
            })
        };

        function aD(a2) {
            if (H.fullscreen) {
                switch (a2.keyCode) {
                case 27:
                    au(v);
                    break
                }
            }
        }

        function N(a2) {
            if (E) {
                return
            }
            if (a2) {
                aS.className += " jwfullscreen";
                (j.getElementsByTagName("body")[0]).style["overflow-y"] = o
            } else {
                aS.className = aS.className.replace(/\s+jwfullscreen/, "");
                (j.getElementsByTagName("body")[0]).style["overflow-y"] = ""
            }
        }

        function Y() {
            var a2 = [j.mozFullScreenElement, j.webkitCurrentFullScreenElement, aj.webkitDisplayingFullscreen];
            for (var a3 = 0; a3 < a2.length; a3++) {
                if (a2[a3] && (!a2[a3].id || a2[a3].id == aH.id)) {
                    return m
                }
            }
            return v
        }

        function I(a2) {
            var a3 = Y();
            if (H.fullscreen != a3) {
                au(a3)
            }
        }

        function J() {
            if (aP) {
                aP.show()
            }
        }

        function aG() {
            if (aP && !aE && !Q) {
                aP.hide()
            }
        }

        function X() {
            if (aA && !aE && (!z || av)) {
                aA.show()
            }
        }

        function ar() {
            if (aA && !(av || Q)) {
                aA.hide()
            }
        }

        function aL() {
            if (M && !aE) {
                M.show()
            }
        }

        function G() {
            if (M && (!Q || aE)) {
                M.hide(aE)
            }
        }

        function am() {
            if (ah && H.controls && !aE) {
                if (!D || aH.jwGetState() == i.IDLE) {
                    ah.show()
                }
            }
            if (z && !Q) {
                if (k) {
                    aK.style.display = p
                }
                if (!(z && H.fullscreen)) {
                    aj.controls = false
                }
            }
        }

        function F() {
            if (ah) {
                if (z && !Q) {
                    if (k && H.controls) {
                        aK.style.display = a
                    }
                    aj.controls = H.controls
                }
                ah.hide()
            }
        }

        function aZ() {
            aG();
            ar();
            G()
        }

        function al() {
            if (H.controls || aE) {
                J();
                X()
            }
            aL()
        }

        function a1(a3, a2) {
            if (a2.right < a3.left || a2.left > a3.right) {
                return a3
            }
            if (a2.bottom < a3.top || a2.top > a3.bottom) {
                return a3
            }
            var a4 = (a2.y > a2.height / 2),
                a5 = {
                    x: a3.x,
                    y: a4 ? a3.y : a2.bottom,
                    width: a3.width
                }
        }

        function aT(a2) {
            a2 = a2 && !aE;
            u(ay(B), {
                visibility: a2 ? "visible" : o,
                opacity: a2 ? 1 : 0
            })
        }

        function aQ() {
            av = m;
            au(false);
            if (H.controls) {
                X()
            }
        }

        function aU(a2) {
            an = m
        }
        var aO;

        function S(a2) {
            av = v;
            clearTimeout(aO);
            aO = setTimeout(function () {
                ae(a2.newstate)
            }, 100)
        }

        function ae(a2) {
            switch (a2) {
            case i.PLAYING:
                if (!H.getVideo().audioMode() || z) {
                    aT(m);
                    ao();
                    ah.hidePreview(m);
                    if (z) {
                        if (!(g && Q)) {
                            F()
                        }
                    }
                } else {
                    aT(v);
                    ah.hidePreview(aE)
                }
                aW();
                break;
            case i.IDLE:
                aT(v);
                af();
                if (!aE) {
                    ah.hidePreview(v);
                    am();
                    if (!ax.hide) {
                        aL()
                    }
                }
                break;
            case i.BUFFERING:
                am();
                if (z) {
                    aT(m)
                } else {
                    al()
                }
                break;
            case i.PAUSED:
                am();
                if (!z || Q) {
                    al()
                }
                break
            }
        }

        function ay(a2) {
            return "#" + aH.id + (a2 ? " ." + a2 : "")
        }
        this.setupInstream = function (a2, a5, a4, a3) {
            a0(ay(C), m);
            a0(ay(f), v);
            ag.appendChild(a2);
            _instreamVideo = a3;
            L = a4;
            aB = a5;
            S({
                newstate: i.PLAYING
            });
            if (z) {
                aJ = aH.jwGetControls();
                console.log(aJ);
                aH.jwSetControls(v)
            }
            az = m
        };
        var T = this.destroyInstream = function () {
            a0(ay(C), v);
            a0(ay(f), m);
            ag.innerHTML = "";
            _instreamVideo = null;
            az = v;
            if (z) {
                aH.jwSetControls(aJ)
            }
        };
        this.setupError = function (a2) {
            aq = true;
            jwplayer.embed.errorScreen(aS, a2);
            aw()
        };

        function a0(a2, a3) {
            u(a2, {
                display: a3 ? p : a
            })
        }
        this.addButton = function (a4, a2, a3, a5) {
            if (aA) {
                aA.addButton(a4, a2, a3, a5)
            }
        };
        this.removeButton = function (a2) {
            if (aA) {
                aA.removeButton(a2)
            }
        };
        this.setControls = function (a3) {
            var a4 = H.controls,
                a2 = a3 ? m : v;
            H.controls = a2;
            if (a2 != a4) {
                if (a2) {
                    am()
                } else {
                    aZ();
                    F()
                } if (az) {
                    if (a3) {
                        aB.show();
                        L.show()
                    } else {
                        aB.hide();
                        L.hide()
                    }
                }
                Z.sendEvent(c.JWPLAYER_CONTROLS, {
                    controls: a2
                })
            }
        };
        this.forceState = function (a2) {
            ah.forceState(a2)
        };
        this.releaseState = function () {
            ah.releaseState(aH.jwGetState())
        };
        this.getSafeRegion = function () {
            var a9 = H.controls,
                ba = A.bounds(aV),
                a4 = ba.top,
                a7 = A.bounds(aP ? aP.element() : null),
                a3 = (aA.numButtons() > 0),
                a6 = A.bounds(aA.element()),
                a5 = A.bounds(M.element()),
                a8 = (M.position().indexOf("top") == 0),
                a2 = {};
            a2.x = 0;
            a2.y = Math.max(a3 ? (a6.top + a6.height - a4) : 0, a8 ? (a5.top + a5.height - a4) : 0);
            a2.width = ba.width;
            if (a7.height) {
                a2.height = (a8 ? a7.top : a5.top) - a2.y - a4
            } else {
                a2.height = ba.height - a2.y
            }
            return {
                x: 0,
                y: a9 ? a2.y : 0,
                width: a9 ? a2.width : 0,
                height: a9 ? a2.height : 0
            }
        };
        this.destroy = function () {
            j.removeEventListener("webkitfullscreenchange", I, v);
            j.removeEventListener("mozfullscreenchange", I, v);
            aj.removeEventListener("webkitbeginfullscreen", I, v);
            aj.removeEventListener("webkitendfullscreen", I, v);
            j.removeEventListener("keydown", aD, v);
            if (ap) {
                ap.destroy()
            }
        };
        aI()
    };
    u("." + r, {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": A.isMobile() ? 200 : 0,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + t, {
        position: l,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + B + " ,." + f, {
        position: l,
        height: q,
        width: q,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + B, {
        overflow: o,
        visibility: o,
        opacity: 0,
        cursor: "pointer"
    });
    u("." + B + " video", {
        background: "transparent",
        width: q,
        height: q
    });
    u("." + h, {
        position: l,
        height: q,
        width: q,
        display: a
    });
    u("." + C, {
        position: l,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    u("." + b, {
        display: "none"
    });
    u("." + r + "." + e, {
        height: "auto"
    });
    u(d, {
        width: q,
        height: q,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1000,
        position: "fixed"
    }, m);
    u(d + " ." + t, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, m);
    u(d + " ." + h, {
        display: a
    }, m);
    u("." + r + " .jwuniform", {
        "background-size": "contain" + x
    });
    u("." + r + " .jwfill", {
        "background-size": "cover" + x,
        "background-position": "center"
    });
    u("." + r + " .jwexactfit", {
        "background-size": q + " " + q + x
    })
})(jwplayer.html5);