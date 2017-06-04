webpackJsonp([16],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user__ = __webpack_require__(345);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPageModule", function() { return UserPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserPageModule = (function () {
    function UserPageModule() {
    }
    return UserPageModule;
}());
UserPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__user__["a" /* UserPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user__["a" /* UserPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__user__["a" /* UserPage */]
        ]
    })
], UserPageModule);

//# sourceMappingURL=user.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storages__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(306);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserPage = (function () {
    function UserPage(navCtrl, statusBar, storage) {
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.storage = storage;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
    }
    UserPage.prototype.ngAfterViewInit = function () {
        //this.statusBar.styleDefault();
        if (this.isUserLogin()) {
            this.user = this.storage.get('User');
        }
    };
    UserPage.prototype.isUserLogin = function () {
        return !!this.storage.get('User');
    };
    UserPage.prototype.ionViewWillEnter = function () {
        //this.statusBar.styleDefault();
    };
    UserPage.prototype.enterCollectionPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('CollectionsPage', { user: this.user });
    };
    UserPage.prototype.enterInformationPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('InformationPage', { user: this.user });
    };
    UserPage.prototype.enterSettingPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('SettingPage', { user: this.user });
    };
    UserPage.prototype.enterBiddingPage = function (section) {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('BiddingPage', { section: section, user: this.user });
    };
    UserPage.prototype.enterCouponPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('CouponPage', { user: this.user });
    };
    UserPage.prototype.enterCreditPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('CreditPage', { user: this.user });
    };
    UserPage.prototype.enterDealsPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('DealPage', { user: this.user });
    };
    UserPage.prototype.enterUnpaidOrdersPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('UnpaidOrdersPage', { user: this.user });
    };
    UserPage.prototype.enterPaidOrdersPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('PaidOrdersPage', { user: this.user });
    };
    UserPage.prototype.enterUnpaidItemsPage = function () {
        if (!this.isUserLogin()) {
            return this.navCtrl.push('LoginPage');
        }
        this.navCtrl.push('UnpaidItemsPage', { user: this.user });
    };
    return UserPage;
}());
UserPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-user',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/user.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      我的\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="enterSettingPage()">\n        <ion-icon name="settings"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen="true" class="cards-bg">\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="enterInformationPage()">\n          <ion-thumbnail item-left>\n            <img src="assets/img/thumbnail-totoro.png">\n          </ion-thumbnail>\n          <h2>LCY</h2>\n          <p>可用额度：300.00</p>\n        </button>\n    </ion-list>\n  </ion-card>\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="enterCollectionPage()">\n        <ion-icon name="ios-heart-outline" item-left style="color:#ea3d0f;"></ion-icon>\n        我的收藏\n      </button>\n    </ion-list>\n  </ion-card>\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="enterBiddingPage(\'ahead\')">\n        <ion-icon name="ios-checkmark-circle-outline" item-left style="color:#2ec95c;"></ion-icon>\n        竞价领先\n      </button>\n      <button ion-item (click)="enterBiddingPage(\'out\')">\n        <ion-icon name="ios-log-out-outline" item-left style="color:#fb7d7d;"></ion-icon>\n        竞价出局\n      </button>\n    </ion-list>\n  </ion-card>\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="enterDealsPage()">\n          <ion-icon name="ios-cart-outline" item-left style="color:#8d8dff;"></ion-icon>\n          我的成交\n        </button>\n      <!-- <button ion-item (click)="enterUnpaidItemsPage()">\n          <ion-icon name="ios-cart-outline" item-left style="color:#8d8dff;"></ion-icon>\n          未付款拍品\n        </button> -->\n      <button ion-item (click)="enterUnpaidOrdersPage()">\n          <ion-icon name="ios-information-circle-outline" item-left style="color:#ffa164;"></ion-icon>\n          未付款订单\n        </button>\n      <button ion-item (click)="enterPaidOrdersPage()">\n          <ion-icon name="ios-copy-outline" item-left style="color:#a1d21e;"></ion-icon>\n          已付款订单\n        </button>\n    </ion-list>\n  </ion-card>\n  <ion-card>\n    <ion-list>\n      <button ion-item (click)="enterCreditPage()">\n          <ion-icon name="ios-cash-outline" item-left style="color:#fd8181;"></ion-icon>\n          保证金\n        </button>\n      <button ion-item (click)="enterCouponPage()">\n          <ion-icon name="ios-document-outline" item-left style="color:#c97cec;"></ion-icon>\n          优惠券\n        </button>\n    </ion-list>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/user.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__providers_storages__["a" /* Storages */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__providers_storages__["a" /* Storages */]])
], UserPage);

//# sourceMappingURL=user.js.map

/***/ })

});
//# sourceMappingURL=16.main.js.map