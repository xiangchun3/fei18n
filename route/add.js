var i18nManage;
i18nManage = require("../i18n");

module.exports = function(req, res) {
    var langs, key;
    langs = req.param("lang").split(",");
    key = req.param("key");
    i18nManage.add(
        langs,
        key,
        req,
        function() {
            res.successJSON();
        },
        function(msg) {
            res.errorJSON(msg);
        }
    )
};
