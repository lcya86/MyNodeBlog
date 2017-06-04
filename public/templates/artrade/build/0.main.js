webpackJsonp([0],{

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_picdetail_picdetail__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_time_differ__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_bidmode__ = __webpack_require__(346);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemPageModule", function() { return ItemPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ItemPageModule = (function () {
    function ItemPageModule() {
    }
    return ItemPageModule;
}());
ItemPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__item__["a" /* ItemPage */],
            __WEBPACK_IMPORTED_MODULE_4__pipes_time_differ__["a" /* TimeDiffer */],
            __WEBPACK_IMPORTED_MODULE_5__pipes_bidmode__["a" /* Bidmode */],
            __WEBPACK_IMPORTED_MODULE_3__modals_picdetail_picdetail__["a" /* PicDetail */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__item__["a" /* ItemPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__item__["a" /* ItemPage */]
        ]
    })
], ItemPageModule);

//# sourceMappingURL=item.module.js.map

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

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PicDetail; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PicDetail = (function () {
    function PicDetail(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.pics = params.get('pics');
    }
    PicDetail.prototype.ngAfterViewInit = function () {
        //this.slides.lockSwipes(true);
    };
    PicDetail.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return PicDetail;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], PicDetail.prototype, "slides", void 0);
PicDetail = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'pic-detail',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/item/modals/picdetail/picdetail.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-buttons end>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-slides pager="true" zoom="true">\n  <ion-slide *ngFor="let img of pics">\n    <div class="swiper-zoom-container">\n      <img src="assets/img/a10444420.jpg" />\n    </div>\n  </ion-slide>\n</ion-slides>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/item/modals/picdetail/picdetail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], PicDetail);

//# sourceMappingURL=picdetail.js.map

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

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BiddingData; });
var BiddingData = (function () {
    function BiddingData() {
    }
    return BiddingData;
}());

//# sourceMappingURL=biddingData.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Catalogue; });
var Catalogue = (function () {
    function Catalogue() {
    }
    return Catalogue;
}());

//# sourceMappingURL=catalogue.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
var Item = (function () {
    function Item() {
    }
    return Item;
}());

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_item__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_biddingData__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_item__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_catalogue__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_catalogue__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_storages__ = __webpack_require__(202);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ItemPage = (function () {
    function ItemPage(navCtrl, navParams, altCtrl, toaCtrl, modCtrl, itemService, catalogueService, storages, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.altCtrl = altCtrl;
        this.toaCtrl = toaCtrl;
        this.modCtrl = modCtrl;
        this.itemService = itemService;
        this.catalogueService = catalogueService;
        this.storages = storages;
        this.loadingCtrl = loadingCtrl;
        this.cmmssnValue = 0; //当前佣金
        this.chargeprice = 0;
        this.detail = 'description';
        this.item = new __WEBPACK_IMPORTED_MODULE_2__models_item__["a" /* Item */]();
        this.catalogue = new __WEBPACK_IMPORTED_MODULE_7__models_catalogue__["a" /* Catalogue */]();
        this.user = this.storages.get('User') || new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
    }
    ItemPage.prototype.caculateCharge = function (bidPrice, commission) {
        this.cmmssnValue = Math.round(bidPrice / commission);
        this.chargeprice = this.cmmssnValue + Number(bidPrice);
    };
    ItemPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var item = this.navParams.get('item');
        var lotId = item.LOT_ID;
        var saleRoomId = this.navParams.get('saleRoomId');
        this.catalogueService.getCatalogueInfo(lotId, saleRoomId, this.user.memberId).subscribe(function (catalogue) {
            _this.catalogue = catalogue;
            if (_this.catalogue.BIDCOUNT > 0) {
                _this.bidPrice = _this.catalogue.CURRENTPRICE;
                _this.addPrice();
            }
            else {
                _this.bidPrice = _this.catalogue.STARTPRICE;
            }
            var countDownInterval = setInterval(function () {
                _this.startTimeCountDown = catalogue.STARTTIME - new Date().getTime();
                _this.endTimeCountDown = catalogue.ENDTIME - new Date().getTime();
                if (_this.startTimeCountDown > 0) {
                    _this.pageStatus = 'noAction';
                }
                else if (_this.endTimeCountDown > 0) {
                    _this.pageStatus = 'actioning';
                }
                else {
                    _this.pageStatus = 'actioned';
                }
            }, 1000);
            if (_this.catalogue.LOTSTATUS === '0008') {
                clearInterval(countDownInterval);
            }
            _this.bidingsListenSubscription = _this.catalogueService.listenBidings(_this.catalogue.LOTID).subscribe(function (message) {
                //解析非标准json
                var data = (new Function('return ' + message.data))();
                var newbid = new __WEBPACK_IMPORTED_MODULE_3__models_biddingData__["a" /* BiddingData */]();
                newbid = data.bids[0];
                _this.catalogue.CURRENTPRICE = newbid.bidPrice;
                _this.catalogue.currentBid = newbid;
                _this.bidPrice = data.nextPrice;
                _this.catalogue.bids.unshift(newbid);
            });
            loading.dismiss();
        });
    };
    ItemPage.prototype.ngOnDestroy = function () {
        this.bidingsListenSubscription.unsubscribe();
        this.itemService.disListenBidings();
    };
    ItemPage.prototype.picDetail = function () {
        this.modCtrl.create('PicDetail', {
            pics: this.catalogue.otherItemPicList
        }).present();
    };
    ItemPage.prototype.addPrice = function () {
        var _this = this;
        if (!this.catalogue.INCRPRICE) {
            this.catalogueService.getNextPrice(this.catalogue.LOTID, this.bidPrice, this.user.memberId).subscribe(function (price) {
                _this.bidPrice = price;
            });
        }
        else {
            this.bidPrice = this.bidPrice + this.catalogue.INCRPRICE;
        }
    };
    ItemPage.prototype.reducePrice = function () {
        var _this = this;
        if (!this.catalogue.INCRPRICE) {
            this.catalogueService.getPrevPrice(this.catalogue.LOTID, this.bidPrice, this.user.memberId).subscribe(function (price) {
                if (price > 0) {
                    _this.bidPrice = price;
                }
                else {
                    _this.toaCtrl.create({
                        message: '出价不能低于当前价!',
                        duration: 1000,
                        dismissOnPageChange: true
                    }).present();
                }
            });
        }
        else {
            if (this.bidPrice > this.catalogue.CURRENTPRICE) {
                this.bidPrice -= this.catalogue.INCRPRICE;
            }
            else {
                this.toaCtrl.create({
                    message: '出价不能低于当前价!',
                    duration: 1000,
                    //showCloseButton: true,
                    closeButtonText: '好的',
                    dismissOnPageChange: true
                }).present();
            }
        }
    };
    ItemPage.prototype.giveNormalPrice = function () {
        var _this = this;
        if (!this.storages.get('User')) {
            return this.navCtrl.push('LoginPage');
        }
        this.caculateCharge(this.bidPrice, this.catalogue.commission);
        var title = '';
        if (this.catalogue.currentBid && this.catalogue.currentBid.bidderId === Number(this.user.memberId)) {
            title = '您已领先 是否再次出价？';
        }
        else {
            title = '确认出价？';
        }
        var confirm = this.altCtrl.create({
            title: title,
            message: "出价￥" + this.bidPrice + '<br>含佣金价￥' + this.chargeprice,
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.catalogueService.giveNormalPrice(_this.catalogue.LOTID, _this.user.memberId, _this.bidPrice).subscribe(function (result) {
                            _this.toaCtrl.create({
                                message: result,
                                duration: 1000,
                                dismissOnPageChange: true
                            }).present();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ItemPage.prototype.giveProxyPrice = function () {
        var _this = this;
        if (!this.storages.get('User')) {
            return this.navCtrl.push('LoginPage');
        }
        this.caculateCharge(this.bidPrice, this.catalogue.commission);
        var title;
        if (this.catalogue.currentBid && this.catalogue.currentBid.bidderId === Number(this.user.memberId)) {
            title = '您已领先 是否再次出价？';
        }
        else {
            title = '确认出价？';
        }
        var confirm = this.altCtrl.create({
            title: '确认代理出价？',
            message: "出价￥" + this.bidPrice + '<br>含佣金价￥' + this.chargeprice,
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.catalogueService.giveProxyPrice(_this.catalogue.LOTID, _this.user.memberId, _this.bidPrice).subscribe(function (result) {
                            _this.toaCtrl.create({
                                message: result,
                                duration: 1000,
                                dismissOnPageChange: true
                            }).present();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ItemPage.prototype.collectItem = function () {
        // if (this.item.isCared == 'Y') {
        //   this.itemService.caredItemMod('uncare', this.item.itemnum).subscribe(result => {
        //     if (result) {
        //       this.item.isCared = 'N';
        //     }
        //   })
        // } else {
        //   this.itemService.caredItemMod('care', this.item.itemnum).subscribe(result => {
        //     if (result) {
        //       this.item.isCared = 'Y';
        //     }
        //   })
        // }
    };
    ItemPage.prototype.setAlert = function () {
    };
    ItemPage.prototype.shareItem = function () {
    };
    return ItemPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Content */])
], ItemPage.prototype, "content", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], ItemPage.prototype, "slides", void 0);
ItemPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-item',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/item/item.html"*/'<ion-header no-border>\n  <ion-navbar color="dark">\n    <ion-buttons end>\n      <button ion-button icon-only (click)="shareItem()">\n        <ion-icon ios="ios-share-outline" md="md-share"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="collectItem()" *ngIf="item.isCared==\'N\'">\n        <ion-icon name="heart-outline"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="collectItem()" *ngIf="item.isCared==\'Y\'">\n        <ion-icon color="danger" name="heart"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="setAlert()">\n        <ion-icon ios="ios-alarm-outline" md="md-alarm"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content fullscreen="true">\n  <ion-slides pager="true" (click)="picDetail()">\n    <ion-slide *ngFor="let img of catalogue.otherItemPicList">\n      <img [src]="img.filepath" />\n    </ion-slide>\n  </ion-slides>\n  <ion-list>\n    <ion-item>\n      {{catalogue.ITEMNAME}}\n      <ion-badge item-right *ngIf="catalogue.LOTSTATUS === \'0002\' || (pageStatus===\'actioned\'&&catalogue.LOTSTATUS !== \'0008\')" color="danger">已结束</ion-badge>\n      <ion-badge item-right *ngIf="catalogue.LOTSTATUS === \'0008\'" color="danger">已撤拍</ion-badge>\n      <ion-badge item-right *ngIf="catalogue.LOTSTATUS === \'0001\' && pageStatus===\'actioning\'">拍卖中</ion-badge>\n      <ion-badge item-right *ngIf="catalogue.LOTSTATUS === \'0001\' && pageStatus===\'noAction\'">预展中</ion-badge>\n    </ion-item>\n\n    <ion-item *ngIf="catalogue.LOTSTATUS === \'0001\' && pageStatus===\'actioning\'">\n      <!-- <ion-icon large item-left ios="ios-clock-outline" md="md-clock"></ion-icon> -->\n      距结束：{{endTimeCountDown | timeDiffer}}\n    </ion-item>\n    <ion-item *ngIf="catalogue.LOTSTATUS === \'0001\' && pageStatus===\'noAction\'">\n      <!-- <ion-icon large item-left ios="ios-clock-outline" md="md-clock"></ion-icon> -->\n      距开拍：{{startTimeCountDown | timeDiffer}}\n    </ion-item>\n    <ion-item>\n      拍卖类型：{{catalogue.BIDMODE | bidmode}}\n    </ion-item>\n\n    <ion-item>\n      <ion-grid text-center>\n        <ion-row>\n          <ion-col>\n            <p>起拍价</p>\n          </ion-col>\n          <ion-col>\n            <p>加价幅度</p>\n          </ion-col>\n          <ion-col>\n            <p>当前价</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>￥{{catalogue.STARTPRICE}}</ion-col>\n          <ion-col>￥{{catalogue.INCRPRICE}}</ion-col>\n          <ion-col>￥{{catalogue.CURRENTPRICE}}</ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n\n    <ion-segment padding [(ngModel)]="detail" color="primary">\n      <ion-segment-button value="description">\n        拍品详情\n      </ion-segment-button>\n      <ion-segment-button disabled="!((catalogue.LOTSTATUS === \'0001\' && pageStatus===\'actioning\') || catalogue.LOTSTATUS === \'0002\')" value="bidrecord">\n        出价记录\n      </ion-segment-button>\n      <ion-segment-button value="notice">\n        注意事项\n      </ion-segment-button>\n    </ion-segment>\n    <ion-list inset *ngIf="detail === \'description\' && catalogue.itemInfo">\n      <ion-item *ngIf="catalogue.itemInfo.length !== null">\n        长度\n        <ion-note item-right>{{catalogue.itemInfo.length}}厘米</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.width !== null">\n        宽度\n        <ion-note item-right>{{catalogue.itemInfo.width}}厘米</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.height !== null">\n        高度\n        <ion-note item-right>{{catalogue.itemInfo.height}}厘米</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.diameter !== null">\n        拍品直径\n        <ion-note item-right>{{catalogue.itemInfo.diameter}}厘米</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.weight !== null">\n        拍品重量\n        <ion-note item-right>{{catalogue.itemInfo.weight}}克</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.authorName !== null">\n        艺术家\n        <ion-note item-right>{{catalogue.itemInfo.authorName}}</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.itemAge !== null">\n        拍品年代\n        <ion-note item-right>{{catalogue.itemInfo.itemAge}}</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.material !== null">\n        拍品质地\n        <ion-note item-right>{{catalogue.itemInfo.material}}</ion-note>\n      </ion-item>\n      <ion-item *ngIf="catalogue.itemInfo.style !== null">\n        拍品形式\n        <ion-note item-right>{{catalogue.itemInfo.style}}</ion-note>\n      </ion-item>\n    </ion-list>\n    <ion-list inset *ngIf="detail === \'bidrecord\'">\n      <h6 text-center *ngIf="catalogue.bids.length === 0" style="color:rgb(150, 150, 150);">\n        还没有人出价哦(*^__^*)\n      </h6>\n      <ion-item *ngFor="let record of catalogue.bids">\n        <p>竞买人：{{record.bidderName}}</p>\n        <p>竞买价：{{record.bidPrice}}</p>\n        <p>出价时间：{{record.bidTime | date:"yyyy-MM-dd HH:mm:ss"}}</p>\n      </ion-item>\n    </ion-list>\n    <div *ngIf="detail === \'notice\'" padding>\n      <p style="color:orange;">敬告：您的出价行为表明已经认同了嘉德在线的拍卖规则。不论成功与否，你都承担与之相应的法律行为.</p>\n      <p>注意：根据《拍卖法》的规定：买受人应当按照约定支付拍卖标的的价款，未按照约定支付价款的，应当承担违约责。通过竞买取得的拍品为特殊属性之商品，属于2014年3月15日起施行的《中华人民共和国消费者权益保护法》规定的“其他根据商品性质并经消费者在购买时确认不宜退货的商品，不适用无理由退货”。为了维护买卖双方的利益，规范网络拍卖市场的行为，如果因实物与描述明显不符，客户对拍品有退货的诉求，请在提货之日起7个工作日之内、物流发货请在签收之日起7个工作日内提出，逾期不予受理。不便之处，敬请谅解。</p>\n    </div>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <button [disabled]="!(pageStatus===\'actioning\' && catalogue.LOTSTATUS === \'0001\')" color="dark" ion-button icon-only (click)="reducePrice()">\n      <ion-icon ios="ios-remove" md="md-remove"></ion-icon>\n    </button>\n    <button [disabled]="!(pageStatus===\'actioning\' && catalogue.LOTSTATUS === \'0001\')" color="dark" ion-button (click)="addPrice()">\n      <ion-icon name="logo-yen"></ion-icon>\n      &nbsp;\n      {{bidPrice}}\n    </button>\n    <button [disabled]="!(pageStatus===\'actioning\' && catalogue.LOTSTATUS === \'0001\')" color="dark" ion-button (click)="giveNormalPrice()">\n      出价\n    </button>\n    <button [disabled]="!(pageStatus===\'actioning\' && catalogue.LOTSTATUS === \'0001\')" ion-button color="danger" (click)="giveProxyPrice()">\n      代理出价\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/item/item.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__service_item__["a" /* ItemService */], __WEBPACK_IMPORTED_MODULE_8__providers_storages__["a" /* Storages */], __WEBPACK_IMPORTED_MODULE_6__service_catalogue__["a" /* CatalogueService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__service_item__["a" /* ItemService */], __WEBPACK_IMPORTED_MODULE_6__service_catalogue__["a" /* CatalogueService */], __WEBPACK_IMPORTED_MODULE_8__providers_storages__["a" /* Storages */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */]])
], ItemPage);

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bidmode; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the Bidmode pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var Bidmode = (function () {
    function Bidmode() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    Bidmode.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = "";
        if (value === "0001") {
            result = "一口价"; // 拍卖方式
        }
        else if (value === "0002") {
            result = "速胜"; // 拍卖方式
        }
        else if (value === "0003") {
            result = "英式"; // 拍卖方式
        }
        return result;
    };
    return Bidmode;
}());
Bidmode = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Pipe */])({
        name: 'bidmode',
    })
], Bidmode);

//# sourceMappingURL=bidmode.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeDiffer; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the Time pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var TimeDiffer = (function () {
    function TimeDiffer() {
    }
    /**
     * transform the number type time to days, hours,minutes and seconds
     */
    TimeDiffer.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var days = Math.floor(value / 1000 / 60 / 60 / 24);
        var hours = Math.floor(value / 1000 / 60 / 60 % 24);
        var minutes = Math.floor(value / 1000 / 60 % 60);
        var seconds = Math.floor(value / 1000 % 60);
        return days + '天 ' + hours + '小时 ' + minutes + '分钟 ' + seconds + '秒';
    };
    return TimeDiffer;
}());
TimeDiffer = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Pipe */])({
        name: 'timeDiffer',
    })
], TimeDiffer);

//# sourceMappingURL=time-differ.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map