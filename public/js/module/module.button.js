(function() {
/**
 * 基类的button插件
 * @class Module.Button
 * @constructor
 */
var Module = window.Module.extend({
	_runPlugin: function() {
		this.initButtons();
		this._super();
	},
	/**
	 * 查找所有具有name属性的a标签，button标签或者type属性为button的input标签，并在该类声明单机事件的回调方法。
	 * 方法名的格式为_标签名字（input:button为button）_元素的name_click_event
	 * @method initButtons
	 */
	initButtons: function() {
		var _this, buttons;
		_this = this;
		buttons = {};
		this.m.find(":button[name], button[name], a[name]").each(function(i, e) {
			var name, tagName, eventName;
			name = e.name;
			tagName = e.tagName.toLowerCase();
			if("input" == tagName) {
				switch(e.type) {
				    case "text": tagName = "text"; break;
				    case "button": tagName = "button"; break;
				    case "radio": tagName = "radio"; break;
				    case "checkbox": tagName = "checkbox"; break;
				}
			}
			buttons[name] = $(e);
			eventName = "_" + tagName + "_" + name + "_click" + "_event";
			_this.m.on("click", "[name=" + name + "]", function(e) {
				if(_this[eventName]) {
					_this[eventName](e, this);
				}
			})
		});
		this.buttons = buttons;
	}
});
window.Module = Module;

})();
