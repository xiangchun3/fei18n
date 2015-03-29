(function() {
/**
 * 基类的LE插件
 * @class Module.le
 * @constructor
 */
var Module = window.Module.extend({
	_runPlugin: function() {
		this.initLE();
		this._super();
	},
	/**
	 * 查找所有LE支持的元素并绑定事件/发送ajax请求并版定数据
	 * @method initLE
	 */
	initLE: function() {
		var _this;
		_this = this;
		this.m.find("[role]").each(function() {
			var ele, role;
			ele = $(this);
			role = ele.attr("role");
			switch(role) {
				case "validateForm":
					initValidateForm.call(_this, ele);
				break;
				case "bindAjaxData":
					initBindAjaxData.call(_this, ele);
				break;
			}
		});
	},
	addValidateRules: function(ele) {
		initValidateForm.call(_this, ele);
	},
	doBindAjaxData: function(ele) {
		initValidateForm.call(_this, ele);
	}
});
window.Module = Module;

function initValidateForm(form) {
	var _this, name, beforeSubmitFnName, successSubmitFnName, rules;
	_this = this;
	name = form.attr("name");
	beforeSubmitFnName = name + "BeforeSubmit";
	successSubmitFnName = name + "SuccessSubmit";
	rules = $.validate[name] || {};
	form.addValidateRules(function(e, data, form) {
		var r, method, url;
		if(_this[beforeSubmitFnName]) {
			r = _this[beforeSubmitFnName](data, form);
			if(false == r) {
				return;
			}
			data = r || data;
		}

		method = form.attr("method") || "get";
		if(method) {
			method = method.toLowerCase();
		}
		url = form.attr("url");
		if(null == url) {
			return;
		}
		$[method](url, data, function(r) {
			if(_this[successSubmitFnName]) {
				_this[successSubmitFnName](r, form);
			}
		})
		.always(function() {
		});
	});
}

function initBindAjaxData(ele) {
	var _this, name, method, url, beforeBindFnName;
	_this = this;
	name = ele.attr("name");
	method = ele.attr("method") || "get";
	url = ele.attr("url");
	beforeBindFnName = name + "BeforeDatabind";
	if(method) {
		method = method.toLowerCase();
	}
	$[method](url, function(data) {
		var r;
		if(_this[beforeBindFnName]) {
			r = _this[beforeBindFnName](data);
			if(false == r) {
				return;
			}
			data = r || data;
		}
		ele.databind(data);
	});
}

})();
