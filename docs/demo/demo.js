/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./esm/index.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nconst W = 1920;\nconst H = 1080;\n\nconst onDomContentsLoaded = () => {\n  // シーンを作成\n  const scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n  const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(45, W / H, 1, 10000);\n  camera.position.set(0, 0, 1000);\n  scene.add(camera);\n  const renderOption = {\n    canvas: document.getElementById(\"webgl-canvas\"),\n    antialias: true\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer(renderOption);\n  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  const geo = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(10);\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-200, 200, 0));\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(350, -150, 0));\n  addMesh(geo, scene, camera, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(350, -150, -600)); //平行光源オブジェクト(light)の設定\n\n  const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xffffff, 1.0);\n  scene.add(ambientLight);\n  renderer.render(scene, camera);\n};\n\nconst addMesh = (geo, scene, camera, pos) => {\n  const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geo);\n  mesh.position.set(pos.x, pos.y, pos.z);\n  scene.add(mesh);\n  console.log(___WEBPACK_IMPORTED_MODULE_0__.PositionUtil.get2DPositionWithMesh(mesh, camera, W, H));\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nwindow.onload = onDomContentsLoaded;\n\n//# sourceURL=webpack://threejs-position-util/./demoSrc/demo.js?");

/***/ }),

/***/ "./esm/index.js":
/*!**********************!*\
  !*** ./esm/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PositionUtil\": () => (/* reexport safe */ _threejs_position_util__WEBPACK_IMPORTED_MODULE_0__.PositionUtil)\n/* harmony export */ });\n/* harmony import */ var _threejs_position_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./threejs-position-util */ \"./esm/threejs-position-util.js\");\n\n\n//# sourceURL=webpack://threejs-position-util/./esm/index.js?");

/***/ }),

/***/ "./esm/threejs-position-util.js":
/*!**************************************!*\
  !*** ./esm/threejs-position-util.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PositionUtil\": () => (/* binding */ PositionUtil)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n/**\n * Loaderで読み込んだジオメトリの位置の計測、ジオメトリのシフト操作をするクラスです。\n */\n\nclass PositionUtil {\n  /**\n   * メッシュ内のジオメトリの重心座標を求める。\n   * 原点はワールド座標。\n   *\n   * @param mesh\n   * @returns {Vector3}\n   */\n  static getGeometryCenterInWorld(mesh) {\n    let vec = PositionUtil.getGeometryCenterInLocal(mesh);\n\n    if (mesh.parent) {\n      mesh.parent.updateMatrixWorld(true);\n    }\n\n    return vec.applyMatrix4(mesh.matrixWorld);\n  }\n  /**\n   * メッシュ内のジオメトリの重心座標を求める。\n   * メッシュを原点とする座標を返す。\n   * （例えばメッシュ原点を中心とする球体ジオメトリがある場合はVector3(0,0,0)を返す）\n   *\n   * @param mesh\n   * @returns {Vector3}\n   */\n\n\n  static getGeometryCenterInLocal(mesh) {\n    return this.getCenter(mesh.geometry);\n  }\n  /**\n   * ジオメトリの重心座標を求める。\n   * 座標原点はジオメトリを格納するメッシュの原点。\n   * @param geo\n   */\n\n\n  static getCenter(geo) {\n    geo.computeBoundingBox();\n    const boundingBox = geo.boundingBox;\n    const position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n    position.subVectors(boundingBox.max, boundingBox.min);\n    position.multiplyScalar(0.5);\n    position.add(boundingBox.min);\n    return position;\n  }\n  /**\n   * グローバル座標から2Dスクリーン座標を取得する。\n   * @param {Vector3} vec\n   * @param {Camera} camera\n   * @param {number} canvasW\n   * @param {number} canvasH\n   * @returns {Vector3}\n   */\n\n\n  static get2DPosition(vec, camera, canvasW, canvasH) {\n    const vector = vec.clone().project(camera);\n    vector.x = (vector.x + 1) * canvasW / 2;\n    vector.y = (-vector.y + 1) * canvasH / 2;\n    vector.z = 0;\n    return vector;\n  }\n  /**\n   * メッシュから2Dスクリーン座標を取得する。\n   * @param {Mesh} mesh\n   * @param {Camera} camera\n   * @param {number} canvasW\n   * @param {number} canvasH\n   * @returns {Vector3}\n   */\n\n\n  static get2DPositionWithMesh(mesh, camera, canvasW, canvasH) {\n    const p = PositionUtil.getGeometryCenterInWorld(mesh);\n    return PositionUtil.get2DPosition(p, camera, canvasW, canvasH);\n  }\n  /**\n   * 直交座標から三次元極座標の半径を取得する。\n   * @param {Vector3} vec\n   * @returns {number}\n   */\n\n\n  static getROfGlobe(vec) {\n    return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);\n  }\n  /**\n   * メッシュとジオメトリの位置をずらす。\n   * メッシュは移動し、ジオメトリは見かけ上同じ位置を維持する。\n   *\n   * ObjLoaderなどで読み込んだ直後のMeshは、全てGeometryの原点が(0,0,0)になっているため回転や拡大が意図通りに動かない。\n   * 中心点を任意の場所にずらすことで操作が容易になる。\n   *\n   * @param mesh\n   * @param pos meshの中心点になる座標\n   */\n\n\n  static shiftMesh(mesh, pos) {\n    let position = pos.clone(); //ジオメトリをずらす\n\n    mesh.geometry.applyMatrix4(new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().makeTranslation(-position.x, -position.y, -position.z)); //メッシュを指定された量ずらす\n\n    mesh.position.add(position);\n  }\n\n}\n\n//# sourceURL=webpack://threejs-position-util/./esm/threejs-position-util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"demo": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./demoSrc/demo.js","vendor"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthreejs_position_util"] = self["webpackChunkthreejs_position_util"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;