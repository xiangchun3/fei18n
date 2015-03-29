var util, fs, db, result;

util = require("util");
fs = require("fs");
db = require("../db/db");

function createLangFileByLang(lang, res, fn) {
    db.query("select key,text from i18n where lang=?", [lang], {key: String, text: String}, function(e, data) {
        var code;
        if(e) {
            console.log(e);
            res.json({"code": 500, msg: "生成语言文件发生错误"});
            return;
        }
        code = [];
        data.forEach(function(d, i) {
            code.push(util.format('"%s": "%s"', d.key, d.text));
        });
        code = util.format('window.i18n={%s}', code.join(","));
        fs.writeFile(lang + ".js", code);
        fn();
    });
}

module.exports = function(req, res) {
    db.query("select text from lang", {text: String}, function(e, data) {
        var count;
        count = 0;
        if(e) {
            console.log(e);
            res.json({"code": 500, "msg": "生成语言文件发生错误"});
            return;
        }
        data.forEach(function(lang, i) {
            createLangFileByLang(lang["text"], res, function() {
                count++;
                if(count >= data.length) {
                    res.json({"code": 200});
                }
            });
        })
    });
};
