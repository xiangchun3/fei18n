;;;!function() {
    $.format = $.validator.format;
    $.fn.databind = function(data, fn) {
        var name, value, s, settingFn;
        this.find("[role=databind]").each(function(i, ele) {
            var tagName, type, r;
            tagName = ele.tagName.toLowerCase();
            type = ele.type;
            ele = $(ele);
            name = ele.data("bindName");
            value = data[name];
            s = $.databind.setting[name];
            settingFn = null;
            if(s) {
                settingFn = s["default"] || s;
            }
            if(null == value) {
                value = "";
            }
            switch(tagName) {
                case "input":
                    switch(type) {
                        case "checkbox": case "radio":
                            try { s = s[tagName][type]; } catch(e) { s = null; }
                            if(s) {
                                settingFn = s;
                                value = settingFn(value, data);
                            }
                            if(value == ele.val()) {
                                ele.prop("checked", true);
                            }
                            else {
                                ele.prop("checked", false);
                            }
                        break;
                        default:
                            try { s = s[tagName]["default"]; } catch(e) { s = null; }
                            if(s) {
                                settingFn = s;
                                value = settingFn(value, data);
                            }
                            ele.val(value);
                    }
                break;
                default:
                    if(settingFn) {
                        value = settingFn(value, data);
                        if(null == value) {
                            value = "";
                        }
                    }
                    ele.html(value);
            }
            if(fn) {
                fn.call(this, value, data, name);
            }
        });
    };

    $.formatByData = function(tpl, data, fn) {
        var pattern, m, name, value, settingFn;
        pattern = /\{\!(.*?)\}/;
        while((m = tpl.match(pattern))) {
            name = m[1];
            value = data[name];
            settingFn = $.databind.setting[name];
            if(settingFn) {
                settingFn = settingFn["default"] || settingFn;
                value = settingFn(value, data);
            }
            if(fn) {
                value = fn(name, value, data);
            }
            if(null == value) {
                value = "";
            }
            tpl = tpl.replace(m[0], value);
        }
        return tpl;
    }
}();
