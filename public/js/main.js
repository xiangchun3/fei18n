/**
 * @class sf
 * @static
 */
(function() {
var sf = window.sf || {
	/**
	 * document的jQuery对象
	 * @property doc
	 * @type jQuery
	 */
	doc: $(document),
	/**
	 * body的jQuery对象
	 * @property body
	 * @type jQuery
	 */
	body: $("body"),
	/**
	 * window的jQuery对象
	 * @property window
	 * @type jQuery
	 */
	win: $(window),
	/**
	 * 加载的模块类的实例的缓存对象
	 * @property window
	 * @type {jQuery}
	 */
	modClsCache: {},
	/**
	 * 用于存放模块的类
	 * @property mod
	 * @type {Object}
	 */
	mod: {},
	/**
	 * 用于存放一些工具函数
	 * @property lib
	 * @type {Object}
	 */
	lib: {
		parseUrl: function(url) {
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
	},
	/**
	 * 加载模块的方法
	 * @method loadModules
	 * @param {jQuery} pmod 父模块的jQuery对象如果为空则为body
	 * @param {String} pmodName 父模块的名字，如果为空则会查找body下所有具有module属性的元素
	 * @param {Object} modClsCache 缓存模块的类的实例的对象
	 */
	loadModules: function(pmod, pmodName, modClsCache) {
		var modules;
	    pmod = pmod || sf.body;
	    modules = pmod.find("[module]");
	    modClsCache = modClsCache || sf.modClsCache;
	    //没有找到明确的父模块，直接找到所有具有module属性的元素并加载
	    if(!pmodName) {
		    modules.each(function(i, mod) {
		    	var modName, modCls;
		    	mod = $(mod);
		    	modName = mod.attr("module");
	    		//将模块所对应的类实例化，并缓存实例
	    		modCls = sf.cacheCls(mod, modName, modClsCache);
	    		//将找到的模块作为父模块加载;
	    		sf.loadModules(mod, modName, modClsCache);
		    });
		    return;
	    }

	    //初始化模块的父子关系
	    var pmodClsCache;
	    pmodClsCache = modClsCache[pmodName];
	    modules.each(function(i, cmod) {
	    	var cmodCls, cmodName, cmodClsCache, findedPmod;
	    	cmod = $(cmod);
	    	cmodName = cmod.attr("module");
			findedPmod = cmod.parents("[module]");
			cmodClsCache = modClsCache[cmodName];
			if(!cmodClsCache) {
				cmodCls = sf.cacheCls(cmod, cmodName, modClsCache);
				if(!cmodCls) {
					return;
				}
				cmodClsCache = cmodCls;
			}
			//如果通过子模块找到的具有module属性的第一个元素等于父元素，说明该子元素为父元素的第一代子元素
			if(pmod[0] == findedPmod[0]) {
				cmodClsCache.pmod = pmodClsCache;
				pmodClsCache.cmod[cmodName] = cmodClsCache;
				cmodClsCache.smod = pmodClsCache.cmod;
				if(cmod.find("[module]").length < 1) {
					cmodClsCache.cmod = {};
				}
			}
	    });
	},
	/**
	 * 实例化模块的类并将实例缓存
	 * @method cmodCls
	 * @param {jQuery} mod 模块的jquery对象
	 * @param {String} modName 模块的名字
	 * @param {Object} modClsCache 缓存模块的类的实例的对象
	 */
	cacheCls: function(mod, modName, modClsCache) {
		var modCls, clsName;
		clsName = modName.split("_")[0];
		clsName = clsName[0].toUpperCase() + clsName.substring(1);
		modCls = sf.mod[clsName];
	    if(modCls && !modClsCache[modName]) {
	    	return modClsCache[modName] = new modCls(mod);
	    }
	}
};
window.sf = sf;

$.ajaxSetup({ 
	cache: false,
	headers: {
		"sf-ajax": true
	}
}); 

sf.doc.ajaxComplete(function(e, xhr, ajaxOptions) {
	var msg, d;
	try {
		d = new Function('return ' + xhr.responseText)();
		msg = d && 200 != d.code && d.msg;
		if(msg) {
			switch(d.code.toString()) {
			    case "510":
					location.href = "/security/login";
				break;
				default:
					$.alert(msg);
			}
		}
	}
	catch(e) {
		if(200 == xhr.status) {
			if(/DOCTYPE html/.test(xhr.responseText)) {
				$.alert("您太长时间未操作系统，已自动退出，请重新登录", function() {
					location.href = "/security/login";
				});
			}
		}
	}
});
})();

$(function() {
	var url, params;
	url = sf.lib.parseUrl(location.href);
	params = url.params;
	function getScript(src, list, index) {
		$.getScript(src, function(d, r) {
			index++;
			if(list.length > index) {
				getScript(list[index], list, index);
			}
			else {
				sf.loadModules();
			}
		});
	}
	if("true" != params.sf_debug) {
	    sf.loadModules();
	    /* 当所有模块加载完毕,如有公告需查看gongga*/
	    return;
	}
	else {
		sf.doc.bind("keydown.loadscript", function(e) {
			if(e.altKey && e.shiftKey && e.ctrlKey && 76 == e.keyCode) {
				$.prompt("请输入js文件地址", function(src) {
					if(!src) {
						return;
					}
					src = src.split(",");
					getScript(src[0], src, 0);
				});
			}
		});
	}
});