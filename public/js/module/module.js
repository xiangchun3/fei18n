/**
 * @class sf
 * @static
 */
+function() {
/**
 * 模块的基类
 * @class Module
 * @constructor
 */
var Module = Class.extend({
	/**
     * 构造函数
     * @method init
     * @param {jQuery} m 对应模块的jquery对象
     */
	init: function(m) {
		var urls;
		/**
		 * 模块的jQuery对象
		 * @property {jQuery} m
		 */
		this.m = m;
		/**
		 * 模块的父模块
		 * @property {window.Module} pmod
		 * @default null
		 */
		this.pmod = this.pmod || null;
		/**
		 * 模块的子模块
		 * @property {Object} cmod
		 * @default{}
		 */
		this.cmod = this.cmod || {};
		/**
		 * 模块的兄弟模块（包括自己）
		 * @property {Object} smod
		 * @default{}
		 */
		this.smod = this.smod || {};
		this.dialogLock = false;
		this.bindEventElementsList = this.bindEventElementsList || [];
		this._runPlugin();
		this.main();
	},
	_runPlugin: function() {},
	//主要的模块处理
	main: function() {},
	/**
	 * 卸载模块，会清除模块的pmod，cmod和smod属性，并把bindEventElementsList里的元素的时间全部卸载
	 * @method unload
	 */
	unload: function() {
		this.pmod = null;
		this.cmod = null;
		this.smod = null;
		$.each(this.bindEventElementsList, function(i, e) {
			e.unbind();
		});
	}
});
window.Module = Module;

}();
