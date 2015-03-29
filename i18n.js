var db;
db = require("./db/db");

function add(langs, key, req, successFn, errorFn) {
    db.query("select * from i18n where key=?", [key], function(e, data) {
        if(e) {
            console.log(e);
            errorFn("修改数据发生错误");
            return;
        }
        console.log(data);
        if(data.length) {
            errorFn("该key已经存在");
        }
        else {
            langs.forEach(function(lang, i) {
                var text;
                text = req.param(lang);
                db.query("insert into i18n(key, lang, text) values(?, ?, ?)", [key, lang, text]);
            });
            successFn();
        }
    })
};

function del(key, successFn, errorFn) {
    db.query("delete from i18n where key=?", [key], function(e, data) {
        if(e) {
            console.log(e);
            errorFn("该key已经存在");
            return;
        }
        successFn();
    });
};

function select(keyword, successFn, errorFn) {
    var sql;
    if(2 == arguments.length && "function" == typeof keyword) {
        errorFn = successFn;
        successFn = keyword;
        keyword = null;
    }
    sql = "select * from i18n order by key";
    if(keyword) {
        sql += " where text like '%" + keyword + "%' or key like '%" + keyword + "%'";
    }
    db.query(sql, {id: Number, key: String, lang: String, text: String}, function(e, r) {
        var o, arr;
        if(e) {
            console.log(e);
            errorFn("查询国际化信息失败");
            return;
        }
        o = {};
        arr = [];
        r.forEach(function(d, i) {
            var item, lang;
            lang = d["lang"];
            if(!o[d.key]) {
                o[d.key] = {};
                item = o[d.key];
                item.key = d.key;
                arr.push(item);
            }
            else {
                item = o[d.key];
            }
            item[lang] = d["text"];
        });
        successFn(arr);
    });
};

function modify(key, lang, text, successFn, errorFn) {
    db.query("update i18n set text=? where key=? and lang=?", [text, key, lang], function(e, data) {
        if(e) {
            console.log(e);
            errorFn("修改数据发生错误");
            return;
        }
        successFn();
    });
}

module.exports.add = add;
module.exports.del = del;
module.exports.select = select;
module.exports.modify = modify;
