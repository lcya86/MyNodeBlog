webpackJsonp([6],{

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category__ = __webpack_require__(319);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPageModule", function() { return CategoryPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CategoryPageModule = (function () {
    function CategoryPageModule() {
    }
    return CategoryPageModule;
}());
CategoryPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]
        ]
    })
], CategoryPageModule);

//# sourceMappingURL=category.module.js.map

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(8);
var switchMap_1 = __webpack_require__(304);
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(46);
var subscribeToResult_1 = __webpack_require__(47);
/* tslint:disable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ 309:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_setting__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_web_socket__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__ = __webpack_require__(201);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CatalogueService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CatalogueService = (function () {
    function CatalogueService(http, setting, ws, device) {
        this.http = http;
        this.setting = setting;
        this.ws = ws;
        this.device = device;
        this.catalogueInfoUrl = this.setting.apiTestHost + '/artradeApp/catalogueinfo/getcatalogueinfobylotid.action';
        this.catalogueListUrl = this.setting.apiTestHost + '/artradeApp/item/iteminput/querysriteminfo.action';
        this.givePriceUrl = this.setting.apiTestHost + '/artradeApp/bid/addprice.action';
        this.cataloguePriceUrl = this.setting.apiTestHost + '/artradeApp/common/itemlot/auctitem.action';
    }
    /** 监听出价信息 */
    CatalogueService.prototype.listenBidings = function (logid) {
        return this.ws.listen('/text/auct' + logid);
    };
    // 关闭ws连接
    CatalogueService.prototype.disListenBidings = function () {
        this.ws.unsubscribe();
    };
    // 根据专场id获取拍品图录列表
    CatalogueService.prototype.getCatalogueList = function (saleRoomId, currentPage, pageSize) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        var queryData = {
            filterMap: {
                saleRoomId: saleRoomId + "",
                timeFlag: 'now' //｛"all":全部；"now"：未结束；"end":已结束｝
            },
            pageInfo: {
                currentPage: currentPage,
                pageCount: 0,
                recordCount: 0,
                pageSize: pageSize
            }
        };
        params.set('queryData', JSON.stringify(queryData));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */](),
            search: params
        });
        return this.http.get(this.catalogueListUrl, options)
            .map(function (res) {
            var result = res.json().data.data || [];
            result.forEach(function (item, index, array) {
                item.ITEM_PIC_PATH = _this.setting.apiTestHost + '/gallery' + item.ITEM_PIC_PATH + '_s.jpg';
            });
            return result;
        })
            .catch(this.handleError);
    };
    //根据拍品id获取拍品详情
    CatalogueService.prototype.getCatalogueInfo = function (lotId, saleRoomId, memberId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        var dataStr = {
            imei: this.device.uuid || '0',
            memberId: memberId || '',
            lotId: lotId,
            saleRoomId: saleRoomId,
            showRoom: ''
        };
        params.set('dataStr', JSON.stringify(dataStr));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */](),
            search: params
        });
        return this.http.get(this.catalogueInfoUrl, options)
            .map(function (res) {
            if (res.json().result) {
                var result = res.json().data;
                result.otherItemPicList = result.otherItemPicList || [];
                result.otherItemPicList.forEach(function (item, index, array) {
                    item.filepath = item.filepath + '.' + item.filetype;
                });
                return result;
            }
            return null;
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getNextPrice = function (lotId, inputValue, memberId) {
        return this.getPrice(lotId, memberId, 1, inputValue);
    };
    CatalogueService.prototype.getPrevPrice = function (lotId, inputValue, memberId) {
        return this.getPrice(lotId, memberId, 0, inputValue);
    };
    CatalogueService.prototype.giveNormalPrice = function (lotId, memberId, price) {
        return this.givePrice(lotId, memberId, price, 1);
    };
    CatalogueService.prototype.giveProxyPrice = function (lotId, memberId, price) {
        return this.givePrice(lotId, memberId, price, 2);
    };
    CatalogueService.prototype.givePrice = function (lotId, memberId, price, type) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId || '');
        params.set('lotId', lotId + '');
        params.set('price', price + '');
        params.set('type', type + '');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */](),
            search: params
        });
        return this.http.get(this.givePriceUrl, options)
            .map(function (res) {
            return res.json().data;
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getPrice = function (lotId, memberId, priceType, inputValue) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId || '');
        params.set('lotId', lotId + '');
        params.set('priceType', priceType + '');
        params.set('inputValue', inputValue + '');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */](),
            search: params
        });
        return this.http.get(this.cataloguePriceUrl, options)
            .map(function (res) {
            if (res.json().result) {
                var result = res.json().data;
                return result;
            }
            return null;
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.handleError = function (error) {
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
    return CatalogueService;
}());
CatalogueService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_6__app_app_setting__["a" /* Setting */], __WEBPACK_IMPORTED_MODULE_7__providers_web_socket__["a" /* WebSocketProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */]])
], CatalogueService);

//# sourceMappingURL=catalogue.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_catalogue__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
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
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CategoryPage = (function () {
    function CategoryPage(navCtrl, navParams, catalogueService, toaCtrl, statusBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.catalogueService = catalogueService;
        this.toaCtrl = toaCtrl;
        this.statusBar = statusBar;
        this.pnum = 1;
        this.pqty = 10;
        this.catalogueList = [];
    }
    CategoryPage.prototype.ngAfterViewInit = function () {
    };
    CategoryPage.prototype.ngOnInit = function () {
        this.cateId = this.navParams.get('cateId');
        this.title = this.navParams.get('cateName');
        this.catalogueList = [];
        //this.statusBar.styleDefault();
        this.getItemList(this.cateId, this.pnum, this.pqty);
    };
    CategoryPage.prototype.ionViewDidLoad = function () {
    };
    CategoryPage.prototype.enterItem = function (item) {
        this.navCtrl.push('ItemPage', { item: item, saleRoomId: this.cateId });
    };
    CategoryPage.prototype.getItemList = function (cateId, pnum, pqty) {
        var _this = this;
        this.catalogueService.getCatalogueList(cateId, pnum, pqty).subscribe(function (catalogueList) {
            _this.pnum++;
            _this.catalogueList = catalogueList;
        });
    };
    CategoryPage.prototype.getMoreItem = function (infiniteScroll) {
        var _this = this;
        this.catalogueService.getCatalogueList(this.cateId, this.pnum, this.pqty).subscribe(function (catalogueList) {
            if (catalogueList.length > 0) {
                _this.pnum++;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
                _this.catalogueList = _this.catalogueList.concat(catalogueList);
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
    return CategoryPage;
}());
CategoryPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-category',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/category/category.html"*/'<!--\n  Generated template for the Category page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content fullscreen="true" class="cards-bg">\n\n  <ion-list>\n    <h5 text-center *ngIf="catalogueList.length === 0" style="color:rgb(150, 150, 150);margin-top:60%;">\n      此专场拍品都下架了哦(*^__^*)\n    </h5>\n    <ion-card *ngFor="let item of catalogueList">\n      <img [src]="item.ITEM_PIC_PATH" />\n      <ion-card-content (click)="enterItem(item)">\n        <div class="item-price">￥{{item.CRRNT_PRICE}}</div>\n        <div class="item-name">{{item.ITEM_NAME}}</div>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="getMoreItem($event)" threshold="1%">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/category/category.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_catalogue__["a" /* CatalogueService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_catalogue__["a" /* CatalogueService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]])
], CategoryPage);

//# sourceMappingURL=category.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map