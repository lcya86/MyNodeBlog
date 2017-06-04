webpackJsonp([22],{

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__credit__ = __webpack_require__(333);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditPageModule", function() { return CreditPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreditPageModule = (function () {
    function CreditPageModule() {
    }
    return CreditPageModule;
}());
CreditPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__credit__["a" /* CreditPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__credit__["a" /* CreditPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__credit__["a" /* CreditPage */]
        ]
    })
], CreditPageModule);

//# sourceMappingURL=credit.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditPage; });
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
  Generated class for the Credit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreditPage = (function () {
    function CreditPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreditPage.prototype.ionViewDidLoad = function () {
        this.slides.slidesOffsetBefore = 0;
        this.slides.spaceBetween = 1;
        this.slides.slidesPerView = 'auto';
        this.slides.slidesOffsetAfter = 1;
        this.slides.update(0);
    };
    return CreditPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], CreditPage.prototype, "slides", void 0);
CreditPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-credit',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/credit/credit.html"*/'<!--\n  Generated template for the Credit page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>保证金</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="cards-bg">\n  <ion-slides pager="true">\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            您目前是普通会员\n          </ion-card-title>\n          <p>可参加人民币300元以内一件拍品的竞投，且拍品标的数量仅限于一件</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <!-- <button ion-button clear>充值</button> -->\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥100\n          </ion-card-title>\n          <p>可参加总计人民币1000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥500\n          </ion-card-title>\n          <p>可参加总计人民币5000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥1000\n          </ion-card-title>\n          <p>可参加总计人民币10,000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥3000\n          </ion-card-title>\n          <p>可参加总计人民币30,000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥5000\n          </ion-card-title>\n          <p>可参加总计人民币50,000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥10000\n          </ion-card-title>\n          <p>可参加总计人民币100,000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥30000\n          </ion-card-title>\n          <p>可参加总计人民币300,000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n    <ion-slide>\n      <ion-card>\n        <img src="assets/img/auction.jpg" />\n        <ion-card-content>\n          <ion-card-title>\n            充值额度：￥50000\n          </ion-card-title>\n          <p>可参加总计人民币500,000元以内拍品的竞投</p>\n        </ion-card-content>\n        <ion-row>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col center text-center>\n            <button ion-button clear>充值</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/credit/credit.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], CreditPage);

//# sourceMappingURL=credit.js.map

/***/ })

});
//# sourceMappingURL=22.main.js.map