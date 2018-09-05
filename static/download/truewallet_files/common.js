myAddEvent(window, "load", function() {
	if(document.getElementById("quick_nav")){

	  var oQuickNav = document.getElementById("quick_nav");
	  var oQuickNavDiv = oQuickNav.getElementsByTagName("div");
	  var oBtn = true;
	  oQuickNavDiv[0].onclick = function() {
		  if (oBtn == true) {
			  this.className = "quick_btn current";
			  oQuickNavDiv[1].className = "quick_con show";
		  } else {
			  this.className = "quick_btn";
			  oQuickNavDiv[1].className = "quick_con hide";
		  }
		  oBtn = !oBtn;
	  }
	}

});
function tervalTop(){
	var news = document.getElementById("news_li");
	var newsTop = 0;
	var newsLi = news.getElementsByTagName("li");
	var iCount = newsLi * 19;
	var oBtn = true;
	myAddEvent(window, "load", function() {

		setInterval(function(){

			if(oBtn){
				newsTop -= 19;
			}else{
				newsTop += 19;
			}
			iCount++;
			news.style.top = newsTop + "px";
			if(((news.offsetHeight-19) + newsTop) ==0 || newsTop == 0){
				oBtn = !oBtn;
			}
		}, 2000)
	});
}
function readUbb(jo) {
    var jm = {
        mode: "click",
        modeTime: "5000",
        thisEvent: "thisEvent",
        readCount: 5,
        ubbBox: "ubbBox",
        ubb: "{bbs=0_2_1_12_4}",
        ubbTag: "a",
        siteid: "1000",
        loadHref: "",
        loadFn: function() {
        },
        failureFn: function() {
        },
        returnUbbFn: function(sHtml) {
        }
    }
    extend(jm, jo);
    jm.ubbBox = document.getElementById(jm.ubbBox);
    var iMListBtn = jm.ubb.match(/_/g).length;
    if (jm.mode == "setInterval") {
        jm.readCount = -1;
        setInterval(getReadUbb, jm.modeTime);
    } else {
        jm.thisEvent = document.getElementById(jm.thisEvent);
        myAddEvent(jm.thisEvent, "click", function() {
            getReadUbb();
        });
    }
    function getReadUbb() {
        if (jm.readCount > 0 || jm.readCount == -1) {
            if (iMListBtn == 4) {
                var iTag = 0;
                if (jm.readCount > 0) {
                    iTag = jm.ubbBox.getElementsByTagName(jm.ubbTag).length;
                }
                iTag = parseInt(getIndexOf(jm.ubb, "_", "_")) + iTag;
                var url = "/ajax_ubb.aspx?siteid=" + jm.siteid + "&ubb=" + jm.ubb.replace(/\_(.*?)\_/, "_" + iTag + "_");
            }
            ajax("post", url, function(sHtml) {
                jm.returnUbbFn(sHtml);
                jm.ubbBox.innerHTML = sHtml;
                if (jm.readCount > 0) {
                    jm.readCount--;
                    if (jm.readCount == 0) {
                        jm.loadFn();
                    }
                }
            }, function() {
                jm.failureFn()
            });
        } else {
            if (jm.loadHref != "") {
                window.location.href = jm.loadHref;
            }
        }
    }
    function getIndexOf(str, sLeft, sRight) {
        var sm = str.indexOf(sLeft);
        var xm = str.indexOf(sRight, sm + 1);
        str = str.substring(sm + sLeft.length, xm);
        return str;
    }
    function myAddEvent(obj, sEv, fn) {
        if (obj.attachEvent) {
            obj.attchEvent("on", sEv, fn);
        } else {
            obj.addEventListener(sEv, fn, false);
        }
    }
    function ajax(sty, url, fnTrue, fnFalse) {
        var oAjax = null;
        
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest();
        } else {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        switch (sty) {
            case "post":
                var arr = url.split("?");
                oAjax.open(sty, arr[0], true);
                oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                if (arr.length < 2) {
                    oAjax.send(arr[1]);
                } else {
                    var arrUrl = "";
                    for (var i = 1; i < arr.length; i++) {
                        arrUrl += "?" + arr[i];
                    }
                    oAjax.send(arrUrl.substring(1));
                }
                break;
            case "get":
                url += "&" + new Date().getTime();
                oAjax.open(sty, url, true);
                oAjax.send();
                break;
        }
        oAjax.onreadystatechange = function() {
            if (oAjax.readyState == 4) {
                if (oAjax.status == 200) {
                    fnTrue(oAjax.responseText);
                } else {
                    if (fnFalse) {
                        fnFalse();
                    }
                }
            }
        }
    }
    function extend(obj1, obj2) {
        for (var attr in obj2) {
            obj1[attr] = obj2[attr];
        }
    }

}
function myAddEvent(obj, sEv, fn) {
    if (obj.attachEvent) {
        obj.attchEvent("on", sEv, fn);
    } else {
        obj.addEventListener(sEv, fn, false);
    }
}
function createBox(id, sHtml) {
    var obj = document.createElement('div');
    obj.className = id;
    obj.id = id;
    obj.innerHTML = sHtml;
    document.body.appendChild(obj);
}
myAddEvent(window, "load", function (){
	try{loadFn();}catch(e){}
	
});
function loadFn() {
    var oMenu = document.getElementById("menu-js");
    var oSearch = document.getElementById("search-js");
    var oUser = document.getElementById("user-js");
    var oSearch = document.getElementById("search-box");
    createBox("search-show", "");
    var oSearchShow = document.getElementById("search-show");
    var oAside = document.getElementById("aside");
    var oAsideLeft = document.getElementsByClassName("aside-left");
    var oHeader = document.getElementById("header");
    myAddEvent(oMenu, "click", function() {
        oAside.className += " on";
        oSearchShow.className += " on";
        for (var i = 0; i < oAsideLeft.length; i++) {
            oAsideLeft[i].className += " on";
        }
    });
    myAddEvent(oSearch, "click", function(e) {
        var thisSource = e.target || window.event.srcElement;
        if (oSearch.className == "search-box") {
            oSearch.className += " on";
            oSearchShow.className += " on";
            oHeader.style.zIndex = "8888";
        } else if (thisSource.tagName.toLowerCase() == "img") {
            var oSearchForm = document.getElementById("search-form");
            oSearchForm.submit();
        }
    });
    
    
    myAddEvent(oSearchShow, "click", function() {
        oSearch.className = "search-box";
        oSearchShow.className = "search-show";
        oAside.className = "aside";
        oHeader.style.zIndex = "999";
        for (var i = 0; i < oAsideLeft.length; i++) {
            oAsideLeft[i].className = oAsideLeft[i].className.replace(" on", "");
        }
    });
}

/*!
=================下面为大话主席插件=============================
 * TouchSlide v1.1
 * javascript触屏滑动特效插件，移动端滑动特效，触屏焦点图，触屏Tab切换，触屏多图切换等
 * 详尽信息请看官网：http://www.SuperSlide2.com/TouchSlide/
 *
 * Copyright 2013 大话主席
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途

 * 1.1 宽度自适应（修复安卓横屏时滑动范围不变的bug）
 */
var TouchSlide = function(a) {
    a = a || {};
    var b = {slideCell: a.slideCell || "#touchSlide",titCell: a.titCell || ".hd li",mainCell: a.mainCell || ".bd",effect: a.effect || "left",autoPlay: a.autoPlay || !1,delayTime: a.delayTime || 200,interTime: a.interTime || 2500,defaultIndex: a.defaultIndex || 0,titOnClassName: a.titOnClassName || "on",autoPage: a.autoPage || !1,prevCell: a.prevCell || ".prev",nextCell: a.nextCell || ".next",pageStateCell: a.pageStateCell || ".pageState",pnLoop: "undefined " == a.pnLoop ? !0 : a.pnLoop,startFun: a.startFun || null,endFun: a.endFun || null,switchLoad: a.switchLoad || null}, c = document.getElementById(b.slideCell.replace("#", ""));
    if (!c)
        return !1;
    var d = function(a, b) {
        a = a.split(" ");
        var c = [];
        b = b || document;
        var d = [b];
        for (var e in a)
            0 != a[e].length && c.push(a[e]);
        for (var e in c) {
            if (0 == d.length)
                return !1;
            var f = [];
            for (var g in d)
                if ("#" == c[e][0])
                    f.push(document.getElementById(c[e].replace("#", "")));
                else if ("." == c[e][0])
                    for (var h = d[g].getElementsByTagName("*"), i = 0; i < h.length; i++) {
                        var j = h[i].className;
                        j && -1 != j.search(new RegExp("\\b" + c[e].replace(".", "") + "\\b")) && f.push(h[i])
                    }
                else
                    for (var h = d[g].getElementsByTagName(c[e]), i = 0; i < h.length; i++)
                        f.push(h[i]);
            d = f
        }
        return 0 == d.length || d[0] == b ? !1 : d
    }, e = function(a, b) {
        var c = document.createElement("div");
        c.innerHTML = b, c = c.children[0];
        var d = a.cloneNode(!0);
        return c.appendChild(d), a.parentNode.replaceChild(c, a), m = d, c
    }, g = function(a, b) {
        !a || !b || a.className && -1 != a.className.search(new RegExp("\\b" + b + "\\b")) || (a.className += (a.className ? " " : "") + b)
    }, h = function(a, b) {
        !a || !b || a.className && -1 == a.className.search(new RegExp("\\b" + b + "\\b")) || (a.className = a.className.replace(new RegExp("\\s*\\b" + b + "\\b", "g"), ""))
    }, i = b.effect, j = d(b.prevCell, c)[0], k = d(b.nextCell, c)[0], l = d(b.pageStateCell)[0], m = d(b.mainCell, c)[0];
    if (!m)
        return !1;
    var N, O, n = m.children.length, o = d(b.titCell, c), p = o ? o.length : n, q = b.switchLoad, r = parseInt(b.defaultIndex), s = parseInt(b.delayTime), t = parseInt(b.interTime), u = "false" == b.autoPlay || 0 == b.autoPlay ? !1 : !0, v = "false" == b.autoPage || 0 == b.autoPage ? !1 : !0, w = "false" == b.pnLoop || 0 == b.pnLoop ? !1 : !0, x = r, y = null, z = null, A = null, B = 0, C = 0, D = 0, E = 0, G = /hp-tablet/gi.test(navigator.appVersion), H = "ontouchstart" in window && !G, I = H ? "touchstart" : "mousedown", J = H ? "touchmove" : "", K = H ? "touchend" : "mouseup", M = m.parentNode.clientWidth, P = n;
    if (0 == p && (p = n), v) {
        p = n, o = o[0], o.innerHTML = "";
        var Q = "";
        if (1 == b.autoPage || "true" == b.autoPage)
            for (var R = 0; p > R; R++)
                Q += "<li>" + (R + 1) + "</li>";
        else
            for (var R = 0; p > R; R++)
                Q += b.autoPage.replace("$", R + 1);
        o.innerHTML = Q, o = o.children
    }
    "leftLoop" == i && (P += 2, m.appendChild(m.children[0].cloneNode(!0)), m.insertBefore(m.children[n - 1].cloneNode(!0), m.children[0])), N = e(m, '<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'), m.style.cssText = "width:" + P * M + "px;" + "position:relative;overflow:hidden;padding:0;margin:0;";
    for (var R = 0; P > R; R++)
        m.children[R].style.cssText = "display:table-cell;vertical-align:top;width:" + M + "px";
    var S = function() {
        "function" == typeof b.startFun && b.startFun(r, p)
    }, T = function() {
        "function" == typeof b.endFun && b.endFun(r, p)
    }, U = function(a) {
        var b = ("leftLoop" == i ? r + 1 : r) + a, c = function(a) {
            for (var b = m.children[a].getElementsByTagName("img"), c = 0; c < b.length; c++)
                b[c].getAttribute(q) && (b[c].setAttribute("src", b[c].getAttribute(q)), b[c].removeAttribute(q))
        };
        if (c(b), "leftLoop" == i)
            switch (b) {
                case 0:
                    c(n);
                    break;
                case 1:
                    c(n + 1);
                    break;
                case n:
                    c(0);
                    break;
                case n + 1:
                    c(1)
            }
    }, V = function() {
        M = N.clientWidth, m.style.width = P * M + "px";
        for (var a = 0; P > a; a++)
            m.children[a].style.width = M + "px";
        var b = "leftLoop" == i ? r + 1 : r;
        W(-b * M, 0)
    };
    window.addEventListener("resize", V, !1);
    var W = function(a, b, c) {
        c = c ? c.style : m.style, c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms", c.webkitTransform = "translate(" + a + "px,0)" + "translateZ(0)", c.msTransform = c.MozTransform = c.OTransform = "translateX(" + a + "px)"
    }, X = function(a) {
        switch (i) {
            case "left":
                r >= p ? r = a ? r - 1 : 0 : 0 > r && (r = a ? 0 : p - 1), null != q && U(0), W(-r * M, s), x = r;
                break;
            case "leftLoop":
                null != q && U(0), W(-(r + 1) * M, s), -1 == r ? (z = setTimeout(function() {
                    W(-p * M, 0)
                }, s), r = p - 1) : r == p && (z = setTimeout(function() {
                    W(-M, 0)
                }, s), r = 0), x = r
        }
        S(), A = setTimeout(function() {
            T()
        }, s);
        for (var c = 0; p > c; c++)
            h(o[c], b.titOnClassName), c == r && g(o[c], b.titOnClassName);
        0 == w && (h(k, "nextStop"), h(j, "prevStop"), 0 == r ? g(j, "prevStop") : r == p - 1 && g(k, "nextStop")), l && (l.innerHTML = "<span>" + (r + 1) + "</span>/" + p)
    };
    if (X(), u && (y = setInterval(function() {
        r++, X()
    }, t)), o)
        for (var R = 0; p > R; R++)
            !function() {
                var a = R;
                o[a].addEventListener("click", function() {
                    clearTimeout(z), clearTimeout(A), r = a, X()
                })
            }();
    k && k.addEventListener("click", function() {
        (1 == w || r != p - 1) && (clearTimeout(z), clearTimeout(A), r++, X())
    }), j && j.addEventListener("click", function() {
        (1 == w || 0 != r) && (clearTimeout(z), clearTimeout(A), r--, X())
    });
    var Y = function(a) {
        clearTimeout(z), clearTimeout(A), O = void 0, D = 0;
        var b = H ? a.touches[0] : a;
        B = b.pageX, C = b.pageY, m.addEventListener(J, Z, !1), m.addEventListener(K, $, !1)
    }, Z = function(a) {
        if (!H || !(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
            var b = H ? a.touches[0] : a;
            if (D = b.pageX - B, E = b.pageY - C, "undefined" == typeof O && (O = !!(O || Math.abs(D) < Math.abs(E))), !O) {
                switch (a.preventDefault(), u && clearInterval(y), i) {
                    case "left":
                        (0 == r && D > 0 || r >= p - 1 && 0 > D) && (D = .4 * D), W(-r * M + D, 0);
                        break;
                    case "leftLoop":
                        W(-(r + 1) * M + D, 0)
                }
                null != q && Math.abs(D) > M / 3 && U(D > -0 ? -1 : 1)
            }
        }
    }, $ = function(a) {
        0 != D && (a.preventDefault(), O || (Math.abs(D) > M / 10 && (D > 0 ? r-- : r++), X(!0), u && (y = setInterval(function() {
            r++, X()
        }, t))), m.removeEventListener(J, Z, !1), m.removeEventListener(K, $, !1))
    };
    m.addEventListener(I, Y, !1)
};

function showBox(tips){

var obj = document.createElement("div");
obj.className = "showBox";
obj.innerHTML = tips;
document.body.appendChild(obj);
obj.style.marginLeft = "-" + (obj.offsetWidth)/2 + "px";
obj.style.marginTop = "-" + (obj.offsetHeight)/2 + "px";
setTimeout(function() {
        document.body.removeChild(obj);
    }, 2000)//3000毫秒删除此元素
}


function getFormUrl(oForm) {//获取表单值，生成url
    
    var url = "";
    var oSelect = oForm.getElementsByTagName("select");
    var oTextarea = oForm.getElementsByTagName("textarea");
    var oInput = oForm.getElementsByTagName("input");
    for (var i = 0; i < oSelect.length; i++) {
        url += "&" + oSelect[i].name + "=" + oSelect[i].value;
    }
    for (var i = 0; i < oTextarea.length; i++) {
        url += "&" + oTextarea[i].name + "=" + oTextarea[i].value;
    }
    for (var i = 0; i < oInput.length; i++) {
        if (oInput[i].type != "submit" && oInput[i].type != "file") {
            url += "&" + oInput[i].name + "=" + oInput[i].value;
        }
    }
    if (oForm.getAttribute("action").indexOf("?") < 0) {
        url = url.substring(1)
        url = oForm.getAttribute("action") + "?" + url;
    } else {
        url = oForm.getAttribute("action") + url;
    }
    return url;
}
function myajax(GetOrPost, gourl,messageid) {
	
		 
    var oAjax = null;
    
    if (window.XMLHttpRequest) {           
            oAjax = new XMLHttpRequest();           
            if (oAjax.overrideMimeType) {
                oAjax.overrideMimeType("text/xml");
            }
            } else if (window.ActiveXObject) {           
            var activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP", ""];
            for (var i = 0; i < activexName.length; i++) {
                try {                   
                    oAjax = new ActiveXObject(activexName[i]);
                    break;
                } catch (e) { }
            }
            }
            
            
    switch (GetOrPost) {
        case "POST":
            var arr = gourl.split("?");
            oAjax.open("POST", arr[0], true);
            oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (arr.length < 2) {
                oAjax.send(arr[1]);
            } else {
                var arrUrl = "";
                for (var i = 1; i < arr.length; i++) {
                    arrUrl += "?" + arr[i];
                }
                oAjax.send(arrUrl.substring(1));
            }
            break;
        case "GET":
        
            gourl += "&" + new Date().getTime();
            oAjax.open("GET", gourl, true);
            oAjax.send();
            break;
    }
    
    
    
    oAjax.onreadystatechange = function() {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {          	
            	
                fnTrue(oAjax.responseText,messageid);
            } else {                
                fnFalse(messageid);                
            }
        }
        //else{        	
        //	 fnFalse(messageid);
        //}
        
    
    }
}