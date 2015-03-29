+function() {
/**
 * 弹窗类
 * @class Dialog
 * @extend window.Module
 * @constructor
 */
var Dialog = Module.extend({
	/**
	 * 弹窗内容模版
	 * @property {String} tpls
	 * @default null
	 */
	tpls: null,
	/**
	 * 弹窗的宽度
	 * @property {Number} width
	 * @default 645
	 */
	width: 645,
	/**
	 * 弹窗的高度
	 * @property {Number} height
	 * @default 400
	 */
	height: "auto",
	/**
	 * 构造方法，设置title，数据和父容器。显示dialog，初始化按钮容器
	 * @method init
	 * @param {String} title 弹窗的标题
	 * @param {Array} data 弹窗初始化的数据
	 * @param {window.Module} pmod 弹窗的父容器
	 */
	init: function(title, data, pmod) {
		this.title = title;
		this.data = data;
		this.pmod = pmod;
		if(pmod && !this.pmod.dialogLock) {
			this.pmod.dialogLock = true;
		}
		else {
			if(pmod) {
				return;
			}
		}
		this.show();
		this._dialog_btn = this.m.find(".dialog_btn:last");
		this._super(this.m);
	},
	/**
	 * 根据getBuildHTML方法发挥的html设置弹窗的内容
	 * 注册弹窗的提交和关闭事件
	 * 如果弹窗包含有tab属性的元素，则把该元素作为页签初始化
	 * @method show
	 */
	show: function() {
		var _this, tabs, dialog, li;
		_this = this;
		dialog = $(this.getBuildHTML()).dialog({
			width: this.width,
			height: this.height,
			dialogClass: "sf_dialog",
			modal: true,
			title: this.title,
			close: function() {
				_this.unload();
				dialog.remove();
			}
		});
		this.dialog = dialog.parents(".sf_dialog");
		this.dialog.appendTo("body");
		this.m = this.dialog;
		this.dialog.on("click", ".dialog_btn:last .white_btn:last", function(e) {
			_this.close(e);
		});
		this.dialog.on("click", ".dialog_btn:last .black_btn:first", function(e) {
			_this.submit(e);
		});
		this.dialog.find(".ui-dialog-content").scroll(function() {
			$("#tip").hide();
		});
		tabsList = this.dialog.find("[tabs]");
		tabsList.each(function(i, tabs) {
			var name, tabs;
			name = "tabs" + i + "_activePanel";
			tabs = $(tabs);
			li = tabs.find("li:first");
			tabs = tabs.tabs({
				beforeActivate: function(e, ui) {
					_this[name] = ui.newPanel;
					_this.tabsBeforeActivate(e, ui);
				},
				create: function(e, ui) {
					_this[name] = ui.panel;
				}
			});
		});
	},
	/**
	 * 返回弹窗内容的html
	 * @method getBuildHTML
	 * @return String
	 */
	getBuildHTML: function() { return this.tpls; },
	/**
	 * 页签被切换前会调用该方法
	 * @method tabsBeforeActivate
	 * @param {EventObject} e 事件模型
	 * @param {Object} ui 新旧页签和容器对象
	 */
	tabsBeforeActivate: function(e, ui) {},
	/**
	 * 显示等待状态
	 * @method startLoading
	 */
	startLoading: function(btn) {
		if(btn) {
			var load, position;
			position = btn.position();
			btn.before('<span class="load"></span>');
			load = btn.prev();
			load.css({
				width: btn.outerWidth(),
				marginRight: -btn.outerWidth(),
				"float": btn.css("float"),
				position: "absolute",
				top: position.top,
				left: position.left - 28,
				display: "inline-block"
			});
		}
		else {
			this._dialog_btn.find(".load").css({display: "inline-block"});
		}
	},
	/**
	 * 隐藏等待状态
	 * @method stopLoading
	 */
	stopLoading: function(btn) {
		if(btn) {
			btn.prev().remove();
		}
		else {
			this._dialog_btn.find(".load").css({display: "none"});
		}
	},
	/**
	 * 关闭弹窗
	 * @method close
	 */
	close: function(e) {
		this.dialog.find(".ui-dialog-titlebar-close").click();
	},
	/**
	 * 弹窗的确认事件，当弹窗的确认按钮按下时会调用该方法
	 * @method submit
	 */
	submit: function(e) {},
	unload: function() {
		this.pmod.dialogLock = false;
		this._super();
	}
});
window.Dialog = Dialog;
}();
