webpackJsonp([12],{

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deal__ = __webpack_require__(334);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DealPageModule", function() { return DealPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DealPageModule = (function () {
    function DealPageModule() {
    }
    return DealPageModule;
}());
DealPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__deal__["a" /* DealPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__deal__["a" /* DealPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__deal__["a" /* DealPage */]
        ]
    })
], DealPageModule);

//# sourceMappingURL=deal.module.js.map

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

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_deal__ = __webpack_require__(311);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the Deal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DealPage = (function () {
    function DealPage(navCtrl, navParams, dealService, toaCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dealService = dealService;
        this.toaCtrl = toaCtrl;
        this.unOrderPageNumber = 0;
        this.unOrderPageSize = 5;
        this.orderPageNumber = 0;
        this.orderPageSize = 5;
        this.unOrderList = [];
        this.orderList = [];
        this.dealType = 'bNoOrder';
        this.user = navParams.get('user');
    }
    DealPage.prototype.ionViewDidLoad = function () {
        this.getUnOrderDeal();
        this.getOrderDeal();
    };
    DealPage.prototype.getUnOrderDeal = function () {
        var _this = this;
        this.dealService.getUnOrderedDealList(this.unOrderPageNumber, this.unOrderPageSize, this.user.memberId).subscribe(function (result) {
            _this.unOrderPageNumber++;
            _this.unOrderList = result;
        });
    };
    DealPage.prototype.getOrderDeal = function () {
        var _this = this;
        this.dealService.getOrderedDealList(this.unOrderPageNumber, this.unOrderPageSize, this.user.memberId).subscribe(function (result) {
            _this.orderPageNumber++;
            _this.orderList = result;
        });
    };
    DealPage.prototype.getMoreUnOrderDeal = function (infiniteScroll) {
        var _this = this;
        this.dealService.getUnOrderedDealList(this.unOrderPageNumber, this.unOrderPageSize, this.user.memberId).subscribe(function (result) {
            if (result.length > 0) {
                _this.unOrderPageNumber++;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
                _this.unOrderList = _this.unOrderList.concat(result);
            }
            else {
                if (infiniteScroll) {
                    infiniteScroll.complete();
                    infiniteScroll.enable(false);
                }
                _this.toaCtrl.create({
                    message: '已经到底了o(╯□╰)o',
                    duration: 1000,
                    //showCloseButton: true,
                    dismissOnPageChange: true
                }).present();
            }
        }, function (error) {
            infiniteScroll.complete();
            _this.toaCtrl.create({
                message: '好像有什么不对劲o(╯□╰)o',
                duration: 1000,
                //showCloseButton: true,
                dismissOnPageChange: true
            }).present();
        });
    };
    DealPage.prototype.getMoreOrderDeal = function (infiniteScroll) {
        var _this = this;
        this.dealService.getOrderedDealList(this.orderPageNumber, this.orderPageSize, this.user.memberId).subscribe(function (result) {
            if (result.length > 0) {
                _this.orderPageNumber++;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
                _this.orderList = _this.orderList.concat(result);
            }
            else {
                if (infiniteScroll) {
                    infiniteScroll.complete();
                    infiniteScroll.enable(false);
                }
                _this.toaCtrl.create({
                    message: '已经到底了o(╯□╰)o',
                    duration: 1000,
                    //showCloseButton: true,
                    dismissOnPageChange: true
                }).present();
            }
        }, function (error) {
            infiniteScroll.complete();
            _this.toaCtrl.create({
                message: '好像有什么不对劲o(╯□╰)o',
                duration: 1000,
                //showCloseButton: true,
                dismissOnPageChange: true
            }).present();
        });
    };
    return DealPage;
}());
DealPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-deal',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/deal/deal.html"*/'<!--\n  Generated template for the Deal page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>我的成交</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="dealType">\n      <ion-segment-button value="bNoOrder">\n        未生成订单\n      </ion-segment-button>\n      <ion-segment-button value="bAndOrder">\n        已生成订单\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content [hidden]="dealType !== \'bNoOrder\'" class="cards-bg">\n  <h5 text-center *ngIf="unOrderList.length === 0" style="color:rgb(150, 150, 150);margin-top:60%;">\n    还没有成交记录，赶快去逛逛吧(*^__^*)\n  </h5>\n  <ion-list>\n    <ion-card *ngFor="let deal of unOrderList">\n      <ion-img src="deal.itemPicPath"></ion-img>\n      <ion-card-content (click)="enterItem(1)">\n        <ion-card-title>\n          {{deal.itemName}}\n        </ion-card-title>\n        <p>落槌价: ￥{{deal.hammerPrice}}</p>\n        <p>成交价: ￥{{deal.soldPrice}}</p>\n      </ion-card-content>\n      <ion-row no-padding>\n        <ion-col text-left>\n          <button small ion-button clear icon-left>\n            <ion-icon name="clock"></ion-icon>一天后结束\n          </button>\n        </ion-col>\n        <ion-col text-center>\n          <button small ion-button clear icon-left (click)="pay()">\n            <ion-icon name="cart"></ion-icon>付款\n          </button>\n        </ion-col>\n        <ion-col text-right>\n          <button small ion-button clear icon-left>\n            <ion-icon name="heart"></ion-icon>435\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="getMoreUnOrderDeal($event)" threshold="1%">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n<ion-content [hidden]="dealType !== \'bAndOrder\'" class="cards-bg">\n  <h5 text-center *ngIf="orderList.length === 0" style="color:rgb(150, 150, 150);margin-top:60%;">\n    还没有成交记录，赶快去逛逛吧(*^__^*)\n  </h5>\n  <ion-list>\n    <ion-card *ngFor="let deal of orderList">\n      <ion-img src="deal.itemPicPath"></ion-img>\n      <ion-card-content (click)="enterItem(1)">\n        <ion-card-title>\n          {{deal.itemName}}\n        </ion-card-title>\n        <p>落槌价: ￥{{deal.hammerPrice}}</p>\n        <p>佣金: ￥{{deal.cmmssn}}</p>\n        <p>成交价: ￥{{deal.soldPrice}}</p>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="getMoreOrderDeal($event)" threshold="1%">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/deal/deal.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_deal__["a" /* DealService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_deal__["a" /* DealService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
], DealPage);

//# sourceMappingURL=deal.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map