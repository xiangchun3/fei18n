+function() {
/**
 * 基类的ajax插件
 * @class Module.Ajax
 * @constructor
 */
var Module = window.Module.extend({
	init: function(m) {
		/**
		 * 模块初始化需要请求的数据的url地址
		 * @property {Array} urls
		 */
		/*
		 * 需要请求的数据源，格式如下：
		 * urls: [
		 *	   {
		 *	   	   //请求的数据
		 *		   data: {
		 *			   param: value
		 *		   },
		 *		   //请求的地址
		 *		   url: "/getdata",
		 *		   //请求的类型
		 *		   type: "get"
		 *	   }
		 * ]
		 * 更多参数请参考jquery文档里，对于ajax方法的option说明
		 */					
		this.urls = this.urls || [];
		this._super(m);
	},
	_runPlugin: function() {
		this.initajax();
		this._super();
	},
	/**
	 * 遍历模块的urls对象，根据对象的值发送ajax请求
	 * @method initajax
	 */
	initajax: function() {
		var _this;
		_this = this;
		//获取请求的数据
		$.each(this.urls, function(i, e) {
			_this.ajax(i, e);
		});
	},
	/**
	 * 发送初始化数据的ajax请求
	 * @method ajax
	 * @param {Number} i 请求所在列表的索引
	 * @param {String} e 请求地址
	 */
	ajax: function(i, e) {
		var _this, options;
		_this = this;
		options = $.extend({
			datatype: "json"
		}, e);
		options.success = function(d) {
			_this.databind(i, d);
		};
		options.error = function(xhr, status, err) {
			_this.ajaxerror(i, e, xhr, status, err);
		};
		$.ajax(options);
	},
	//ajax发生错误
	ajaxerror: function(index, e, xhr, status, err) {}
});
window.Module = Module;

}();
