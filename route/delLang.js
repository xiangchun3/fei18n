var langManage;
langManage = require("../lang");

module.exports = function(req, res) {
    var lang;
    lang = req.param("lang");
    langManage.del(
        lang,
        function() { res.successJSON(); },
        function(msg) { res.errorJSON(msg); }
    );
};
