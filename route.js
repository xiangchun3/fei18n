var path, app;
path = require("path");

function route(express) {
    app = express;
    initRoute();
};

function setRoute(routePath, routeFile, method) {
    method = method || "get";
    app[method](routePath, function(req, res) {
        require(path.join(__dirname, routeFile))(req, res);
    });
};

function initRoute() {
    setRoute("/getLang", "./route/getLang");
    setRoute("/getI18n", "./route/getI18n");
    setRoute("/getLangInfo", "./route/getLangInfo");
    setRoute("/add", "./route/add", "post");
    setRoute("/del", "./route/del");
    setRoute("/modify", "./route/modify");
    setRoute("/addLang", "./route/addLang");
    setRoute("/delLang", "./route/delLang");
    setRoute("/modifyLang", "./route/modifyLang");
    setRoute("/createLangFile", "./route/createLangFile");
};

module.exports = route;