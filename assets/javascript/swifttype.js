var Swiftype = window.Swiftype || {};
Swiftype.root_url = Swiftype.root_url || "//api.swiftype.com";
if (typeof Swiftype.renderStyle === 'undefined') {
    Swiftype.renderStyle = 'nocode';
}

Swiftype.isMobile = function() {
    var ua = window.navigator.userAgent;
    if(/iPhone|iPod/.test(ua) && ua.indexOf("AppleWebKit") > -1 ) {
        return true;
    }
    if (/Android/.test(ua) && /Mobile/i.test(ua) && ua.indexOf("AppleWebKit") > -1 ) {
        return true;
    }
    return false;
};

Swiftype.loadScript = function(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;

    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);

    if (script.addEventListener) {
        script.addEventListener('load', callback, false);
    } else {
        script.attachEvent('onreadystatechange', function() {
            if (/complete|loaded/.test(script.readyState))
                callback();
        });
    }
};

Swiftype.loadStylesheet = function(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);
};

Swiftype.loadSupportingFiles = function(callback) {
    if (Swiftype.renderStyle === false) {
        Swiftype.loadScript("//s.swiftypecdn.com/assets/swiftype_no_render-d666840732e425076e607ac0b3bed097.js", callback);
        Swiftype.loadStylesheet("//s.swiftypecdn.com/assets/swiftype-9261e170d74ef8347d54dc5ba07098ad.css");
    } else if (Swiftype.isMobile()) {
        Swiftype.loadScript("//s.swiftypecdn.com/assets/swiftype_nocode-e30be03bbd678b57bc84348ee7f99a3d.js", callback);
        Swiftype.loadStylesheet("//s.swiftypecdn.com/assets/swiftype_nocode-9819fdab0a6edb7d9e19670059c26ac3.css");
    } else if (Swiftype.renderStyle === 'inline' || Swiftype.renderStyle === 'new_page') {
        Swiftype.loadScript("//s.swiftypecdn.com/assets/swiftype_onpage-e87cc8ba48690f2b67b46c8ad4351ef3.js", callback);
        Swiftype.loadStylesheet("//s.swiftypecdn.com/assets/swiftype-9261e170d74ef8347d54dc5ba07098ad.css");
    } else {
        Swiftype.loadScript("//s.swiftypecdn.com/assets/swiftype_nocode-e30be03bbd678b57bc84348ee7f99a3d.js", callback);
        Swiftype.loadStylesheet("//s.swiftypecdn.com/assets/swiftype_nocode-9819fdab0a6edb7d9e19670059c26ac3.css");
    }

    Swiftype.loadScript("//swiftype.com/te.js", function(){});
};

var Swiftype = (function(window, undefined) {
    Swiftype.loadSupportingFiles(function(){});
    Swiftype.additionalInputElements = ['#st-search-input2'];
    return Swiftype;
})(window);