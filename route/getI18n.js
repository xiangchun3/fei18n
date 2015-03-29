var i18nManage;
i18nManage = require("../i18n");

module.exports = function(req, res) {
    var keyword;
    keyword = req.param("keyword");
    i18nManage.select(
        keyword,
        function(r) {
            res.successJSON(r);
        },
        function(msg) {
            res.errorJSON(msg);
        }
    );
};
