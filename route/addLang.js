var langManage;
langManage = require("../lang");

module.exports = function(req, res) {
    var lang;
    lang = req.param("lang");
    langManage.add(
        lang,
        function() { res.successJSON(); },
        function(msg) { res.errorJSON(msg); }
    );
};
