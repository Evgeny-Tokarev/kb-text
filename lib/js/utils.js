"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.string.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qsa = void 0;

var qsa = function qsa(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(root.querySelectorAll(selector));
};

exports.qsa = qsa;