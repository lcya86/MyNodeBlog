webpackJsonp([3],{

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collections__ = __webpack_require__(331);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionsPageModule", function() { return CollectionsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CollectionsPageModule = (function () {
    function CollectionsPageModule() {
    }
    return CollectionsPageModule;
}());
CollectionsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__collections__["a" /* CollectionsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__collections__["a" /* CollectionsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__collections__["a" /* CollectionsPage */]
        ]
    })
], CollectionsPageModule);

//# sourceMappingURL=collections.module.js.map

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

/***/ 305:
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ItemService = (function () {
    function ItemService(http, setting, ws, device) {
        this.http = http;
        this.setting = setting;
        this.ws = ws;
        this.device = device;
        this.itemDetailUrl = this.setting.apiTestHost + '/artradeApp/catalogueinfo/getcatalogueinfobylotid.action';
        this.todayItemListUrl = this.setting.apihost + '/listings/endOfDaylist';
        this.itemCollectionUrl = this.setting.apihost + '/personal/collectAuctionlist';
        this.myBiddingItemListUrl = this.setting.apihost + '/personal/myBidding';
        this.itemSearchUrl = this.setting.apihost + '/search/searchItems';
        this.caredItemModUrl = this.setting.apihost + '/personal/caredItemMod';
        this.unpaidItemUrl = this.setting.apihost + '/personal/unpaidItem';
    }
    /** 监听出价信息 */
    ItemService.prototype.listenBidings = function () {
        return this.ws.listen('/chat/demo');
    };
    // 关闭ws连接
    ItemService.prototype.disListenBidings = function () {
        this.ws.unsubscribe();
    };
    // 根据专场id获取拍品列表
    ItemService.prototype.getTodayItemList = function (pnum, pqty) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"endOfDaylist","Parameters":[{"imei":"12365478912345","userId":"1367197261","cateId":"0","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":""}]}]}');
        return this.http.get(this.todayItemListUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data || []; })
            .catch(this.handleError);
    };
    ItemService.prototype.getCollectionItemList = function (pnum, pqty) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"collectAuctionlist","Parameters":[{"imei":"12365478912345","userId":"1367197261","cateId":"","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":"td"}]}]}');
        return this.http.get(this.itemCollectionUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data || []; })
            .catch(this.handleError);
    };
    ItemService.prototype.getItemDetail = function (lotId, saleRoomId, memberId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        var paramsObject = {
            dataStr: {
                imei: this.device.uuid || '0',
                memberId: memberId || '',
                lotId: lotId,
                saleRoomId: saleRoomId,
                showRoom: ''
            }
        };
        params.set('Parmeters', JSON.stringify(paramsObject));
        return this.http.get(this.itemDetailUrl, { search: params })
            .map(function (res) {
            var item = res.json().OutputData || {};
            if (item.sPicPath) {
                item.sPicPath = item.sPicPath.split(',');
            }
            return item;
        })
            .catch(this.handleError);
    };
    ItemService.prototype.getMyBiddingItemList = function (pnum, pqty, type) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"myBidding","Parameters":[{"imei":"12365478912345","userId":"1367197261","type":"' + type + '","pnum":"' + pnum + '","pqty":"' + pqty + '"}]}]}]}');
        return this.http.get(this.myBiddingItemListUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data || []; })
            .catch(this.handleError);
    };
    ItemService.prototype.getUnpaidItemList = function (pnum, pqty, duration) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"unpayedItem","Parameters":[{"imei":"12365478912345","userId":"1367197261","cateId":"0","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":""}]}]}');
        return this.http.get(this.unpaidItemUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data || []; })
            .catch(this.handleError);
    };
    ItemService.prototype.getSearchItems = function (pnum, pqty, searchStr) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"searchItems","Parameters":[{"imei":"12365478912345","userId":"1367197261","srchStr":"' + searchStr + '","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":"td"}]}]}]}');
        return this.http.get(this.itemSearchUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data || []; })
            .catch(this.handleError);
    };
    ItemService.prototype.caredItemMod = function (type, itemId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"caredItemMod","Parameters":[{"imei":"12365478912345","userId":"1367197261","itemnum":"' + itemId + '","type":"' + type + '"}]}]}]}');
        return this.http.get(this.caredItemModUrl, { search: params })
            .map(function (res) { return !!res.json().OutputData.Success; })
            .catch(this.handleError);
    };
    ItemService.prototype.handleError = function (error) {
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
    return ItemService;
}());
ItemService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_6__app_app_setting__["a" /* Setting */], __WEBPACK_IMPORTED_MODULE_7__providers_web_socket__["a" /* WebSocketProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */]])
], ItemService);

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_item__ = __webpack_require__(305);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CollectionsPage = (function () {
    function CollectionsPage(navCtrl, itemService, navParams, toaCtrl, statusBar) {
        this.navCtrl = navCtrl;
        this.itemService = itemService;
        this.navParams = navParams;
        this.toaCtrl = toaCtrl;
        this.statusBar = statusBar;
        this.pnum = 1;
        this.pqty = 10;
        this.collectionList = [];
    }
    CollectionsPage.prototype.getCollectionList = function (pnum, pqty) {
        var _this = this;
        this.itemService.getCollectionItemList(pnum, pqty).subscribe(function (itemList) {
            if (itemList.length > 0) {
                _this.collectionList = itemList;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    CollectionsPage.prototype.getMoreCollection = function (infiniteScroll) {
        var _this = this;
        this.itemService.getCollectionItemList(this.pnum, this.pqty).subscribe(function (itemList) {
            if (itemList.length > 0) {
                _this.pnum++;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
                _this.collectionList = _this.collectionList.concat(itemList);
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
        }, function (error) { return _this.errorMessage = error; });
    };
    CollectionsPage.prototype.ionViewDidLoad = function () {
        this.getCollectionList(this.pnum, this.pqty);
    };
    CollectionsPage.prototype.ionViewWillEnter = function () {
        this.statusBar.styleDefault();
    };
    return CollectionsPage;
}());
CollectionsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-collections',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/collections/collections.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      收藏\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen="true" class="cards-bg">\n  <ion-list>\n    <h5 text-center *ngIf="collectionList.length === 0" style="color:rgb(150, 150, 150);margin-top:60%;">\n      还没有藏品，赶快去收藏吧(*^__^*)\n    </h5>\n    <ion-card *ngFor="let item of collectionList">\n      <div [ngStyle]="{\'background-image\':\'url(\'+item.picPath+\')\'}" style="height:150px;background-size:cover;">\n      </div>\n      <ion-card-content>\n        <ion-card-title>\n          {{item.title}}\n        </ion-card-title>\n        <p>当前价: ￥{{item.currentBid}}</p>\n      </ion-card-content>\n      <ion-row no-padding>\n        <ion-col text-left>\n          <button small ion-button clear icon-left>\n            <ion-icon name="clock"></ion-icon>一天后结束\n          </button>\n        </ion-col>\n        <ion-col text-right>\n          <button small ion-button clear icon-left>\n            <ion-icon name="eye"></ion-icon>435\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="getMoreCollection($event)">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/collections/collections.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__service_item__["a" /* ItemService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__service_item__["a" /* ItemService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
], CollectionsPage);

//# sourceMappingURL=collections.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map