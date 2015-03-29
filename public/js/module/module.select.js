(function() {
/**
 * 基类的select插件
 * @class Module.Select
 * @constructor
 */
var Module = window.Module.extend({
	_runPlugin: function() {
		this.initSelectes();
		this._super();
	},
	/**
	 * 查找所有具有name属性的select元素并保存到selectes对象中
	 * @method initSelectes
	 */
	initSelectes: function() {
		var _this, selectes;
		_this = this;
		selectes = {};
		this.m.find("select[name]").each(function(i, e) {
			var name;
			name = e.name;
			selectes[name] = $(e);
		});
		this.selectes = selectes;
	}
});
window.Module = Module;

})();
