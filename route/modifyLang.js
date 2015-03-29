var langManage;
langManage = require("../lang");

module.exports = function(req, res) {
    var oldText, newText, sql;
    oldText = req.param("oldText");
    newText = req.param("newText");
    langManage.modify(
        oldText,
        newText,
        function() { res.successJSON(); },
        function(msg) { res.errorJSON(msg); }
    );
};
