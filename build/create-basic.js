/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	//require('../../../common/pkgs/progress/progress');
	var common = __webpack_require__(27);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	var FastClick = __webpack_require__(57);
	__webpack_require__(28);

	var city = __webpack_require__(51);
	var utils = {
	    warn: function(msg){
	        alert(msg);
	    }
	}


	$(function() {
	    common.initNav();

	    var $pageCreateAction = $('#pageCreateAction');

	    var $createActionStep = $pageCreateAction.find('#createActionStep.step-01');

	    var main = {
	        init: function(){
	            this.initEvent();
	            var $city = $('#city');
	            city.init({
	                targetBtn: $city,
	                callback: function(value){
	                    $city.val(value.join(" "))
	                }
	            })
	        },
	        initEvent: function() {
	            this.initCheckForm();
	            this.initFormEvent();
	            this.initDatePicker();
	            this.initFastClick();
	        },
	        initFastClick: function(){
	            FastClick.attach(document.body);
	        },
	        initDatePicker: function() {
	            var $appDate = $(".select-date-time");

	            initDatePicker($appDate);
	            function initDatePicker(obj){
	                if(!obj.length)return;
	                var currYear = (new Date()).getFullYear();
	                var opt={};
	                opt.date = {preset : 'date'};
	                opt.datetime = {preset : 'datetime'};
	                opt.time = {preset : 'time'};
	                opt.default = {
	                    theme: 'android-ics light', //皮肤样式
	                    display: 'bottom', //显示方式
	                    mode: 'scroller', //日期选择模式
	                    dateFormat: 'yyyy-mm-dd',
	                    lang: 'zh',
	                    showNow: true,
	                    nowText: "今天",
	                    startYear: currYear - 10, //开始年份
	                    endYear: currYear + 10,//结束年份,
	                    onSelect: function(e){
	                        var endValue = $appDate.eq(1).val();
	                        var startValue = $appDate.eq(0).val();
	                        if (endValue && startValue>=endValue){
	                            $appDate.eq(1).addClass('Validform_error');
	                            $appDate.eq(1).closest('li').find('.error-data').show();
	                            return false;
	                        } else {
	                            $appDate.eq(1).removeClass('Validform_error');
	                            $appDate.eq(1).closest('li').find('.error-data').hide();
	                        }
	                    }
	                };
	                var optDateTime = $.extend(opt['datetime'], opt['default']);
	                obj.mobiscroll(optDateTime).datetime(optDateTime);
	            }

	        },
	        initFormEvent: function(){

	            $createActionStep.submit(function() {

	                $(this).ajaxSubmit({
	                    beforeSubmit: function(formData, jqForm, options) {
	                        if($('.Validform_error').length){
	                            return false;
	                        }

	                    },
	                    dataType: 'json',
	                    success: function(res) {
	                        var success = res && res.success;
	                        var data = res && res.data;

	                        if (success) {
	                            if (data.url) {
	                                location.href = data.url;
	                            }
	                        } else {
	                            for (var key in data) {
	                                $('#' + key).removeClass('focus').addClass('err');
	                                utils.warn(data[key]);
	                                break;
	                            }
	                        }
	                    },
	                    error: function() {
	                        console.error('擦了，创建活动提交失败~')
	                    }
	                });

	                return false;
	            })
	        },
	        initCheckForm: function() {
	            var $selectWrapper =  $('.select-wrapper');
	            $selectWrapper.on('click', '.select-activity-type', function(){
	                $selectWrapper.find('.select-list-content').toggle();

	            });

	            $selectWrapper.on('click', '.select-list-content span', function(e){
	                $selectWrapper.find('.select-activity-type').val($(e.currentTarget).data('val'));
	                $selectWrapper.find('.select-list-content').toggle();
	            });
	            var $form=$("form#createActionStep").Validform({
	                tiptype:3,
	                label:".label",
	                showAllError:true,
	                datatype:{
	                    "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/,
	                    "image": function(gets,obj,curform,regxp){
	                        var reg1 = /\.jpg|png|git$/;
	                        if (reg1.test(gets)){
	                            return true;
	                        }
	                        return false;
	                    },
	                    'number': function(gets,obj,curform,regxp){
	                        var reg1 = /^\d+$/;
	                        if (reg1.test(gets)){
	                            return true;
	                        }
	                        return false;
	                    }
	                }
	            });

	            //$.Tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
	            $form.tipmsg.w["zh1-6"]="请输入1到6个中文字符！";

	            $form.addRule([
	                {
	                    ele:"#name",
	                    datatype:"*2-20"
	                },
	                {
	                    ele:"#host",
	                    datatype:"*4-20"
	                },
	                {
	                    ele:"#city",
	                    datatype:"*1-50"
	                },

	                {
	                    ele:"#other-local-msg",
	                    datatype:"*1-50"
	                },
	                {
	                    ele:"#desc",
	                    datatype:"*1-50000"
	                },
	                {
	                    ele:".select-date-time",
	                    nullmsg: "请选择日期",
	                    datatype:"*1-50000"
	                },
	                {
	                    ele:"#id_max_attend",
	                    nullmsg: "输入活动人数",
	                    errormsg: "活动人数非法",
	                    datatype:"number"
	                },
	                {
	                    ele:"#action-type",
	                    nullmsg: "请选择类型",
	                    datatype:"number"
	                },
	                {
	                    ele:"#id_reward",
	                    nullmsg: "请输入奖励金额",
	                    datatype:"number"
	                },
	                {
	                    ele:"#poster",
	                    nullmsg: "请选择一张图片",
	                    datatype:"image"
	                }
	            ]);

	        }
	    };

	    main.init();


	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./button.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./button.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/**\n * flexbox grid system\n * @author: songhe.zl@alibaba-inc.com\n * @date: 2015-04-14\n */\n/* !!cmd:lessbuild=false */\n/* http://dev.opera.com/static/dstorey/text/text-overflow.html */\n/* https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html */\n.zui-btn {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  line-height: 25px;\n  height: 27px;\n  font-size: 14px;\n  vertical-align: middle;\n  text-align: center;\n  overflow: visible;\n  cursor: pointer;\n  background: #fff;\n  font-family: Heiti SC, Helvetica Neue, Droid Sans Fallback, Roboto;\n  -webkit-border-radius: 25px;\n  border-radius: 25px;\n  background-clip: padding-box;\n  -webkit-background-clip: padding-box;\n  padding: 0 12px;\n  border: 1px solid #979797;\n  color: #666666;\n}\n.zui-btn.small {\n  min-width: 50px;\n  height: 25px;\n  line-height: 25px;\n  font-size: 13px;\n}\n.zui-btn.zui-btn-disabled {\n  color: #bfbfbf;\n}\n.zui-btn,\n.zui-btn-pic,\n.zui-btn:hover,\n.zui-btn-pic:hover {\n  border: solid 1px #979797;\n  color: #666666;\n  background-color: #ffffff;\n}\n.zui-btn:active,\n.zui-btn-pic:active,\n.zui-btn.pressing,\n.zui-btn-pic.pressing {\n  background-color: #ebebeb;\n  /* border-color: #e5e5e5; */\n  color: #666;\n}\n.zui-btn.zui-btn-disabled,\n.zui-btn-pic.zui-btn-disabled {\n  color: #bfbfbf;\n  background-color: #ffffff;\n}\n.zui-btn-hint,\n.zui-btn-checked,\n.zui-btn-hint:hover,\n.zui-btn-checked:hover {\n  border: solid 1px #7ed321;\n  color: #7ed321;\n  background-color: #ffffff;\n}\n.zui-btn-hint:active,\n.zui-btn-checked:active,\n.zui-btn-hint.pressing,\n.zui-btn-checked.pressing {\n  color: #7ed321;\n  background-color: #fff0e4;\n}\n.zui-btn-hint.zui-btn-disabled,\n.zui-btn-checked.zui-btn-disabled {\n  color: #bfbfbf;\n  background-color: #ffffff;\n  border-color: #e5e5e5;\n}\n.zui-btn-hint .icon,\n.zui-btn-checked .icon {\n  width: 24px;\n}\n.zui-btn-hint > .icon,\n.zui-btn-checked > .icon,\n.zui-btn-hint > span,\n.zui-btn-checked > span {\n  height: 24px;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 24px;\n}\n.zui-btn-checked {\n  position: relative;\n}\n.zui-btn-checked:after {\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  background-size: cover;\n  content: ' ';\n}\n.zui-btn.zui-btn-important,\n.zui-btn.zui-btn-important:hover {\n  color: #fff;\n  border: 1px solid  transparent;\n  background-color: #F56467;\n}\n.zui-btn.zui-btn-important:active,\n.zui-btn.zui-btn-important.pressing,\n.zui-btn.zui-btn-important:hover {\n  background-color: #e16164;\n}\n.zui-btn.zui-btn-important.zui-btn-disabled {\n  color: #ffffff;\n  background-color: #e5e5e5;\n}\n.zui-btn-flex.zui-btn-action,\n.zui-btn-action {\n  color: #fff;\n  background-color: #7ED321;\n  border-color: transparent;\n}\n.zui-btn-flex.zui-btn-action.pressing,\n.zui-btn-action.pressing {\n  background-color: #7ED321;\n}\n.zui-btn-flex.zui-btn-action:active,\n.zui-btn-action:active,\n.zui-btn-flex.zui-btn-action:hover,\n.zui-btn-action:hover {\n  background-color: #77cc21;\n  color: #fff;\n  border-color: transparent;\n}\n.zui-btn-flex,\n.zui-btn-flex:hover {\n  -webkit-border-radius: 0;\n  -webkit-background-clip: padding-box;\n  border-radius: 0;\n  background-clip: padding-box;\n  padding: 0;\n  border: none;\n  width: 100%;\n}\n.zui-btn-flex.zui-btn-disabled {\n  background-color: #a6a6a6;\n  color: #fff;\n}\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n  text-decoration: none;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box; /* 2 */\n  box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}", ""]);

	// exports


/***/ },
/* 27 */
/***/ function(module, exports) {

	
	module.exports = {
	    postData: function(url, data, successCallback, errorCallback) {

	        var csrfToken = $('#csrf_token').val();
	        $.ajax({
	            url: url,
	            type: 'post',
	            data: $.extend(data, {csrfToken: csrfToken}), 
	            success: successCallback,
	            error: errorCallback
	        })
	    },
	    initNav: function(){
	        //var $nav = $('.nav');
	        //if($nav.length){
	        //    $nav.on('touchend', '.active', function(e){
	        //        e.preventDefault();
	        //
	        //        window.history.back();
	        //        return false;
	        //    })
	        //}
	    },
	    
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./create.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./create.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports
	exports.i(__webpack_require__(26), "");

	// module
	exports.push([module.id, "/**\n * flexbox grid system\n * @author: songhe.zl@alibaba-inc.com\n * @date: 2015-04-14\n */\n/* !!cmd:lessbuild=false */\n/* http://dev.opera.com/static/dstorey/text/text-overflow.html */\n/* https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html */\n/*! lofty.css build 15/01/07 14:46:22 */\n/**\n * @module reset.css for lofty mobile\n * @author jianping.shenjp shanshan.hongss\n * @editor Edgar\n * @version v0.2.0\n * @date 150107\n * */\n/**\n * Thanks to:\n * normalize.css, http://necolas.github.io/normalize.css/\n * */\n*,\n*:before,\n*:after {\n  /* 设置元素的盒模型为border-box */\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  /* 使Chrome使用小于12px的字体 */\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n  /* 去除点击元素后的高亮效果 */\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n/*去除元素周围的虚线*/\n*:focus {\n  outline: none;\n}\n/* 清除内外边距 */\nbody,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nform,\nth,\ntd,\nfigure {\n  margin: 0;\n  padding: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n  font-weight: normal;\n}\nem {\n  font-style: normal;\n}\nstrong {\n  font-weight: 700;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%;\n  font-family: inherit;\n}\n/*重置文本格式*/\na {\n  text-decoration: none;\n}\na:hover,\na:active {\n  color: #ff7979;\n}\nq:before,\nq:after {\n  content: \"\";\n}\n/* 重置表格元素 */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n/* 去除默认边框 */\nfieldset,\nimg {\n  border: none;\n}\n/* 重置列表元素 */\nul,\nol {\n  list-style: none;\n}\ntextarea,\ninput[type=\"text\"],\ninput[type=\"submit\"],\ninput[type=\"password\"] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n.zui-clear {\n  clear: both;\n}\n.clearfix:before,\n.zui-clr:before,\n.clearfix:after,\n.zui-clr:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.zui-clr:after {\n  clear: both;\n}\n.clearfix:before,\n.zui-clr:before,\n.clearfix:after,\n.zui-clr:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.zui-clr:after {\n  clear: both;\n}\n/* float */\n.zui-left {\n  float: left;\n}\n.zui-right {\n  float: right;\n}\n/* display */\n.zui-hide {\n  display: none;\n}\n.zui-show {\n  display: block;\n}\n/* position */\n.zui-locate {\n  position: relative;\n}\n.zui-fixed,\n.zui-fixed-bottom {\n  position: fixed!important;\n  left: 0;\n  right: 0;\n  z-index: 99;\n  width: 100%;\n}\n.zui-fixed {\n  top: 0;\n}\n.zui-fixed-bottom {\n  bottom: 0;\n}\na {\n  color: #666;\n}\n.zui-flex {\n  display: -webkit-box !important;\n  display: -webkit-flex !important;\n  display: flex !important;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.zui-flex,\n.zui-flex *,\n.zui-flex *:after,\n.zui-flex *:before {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.zui-flex.vertical {\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n.zui-flex.vertical.reverse {\n  -webkit-box-direction: reverse;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n}\n.zui-flex.vertical .zui-cell {\n  width: auto;\n}\n.zui-flex.vertical > .zui-cell > .zui-flex-inner {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.zui-flex.horizental {\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.zui-flex.reverse {\n  -webkit-box-direction: reverse;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n.zui-flex.justify-start {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n}\n.zui-flex.justify-end {\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  justify-content: flex-end;\n}\n.zui-flex.justify-center {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n}\n.zui-flex.justify-between {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n}\n.zui-flex.justify-around {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n}\n.zui-flex.align-start {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n}\n.zui-flex.align-end {\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n  align-items: flex-end;\n}\n.zui-flex.align-center {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n}\n.zui-flex.align-stretch {\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n}\n.zui-flex.align-stretch .zui-cell {\n  height: auto !important;\n}\n.zui-flex.center {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n}\n.zui-flex > .zui-cell {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  flex: 1;\n  width: 0;\n  -webkit-flex-basis: 0;\n  flex-basis: 0;\n  max-width: 100%;\n  display: block;\n  padding: 0 !important;\n  position: relative;\n}\n.zui-flex > .zui-cell.zui-flex-fixed {\n  -webkit-box-flex: none !important;\n  -webkit-flex: none !important;\n  flex: none !important;\n  width: auto;\n}\n.zui-flex > .zui-cell.align-start {\n  -webkit-align-self: flex-start;\n  align-self: flex-start;\n}\n.zui-flex > .zui-cell.align-end {\n  -webkit-align-self: flex-end;\n  align-self: flex-end;\n}\n.zui-flex > .zui-cell.align-center {\n  -webkit-align-self: center;\n  align-self: center;\n}\n.zui-flex > .zui-cell.align-stretch {\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  height: auto !important;\n}\n.zui-flex .image-box {\n  height: 0;\n  padding-bottom: 100%;\n  position: relative;\n}\n.zui-flex .image-box > img {\n  width: 100%;\n  height: 100%;\n  display: block;\n  position: absolute;\n}\n.zui-flex > .zui-cell-12 {\n  -webkit-flex-basis: 100%;\n  flex-basis: 100%;\n  max-width: 100%;\n  width: auto !important;\n}\n.zui-flex > .order-12 {\n  -webkit-box-ordinal-group: 12;\n  -webkit-order: 12;\n  order: 12;\n}\n.zui-flex > .zui-cell-11 {\n  -webkit-flex-basis: 91.66666666666666%;\n  flex-basis: 91.66666666666666%;\n  max-width: 91.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-11 {\n  -webkit-box-ordinal-group: 11;\n  -webkit-order: 11;\n  order: 11;\n}\n.zui-flex > .zui-cell-10 {\n  -webkit-flex-basis: 83.33333333333334%;\n  flex-basis: 83.33333333333334%;\n  max-width: 83.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-10 {\n  -webkit-box-ordinal-group: 10;\n  -webkit-order: 10;\n  order: 10;\n}\n.zui-flex > .zui-cell-9 {\n  -webkit-flex-basis: 75%;\n  flex-basis: 75%;\n  max-width: 75%;\n  width: auto !important;\n}\n.zui-flex > .order-9 {\n  -webkit-box-ordinal-group: 9;\n  -webkit-order: 9;\n  order: 9;\n}\n.zui-flex > .zui-cell-8 {\n  -webkit-flex-basis: 66.66666666666666%;\n  flex-basis: 66.66666666666666%;\n  max-width: 66.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-8 {\n  -webkit-box-ordinal-group: 8;\n  -webkit-order: 8;\n  order: 8;\n}\n.zui-flex > .zui-cell-7 {\n  -webkit-flex-basis: 58.333333333333336%;\n  flex-basis: 58.333333333333336%;\n  max-width: 58.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-7 {\n  -webkit-box-ordinal-group: 7;\n  -webkit-order: 7;\n  order: 7;\n}\n.zui-flex > .zui-cell-6 {\n  -webkit-flex-basis: 50%;\n  flex-basis: 50%;\n  max-width: 50%;\n  width: auto !important;\n}\n.zui-flex > .order-6 {\n  -webkit-box-ordinal-group: 6;\n  -webkit-order: 6;\n  order: 6;\n}\n.zui-flex > .zui-cell-5 {\n  -webkit-flex-basis: 41.66666666666667%;\n  flex-basis: 41.66666666666667%;\n  max-width: 41.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-5 {\n  -webkit-box-ordinal-group: 5;\n  -webkit-order: 5;\n  order: 5;\n}\n.zui-flex > .zui-cell-4 {\n  -webkit-flex-basis: 33.33333333333333%;\n  flex-basis: 33.33333333333333%;\n  max-width: 33.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-4 {\n  -webkit-box-ordinal-group: 4;\n  -webkit-order: 4;\n  order: 4;\n}\n.zui-flex > .zui-cell-3 {\n  -webkit-flex-basis: 25%;\n  flex-basis: 25%;\n  max-width: 25%;\n  width: auto !important;\n}\n.zui-flex > .order-3 {\n  -webkit-box-ordinal-group: 3;\n  -webkit-order: 3;\n  order: 3;\n}\n.zui-flex > .zui-cell-2 {\n  -webkit-flex-basis: 16.666666666666664%;\n  flex-basis: 16.666666666666664%;\n  max-width: 16.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-2 {\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 2;\n  order: 2;\n}\n.zui-flex > .zui-cell-1 {\n  -webkit-flex-basis: 8.333333333333332%;\n  flex-basis: 8.333333333333332%;\n  max-width: 8.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-1 {\n  -webkit-box-ordinal-group: 1;\n  -webkit-order: 1;\n  order: 1;\n}\ninput,\ntextarea {\n  -webkit-border-radius: 0;\n  -webkit-background-clip: padding-box;\n  border-radius: 0;\n  background-clip: padding-box;\n}\nbody {\n  font-size: 12px;\n}\n.text-overflow,\n.activity-list-item .tt,\n.activity-list-item .address,\n.activity-list-item .zui-flex-fixed {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zui-align-right {\n  text-align: right;\n}\n.zui-align-right > div {\n  display: inline-block;\n}\n.zui-align-center {\n  text-align: center;\n}\n.zui-link {\n  color: #4A90E2;\n  font-size: 12px;\n  text-decoration: underline;\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n.dialog {\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -100px;\n  margin-top: -100px;\n  background-color: #fff;\n  border: 1px solid #eee;\n  padding: 10px;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n}\n.dialog .tip-icon {\n  width: 50px;\n  height: 50px;\n  display: inline-block;\n  background-color: #7ED321;\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n  overflow: hidden;\n}\n.dialog .icon-success {\n  background-position: 0 -50px;\n}\n.dialog .dialog-bottom {\n  padding: 10px 0;\n}\n.dialog .text {\n  color: #727272;\n  font-size: 12px;\n  padding: 10px 0;\n}\n.header {\n  height: 50px;\n  padding: 10px 0;\n}\n.header .btn-search {\n  padding: 0;\n}\n.header .zui-btn {\n  margin-right: 8px;\n  padding: 0;\n}\n.header .logo {\n  padding-left: 10px;\n  font-size: 24px;\n  line-height: 24px;\n}\n.header .logo-warp .item {\n  display: inline-block;\n  vertical-align: bottom;\n}\n.header .city {\n  font-size: 12px;\n  color: #727272;\n  width: 7em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  position: relative;\n}\n.header .icon-arrow-up {\n  height: 15px;\n  background-position: -50px -5px;\n  -webkit-transition: 200ms all ease;\n  -moz-transition: 200ms all ease;\n  transition: 200ms all ease;\n}\n.header .active .icon-arrow-up {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.header .nav {\n  font-size: 0;\n}\n.header .nav-item {\n  -webkit-border-radius: 25px;\n  -webkit-background-clip: padding-box;\n  border-radius: 25px;\n  background-clip: padding-box;\n  width: 26px;\n  height: 26px;\n  margin-right: 12px;\n  border: 1px solid #BEBEBE;\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n}\n.header .nav-item.user {\n  border: 0;\n}\n.header .active.nav-item:after,\n.header .active.nav-item:before {\n  content: \"\";\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  top: -1px;\n  left: -1px;\n  -webkit-border-radius: 25px;\n  -webkit-background-clip: padding-box;\n  border-radius: 25px;\n  background-clip: padding-box;\n}\n.header .active.nav-item {\n  border-color: #eaeaea;\n}\n.header .active.nav-item .zui-icon {\n  background: none;\n}\n.header .active.nav-item:after {\n  z-index: 9;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.header .active.nav-item:before {\n  z-index: 10;\n  background-image: url(\"/assets/img/icon500x500.png\");\n  -webkit-background-size: 250px 250px;\n  background-size: 250px 250px;\n  background-position: 0 -25px;\n}\n.header .nav-item img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n  overflow: hidden;\n}\n.header .nav-item-msg {\n  position: relative;\n}\n.header .nav-item-msg .number {\n  position: absolute;\n  right: -12px;\n  text-align: center;\n  line-height: 20px;\n  font-size: 12px;\n  z-index: 11;\n  top: -8px;\n  height: 20px;\n  min-width: 20px;\n  padding: 0 2px;\n  -webkit-border-radius: 20px;\n  -webkit-background-clip: padding-box;\n  border-radius: 20px;\n  background-clip: padding-box;\n  overflow: hidden;\n  background-color: #F56467;\n  color: #fff;\n}\n.header .btn-login {\n  width: 40px;\n}\n.header .btn-login span {\n  display: block;\n  line-height: 25px;\n  text-align: center;\n  color: #727272;\n  font-size: 12px;\n}\n[class~=zui-icon],\n.zui-icon {\n  width: 25px;\n  height: 25px;\n  display: inline-block;\n  font-size: 0;\n  line-height: 0;\n  vertical-align: middle;\n  background-image: url(\"/assets/img/icon500x500.png\");\n  -webkit-background-size: 250px 250px;\n  background-size: 250px 250px;\n}\n[class~=zui-icon].icon-big,\n.zui-icon.icon-big {\n  width: 50px;\n  height: 50px;\n  -webkit-background-size: 250px 250px;\n  background-size: 250px 250px;\n}\n.icon-plus {\n  background-position: -25px -1px;\n}\n.icon-email {\n  background-position: -201px 0px;\n}\n.icon-arrow-up {\n  background-position: -50px 0;\n}\n.icon-address {\n  background-position: -75px -2px;\n}\n.icon-date {\n  background-position: -150px -2px;\n}\n.icon-distance {\n  background-position: -125px -2px;\n}\n.icon-number {\n  background-position: -100px -2px;\n}\n.icon-medal {\n  background-position: -75px -225px;\n}\n.icon-price {\n  background-position: -200px 0;\n}\n.icon-share {\n  background-position: 0 -225px;\n}\n.icon-delete {\n  background-position: -225px 3px;\n}\n.icon-copy {\n  background-position: -75px -23px;\n}\n.icon-edit {\n  background-position: -100px -25px;\n}\n.icon-success {\n  -webkit-background-size: 125px 125px;\n  background-size: 125px 125px;\n  background-position: 0 -25px;\n}\n.icon-sys {\n  background-position: 0 -100px;\n}\n.icon-notice {\n  background-position: -25px -100px;\n}\n.icon-star {\n  background-position: -50px -100px;\n}\n.icon-qrcode {\n  background-position: -50px -25px;\n}\n.icon-user {\n  background-position: -75px -100px;\n}\n.icon-pwd {\n  background-position: -100px -100px;\n}\n.icon-close {\n  background-position: 0px -25px;\n}\n.icon-verifycode {\n  background-position: -150px -100px;\n}\n.icon-phone {\n  background-position: -175px -100px;\n}\n.icon-lock {\n  background-position: -150px -100px;\n}\n.icon-forward {\n  background-position: 0px -175px;\n}\n.icon-like {\n  background-position: -25px -200px;\n}\n.active .icon-arrow-up {\n  -webkit-transform: rotateZ(180deg);\n  transform: rotateZ(180deg);\n}\n.top-tab {\n  overflow-x: scroll;\n  width: 100%;\n  padding-bottom: 10px;\n}\n.top-tab .tab {\n  width: 460px;\n  height: 36px;\n  font-size: 17px;\n}\n.top-tab .tab-item {\n  float: left;\n  margin: 0 10px;\n  height: 35px;\n  line-height: 35px;\n}\n.top-tab .tab-item.active {\n  border-bottom: 1px solid #333;\n}\n.activity-lists {\n  padding: 5px;\n  background-color: #eaeaea;\n}\n.activity-list-item {\n  padding: 10px 5px;\n  background-color: #fff;\n  display: block;\n}\n.activity-list-item .thumbnail {\n  height: 68px;\n  width: 92px;\n}\n.activity-list-item .tt {\n  height: 24px;\n  font-size: 14px;\n  display: block;\n}\n.activity-list-item .list-item-desc {\n  padding: 0px 5px 0 5px;\n}\n.activity-list-item .list-item-desc .zui-cell {\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n}\n.activity-list-item .list-item-desc > div {\n  width: 100%;\n  height: 100%;\n}\n.activity-list-item .zui-flex-fixed {\n  width: 65px;\n}\n.activity-list-item .list-item-desc .zui-icon {\n  -webkit-transform: scale(0.7, 0.7);\n  transform: scale(0.7, 0.7);\n}\n.activity-list-item .list-item {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eaeaea;\n  margin-bottom: 5px;\n}\n.activity-list-item .btn-tip-text {\n  color: #BEBEBE;\n  font-size: 12px;\n  margin-right: -5em;\n}\n.activity-list-item {\n  margin-bottom: 5px;\n}\n.activity-list-item .m-tag {\n  padding-top: 5px;\n  height: 25px;\n}\n.activity-list-item .m-tag .m-tag-inner {\n  float: right;\n}\n.activity-list-item .m-tag .hot {\n  display: inline-block;\n  background-color: #ff7979;\n  color: #fff;\n  padding: 2px 5px;\n  font-size: 12px;\n  margin-right: 10px;\n}\n.activity-list-item .m-tag .price {\n  display: inline-block;\n  background-color: #fff;\n  color: #ff7979;\n}\n.activity-list-item .activity-operation {\n  padding: 10px 0 0;\n}\n.activity-list-item .operation-btn {\n  margin: 0 10px;\n}\n.activity-status .zui-btn {\n  min-width: 100px;\n}\n.mine {\n  font-size: 12px;\n  color: #727272;\n}\n.mine .mine-header {\n  font-size: 12px;\n  padding: 0 5px;\n  margin-bottom: 5px;\n}\n.mine .mine-header span {\n  margin-right: 5px;\n}\n.mine .th {\n  height: 30px;\n  line-height: 30px;\n}\n.mine .img {\n  width: 35px;\n  height: 35px;\n  -webkit-border-radius: 35px;\n  -webkit-background-clip: padding-box;\n  border-radius: 35px;\n  background-clip: padding-box;\n  display: inline-block;\n  overflow: hidden;\n  vertical-align: middle;\n}\n.mine .img img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.mine .center {\n  width: 100px;\n  display: block;\n  text-align: center;\n}\n.mine .zui-flex-fixed {\n  width: 100px;\n  padding: 0 10px;\n}\n.mine-content {\n  padding-top: 10px;\n  border-top: 1px solid #BEBEBE;\n}\n.mine-content .th {\n  font-weight: bold;\n}\n.mine-content .tr {\n  margin-bottom: 10px;\n}\n.mine-content .tr .name {\n  display: block;\n  min-width: 4em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 5em;\n  padding-left: 5px;\n}\n.mine-content .tr .zui-cell {\n  border-bottom: 1px solid #BEBEBE;\n}\n.mine-content .tr .zui-cell:first-child {\n  border-bottom-color: transparent;\n}\n.mine-content .tr-item {\n  height: 35px;\n  line-height: 35px;\n  padding: 0 10px;\n}\n.mine-content .look-detail {\n  margin-left: 5px;\n}\n.mine-content .zui-btn {\n  padding: 0 10px;\n}\n.mine-content .zui-icon {\n  width: 20px;\n}\n.mine-content .icon-success {\n  background-position: -4px -25px;\n}\n.mine-content .activity-msg-detail {\n  padding: 0 0 5px 0;\n  margin-left: 60px;\n  position: relative;\n  top: -1px;\n  background-color: #fff;\n  border-bottom: 1px solid #BEBEBE;\n}\n.mine-content .activity-msg-detail p {\n  color: #B8B8B8;\n  padding: 5px;\n}\n.mine-content .activity-msg-detail li {\n  margin: 5px 0;\n}\n.mine-content .activity-msg-detail .q-tt {\n  color: #4b4b4b;\n}\n.mine-content .activity-msg-detail .q-an {\n  color: #727272;\n}\n.zui-checkbox,\n.zui-radio {\n  display: inline-block;\n  position: relative;\n  line-height: 24px;\n  width: 20px;\n  height: 20px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 2px 0 0 2px;\n  vertical-align: middle;\n}\n.zui-icon-radio {\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n}\n.zui-icon-checkbox {\n  -webkit-border-radius: 2px;\n  -webkit-background-clip: padding-box;\n  border-radius: 2px;\n  background-clip: padding-box;\n}\n.zui-icon-checkbox,\n.zui-icon-radio {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #d9d9d9;\n  background: #FFF;\n  -webkit-transform: rotate(0deg);\n  transform: rotate(0deg);\n}\ninput[type=checkbox],\ninput[type=radio] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  border: 0 none;\n  -webkit-appearance: none;\n}\ninput[type=checkbox]:checked + .zui-icon-checkbox,\ninput[type=radio]:checked + .zui-icon-checkbox {\n  border-width: 0;\n  background-color: #7b7b7b;\n}\ninput[type=checkbox]:checked + .zui-icon-checkbox:after,\ninput[type=radio]:checked + .zui-icon-checkbox:after {\n  display: block;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoAQMAAAC2MCouAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAFRJREFUCNeVjbERwCAIAJOzSJkRGMXRyGiOwgiWFjkV3sZWim/4h+to0hd84AszVLY9cP+IDbEiWlCCJsWN6pEbij0oSZU0Q2mk25lknF8sPIRnMwFAahqkr8KaZQAAAABJRU5ErkJggg==');\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  -webkit-background-size: 100% 100%;\n  background-size: 100% 100%;\n  border: none!important;\n}\ninput[type=checkbox]:disabled + .zui-icon-checkbox,\ninput[type=radio]:disabled + .zui-icon-checkbox {\n  background-color: #f0f0f0;\n  border: 1px solid #e3e3e3;\n}\ninput[type=checkbox]:disabled:checked + .zui-icon-checkbox:after,\ninput[type=radio]:disabled:checked + .zui-icon-checkbox:after {\n  background-color: #f0f0f0;\n  border: 1px solid #e3e3e3;\n}\ninput[type=checkbox]:checked + .zui-icon-radio,\ninput[type=radio]:checked + .zui-icon-radio {\n  background-color: #fff;\n  border-color: #7b7b7b;\n}\ninput[type=checkbox]:checked + .zui-icon-radio:after,\ninput[type=radio]:checked + .zui-icon-radio:after {\n  display: block;\n  width: 12px;\n  height: 12px;\n  background-color: #7b7b7b;\n  content: \"\";\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n  left: 50%;\n  top: 50%;\n  margin-left: -6px;\n  margin-top: -6px;\n  position: absolute;\n}\ninput[type=checkbox]:disabled + .zui-icon-radio,\ninput[type=radio]:disabled + .zui-icon-radio {\n  background-color: #f0f0f0;\n  border: 1px solid #e3e3e3;\n}\ninput[type=checkbox]:disabled:checked + .zui-icon-radio:after,\ninput[type=radio]:disabled:checked + .zui-icon-radio:after {\n  background-color: #fff;\n  border: 1px solid #e3e3e3;\n}\n.zui-input-text {\n  border: 1px solid #BEBEBE;\n  display: block;\n  padding: 3px 10px;\n  font-size: 12px;\n  width: 100%;\n  height: 40px;\n  line-height: 32px;\n}\n.zui-input-text:focus {\n  border: 1px solid #7ED321;\n}\n.zui-input-select {\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 40px;\n  width: 100%;\n  padding: 2px 5px;\n  border: solid 1px #BEBEBE;\n  color: #666;\n  position: relative;\n  -webkit-border-radius: 0;\n  -webkit-background-clip: padding-box;\n  border-radius: 0;\n  background-clip: padding-box;\n  background: url(\"http://ourjs.github.io/static/2015/arrow.png\") no-repeat right center transparent;\n}\n.zui-input-select:after {\n  width: 25px;\n  height: 25px;\n  content: \"\";\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.zui-input-textarea {\n  border: solid 1px #BEBEBE;\n  width: 100%;\n  padding: 5px 5px;\n}\n#pageCreateAction .end-time {\n  margin-left: 10px;\n}\n#pageCreateAction .select-date-time {\n  padding-left: 10px;\n}\n#pageCreateAction .select-wrapper {\n  position: relative;\n}\n#pageCreateAction .select-list-content {\n  display: none;\n  border: 1px solid #bebebe;\n  position: absolute;\n  left: 0;\n  width: 100%;\n  top: 39px;\n  background: #fff;\n}\n#pageCreateAction .select-list-content span {\n  display: block;\n  height: 40px;\n  padding-left: 15px;\n  line-height: 40px;\n  font-size: 12px;\n  color: #666;\n  border-bottom: 1px solid #bebebe;\n}\n#pageCreateAction .select-list-content span:last-child {\n  border-bottom: 0;\n}\n#pageCreateAction .main {\n  padding: 0 10px;\n}\n#pageCreateAction .banner {\n  position: relative;\n}\n#pageCreateAction .banner .line {\n  width: 100%;\n  height: 1px;\n  font-size: 0;\n  line-height: 0;\n  border-bottom: 1px solid #fff;\n  margin-top: 12px;\n}\n#pageCreateAction .process {\n  width: 220px;\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  top: 30px;\n}\n#pageCreateAction .process .step {\n  width: 26px;\n  height: 26px;\n  -webkit-border-radius: 26px;\n  -webkit-background-clip: padding-box;\n  border-radius: 26px;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  color: #fff;\n  font-size: 14px;\n  text-align: center;\n  line-height: 24px;\n}\n#pageCreateAction .banner img {\n  width: 100%;\n  display: block;\n}\n#pageCreateAction.page-process-01 .process .step-01,\n#pageCreateAction.page-process-02 .process .step-01,\n#pageCreateAction.page-process-02 .process .step-02,\n#pageCreateAction.page-process-03 .process .step {\n  background-color: #fff;\n  color: #000;\n  border-color: rgba(255, 255, 255, 0);\n}\n#pageCreateAction .active-name {\n  height: 25px;\n  line-height: 25px;\n  font-size: 14px;\n  color: #4B4B4B;\n}\n#pageCreateAction .main li {\n  margin: 10px 0;\n}\n#pageCreateAction .zui-align-right {\n  padding-top: 5px;\n}\n.page-process-02 .content {\n  text-align: center;\n  height: 200px;\n  padding-top: 50px;\n  color: #B8B8B8;\n  border-bottom: 1px solid #BEBEBE;\n}\n.title {\n  font-size: 25px;\n  line-height: 35px;\n  position: relative;\n  padding: 5px 0;\n}\n.detail {\n  font-size: 12px;\n}\n.detail .content {\n  color: #727272;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #ccc;\n}\n.detail .m-tag {\n  position: absolute;\n  right: 0;\n  top: 2px;\n  font-size: 12px;\n  width: 100px;\n}\n.detail .m-tag .hot {\n  display: inline-block;\n  background-color: #ff7979;\n  color: #fff;\n  padding: 2px 5px;\n  line-height: 20px;\n}\n.detail .m-tag .price {\n  display: inline-block;\n  background-color: #fff;\n  color: #ff7979;\n}\n.detail .title-desc {\n  height: 25px;\n  line-height: 25px;\n  color: #B8B8B8;\n  margin-bottom: 5px;\n}\n.detail .concact-msg {\n  padding: 5px 0;\n}\n.detail .concact-msg > div {\n  margin: 5px 0;\n}\n.detail .img {\n  width: 100%;\n}\n.bottom-wrapper .zui-btn {\n  width: 70px;\n}\n.zui-align-right {\n  padding: 10px 0;\n}\n", ""]);

	// exports


/***/ },
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ function(module, exports) {

	/*!
	 * jQuery Form Plugin
	 * version: 3.51.0-2014.06.20
	 * Requires jQuery v1.5 or later
	 * Copyright (c) 2014 M. Alsup
	 * Examples and documentation at: http://malsup.com/jquery/form/
	 * Project repository: https://github.com/malsup/form
	 * Dual licensed under the MIT and GPL licenses.
	 * https://github.com/malsup/form#copyright-and-license
	 */
	/*global ActiveXObject */

	// AMD support
	(function (factory) {
	    "use strict";
	    factory( (typeof(jQuery) != 'undefined') ? window.jQuery : window.Zepto );

	}(function($) {
	"use strict";

	/*
	    Usage Note:
	    -----------
	    Do not use both ajaxSubmit and ajaxForm on the same form.  These
	    functions are mutually exclusive.  Use ajaxSubmit if you want
	    to bind your own submit handler to the form.  For example,

	    $(document).ready(function() {
	        $('#myForm').on('submit', function(e) {
	            e.preventDefault(); // <-- important
	            $(this).ajaxSubmit({
	                target: '#output'
	            });
	        });
	    });

	    Use ajaxForm when you want the plugin to manage all the event binding
	    for you.  For example,

	    $(document).ready(function() {
	        $('#myForm').ajaxForm({
	            target: '#output'
	        });
	    });

	    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
	    form does not have to exist when you invoke ajaxForm:

	    $('#myForm').ajaxForm({
	        delegation: true,
	        target: '#output'
	    });

	    When using ajaxForm, the ajaxSubmit function will be invoked for you
	    at the appropriate time.
	*/

	/**
	 * Feature detection
	 */
	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;

	var hasProp = !!$.fn.prop;

	// attr2 uses prop when it can but checks the return type for
	// an expected string.  this accounts for the case where a form 
	// contains inputs with names like "action" or "method"; in those
	// cases "prop" returns the element
	$.fn.attr2 = function() {
	    if ( ! hasProp ) {
	        return this.attr.apply(this, arguments);
	    }
	    var val = this.prop.apply(this, arguments);
	    if ( ( val && val.jquery ) || typeof val === 'string' ) {
	        return val;
	    }
	    return this.attr.apply(this, arguments);
	};

	/**
	 * ajaxSubmit() provides a mechanism for immediately submitting
	 * an HTML form using AJAX.
	 */
	$.fn.ajaxSubmit = function(options) {
	    /*jshint scripturl:true */

	    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	    if (!this.length) {
	        log('ajaxSubmit: skipping submit process - no element selected');
	        return this;
	    }

	    var method, action, url, $form = this;

	    if (typeof options == 'function') {
	        options = { success: options };
	    }
	    else if ( options === undefined ) {
	        options = {};
	    }

	    method = options.type || this.attr2('method');
	    action = options.url  || this.attr2('action');

	    url = (typeof action === 'string') ? $.trim(action) : '';
	    url = url || window.location.href || '';
	    if (url) {
	        // clean url (don't include hash vaue)
	        url = (url.match(/^([^#]+)/)||[])[1];
	    }

	    options = $.extend(true, {
	        url:  url,
	        success: $.ajaxSettings.success,
	        type: method || $.ajaxSettings.type,
	        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	    }, options);

	    // hook for manipulating the form data before it is extracted;
	    // convenient for use with rich editors like tinyMCE or FCKEditor
	    var veto = {};
	    this.trigger('form-pre-serialize', [this, options, veto]);
	    if (veto.veto) {
	        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
	        return this;
	    }

	    // provide opportunity to alter form data before it is serialized
	    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
	        log('ajaxSubmit: submit aborted via beforeSerialize callback');
	        return this;
	    }

	    var traditional = options.traditional;
	    if ( traditional === undefined ) {
	        traditional = $.ajaxSettings.traditional;
	    }

	    var elements = [];
	    var qx, a = this.formToArray(options.semantic, elements);
	    if (options.data) {
	        options.extraData = options.data;
	        qx = $.param(options.data, traditional);
	    }

	    // give pre-submit callback an opportunity to abort the submit
	    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
	        log('ajaxSubmit: submit aborted via beforeSubmit callback');
	        return this;
	    }

	    // fire vetoable 'validate' event
	    this.trigger('form-submit-validate', [a, this, options, veto]);
	    if (veto.veto) {
	        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
	        return this;
	    }

	    var q = $.param(a, traditional);
	    if (qx) {
	        q = ( q ? (q + '&' + qx) : qx );
	    }
	    if (options.type.toUpperCase() == 'GET') {
	        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
	        options.data = null;  // data is null for 'get'
	    }
	    else {
	        options.data = q; // data is the query string for 'post'
	    }

	    var callbacks = [];
	    if (options.resetForm) {
	        callbacks.push(function() { $form.resetForm(); });
	    }
	    if (options.clearForm) {
	        callbacks.push(function() { $form.clearForm(options.includeHidden); });
	    }

	    // perform a load on the target only if dataType is not provided
	    if (!options.dataType && options.target) {
	        var oldSuccess = options.success || function(){};
	        callbacks.push(function(data) {
	            var fn = options.replaceTarget ? 'replaceWith' : 'html';
	            $(options.target)[fn](data).each(oldSuccess, arguments);
	        });
	    }
	    else if (options.success) {
	        callbacks.push(options.success);
	    }

	    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
	        var context = options.context || this ;    // jQuery 1.4+ supports scope context
	        for (var i=0, max=callbacks.length; i < max; i++) {
	            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
	        }
	    };

	    if (options.error) {
	        var oldError = options.error;
	        options.error = function(xhr, status, error) {
	            var context = options.context || this;
	            oldError.apply(context, [xhr, status, error, $form]);
	        };
	    }

	     if (options.complete) {
	        var oldComplete = options.complete;
	        options.complete = function(xhr, status) {
	            var context = options.context || this;
	            oldComplete.apply(context, [xhr, status, $form]);
	        };
	    }

	    // are there files to upload?

	    // [value] (issue #113), also see comment:
	    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
	    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

	    var hasFileInputs = fileInputs.length > 0;
	    var mp = 'multipart/form-data';
	    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	    var fileAPI = feature.fileapi && feature.formdata;
	    log("fileAPI :" + fileAPI);
	    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

	    var jqxhr;

	    // options.iframe allows user to force iframe mode
	    // 06-NOV-09: now defaulting to iframe mode if file input is detected
	    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
	        // hack to fix Safari hang (thanks to Tim Molendijk for this)
	        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	        if (options.closeKeepAlive) {
	            $.get(options.closeKeepAlive, function() {
	                jqxhr = fileUploadIframe(a);
	            });
	        }
	        else {
	            jqxhr = fileUploadIframe(a);
	        }
	    }
	    else if ((hasFileInputs || multipart) && fileAPI) {
	        jqxhr = fileUploadXhr(a);
	    }
	    else {
	        jqxhr = $.ajax(options);
	    }

	    $form.removeData('jqxhr').data('jqxhr', jqxhr);

	    // clear element array
	    for (var k=0; k < elements.length; k++) {
	        elements[k] = null;
	    }

	    // fire 'notify' event
	    this.trigger('form-submit-notify', [this, options]);
	    return this;

	    // utility fn for deep serialization
	    function deepSerialize(extraData){
	        var serialized = $.param(extraData, options.traditional).split('&');
	        var len = serialized.length;
	        var result = [];
	        var i, part;
	        for (i=0; i < len; i++) {
	            // #252; undo param space replacement
	            serialized[i] = serialized[i].replace(/\+/g,' ');
	            part = serialized[i].split('=');
	            // #278; use array instead of object storage, favoring array serializations
	            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
	        }
	        return result;
	    }

	     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
	    function fileUploadXhr(a) {
	        var formdata = new FormData();

	        for (var i=0; i < a.length; i++) {
	            formdata.append(a[i].name, a[i].value);
	        }

	        if (options.extraData) {
	            var serializedData = deepSerialize(options.extraData);
	            for (i=0; i < serializedData.length; i++) {
	                if (serializedData[i]) {
	                    formdata.append(serializedData[i][0], serializedData[i][1]);
	                }
	            }
	        }

	        options.data = null;

	        var s = $.extend(true, {}, $.ajaxSettings, options, {
	            contentType: false,
	            processData: false,
	            cache: false,
	            type: method || 'POST'
	        });

	        if (options.uploadProgress) {
	            // workaround because jqXHR does not expose upload property
	            s.xhr = function() {
	                var xhr = $.ajaxSettings.xhr();
	                if (xhr.upload) {
	                    xhr.upload.addEventListener('progress', function(event) {
	                        var percent = 0;
	                        var position = event.loaded || event.position; /*event.position is deprecated*/
	                        var total = event.total;
	                        if (event.lengthComputable) {
	                            percent = Math.ceil(position / total * 100);
	                        }
	                        options.uploadProgress(event, position, total, percent);
	                    }, false);
	                }
	                return xhr;
	            };
	        }

	        s.data = null;
	        var beforeSend = s.beforeSend;
	        s.beforeSend = function(xhr, o) {
	            //Send FormData() provided by user
	            if (options.formData) {
	                o.data = options.formData;
	            }
	            else {
	                o.data = formdata;
	            }
	            if(beforeSend) {
	                beforeSend.call(this, xhr, o);
	            }
	        };
	        return $.ajax(s);
	    }

	    // private function for handling file uploads (hat tip to YAHOO!)
	    function fileUploadIframe(a) {
	        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
	        var deferred = $.Deferred();

	        // #341
	        deferred.abort = function(status) {
	            xhr.abort(status);
	        };

	        if (a) {
	            // ensure that every serialized input is still enabled
	            for (i=0; i < elements.length; i++) {
	                el = $(elements[i]);
	                if ( hasProp ) {
	                    el.prop('disabled', false);
	                }
	                else {
	                    el.removeAttr('disabled');
	                }
	            }
	        }

	        s = $.extend(true, {}, $.ajaxSettings, options);
	        s.context = s.context || s;
	        id = 'jqFormIO' + (new Date().getTime());
	        if (s.iframeTarget) {
	            $io = $(s.iframeTarget);
	            n = $io.attr2('name');
	            if (!n) {
	                $io.attr2('name', id);
	            }
	            else {
	                id = n;
	            }
	        }
	        else {
	            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
	            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
	        }
	        io = $io[0];


	        xhr = { // mock object
	            aborted: 0,
	            responseText: null,
	            responseXML: null,
	            status: 0,
	            statusText: 'n/a',
	            getAllResponseHeaders: function() {},
	            getResponseHeader: function() {},
	            setRequestHeader: function() {},
	            abort: function(status) {
	                var e = (status === 'timeout' ? 'timeout' : 'aborted');
	                log('aborting upload... ' + e);
	                this.aborted = 1;

	                try { // #214, #257
	                    if (io.contentWindow.document.execCommand) {
	                        io.contentWindow.document.execCommand('Stop');
	                    }
	                }
	                catch(ignore) {}

	                $io.attr('src', s.iframeSrc); // abort op in progress
	                xhr.error = e;
	                if (s.error) {
	                    s.error.call(s.context, xhr, e, status);
	                }
	                if (g) {
	                    $.event.trigger("ajaxError", [xhr, s, e]);
	                }
	                if (s.complete) {
	                    s.complete.call(s.context, xhr, e);
	                }
	            }
	        };

	        g = s.global;
	        // trigger ajax global events so that activity/block indicators work like normal
	        if (g && 0 === $.active++) {
	            $.event.trigger("ajaxStart");
	        }
	        if (g) {
	            $.event.trigger("ajaxSend", [xhr, s]);
	        }

	        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
	            if (s.global) {
	                $.active--;
	            }
	            deferred.reject();
	            return deferred;
	        }
	        if (xhr.aborted) {
	            deferred.reject();
	            return deferred;
	        }

	        // add submitting element to data if we know it
	        sub = form.clk;
	        if (sub) {
	            n = sub.name;
	            if (n && !sub.disabled) {
	                s.extraData = s.extraData || {};
	                s.extraData[n] = sub.value;
	                if (sub.type == "image") {
	                    s.extraData[n+'.x'] = form.clk_x;
	                    s.extraData[n+'.y'] = form.clk_y;
	                }
	            }
	        }

	        var CLIENT_TIMEOUT_ABORT = 1;
	        var SERVER_ABORT = 2;
	                
	        function getDoc(frame) {
	            /* it looks like contentWindow or contentDocument do not
	             * carry the protocol property in ie8, when running under ssl
	             * frame.document is the only valid response document, since
	             * the protocol is know but not on the other two objects. strange?
	             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
	             */
	            
	            var doc = null;
	            
	            // IE8 cascading access check
	            try {
	                if (frame.contentWindow) {
	                    doc = frame.contentWindow.document;
	                }
	            } catch(err) {
	                // IE8 access denied under ssl & missing protocol
	                log('cannot get iframe.contentWindow document: ' + err);
	            }

	            if (doc) { // successful getting content
	                return doc;
	            }

	            try { // simply checking may throw in ie8 under ssl or mismatched protocol
	                doc = frame.contentDocument ? frame.contentDocument : frame.document;
	            } catch(err) {
	                // last attempt
	                log('cannot get iframe.contentDocument: ' + err);
	                doc = frame.document;
	            }
	            return doc;
	        }

	        // Rails CSRF hack (thanks to Yvan Barthelemy)
	        var csrf_token = $('meta[name=csrf-token]').attr('content');
	        var csrf_param = $('meta[name=csrf-param]').attr('content');
	        if (csrf_param && csrf_token) {
	            s.extraData = s.extraData || {};
	            s.extraData[csrf_param] = csrf_token;
	        }

	        // take a breath so that pending repaints get some cpu time before the upload starts
	        function doSubmit() {
	            // make sure form attrs are set
	            var t = $form.attr2('target'), 
	                a = $form.attr2('action'), 
	                mp = 'multipart/form-data',
	                et = $form.attr('enctype') || $form.attr('encoding') || mp;

	            // update form attrs in IE friendly way
	            form.setAttribute('target',id);
	            if (!method || /post/i.test(method) ) {
	                form.setAttribute('method', 'POST');
	            }
	            if (a != s.url) {
	                form.setAttribute('action', s.url);
	            }

	            // ie borks in some cases when setting encoding
	            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
	                $form.attr({
	                    encoding: 'multipart/form-data',
	                    enctype:  'multipart/form-data'
	                });
	            }

	            // support timout
	            if (s.timeout) {
	                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
	            }

	            // look for server aborts
	            function checkState() {
	                try {
	                    var state = getDoc(io).readyState;
	                    log('state = ' + state);
	                    if (state && state.toLowerCase() == 'uninitialized') {
	                        setTimeout(checkState,50);
	                    }
	                }
	                catch(e) {
	                    log('Server abort: ' , e, ' (', e.name, ')');
	                    cb(SERVER_ABORT);
	                    if (timeoutHandle) {
	                        clearTimeout(timeoutHandle);
	                    }
	                    timeoutHandle = undefined;
	                }
	            }

	            // add "extra" data to form if provided in options
	            var extraInputs = [];
	            try {
	                if (s.extraData) {
	                    for (var n in s.extraData) {
	                        if (s.extraData.hasOwnProperty(n)) {
	                           // if using the $.param format that allows for multiple values with the same name
	                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
	                               extraInputs.push(
	                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
	                                   .appendTo(form)[0]);
	                           } else {
	                               extraInputs.push(
	                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
	                                   .appendTo(form)[0]);
	                           }
	                        }
	                    }
	                }

	                if (!s.iframeTarget) {
	                    // add iframe to doc and submit the form
	                    $io.appendTo('body');
	                }
	                if (io.attachEvent) {
	                    io.attachEvent('onload', cb);
	                }
	                else {
	                    io.addEventListener('load', cb, false);
	                }
	                setTimeout(checkState,15);

	                try {
	                    form.submit();
	                } catch(err) {
	                    // just in case form has element with name/id of 'submit'
	                    var submitFn = document.createElement('form').submit;
	                    submitFn.apply(form);
	                }
	            }
	            finally {
	                // reset attrs and remove "extra" input elements
	                form.setAttribute('action',a);
	                form.setAttribute('enctype', et); // #380
	                if(t) {
	                    form.setAttribute('target', t);
	                } else {
	                    $form.removeAttr('target');
	                }
	                $(extraInputs).remove();
	            }
	        }

	        if (s.forceSync) {
	            doSubmit();
	        }
	        else {
	            setTimeout(doSubmit, 10); // this lets dom updates render
	        }

	        var data, doc, domCheckCount = 50, callbackProcessed;

	        function cb(e) {
	            if (xhr.aborted || callbackProcessed) {
	                return;
	            }
	            
	            doc = getDoc(io);
	            if(!doc) {
	                log('cannot access response document');
	                e = SERVER_ABORT;
	            }
	            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
	                xhr.abort('timeout');
	                deferred.reject(xhr, 'timeout');
	                return;
	            }
	            else if (e == SERVER_ABORT && xhr) {
	                xhr.abort('server abort');
	                deferred.reject(xhr, 'error', 'server abort');
	                return;
	            }

	            if (!doc || doc.location.href == s.iframeSrc) {
	                // response not received yet
	                if (!timedOut) {
	                    return;
	                }
	            }
	            if (io.detachEvent) {
	                io.detachEvent('onload', cb);
	            }
	            else {
	                io.removeEventListener('load', cb, false);
	            }

	            var status = 'success', errMsg;
	            try {
	                if (timedOut) {
	                    throw 'timeout';
	                }

	                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
	                log('isXml='+isXml);
	                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
	                    if (--domCheckCount) {
	                        // in some browsers (Opera) the iframe DOM is not always traversable when
	                        // the onload callback fires, so we loop a bit to accommodate
	                        log('requeing onLoad callback, DOM not available');
	                        setTimeout(cb, 250);
	                        return;
	                    }
	                    // let this fall through because server response could be an empty document
	                    //log('Could not access iframe DOM after mutiple tries.');
	                    //throw 'DOMException: not available';
	                }

	                //log('response detected');
	                var docRoot = doc.body ? doc.body : doc.documentElement;
	                xhr.responseText = docRoot ? docRoot.innerHTML : null;
	                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
	                if (isXml) {
	                    s.dataType = 'xml';
	                }
	                xhr.getResponseHeader = function(header){
	                    var headers = {'content-type': s.dataType};
	                    return headers[header.toLowerCase()];
	                };
	                // support for XHR 'status' & 'statusText' emulation :
	                if (docRoot) {
	                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
	                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
	                }

	                var dt = (s.dataType || '').toLowerCase();
	                var scr = /(json|script|text)/.test(dt);
	                if (scr || s.textarea) {
	                    // see if user embedded response in textarea
	                    var ta = doc.getElementsByTagName('textarea')[0];
	                    if (ta) {
	                        xhr.responseText = ta.value;
	                        // support for XHR 'status' & 'statusText' emulation :
	                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
	                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
	                    }
	                    else if (scr) {
	                        // account for browsers injecting pre around json response
	                        var pre = doc.getElementsByTagName('pre')[0];
	                        var b = doc.getElementsByTagName('body')[0];
	                        if (pre) {
	                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
	                        }
	                        else if (b) {
	                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
	                        }
	                    }
	                }
	                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
	                    xhr.responseXML = toXml(xhr.responseText);
	                }

	                try {
	                    data = httpData(xhr, dt, s);
	                }
	                catch (err) {
	                    status = 'parsererror';
	                    xhr.error = errMsg = (err || status);
	                }
	            }
	            catch (err) {
	                log('error caught: ',err);
	                status = 'error';
	                xhr.error = errMsg = (err || status);
	            }

	            if (xhr.aborted) {
	                log('upload aborted');
	                status = null;
	            }

	            if (xhr.status) { // we've set xhr.status
	                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
	            }

	            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
	            if (status === 'success') {
	                if (s.success) {
	                    s.success.call(s.context, data, 'success', xhr);
	                }
	                deferred.resolve(xhr.responseText, 'success', xhr);
	                if (g) {
	                    $.event.trigger("ajaxSuccess", [xhr, s]);
	                }
	            }
	            else if (status) {
	                if (errMsg === undefined) {
	                    errMsg = xhr.statusText;
	                }
	                if (s.error) {
	                    s.error.call(s.context, xhr, status, errMsg);
	                }
	                deferred.reject(xhr, 'error', errMsg);
	                if (g) {
	                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
	                }
	            }

	            if (g) {
	                $.event.trigger("ajaxComplete", [xhr, s]);
	            }

	            if (g && ! --$.active) {
	                $.event.trigger("ajaxStop");
	            }

	            if (s.complete) {
	                s.complete.call(s.context, xhr, status);
	            }

	            callbackProcessed = true;
	            if (s.timeout) {
	                clearTimeout(timeoutHandle);
	            }

	            // clean up
	            setTimeout(function() {
	                if (!s.iframeTarget) {
	                    $io.remove();
	                }
	                else { //adding else to clean up existing iframe response.
	                    $io.attr('src', s.iframeSrc);
	                }
	                xhr.responseXML = null;
	            }, 100);
	        }

	        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
	            if (window.ActiveXObject) {
	                doc = new ActiveXObject('Microsoft.XMLDOM');
	                doc.async = 'false';
	                doc.loadXML(s);
	            }
	            else {
	                doc = (new DOMParser()).parseFromString(s, 'text/xml');
	            }
	            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
	        };
	        var parseJSON = $.parseJSON || function(s) {
	            /*jslint evil:true */
	            return window['eval']('(' + s + ')');
	        };

	        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

	            var ct = xhr.getResponseHeader('content-type') || '',
	                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
	                data = xml ? xhr.responseXML : xhr.responseText;

	            if (xml && data.documentElement.nodeName === 'parsererror') {
	                if ($.error) {
	                    $.error('parsererror');
	                }
	            }
	            if (s && s.dataFilter) {
	                data = s.dataFilter(data, type);
	            }
	            if (typeof data === 'string') {
	                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
	                    data = parseJSON(data);
	                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
	                    $.globalEval(data);
	                }
	            }
	            return data;
	        };

	        return deferred;
	    }
	};

	/**
	 * ajaxForm() provides a mechanism for fully automating form submission.
	 *
	 * The advantages of using this method instead of ajaxSubmit() are:
	 *
	 * 1: This method will include coordinates for <input type="image" /> elements (if the element
	 *    is used to submit the form).
	 * 2. This method will include the submit element's name/value data (for the element that was
	 *    used to submit the form).
	 * 3. This method binds the submit() method to the form for you.
	 *
	 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
	 * passes the options argument along after properly binding events for submit elements and
	 * the form itself.
	 */
	$.fn.ajaxForm = function(options) {
	    options = options || {};
	    options.delegation = options.delegation && $.isFunction($.fn.on);

	    // in jQuery 1.3+ we can fix mistakes with the ready state
	    if (!options.delegation && this.length === 0) {
	        var o = { s: this.selector, c: this.context };
	        if (!$.isReady && o.s) {
	            log('DOM not ready, queuing ajaxForm');
	            $(function() {
	                $(o.s,o.c).ajaxForm(options);
	            });
	            return this;
	        }
	        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
	        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
	        return this;
	    }

	    if ( options.delegation ) {
	        $(document)
	            .off('submit.form-plugin', this.selector, doAjaxSubmit)
	            .off('click.form-plugin', this.selector, captureSubmittingElement)
	            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
	            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
	        return this;
	    }

	    return this.ajaxFormUnbind()
	        .bind('submit.form-plugin', options, doAjaxSubmit)
	        .bind('click.form-plugin', options, captureSubmittingElement);
	};

	// private event handlers
	function doAjaxSubmit(e) {
	    /*jshint validthis:true */
	    var options = e.data;
	    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
	        e.preventDefault();
	        $(e.target).ajaxSubmit(options); // #365
	    }
	}

	function captureSubmittingElement(e) {
	    /*jshint validthis:true */
	    var target = e.target;
	    var $el = $(target);
	    if (!($el.is("[type=submit],[type=image]"))) {
	        // is this a child element of the submit el?  (ex: a span within a button)
	        var t = $el.closest('[type=submit]');
	        if (t.length === 0) {
	            return;
	        }
	        target = t[0];
	    }
	    var form = this;
	    form.clk = target;
	    if (target.type == 'image') {
	        if (e.offsetX !== undefined) {
	            form.clk_x = e.offsetX;
	            form.clk_y = e.offsetY;
	        } else if (typeof $.fn.offset == 'function') {
	            var offset = $el.offset();
	            form.clk_x = e.pageX - offset.left;
	            form.clk_y = e.pageY - offset.top;
	        } else {
	            form.clk_x = e.pageX - target.offsetLeft;
	            form.clk_y = e.pageY - target.offsetTop;
	        }
	    }
	    // clear form vars
	    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	}


	// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
	$.fn.ajaxFormUnbind = function() {
	    return this.unbind('submit.form-plugin click.form-plugin');
	};

	/**
	 * formToArray() gathers form element data into an array of objects that can
	 * be passed to any of the following ajax functions: $.get, $.post, or load.
	 * Each object in the array has both a 'name' and 'value' property.  An example of
	 * an array for a simple login form might be:
	 *
	 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
	 *
	 * It is this array that is passed to pre-submit callback functions provided to the
	 * ajaxSubmit() and ajaxForm() methods.
	 */
	$.fn.formToArray = function(semantic, elements) {
	    var a = [];
	    if (this.length === 0) {
	        return a;
	    }

	    var form = this[0];
	    var formId = this.attr('id');
	    var els = semantic ? form.getElementsByTagName('*') : form.elements;
	    var els2;

	    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
	        els = $(els).get();  // convert to standard array
	    }

	    // #386; account for inputs outside the form which use the 'form' attribute
	    if ( formId ) {
	        els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
	        if ( els2.length ) {
	            els = (els || []).concat(els2);
	        }
	    }

	    if (!els || !els.length) {
	        return a;
	    }

	    var i,j,n,v,el,max,jmax;
	    for(i=0, max=els.length; i < max; i++) {
	        el = els[i];
	        n = el.name;
	        if (!n || el.disabled) {
	            continue;
	        }

	        if (semantic && form.clk && el.type == "image") {
	            // handle image inputs on the fly when semantic == true
	            if(form.clk == el) {
	                a.push({name: n, value: $(el).val(), type: el.type });
	                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	            }
	            continue;
	        }

	        v = $.fieldValue(el, true);
	        if (v && v.constructor == Array) {
	            if (elements) {
	                elements.push(el);
	            }
	            for(j=0, jmax=v.length; j < jmax; j++) {
	                a.push({name: n, value: v[j]});
	            }
	        }
	        else if (feature.fileapi && el.type == 'file') {
	            if (elements) {
	                elements.push(el);
	            }
	            var files = el.files;
	            if (files.length) {
	                for (j=0; j < files.length; j++) {
	                    a.push({name: n, value: files[j], type: el.type});
	                }
	            }
	            else {
	                // #180
	                a.push({ name: n, value: '', type: el.type });
	            }
	        }
	        else if (v !== null && typeof v != 'undefined') {
	            if (elements) {
	                elements.push(el);
	            }
	            a.push({name: n, value: v, type: el.type, required: el.required});
	        }
	    }

	    if (!semantic && form.clk) {
	        // input type=='image' are not found in elements array! handle it here
	        var $input = $(form.clk), input = $input[0];
	        n = input.name;
	        if (n && !input.disabled && input.type == 'image') {
	            a.push({name: n, value: $input.val()});
	            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	        }
	    }
	    return a;
	};

	/**
	 * Serializes form data into a 'submittable' string. This method will return a string
	 * in the format: name1=value1&amp;name2=value2
	 */
	$.fn.formSerialize = function(semantic) {
	    //hand off to jQuery.param for proper encoding
	    return $.param(this.formToArray(semantic));
	};

	/**
	 * Serializes all field elements in the jQuery object into a query string.
	 * This method will return a string in the format: name1=value1&amp;name2=value2
	 */
	$.fn.fieldSerialize = function(successful) {
	    var a = [];
	    this.each(function() {
	        var n = this.name;
	        if (!n) {
	            return;
	        }
	        var v = $.fieldValue(this, successful);
	        if (v && v.constructor == Array) {
	            for (var i=0,max=v.length; i < max; i++) {
	                a.push({name: n, value: v[i]});
	            }
	        }
	        else if (v !== null && typeof v != 'undefined') {
	            a.push({name: this.name, value: v});
	        }
	    });
	    //hand off to jQuery.param for proper encoding
	    return $.param(a);
	};

	/**
	 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
	 *
	 *  <form><fieldset>
	 *      <input name="A" type="text" />
	 *      <input name="A" type="text" />
	 *      <input name="B" type="checkbox" value="B1" />
	 *      <input name="B" type="checkbox" value="B2"/>
	 *      <input name="C" type="radio" value="C1" />
	 *      <input name="C" type="radio" value="C2" />
	 *  </fieldset></form>
	 *
	 *  var v = $('input[type=text]').fieldValue();
	 *  // if no values are entered into the text inputs
	 *  v == ['','']
	 *  // if values entered into the text inputs are 'foo' and 'bar'
	 *  v == ['foo','bar']
	 *
	 *  var v = $('input[type=checkbox]').fieldValue();
	 *  // if neither checkbox is checked
	 *  v === undefined
	 *  // if both checkboxes are checked
	 *  v == ['B1', 'B2']
	 *
	 *  var v = $('input[type=radio]').fieldValue();
	 *  // if neither radio is checked
	 *  v === undefined
	 *  // if first radio is checked
	 *  v == ['C1']
	 *
	 * The successful argument controls whether or not the field element must be 'successful'
	 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
	 * The default value of the successful argument is true.  If this value is false the value(s)
	 * for each element is returned.
	 *
	 * Note: This method *always* returns an array.  If no valid value can be determined the
	 *    array will be empty, otherwise it will contain one or more values.
	 */
	$.fn.fieldValue = function(successful) {
	    for (var val=[], i=0, max=this.length; i < max; i++) {
	        var el = this[i];
	        var v = $.fieldValue(el, successful);
	        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
	            continue;
	        }
	        if (v.constructor == Array) {
	            $.merge(val, v);
	        }
	        else {
	            val.push(v);
	        }
	    }
	    return val;
	};

	/**
	 * Returns the value of the field element.
	 */
	$.fieldValue = function(el, successful) {
	    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	    if (successful === undefined) {
	        successful = true;
	    }

	    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
	        (t == 'checkbox' || t == 'radio') && !el.checked ||
	        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
	        tag == 'select' && el.selectedIndex == -1)) {
	            return null;
	    }

	    if (tag == 'select') {
	        var index = el.selectedIndex;
	        if (index < 0) {
	            return null;
	        }
	        var a = [], ops = el.options;
	        var one = (t == 'select-one');
	        var max = (one ? index+1 : ops.length);
	        for(var i=(one ? index : 0); i < max; i++) {
	            var op = ops[i];
	            if (op.selected) {
	                var v = op.value;
	                if (!v) { // extra pain for IE...
	                    v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
	                }
	                if (one) {
	                    return v;
	                }
	                a.push(v);
	            }
	        }
	        return a;
	    }
	    return $(el).val();
	};

	/**
	 * Clears the form data.  Takes the following actions on the form's input fields:
	 *  - input text fields will have their 'value' property set to the empty string
	 *  - select elements will have their 'selectedIndex' property set to -1
	 *  - checkbox and radio inputs will have their 'checked' property set to false
	 *  - inputs of type submit, button, reset, and hidden will *not* be effected
	 *  - button elements will *not* be effected
	 */
	$.fn.clearForm = function(includeHidden) {
	    return this.each(function() {
	        $('input,select,textarea', this).clearFields(includeHidden);
	    });
	};

	/**
	 * Clears the selected form elements.
	 */
	$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	    return this.each(function() {
	        var t = this.type, tag = this.tagName.toLowerCase();
	        if (re.test(t) || tag == 'textarea') {
	            this.value = '';
	        }
	        else if (t == 'checkbox' || t == 'radio') {
	            this.checked = false;
	        }
	        else if (tag == 'select') {
	            this.selectedIndex = -1;
	        }
	        else if (t == "file") {
	            if (/MSIE/.test(navigator.userAgent)) {
	                $(this).replaceWith($(this).clone(true));
	            } else {
	                $(this).val('');
	            }
	        }
	        else if (includeHidden) {
	            // includeHidden can be the value true, or it can be a selector string
	            // indicating a special test; for example:
	            //  $('#myForm').clearForm('.special:hidden')
	            // the above would clean hidden inputs that have the class of 'special'
	            if ( (includeHidden === true && /hidden/.test(t)) ||
	                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
	                this.value = '';
	            }
	        }
	    });
	};

	/**
	 * Resets the form data.  Causes all form elements to be reset to their original value.
	 */
	$.fn.resetForm = function() {
	    return this.each(function() {
	        // guard against an input with the name of 'reset'
	        // note that IE reports the reset function as an 'object'
	        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
	            this.reset();
	        }
	    });
	};

	/**
	 * Enables or disables any matching elements.
	 */
	$.fn.enable = function(b) {
	    if (b === undefined) {
	        b = true;
	    }
	    return this.each(function() {
	        this.disabled = !b;
	    });
	};

	/**
	 * Checks/unchecks any matching checkboxes or radio buttons and
	 * selects/deselects and matching option elements.
	 */
	$.fn.selected = function(select) {
	    if (select === undefined) {
	        select = true;
	    }
	    return this.each(function() {
	        var t = this.type;
	        if (t == 'checkbox' || t == 'radio') {
	            this.checked = select;
	        }
	        else if (this.tagName.toLowerCase() == 'option') {
	            var $sel = $(this).parent('select');
	            if (select && $sel[0] && $sel[0].type == 'select-one') {
	                // deselect all other options
	                $sel.find('option').selected(false);
	            }
	            this.selected = select;
	        }
	    });
	};

	// expose debug var
	$.fn.ajaxSubmit.debug = false;

	// helper fn for console logging
	function log() {
	    if (!$.fn.ajaxSubmit.debug) {
	        return;
	    }
	    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	    if (window.console && window.console.log) {
	        window.console.log(msg);
	    }
	    else if (window.opera && window.opera.postError) {
	        window.opera.postError(msg);
	    }
	}

	}));

/***/ },
/* 48 */
/***/ function(module, exports) {

	/*
	 通用表单验证方法
	 Validform version 5.3.2
	 By sean during April 7, 2010 - March 26, 2013
	 For more information, please visit http://validform.rjboy.cn
	 Validform is available under the terms of the MIT license.

	 Demo:
	 $(".demoform").Validform({//$(".demoform")指明是哪一表单需要验证,名称需加在form表单上;
	 btnSubmit:"#btn_sub", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
	 btnReset:".btn_reset",//可选项 .btn_reset是该表单下要绑定点击重置表单事件的按钮;
	 tiptype:1, //可选项 1=>pop box,2=>side tip(parent.next.find; with default pop),3=>side tip(siblings; with default pop),4=>side tip(siblings; none pop)，默认为1，也可以传入一个function函数，自定义提示信息的显示方式（可以实现你想要的任何效果，具体参见demo页）;
	 ignoreHidden:false,//可选项 true | false 默认为false，当为true时对:hidden的表单元素将不做验证;
	 dragonfly:false,//可选项 true | false 默认false，当为true时，值为空时不做验证；
	 tipSweep:true,//可选项 true | false 默认为false，只在表单提交时触发检测，blur事件将不会触发检测（实时验证会在后台进行，不会显示检测结果）;
	 label:".label",//可选项 选择符，在没有绑定nullmsg时查找要显示的提示文字，默认查找".Validform_label"下的文字;
	 showAllError:false,//可选项 true | false，true：提交表单时所有错误提示信息都会显示，false：一碰到验证不通过的就停止检测后面的元素，只显示该元素的错误信息;
	 postonce:true, //可选项 表单是否只能提交一次，true开启，不填则默认关闭;
	 ajaxPost:true, //使用ajax方式提交表单数据，默认false，提交地址就是action指定地址;
	 datatype:{//传入自定义datatype类型，可以是正则，也可以是函数（函数内会传入一个参数）;
	 "*6-20": /^[^\s]{6,20}$/,
	 "z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
	 "username":function(gets,obj,curform,regxp){
	 //参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
	 var reg1=/^[\w\.]{4,16}$/,
	 reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;

	 if(reg1.test(gets)){return true;}
	 if(reg2.test(gets)){return true;}
	 return false;

	 //注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
	 },
	 "phone":function(){
	 // 5.0 版本之后，要实现二选一的验证效果，datatype 的名称 不 需要以 "option_" 开头;
	 }
	 },
	 usePlugin:{
	 swfupload:{},
	 datepicker:{},
	 passwordstrength:{},
	 jqtransform:{
	 selector:"select,input"
	 }
	 },
	 beforeCheck:function(curform){
	 //在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
	 //这里明确return false的话将不会继续执行验证操作;
	 },
	 beforeSubmit:function(curform){
	 //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
	 //这里明确return false的话表单将不会提交;
	 },
	 callback:function(data){
	 //返回数据data是json格式，{"info":"demo info","status":"y"}
	 //info: 输出提示信息;
	 //status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
	 //你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
	 //ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；

	 //这里执行回调操作;
	 //注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
	 }
	 });

	 Validform对象的方法和属性：
	 tipmsg：自定义提示信息，通过修改Validform对象的这个属性值来让同一个页面的不同表单使用不同的提示文字；
	 dataType：获取内置的一些正则；
	 eq(n)：获取Validform对象的第n个元素;
	 ajaxPost(flag,sync,url)：以ajax方式提交表单。flag为true时，跳过验证直接提交，sync为true时将以同步的方式进行ajax提交，传入了url地址时，表单会提交到这个地址；
	 abort()：终止ajax的提交；
	 submitForm(flag,url)：以参数里设置的方式提交表单，flag为true时，跳过验证直接提交，传入了url地址时，表单会提交到这个地址；
	 resetForm()：重置表单；
	 resetStatus()：重置表单的提交状态。传入了postonce参数的话，表单成功提交后状态会设置为"posted"，重置提交状态可以让表单继续可以提交；
	 getStatus()：获取表单的提交状态，normal：未提交，posting：正在提交，posted：已成功提交过；
	 setStatus(status)：设置表单的提交状态，可以设置normal，posting，posted三种状态，不传参则设置状态为posting，这个状态表单可以验证，但不能提交；
	 ignore(selector)：忽略对所选择对象的验证；
	 unignore(selector)：将ignore方法所忽略验证的对象重新获取验证效果；
	 addRule(rule)：可以通过Validform对象的这个方法来给表单元素绑定验证规则；
	 check(bool,selector):对指定对象进行验证(默认验证当前整个表单)，通过返回true，否则返回false（绑定实时验证的对象，格式符合要求时返回true，而不会等ajax的返回结果），bool为true时则只验证不显示提示信息；
	 config(setup):可以通过这个方法来修改初始化参数，指定表单的提交地址，给表单ajax和实时验证的ajax里设置参数；
	 */

	(function($,win,undef){
	    var errorobj=null,//指示当前验证失败的表单元素;
	        msgobj=null,//pop box object
	        msghidden=true;//msgbox hidden?

	    var tipmsg={//默认提示文字;
	        tit:"提示信息",
	        w:{
	            "*":"不能为空！",
	            "*6-16":"请填写6到16位任意字符！",
	            "n":"请填写数字！",
	            "n6-16":"请填写6到16位数字！",
	            "s":"不能输入特殊字符！",
	            "s6-18":"请填写6到18位字符！",
	            "p":"请填写邮政编码！",
	            "m":"请填写手机号码！",
	            "e":"邮箱地址格式不对！",
	            "url":"请填写网址！"
	        },
	        def:"请填写正确信息！",
	        undef:"datatype未定义！",
	        reck:"两次输入的内容不一致！",
	        r:"通过信息验证！",
	        c:"正在检测信息…",
	        s:"请{填写|选择}{0|信息}！",
	        v:"所填信息没有经过验证，请稍后…",
	        p:"正在提交数据…"
	    }
	    $.Tipmsg=tipmsg;

	    var Validform=function(forms,settings,inited){
	        var settings=$.extend({},Validform.defaults,settings);
	        settings.datatype && $.extend(Validform.util.dataType,settings.datatype);

	        var brothers=this;
	        brothers.tipmsg={w:{}};
	        brothers.forms=forms;
	        brothers.objects=[];

	        //创建子对象时不再绑定事件;
	        if(inited===true){
	            return false;
	        }

	        forms.each(function(){
	            //已经绑定事件时跳过，避免事件重复绑定;
	            if(this.validform_inited=="inited"){return true;}
	            this.validform_inited="inited";

	            var curform=this;
	            curform.settings=$.extend({},settings);

	            var $this=$(curform);

	            //防止表单按钮双击提交两次;
	            curform.validform_status="normal"; //normal | posting | posted;

	            //让每个Validform对象都能自定义tipmsg;
	            $this.data("tipmsg",brothers.tipmsg);

	            //bind the blur event;
	            $this.delegate("[datatype]","blur",function(){
	                //判断是否是在提交表单操作时触发的验证请求；
	                var subpost=arguments[1];
	                Validform.util.check.call(this,$this,subpost);
	            });

	            $this.delegate(":text","keypress",function(event){
	                if(event.keyCode==13 && $this.find(":submit").length==0){
	                    $this.submit();
	                }
	            });

	            //点击表单元素，默认文字消失效果;
	            //表单元素值比较时的信息提示增强;
	            //radio、checkbox提示信息增强;
	            //外调插件初始化;
	            Validform.util.enhance.call($this,curform.settings.tiptype,curform.settings.usePlugin,curform.settings.tipSweep);

	            curform.settings.btnSubmit && $this.find(curform.settings.btnSubmit).bind("click",function(){
	                $this.trigger("submit");
	                return false;
	            });

	            $this.submit(function(){
	                var subflag=Validform.util.submitForm.call($this,curform.settings);
	                subflag === undef && (subflag=true);
	                return subflag;
	            });

	            $this.find("[type='reset']").add($this.find(curform.settings.btnReset)).bind("click",function(){
	                Validform.util.resetForm.call($this);
	            });

	        });

	        //预创建pop box;
	        if( settings.tiptype==1 || (settings.tiptype==2 || settings.tiptype==3) && settings.ajaxPost ){
	            creatMsgbox();
	        }
	    }

	    Validform.defaults={
	        tiptype:1,
	        tipSweep:false,
	        showAllError:false,
	        postonce:false,
	        ajaxPost:false
	    }

	    Validform.util={
	        dataType:{
	            "*":/[\w\W]+/,
	            "*6-16":/^[\w\W]{6,16}$/,
	            "n":/^\d+$/,
	            "n6-16":/^\d{6,16}$/,
	            "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
	            "s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
	            "p":/^[0-9]{6}$/,
	            "m":/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
	            "e":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	            "url":/^(\w+:\/\/)?\w+(\.\w+)+.*$/
	        },

	        toString:Object.prototype.toString,

	        isEmpty:function(val){
	            return val==="" || val===$.trim(this.attr("tip"));
	        },

	        getValue:function(obj){
	            var inputval,
	                curform=this;

	            if(obj.is(":radio")){
	                inputval=curform.find(":radio[name='"+obj.attr("name")+"']:checked").val();
	                inputval= inputval===undef ? "" : inputval;
	            }else if(obj.is(":checkbox")){
	                inputval="";
	                curform.find(":checkbox[name='"+obj.attr("name")+"']:checked").each(function(){
	                    inputval +=$(this).val()+',';
	                })
	                inputval= inputval===undef ? "" : inputval;
	            }else{
	                inputval=obj.val();
	            }
	            inputval=$.trim(inputval);

	            return Validform.util.isEmpty.call(obj,inputval) ? "" : inputval;
	        },

	        enhance:function(tiptype,usePlugin,tipSweep,addRule){
	            var curform=this;

	            //页面上不存在提示信息的标签时，自动创建;
	            curform.find("[datatype]").each(function(){
	                if(tiptype==2){
	                    if($(this).parent().next().find(".Validform_checktip").length==0){
	                        $(this).parent().next().append("<span class='Validform_checktip' />");
	                        $(this).siblings(".Validform_checktip").remove();
	                    }
	                }else if(tiptype==3 || tiptype==4){
	                    if($(this).siblings(".Validform_checktip").length==0){
	                        $(this).parent().append("<span class='Validform_checktip' />");
	                        $(this).parent().next().find(".Validform_checktip").remove();
	                    }
	                }
	            })

	            //表单元素值比较时的信息提示增强;
	            curform.find("input[recheck]").each(function(){
	                //已经绑定事件时跳过;
	                if(this.validform_inited=="inited"){return true;}
	                this.validform_inited="inited";

	                var _this=$(this);
	                var recheckinput=curform.find("input[name='"+$(this).attr("recheck")+"']");
	                recheckinput.bind("keyup",function(){
	                    if(recheckinput.val()==_this.val() && recheckinput.val() != ""){
	                        if(recheckinput.attr("tip")){
	                            if(recheckinput.attr("tip") == recheckinput.val()){return false;}
	                        }
	                        _this.trigger("blur");
	                    }
	                }).bind("blur",function(){
	                    if(recheckinput.val()!=_this.val() && _this.val()!=""){
	                        if(_this.attr("tip")){
	                            if(_this.attr("tip") == _this.val()){return false;}
	                        }
	                        _this.trigger("blur");
	                    }
	                });
	            });

	            //hasDefaultText;
	            curform.find("[tip]").each(function(){//tip是表单元素的默认提示信息,这是点击清空效果;
	                //已经绑定事件时跳过;
	                if(this.validform_inited=="inited"){return true;}
	                this.validform_inited="inited";

	                var defaultvalue=$(this).attr("tip");
	                var altercss=$(this).attr("altercss");
	                $(this).focus(function(){
	                    if($(this).val()==defaultvalue){
	                        $(this).val('');
	                        if(altercss){$(this).removeClass(altercss);}
	                    }
	                }).blur(function(){
	                    if($.trim($(this).val())===''){
	                        $(this).val(defaultvalue);
	                        if(altercss){$(this).addClass(altercss);}
	                    }
	                });
	            });

	            //enhance info feedback for checkbox & radio;
	            curform.find(":checkbox[datatype],:radio[datatype]").each(function(){
	                //已经绑定事件时跳过;
	                if(this.validform_inited=="inited"){return true;}
	                this.validform_inited="inited";

	                var _this=$(this);
	                var name=_this.attr("name");
	                curform.find("[name='"+name+"']").filter(":checkbox,:radio").bind("click",function(){
	                    //避免多个事件绑定时的取值滞后问题;
	                    setTimeout(function(){
	                        _this.trigger("blur");
	                    },0);
	                });

	            });

	            //select multiple;
	            curform.find("select[datatype][multiple]").bind("click",function(){
	                var _this=$(this);
	                setTimeout(function(){
	                    _this.trigger("blur");
	                },0);
	            });

	            //plugins here to start;
	            Validform.util.usePlugin.call(curform,usePlugin,tiptype,tipSweep,addRule);
	        },

	        usePlugin:function(plugin,tiptype,tipSweep,addRule){
	            /*
	             plugin:settings.usePlugin;
	             tiptype:settings.tiptype;
	             tipSweep:settings.tipSweep;
	             addRule:是否在addRule时触发;
	             */

	            var curform=this,
	                plugin=plugin || {};
	            //swfupload;
	            if(curform.find("input[plugin='swfupload']").length && typeof(swfuploadhandler) != "undefined"){

	                var custom={
	                    custom_settings:{
	                        form:curform,
	                        showmsg:function(msg,type,obj){
	                            Validform.util.showmsg.call(curform,msg,tiptype,{obj:curform.find("input[plugin='swfupload']"),type:type,sweep:tipSweep});
	                        }
	                    }
	                };

	                custom=$.extend(true,{},plugin.swfupload,custom);

	                curform.find("input[plugin='swfupload']").each(function(n){
	                    if(this.validform_inited=="inited"){return true;}
	                    this.validform_inited="inited";

	                    $(this).val("");
	                    swfuploadhandler.init(custom,n);
	                });

	            }

	            //datepicker;
	            if(curform.find("input[plugin='datepicker']").length && $.fn.datePicker){
	                plugin.datepicker=plugin.datepicker || {};

	                if(plugin.datepicker.format){
	                    Date.format=plugin.datepicker.format;
	                    delete plugin.datepicker.format;
	                }
	                if(plugin.datepicker.firstDayOfWeek){
	                    Date.firstDayOfWeek=plugin.datepicker.firstDayOfWeek;
	                    delete plugin.datepicker.firstDayOfWeek;
	                }

	                curform.find("input[plugin='datepicker']").each(function(n){
	                    if(this.validform_inited=="inited"){return true;}
	                    this.validform_inited="inited";

	                    plugin.datepicker.callback && $(this).bind("dateSelected",function(){
	                        var d=new Date( $.event._dpCache[this._dpId].getSelected()[0] ).asString(Date.format);
	                        plugin.datepicker.callback(d,this);
	                    });
	                    $(this).datePicker(plugin.datepicker);
	                });
	            }

	            //passwordstrength;
	            if(curform.find("input[plugin*='passwordStrength']").length && $.fn.passwordStrength){
	                plugin.passwordstrength=plugin.passwordstrength || {};
	                plugin.passwordstrength.showmsg=function(obj,msg,type){
	                    Validform.util.showmsg.call(curform,msg,tiptype,{obj:obj,type:type,sweep:tipSweep});
	                };

	                curform.find("input[plugin='passwordStrength']").each(function(n){
	                    if(this.validform_inited=="inited"){return true;}
	                    this.validform_inited="inited";

	                    $(this).passwordStrength(plugin.passwordstrength);
	                });
	            }

	            //jqtransform;
	            if(addRule!="addRule" && plugin.jqtransform && $.fn.jqTransSelect){
	                if(curform[0].jqTransSelected=="true"){return;};
	                curform[0].jqTransSelected="true";

	                var jqTransformHideSelect = function(oTarget){
	                    var ulVisible = $('.jqTransformSelectWrapper ul:visible');
	                    ulVisible.each(function(){
	                        var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
	                        //do not hide if click on the label object associated to the select
	                        if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
	                    });
	                };

	                /* Check for an external click */
	                var jqTransformCheckExternalClick = function(event) {
	                    if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
	                };

	                var jqTransformAddDocumentListener = function (){
	                    $(document).mousedown(jqTransformCheckExternalClick);
	                };

	                if(plugin.jqtransform.selector){
	                    curform.find(plugin.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton();
	                    curform.find(plugin.jqtransform.selector).filter('input:text, input:password').jqTransInputText();
	                    curform.find(plugin.jqtransform.selector).filter('input:checkbox').jqTransCheckBox();
	                    curform.find(plugin.jqtransform.selector).filter('input:radio').jqTransRadio();
	                    curform.find(plugin.jqtransform.selector).filter('textarea').jqTransTextarea();
	                    if(curform.find(plugin.jqtransform.selector).filter("select").length > 0 ){
	                        curform.find(plugin.jqtransform.selector).filter("select").jqTransSelect();
	                        jqTransformAddDocumentListener();
	                    }

	                }else{
	                    curform.jqTransform();
	                }

	                curform.find(".jqTransformSelectWrapper").find("li a").click(function(){
	                    $(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur");
	                });
	            }

	        },

	        getNullmsg:function(curform){
	            var obj=this;
	            var reg=/[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g;
	            var nullmsg;

	            var label=curform[0].settings.label || ".Validform_label";
	            label=obj.siblings(label).eq(0).text() || obj.siblings().find(label).eq(0).text() || obj.parent().siblings(label).eq(0).text() || obj.parent().siblings().find(label).eq(0).text();
	            label=label.replace(/\s(?![a-zA-Z])/g,"").match(reg);
	            label=label? label.join("") : [""];

	            reg=/\{(.+)\|(.+)\}/;
	            nullmsg=curform.data("tipmsg").s || tipmsg.s;

	            if(label != ""){
	                nullmsg=nullmsg.replace(/\{0\|(.+)\}/,label);
	                if(obj.attr("recheck")){
	                    nullmsg=nullmsg.replace(/\{(.+)\}/,"");
	                    obj.attr("nullmsg",nullmsg);
	                    return nullmsg;
	                }
	            }else{
	                nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(/\{0\|(.+)\}/,"") : nullmsg.replace(/\{0\|(.+)\}/,"$1");
	            }
	            nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(reg,"$2") : nullmsg.replace(reg,"$1");

	            obj.attr("nullmsg",nullmsg);
	            return nullmsg;
	        },

	        getErrormsg:function(curform,datatype,recheck){
	            var regxp=/^(.+?)((\d+)-(\d+))?$/,
	                regxp2=/^(.+?)(\d+)-(\d+)$/,
	                regxp3=/(.*?)\d+(.+?)\d+(.*)/,
	                mac=datatype.match(regxp),
	                temp,str;

	            //如果是值不一样而报错;
	            if(recheck=="recheck"){
	                str=curform.data("tipmsg").reck || tipmsg.reck;
	                return str;
	            }

	            var tipmsg_w_ex=$.extend({},tipmsg.w,curform.data("tipmsg").w);

	            //如果原来就有，直接显示该项的提示信息;
	            if(mac[0] in tipmsg_w_ex){
	                return curform.data("tipmsg").w[mac[0]] || tipmsg.w[mac[0]];
	            }

	            //没有的话在提示对象里查找相似;
	            for(var name in tipmsg_w_ex){
	                if(name.indexOf(mac[1])!=-1 && regxp2.test(name)){
	                    str=(curform.data("tipmsg").w[name] || tipmsg.w[name]).replace(regxp3,"$1"+mac[3]+"$2"+mac[4]+"$3");
	                    curform.data("tipmsg").w[mac[0]]=str;

	                    return str;
	                }

	            }

	            return curform.data("tipmsg").def || tipmsg.def;
	        },

	        _regcheck:function(datatype,gets,obj,curform){
	            var curform=curform,
	                info=null,
	                passed=false,
	                reg=/\/.+\//g,
	                regex=/^(.+?)(\d+)-(\d+)$/,
	                type=3;//default set to wrong type, 2,3,4;

	            //datatype有三种情况：正则，函数和直接绑定的正则;

	            //直接是正则;
	            if(reg.test(datatype)){
	                var regstr=datatype.match(reg)[0].slice(1,-1);
	                var param=datatype.replace(reg,"");
	                var rexp=RegExp(regstr,param);

	                passed=rexp.test(gets);

	                //function;
	            }else if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object Function]"){
	                passed=Validform.util.dataType[datatype](gets,obj,curform,Validform.util.dataType);
	                if(passed === true || passed===undef){
	                    passed = true;
	                }else{
	                    info= passed;
	                    passed=false;
	                }

	                //自定义正则;
	            }else{
	                //自动扩展datatype;
	                if(!(datatype in Validform.util.dataType)){
	                    var mac=datatype.match(regex),
	                        temp;

	                    if(!mac){
	                        passed=false;
	                        info=curform.data("tipmsg").undef||tipmsg.undef;
	                    }else{
	                        for(var name in Validform.util.dataType){
	                            temp=name.match(regex);
	                            if(!temp){continue;}
	                            if(mac[1]===temp[1]){
	                                var str=Validform.util.dataType[name].toString(),
	                                    param=str.match(/\/[mgi]*/g)[1].replace("\/",""),
	                                    regxp=new RegExp("\\{"+temp[2]+","+temp[3]+"\\}","g");
	                                str=str.replace(/\/[mgi]*/g,"\/").replace(regxp,"{"+mac[2]+","+mac[3]+"}").replace(/^\//,"").replace(/\/$/,"");
	                                Validform.util.dataType[datatype]=new RegExp(str,param);
	                                break;
	                            }
	                        }
	                    }
	                }

	                if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object RegExp]"){
	                    passed=Validform.util.dataType[datatype].test(gets);
	                }

	            }


	            if(passed){
	                type=2;
	                info=obj.attr("sucmsg") || curform.data("tipmsg").r||tipmsg.r;

	                //规则验证通过后，还需要对绑定recheck的对象进行值比较;
	                if(obj.attr("recheck")){
	                    var theother=curform.find("input[name='"+obj.attr("recheck")+"']:first");
	                    if(gets!=theother.val()){
	                        passed=false;
	                        type=3;
	                        info=obj.attr("errormsg")  || Validform.util.getErrormsg.call(obj,curform,datatype,"recheck");
	                    }
	                }
	            }else{
	                info=info || obj.attr("errormsg") || Validform.util.getErrormsg.call(obj,curform,datatype);

	                //验证不通过且为空时;
	                if(Validform.util.isEmpty.call(obj,gets)){
	                    info=obj.attr("nullmsg") || Validform.util.getNullmsg.call(obj,curform);
	                }
	            }

	            return{
	                passed:passed,
	                type:type,
	                info:info
	            };

	        },

	        regcheck:function(datatype,gets,obj){
	            /*
	             datatype:datatype;
	             gets:inputvalue;
	             obj:input object;
	             */
	            var curform=this,
	                info=null,
	                passed=false,
	                type=3;//default set to wrong type, 2,3,4;

	            //ignore;
	            if(obj.attr("ignore")==="ignore" && Validform.util.isEmpty.call(obj,gets)){
	                if(obj.data("cked")){
	                    info="";
	                }

	                return {
	                    passed:true,
	                    type:4,
	                    info:info
	                };
	            }

	            obj.data("cked","cked");//do nothing if is the first time validation triggered;

	            var dtype=Validform.util.parseDatatype(datatype);
	            var res;
	            for(var eithor=0; eithor<dtype.length; eithor++){
	                for(var dtp=0; dtp<dtype[eithor].length; dtp++){
	                    res=Validform.util._regcheck(dtype[eithor][dtp],gets,obj,curform);
	                    if(!res.passed){
	                        break;
	                    }
	                }
	                if(res.passed){
	                    break;
	                }
	            }
	            return res;

	        },

	        parseDatatype:function(datatype){
	            /*
	             字符串里面只能含有一个正则表达式;
	             Datatype名称必须是字母，数字、下划线或*号组成;
	             datatype="/regexp/|phone|tel,s,e|f,e";
	             ==>[["/regexp/"],["phone"],["tel","s","e"],["f","e"]];
	             */

	            var reg=/\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,
	                dtype=datatype.match(reg),
	                sepor=datatype.replace(reg,"").replace(/\s*/g,"").split(""),
	                arr=[],
	                m=0;

	            arr[0]=[];
	            arr[0].push(dtype[0]);
	            for(var n=0;n<sepor.length;n++){
	                if(sepor[n]=="|"){
	                    m++;
	                    arr[m]=[];
	                }
	                arr[m].push(dtype[n+1]);
	            }

	            return arr;
	        },

	        showmsg:function(msg,type,o,triggered){
	            /*
	             msg:提示文字;
	             type:提示信息显示方式;
	             o:{obj:当前对象, type:1=>正在检测 | 2=>通过, sweep:true | false},
	             triggered:在blur或提交表单触发的验证中，有些情况不需要显示提示文字，如自定义弹出提示框的显示方式，不需要每次blur时就马上弹出提示;

	             tiptype:1\2\3时都有坑能会弹出自定义提示框
	             tiptype:1时在triggered bycheck时不弹框
	             tiptype:2\3时在ajax时弹框
	             tipSweep为true时在triggered bycheck时不触发showmsg，但ajax出错的情况下要提示
	             */

	            //如果msg为undefined，那么就没必要执行后面的操作，ignore有可能会出现这情况;
	            if(msg==undef){return;}

	            //tipSweep为true，且当前不是处于错误状态时，blur事件不触发信息显示;
	            if(triggered=="bycheck" && o.sweep && (o.obj && !o.obj.is(".Validform_error") || typeof type == "function")){return;}

	            $.extend(o,{curform:this});

	            if(typeof type == "function"){
	                type(msg,o,Validform.util.cssctl);
	                return;
	            }

	            if(type==1 || triggered=="byajax" && type!=4){
	                msgobj.find(".Validform_info").html(msg);
	            }

	            //tiptypt=1时，blur触发showmsg，验证是否通过都不弹框，提交表单触发的话，只要验证出错，就弹框;
	            if(type==1 && triggered!="bycheck" && o.type!=2 || triggered=="byajax" && type!=4){
	                msghidden=false;
	                msgobj.find(".iframe").css("height",msgobj.outerHeight());
	                msgobj.show();
	                setCenter(msgobj,100);
	            }

	            if(type==2 && o.obj){
	                o.obj.parent().next().find(".Validform_checktip").html(msg);
	                Validform.util.cssctl(o.obj.parent().next().find(".Validform_checktip"),o.type);
	            }

	            if((type==3 || type==4) && o.obj){
	                o.obj.siblings(".Validform_checktip").html(msg);
	                Validform.util.cssctl(o.obj.siblings(".Validform_checktip"),o.type);
	            }

	        },

	        cssctl:function(obj,status){
	            switch(status){
	                case 1:
	                    obj.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip Validform_loading");//checking;
	                    break;
	                case 2:
	                    obj.removeClass("Validform_wrong Validform_loading").addClass("Validform_checktip Validform_right");//passed;
	                    break;
	                case 4:
	                    obj.removeClass("Validform_right Validform_wrong Validform_loading").addClass("Validform_checktip");//for ignore;
	                    break;
	                default:
	                    obj.removeClass("Validform_right Validform_loading").addClass("Validform_checktip Validform_wrong");//wrong;
	            }
	        },

	        check:function(curform,subpost,bool){
	            /*
	             检测单个表单元素;
	             验证通过返回true，否则返回false、实时验证返回值为ajax;
	             bool，传入true则只检测不显示提示信息;
	             */
	            var settings=curform[0].settings;
	            var subpost=subpost || "";
	            var inputval=Validform.util.getValue.call(curform,$(this));

	            //隐藏或绑定dataIgnore的表单对象不做验证;
	            if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
	                return true;
	            }

	            //dragonfly=true时，没有绑定ignore，值为空不做验证，但验证不通过;
	            if(settings.dragonfly && !$(this).data("cked") && Validform.util.isEmpty.call($(this),inputval) && $(this).attr("ignore")!="ignore"){
	                return false;
	            }

	            var flag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));

	            //值没变化不做检测，这时要考虑recheck情况;
	            //不是在提交表单时触发的ajax验证;
	            if(inputval==this.validform_lastval && !$(this).attr("recheck") && subpost==""){
	                return flag.passed ? true : false;
	            }

	            this.validform_lastval=inputval;//存储当前值;

	            var _this;
	            errorobj=_this=$(this);

	            if(!flag.passed){
	                //取消正在进行的ajax验证;
	                Validform.util.abort.call(_this[0]);

	                if(!bool){
	                    //传入"bycheck"，指示当前是check方法里调用的，当tiptype=1时，blur事件不让触发错误信息显示;
	                    Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");

	                    !settings.tipSweep && _this.addClass("Validform_error");
	                }
	                return false;
	            }

	            //验证通过的话，如果绑定有ajaxurl，要执行ajax检测;
	            //当ignore="ignore"时，为空值可以通过验证，这时不需要ajax检测;
	            var ajaxurl=$(this).attr("ajaxurl");
	            if(ajaxurl && !Validform.util.isEmpty.call($(this),inputval) && !bool){
	                var inputobj=$(this);

	                //当提交表单时，表单中的某项已经在执行ajax检测，这时需要让该项ajax结束后继续提交表单;
	                if(subpost=="postform"){
	                    inputobj[0].validform_subpost="postform";
	                }else{
	                    inputobj[0].validform_subpost="";
	                }

	                if(inputobj[0].validform_valid==="posting" && inputval==inputobj[0].validform_ckvalue){return "ajax";}

	                inputobj[0].validform_valid="posting";
	                inputobj[0].validform_ckvalue=inputval;
	                Validform.util.showmsg.call(curform,curform.data("tipmsg").c||tipmsg.c,settings.tiptype,{obj:inputobj,type:1,sweep:settings.tipSweep},"bycheck");

	                Validform.util.abort.call(_this[0]);

	                var ajaxsetup=$.extend(true,{},settings.ajaxurl || {});

	                var localconfig={
	                    type: "POST",
	                    cache:false,
	                    url: ajaxurl,
	                    data: "param="+encodeURIComponent(inputval)+"&name="+encodeURIComponent($(this).attr("name")),
	                    success: function(data){
	                        if($.trim(data.status)==="y"){
	                            inputobj[0].validform_valid="true";
	                            data.info && inputobj.attr("sucmsg",data.info);
	                            Validform.util.showmsg.call(curform,inputobj.attr("sucmsg") || curform.data("tipmsg").r||tipmsg.r,settings.tiptype,{obj:inputobj,type:2,sweep:settings.tipSweep},"bycheck");
	                            _this.removeClass("Validform_error");
	                            errorobj=null;
	                            if(inputobj[0].validform_subpost=="postform"){
	                                curform.trigger("submit");
	                            }
	                        }else{
	                            inputobj[0].validform_valid=data.info;
	                            Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
	                            _this.addClass("Validform_error");
	                        }
	                        _this[0].validform_ajax=null;
	                    },
	                    error: function(data){
	                        if(data.status=="200"){
	                            if(data.responseText=="y"){
	                                ajaxsetup.success({"status":"y"});
	                            }else{
	                                ajaxsetup.success({"status":"n","info":data.responseText});
	                            }
	                            return false;
	                        }

	                        //正在检测时，要检测的数据发生改变，这时要终止当前的ajax。不是这种情况引起的ajax错误，那么显示相关错误信息;
	                        if(data.statusText!=="abort"){
	                            var msg="status: "+data.status+"; statusText: "+data.statusText;

	                            Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
	                            _this.addClass("Validform_error");
	                        }

	                        inputobj[0].validform_valid=data.statusText;
	                        _this[0].validform_ajax=null;

	                        //localconfig.error返回true表示还需要执行temp_err;
	                        return true;
	                    }
	                }

	                if(ajaxsetup.success){
	                    var temp_suc=ajaxsetup.success;
	                    ajaxsetup.success=function(data){
	                        localconfig.success(data);
	                        temp_suc(data,inputobj);
	                    }
	                }

	                if(ajaxsetup.error){
	                    var temp_err=ajaxsetup.error;
	                    ajaxsetup.error=function(data){
	                        //localconfig.error返回false表示不需要执行temp_err;
	                        localconfig.error(data) && temp_err(data,inputobj);
	                    }
	                }

	                ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});
	                _this[0].validform_ajax=$.ajax(ajaxsetup);

	                return "ajax";
	            }else if(ajaxurl && Validform.util.isEmpty.call($(this),inputval)){
	                Validform.util.abort.call(_this[0]);
	                _this[0].validform_valid="true";
	            }

	            if(!bool){
	                Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");
	                _this.removeClass("Validform_error");
	            }
	            errorobj=null;

	            return true;

	        },

	        submitForm:function(settings,flg,url,ajaxPost,sync){
	            /*
	             flg===true时跳过验证直接提交;
	             ajaxPost==="ajaxPost"指示当前表单以ajax方式提交;
	             */
	            var curform=this;

	            //表单正在提交时点击提交按钮不做反应;
	            if(curform[0].validform_status==="posting"){return false;}

	            //要求只能提交一次时;
	            if(settings.postonce && curform[0].validform_status==="posted"){return false;}

	            var beforeCheck=settings.beforeCheck && settings.beforeCheck(curform);
	            if(beforeCheck===false){return false;}

	            var flag=true,
	                inflag;

	            curform.find("[datatype]").each(function(){
	                //跳过验证;
	                if(flg){
	                    return false;
	                }

	                //隐藏或绑定dataIgnore的表单对象不做验证;
	                if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
	                    return true;
	                }

	                var inputval=Validform.util.getValue.call(curform,$(this)),
	                    _this;
	                errorobj=_this=$(this);

	                inflag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));

	                if(!inflag.passed){
	                    Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
	                    _this.addClass("Validform_error");

	                    if(!settings.showAllError){
	                        _this.focus();
	                        flag=false;
	                        return false;
	                    }

	                    flag && (flag=false);
	                    return true;
	                }

	                //当ignore="ignore"时，为空值可以通过验证，这时不需要ajax检测;
	                if($(this).attr("ajaxurl") && !Validform.util.isEmpty.call($(this),inputval)){
	                    if(this.validform_valid!=="true"){
	                        var thisobj=$(this);
	                        Validform.util.showmsg.call(curform,curform.data("tipmsg").v||tipmsg.v,settings.tiptype,{obj:thisobj,type:3,sweep:settings.tipSweep});
	                        _this.addClass("Validform_error");

	                        thisobj.trigger("blur",["postform"]);//continue the form post;

	                        if(!settings.showAllError){
	                            flag=false;
	                            return false;
	                        }

	                        flag && (flag=false);
	                        return true;
	                    }
	                }else if($(this).attr("ajaxurl") && Validform.util.isEmpty.call($(this),inputval)){
	                    Validform.util.abort.call(this);
	                    this.validform_valid="true";
	                }

	                Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
	                _this.removeClass("Validform_error");
	                errorobj=null;
	            });

	            if(settings.showAllError){
	                curform.find(".Validform_error:first").focus();
	            }

	            if(flag){
	                var beforeSubmit=settings.beforeSubmit && settings.beforeSubmit(curform);
	                if(beforeSubmit===false){return false;}

	                curform[0].validform_status="posting";

	                if(settings.ajaxPost || ajaxPost==="ajaxPost"){
	                    //获取配置参数;
	                    var ajaxsetup=$.extend(true,{},settings.ajaxpost || {});
	                    //有可能需要动态的改变提交地址，所以把action所指定的url层级设为最低;
	                    ajaxsetup.url=url || ajaxsetup.url || settings.url || curform.attr("action");

	                    //byajax：ajax时，tiptye为1、2或3需要弹出提示框;
	                    Validform.util.showmsg.call(curform,curform.data("tipmsg").p||tipmsg.p,settings.tiptype,{obj:curform,type:1,sweep:settings.tipSweep},"byajax");

	                    //方法里的优先级要高;
	                    //有undefined情况;
	                    if(sync){
	                        ajaxsetup.async=false;
	                    }else if(sync===false){
	                        ajaxsetup.async=true;
	                    }

	                    if(ajaxsetup.success){
	                        var temp_suc=ajaxsetup.success;
	                        ajaxsetup.success=function(data){
	                            settings.callback && settings.callback(data);
	                            curform[0].validform_ajax=null;
	                            if($.trim(data.status)==="y"){
	                                curform[0].validform_status="posted";
	                            }else{
	                                curform[0].validform_status="normal";
	                            }

	                            temp_suc(data,curform);
	                        }
	                    }

	                    if(ajaxsetup.error){
	                        var temp_err=ajaxsetup.error;
	                        ajaxsetup.error=function(data){
	                            settings.callback && settings.callback(data);
	                            curform[0].validform_status="normal";
	                            curform[0].validform_ajax=null;

	                            temp_err(data,curform);
	                        }
	                    }

	                    var localconfig={
	                        type: "POST",
	                        async:true,
	                        data: curform.serializeArray(),
	                        success: function(data){
	                            if($.trim(data.status)==="y"){
	                                //成功提交;
	                                curform[0].validform_status="posted";
	                                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:2,sweep:settings.tipSweep},"byajax");
	                            }else{
	                                //提交出错;
	                                curform[0].validform_status="normal";
	                                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");
	                            }

	                            settings.callback && settings.callback(data);
	                            curform[0].validform_ajax=null;
	                        },
	                        error: function(data){
	                            var msg="status: "+data.status+"; statusText: "+data.statusText;

	                            Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");

	                            settings.callback && settings.callback(data);
	                            curform[0].validform_status="normal";
	                            curform[0].validform_ajax=null;
	                        }
	                    }

	                    ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});

	                    curform[0].validform_ajax=$.ajax(ajaxsetup);

	                }else{
	                    if(!settings.postonce){
	                        curform[0].validform_status="normal";
	                    }

	                    var url=url || settings.url;
	                    if(url){
	                        curform.attr("action",url);
	                    }

	                    return settings.callback && settings.callback(curform);
	                }
	            }

	            return false;

	        },

	        resetForm:function(){
	            var brothers=this;
	            brothers.each(function(){
	                this.reset && this.reset();
	                this.validform_status="normal";
	            });

	            brothers.find(".Validform_right").text("");
	            brothers.find(".passwordStrength").children().removeClass("bgStrength");
	            brothers.find(".Validform_checktip").removeClass("Validform_wrong Validform_right Validform_loading");
	            brothers.find(".Validform_error").removeClass("Validform_error");
	            brothers.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function(){
	                this.validform_lastval=null;
	            });
	            brothers.eq(0).find("input:first").focus();
	        },

	        abort:function(){
	            if(this.validform_ajax){
	                this.validform_ajax.abort();
	            }
	        }

	    }

	    $.Datatype=Validform.util.dataType;

	    Validform.prototype={
	        dataType:Validform.util.dataType,

	        eq:function(n){
	            var obj=this;

	            if(n>=obj.forms.length){
	                return null;
	            }

	            if(!(n in obj.objects)){
	                obj.objects[n]=new Validform($(obj.forms[n]).get(),{},true);
	            }

	            return obj.objects[n];

	        },

	        resetStatus:function(){
	            var obj=this;
	            $(obj.forms).each(function(){
	                this.validform_status="normal";
	            });

	            return this;
	        },

	        setStatus:function(status){
	            var obj=this;
	            $(obj.forms).each(function(){
	                this.validform_status=status || "posting";
	            });

	            return this;
	        },

	        getStatus:function(){
	            var obj=this;
	            var status=$(obj.forms)[0].validform_status;

	            return status;
	        },

	        ignore:function(selector){
	            var obj=this;
	            var selector=selector || "[datatype]"

	            $(obj.forms).find(selector).each(function(){
	                $(this).data("dataIgnore","dataIgnore").removeClass("Validform_error");
	            });

	            return this;
	        },

	        unignore:function(selector){
	            var obj=this;
	            var selector=selector || "[datatype]"

	            $(obj.forms).find(selector).each(function(){
	                $(this).removeData("dataIgnore");
	            });

	            return this;
	        },

	        addRule:function(rule){
	            /*
	             rule => [{
	             ele:"#id",
	             datatype:"*",
	             errormsg:"出错提示文字！",
	             nullmsg:"为空时的提示文字！",
	             tip:"默认显示的提示文字",
	             altercss:"gray",
	             ignore:"ignore",
	             ajaxurl:"valid.php",
	             recheck:"password",
	             plugin:"passwordStrength"
	             },{},{},...]
	             */
	            var obj=this;
	            var rule=rule || [];

	            for(var index=0; index<rule.length; index++){
	                var o=$(obj.forms).find(rule[index].ele);
	                for(var attr in rule[index]){
	                    attr !=="ele" && o.attr(attr,rule[index][attr]);
	                }
	            }

	            $(obj.forms).each(function(){
	                var $this=$(this);
	                Validform.util.enhance.call($this,this.settings.tiptype,this.settings.usePlugin,this.settings.tipSweep,"addRule");
	            });

	            return this;
	        },

	        ajaxPost:function(flag,sync,url){
	            var obj=this;

	            $(obj.forms).each(function(){
	                //创建pop box;
	                if( this.settings.tiptype==1 || this.settings.tiptype==2 || this.settings.tiptype==3 ){
	                    creatMsgbox();
	                }

	                Validform.util.submitForm.call($(obj.forms[0]),this.settings,flag,url,"ajaxPost",sync);
	            });

	            return this;
	        },

	        submitForm:function(flag,url){
	            /*flag===true时不做验证直接提交*/


	            var obj=this;

	            $(obj.forms).each(function(){
	                var subflag=Validform.util.submitForm.call($(this),this.settings,flag,url);
	                subflag === undef && (subflag=true);
	                if(subflag===true){
	                    this.submit();
	                }
	            });

	            return this;
	        },

	        resetForm:function(){
	            var obj=this;
	            Validform.util.resetForm.call($(obj.forms));

	            return this;
	        },

	        abort:function(){
	            var obj=this;
	            $(obj.forms).each(function(){
	                Validform.util.abort.call(this);
	            });

	            return this;
	        },

	        check:function(bool,selector){
	            /*
	             bool：传入true，只检测不显示提示信息;
	             */

	            var selector=selector || "[datatype]",
	                obj=this,
	                curform=$(obj.forms),
	                flag=true;

	            curform.find(selector).each(function(){
	                Validform.util.check.call(this,curform,"",bool) || (flag=false);
	            });

	            return flag;
	        },

	        config:function(setup){
	            /*
	             config={
	             url:"ajaxpost.php",//指定了url后，数据会提交到这个地址;
	             ajaxurl:{
	             timeout:1000,
	             ...
	             },
	             ajaxpost:{
	             timeout:1000,
	             ...
	             }
	             }
	             */
	            var obj=this;
	            setup=setup || {};
	            $(obj.forms).each(function(){
	                var $this=$(this);
	                this.settings=$.extend(true,this.settings,setup);
	                Validform.util.enhance.call($this,this.settings.tiptype,this.settings.usePlugin,this.settings.tipSweep);
	            });

	            return this;
	        }
	    }

	    $.fn.Validform=function(settings){
	        return new Validform(this,settings);
	    };

	    function setCenter(obj,time){
	        var left=($(window).width()-obj.outerWidth())/2,
	            top=($(window).height()-obj.outerHeight())/2,

	            top=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(top>0?top:0);

	        obj.css({
	            left:left
	        }).animate({
	            top : top
	        },{ duration:time , queue:false });
	    }

	    function creatMsgbox(){
	        if($("#Validform_msg").length!==0){return false;}
	        msgobj=$('<div id="Validform_msg"><div class="Validform_title">'+tipmsg.tit+'<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body");//提示信息框;
	        msgobj.find("a.Validform_close").click(function(){
	            msgobj.hide();
	            msghidden=true;
	            if(errorobj){
	                errorobj.focus().addClass("Validform_error");
	            }
	            return false;
	        }).focus(function(){this.blur();});

	        $(window).bind("scroll resize",function(){
	            !msghidden && setCenter(msgobj,400);
	        });
	    };

	    //公用方法显示&关闭信息提示框;
	    $.Showmsg=function(msg){
	        creatMsgbox();
	        Validform.util.showmsg.call(win,msg,1,{});
	    };

	    $.Hidemsg=function(){
	        msgobj.hide();
	        msghidden=true;
	    };

	})(jQuery,window);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(50);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./validform.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./validform.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, ".Validform_error {\n  border-color: red!important;\n}\n.Validform_wrong,\n.error-data {\n  color: red;\n}\n.error-data {\n  display: none;\n}\n.Validform_right {\n  display: none!important;\n}\n", ""]);

	// exports


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(52);

	__webpack_require__(54);
	var libUtil = __webpack_require__(56);

	var template = __webpack_require__(55);

	//区域选择
	module.exports = {


	    init: function(obj){

	        //var tpl = '<div class="selectdialog" id="SelectDialog">' +
	        //    '<div class="select-dia-mask">' +
	        //    '</div>' +
	        //    '<div class="select-dia-table">' +
	        //    '<div class="select-dia-cell"></div>' +
	        //    '</div>' +
	        //    '</div>' +
	        //    '</div>'
	        // ;
	        //$(tpl).appendTo('body');
	        var json = {
	            innerWidth: 0,
	            outerWidth: 0,
	            innerHeight: 0,
	            outerHeight: 0,
	            width: 0,
	            height: 0,
	            ratio: 0
	        };
	        json.innerWidth = window.innerWidth;
	        json.outerWidth = window.outerWidth
	        json.innerHeight = window.innerHeight;
	        json.outerHeight = window.outerHeight;
	        json.width = screen.width;
	        json.height = screen.height;
	        json.ratio = window.devicePixelRatio;
	        var text = JSON.stringify(json);
	        var $SelectDialog ;
	        var $selectBtn ;
	        if (obj && obj.targetBtn){
	            $selectBtn = $(obj.targetBtn);
	        } else {
	          $selectBtn = $("[data-select-area = 'true']");
	        }


	        $SelectDialog = $('#SelectDialog');

	        //选择事件
	        $SelectDialog.on("click", ".select-dia-check", function () {
	            var target = $($(this).attr("data-target"));
	            var val = $(this).attr("data-value");
	            target.val(val);
	            target.blur();
	            target.parent().find(".input").text($(this).text());
	            HideDialog();
	        });

	        //加载
	        $("[data-select='true']").on("click", function () {
	            $(this).text("");
	            GetSelectData($(this));
	        });
	        var callback;
	        //选择省份
	        $selectBtn.on("click", function () {
	            if (!obj  ||  !obj.callback){
	                 callback = function(value) {
	                    var urlParams = libUtil.parseQuery();
	                    urlParams['loc'] = value[1];
	                    var href = libUtil.getUrlFormParams({
	                        loc: value[1]
	                    });
	                    window.location.href = href;
	                }
	            } else {
	                callback = obj.callback;
	            }
	            GetAreaSelect($(this), callback);
	        });

	        //选择
	        $SelectDialog.on("focus", ".birthmin, .birthadd", function () {
	            return false;
	        });


	//验证

	//普通弹出框
	        function GetSelectData(current) {
	            var selectdata = $("<div/>").html(current.attr("data-select-data")).text();
	            var jsonarray = JSON.parse(selectdata);
	            var data = { title: "", target: "", list: [{}] }
	            data.title = current.attr("data-select-title");
	            data.target = current.attr('data-select-target');
	            data.list = jsonarray;
	            var $dialog = LoadDialog("dialogselect", data);
	        }

	//隐藏选择框
	        function HideDialog() {
	            $SelectDialog.addClass("hi");
	            setTimeout(function () {
	                $SelectDialog.hide().find(".select-dia").empty();
	            }, 500)
	        }
	//加载弹出选择框
	        function LoadDialog(templateid, data) {
	            var html = template(templateid, data);
	            $SelectDialog.find(".select-dia").html(html);
	            $SelectDialog.removeClass("hi").show();
	            return $SelectDialog;
	        }


	//地区弹出框
	        function GetAreaSelect($current, callback) {

	            var targetArray = $current.attr("data-select-target").split(",");
	            var $first = $(targetArray[0]);
	            var firstData = $first.attr("data-select-data");
	            var json = { title: $current.data("select-title"), list: 0, target: targetArray[0] }
	            var values = new Array();
	            for (var i = 1; i < PCAP.length; i++) {
	                values[i - 1] = { Key: i, Value: PCAP[i] };
	            }
	            var selectValue = [];
	            json.list = values;
	            var $dialog = LoadDialog("dialogarea", json);
	            //省级
	            $dialog.find(".select-area-check").off('click').on("click", function () {

	                var val = $(this).attr("data-value");
	                var ptarget = $($(this).attr("data-target"));
	                ptarget.val(val);
	                selectValue.push(val);
	                ptarget.blur();
	                var index = $(this).attr("data-index");
	                var citys = PCAC[index];
	                var jsoncity = { title: val, list: 0, target: targetArray[1] };
	                var cityvalues = new Array();
	                for (var i = 1; i < citys.length; i++) {
	                    cityvalues[i - 1] = { Key: i, Value: citys[i] };
	                }
	                jsoncity.list = cityvalues;
	                var $mydialog = LoadDialog("dialogarea", jsoncity);
	                //城市
	                $mydialog.find(".select-area-check").off('click').on("click", function () {

	                    var val = $(this).attr("data-value");
	                    selectValue.push(val);
	                    callback(selectValue)

	                    HideDialog();
	                });
	            })
	        }


	    }
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(53);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./reg.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./reg.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, ".middle .input {\n  border: none;\n  background: none;\n  height: 42px;\n  padding: 0px;\n  margin-left: 95px;\n  line-height: 44px;\n  width: 70%;\n  display: inline-block;\n  text-align: left;\n  outline: none;\n  cursor: pointer;\n}\n/*弹出层*/\n.selectdialog {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  display: none;\n  transition: 0.5s;\n}\n.selectdialog.hi {\n  opacity: 0;\n}\n.select-dia-mask {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  background: #333;\n  opacity: 0.7;\n  z-index: 10;\n}\n.select-dia-table {\n  display: table;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n  overflow: hidden;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  vertical-align: middle;\n}\n.select-dia-cell {\n  display: table-cell;\n  vertical-align: middle;\n}\n.select-dia {\n  margin: 13% auto;\n  width: 78%;\n  background: #FFF;\n  min-height: 50px;\n  z-index: 100;\n  padding: 20px 40px;\n  overflow-x: hidden;\n}\n.select-dia h3 {\n  font-size: 16px;\n  color: #f95e7e;\n  border-bottom: 1px solid #bcbcbc;\n  padding: 0 0 20px 10px;\n  margin: 0px;\n}\n.select-dia .select-dia-con {\n  width: 100%;\n  overflow-x: hidden;\n}\n.select-dia .select-dia-list {\n  display: block;\n  max-height: 300px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  margin-right: -20px;\n}\n.select-dia .select-dia-list li {\n  font-size: 14px;\n  border-bottom: 1px solid #d5d5d5;\n  line-height: 41px;\n  height: 41px;\n  padding: 0px 10px;\n  margin: 0px;\n  display: block;\n  cursor: pointer;\n}\n.select-dia .select-dia-list li:last-child {\n  border: none;\n}\n.select-dia .select-dia-list li:hover,\n.select-dia .select-dia-list li:active,\n.select-dia .select-dia-list li:focus,\n.select-dia .select-dia-list li:visited {\n  background: #f95e7e;\n  color: #FFF;\n}\n/*birth*/\n.dialogbirth {\n  padding: 10px 0px;\n  border-bottom: 1px solid #bcbcbc;\n}\n.dialogbirth .col-sm-4 {\n  text-align: center;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.dialogbirth .birthmin,\n.dialogbirth .birthadd {\n  display: block;\n  position: absolute;\n  width: 100%;\n  left: 0px;\n  text-align: center;\n  height: 40px;\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 40px;\n  cursor: pointer;\n  -webkit-user-select: none;\n}\n.dialogbirth .birthmin:hover,\n.dialogbirth .birthadd:hover {\n  color: #be2f5d;\n}\n.dialogbirth .birthadd {\n  top: 0px;\n}\n.dialogbirth input {\n  margin: 40px 0px;\n  text-align: center;\n  font-weight: bold;\n  font-size: 12px;\n  padding: 5px;\n}\n.dialogbirth .birthmin {\n  bottom: 0px;\n}\n.birthsubmit {\n  text-align: center;\n}\n.birthsubmit button {\n  padding-left: 30px;\n  padding-right: 30px;\n  color: #bd2b5a;\n}\n", ""]);

	// exports


/***/ },
/* 54 */
/***/ function(module, exports) {

	
	/* PCAS (Province City Area Selector 省、市、地区联动选择JS封装类) Ver 2.02 完整版 *\

	 　制作时间:2005-12-30
	 　更新时间:2006-01-24
	 　数据修正:2012-01-17（截止2011年10月31日）

	 　演示地址:http://www.popub.net/script/pcasunzip.html
	 　下载地址:http://www.popub.net/script/pcasunzip.js
	 　应用说明:页面包含<script type="text/javascript" src="pcasunzip.js" charset="gb2312"></script>
	 省市联动
	 new PCAS("Province","City")
	 new PCAS("Province","City","吉林省")
	 new PCAS("Province","City","吉林省","吉林市")
	 省市地区联动
	 new PCAS("Province","City","Area")
	 new PCAS("Province","City","Area","吉林省")
	 new PCAS("Province","City","Area","吉林省","松原市")
	 new PCAS("Province","City","Area","吉林省","松原市","宁江区")
	 省、市、地区对象取得的值均为实际值。
	 注：省、市、地区提示信息选项的值为""(空字符串)

	 \*** 程序制作/版权所有:崔永祥(333) E-Mail:zhadan007@21cn.com 网址:http://www.popub.net ***/


	SPT="--请选择省份--";

	SCT="--请选择城市--";

	SAT="--请选择地区--";

	ShowT=1;
	//提示文字 0:不显示 1:显示
	PCAD="北京$东城|西城|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|怀柔|平谷|密云|延庆#天津市$市辖区|和平区|河东区|河西区|南开区|河北区|红桥区|东丽区|西青区|津南区|北辰区|武清区|宝坻区|滨海新区#河北省$石家庄市,市辖区,长安区,桥东区,桥西区,新华区,井陉矿区,裕华区,井陉县,正定县,栾城县,行唐县,灵寿县,高邑县,深泽县,赞皇县,无极县,平山县,元氏县,赵县,辛集市,藁城市,晋州市,新乐市,鹿泉市|唐山市,市辖区,路南区,路北区,古冶区,开平区,丰南区,丰润区,滦县,滦南县,乐亭县,迁西县,玉田县,唐海县,遵化市,迁安市|秦皇岛市,市辖区,海港区,山海关区,北戴河区,青龙满族自治县,昌黎县,抚宁县,卢龙县|邯郸市,市辖区,邯山区,丛台区,复兴区,峰峰矿区,邯郸县,临漳县,成安县,大名县,涉县,磁县,肥乡县,永年县,邱县,鸡泽县,广平县,馆陶县,魏县,曲周县,武安市|邢台市,市辖区,桥东区,桥西区,邢台县,临城县,内丘县,柏乡县,隆尧县,任县,南和县,宁晋县,巨鹿县,新河县,广宗县,平乡县,威县,清河县,临西县,南宫市,沙河市|保定市,市辖区,新市区,北市区,南市区,满城县,清苑县,涞水县,阜平县,徐水县,定兴县,唐县,高阳县,容城县,涞源县,望都县,安新县,易县,曲阳县,蠡县,顺平县,博野县,雄县,涿州市,定州市,安国市,高碑店市|张家口市,市辖区,桥东区,桥西区,宣化区,下花园区,宣化县,张北县,康保县,沽源县,尚义县,蔚县,阳原县,怀安县,万全县,怀来县,涿鹿县,赤城县,崇礼县|承德市,市辖区,双桥区,双滦区,鹰手营子矿区,承德县,兴隆县,平泉县,滦平县,隆化县,丰宁满族自治县,宽城满族自治县,围场满族蒙古族自治县|沧州市,市辖区,新华区,运河区,沧县,青县,东光县,海兴县,盐山县,肃宁县,南皮县,吴桥县,献县,孟村回族自治县,泊头市,任丘市,黄骅市,河间市|廊坊市,市辖区,安次区,广阳区,固安县,永清县,香河县,大城县,文安县,大厂回族自治县,霸州市,三河市|衡水市,市辖区,桃城区,枣强县,武邑县,武强县,饶阳县,安平县,故城县,景县,阜城县,冀州市,深州市#山西省$太原市,市辖区,小店区,迎泽区,杏花岭区,尖草坪区,万柏林区,晋源区,清徐县,阳曲县,娄烦县,古交市|大同市,市辖区,城区,矿区,南郊区,新荣区,阳高县,天镇县,广灵县,灵丘县,浑源县,左云县,大同县|阳泉市,市辖区,城区,矿区,郊区,平定县,盂县|长治市,市辖区,城区,郊区,长治县,襄垣县,屯留县,平顺县,黎城县,壶关县,长子县,武乡县,沁县,沁源县,潞城市|晋城市,市辖区,城区,沁水县,阳城县,陵川县,泽州县,高平市|朔州市,市辖区,朔城区,平鲁区,山阴县,应县,右玉县,怀仁县|晋中市,市辖区,榆次区,榆社县,左权县,和顺县,昔阳县,寿阳县,太谷县,祁县,平遥县,灵石县,介休市|运城市,市辖区,盐湖区,临猗县,万荣县,闻喜县,稷山县,新绛县,绛县,垣曲县,夏县,平陆县,芮城县,永济市,河津市|忻州市,市辖区,忻府区,定襄县,五台县,代县,繁峙县,宁武县,静乐县,神池县,五寨县,岢岚县,河曲县,保德县,偏关县,原平市|临汾市,市辖区,尧都区,曲沃县,翼城县,襄汾县,洪洞县,古县,安泽县,浮山县,吉县,乡宁县,大宁县,隰县,永和县,蒲县,汾西县,侯马市,霍州市|吕梁市,市辖区,离石区,文水县,交城县,兴县,临县,柳林县,石楼县,岚县,方山县,中阳县,交口县,孝义市,汾阳市#内蒙古自治区$呼和浩特市,市辖区,新城区,回民区,玉泉区,赛罕区,土默特左旗,托克托县,和林格尔县,清水河县,武川县|包头市,市辖区,东河区,昆都仑区,青山区,石拐区,白云鄂博矿区,九原区,土默特右旗,固阳县,达尔罕茂明安联合旗|乌海市,市辖区,海勃湾区,海南区,乌达区|赤峰市,市辖区,红山区,元宝山区,松山区,阿鲁科尔沁旗,巴林左旗,巴林右旗,林西县,克什克腾旗,翁牛特旗,喀喇沁旗,宁城县,敖汉旗|通辽市,市辖区,科尔沁区,科尔沁左翼中旗,科尔沁左翼后旗,开鲁县,库伦旗,奈曼旗,扎鲁特旗,霍林郭勒市|鄂尔多斯市,市辖区,东胜区,达拉特旗,准格尔旗,鄂托克前旗,鄂托克旗,杭锦旗,乌审旗,伊金霍洛旗|呼伦贝尔市,市辖区,海拉尔区,阿荣旗,莫力达瓦达斡尔族自治旗,鄂伦春自治旗,鄂温克族自治旗,陈巴尔虎旗,新巴尔虎左旗,新巴尔虎右旗,满洲里市,牙克石市,扎兰屯市,额尔古纳市,根河市|巴彦淖尔市,市辖区,临河区,五原县,磴口县,乌拉特前旗,乌拉特中旗,乌拉特后旗,杭锦后旗|乌兰察布市,市辖区,集宁区,卓资县,化德县,商都县,兴和县,凉城县,察哈尔右翼前旗,察哈尔右翼中旗,察哈尔右翼后旗,四子王旗,丰镇市|兴安盟,乌兰浩特市,阿尔山市,科尔沁右翼前旗,科尔沁右翼中旗,扎赉特旗,突泉县|锡林郭勒盟,二连浩特市,锡林浩特市,阿巴嘎旗,苏尼特左旗,苏尼特右旗,东乌珠穆沁旗,西乌珠穆沁旗,太仆寺旗,镶黄旗,正镶白旗,正蓝旗,多伦县|阿拉善盟,阿拉善左旗,阿拉善右旗,额济纳旗#辽宁省$沈阳市,市辖区,和平区,沈河区,大东区,皇姑区,铁西区,苏家屯区,东陵区,沈北新区,于洪区,辽中县,康平县,法库县,新民市|大连市,市辖区,中山区,西岗区,沙河口区,甘井子区,旅顺口区,金州区,长海县,瓦房店市,普兰店市,庄河市|鞍山市,市辖区,铁东区,铁西区,立山区,千山区,台安县,岫岩满族自治县,海城市|抚顺市,市辖区,新抚区,东洲区,望花区,顺城区,抚顺县,新宾满族自治县,清原满族自治县|本溪市,市辖区,平山区,溪湖区,明山区,南芬区,本溪满族自治县,桓仁满族自治县|丹东市,市辖区,元宝区,振兴区,振安区,宽甸满族自治县,东港市,凤城市|锦州市,市辖区,古塔区,凌河区,太和区,黑山县,义县,凌海市,北镇市|营口市,市辖区,站前区,西市区,鲅鱼圈区,老边区,盖州市,大石桥市|阜新市,市辖区,海州区,新邱区,太平区,清河门区,细河区,阜新蒙古族自治县,彰武县|辽阳市,市辖区,白塔区,文圣区,宏伟区,弓长岭区,太子河区,辽阳县,灯塔市|盘锦市,市辖区,双台子区,兴隆台区,大洼县,盘山县|铁岭市,市辖区,银州区,清河区,铁岭县,西丰县,昌图县,调兵山市,开原市|朝阳市,市辖区,双塔区,龙城区,朝阳县,建平县,喀喇沁左翼蒙古族自治县,北票市,凌源市|葫芦岛市,市辖区,连山区,龙港区,南票区,绥中县,建昌县,兴城市#吉林省$长春市,市辖区,南关区,宽城区,朝阳区,二道区,绿园区,双阳区,农安县,九台市,榆树市,德惠市|吉林市,市辖区,昌邑区,龙潭区,船营区,丰满区,永吉县,蛟河市,桦甸市,舒兰市,磐石市|四平市,市辖区,铁西区,铁东区,梨树县,伊通满族自治县,公主岭市,双辽市|辽源市,市辖区,龙山区,西安区,东丰县,东辽县|通化市,市辖区,东昌区,二道江区,通化县,辉南县,柳河县,梅河口市,集安市|白山市,市辖区,八道江区,江源区,抚松县,靖宇县,长白朝鲜族自治县,临江市|松原市,市辖区,宁江区,前郭尔罗斯蒙古族自治县,长岭县,乾安县,扶余县|白城市,市辖区,洮北区,镇赉县,通榆县,洮南市,大安市|延边朝鲜族自治州,延吉市,图们市,敦化市,珲春市,龙井市,和龙市,汪清县,安图县#黑龙江省$哈尔滨市,市辖区,道里区,南岗区,道外区,平房区,松北区,香坊区,呼兰区,阿城区,依兰县,方正县,宾县,巴彦县,木兰县,通河县,延寿县,双城市,尚志市,五常市|齐齐哈尔市,市辖区,龙沙区,建华区,铁锋区,昂昂溪区,富拉尔基区,碾子山区,梅里斯达斡尔族区,龙江县,依安县,泰来县,甘南县,富裕县,克山县,克东县,拜泉县,讷河市|鸡西市,市辖区,鸡冠区,恒山区,滴道区,梨树区,城子河区,麻山区,鸡东县,虎林市,密山市|鹤岗市,市辖区,向阳区,工农区,南山区,兴安区,东山区,兴山区,萝北县,绥滨县|双鸭山市,市辖区,尖山区,岭东区,四方台区,宝山区,集贤县,友谊县,宝清县,饶河县|大庆市,市辖区,萨尔图区,龙凤区,让胡路区,红岗区,大同区,肇州县,肇源县,林甸县,杜尔伯特蒙古族自治县|伊春市,市辖区,伊春区,南岔区,友好区,西林区,翠峦区,新青区,美溪区,金山屯区,五营区,乌马河区,汤旺河区,带岭区,乌伊岭区,红星区,上甘岭区,嘉荫县,铁力市|佳木斯市,市辖区,向阳区,前进区,东风区,郊区,桦南县,桦川县,汤原县,抚远县,同江市,富锦市|七台河市,市辖区,新兴区,桃山区,茄子河区,勃利县|牡丹江市,市辖区,东安区,阳明区,爱民区,西安区,东宁县,林口县,绥芬河市,海林市,宁安市,穆棱市|黑河市,市辖区,爱辉区,嫩江县,逊克县,孙吴县,北安市,五大连池市|绥化市,市辖区,北林区,望奎县,兰西县,青冈县,庆安县,明水县,绥棱县,安达市,肇东市,海伦市|大兴安岭地区,呼玛县,塔河县,漠河县#上海市$市辖区|黄浦区|徐汇区|长宁区|静安区|普陀区|闸北区|虹口区|杨浦区|闵行区|宝山区|嘉定区|浦东新区|金山区|松江区|青浦区|奉贤区#江苏省$南京市,市辖区,玄武区,白下区,秦淮区,建邺区,鼓楼区,下关区,浦口区,栖霞区,雨花台区,江宁区,六合区,溧水县,高淳县|无锡市,市辖区,崇安区,南长区,北塘区,锡山区,惠山区,滨湖区,江阴市,宜兴市|徐州市,市辖区,鼓楼区,云龙区,贾汪区,泉山区,铜山区,丰县,沛县,睢宁县,新沂市,邳州市|常州市,市辖区,天宁区,钟楼区,戚墅堰区,新北区,武进区,溧阳市,金坛市|苏州市,市辖区,沧浪区,平江区,金阊区,虎丘区,吴中区,相城区,常熟市,张家港市,昆山市,吴江市,太仓市|南通市,市辖区,崇川区,港闸区,通州区,海安县,如东县,启东市,如皋市,海门市|连云港市,市辖区,连云区,新浦区,海州区,赣榆县,东海县,灌云县,灌南县|淮安市,市辖区,清河区,楚州区,淮阴区,清浦区,涟水县,洪泽县,盱眙县,金湖县|盐城市,市辖区,亭湖区,盐都区,响水县,滨海县,阜宁县,射阳县,建湖县,东台市,大丰市|扬州市,市辖区,广陵区,邗江区,江都区,宝应县,仪征市,高邮市|镇江市,市辖区,京口区,润州区,丹徒区,丹阳市,扬中市,句容市|泰州市,市辖区,海陵区,高港区,兴化市,靖江市,泰兴市,姜堰市|宿迁市,市辖区,宿城区,宿豫区,沭阳县,泗阳县,泗洪县#浙江省$杭州市,市辖区,上城区,下城区,江干区,拱墅区,西湖区,滨江区,萧山区,余杭区,桐庐县,淳安县,建德市,富阳市,临安市|宁波市,市辖区,海曙区,江东区,江北区,北仑区,镇海区,鄞州区,象山县,宁海县,余姚市,慈溪市,奉化市|温州市,市辖区,鹿城区,龙湾区,瓯海区,洞头县,永嘉县,平阳县,苍南县,文成县,泰顺县,瑞安市,乐清市|嘉兴市,市辖区,南湖区,秀洲区,嘉善县,海盐县,海宁市,平湖市,桐乡市|湖州市,市辖区,吴兴区,南浔区,德清县,长兴县,安吉县|绍兴市,市辖区,越城区,绍兴县,新昌县,诸暨市,上虞市,嵊州市|金华市,市辖区,婺城区,金东区,武义县,浦江县,磐安县,兰溪市,义乌市,东阳市,永康市|衢州市,市辖区,柯城区,衢江区,常山县,开化县,龙游县,江山市|舟山市,市辖区,定海区,普陀区,岱山县,嵊泗县|台州市,市辖区,椒江区,黄岩区,路桥区,玉环县,三门县,天台县,仙居县,温岭市,临海市|丽水市,市辖区,莲都区,青田县,缙云县,遂昌县,松阳县,云和县,庆元县,景宁畲族自治县,龙泉市#安徽省$合肥市,市辖区,瑶海区,庐阳区,蜀山区,包河区,长丰县,肥东县,肥西县,庐江县,巢湖市|芜湖市,市辖区,镜湖区,弋江区,鸠江区,三山区,芜湖县,繁昌县,南陵县,无为县|蚌埠市,市辖区,龙子湖区,蚌山区,禹会区,淮上区,怀远县,五河县,固镇县|淮南市,市辖区,大通区,田家庵区,谢家集区,八公山区,潘集区,凤台县|马鞍山市,市辖区,金家庄区,花山区,雨山区,当涂县,含山县,和县|淮北市,市辖区,杜集区,相山区,烈山区,濉溪县|铜陵市,市辖区,铜官山区,狮子山区,郊区,铜陵县|安庆市,市辖区,迎江区,大观区,宜秀区,怀宁县,枞阳县,潜山县,太湖县,宿松县,望江县,岳西县,桐城市|黄山市,市辖区,屯溪区,黄山区,徽州区,歙县,休宁县,黟县,祁门县|滁州市,市辖区,琅琊区,南谯区,来安县,全椒县,定远县,凤阳县,天长市,明光市|阜阳市,市辖区,颍州区,颍东区,颍泉区,临泉县,太和县,阜南县,颍上县,界首市|宿州市,市辖区,埇桥区,砀山县,萧县,灵璧县,泗县|六安市,市辖区,金安区,裕安区,寿县,霍邱县,舒城县,金寨县,霍山县|亳州市,市辖区,谯城区,涡阳县,蒙城县,利辛县|池州市,市辖区,贵池区,东至县,石台县,青阳县|宣城市,市辖区,宣州区,郎溪县,广德县,泾县,绩溪县,旌德县,宁国市#福建省$福州市,市辖区,鼓楼区,台江区,仓山区,马尾区,晋安区,闽侯县,连江县,罗源县,闽清县,永泰县,平潭县,福清市,长乐市|厦门市,市辖区,思明区,海沧区,湖里区,集美区,同安区,翔安区|莆田市,市辖区,城厢区,涵江区,荔城区,秀屿区,仙游县|三明市,市辖区,梅列区,三元区,明溪县,清流县,宁化县,大田县,尤溪县,沙县,将乐县,泰宁县,建宁县,永安市|泉州市,市辖区,鲤城区,丰泽区,洛江区,泉港区,惠安县,安溪县,永春县,德化县,金门县,石狮市,晋江市,南安市|漳州市,市辖区,芗城区,龙文区,云霄县,漳浦县,诏安县,长泰县,东山县,南靖县,平和县,华安县,龙海市|南平市,市辖区,延平区,顺昌县,浦城县,光泽县,松溪县,政和县,邵武市,武夷山市,建瓯市,建阳市|龙岩市,市辖区,新罗区,长汀县,永定县,上杭县,武平县,连城县,漳平市|宁德市,市辖区,蕉城区,霞浦县,古田县,屏南县,寿宁县,周宁县,柘荣县,福安市,福鼎市#江西省$南昌市,市辖区,东湖区,西湖区,青云谱区,湾里区,青山湖区,南昌县,新建县,安义县,进贤县|景德镇市,市辖区,昌江区,珠山区,浮梁县,乐平市|萍乡市,市辖区,安源区,湘东区,莲花县,上栗县,芦溪县|九江市,市辖区,庐山区,浔阳区,九江县,武宁县,修水县,永修县,德安县,星子县,都昌县,湖口县,彭泽县,瑞昌市,共青城市|新余市,市辖区,渝水区,分宜县|鹰潭市,市辖区,月湖区,余江县,贵溪市|赣州市,市辖区,章贡区,赣县,信丰县,大余县,上犹县,崇义县,安远县,龙南县,定南县,全南县,宁都县,于都县,兴国县,会昌县,寻乌县,石城县,瑞金市,南康市|吉安市,市辖区,吉州区,青原区,吉安县,吉水县,峡江县,新干县,永丰县,泰和县,遂川县,万安县,安福县,永新县,井冈山市|宜春市,市辖区,袁州区,奉新县,万载县,上高县,宜丰县,靖安县,铜鼓县,丰城市,樟树市,高安市|抚州市,市辖区,临川区,南城县,黎川县,南丰县,崇仁县,乐安县,宜黄县,金溪县,资溪县,东乡县,广昌县|上饶市,市辖区,信州区,上饶县,广丰县,玉山县,铅山县,横峰县,弋阳县,余干县,鄱阳县,万年县,婺源县,德兴市#山东省$济南市,市辖区,历下区,市中区,槐荫区,天桥区,历城区,长清区,平阴县,济阳县,商河县,章丘市|青岛市,市辖区,市南区,市北区,四方区,黄岛区,崂山区,李沧区,城阳区,胶州市,即墨市,平度市,胶南市,莱西市|淄博市,市辖区,淄川区,张店区,博山区,临淄区,周村区,桓台县,高青县,沂源县|枣庄市,市辖区,市中区,薛城区,峄城区,台儿庄区,山亭区,滕州市|东营市,市辖区,东营区,河口区,垦利县,利津县,广饶县|烟台市,市辖区,芝罘区,福山区,牟平区,莱山区,长岛县,龙口市,莱阳市,莱州市,蓬莱市,招远市,栖霞市,海阳市|潍坊市,市辖区,潍城区,寒亭区,坊子区,奎文区,临朐县,昌乐县,青州市,诸城市,寿光市,安丘市,高密市,昌邑市|济宁市,市辖区,市中区,任城区,微山县,鱼台县,金乡县,嘉祥县,汶上县,泗水县,梁山县,曲阜市,兖州市,邹城市|泰安市,市辖区,泰山区,岱岳区,宁阳县,东平县,新泰市,肥城市|威海市,市辖区,环翠区,文登市,荣成市,乳山市|日照市,市辖区,东港区,岚山区,五莲县,莒县|莱芜市,市辖区,莱城区,钢城区|临沂市,市辖区,兰山区,罗庄区,河东区,沂南县,郯城县,沂水县,苍山县,费县,平邑县,莒南县,蒙阴县,临沭县|德州市,市辖区,德城区,陵县,宁津县,庆云县,临邑县,齐河县,平原县,夏津县,武城县,乐陵市,禹城市|聊城市,市辖区,东昌府区,阳谷县,莘县,茌平县,东阿县,冠县,高唐县,临清市|滨州市,市辖区,滨城区,惠民县,阳信县,无棣县,沾化县,博兴县,邹平县|菏泽市,市辖区,牡丹区,曹县,单县,成武县,巨野县,郓城县,鄄城县,定陶县,东明县#河南省$郑州市,市辖区,中原区,二七区,管城回族区,金水区,上街区,惠济区,中牟县,巩义市,荥阳市,新密市,新郑市,登封市|开封市,市辖区,龙亭区,顺河回族区,鼓楼区,禹王台区,金明区,杞县,通许县,尉氏县,开封县,兰考县|洛阳市,市辖区,老城区,西工区,瀍河回族区,涧西区,吉利区,洛龙区,孟津县,新安县,栾川县,嵩县,汝阳县,宜阳县,洛宁县,伊川县,偃师市|平顶山市,市辖区,新华区,卫东区,石龙区,湛河区,宝丰县,叶县,鲁山县,郏县,舞钢市,汝州市|安阳市,市辖区,文峰区,北关区,殷都区,龙安区,安阳县,汤阴县,滑县,内黄县,林州市|鹤壁市,市辖区,鹤山区,山城区,淇滨区,浚县,淇县|新乡市,市辖区,红旗区,卫滨区,凤泉区,牧野区,新乡县,获嘉县,原阳县,延津县,封丘县,长垣县,卫辉市,辉县市|焦作市,市辖区,解放区,中站区,马村区,山阳区,修武县,博爱县,武陟县,温县,沁阳市,孟州市|濮阳市,市辖区,华龙区,清丰县,南乐县,范县,台前县,濮阳县|许昌市,市辖区,魏都区,许昌县,鄢陵县,襄城县,禹州市,长葛市|漯河市,市辖区,源汇区,郾城区,召陵区,舞阳县,临颍县|三门峡市,市辖区,湖滨区,渑池县,陕县,卢氏县,义马市,灵宝市|南阳市,市辖区,宛城区,卧龙区,南召县,方城县,西峡县,镇平县,内乡县,淅川县,社旗县,唐河县,新野县,桐柏县,邓州市|商丘市,市辖区,梁园区,睢阳区,民权县,睢县,宁陵县,柘城县,虞城县,夏邑县,永城市|信阳市,市辖区,浉河区,平桥区,罗山县,光山县,新县,商城县,固始县,潢川县,淮滨县,息县|周口市,市辖区,川汇区,扶沟县,西华县,商水县,沈丘县,郸城县,淮阳县,太康县,鹿邑县,项城市|驻马店市,市辖区,驿城区,西平县,上蔡县,平舆县,正阳县,确山县,泌阳县,汝南县,遂平县,新蔡县|省直辖县级行政区划,济源市#湖北省$武汉市,市辖区,江岸区,江汉区,硚口区,汉阳区,武昌区,青山区,洪山区,东西湖区,汉南区,蔡甸区,江夏区,黄陂区,新洲区|黄石市,市辖区,黄石港区,西塞山区,下陆区,铁山区,阳新县,大冶市|十堰市,市辖区,茅箭区,张湾区,郧县,郧西县,竹山县,竹溪县,房县,丹江口市|宜昌市,市辖区,西陵区,伍家岗区,点军区,猇亭区,夷陵区,远安县,兴山县,秭归县,长阳土家族自治县,五峰土家族自治县,宜都市,当阳市,枝江市|襄阳市,市辖区,襄城区,樊城区,襄州区,南漳县,谷城县,保康县,老河口市,枣阳市,宜城市|鄂州市,市辖区,梁子湖区,华容区,鄂城区|荆门市,市辖区,东宝区,掇刀区,京山县,沙洋县,钟祥市|孝感市,市辖区,孝南区,孝昌县,大悟县,云梦县,应城市,安陆市,汉川市|荆州市,市辖区,沙市区,荆州区,公安县,监利县,江陵县,石首市,洪湖市,松滋市|黄冈市,市辖区,黄州区,团风县,红安县,罗田县,英山县,浠水县,蕲春县,黄梅县,麻城市,武穴市|咸宁市,市辖区,咸安区,嘉鱼县,通城县,崇阳县,通山县,赤壁市|随州市,市辖区,曾都区,随县,广水市|恩施土家族苗族自治州,恩施市,利川市,建始县,巴东县,宣恩县,咸丰县,来凤县,鹤峰县|省直辖县级行政区划,仙桃市,潜江市,天门市,神农架林区#湖南省$长沙市,市辖区,芙蓉区,天心区,岳麓区,开福区,雨花区,望城区,长沙县,宁乡县,浏阳市|株洲市,市辖区,荷塘区,芦淞区,石峰区,天元区,株洲县,攸县,茶陵县,炎陵县,醴陵市|湘潭市,市辖区,雨湖区,岳塘区,湘潭县,湘乡市,韶山市|衡阳市,市辖区,珠晖区,雁峰区,石鼓区,蒸湘区,南岳区,衡阳县,衡南县,衡山县,衡东县,祁东县,耒阳市,常宁市|邵阳市,市辖区,双清区,大祥区,北塔区,邵东县,新邵县,邵阳县,隆回县,洞口县,绥宁县,新宁县,城步苗族自治县,武冈市|岳阳市,市辖区,岳阳楼区,云溪区,君山区,岳阳县,华容县,湘阴县,平江县,汨罗市,临湘市|常德市,市辖区,武陵区,鼎城区,安乡县,汉寿县,澧县,临澧县,桃源县,石门县,津市市|张家界市,市辖区,永定区,武陵源区,慈利县,桑植县|益阳市,市辖区,资阳区,赫山区,南县,桃江县,安化县,沅江市|郴州市,市辖区,北湖区,苏仙区,桂阳县,宜章县,永兴县,嘉禾县,临武县,汝城县,桂东县,安仁县,资兴市|永州市,市辖区,零陵区,冷水滩区,祁阳县,东安县,双牌县,道县,江永县,宁远县,蓝山县,新田县,江华瑶族自治县|怀化市,市辖区,鹤城区,中方县,沅陵县,辰溪县,溆浦县,会同县,麻阳苗族自治县,新晃侗族自治县,芷江侗族自治县,靖州苗族侗族自治县,通道侗族自治县,洪江市|娄底市,市辖区,娄星区,双峰县,新化县,冷水江市,涟源市|湘西土家族苗族自治州,吉首市,泸溪县,凤凰县,花垣县,保靖县,古丈县,永顺县,龙山县#广东省$广州市,市辖区,荔湾区,越秀区,海珠区,天河区,白云区,黄埔区,番禺区,花都区,南沙区,萝岗区,增城市,从化市|韶关市,市辖区,武江区,浈江区,曲江区,始兴县,仁化县,翁源县,乳源瑶族自治县,新丰县,乐昌市,南雄市|深圳市,市辖区,罗湖区,福田区,南山区,宝安区,龙岗区,盐田区|珠海市,市辖区,香洲区,斗门区,金湾区|汕头市,市辖区,龙湖区,金平区,濠江区,潮阳区,潮南区,澄海区,南澳县|佛山市,市辖区,禅城区,南海区,顺德区,三水区,高明区|江门市,市辖区,蓬江区,江海区,新会区,台山市,开平市,鹤山市,恩平市|湛江市,市辖区,赤坎区,霞山区,坡头区,麻章区,遂溪县,徐闻县,廉江市,雷州市,吴川市|茂名市,市辖区,茂南区,茂港区,电白县,高州市,化州市,信宜市|肇庆市,市辖区,端州区,鼎湖区,广宁县,怀集县,封开县,德庆县,高要市,四会市|惠州市,市辖区,惠城区,惠阳区,博罗县,惠东县,龙门县|梅州市,市辖区,梅江区,梅县,大埔县,丰顺县,五华县,平远县,蕉岭县,兴宁市|汕尾市,市辖区,城区,海丰县,陆河县,陆丰市|河源市,市辖区,源城区,紫金县,龙川县,连平县,和平县,东源县|阳江市,市辖区,江城区,阳西县,阳东县,阳春市|清远市,市辖区,清城区,佛冈县,阳山县,连山壮族瑶族自治县,连南瑶族自治县,清新县,英德市,连州市|东莞市|中山市|潮州市,市辖区,湘桥区,潮安县,饶平县|揭阳市,市辖区,榕城区,揭东县,揭西县,惠来县,普宁市|云浮市,市辖区,云城区,新兴县,郁南县,云安县,罗定市#广西壮族自治区$南宁市,市辖区,兴宁区,青秀区,江南区,西乡塘区,良庆区,邕宁区,武鸣县,隆安县,马山县,上林县,宾阳县,横县|柳州市,市辖区,城中区,鱼峰区,柳南区,柳北区,柳江县,柳城县,鹿寨县,融安县,融水苗族自治县,三江侗族自治县|桂林市,市辖区,秀峰区,叠彩区,象山区,七星区,雁山区,阳朔县,临桂县,灵川县,全州县,兴安县,永福县,灌阳县,龙胜各族自治县,资源县,平乐县,荔蒲县,恭城瑶族自治县|梧州市,市辖区,万秀区,蝶山区,长洲区,苍梧县,藤县,蒙山县,岑溪市|北海市,市辖区,海城区,银海区,铁山港区,合浦县|防城港市,市辖区,港口区,防城区,上思县,东兴市|钦州市,市辖区,钦南区,钦北区,灵山县,浦北县|贵港市,市辖区,港北区,港南区,覃塘区,平南县,桂平市|玉林市,市辖区,玉州区,容县,陆川县,博白县,兴业县,北流市|百色市,市辖区,右江区,田阳县,田东县,平果县,德保县,靖西县,那坡县,凌云县,乐业县,田林县,西林县,隆林各族自治县|贺州市,市辖区,八步区,昭平县,钟山县,富川瑶族自治县|河池市,市辖区,金城江区,南丹县,天峨县,凤山县,东兰县,罗城仫佬族自治县,环江毛南族自治县,巴马瑶族自治县,都安瑶族自治县,大化瑶族自治县,宜州市|来宾市,市辖区,兴宾区,忻城县,象州县,武宣县,金秀瑶族自治县,合山市|崇左市,市辖区,江洲区,扶绥县,宁明县,龙州县,大新县,天等县,凭祥市#海南省$海口市,市辖区,秀英区,龙华区,琼山区,美兰区|三亚市,市辖区|省直辖县级行政区划,五指山市,琼海市,儋州市,文昌市,万宁市,东方市,定安县,屯昌县,澄迈县,临高县,白沙黎族自治县,昌江黎族自治县,乐东黎族自治县,陵水黎族自治县,保亭黎族苗族自治县,琼中黎族苗族自治县,西沙群岛,南沙群岛,中沙群岛的岛礁及其海域#重庆市$市辖区|万州区|涪陵区|渝中区|大渡口区|江北区|沙坪坝区|九龙坡区|南岸区|北碚区|綦江区|大足区|渝北区|巴南区|黔江区|长寿区|江津区|合川区|永川区|南川区|市辖县|潼南县|铜梁县|荣昌县|璧山县,梁平县|城口县|丰都县|垫江县|武隆县|忠县|开县|云阳县|奉节县|巫山县|巫溪县|石柱土家族自治县|秀山土家族苗族自治县|酉阳土家族苗族自治县|彭水苗族土家族自治县#四川省$成都市,市辖区,锦江区,青羊区,金牛区,武侯区,成华区,龙泉驿区,青白江区,新都区,温江区,金堂县,双流县,郫县,大邑县,蒲江县,新津县,都江堰市,彭州市,邛崃市,崇州市|自贡市,市辖区,自流井区,贡井区,大安区,沿滩区,荣县,富顺县|攀枝花市,市辖区,东区,西区,仁和区,米易县,盐边县|泸州市,市辖区,江阳区,纳溪区,龙马潭区,泸县,合江县,叙永县,古蔺县|德阳市,市辖区,旌阳区,中江县,罗江县,广汉市,什邡市,绵竹市|绵阳市,市辖区,涪城区,游仙区,三台县,盐亭县,安县,梓潼县,北川羌族自治县,平武县,江油市|广元市,市辖区,利州区,元坝区,朝天区,旺苍县,青川县,剑阁县,苍溪县|遂宁市,市辖区,船山区,安居区,蓬溪县,射洪县,大英县|内江市,市辖区,市中区,东兴区,威远县,资中县,隆昌县|乐山市,市辖区,市中区,沙湾区,五通桥区,金口河区,犍为县,井研县,夹江县,沐川县,峨边彝族自治县,马边彝族自治县,峨眉山市|南充市,市辖区,顺庆区,高坪区,嘉陵区,南部县,营山县,蓬安县,仪陇县,西充县,阆中市|眉山市,市辖区,东坡区,仁寿县,彭山县,洪雅县,丹棱县,青神县|宜宾市,市辖区,翠屏区,南溪区,宜宾县,江安县,长宁县,高县,珙县,筠连县,兴文县,屏山县|广安市,市辖区,广安区,岳池县,武胜县,邻水县,华蓥市|达州市,市辖区,通川区,达县,宣汉县,开江县,大竹县,渠县,万源市|雅安市,市辖区,雨城区,名山县,荥经县,汉源县,石棉县,天全县,芦山县,宝兴县|巴中市,市辖区,巴州区,通江县,南江县,平昌县|资阳市,市辖区,雁江区,安岳县,乐至县,简阳市|阿坝藏族羌族自治州,汶川县,理县,茂县,松潘县,九寨沟县,金川县,小金县,黑水县,马尔康县,壤塘县,阿坝县,若尔盖县,红原县|甘孜藏族自治州,康定县,泸定县,丹巴县,九龙县,雅江县,道孚县,炉霍县,甘孜县,新龙县,德格县,白玉县,石渠县,色达县,理塘县,巴塘县,乡城县,稻城县,得荣县|凉山彝族自治州,西昌市,木里藏族自治县,盐源县,德昌县,会理县,会东县,宁南县,普格县,布拖县,金阳县,昭觉县,喜德县,冕宁县,越西县,甘洛县,美姑县,雷波县#贵州省$贵阳市,市辖区,南明区,云岩区,花溪区,乌当区,白云区,小河区,开阳县,息烽县,修文县,清镇市|六盘水市,钟山区,六枝特区,水城县,盘县|遵义市,市辖区,红花岗区,汇川区,遵义县,桐梓县,绥阳县,正安县,道真仡佬族苗族自治县,务川仡佬族苗族自治县,凤冈县,湄潭县,余庆县,习水县,赤水市,仁怀市|安顺市,市辖区,西秀区,平坝县,普定县,镇宁布依族苗族自治县,关岭布依族苗族自治县,紫云苗族布依族自治县|毕节市,市辖区,七星关区,大方县,黔西县,金沙县,织金县,纳雍县,威宁彝族回族苗族自治县,赫章县|铜仁市,市辖区,碧江区,万山区,江口县,玉屏侗族自治县,石阡县,思南县,印江土家族苗族自治县,德江县,沿河土家族自治县,松桃苗族自治县|黔西南布依族苗族自治州,兴义市,兴仁县,普安县,晴隆县,贞丰县,望谟县,册亨县,安龙县|黔东南苗族侗族自治州,凯里市,黄平县,施秉县,三穗县,镇远县,岑巩县,天柱县,锦屏县,剑河县,台江县,黎平县,榕江县,从江县,雷山县,麻江县,丹寨县|黔南布依族苗族自治州,都匀市,福泉市,荔波县,贵定县,瓮安县,独山县,平塘县,罗甸县,长顺县,龙里县,惠水县,三都水族自治县#云南省$昆明市,市辖区,五华区,盘龙区,官渡区,西山区,东川区,呈贡区,晋宁县,富民县,宜良县,石林彝族自治县,嵩明县,禄劝彝族苗族自治县,寻甸回族彝族自治县,安宁市|曲靖市,市辖区,麒麟区,马龙县,陆良县,师宗县,罗平县,富源县,会泽县,沾益县,宣威市|玉溪市,市辖区,红塔区,江川县,澄江县,通海县,华宁县,易门县,峨山彝族自治县,新平彝族傣族自治县,元江哈尼族彝族傣族自治县|保山市,市辖区,隆阳区,施甸县,腾冲县,龙陵县,昌宁县|昭通市,市辖区,昭阳区,鲁甸县,巧家县,盐津县,大关县,永善县,绥江县,镇雄县,彝良县,威信县,水富县|丽江市,市辖区,古城区,玉龙纳西族自治县,永胜县,华坪县,宁蒗彝族自治县|普洱市,市辖区,思茅区,宁洱哈尼族彝族自治县,墨江哈尼族自治县,景东彝族自治县,景谷傣族彝族自治县,镇沅彝族哈尼族拉祜族自治县,江城哈尼族彝族自治县,孟连傣族拉祜族佤族自治县,澜沧拉祜族自治县,西盟佤族自治县|临沧市,市辖区,临翔区,凤庆县,云县,永德县,镇康县,双江拉祜族佤族布朗族傣族自治县,耿马傣族佤族自治县,沧源佤族自治县|楚雄彝族自治州,楚雄市,双柏县,牟定县,南华县,姚安县,大姚县,永仁县,元谋县,武定县,禄丰县|红河哈尼族彝族自治州,个旧市,开远市,蒙自市,屏边苗族自治县,建水县,石屏县,弥勒县,泸西县,元阳县,红河县,金平苗族瑶族傣族自治县,绿春县,河口瑶族自治县|文山壮族苗族自治州,文山市,砚山县,西畴县,麻栗坡县,马关县,丘北县,广南县,富宁县|西双版纳傣族自治州,景洪市,勐海县,勐腊县|大理白族自治州,大理市,漾濞彝族自治县,祥云县,宾川县,弥渡县,南涧彝族自治县,巍山彝族回族自治县,永平县,云龙县,洱源县,剑川县,鹤庆县|德宏傣族景颇族自治州,瑞丽市,芒市,梁河县,盈江县,陇川县|怒江傈僳族自治州,泸水县,福贡县,贡山独龙族怒族自治县,兰坪白族普米族自治县|迪庆藏族自治州,香格里拉县,德钦县,维西傈僳族自治县#西藏自治区$拉萨市,市辖区,城关区,林周县,当雄县,尼木县,曲水县,堆龙德庆县,达孜县,墨竹工卡县|昌都地区,昌都县,江达县,贡觉县,类乌齐县,丁青县,察雅县,八宿县,左贡县,芒康县,洛隆县,边坝县|山南地区,乃东县,扎囊县,贡嘎县,桑日县,琼结县,曲松县,措美县,洛扎县,加查县,隆子县,错那县,浪卡子县|日喀则地区,日喀则市,南木林县,江孜县,定日县,萨迦县,拉孜县,昂仁县,谢通门县,白朗县,仁布县,康马县,定结县,仲巴县,亚东县,吉隆县,聂拉木县,萨嘎县,岗巴县|那曲地区,那曲县,嘉黎县,比如县,聂荣县,安多县,申扎县,索县,班戈县,巴青县,尼玛县|阿里地区,普兰县,札达县,噶尔县,日土县,革吉县,改则县,措勤县|林芝地区,林芝县,工布江达县,米林县,墨脱县,波密县,察隅县,朗县#陕西省$西安市,市辖区,新城区,碑林区,莲湖区,灞桥区,未央区,雁塔区,阎良区,临潼区,长安区,蓝田县,周至县,户县,高陵县|铜川市,市辖区,王益区,印台区,耀州区,宜君县|宝鸡市,市辖区,渭滨区,金台区,陈仓区,凤翔县,岐山县,扶风县,眉县,陇县,千阳县,麟游县,凤县,太白县|咸阳市,市辖区,秦都区,杨陵区,渭城区,三原县,泾阳县,乾县,礼泉县,永寿县,彬县,长武县,旬邑县,淳化县,武功县,兴平市|渭南市,市辖区,临渭区,华县,潼关县,大荔县,合阳县,澄城县,蒲城县,白水县,富平县,韩城市,华阴市|延安市,市辖区,宝塔区,延长县,延川县,子长县,安塞县,志丹县,吴起县,甘泉县,富县,洛川县,宜川县,黄龙县,黄陵县|汉中市,市辖区,汉台区,南郑县,城固县,洋县,西乡县,勉县,宁强县,略阳县,镇巴县,留坝县,佛坪县|榆林市,市辖区,榆阳区,神木县,府谷县,横山县,靖边县,定边县,绥德县,米脂县,佳县,吴堡县,清涧县,子洲县|安康市,市辖区,汉滨区,汉阴县,石泉县,宁陕县,紫阳县,岚皋县,平利县,镇坪县,旬阳县,白河县|商洛市,市辖区,商州区,洛南县,丹凤县,商南县,山阳县,镇安县,柞水县#甘肃省$兰州市,市辖区,城关区,七里河区,西固区,安宁区,红古区,永登县,皋兰县,榆中县|嘉峪关市,市辖区|金昌市,市辖区,金川区,永昌县|白银市,市辖区,白银区,平川区,靖远县,会宁县,景泰县|天水市,市辖区,秦州区,麦积区,清水县,秦安县,甘谷县,武山县,张家川回族自治县|武威市,市辖区,凉州区,民勤县,古浪县,天祝藏族自治县|张掖市,市辖区,甘州区,肃南裕固族自治县,民乐县,临泽县,高台县,山丹县|平凉市,市辖区,崆峒区,泾川县,灵台县,崇信县,华亭县,庄浪县,静宁县|酒泉市,市辖区,肃州区,金塔县,瓜州县,肃北蒙古族自治县,阿克塞哈萨克族自治县,玉门市,敦煌市|庆阳市,市辖区,西峰区,庆城县,环县,华池县,合水县,正宁县,宁县,镇原县|定西市,市辖区,安定区,通渭县,陇西县,渭源县,临洮县,漳县,岷县|陇南市,市辖区,武都区,成县,文县,宕昌县,康县,西和县,礼县,徽县,两当县|临夏回族自治州,临夏市,临夏县,康乐县,永靖县,广河县,和政县,东乡族自治县,积石山保安族东乡族撒拉族自治县|甘南藏族自治州,合作市,临潭县,卓尼县,舟曲县,迭部县,玛曲县,碌曲县,夏河县#青海省$西宁市,市辖区,城东区,城中区,城西区,城北区,大通回族土族自治县,湟中县,湟源县|海东地区,平安县,民和回族土族自治县,乐都县,互助土族自治县,化隆回族自治县,循化撒拉族自治县|海北藏族自治州,门源回族自治县,祁连县,海晏县,刚察县|黄南藏族自治州,同仁县,尖扎县,泽库县,河南蒙古族自治县|海南藏族自治州,共和县,同德县,贵德县,兴海县,贵南县|果洛藏族自治州,玛沁县,班玛县,甘德县,达日县,久治县,玛多县|玉树藏族自治州,玉树县,杂多县,称多县,治多县,囊谦县,曲麻莱县|海西蒙古族藏族自治州,格尔木市,德令哈市,乌兰县,都兰县,天峻县#宁夏回族自治区$银川市,市辖区,兴庆区,西夏区,金凤区,永宁县,贺兰县,灵武市|石嘴山市,市辖区,大武口区,惠农区,平罗县|吴忠市,市辖区,利通区,红寺堡区,盐池县,同心县,青铜峡市|固原市,市辖区,原州区,西吉县,隆德县,泾源县,彭阳县|中卫市,市辖区,沙坡头区,中宁县,海原县#新疆维吾尔自治区$乌鲁木齐市,市辖区,天山区,沙依巴克区,新市区,水磨沟区,头屯河区,达坂城区,米东区,乌鲁木齐县|克拉玛依市,市辖区,独山子区,克拉玛依区,白碱滩区,乌尔禾区|吐鲁番地区,吐鲁番市,鄯善县,托克逊县|哈密地区,哈密市,巴里坤哈萨克自治县,伊吾县|昌吉回族自治州,昌吉市,阜康市,呼图壁县,玛纳斯县,奇台县,吉木萨尔县,木垒哈萨克自治县|博尔塔拉蒙古自治州,博乐市,精河县,温泉县|巴音郭楞蒙古自治州,库尔勒市,轮台县,尉犁县,若羌县,且末县,焉耆回族自治县,和静县,和硕县,博湖县|阿克苏地区,阿克苏市,温宿县,库车县,沙雅县,新和县,拜城县,乌什县,阿瓦提县,柯坪县|克孜勒苏柯尔克孜自治州,阿图什市,阿克陶县,阿合奇县,乌恰县|喀什地区,喀什市,疏附县,疏勒县,英吉沙县,泽普县,莎车县,叶城县,麦盖提县,岳普湖县,伽师县,巴楚县,塔什库尔干塔吉克自治县|和田地区,和田市,和田县,墨玉县,皮山县,洛浦县,策勒县,于田县,民丰县|伊犁哈萨克自治州,伊宁市,奎屯市,伊宁县,察布查尔锡伯自治县,霍城县,巩留县,新源县,昭苏县,特克斯县,尼勒克县|塔城地区,塔城市,乌苏市,额敏县,沙湾县,托里县,裕民县,和布克赛尔蒙古自治县|阿勒泰地区,阿勒泰市,布尔津县,富蕴县,福海县,哈巴河县,青河县,吉木乃县|自治区直辖县级行政区划,石河子市,阿拉尔市,图木舒克市,五家渠市#香港特别行政区$香港,香港特别行政区#澳门特别行政区$澳门,澳门特别行政区#台湾省$台北市,中正区,大同区,中山区,松山区,大安区,万华区,信义区,士林区,北投区,内湖区,南港区,文山区|高雄市,新兴区,前金区,芩雅区,盐埕区,鼓山区,旗津区,前镇区,三民区,左营区,楠梓区,小港区|基隆市,仁爱区,信义区,中正区,中山区,安乐区,暖暖区,七堵区|台中市,中区,东区,南区,西区,北区,北屯区,西屯区,南屯区|台南市,中西区,东区,南区,北区,安平区,安南区|新竹市,东区,北区,香山区|嘉义市,东区,西区|县,台北县(板桥市),宜兰县(宜兰市),新竹县(竹北市),桃园县(桃园市),苗栗县(苗栗市),台中县(丰原市),彰化县(彰化市),南投县(南投市),嘉义县(太保市),云林县(斗六市),台南县(新营市),高雄县(凤山市),屏东县(屏东市),台东县(台东市),花莲县(花莲市),澎湖县(马公市)#其它$亚洲,阿富汗,巴林,孟加拉国,不丹,文莱,缅甸,塞浦路斯,印度,印度尼西亚,伊朗,伊拉克,日本,约旦,朝鲜,科威特,老挝,马尔代夫,黎巴嫩,马来西亚,以色列,蒙古,尼泊尔,阿曼,巴基斯坦,巴勒斯坦,菲律宾,沙特阿拉伯,新加坡,斯里兰卡,叙利亚,泰国,柬埔寨,土耳其,阿联酋,越南,也门,韩国,中国,中国香港,中国澳门,中国台湾|非洲,阿尔及利亚,安哥拉,厄里特里亚,法罗群鸟,加那利群岛(西)(拉斯帕尔马斯),贝宁,博茨瓦纳,布基纳法索,布隆迪,喀麦隆,加那利群岛(西)(圣克鲁斯),佛得角,中非,乍得,科摩罗,刚果,吉布提,埃及,埃塞俄比亚,赤道几内亚,加蓬,冈比亚,加纳,几内亚,南非,几内亚比绍,科特迪瓦,肯尼亚,莱索托,利比里亚,利比亚,马达加斯加,马拉维,马里,毛里塔尼亚,毛里求斯,摩洛哥,莫桑比克,尼日尔,尼日利亚,留尼旺岛,卢旺达,塞内加尔,塞舌尔,塞拉利昂,索马里,苏丹,斯威士兰,坦桑尼亚,圣赤勒拿,多哥,突尼斯,乌干达,扎伊尔,赞比亚,津巴布韦,纳米比亚,迪戈加西亚,桑给巴尔,马约特岛,圣多美和普林西比|欧洲,阿尔巴尼亚,安道尔,奥地利,比利时,保加利亚,捷克,丹麦,芬兰,法国,德国,直布罗陀(英),希腊,匈牙利,冰岛,爱尔兰,意大利,列支敦士登,斯洛伐克,卢森堡,马耳他,摩纳哥,荷兰,挪威,波兰,葡萄牙,马其顿,罗马尼亚,南斯拉夫,圣马力诺,西班牙,瑞典,瑞士,英国,科罗地亚,斯洛文尼亚,梵蒂冈,波斯尼亚和塞哥维那,俄罗斯联邦,亚美尼亚共和国,白俄罗斯共和国,格鲁吉亚共和国,哈萨克斯坦共和国,吉尔吉斯坦共和国,乌兹别克斯坦共和国,塔吉克斯坦共和国,土库曼斯坦共和国,乌克兰,立陶宛,拉脱维亚,爱沙尼亚,摩尔多瓦,阿塞拜疆|美洲,安圭拉岛,安提瓜和巴布达,阿根廷,阿鲁巴岛,阿森松,巴哈马,巴巴多斯,伯利兹,百慕大群岛,玻利维亚,巴西,加拿大,开曼群岛,智利,哥伦比亚,多米尼加联邦,哥斯达黎加,古巴,多米尼加共和国,厄瓜多尔,萨尔瓦多,法属圭亚那,格林纳达,危地马拉,圭亚那,海地,洪都拉斯,牙买加,马提尼克(法),墨西哥,蒙特塞拉特岛,荷属安的列斯群岛,尼加拉瓜,巴拿马,巴拉圭,秘鲁,波多黎哥,圣皮埃尔岛密克隆岛(法),圣克里斯托弗和尼维斯,圣卢西亚,福克兰群岛,维尔京群岛(英),圣文森特岛(英),维尔京群岛(美),苏里南,特立尼达和多巴哥,乌拉圭,美国,委内瑞拉,格陵兰岛,特克斯和凯科斯群岛,瓜多罗普|大洋洲,澳大利亚,科克群岛,斐济,法属波里尼西亚、塔希提,瓦努阿图,关岛,基里巴斯,马里亚纳群岛,中途岛,瑙鲁,新咯里多尼亚群岛,新西兰,巴布亚新几内亚,东萨摩亚,西萨摩亚,所罗门群岛,汤加,对诞岛,威克岛,科科斯岛,夏威夷,诺福克岛,帕劳,纽埃岛,图瓦卢,托克鲁,密克罗尼西亚,马绍尔群岛,瓦里斯加富士那群岛";
	if(ShowT)PCAD=SPT+"$"+SCT+","+SAT+"#"+PCAD;
	PCAArea=[];
	PCAP=[];
	PCAC=[];
	PCAA=[];
	PCAN=PCAD.split("#");

	for(i=0;i<PCAN.length;i++)
	{
	    PCAA[i]=[];
	    TArea=PCAN[i].split("$")[1].split("|");


	    for(j=0;j<TArea.length;j++)
	    {
	        PCAA[i][j]=TArea[j].split(",");
	        if(PCAA[i][j].length==1)
	            PCAA[i][j][1]=SAT;
	        TArea[j]=TArea[j].split(",")[0]
	    }

	    PCAArea[i]=PCAN[i].split("$")[0]+","+TArea.join(",");
	    PCAP[i]=PCAArea[i].split(",")[0];
	    PCAC[i]=PCAArea[i].split(',')
	}

	function PCAS()
	{
	    this.SelP=document.getElementsByName(arguments[0])[0];
	    this.SelC=document.getElementsByName(arguments[1])[0];
	    this.SelA=document.getElementsByName(arguments[2])[0];

	    this.DefP=this.SelA?arguments[3]:arguments[2];
	    this.DefC=this.SelA?arguments[4]:arguments[3];
	    this.DefA=this.SelA?arguments[5]:arguments[4];
	    this.SelP.PCA=this;
	    this.SelC.PCA=this;

	    this.SelP.onchange=function()
	    {
	        PCAS.SetC(this.PCA)
	    };
	    if(this.SelA)this.SelC.onchange=function()
	    {
	        PCAS.SetA(this.PCA)
	    };
	    PCAS.SetP(this)
	};
	PCAS.SetP=function(PCA)
	{
	    for(i=0;i<PCAP.length;i++)
	    {
	        PCAPT=PCAPV=PCAP[i];
	        if(PCAPT==SPT)
	            PCAPV="";
	        PCA.SelP.options.add(new Option(PCAPT,PCAPV));
	        if(PCA.DefP==PCAPV)
	            PCA.SelP[i].selected=true}

	    PCAS.SetC(PCA)
	};
	PCAS.SetC=function(PCA)
	{
	    PI=PCA.SelP.selectedIndex;
	    PCA.SelC.length=0;
	    for(i=1;i<PCAC[PI].length;i++)
	    {
	        PCACT=PCACV=PCAC[PI][i];
	        if(PCACT==SCT)
	            PCACV="";
	        PCA.SelC.options.add(new Option(PCACT,PCACV));
	        if(PCA.DefC==PCACV)
	            PCA.SelC[i-1].selected=true
	    }
	    if(PCA.SelA)PCAS.SetA(PCA)
	}
	;
	PCAS.SetA=function(PCA)
	{
	    PI=PCA.SelP.selectedIndex;
	    CI=PCA.SelC.selectedIndex;
	    PCA.SelA.length=0;
	    for(i=1;i<PCAA[PI][CI].length;i++)
	    {
	        PCAAT=PCAAV=PCAA[PI][CI][i];
	        if(PCAAT==SAT)
	            PCAAV="";
	        PCA.SelA.options.add(new Option(PCAAT,PCAAV));
	        if(PCA.DefA==PCAAV)
	            PCA.SelA[i-1].selected=true
	    }
	}


	//-->

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
	!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a},true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return d}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=d:this.template=d}();

/***/ },
/* 56 */
/***/ function(module, exports) {

	
	module.exports = {
	    parseQuery: function(){
	        var query = {};
	        var searchStr = window.location.search;
	        if (searchStr.length){
	            var qstr = searchStr.substring(1);

	            if (qstr)
	                var a = qstr.split('&');
	            for (var i = 0; i < a.length; i++)
	            {
	                var b = a[i].split('=');
	                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
	            }
	        }
	        return query;
	    },
	    getUrlFormParams: function(params){
	        var urlParams = this.parseQuery();
	        urlParams = $.extend(urlParams, params);
	        var host = window.location.host;
	        var baseUrl = window.location.pathname;
	        return   host + baseUrl +'?'+ $.param(urlParams)

	    }
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
	    'use strict';

	    /**
	     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	     *
	     * @codingstandard ftlabs-jsv2
	     * @copyright The Financial Times Limited [All Rights Reserved]
	     * @license MIT License (see LICENSE.txt)
	     */

	    /*jslint browser:true, node:true*/
	    /*global define, Event, Node*/


	    /**
	     * Instantiate fast-clicking listeners on the specified layer.
	     *
	     * @constructor
	     * @param {Element} layer The layer to listen on
	     * @param {Object} [options={}] The options to override the defaults
	     */
	    function FastClick(layer, options) {
	        var oldOnClick;

	        options = options || {};

	        /**
	         * Whether a click is currently being tracked.
	         *
	         * @type boolean
	         */
	        this.trackingClick = false;


	        /**
	         * Timestamp for when click tracking started.
	         *
	         * @type number
	         */
	        this.trackingClickStart = 0;


	        /**
	         * The element being tracked for a click.
	         *
	         * @type EventTarget
	         */
	        this.targetElement = null;


	        /**
	         * X-coordinate of touch start event.
	         *
	         * @type number
	         */
	        this.touchStartX = 0;


	        /**
	         * Y-coordinate of touch start event.
	         *
	         * @type number
	         */
	        this.touchStartY = 0;


	        /**
	         * ID of the last touch, retrieved from Touch.identifier.
	         *
	         * @type number
	         */
	        this.lastTouchIdentifier = 0;


	        /**
	         * Touchmove boundary, beyond which a click will be cancelled.
	         *
	         * @type number
	         */
	        this.touchBoundary = options.touchBoundary || 10;


	        /**
	         * The FastClick layer.
	         *
	         * @type Element
	         */
	        this.layer = layer;

	        /**
	         * The minimum time between tap(touchstart and touchend) events
	         *
	         * @type number
	         */
	        this.tapDelay = options.tapDelay || 200;

	        /**
	         * The maximum time for a tap
	         *
	         * @type number
	         */
	        this.tapTimeout = options.tapTimeout || 700;

	        if (FastClick.notNeeded(layer)) {
	            return;
	        }

	        // Some old versions of Android don't have Function.prototype.bind
	        function bind(method, context) {
	            return function() { return method.apply(context, arguments); };
	        }


	        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	        var context = this;
	        for (var i = 0, l = methods.length; i < l; i++) {
	            context[methods[i]] = bind(context[methods[i]], context);
	        }

	        // Set up event handlers as required
	        if (deviceIsAndroid) {
	            layer.addEventListener('mouseover', this.onMouse, true);
	            layer.addEventListener('mousedown', this.onMouse, true);
	            layer.addEventListener('mouseup', this.onMouse, true);
	        }

	        layer.addEventListener('click', this.onClick, true);
	        layer.addEventListener('touchstart', this.onTouchStart, false);
	        layer.addEventListener('touchmove', this.onTouchMove, false);
	        layer.addEventListener('touchend', this.onTouchEnd, false);
	        layer.addEventListener('touchcancel', this.onTouchCancel, false);

	        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	        // layer when they are cancelled.
	        if (!Event.prototype.stopImmediatePropagation) {
	            layer.removeEventListener = function(type, callback, capture) {
	                var rmv = Node.prototype.removeEventListener;
	                if (type === 'click') {
	                    rmv.call(layer, type, callback.hijacked || callback, capture);
	                } else {
	                    rmv.call(layer, type, callback, capture);
	                }
	            };

	            layer.addEventListener = function(type, callback, capture) {
	                var adv = Node.prototype.addEventListener;
	                if (type === 'click') {
	                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
	                            if (!event.propagationStopped) {
	                                callback(event);
	                            }
	                        }), capture);
	                } else {
	                    adv.call(layer, type, callback, capture);
	                }
	            };
	        }

	        // If a handler is already declared in the element's onclick attribute, it will be fired before
	        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	        // adding it as listener.
	        if (typeof layer.onclick === 'function') {

	            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
	            // - the old one won't work if passed to addEventListener directly.
	            oldOnClick = layer.onclick;
	            layer.addEventListener('click', function(event) {
	                oldOnClick(event);
	            }, false);
	            layer.onclick = null;
	        }
	    }

	    /**
	     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	     *
	     * @type boolean
	     */
	    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	    /**
	     * Android requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	    /**
	     * iOS requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	    /**
	     * iOS 4 requires an exception for select elements.
	     *
	     * @type boolean
	     */
	    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	    /**
	     * iOS 6.0-7.* requires the target element to be manually derived
	     *
	     * @type boolean
	     */
	    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	    /**
	     * BlackBerry requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	    /**
	     * Determine whether a given element requires a native click.
	     *
	     * @param {EventTarget|Element} target Target DOM element
	     * @returns {boolean} Returns true if the element needs a native click
	     */
	    FastClick.prototype.needsClick = function(target) {
	        switch (target.nodeName.toLowerCase()) {

	            // Don't send a synthetic click to disabled inputs (issue #62)
	            case 'button':
	            case 'select':
	            case 'textarea':
	                if (target.disabled) {
	                    return true;
	                }

	                break;
	            case 'input':

	                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
	                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
	                    return true;
	                }

	                break;
	            case 'label':
	            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
	            case 'video':
	                return true;
	        }

	        return (/\bneedsclick\b/).test(target.className);
	    };


	    /**
	     * Determine whether a given element requires a call to focus to simulate click into element.
	     *
	     * @param {EventTarget|Element} target Target DOM element
	     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	     */
	    FastClick.prototype.needsFocus = function(target) {
	        switch (target.nodeName.toLowerCase()) {
	            case 'textarea':
	                return true;
	            case 'select':
	                return !deviceIsAndroid;
	            case 'input':
	                switch (target.type) {
	                    case 'button':
	                    case 'checkbox':
	                    case 'file':
	                    case 'image':
	                    case 'radio':
	                    case 'submit':
	                        return false;
	                }

	                // No point in attempting to focus disabled inputs
	                return !target.disabled && !target.readOnly;
	            default:
	                return (/\bneedsfocus\b/).test(target.className);
	        }
	    };


	    /**
	     * Send a click event to the specified element.
	     *
	     * @param {EventTarget|Element} targetElement
	     * @param {Event} event
	     */
	    FastClick.prototype.sendClick = function(targetElement, event) {
	        var clickEvent, touch;

	        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	        if (document.activeElement && document.activeElement !== targetElement) {
	            document.activeElement.blur();
	        }

	        touch = event.changedTouches[0];

	        // Synthesise a click event, with an extra attribute so it can be tracked
	        clickEvent = document.createEvent('MouseEvents');
	        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	        clickEvent.forwardedTouchEvent = true;
	        targetElement.dispatchEvent(clickEvent);
	    };

	    FastClick.prototype.determineEventType = function(targetElement) {

	        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
	        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
	            return 'mousedown';
	        }

	        return 'click';
	    };


	    /**
	     * @param {EventTarget|Element} targetElement
	     */
	    FastClick.prototype.focus = function(targetElement) {
	        var length;

	        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
	            length = targetElement.value.length;
	            targetElement.setSelectionRange(length, length);
	        } else {
	            targetElement.focus();
	        }
	    };


	    /**
	     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	     *
	     * @param {EventTarget|Element} targetElement
	     */
	    FastClick.prototype.updateScrollParent = function(targetElement) {
	        var scrollParent, parentElement;

	        scrollParent = targetElement.fastClickScrollParent;

	        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	        // target element was moved to another parent.
	        if (!scrollParent || !scrollParent.contains(targetElement)) {
	            parentElement = targetElement;
	            do {
	                if (parentElement.scrollHeight > parentElement.offsetHeight) {
	                    scrollParent = parentElement;
	                    targetElement.fastClickScrollParent = parentElement;
	                    break;
	                }

	                parentElement = parentElement.parentElement;
	            } while (parentElement);
	        }

	        // Always update the scroll top tracker if possible.
	        if (scrollParent) {
	            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	        }
	    };


	    /**
	     * @param {EventTarget} targetElement
	     * @returns {Element|EventTarget}
	     */
	    FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

	        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	        if (eventTarget.nodeType === Node.TEXT_NODE) {
	            return eventTarget.parentNode;
	        }

	        return eventTarget;
	    };


	    /**
	     * On touch start, record the position and scroll offset.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchStart = function(event) {
	        var targetElement, touch, selection;

	        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	        if (event.targetTouches.length > 1) {
	            return true;
	        }

	        targetElement = this.getTargetElementFromEventTarget(event.target);
	        touch = event.targetTouches[0];

	        if (deviceIsIOS) {

	            // Only trusted events will deselect text on iOS (issue #49)
	            selection = window.getSelection();
	            if (selection.rangeCount && !selection.isCollapsed) {
	                return true;
	            }

	            if (!deviceIsIOS4) {

	                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
	                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
	                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
	                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
	                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
	                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
	                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
	                // random integers, it's safe to to continue if the identifier is 0 here.
	                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
	                    event.preventDefault();
	                    return false;
	                }

	                this.lastTouchIdentifier = touch.identifier;

	                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
	                // 1) the user does a fling scroll on the scrollable layer
	                // 2) the user stops the fling scroll with another tap
	                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
	                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
	                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
	                this.updateScrollParent(targetElement);
	            }
	        }

	        this.trackingClick = true;
	        this.trackingClickStart = event.timeStamp;
	        this.targetElement = targetElement;

	        this.touchStartX = touch.pageX;
	        this.touchStartY = touch.pageY;

	        // Prevent phantom clicks on fast double-tap (issue #36)
	        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
	            event.preventDefault();
	        }

	        return true;
	    };


	    /**
	     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.touchHasMoved = function(event) {
	        var touch = event.changedTouches[0], boundary = this.touchBoundary;

	        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
	            return true;
	        }

	        return false;
	    };


	    /**
	     * Update the last position.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchMove = function(event) {
	        if (!this.trackingClick) {
	            return true;
	        }

	        // If the touch has moved, cancel the click tracking
	        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
	            this.trackingClick = false;
	            this.targetElement = null;
	        }

	        return true;
	    };


	    /**
	     * Attempt to find the labelled control for the given label element.
	     *
	     * @param {EventTarget|HTMLLabelElement} labelElement
	     * @returns {Element|null}
	     */
	    FastClick.prototype.findControl = function(labelElement) {

	        // Fast path for newer browsers supporting the HTML5 control attribute
	        if (labelElement.control !== undefined) {
	            return labelElement.control;
	        }

	        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
	        if (labelElement.htmlFor) {
	            return document.getElementById(labelElement.htmlFor);
	        }

	        // If no for attribute exists, attempt to retrieve the first labellable descendant element
	        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	    };


	    /**
	     * On touch end, determine whether to send a click event at once.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchEnd = function(event) {
	        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	        if (!this.trackingClick) {
	            return true;
	        }

	        // Prevent phantom clicks on fast double-tap (issue #36)
	        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
	            this.cancelNextClick = true;
	            return true;
	        }

	        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
	            return true;
	        }

	        // Reset to prevent wrong click cancel on input (issue #156).
	        this.cancelNextClick = false;

	        this.lastClickTime = event.timeStamp;

	        trackingClickStart = this.trackingClickStart;
	        this.trackingClick = false;
	        this.trackingClickStart = 0;

	        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
	        // is performing a transition or scroll, and has to be re-detected manually. Note that
	        // for this to function correctly, it must be called *after* the event target is checked!
	        // See issue #57; also filed as rdar://13048589 .
	        if (deviceIsIOSWithBadTarget) {
	            touch = event.changedTouches[0];

	            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
	            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
	            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	        }

	        targetTagName = targetElement.tagName.toLowerCase();
	        if (targetTagName === 'label') {
	            forElement = this.findControl(targetElement);
	            if (forElement) {
	                this.focus(targetElement);
	                if (deviceIsAndroid) {
	                    return false;
	                }

	                targetElement = forElement;
	            }
	        } else if (this.needsFocus(targetElement)) {

	            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
	            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
	            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
	                this.targetElement = null;
	                return false;
	            }

	            this.focus(targetElement);
	            this.sendClick(targetElement, event);

	            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
	            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
	            if (!deviceIsIOS || targetTagName !== 'select') {
	                this.targetElement = null;
	                event.preventDefault();
	            }

	            return false;
	        }

	        if (deviceIsIOS && !deviceIsIOS4) {

	            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
	            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
	            scrollParent = targetElement.fastClickScrollParent;
	            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
	                return true;
	            }
	        }

	        // Prevent the actual click from going though - unless the target node is marked as requiring
	        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	        if (!this.needsClick(targetElement)) {
	            event.preventDefault();
	            this.sendClick(targetElement, event);
	        }

	        return false;
	    };


	    /**
	     * On touch cancel, stop tracking the click.
	     *
	     * @returns {void}
	     */
	    FastClick.prototype.onTouchCancel = function() {
	        this.trackingClick = false;
	        this.targetElement = null;
	    };


	    /**
	     * Determine mouse events which should be permitted.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onMouse = function(event) {

	        // If a target element was never set (because a touch event was never fired) allow the event
	        if (!this.targetElement) {
	            return true;
	        }

	        if (event.forwardedTouchEvent) {
	            return true;
	        }

	        // Programmatically generated events targeting a specific element should be permitted
	        if (!event.cancelable) {
	            return true;
	        }

	        // Derive and check the target element to see whether the mouse event needs to be permitted;
	        // unless explicitly enabled, prevent non-touch click events from triggering actions,
	        // to prevent ghost/doubleclicks.
	        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

	            // Prevent any user-added listeners declared on FastClick element from being fired.
	            if (event.stopImmediatePropagation) {
	                event.stopImmediatePropagation();
	            } else {

	                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	                event.propagationStopped = true;
	            }

	            // Cancel the event
	            event.stopPropagation();
	            event.preventDefault();

	            return false;
	        }

	        // If the mouse event is permitted, return true for the action to go through.
	        return true;
	    };


	    /**
	     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	     * an actual click which should be permitted.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onClick = function(event) {
	        var permitted;

	        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	        if (this.trackingClick) {
	            this.targetElement = null;
	            this.trackingClick = false;
	            return true;
	        }

	        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	        if (event.target.type === 'submit' && event.detail === 0) {
	            return true;
	        }

	        permitted = this.onMouse(event);

	        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	        if (!permitted) {
	            this.targetElement = null;
	        }

	        // If clicks are permitted, return true for the action to go through.
	        return permitted;
	    };


	    /**
	     * Remove all FastClick's event listeners.
	     *
	     * @returns {void}
	     */
	    FastClick.prototype.destroy = function() {
	        var layer = this.layer;

	        if (deviceIsAndroid) {
	            layer.removeEventListener('mouseover', this.onMouse, true);
	            layer.removeEventListener('mousedown', this.onMouse, true);
	            layer.removeEventListener('mouseup', this.onMouse, true);
	        }

	        layer.removeEventListener('click', this.onClick, true);
	        layer.removeEventListener('touchstart', this.onTouchStart, false);
	        layer.removeEventListener('touchmove', this.onTouchMove, false);
	        layer.removeEventListener('touchend', this.onTouchEnd, false);
	        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	    };


	    /**
	     * Check whether FastClick is needed.
	     *
	     * @param {Element} layer The layer to listen on
	     */
	    FastClick.notNeeded = function(layer) {
	        var metaViewport;
	        var chromeVersion;
	        var blackberryVersion;
	        var firefoxVersion;

	        // Devices that don't support touch don't need FastClick
	        if (typeof window.ontouchstart === 'undefined') {
	            return true;
	        }

	        // Chrome version - zero for other browsers
	        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	        if (chromeVersion) {

	            if (deviceIsAndroid) {
	                metaViewport = document.querySelector('meta[name=viewport]');

	                if (metaViewport) {
	                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
	                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
	                        return true;
	                    }
	                    // Chrome 32 and above with width=device-width or less don't need FastClick
	                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
	                        return true;
	                    }
	                }

	                // Chrome desktop doesn't need FastClick (issue #15)
	            } else {
	                return true;
	            }
	        }

	        if (deviceIsBlackBerry10) {
	            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

	            // BlackBerry 10.3+ does not require Fastclick library.
	            // https://github.com/ftlabs/fastclick/issues/251
	            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
	                metaViewport = document.querySelector('meta[name=viewport]');

	                if (metaViewport) {
	                    // user-scalable=no eliminates click delay.
	                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
	                        return true;
	                    }
	                    // width=device-width (or less than device-width) eliminates click delay.
	                    if (document.documentElement.scrollWidth <= window.outerWidth) {
	                        return true;
	                    }
	                }
	            }
	        }

	        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
	        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
	            return true;
	        }

	        // Firefox version - zero for other browsers
	        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	        if (firefoxVersion >= 27) {
	            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

	            metaViewport = document.querySelector('meta[name=viewport]');
	            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
	                return true;
	            }
	        }

	        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
	        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
	        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
	            return true;
	        }

	        return false;
	    };


	    /**
	     * Factory method for creating a FastClick object
	     *
	     * @param {Element} layer The layer to listen on
	     * @param {Object} [options={}] The options to override the defaults
	     */
	    FastClick.attach = function(layer, options) {
	        return new FastClick(layer, options);
	    };


	    if (true) {

	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return FastClick;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module.exports) {
	        module.exports = FastClick.attach;
	        module.exports.FastClick = FastClick;
	    } else {
	        window.FastClick = FastClick;
	    }
	}());

/***/ }
/******/ ]);