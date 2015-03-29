var langManage;
langManage = require("../lang");

module.exports = function(req, res) {
    langManage.select(
        function(r) { res.successJSON(r); },
        function(msg) { res.errorJSON(msg); }
    )
};
