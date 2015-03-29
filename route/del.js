var i18nManage;
i18nManage = require("../i18n");

module.exports = function(req, res) {
    var key;
    key = req.param("key");
    i18nManage.del(
        key,
        function() {
            res.successJSON();
        },
        function(msg) {
            res.errorJSON(msg);
        }
    );
};
