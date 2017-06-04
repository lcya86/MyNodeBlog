webpackJsonp([19],{

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paid_orders__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaidOrdersPageModule", function() { return PaidOrdersPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PaidOrdersPageModule = (function () {
    function PaidOrdersPageModule() {
    }
    return PaidOrdersPageModule;
}());
PaidOrdersPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__paid_orders__["a" /* PaidOrdersPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__paid_orders__["a" /* PaidOrdersPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__paid_orders__["a" /* PaidOrdersPage */]
        ]
    })
], PaidOrdersPageModule);

//# sourceMappingURL=paid-orders.module.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaidOrdersPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the PaidOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PaidOrdersPage = (function () {
    function PaidOrdersPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PaidOrdersPage.prototype.ionViewDidLoad = function () {
    };
    PaidOrdersPage.prototype.enterItem = function (item) {
        this.navCtrl.push('ItemPage', { item: item });
    };
    return PaidOrdersPage;
}());
PaidOrdersPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-paid-orders',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/paid-orders/paid-orders.html"*/'<!--\n  Generated template for the PaidOrders page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>已付款订单</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="cards-bg">\n  <ion-list>\n    <ion-card>\n      <img src="assets/img/a10488679.jpg" />\n      <ion-card-content (click)="enterItem(1)">\n        <ion-card-title>\n          日本回流 小叶紫檀整挖茶盘一组十件\n        </ion-card-title>\n        <p>当前价: ￥8,000.00</p>\n      </ion-card-content>\n      <ion-row no-padding>\n        <ion-col text-left>\n          <button small ion-button clear icon-left>\n            <ion-icon name="clock"></ion-icon>一天后结束\n          </button>\n        </ion-col>\n        <ion-col text-center>\n          <button small ion-button clear icon-left>\n            <ion-icon name="cart"></ion-icon>付款\n          </button>\n        </ion-col>\n        <ion-col text-right>\n          <button small ion-button clear icon-left>\n            <ion-icon name="heart"></ion-icon>435\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/paid-orders/paid-orders.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], PaidOrdersPage);

//# sourceMappingURL=paid-orders.js.map

/***/ })

});
//# sourceMappingURL=19.main.js.map