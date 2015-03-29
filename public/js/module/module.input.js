+function() {
/**
 * 基类的input插件
 * @class Module.Input
 * @constructor
 */
var Module = window.Module.extend({
	_runPlugin: function() {
		this.initInputs();
		this._super();
	},
	/**
	 * 查找所有具有那么属性的input元素并保存到inputs对象中。
	 * @method initInputs
	 */
	initInputs: function() {
		var _this, inputs;
		_this = this;
		inputs = {};
		this.m.find("input[name]").each(function(i, e) {
			var name, input;
			name = e.name;
			input = $(e);
			if("checkbox" == e.type || "radio" == e.type) {
				if(inputs[name]) {
					inputs[name] = inputs[name].add(input);
				}
				else {
					inputs[name] = input;
				}
			}
			else {
				inputs[name] = input;
			}
		});
		this.inputs = inputs;
	}
});
window.Module = Module;

}();
