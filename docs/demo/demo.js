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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/******/ 		"demo": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "";
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
/******/ 	deferredModules.push(["./demoSrc/demo.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_threejs_position_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/threejs-position-util */ \"./lib/threejs-position-util.js\");\n/* harmony import */ var _lib_threejs_position_util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_threejs_position_util__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nconst W = 1920;\nconst H = 1080;\n\nconst onDomContentsLoaded = () => {\n  // シーンを作成\n  const scene = new three__WEBPACK_IMPORTED_MODULE_1__[\"Scene\"]();\n  const camera = new three__WEBPACK_IMPORTED_MODULE_1__[\"PerspectiveCamera\"](45, W / H, 1, 10000);\n  camera.position.set(0, 0, 1000);\n  scene.add(camera);\n  const renderOption = {\n    canvas: document.getElementById(\"webgl-canvas\"),\n    antialias: true\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_1__[\"WebGLRenderer\"](renderOption);\n  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__[\"Color\"](0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  const geo = new three__WEBPACK_IMPORTED_MODULE_1__[\"SphereGeometry\"](10);\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__[\"Vector3\"](0, 0, 0));\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__[\"Vector3\"](-200, 200, 0));\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__[\"Vector3\"](350, -150, 0));\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__[\"Vector3\"](350, -150, -600)); //平行光源オブジェクト(light)の設定\n\n  const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__[\"AmbientLight\"](0xffffff, 1.0);\n  scene.add(ambientLight);\n  renderer.render(scene, camera);\n};\n\nconst addMesh = (geo, scene, camera, pos) => {\n  const mesh = new three__WEBPACK_IMPORTED_MODULE_1__[\"Mesh\"](geo);\n  mesh.position.set(pos.x, pos.y, pos.z);\n  scene.add(mesh);\n  console.log(_lib_threejs_position_util__WEBPACK_IMPORTED_MODULE_0__[\"PositionUtil\"].get2DPositionWithMesh(mesh, camera, W, H));\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nwindow.onload = onDomContentsLoaded;\n\n//# sourceURL=webpack:///./demoSrc/demo.js?");

/***/ }),

/***/ "./lib/threejs-position-util.js":
/*!**************************************!*\
  !*** ./lib/threejs-position-util.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.PositionUtil = void 0;\n\nvar three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/**\n * Loaderで読み込んだジオメトリの位置の計測、ジオメトリのシフト操作をするクラスです。\n */\n\n\nvar PositionUtil =\n/** @class */\nfunction () {\n  function PositionUtil() {}\n  /**\n   * メッシュ内のジオメトリの重心座標を求める。\n   * 原点はワールド座標。\n   *\n   * @param mesh\n   * @returns {Vector3}\n   */\n\n\n  PositionUtil.getGeometryCenterInWorld = function (mesh) {\n    var vec = PositionUtil.getGeometryCenterInLocal(mesh);\n\n    if (mesh.parent) {\n      mesh.parent.updateMatrixWorld(true);\n    }\n\n    return vec.applyMatrix4(mesh.matrixWorld);\n  };\n  /**\n   * メッシュ内のジオメトリの重心座標を求める。\n   * メッシュを原点とする座標を返す。\n   * （例えばメッシュ原点を中心とする球体ジオメトリがある場合はVector3(0,0,0)を返す）\n   *\n   * @param mesh\n   * @returns {Vector3}\n   */\n\n\n  PositionUtil.getGeometryCenterInLocal = function (mesh) {\n    return this.getCenter(mesh.geometry);\n  };\n  /**\n   * ジオメトリの重心座標を求める。\n   * 座標原点はジオメトリを格納するメッシュの原点。\n   * @param geo\n   */\n\n\n  PositionUtil.getCenter = function (geo) {\n    geo.computeBoundingBox();\n    var boundingBox = geo.boundingBox;\n    var position = new three_1.Vector3();\n    position.subVectors(boundingBox.max, boundingBox.min);\n    position.multiplyScalar(0.5);\n    position.add(boundingBox.min);\n    return position;\n  };\n  /**\n   * グローバル座標から2Dスクリーン座標を取得する。\n   * @param {Vector3} vec\n   * @param {Camera} camera\n   * @param {number} canvasW\n   * @param {number} canvasH\n   * @returns {Vector3}\n   */\n\n\n  PositionUtil.get2DPosition = function (vec, camera, canvasW, canvasH) {\n    var vector = vec.clone().project(camera);\n    vector.x = (vector.x + 1) * canvasW / 2;\n    vector.y = (-vector.y + 1) * canvasH / 2;\n    vector.z = 0;\n    return vector;\n  };\n  /**\n   * メッシュから2Dスクリーン座標を取得する。\n   * @param {Mesh} mesh\n   * @param {Camera} camera\n   * @param {number} canvasW\n   * @param {number} canvasH\n   * @returns {Vector3}\n   */\n\n\n  PositionUtil.get2DPositionWithMesh = function (mesh, camera, canvasW, canvasH) {\n    var p = PositionUtil.getGeometryCenterInWorld(mesh);\n    return PositionUtil.get2DPosition(p, camera, canvasW, canvasH);\n  };\n  /**\n   * 直交座標から三次元極座標の半径を取得する。\n   * @param {Vector3} vec\n   * @returns {number}\n   */\n\n\n  PositionUtil.getROfGlobe = function (vec) {\n    return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);\n  };\n  /**\n   * メッシュとジオメトリの位置をずらす。\n   * メッシュは移動し、ジオメトリは見かけ上同じ位置を維持する。\n   *\n   * ObjLoaderなどで読み込んだ直後のMeshは、全てGeometryの原点が(0,0,0)になっているため回転や拡大が意図通りに動かない。\n   * 中心点を任意の場所にずらすことで操作が容易になる。\n   *\n   * @param mesh\n   * @param pos meshの中心点になる座標\n   */\n\n\n  PositionUtil.shiftMesh = function (mesh, pos) {\n    var position = pos.clone(); //ジオメトリをずらす\n\n    mesh.geometry.applyMatrix4(new three_1.Matrix4().makeTranslation(-position.x, -position.y, -position.z)); //メッシュを指定された量ずらす\n\n    mesh.position.add(position);\n  };\n\n  return PositionUtil;\n}();\n\nexports.PositionUtil = PositionUtil;\n\n//# sourceURL=webpack:///./lib/threejs-position-util.js?");

/***/ })

/******/ });