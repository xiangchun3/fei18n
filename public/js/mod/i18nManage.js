$.module.mod.I18nManage = Module.extend({
    init: function(m) {
        this.urls = [
            {
                url: "/getLangInfo"
            },
        ]
        this._super(m);
    },
    main: function() {
        this.addAddEvent();
        this.addDelEvent();
        this.addModifyEvent();
        this.addCreateLangFileEvent();
    },
    addAddEvent: function() {
        var _this;
        _this = this;
        this.m.find("[role=add]").submit(function(e) {
            var form, data;

            e.preventDefault();

            form = $(this);
            data = form.serializeArray();

            $.post("/add", data, function(r) {
                if(200 != r.code) {
                    alert(r.msg);
                    return;
                }
                _this.grid.opts.url = "/getI18n";
                _this.grid.load();
            });
        });
    },
    addDelEvent: function() {
        var _this;
        _this = this;
        this.m.on("click", "[role=del]", function(e) {
            var ele, key;
            ele = $(this);
            key = ele.data("key");
            ele = ele.parents("tr");
            ele.remove();
            $.get("/del", {key: key}, function(r) {
                if(200 != r.code) {
                    alert(r.msg);
                    return;
                }
            });
        });
    },
    addModifyEvent: function() {
        this.m.on("blur", "[role=langText]", function() {
            var _this, ele, key, lang;
            ele = $(this);
            key = ele.data("key");
            lang = ele.data("lang");
            $.get("/modify", {key: key, lang: lang, text: ele.val()});
        });
    },
    addCreateLangFileEvent: function() {
        this.m.on("click", "[role=createLangFile]", function() {
            $.get("/createLangFile", function(r) {
                if(200 == r.code) {
                    alert("生成语言文件成功");
                }
            });
        });
    },
    databind: function(i, data) {
        if(200 != data.code) {
            alert(data.msg);
            return;
        }
        data = data.data;
        this.bindAddFormData(data["lang"]);
        this.bindLangInfo(data);
    },
    bindAddFormData: function(data) {
        var tpl, form, html, lang;
        tpl = '<label class="fullWidth"><span>{0}：</span><input type="text" name={0} /></label>';
        html = [];
        lang = [];
        form = this.m.find("form");

        $.each(data, function(i, item) {
            html.push($.format(tpl, item[0]));
            lang.push(item[0]);
        });
        html.push($.format('<input type="hidden" name="lang" value="{0}" />', lang.join(",")));

        form.find("div").html(html.join(""));
    },
    bindLangInfo: function(data) {
        var cols, inputTpl;
        cols = [
            {
                title: "操作",
                renderer: function(v, data) {
                    return $.format('<a href="javascript:;" role="del" data-key="{0}">删除</a>', data.key);
                }
            },
            {title: "key", name: "key"}];
        inputTpl = '<label class="fullWidth"><input role="langText" data-key="{2}" data-lang="{0}" type="text" name="{0}" value="{1}" /></label>';
        $.each(data["lang"], function(i, lang) {
            lang = lang[0];
            cols.push({title: lang, name: lang, renderer: function(v, data) {
                var r;
                r = $.format(inputTpl, lang, data[lang], data.key);
                return r;
            }});
        });
        this.grid = this.m.find("[role=langList]").mmGrid({
            height: "auto",
            method: "GET",
            cols: cols,
            autoLoad: false,
            root: "data",
            fullWidthRows: true
        });
        this.grid.load(data.i18n);
    },
    reloadLangInfo: function() {
        var _this, accordion;
        _this = this;
        accordion = this.m.find(".accordion");
        $.get("/getI18n", function(r) {
            if(accordion.hasClass("ui-accordion")) {
                accordion.accordion("destroy").empty();
            }
            _this.bindLangInfo(r.data);
        });
    }
});