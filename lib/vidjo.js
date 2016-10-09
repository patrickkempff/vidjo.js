(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vidjo", [], factory);
	else if(typeof exports === 'object')
		exports["vidjo"] = factory();
	else
		root["vidjo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * This file is part of the Vidjo.js package.
	 *
	 * (c) Patrick Kempff <patrickkempff@gmail.com>
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */
	
	var Vidjo = function () {
	
	  /**
	   * @param element The element to display the video background in.
	   * @param path    Path to the video eg /videos/ocean.mp4
	   * @param options Options
	   */
	  function Vidjo(element, path) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    _classCallCheck(this, Vidjo);
	
	    this._element = element;
	    this._path = path;
	
	    // Merge the options with the default options.
	    this._options = (0, _objectAssign2.default)(this.defaultOptions, options);
	
	    /**
	     * The reference to the video element,
	     * will be created on demand.
	     */
	    this._video = null;
	
	    /**
	     * The reference to the wrapper div that will be
	     * used to position the video element.
	     */
	    this._wrapper = null;
	
	    /**
	     * Build the needed dom structure. The video itself will only created
	     * if needed.
	     */
	    this._build();
	
	    // listen to important events, like resize and video can play.
	    this._listen();
	  }
	
	  /**
	   * Builds the video wrapper and adds the required styles.
	   */
	
	
	  _createClass(Vidjo, [{
	    key: '_build',
	    value: function _build() {
	
	      // Create the wrapper which holds the video.
	      this._wrapper = document.createElement('div');
	      this._wrapper.className = this._options.className;
	
	      // Set the needed styles.
	      (0, _objectAssign2.default)(this._wrapper.style, {
	        'width': '100%',
	        'height': '100%',
	        'position': 'relative',
	        'overflow': 'hidden',
	        'zIndex': -1,
	        'backgroundColor': '#FF0000',
	        'backgroundImage': 'url("' + this._options.poster + '")',
	        'backgroundSize': 'cover',
	        'backgroundPosition': 'center center'
	      });
	
	      this._buildVideoIfNeeded();
	      this._element.appendChild(this._wrapper);
	    }
	  }, {
	    key: '_buildVideoIfNeeded',
	    value: function _buildVideoIfNeeded() {
	      var _this = this;
	
	      if (this._options.shouldEnableVideo() && this._video === null) {
	        // Create the video element.
	        this._video = document.createElement('video');
	
	        // Set the needed styles.
	        (0, _objectAssign2.default)(this._video.style, {
	          'margin': 'auto',
	          'position': 'absolute',
	          'opacity': 0,
	          'zIndex': -1,
	          'backgroundColor': '#FF0000',
	          'top': this._options.position.x,
	          'left': this._options.position.y
	        });
	
	        var translate = 'translate(-' + this._options.position.x + ', -' + this._options.position.y + ')';
	
	        this._video.style[this._transformProperty] = translate;
	        this._video.loop = this._options.loop;
	        this._video.muted = this._options.muted;
	        this._video.autoplay = this._options.autoplay;
	
	        // Add the different sources to the video.
	        var source = document.createElement('source');
	
	        source.type = 'video/mp4';
	        source.src = this._path;
	
	        // Append the created elements to the DOM
	        // as child of the given element in options.
	        this._video.appendChild(source);
	
	        this._video.addEventListener('canplay', function () {
	          return _this._canplaythrough();
	        }, false);
	        this._video.addEventListener('canplaythrough', function () {
	          return _this._canplaythrough();
	        }, false);
	
	        this._wrapper.appendChild(this._video);
	      }
	    }
	  }, {
	    key: '_listen',
	    value: function _listen() {
	      var _this2 = this;
	
	      window.addEventListener('resize', function () {
	        return _this2.resize();
	      }, false);
	    }
	  }, {
	    key: '_canplaythrough',
	    value: function _canplaythrough() {
	      this._video.style.opacity = 1;
	      this.resize();
	    }
	  }, {
	    key: '_playing',
	    value: function _playing() {
	      this._video.style.opacity = 1;
	      this.resize();
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      this._buildVideoIfNeeded();
	
	      if (!this._video) {
	        return;
	      }
	
	      /**
	       * Hide the video when it should not be enabled.
	       * Eg when the browser resizes and reaches the breakpoint.
	       *
	       * depends on the setting set in options.shouldEnableVideo
	       */
	      this._video.style.display = this._options.shouldEnableVideo() ? '' : 'none';
	
	      // Get a native video size
	      var videoHeight = this._video.videoHeight;
	      var videoWidth = this._video.videoWidth;
	
	      // Get a wrapper size
	      var bounds = this._wrapper.getBoundingClientRect();
	
	      var wrapperHeight = bounds.height;
	      var wrapperWidth = bounds.width;
	
	      if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
	        this._video.style.width = wrapperWidth + 2 + 'px';
	        this._video.style.height = 'auto';
	      } else {
	        this._video.style.width = 'auto';
	        this._video.style.height = wrapperHeight + 2 + 'px';
	      }
	    }
	  }, {
	    key: 'defaultOptions',
	    get: function get() {
	      return {
	        'loop': true,
	        'muted': true,
	        'autoplay': true,
	        'position': { x: '50%', y: '50%' },
	        'poster': '',
	        'className': 'vidjo-wrapper',
	        'shouldEnableVideo': function shouldEnableVideo() {
	          return true;
	        }
	      };
	    }
	  }, {
	    key: '_transformProperty',
	    get: function get() {
	      // Note that in some versions of IE9 it is critical that
	      // msTransform appear in this list before MozTransform
	      var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
	      var p = void 0;
	      var element = document.createElement('div');
	
	      while (p = properties.shift()) {
	        if (typeof element.style[p] !== 'undefined') {
	          return p;
	        }
	      }
	      return false;
	    }
	  }]);
	
	  return Vidjo;
	}();
	
	exports.default = Vidjo;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=vidjo.js.map