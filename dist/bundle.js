/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([50,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 22:
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"w50h50":"OJW7RY2hKFbUZd0MOtrSc"};

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/_regenerator-runtime@0.13.2@regenerator-runtime/runtime.js
var runtime = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.9@core-js/modules/es6.promise.js
var es6_promise = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.9@core-js/modules/es6.object.to-string.js
var es6_object_to_string = __webpack_require__(48);

// CONCATENATED MODULE: ./src/modules/header.js
function header() {
  $('body').append('header');
}
// CONCATENATED MODULE: ./src/modules/content.js
function content() {
  $('body').append('content');
}
// CONCATENATED MODULE: ./src/modules/footer.js
function footer() {
  $('body').append('footer');
}
// EXTERNAL MODULE: ./src/asset/image/avator.jpeg
var avator = __webpack_require__(22);
var avator_default = /*#__PURE__*/__webpack_require__.n(avator);

// EXTERNAL MODULE: ./src/asset/css/index.scss
var css = __webpack_require__(49);

// CONCATENATED MODULE: ./src/main.js




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import "@babel/polyfill"





$(window).ready(function () {
  new header();
  new content();
  new footer();
  var img = "<img class='w50h50' src=\"" + avator_default.a + "\"/>";
  $('body').append(img);
  console.log(1112114423423);
  var a = new Promise(function () {});
  console.log(a);
});

function getComponent() {
  return __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, 53, 7)).then(function (_ref) {
    var _ = _ref.default;
    var element = document.createElement('div');
    element.innerHTML = _.join(['cm', 'chmi'], '**');
    return element;
  });
}

function getComponent1() {
  return _getComponent.apply(this, arguments);
}

function _getComponent() {
  _getComponent = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref2, _, element;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, 53, 7));

          case 2:
            _ref2 = _context.sent;
            _ = _ref2.default;
            element = document.createElement('div');
            element.innerHTML = _.join(['cm', 'chmi'], '**');
            return _context.abrupt("return", element);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getComponent.apply(this, arguments);
}

getComponent1().then(function (element) {
  document.body.appendChild(element);
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map