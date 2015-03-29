$.module.mod.LangManage = Module.extend({
    init: function(m) {
        this._super(m);
    },
    main: function() {
        this.loadLang();
        this.addAddLangEvent();
        this.addModifyLangEvent();
        this.addDelLangEvent();
    },
    loadLang: function() {
        var _this, langList, html, tpl;
        _this = this;
        langList = this.m.find("[role=langList]");
        html = [];
        tpl = '<label><input type="text" role="lang" data-text="{0}" value="{0}" /> <a href="javascript:;" role="delLang" data-lang="{0}">删除</a></label>';
        langList.empty();
        $.get("/getLang", function(r) {
            if(200 != r.code) {
                alert(r.msg);
                return;
            }
            $.each(r.data, function(i, d) {
                html.push($.format(tpl, d[0]));
            });
            langList.html(html.join(""));
        });
    },
    addAddLangEvent: function() {
        var _this;
        _this = this;
        this.m.find("[role=addLang]").submit(function() {
            var form, data;
            form = $(this);
            data = form.serializeArray();
            $.get("/addlang", data, function(r) {
                if(200 != r.code) {
                    alert(r.msg);
                    return;
                }
                _this.loadLang();
            });
        })
    },
    addModifyLangEvent: function() {
        this.m.on("blur", "[role=lang]", function() {
            var ele, oldText, newText;
            ele = $(this);
            oldText = ele.data("text");
            newText = ele.val();
            $.get("/modifyLang", {oldText: oldText, newText: newText}, function(r) {
                if("200" != r.code) {
                    alert(r.msg);
                    ele.val(ele.data("text"));
                    return;
                }
                ele.data("text", newText);
            })
        });
    },
    addDelLangEvent: function() {
        this.m.on("click", "[role=delLang]", function() {
            var ele, lang;
            ele = $(this);
            lang = ele.data("lang");
            $.get("/delLang", {lang: lang}, function(r) {
                if(200 != r.code) {
                    alert(r.msg);
                    return;
                }
                ele.parents("label").remove();
            });
        });
    }
});