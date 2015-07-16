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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	__webpack_require__(30);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);

	$(function() {
	    var main = {
	        init: function() {
	            this.initForm();
	        },
	        initForm: function() {
	            var $formCondition = this.$formCondition = $('#formCondition');
	            //$formCondition.on('touchend', '.btn-submit', function() {
	            //    debugger;
	            //
	            //});
	            $formCondition.Validform({
	                tiptype: function(msg, o, cssControl) {
	                    //msg：提示信息;
	                    //o:{
	                    // obj:*,  // obj指向的是当前验证的表单元素（或表单对象）
	                    // type:*, // type指示提示的状态，值为1、2、3、4，  1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态,
	                    // curform:* //  curform为当前form对象;
	                    // },

	                    //cssControl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
	                    if(!o.obj.is("form")) {//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
	                        var objtip= o.obj.closest(".question").find(".Validform_checktip");
	                        console.log( o.type);
	                        cssControl(objtip, o.type);
	                        if (o.tip != 2){
	                            objtip.text(msg);
	                        }
	                    }

	                },
	                showAllError: true,
	                datatype:{
	                    "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
	                }

	            });
	            $formCondition.ajaxForm( {
	                beforeSubmit: this.validateForm
	            });
	            //function validateForm() {
	            //    console.log('abc');
	            //}
	        },
	        validateForm: function(arr, $form, options) {
	             var hasEmpty = false;
	             $('.question-result').find('.zui-radio')
	             return hasEmpty;
	        }

	    }
	    main.init();

	});

	function abcd() {
	    var voidValue = {//策略者
	        Config : {},//默认配置规则
	        Message : {//未通过验证时输出的信息
	            isEmpty : 'EMPTY',
	            isPhone : 'NOTPHONE',
	            isBoolean : 'NOTBOOLEAN',
	            isLength : 'BIGGER THAN MAX',
	            isUndefined : 'UNDEFINED',
	            isNumber : 'NOTNUMBER'
	        },
	        Rules : {//自定义规则，所有的规则在里面逐步添加
	            isEmpty : function(v) {
	                return v != '';
	            },
	            isUndefined :  function(v) {
	                return typeof v === 'undefined';
	            },
	            isPhone : function(v) {
	                return /^1[3|4|5|8]\d{9}$/.test(v);
	            },
	            isBoolean : function(v) {
	                return Object.prototype.toString.call(v) === '[object Boolean]';
	            },
	            isNumber : function(v) {
	                return Object.prototype.toString.call(v) === '[object Number]';
	            },
	            isName :  function(v) {
	                return /^[\u4E00-\u9FFF]{1,6}$/.test(v);
	            },
	            isAdress : function(v) {
	                return this.isEmpty(v) && v.length<200;
	            }
	        },
	        vaild : function(data, callback) {//入口函数，传入数据源
	            var ruleFun;
	            var message;
	            for (var i in data) {//循环传入的对象
	                if (!this.Config[i]) continue;
	                if (this.Config[i].ruleFun) {
	                    //判断是否有用户自定义输出的字符串，这里其实是经常用到的，比如某个字段没有通过验证需要怎么样提示，
	                    // 以及提示的文字，在验证表单是尤其重要！
	                    ruleFun = this.Rules[this.Config[i]['ruleFun']] || this.Config[i]['ruleFun'];
	                    message = this.Config[i]['tip'];
	                } else {
	                    ruleFun = this.Rules[this.Config[i]] || this.Config[i];
	                    message = this.Message[this.Config[i]];
	                }
	                var t = Object.prototype.toString.call(ruleFun);//这里我们判断是需要执行验证函数还是比对数值大小
	                if(t === '[object Function]') {
	                    if(!ruleFun(data[i])) {
	                        console.warn(message);
	                        return false;
	                    }
	                }else if(t === '[object Number]') {
	                    if(!/\d+/.test(data[i]) || parseInt(data[i]) >= ruleFun) {
	                        console.warn(message);
	                        return false;
	                    }
	                }
	            }
	            return data;//如果都匹配到了，可以输出完整的数据源对象。
	        }
	    };
	}

/***/ },

/***/ 20:
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

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/**\n * flexbox grid system\n * @author: songhe.zl@alibaba-inc.com\n * @date: 2015-04-14\n */\n/* !!cmd:lessbuild=false */\n/* http://dev.opera.com/static/dstorey/text/text-overflow.html */\n/* https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html */\n.zui-btn {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  line-height: 25px;\n  height: 27px;\n  font-size: 14px;\n  vertical-align: middle;\n  text-align: center;\n  overflow: visible;\n  cursor: pointer;\n  background: #fff;\n  font-family: Heiti SC, Helvetica Neue, Droid Sans Fallback, Roboto;\n  -webkit-border-radius: 25px;\n  border-radius: 25px;\n  background-clip: padding-box;\n  -webkit-background-clip: padding-box;\n  padding: 0 12px;\n  border: 1px solid #979797;\n  color: #666666;\n}\n.zui-btn.small {\n  min-width: 50px;\n  height: 25px;\n  line-height: 25px;\n  font-size: 13px;\n}\n.zui-btn.zui-btn-disabled {\n  color: #bfbfbf;\n}\n.zui-btn,\n.zui-btn-pic,\n.zui-btn:hover,\n.zui-btn-pic:hover {\n  border: solid 1px #979797;\n  color: #666666;\n  background-color: #ffffff;\n}\n.zui-btn:active,\n.zui-btn-pic:active,\n.zui-btn.pressing,\n.zui-btn-pic.pressing {\n  background-color: #ebebeb;\n  /* border-color: #e5e5e5; */\n  color: #666;\n}\n.zui-btn.zui-btn-disabled,\n.zui-btn-pic.zui-btn-disabled {\n  color: #bfbfbf;\n  background-color: #ffffff;\n}\n.zui-btn-hint,\n.zui-btn-checked,\n.zui-btn-hint:hover,\n.zui-btn-checked:hover {\n  border: solid 1px #7ed321;\n  color: #7ed321;\n  background-color: #ffffff;\n}\n.zui-btn-hint:active,\n.zui-btn-checked:active,\n.zui-btn-hint.pressing,\n.zui-btn-checked.pressing {\n  color: #7ed321;\n  background-color: #fff0e4;\n}\n.zui-btn-hint.zui-btn-disabled,\n.zui-btn-checked.zui-btn-disabled {\n  color: #bfbfbf;\n  background-color: #ffffff;\n  border-color: #e5e5e5;\n}\n.zui-btn-hint .icon,\n.zui-btn-checked .icon {\n  width: 24px;\n}\n.zui-btn-hint > .icon,\n.zui-btn-checked > .icon,\n.zui-btn-hint > span,\n.zui-btn-checked > span {\n  height: 24px;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 24px;\n}\n.zui-btn-checked {\n  position: relative;\n}\n.zui-btn-checked:after {\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  background-size: cover;\n  content: ' ';\n}\n.zui-btn.zui-btn-important,\n.zui-btn.zui-btn-important:hover {\n  color: #fff;\n  border: 1px solid  transparent;\n  background-color: #F56467;\n}\n.zui-btn.zui-btn-important:active,\n.zui-btn.zui-btn-important.pressing,\n.zui-btn.zui-btn-important:hover {\n  background-color: #e16164;\n}\n.zui-btn.zui-btn-important.zui-btn-disabled {\n  color: #ffffff;\n  background-color: #e5e5e5;\n}\n.zui-btn-flex.zui-btn-action,\n.zui-btn-action {\n  color: #fff;\n  background-color: #7ED321;\n  border-color: transparent;\n}\n.zui-btn-flex.zui-btn-action.pressing,\n.zui-btn-action.pressing {\n  background-color: #7ED321;\n}\n.zui-btn-flex.zui-btn-action:active,\n.zui-btn-action:active,\n.zui-btn-flex.zui-btn-action:hover,\n.zui-btn-action:hover {\n  background-color: #77cc21;\n  color: #fff;\n  border-color: transparent;\n}\n.zui-btn-flex,\n.zui-btn-flex:hover {\n  -webkit-border-radius: 0;\n  -webkit-background-clip: padding-box;\n  border-radius: 0;\n  background-clip: padding-box;\n  padding: 0;\n  border: none;\n  width: 100%;\n}\n.zui-btn-flex.zui-btn-disabled {\n  background-color: #a6a6a6;\n  color: #fff;\n}\n", ""]);

	// exports


/***/ },

/***/ 22:
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

/***/ 23:
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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n  text-decoration: none;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box; /* 2 */\n  box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}", ""]);

	// exports


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./detail.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./detail.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports
	exports.i(__webpack_require__(26), "");

	// module
	exports.push([module.id, "/**\n * flexbox grid system\n * @author: songhe.zl@alibaba-inc.com\n * @date: 2015-04-14\n */\n/* !!cmd:lessbuild=false */\n/* http://dev.opera.com/static/dstorey/text/text-overflow.html */\n/* https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html */\n/*! lofty.css build 15/01/07 14:46:22 */\n/**\n * @module reset.css for lofty mobile\n * @author jianping.shenjp shanshan.hongss\n * @editor Edgar\n * @version v0.2.0\n * @date 150107\n * */\n/**\n * Thanks to:\n * normalize.css, http://necolas.github.io/normalize.css/\n * */\n*,\n*:before,\n*:after {\n  /* 设置元素的盒模型为border-box */\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  /* 使Chrome使用小于12px的字体 */\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n  /* 去除点击元素后的高亮效果 */\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n/*去除元素周围的虚线*/\n*:focus {\n  outline: none;\n}\n/* 清除内外边距 */\nbody,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nform,\nth,\ntd,\nfigure {\n  margin: 0;\n  padding: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n  font-weight: normal;\n}\nem {\n  font-style: normal;\n}\nstrong {\n  font-weight: 700;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%;\n  font-family: inherit;\n}\n/*重置文本格式*/\na {\n  text-decoration: none;\n}\na:hover,\na:active {\n  color: #ff7979;\n}\nq:before,\nq:after {\n  content: \"\";\n}\n/* 重置表格元素 */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n/* 去除默认边框 */\nfieldset,\nimg {\n  border: none;\n}\n/* 重置列表元素 */\nul,\nol {\n  list-style: none;\n}\ntextarea,\ninput[type=\"text\"],\ninput[type=\"submit\"],\ninput[type=\"password\"] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n.zui-clear {\n  clear: both;\n}\n.clearfix:before,\n.zui-clr:before,\n.clearfix:after,\n.zui-clr:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.zui-clr:after {\n  clear: both;\n}\n.clearfix:before,\n.zui-clr:before,\n.clearfix:after,\n.zui-clr:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.zui-clr:after {\n  clear: both;\n}\n/* float */\n.zui-left {\n  float: left;\n}\n.zui-right {\n  float: right;\n}\n/* display */\n.zui-hide {\n  display: none;\n}\n.zui-show {\n  display: block;\n}\n/* position */\n.zui-locate {\n  position: relative;\n}\n.zui-fixed,\n.zui-fixed-bottom {\n  position: fixed!important;\n  left: 0;\n  right: 0;\n  z-index: 99;\n  width: 100%;\n}\n.zui-fixed {\n  top: 0;\n}\n.zui-fixed-bottom {\n  bottom: 0;\n}\na {\n  color: #666;\n}\n.zui-flex {\n  display: -webkit-box !important;\n  display: -webkit-flex !important;\n  display: flex !important;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.zui-flex,\n.zui-flex *,\n.zui-flex *:after,\n.zui-flex *:before {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.zui-flex.vertical {\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n.zui-flex.vertical.reverse {\n  -webkit-box-direction: reverse;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n}\n.zui-flex.vertical .zui-cell {\n  width: auto;\n}\n.zui-flex.vertical > .zui-cell > .zui-flex-inner {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.zui-flex.horizental {\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.zui-flex.reverse {\n  -webkit-box-direction: reverse;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n.zui-flex.justify-start {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n}\n.zui-flex.justify-end {\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  justify-content: flex-end;\n}\n.zui-flex.justify-center {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n}\n.zui-flex.justify-between {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n}\n.zui-flex.justify-around {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n}\n.zui-flex.align-start {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n}\n.zui-flex.align-end {\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n  align-items: flex-end;\n}\n.zui-flex.align-center {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n}\n.zui-flex.align-stretch {\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n}\n.zui-flex.align-stretch .zui-cell {\n  height: auto !important;\n}\n.zui-flex.center {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n}\n.zui-flex > .zui-cell {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  flex: 1;\n  width: 0;\n  -webkit-flex-basis: 0;\n  flex-basis: 0;\n  max-width: 100%;\n  display: block;\n  padding: 0 !important;\n  position: relative;\n}\n.zui-flex > .zui-cell.zui-flex-fixed {\n  -webkit-box-flex: none !important;\n  -webkit-flex: none !important;\n  flex: none !important;\n  width: auto;\n}\n.zui-flex > .zui-cell.align-start {\n  -webkit-align-self: flex-start;\n  align-self: flex-start;\n}\n.zui-flex > .zui-cell.align-end {\n  -webkit-align-self: flex-end;\n  align-self: flex-end;\n}\n.zui-flex > .zui-cell.align-center {\n  -webkit-align-self: center;\n  align-self: center;\n}\n.zui-flex > .zui-cell.align-stretch {\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  height: auto !important;\n}\n.zui-flex .image-box {\n  height: 0;\n  padding-bottom: 100%;\n  position: relative;\n}\n.zui-flex .image-box > img {\n  width: 100%;\n  height: 100%;\n  display: block;\n  position: absolute;\n}\n.zui-flex > .zui-cell-12 {\n  -webkit-flex-basis: 100%;\n  flex-basis: 100%;\n  max-width: 100%;\n  width: auto !important;\n}\n.zui-flex > .order-12 {\n  -webkit-box-ordinal-group: 12;\n  -webkit-order: 12;\n  order: 12;\n}\n.zui-flex > .zui-cell-11 {\n  -webkit-flex-basis: 91.66666666666666%;\n  flex-basis: 91.66666666666666%;\n  max-width: 91.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-11 {\n  -webkit-box-ordinal-group: 11;\n  -webkit-order: 11;\n  order: 11;\n}\n.zui-flex > .zui-cell-10 {\n  -webkit-flex-basis: 83.33333333333334%;\n  flex-basis: 83.33333333333334%;\n  max-width: 83.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-10 {\n  -webkit-box-ordinal-group: 10;\n  -webkit-order: 10;\n  order: 10;\n}\n.zui-flex > .zui-cell-9 {\n  -webkit-flex-basis: 75%;\n  flex-basis: 75%;\n  max-width: 75%;\n  width: auto !important;\n}\n.zui-flex > .order-9 {\n  -webkit-box-ordinal-group: 9;\n  -webkit-order: 9;\n  order: 9;\n}\n.zui-flex > .zui-cell-8 {\n  -webkit-flex-basis: 66.66666666666666%;\n  flex-basis: 66.66666666666666%;\n  max-width: 66.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-8 {\n  -webkit-box-ordinal-group: 8;\n  -webkit-order: 8;\n  order: 8;\n}\n.zui-flex > .zui-cell-7 {\n  -webkit-flex-basis: 58.333333333333336%;\n  flex-basis: 58.333333333333336%;\n  max-width: 58.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-7 {\n  -webkit-box-ordinal-group: 7;\n  -webkit-order: 7;\n  order: 7;\n}\n.zui-flex > .zui-cell-6 {\n  -webkit-flex-basis: 50%;\n  flex-basis: 50%;\n  max-width: 50%;\n  width: auto !important;\n}\n.zui-flex > .order-6 {\n  -webkit-box-ordinal-group: 6;\n  -webkit-order: 6;\n  order: 6;\n}\n.zui-flex > .zui-cell-5 {\n  -webkit-flex-basis: 41.66666666666667%;\n  flex-basis: 41.66666666666667%;\n  max-width: 41.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-5 {\n  -webkit-box-ordinal-group: 5;\n  -webkit-order: 5;\n  order: 5;\n}\n.zui-flex > .zui-cell-4 {\n  -webkit-flex-basis: 33.33333333333333%;\n  flex-basis: 33.33333333333333%;\n  max-width: 33.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-4 {\n  -webkit-box-ordinal-group: 4;\n  -webkit-order: 4;\n  order: 4;\n}\n.zui-flex > .zui-cell-3 {\n  -webkit-flex-basis: 25%;\n  flex-basis: 25%;\n  max-width: 25%;\n  width: auto !important;\n}\n.zui-flex > .order-3 {\n  -webkit-box-ordinal-group: 3;\n  -webkit-order: 3;\n  order: 3;\n}\n.zui-flex > .zui-cell-2 {\n  -webkit-flex-basis: 16.666666666666664%;\n  flex-basis: 16.666666666666664%;\n  max-width: 16.66666667%;\n  width: auto !important;\n}\n.zui-flex > .order-2 {\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 2;\n  order: 2;\n}\n.zui-flex > .zui-cell-1 {\n  -webkit-flex-basis: 8.333333333333332%;\n  flex-basis: 8.333333333333332%;\n  max-width: 8.33333333%;\n  width: auto !important;\n}\n.zui-flex > .order-1 {\n  -webkit-box-ordinal-group: 1;\n  -webkit-order: 1;\n  order: 1;\n}\ninput,\ntextarea {\n  -webkit-border-radius: 0;\n  -webkit-background-clip: padding-box;\n  border-radius: 0;\n  background-clip: padding-box;\n}\nbody {\n  font-size: 12px;\n}\n.text-overflow,\n.activity-list-item .tt,\n.activity-list-item .address,\n.activity-list-item .zui-flex-fixed {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zui-align-right {\n  text-align: right;\n}\n.zui-align-right > div {\n  display: inline-block;\n}\n.zui-align-center {\n  text-align: center;\n}\n.zui-link {\n  color: #4A90E2;\n  font-size: 12px;\n  text-decoration: underline;\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n.dialog {\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -100px;\n  margin-top: -100px;\n  background-color: #fff;\n  border: 1px solid #eee;\n  padding: 10px;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n}\n.dialog .tip-icon {\n  width: 50px;\n  height: 50px;\n  display: inline-block;\n  background-color: #7ED321;\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n  overflow: hidden;\n}\n.dialog .icon-success {\n  background-position: 0 -50px;\n}\n.dialog .dialog-bottom {\n  padding: 10px 0;\n}\n.dialog .text {\n  color: #727272;\n  font-size: 12px;\n  padding: 10px 0;\n}\n.header {\n  height: 50px;\n  padding: 10px 0;\n}\n.header .btn-search {\n  padding: 0;\n}\n.header .zui-btn {\n  margin-right: 8px;\n  padding: 0;\n}\n.header .logo {\n  padding-left: 10px;\n  font-size: 24px;\n  line-height: 24px;\n}\n.header .logo-warp .item {\n  display: inline-block;\n  vertical-align: bottom;\n}\n.header .city {\n  font-size: 12px;\n  color: #727272;\n  width: 7em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  position: relative;\n}\n.header .icon-arrow-up {\n  height: 15px;\n  background-position: -50px -5px;\n  -webkit-transition: 200ms all ease;\n  -moz-transition: 200ms all ease;\n  transition: 200ms all ease;\n}\n.header .active .icon-arrow-up {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.header .nav {\n  font-size: 0;\n}\n.header .nav-item {\n  -webkit-border-radius: 25px;\n  -webkit-background-clip: padding-box;\n  border-radius: 25px;\n  background-clip: padding-box;\n  width: 26px;\n  height: 26px;\n  margin-right: 12px;\n  border: 1px solid #BEBEBE;\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n}\n.header .nav-item.user {\n  border: 0;\n}\n.header .active.nav-item:after,\n.header .active.nav-item:before {\n  content: \"\";\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  top: -1px;\n  left: -1px;\n  -webkit-border-radius: 25px;\n  -webkit-background-clip: padding-box;\n  border-radius: 25px;\n  background-clip: padding-box;\n}\n.header .active.nav-item {\n  border-color: #eaeaea;\n}\n.header .active.nav-item .zui-icon {\n  background: none;\n}\n.header .active.nav-item:after {\n  z-index: 9;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.header .active.nav-item:before {\n  z-index: 10;\n  background-image: url(\"/assets/img/icon500x500.png\");\n  -webkit-background-size: 250px 250px;\n  background-size: 250px 250px;\n  background-position: 0 -25px;\n}\n.header .nav-item img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n  overflow: hidden;\n}\n.header .nav-item-msg {\n  position: relative;\n}\n.header .nav-item-msg .number {\n  position: absolute;\n  right: -12px;\n  text-align: center;\n  line-height: 20px;\n  font-size: 12px;\n  z-index: 11;\n  top: -8px;\n  height: 20px;\n  min-width: 20px;\n  padding: 0 2px;\n  -webkit-border-radius: 20px;\n  -webkit-background-clip: padding-box;\n  border-radius: 20px;\n  background-clip: padding-box;\n  overflow: hidden;\n  background-color: #F56467;\n  color: #fff;\n}\n.header .btn-login {\n  width: 40px;\n}\n.header .btn-login span {\n  display: block;\n  line-height: 25px;\n  text-align: center;\n  color: #727272;\n  font-size: 12px;\n}\n[class~=zui-icon],\n.zui-icon {\n  width: 25px;\n  height: 25px;\n  display: inline-block;\n  font-size: 0;\n  line-height: 0;\n  vertical-align: middle;\n  background-image: url(\"/assets/img/icon500x500.png\");\n  -webkit-background-size: 250px 250px;\n  background-size: 250px 250px;\n}\n[class~=zui-icon].icon-big,\n.zui-icon.icon-big {\n  width: 50px;\n  height: 50px;\n  -webkit-background-size: 250px 250px;\n  background-size: 250px 250px;\n}\n.icon-plus {\n  background-position: -25px -1px;\n}\n.icon-email {\n  background-position: -201px 0px;\n}\n.icon-arrow-up {\n  background-position: -50px 0;\n}\n.icon-address {\n  background-position: -75px -2px;\n}\n.icon-date {\n  background-position: -150px -2px;\n}\n.icon-distance {\n  background-position: -125px -2px;\n}\n.icon-number {\n  background-position: -100px -2px;\n}\n.icon-medal {\n  background-position: -75px -225px;\n}\n.icon-price {\n  background-position: -200px 0;\n}\n.icon-share {\n  background-position: 0 -225px;\n}\n.icon-delete {\n  background-position: -225px 3px;\n}\n.icon-copy {\n  background-position: -75px -23px;\n}\n.icon-edit {\n  background-position: -100px -25px;\n}\n.icon-success {\n  -webkit-background-size: 125px 125px;\n  background-size: 125px 125px;\n  background-position: 0 -25px;\n}\n.icon-sys {\n  background-position: 0 -100px;\n}\n.icon-notice {\n  background-position: -25px -100px;\n}\n.icon-star {\n  background-position: -50px -100px;\n}\n.icon-qrcode {\n  background-position: -50px -25px;\n}\n.icon-user {\n  background-position: -75px -100px;\n}\n.icon-pwd {\n  background-position: -100px -100px;\n}\n.icon-close {\n  background-position: 0px -25px;\n}\n.icon-verifycode {\n  background-position: -150px -100px;\n}\n.icon-phone {\n  background-position: -175px -100px;\n}\n.icon-lock {\n  background-position: -150px -100px;\n}\n.icon-forward {\n  background-position: 0px -175px;\n}\n.icon-like {\n  background-position: -25px -200px;\n}\n.active .icon-arrow-up {\n  -webkit-transform: rotateZ(180deg);\n  transform: rotateZ(180deg);\n}\n.top-tab {\n  overflow-x: scroll;\n  width: 100%;\n  padding-bottom: 10px;\n}\n.top-tab .tab {\n  width: 460px;\n  height: 36px;\n  font-size: 17px;\n}\n.top-tab .tab-item {\n  float: left;\n  margin: 0 10px;\n  height: 35px;\n  line-height: 35px;\n}\n.top-tab .tab-item.active {\n  border-bottom: 1px solid #333;\n}\n.activity-lists {\n  padding: 5px;\n  background-color: #eaeaea;\n}\n.activity-list-item {\n  padding: 10px 5px;\n  background-color: #fff;\n  display: block;\n}\n.activity-list-item .thumbnail {\n  height: 68px;\n  width: 92px;\n}\n.activity-list-item .tt {\n  height: 24px;\n  font-size: 14px;\n  display: block;\n}\n.activity-list-item .list-item-desc {\n  padding: 0px 5px 0 5px;\n}\n.activity-list-item .list-item-desc .zui-cell {\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n}\n.activity-list-item .list-item-desc > div {\n  width: 100%;\n  height: 100%;\n}\n.activity-list-item .zui-flex-fixed {\n  width: 65px;\n}\n.activity-list-item .list-item-desc .zui-icon {\n  -webkit-transform: scale(0.7, 0.7);\n  transform: scale(0.7, 0.7);\n}\n.activity-list-item .list-item {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eaeaea;\n  margin-bottom: 5px;\n}\n.activity-list-item .btn-tip-text {\n  color: #BEBEBE;\n  font-size: 12px;\n  margin-right: -5em;\n}\n.activity-list-item {\n  margin-bottom: 5px;\n}\n.activity-list-item .m-tag {\n  padding-top: 5px;\n  height: 25px;\n}\n.activity-list-item .m-tag .m-tag-inner {\n  float: right;\n}\n.activity-list-item .m-tag .hot {\n  display: inline-block;\n  background-color: #ff7979;\n  color: #fff;\n  padding: 2px 5px;\n  font-size: 12px;\n  margin-right: 10px;\n}\n.activity-list-item .m-tag .price {\n  display: inline-block;\n  background-color: #fff;\n  color: #ff7979;\n}\n.activity-list-item .activity-operation {\n  padding: 10px 0 0;\n}\n.activity-list-item .operation-btn {\n  margin: 0 10px;\n}\n.activity-status .zui-btn {\n  min-width: 100px;\n}\n.mine {\n  font-size: 12px;\n  color: #727272;\n}\n.mine .mine-header {\n  font-size: 12px;\n  padding: 0 5px;\n  margin-bottom: 5px;\n}\n.mine .mine-header span {\n  margin-right: 5px;\n}\n.mine .th {\n  height: 30px;\n  line-height: 30px;\n}\n.mine .img {\n  width: 35px;\n  height: 35px;\n  -webkit-border-radius: 35px;\n  -webkit-background-clip: padding-box;\n  border-radius: 35px;\n  background-clip: padding-box;\n  display: inline-block;\n  overflow: hidden;\n  vertical-align: middle;\n}\n.mine .img img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.mine .center {\n  width: 100px;\n  display: block;\n  text-align: center;\n}\n.mine .zui-flex-fixed {\n  width: 100px;\n  padding: 0 10px;\n}\n.mine-content {\n  padding-top: 10px;\n  border-top: 1px solid #BEBEBE;\n}\n.mine-content .th {\n  font-weight: bold;\n}\n.mine-content .tr {\n  margin-bottom: 10px;\n}\n.mine-content .tr .name {\n  display: block;\n  min-width: 4em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 5em;\n  padding-left: 5px;\n}\n.mine-content .tr .zui-cell {\n  border-bottom: 1px solid #BEBEBE;\n}\n.mine-content .tr .zui-cell:first-child {\n  border-bottom-color: transparent;\n}\n.mine-content .tr-item {\n  height: 35px;\n  line-height: 35px;\n  padding: 0 10px;\n}\n.mine-content .look-detail {\n  margin-left: 5px;\n}\n.mine-content .zui-btn {\n  padding: 0 10px;\n}\n.mine-content .zui-icon {\n  width: 20px;\n}\n.mine-content .icon-success {\n  background-position: -4px -25px;\n}\n.mine-content .activity-msg-detail {\n  padding: 0 0 5px 0;\n  margin-left: 60px;\n  position: relative;\n  top: -1px;\n  background-color: #fff;\n  border-bottom: 1px solid #BEBEBE;\n}\n.mine-content .activity-msg-detail p {\n  color: #B8B8B8;\n  padding: 5px;\n}\n.mine-content .activity-msg-detail li {\n  margin: 5px 0;\n}\n.mine-content .activity-msg-detail .q-tt {\n  color: #4b4b4b;\n}\n.mine-content .activity-msg-detail .q-an {\n  color: #727272;\n}\n.zui-checkbox,\n.zui-radio {\n  display: inline-block;\n  position: relative;\n  line-height: 24px;\n  width: 20px;\n  height: 20px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 2px 0 0 2px;\n  vertical-align: middle;\n}\n.zui-icon-radio {\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n}\n.zui-icon-checkbox {\n  -webkit-border-radius: 2px;\n  -webkit-background-clip: padding-box;\n  border-radius: 2px;\n  background-clip: padding-box;\n}\n.zui-icon-checkbox,\n.zui-icon-radio {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #d9d9d9;\n  background: #FFF;\n  -webkit-transform: rotate(0deg);\n  transform: rotate(0deg);\n}\ninput[type=checkbox],\ninput[type=radio] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  border: 0 none;\n  -webkit-appearance: none;\n}\ninput[type=checkbox]:checked + .zui-icon-checkbox,\ninput[type=radio]:checked + .zui-icon-checkbox {\n  border-width: 0;\n  background-color: #7b7b7b;\n}\ninput[type=checkbox]:checked + .zui-icon-checkbox:after,\ninput[type=radio]:checked + .zui-icon-checkbox:after {\n  display: block;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoAQMAAAC2MCouAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAFRJREFUCNeVjbERwCAIAJOzSJkRGMXRyGiOwgiWFjkV3sZWim/4h+to0hd84AszVLY9cP+IDbEiWlCCJsWN6pEbij0oSZU0Q2mk25lknF8sPIRnMwFAahqkr8KaZQAAAABJRU5ErkJggg==');\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  -webkit-background-size: 100% 100%;\n  background-size: 100% 100%;\n  border: none!important;\n}\ninput[type=checkbox]:disabled + .zui-icon-checkbox,\ninput[type=radio]:disabled + .zui-icon-checkbox {\n  background-color: #f0f0f0;\n  border: 1px solid #e3e3e3;\n}\ninput[type=checkbox]:disabled:checked + .zui-icon-checkbox:after,\ninput[type=radio]:disabled:checked + .zui-icon-checkbox:after {\n  background-color: #f0f0f0;\n  border: 1px solid #e3e3e3;\n}\ninput[type=checkbox]:checked + .zui-icon-radio,\ninput[type=radio]:checked + .zui-icon-radio {\n  background-color: #fff;\n  border-color: #7b7b7b;\n}\ninput[type=checkbox]:checked + .zui-icon-radio:after,\ninput[type=radio]:checked + .zui-icon-radio:after {\n  display: block;\n  width: 12px;\n  height: 12px;\n  background-color: #7b7b7b;\n  content: \"\";\n  -webkit-border-radius: 50%;\n  -webkit-background-clip: padding-box;\n  border-radius: 50%;\n  background-clip: padding-box;\n  left: 50%;\n  top: 50%;\n  margin-left: -6px;\n  margin-top: -6px;\n  position: absolute;\n}\ninput[type=checkbox]:disabled + .zui-icon-radio,\ninput[type=radio]:disabled + .zui-icon-radio {\n  background-color: #f0f0f0;\n  border: 1px solid #e3e3e3;\n}\ninput[type=checkbox]:disabled:checked + .zui-icon-radio:after,\ninput[type=radio]:disabled:checked + .zui-icon-radio:after {\n  background-color: #fff;\n  border: 1px solid #e3e3e3;\n}\n.zui-input-text {\n  border: 1px solid #BEBEBE;\n  display: block;\n  padding: 3px 10px;\n  font-size: 12px;\n  width: 100%;\n  height: 40px;\n  line-height: 32px;\n}\n.zui-input-text:focus {\n  border: 1px solid #7ED321;\n}\n.zui-input-select {\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 40px;\n  width: 100%;\n  padding: 2px 5px;\n  border: solid 1px #BEBEBE;\n  color: #666;\n  position: relative;\n  -webkit-border-radius: 0;\n  -webkit-background-clip: padding-box;\n  border-radius: 0;\n  background-clip: padding-box;\n  background: url(\"http://ourjs.github.io/static/2015/arrow.png\") no-repeat right center transparent;\n}\n.zui-input-select:after {\n  width: 25px;\n  height: 25px;\n  content: \"\";\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.zui-input-textarea {\n  border: solid 1px #BEBEBE;\n  width: 100%;\n  padding: 5px 5px;\n}\n#pageDetail .main {\n  padding: 0 10px;\n}\n#pageDetail .title {\n  font-size: 25px;\n  line-height: 35px;\n  position: relative;\n  margin: 8px 0;\n  padding: 5px 0;\n  border-bottom: 1px solid #ccc;\n}\n#pageDetail .banner img {\n  width: 100%;\n  display: block;\n}\n#pageDetail .detail {\n  font-size: 12px;\n}\n#pageDetail .detail .content {\n  color: #727272;\n}\n#pageDetail .detail .m-tag {\n  position: absolute;\n  right: 0;\n  top: 2px;\n  font-size: 12px;\n  width: 100px;\n}\n#pageDetail .detail .m-tag .hot {\n  display: inline-block;\n  background-color: #ff7979;\n  color: #fff;\n  padding: 2px 5px;\n  line-height: 20px;\n}\n#pageDetail .detail .m-tag .price {\n  display: inline-block;\n  background-color: #fff;\n  color: #ff7979;\n}\n#pageDetail .detail .title-desc {\n  height: 25px;\n  line-height: 25px;\n  color: #B8B8B8;\n  margin-bottom: 5px;\n}\n#pageDetail .concact-msg {\n  padding: 5px 0;\n}\n#pageDetail .concact-msg > div {\n  margin: 5px 0;\n}\n#pageDetail .condition .item {\n  padding: 5px;\n  border: 1px solid #ccc;\n}\n#pageDetail .condition .item.error {\n  border-color: red;\n}\n#pageDetail .condition .result-item {\n  display: inline-block;\n  vertical-align: middle;\n  height: 24px;\n  margin-right: 10px;\n}\n#pageDetail .condition .result-item label {\n  line-height: 22px;\n  display: inline-block;\n  vertical-align: top;\n}\n#pageDetail .question {\n  padding: 5px 0;\n}\n#pageDetail .question-type {\n  font-size: 10px;\n  padding: 2px 5px;\n  line-height: 15px;\n  height: 20px;\n}\n#pageDetail .question-tt {\n  font-size: 14px;\n  height: 20px;\n  line-height: 20px;\n}\n#pageDetail .question-result {\n  font-size: 12px;\n}\n#pageDetail textarea {\n  padding: 10px;\n  width: 100%;\n  border: 1px solid #ccc;\n}\n#pageDetail .bottom {\n  text-align: right;\n  padding-bottom: 20px;\n}\n", ""]);

	// exports


/***/ },

/***/ 47:
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

/***/ 48:
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

/***/ 49:
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

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, ".Validform_error {\n  border-color: red!important;\n}\n.Validform_wrong,\n.error-data {\n  color: red;\n}\n.error-data {\n  display: none;\n}\n.Validform_right {\n  display: none!important;\n}\n", ""]);

	// exports


/***/ }

/******/ });