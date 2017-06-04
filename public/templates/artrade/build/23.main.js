webpackJsonp([23],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coupon__ = __webpack_require__(332);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponPageModule", function() { return CouponPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CouponPageModule = (function () {
    function CouponPageModule() {
    }
    return CouponPageModule;
}());
CouponPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__coupon__["a" /* CouponPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__coupon__["a" /* CouponPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__coupon__["a" /* CouponPage */]
        ]
    })
], CouponPageModule);

//# sourceMappingURL=coupon.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CouponPage; });
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
  Generated class for the Coupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CouponPage = (function () {
    function CouponPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.couponList = [];
        this.couponList = [{
                forSaleId: 1,
                userFSId: 1,
                userFSFee: 5
            }];
    }
    CouponPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CouponPage');
    };
    return CouponPage;
}());
CouponPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-coupon',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/coupon/coupon.html"*/'<!--\n  Generated template for the Coupon page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>优惠券</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content fullscreen="true" class="cards-bg">\n  <ion-list>\n    <h5 text-center *ngIf="couponList.length === 0" style="color:rgb(150, 150, 150);margin-top:60%;">\n      您还没有任何优惠券(*^__^*)\n    </h5>\n    <ion-card class="coupon" *ngFor="let coupon of couponList">\n      <div class="coupon-border"></div>\n      <div class="coupon-content">\n        <p class="coupon-shop">嘉德在线</p>\n        <p class="coupon-value"> <span>￥</span> {{coupon.userFSFee}}.00 <span>优惠券</span></p>\n      </div>\n      <div class="coupon-border">\n\n      </div>\n    </ion-card>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/coupon/coupon.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], CouponPage);

//# sourceMappingURL=coupon.js.map

/***/ })

});
//# sourceMappingURL=23.main.js.map