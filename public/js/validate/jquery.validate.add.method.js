;;;!function($) {
    var customMethod = {
        amount: {
            method: function(v) {
                return /^\d{1,9}($|\.[\d]{1,2}$)/.test(v);
            },
            msg: "请输入正确的金额，最多保留两位小数，最大9位"
        },
        weight: {
            method: function(v) {
                return /^\d{1,9}($|\.[\d]{1,2}$)/.test(v);
            },
            msg: "请输入正确的重量，最多保留两位小数，最大9位"
        },
        range: {
            method: function(v, element, params) {
                v = +v;
                return params[0] <= v && v <= params[1];
            },
            msg: ""
        },
        maxLength: {
            method: function(v, element, params) {
                return v.length <= params;
            },
            msg: "该字段最多只能输入{0}个字符"
        }
    };

    function addValidateMethod(customMethod) {
        var name, method, msg;
        for(name in customMethod) {
            method = customMethod[name].method;
            msg = customMethod[name].msg;
            !function(method, msg) {
                $.validator.addMethod(
                    name,
                    function(value, element, params) {
                        return this.optional(element) || method(value, element, params);
                    },
                    msg
                );
            }(method, msg);
        }
    }

    addValidateMethod(customMethod);
    $.customValidateMethod = customMethod;
}(jQuery);