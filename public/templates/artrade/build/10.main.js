webpackJsonp([10],{

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__unpaid_items__ = __webpack_require__(343);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpaidItemsPageModule", function() { return UnpaidItemsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UnpaidItemsPageModule = (function () {
    function UnpaidItemsPageModule() {
    }
    return UnpaidItemsPageModule;
}());
UnpaidItemsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__unpaid_items__["a" /* UnpaidItemsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__unpaid_items__["a" /* UnpaidItemsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__unpaid_items__["a" /* UnpaidItemsPage */]
        ]
    })
], UnpaidItemsPageModule);

//# sourceMappingURL=unpaid-items.module.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_setting__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealService; });
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
  Generated class for the Order provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DealService = (function () {
    function DealService(http, setting, device) {
        this.http = http;
        this.setting = setting;
        this.device = device;
        this.DealUrl = this.setting.apiTestHost + '/artradeApp/sold/querysold.action';
    }
    DealService.prototype.getDealList = function (currentPage, pageSize, memberId, type, dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        var queryData = {
            filterMap: {
                memberId: memberId,
                /* type
                * "bNoOrder"：查询(买家)成交未生成订单拍品
                * "bAndOrder"：查询(买家)成交且生成订单拍品
                * "bAll"：查询(买家)所有成交拍品
                * "sNoOrder"：查询(卖家)成交未生成订单拍品
                * "sAndOrder"：查询(卖家)成交且生成订单拍品
                * "lotOccupyMargin":查询(买家)保证金占用的明细信息
                * type为空时查询(买家)成交未生成订单拍品"
                */
                type: type,
                dateType: dateType,
                dateVal: dateVal,
                itemName: itemName || '',
                itemId: itemId || '',
                glideMark: glideMark || '',
                lotId: lotId || '',
                authorName: authorName || '',
                itemAge: itemAge || ''
            },
            pageInfo: {
                currentPage: currentPage,
                pageSize: pageSize
            }
        };
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId || '0');
        params.set('queryData', JSON.stringify(queryData));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */](),
            search: params
        });
        return this.http.get(this.DealUrl, options)
            .map(function (res) {
            if (res.json().result) {
                return res.json().data.data;
            }
            return null;
        })
            .catch(this.handleError);
    };
    //查询(买家)成交未生成订单拍品
    DealService.prototype.getUnOrderedDealList = function (currentPage, pageSize, memberId, dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge) {
        return this.getDealList(currentPage, pageSize, memberId, 'bNoOrder', dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge);
    };
    //查询(买家)成交且生成订单拍品
    DealService.prototype.getOrderedDealList = function (currentPage, pageSize, memberId, dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge) {
        return this.getDealList(currentPage, pageSize, memberId, 'bAndOrder', dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge);
    };
    //查询(买家)所有成交拍品
    DealService.prototype.getAllDealList = function (currentPage, pageSize, memberId, dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge) {
        return this.getDealList(currentPage, pageSize, memberId, 'bAll', dateType, dateVal, itemName, itemId, glideMark, lotId, authorName, itemAge);
    };
    DealService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return DealService;
}());
DealService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_6__app_app_setting__["a" /* Setting */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */]])
], DealService);

//# sourceMappingURL=deal.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_deal__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storages__ = __webpack_require__(202);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnpaidItemsPage; });
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
  Generated class for the UnpaidItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var UnpaidItemsPage = (function () {
    function UnpaidItemsPage(navCtrl, navParams, dealService, storages) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dealService = dealService;
        this.storages = storages;
        this.user = storages.get('User');
    }
    UnpaidItemsPage.prototype.ionViewDidLoad = function () {
        this.dealService.getUnOrderedDealList(1, 10, this.user.memberId).subscribe(function (result) {
            console.log(result);
        });
    };
    UnpaidItemsPage.prototype.enterItem = function (item) {
        this.navCtrl.push('ItemPage', { item: item });
    };
    UnpaidItemsPage.prototype.pay = function () {
    };
    return UnpaidItemsPage;
}());
UnpaidItemsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-unpaid-items',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/unpaid-items/unpaid-items.html"*/'<!--\n  Generated template for the UnpaidItems page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>未付款拍品</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="cards-bg">\n  <ion-list>\n    <ion-card>\n      <img src="assets/img/a10488679.jpg" />\n      <ion-card-content (click)="enterItem(1)">\n        <ion-card-title>\n          日本回流 小叶紫檀整挖茶盘一组十件\n        </ion-card-title>\n        <p>当前价: ￥8,000.00</p>\n      </ion-card-content>\n      <ion-row no-padding>\n        <ion-col text-left>\n          <button small ion-button clear icon-left>\n            <ion-icon name="clock"></ion-icon>一天后结束\n          </button>\n        </ion-col>\n        <ion-col text-center>\n          <button small ion-button clear icon-left (click)="pay()">\n            <ion-icon name="cart"></ion-icon>付款\n          </button>\n        </ion-col>\n        <ion-col text-right>\n          <button small ion-button clear icon-left>\n            <ion-icon name="heart"></ion-icon>435\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/unpaid-items/unpaid-items.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_deal__["a" /* DealService */], __WEBPACK_IMPORTED_MODULE_3__providers_storages__["a" /* Storages */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_deal__["a" /* DealService */], __WEBPACK_IMPORTED_MODULE_3__providers_storages__["a" /* Storages */]])
], UnpaidItemsPage);

//# sourceMappingURL=unpaid-items.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map