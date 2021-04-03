/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rand-seed/dist/rand-seed.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/rand-seed/dist/rand-seed.es.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "PRNG": () => (/* binding */ n)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t=function(r,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])})(r,n)};function r(r,n){function i(){this.constructor=r}t(r,n),r.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}var n,i=function(){function t(){}return t._xfnv1a=function(t){for(var r=2166136261,n=0;n<t.length;n++)r=Math.imul(r^t.charCodeAt(n),16777619);return function(){return r+=r<<13,r^=r>>>7,r+=r<<3,r^=r>>>17,(r+=r<<5)>>>0}},t}(),s=function(t){function n(r){var i=t.call(this)||this;return i._a=n._xfnv1a(r)(),i}return r(n,t),n.prototype.next=function(){var t=this._a+=1831565813;return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/4294967296},n}(i),e=function(t){function n(r){var i=t.call(this)||this,s=n._xfnv1a(r);return i._a=s(),i._b=s(),i._c=s(),i._d=s(),i}return r(n,t),n.prototype.next=function(){this._a>>>=0,this._b>>>=0,this._c>>>=0,this._d>>>=0;var t=this._a+this._b|0;return this._a=this._b^this._b>>>9,this._b=this._c+(this._c<<3)|0,this._c=this._c<<21|this._c>>>11,this._d=this._d+1|0,t=t+this._d|0,this._c=this._c+t|0,(t>>>0)/4294967296},n}(i),o=function(t){function n(r){var i=t.call(this)||this,s=n._xfnv1a(r);return i._a=s(),i._b=s(),i._c=s(),i._d=s(),i}return r(n,t),n.prototype.next=function(){var t=this._b<<9,r=5*this._a;return r=9*(r<<7|r>>>25),this._c^=this._a,this._d^=this._b,this._b^=this._c,this._a^=this._d,this._c^=t,this._d=this._d<<11|this._d>>>21,(r>>>0)/4294967296},n}(i);!function(t){t.sfc32="sfc32",t.mulberry32="mulberry32",t.xoshiro128ss="xoshiro128ss"}(n||(n={}));var _=function(){function t(t,r){void 0===r&&(r=n.sfc32),this._str=t,this._prng=r,this._generator=this._initializeGenerator()}return t.prototype.next=function(){return this._generator.next()},t.prototype._initializeGenerator=function(){if(function(t){return null===t}(t=this._str)||function(t){return void 0===t}(t))return this._wrap();var t;switch(this._prng){case"sfc32":return new e(this._str);case"mulberry32":return new s(this._str);case"xoshiro128ss":return new o(this._str);default:return this._wrap()}},t.prototype._wrap=function(){return{next:function(){return Math.random()}}},t}();/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_);
//# sourceMappingURL=rand-seed.es.js.map


/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forSaveOrLoad": () => (/* binding */ forSaveOrLoad),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "Grid": () => (/* binding */ Grid)
/* harmony export */ });
function forSaveOrLoad(el, obj, cb) {
    for (const name in el) {
        rec(el, obj, name);
    }
    function rec(c1, c2, key) {
        if (equals(Object.keys(c1[key]), Object.keys(c2[key])))
            for (const name in c1[key])
                rec(c1[key], c2[key], name);
        else
            cb(c1, c2, key);
    }
}
function equals(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
}
class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = Array.from({ length: width * height });
    }
    get(x, y) {
        return this.array[y || y === 0 ? x + y * this.width : x];
    }
    set(item, x, y) {
        this.array[y || y === 0 ? x + y * this.width : x] = item;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rand_seed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rand-seed */ "./node_modules/rand-seed/dist/rand-seed.es.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");


const images = [];
const output_image = $("#output_image");
const images_container = $("#images_container");
const settingsE = $("#settings");
const settingsS = (() => {
    const grid = settingsE.find(".grid");
    const image = settingsE.find(".image");
    return {
        seed: $("#seed"),
        grid: {
            width: grid.find(".width"),
            height: grid.find(".height")
        },
        image: {
            width: image.find(".width"),
            height: image.find(".height")
        }
    };
})();
settingsE.slideUp(0);
$("#settings_show").on("click", settingsE.slideDown.bind(settingsE));
$("#settings_hide").on("click", () => {
    settingsE.slideUp();
    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.forSaveOrLoad)(settingsS, settings, (el, obj, key) => {
        let val = el[key].val();
        if (Number.isInteger(val))
            val = +val;
        obj[key] = val;
    });
    localStorage.setItem("settings", JSON.stringify(settings));
    init();
    generate();
});
const ctx = output_image[0].getContext("2d");
let random;
let grid;
const settings = Object.assign({
    seed: "",
    grid: {
        width: 5,
        height: 5
    },
    image: {
        width: 300,
        height: 300
    }
}, JSON.parse(localStorage.getItem("settings") || "{}"));
const img_zone = $("#images_zone")
    .on("dragenter dragover dragleave drop", e => {
    e.preventDefault();
    e.stopPropagation();
}).on("drop", (ev) => {
    const nimages = Array.from(ev.originalEvent.dataTransfer.files)
        .filter(b => b.type.startsWith("image"))
        .map(img => $(`<img class="w-100" src="${URL.createObjectURL(img)}" />`)[0]);
    images_container.append(nimages);
    images.push(...nimages);
    Promise.all(nimages.map(v => new Promise(resolve => $(v).on("load", resolve)))).then(generate);
});
init();
function placeImage(cis, x, y, w, h) {
    const pw = settings.image.width / grid.width;
    const ph = settings.image.height / grid.height;
    ctx.drawImage(cis, x * pw, y * ph, pw * w, ph * h);
}
function generate() {
    ctx.clearRect(0, 0, settings.image.width, settings.image.height);
    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            grid.set(images[Math.floor(random.next() * images.length)], x, y);
            placeImage(grid.get(x, y), x, y, 1, 1);
        }
    }
}
function init() {
    output_image.attr({
        width: settings.image.width,
        height: settings.image.height
    });
    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.forSaveOrLoad)(settingsS, settings, (el, obj, key) => el[key].val(obj[key]));
    grid = new _helpers__WEBPACK_IMPORTED_MODULE_1__.Grid(settings.grid.width, settings.grid.height);
    random = new rand_seed__WEBPACK_IMPORTED_MODULE_0__.default(settings.seed === "" ? null : settings.seed);
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map