var i18nManage;
i18nManage = require("../i18n");

module.exports = function(req, res) {
    var key, lang, text;
    key = req.param("key");
    lang = req.param("lang");
    text = req.param("text");
    i18nManage.modify(
        key,
        lang,
        text,
        function() { res.successJSON(); },
        function() { res.errorJSON(); }
    );
};
