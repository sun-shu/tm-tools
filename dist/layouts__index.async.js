"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[717],{

/***/ 96332:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Layout; }
/* harmony export */ });
/* harmony import */ var _ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75975);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82187);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var umi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76711);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52676);





function Layout() {
  var px2rem = (0,_ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__/* .px2remTransformer */ .$t)({
    rootValue: 16,
    // 32px = 1rem; @default 16
    precision: 10
  });
  var isActive = function isActive(match, location) {
    return location.path.includes('elder');
  };
  var _useModel = (0,umi__WEBPACK_IMPORTED_MODULE_2__.useModel)('@@initialState'),
    _useModel$initialStat = _useModel.initialState,
    initialState = _useModel$initialStat === void 0 ? {} : _useModel$initialStat,
    loading = _useModel.loading,
    error = _useModel.error,
    refresh = _useModel.refresh,
    setInitialState = _useModel.setInitialState;
  var _initialState$current = initialState.currentUser,
    currentUser = _initialState$current === void 0 ? {} : _initialState$current;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__/* .StyleProvider */ .V9, {
    transformers: [px2rem],
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('bg-gray-F6 pt-[50px] min-h-screen h-screen overscroll-y-auto'),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "bg-gray-F6",
        style: {
          minHeight: 'calc(100vh - 50px)'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(umi__WEBPACK_IMPORTED_MODULE_2__.Outlet, {})
      })
    })
  });
}

/***/ })

}]);