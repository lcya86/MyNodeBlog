webpackJsonp([21],{

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__information__ = __webpack_require__(337);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationPageModule", function() { return InformationPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InformationPageModule = (function () {
    function InformationPageModule() {
    }
    return InformationPageModule;
}());
InformationPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__information__["a" /* InformationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__information__["a" /* InformationPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__information__["a" /* InformationPage */]
        ]
    })
], InformationPageModule);

//# sourceMappingURL=information.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformationPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InformationPage = (function () {
    function InformationPage(navCtrl, navParams, modCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modCtrl = modCtrl;
        this.user = navParams.get('user');
    }
    InformationPage.prototype.ngAfterViewInit = function () {
    };
    InformationPage.prototype.modifyInformation = function (title, value) {
        this.modCtrl.create('InputPage', {
            title: title,
            value: value
        }).present();
    };
    InformationPage.prototype.manageAddress = function () {
        this.navCtrl.push('AddressPage', { user: this.user });
    };
    return InformationPage;
}());
InformationPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-information',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/information/information.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      个人信息\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="cards-bg">\n  <ion-card>\n    <ion-list>\n      <button ion-item>\n        <ion-thumbnail item-right>\n          <img src="assets/img/thumbnail-totoro.png">\n        </ion-thumbnail>\n        头像\n      </button>\n    </ion-list>\n  </ion-card>\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="modifyInformation(\'真实姓名\',\'刘春洋\')">\n        真实姓名\n        <ion-note item-right>刘春洋</ion-note>\n      </button>\n      <button ion-item (click)="modifyInformation(\'身份证号\',\'110223199102256392\')">\n        身份证号\n        <ion-note item-right>110223********6392</ion-note>\n      </button>\n      <button ion-item (click)="modifyInformation(\'我的地址\',\'北京市通州区云景南大街62号院\')">\n        我的地址\n        <ion-note item-right style="width:50%;">北京市通州区云景南大街62号院</ion-note>\n      </button>\n      <button ion-item (click)="modifyInformation(\'我的邮编\',\'101101\')">\n        我的邮编\n        <ion-note item-right>101101</ion-note>\n      </button>\n    </ion-list>\n  </ion-card>\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="manageAddress()">\n        收货地址\n      </button>\n    </ion-list>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/information/information.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], InformationPage);

//# sourceMappingURL=information.js.map

/***/ })

});
//# sourceMappingURL=21.main.js.map