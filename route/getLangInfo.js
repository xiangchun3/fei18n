var i18nManage, langManage;

i18nManage = require("../i18n");
langManage = require("../lang");

function sendResult(key, r, res) {
    res.result[key] = r;
    if("--" != res.result["lang"] && "--" != res.result.i18n) {
        res.successJSON(res.result);
    }
}

module.exports = function(req, res) {
    res.result = {
        lang: "--",
        i18n: "--"
    };
    i18nManage.select(
        function(r) {
            sendResult("i18n", r, res); 
        },
        function(msg) {
            res.errorJSON(msg);
        }
    );
    langManage.select(
        function(r) {
            sendResult("lang", r, res); 
        },
        function(msg) {
            res.errorJSON(msg);
        }
    );
};
