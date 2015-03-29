/**
 * @class jquery.parseUrl
 * @static
 */
+function() {
	$.parseUrl = function(url) {
		var d;
		d = {url: url};
		url = url.split("#");
		if(url.length > 1) {
			d.hash = url[1];
		}
		url = url[0];
		url = url.split("?");
		d.params = {};
		if(url.length > 1) {
			d.query = url[1];
			$.each(d.query.split("&"), function(i, p) {
				p = p.split("=");
				d.params[p[0]] = p[1];
			});
		}
		url = url[0];
		d.pathname = url.replace("http://", "").replace("https://", "").replace(document.domain, "");
		return d;
	}
}();