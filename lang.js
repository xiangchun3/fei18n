var db;
db = require("./db/db");

function add(lang, successFn, errorFn) {
    var count;
    count = 0;
    db.query("select * from lang where text=?", [lang], function(e, data) {
        if(e) {
            console.log(e);
            errorFn("添加语言失败");
            return;
        }
        if(data.length) {
            errorFn("该语言已经存在");
            return;
        }
        db.query("insert into lang(text) values(?)", [lang], function(e) {
            if(e) {
                console.log(e);
                errorFn("添加语言失败");
                return;
            }
            db.query("select key from i18n group by key", function(e, data) {
                if(e) {
                    console.log(e);
                    errorFn("添加语言失败");
                    return;
                }
                if(!data.length) {
                    successFn();
                    return;
                }
                data.forEach(function(key, i) {
                    key = key[0]
                    db.query("insert into i18n(key, lang, text) values(?, ?, ?)", [key, lang, key], function(e) {
                        if(e) {
                            console.log(e);
                            errorFn("添加语言失败");
                            return;
                        }
                        count++;
                        if(count >= data.length) {
                            successFn();
                        }
                    });
                });
            })
        });
    });
};

function del(lang, successFn, errorFn) {
    db.query("delete from lang where text=?", [lang], function(e, data) {
        if(e) {
            console.log(e);
            errorFn("删除语言发生错误");
            return;
        }
        db.query("delete from i18n where lang=?", [lang], function(e) {
            if(e) {
                console.log(e);
                errorFn("删除语言发生错误");
                return;
            }
            successFn({"code": 200});
        });
    })
};

function select(successFn, errorFn) {
    db.query("select text from lang", function(e, r) {
        if(e) {
            console.log(e);
            errorFn("查询语言失败");
            return;
        }
        successFn(r);
    });
};

function modify(oldText, newText, successFn, errorFn) {
    db.query("select * from lang where text=?", [newText], function(e, data) {
        if(e) {
            console.log(e);
            errorFn("修改语言发生错误");
            return;
        }
        if(data.length) {
            errorFn("该语言已经存在");
            return;
        }
        db.query("update lang set text=? where text=?", [newText, oldText], function(e, data) {
            if(e) {
                console.log(e);
                errorFn("修改语言发生错误");
                return;
            }
            db.query("update i18n set lang=? where lang=?", [newText, oldText], function() {
                if(e) {
                    console.log(e);
                    errorFn("修改语言发生错误");
                    return;
                }
                successFn();
            });
        });
    });

};

module.exports.add = add;
module.exports.del = del;
module.exports.select = select;
module.exports.modify = modify;
