webpackJsonp([1],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(322);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = (function () {
    function HomePageModule() {
    }
    return HomePageModule;
}());
HomePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
        ]
    })
], HomePageModule);

//# sourceMappingURL=home.module.js.map

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

/***/ 310:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_setting__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CategoryService = (function () {
    function CategoryService(http, setting) {
        this.http = http;
        this.setting = setting;
        this.categoryUrl = this.setting.apihost + '/category';
        this.categoryIdUrl = this.setting.apihost + '/homepage';
        this.categoryChannel = this.setting.apihost + '/listings/channelList';
    }
    CategoryService.prototype.getCategoryList = function (pcateId, pnum, pqty) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        //params.set('callback', 'JSONP_CALLBACK');
        params.set('Parmeters', '{"InputData":[{"APIName":"category","Parameters":[{"imei":"1236547890","userId":"","pcateId":"' + pcateId + '","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":""}]}]}');
        return this.http.get(this.categoryUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.getCategoryListByChannel = function (cateId, pnum, pqty) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"channelList","Parameters":[{"imei":"12365478912345","userId":"1367197261","cateId":"' + cateId + '","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":""}]}]}');
        return this.http.get(this.categoryChannel, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.getAgentCategoryList = function (pnum, pqty) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        params.set('Parmeters', '{"InputData":[{"APIName":"category","Parameters":[{"imei":"1236547890","userId":"","pcateId":"1154204834","pnum":"' + pnum + '","pqty":"' + pqty + '","porder":""}]}]}');
        return this.http.get(this.categoryUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.getRecommendCategoryList = function (posId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        //params.set('callback', 'JSONP_CALLBACK');
        params.set('Parmeters', '{"InputData":[{"APIName":"homepage","Parameters":[{"imei":"12365478912345","userId":"1367197261"}]}]}');
        return this.http.get(this.categoryIdUrl, { search: params })
            .map(function (res) {
            var data = res.json().OutputData.Data;
            var result = data.filter(function (item) { return item.posId == '14'; })[0].content;
            // result = result.concat(data.filter(item => item.posId === '15')[0].content);
            // result = result.concat(data.filter(item => item.posId === '4')[0].content);
            // result = result.concat(data.filter(item => item.posId === '5')[0].content);
            // result = result.concat(data.filter(item => item.posId === '8')[0].content);
            // result = result.concat(data.filter(item => item.posId === '6')[0].content);
            // result = result.concat(data.filter(item => item.posId === '7')[0].content);
            return result || [];
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.extractData = function (res) {
        return res.json().OutputData.Data || [];
    };
    CategoryService.prototype.handleError = function (error) {
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
    return CategoryService;
}());
CategoryService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_5__app_app_setting__["a" /* Setting */]])
], CategoryService);

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_category__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_home__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_item__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_setting__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_animations__ = __webpack_require__(203);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, _ngZone, categoryService, itemService, modCtrl, toaCtrl, statusBar, homeService, setting) {
        this.navCtrl = navCtrl;
        this._ngZone = _ngZone;
        this.categoryService = categoryService;
        this.itemService = itemService;
        this.modCtrl = modCtrl;
        this.toaCtrl = toaCtrl;
        this.statusBar = statusBar;
        this.homeService = homeService;
        this.setting = setting;
        this.searching = false;
        this.searchItemList = [];
        this.search_pnum = 1;
        this.search_pqty = 5;
        this.categoryList = [];
        this.categorys = [];
        this.category_pnum = 1; //当前页码
        this.category_pqty = 5; //每页数量
        this.todayItemList = [];
        this.today_pnum = 1; //当前页码
        this.today_pqty = 5; //每页数量
        this.recentItems = [];
        this.types = {};
        this.artistsDisplay = '任何艺术家';
        this.typesDisplay = '任何类型';
        this.timeDisplay = '任何时间';
        this.bannerImgList = [
            'http://www.artrade.com/images/2017/banner/17042101.jpg',
            'http://www.artrade.com/images/2017/banner/17041401.jpg',
            'http://www.artrade.com/images/2017/banner/17041402.jpg',
            'http://www.artrade.com/images/2017/banner/17041703.jpg'
        ];
        this.searchbarState = 'inactive';
        this.segment = 'recommend';
    }
    HomePage.prototype.toggleSearchbar = function () {
        if (this.searchbarState === 'inactive') {
            this.searchbarState = 'active';
        }
        else {
            this.searchbarState = 'inactive';
        }
    };
    HomePage.prototype.closeSearchbar = function () {
        var _this = this;
        if (this.searchbarState === 'active') {
            this._ngZone.run(function () {
                _this.searchbarState = 'inactive';
            });
        }
    };
    HomePage.prototype.enterItem = function (item) {
        this.navCtrl.push('ItemPage', { item: item });
    };
    HomePage.prototype.clearSearchCondition = function () {
        this.searching = false;
        this.artistsDisplay = '任何艺术家';
        this.typesDisplay = '任何类型';
        this.timeDisplay = '任何时间';
    };
    HomePage.prototype.doSearching = function () {
        var _this = this;
        this.itemService.getSearchItems(this.search_pnum, this.search_pqty, this.artistsDisplay + ',' + this.typesDisplay).subscribe(function (list) {
            if (list.length > 0) {
                _this.searchItemList = list;
                _this.searching = true;
                _this.search_pnum++;
            }
        });
    };
    HomePage.prototype.getMoreSearchItem = function () {
        var _this = this;
        this.itemService.getSearchItems(this.search_pnum, this.search_pqty, this.artistsDisplay + ',' + this.typesDisplay).subscribe(function (list) {
            if (list.length > 0) {
                _this.searchItemList = _this.searchItemList.concat(list);
            }
        });
    };
    HomePage.prototype.pickArtist = function () {
        var _this = this;
        var artistPicker = this.modCtrl.create('PickArtist', { artist: this.artist });
        artistPicker.onDidDismiss(function (data) {
            if (data != undefined) {
                _this.artist = data.artist;
                _this.artistsDisplay = _this.artist.name;
                _this.doSearching();
            }
        });
        artistPicker.present();
    };
    HomePage.prototype.pickType = function () {
        var _this = this;
        var typePicker = this.modCtrl.create('PickType', { types: this.types });
        typePicker.onDidDismiss(function (data) {
            if (data != undefined) {
                _this.types = data.types;
                _this.typesDisplay = _this.types.filter(function (item) {
                    return item.selected;
                }).map(function (item) {
                    return item.name;
                }).join('/');
                _this.doSearching();
            }
        });
        typePicker.present();
    };
    HomePage.prototype.pickDate = function () {
        var _this = this;
        var datePicker = this.modCtrl.create('PickDate');
        datePicker.onDidDismiss(function (data) {
            if (data != undefined) {
                _this.timeDisplay = data.date;
            }
        });
        datePicker.present();
    };
    HomePage.prototype.ngOnInit = function () {
        this.getFloors();
    };
    HomePage.prototype.getFloors = function () {
        var _this = this;
        this.homeService.getFloors().subscribe(function (result) {
            if (result) {
                _this.categorys = result;
            }
            else {
                _this.toaCtrl.create({
                    message: '服务器丢了o(╯□╰)o 请稍后再试',
                    duration: 1000,
                    position: 'middle',
                    //showCloseButton: true,
                    dismissOnPageChange: true
                }).present();
            }
        });
    };
    HomePage.prototype.enterRoom = function (room) {
        if (room.rmType === '0002') {
            this.enterCategoryPage(room);
        }
    };
    HomePage.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getCategoryListByChannel(1, 1, 5).subscribe(function (category) {
            _this.categorys.zgsh = category.slice(0, 4);
        });
        this.categoryService.getCategoryListByChannel(4, 1, 5).subscribe(function (category) {
            _this.categorys.gczx = category.slice(0, 4);
        });
        this.categoryService.getCategoryListByChannel(5, 1, 5).subscribe(function (category) {
            _this.categorys.ddgy = category.slice(0, 4);
        });
        this.categoryService.getCategoryListByChannel(3, 1, 5).subscribe(function (category) {
            _this.categorys.yhds = category.slice(0, 4);
        });
    };
    HomePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.slides.changes.subscribe(function (item) {
            _this.reRenderSlide();
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.statusBar.styleLightContent();
    };
    HomePage.prototype.enterCategoryPage = function (category) {
        this.navCtrl.push('CategoryPage', {
            //cateId: category.roomId,
            cateId: 1,
            cateName: category.rmAttText
        });
    };
    HomePage.prototype.enterMessagePage = function () {
        this.navCtrl.push('MessagePage');
    };
    HomePage.prototype.reRenderSlide = function () {
        var banner = this.slides.first;
        this.slides.map(function (item, index, array) {
            if (item != banner) {
                item.slidesOffsetBefore = 24;
                item.spaceBetween = 12;
                item.slidesPerView = 'auto';
                item.slidesOffsetAfter = 24;
            }
        });
    };
    return HomePage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Content */])
], HomePage.prototype, "content", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* QueryList */])
], HomePage.prototype, "slides", void 0);
HomePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar no-padding>\n    <ion-card [@toolbarState]="searchbarState" style="position:relative;z-index:1;">\n      <ion-row>\n        <ion-col col-9>\n          <ion-item (click)="toggleSearchbar()">\n            <ion-icon large item-left ios="ios-search-outline" md="md-search"></ion-icon>\n            {{artistsDisplay}}·{{typesDisplay}}·{{timeDisplay}}\n          </ion-item>\n        </ion-col>\n        <ion-col col-3 align-self-center text-right>\n          <button ion-button icon-only clear color="dark" (click)="enterMessagePage()">\n            <ion-icon large item-left name="text"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </ion-toolbar>\n</ion-header>\n<ion-header [@searchbarState]="searchbarState">\n  <ion-toolbar>\n    <ion-row style="margin-bottom: -10px;padding-left: 10px;">\n      <ion-col col-8>\n        <button ion-button icon-only clear color="light" (click)="toggleSearchbar()">\n          <ion-icon large ios="ios-arrow-up" md="md-arrow-up"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-4>\n        <button [hidden]="!searching" ion-button clear color="light" (click)="clearSearchCondition()">\n          全部清除\n        </button>\n      </ion-col>\n    </ion-row>\n    <ion-card (click)="pickArtist()">\n      <ion-item>\n        <ion-icon item-left large ios="ios-happy-outline" md="md-happy"></ion-icon>\n        {{artistsDisplay}}\n      </ion-item>\n    </ion-card>\n    <ion-card (click)="pickType()">\n      <ion-item>\n        <ion-icon item-left large ios="ios-color-palette-outline" md="md-color-palette"></ion-icon>\n        {{typesDisplay}}\n      </ion-item>\n    </ion-card>\n    <ion-card (click)="pickDate()">\n      <ion-item>\n        <ion-icon item-left large ios="ios-calendar-outline" md="md-calendar"></ion-icon>\n        {{timeDisplay}}\n      </ion-item>\n    </ion-card>\n  </ion-toolbar>\n</ion-header>\n<ion-content (ionScrollStart)="closeSearchbar()" [hidden]="segment !== \'recommend\' || searching" fullscreen="true" class="cards-bg">\n  <ion-slides autoplay="4000" loop="true">\n    <ion-slide *ngFor="let img of bannerImgList">\n      <div [ngStyle]="{\'background-image\':\'url(\'+img+\')\'}" style="height:150px;background-size:cover;background-position:center;">\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <ion-list>\n    <section *ngFor="let category of categorys">\n      <h5>{{category.flTitle}}</h5>\n      <ion-slides class="category-slides">\n        <ion-slide *ngFor="let room of category.rooms">\n          <ion-card no-margin (click)="enterRoom(room)">\n            <div [ngStyle]="{\'background-image\':\'url(\'+room.rmPicUrl+\')\'}" style="height:150px;background-size:cover;background-position:center;">\n            </div>\n            <ion-card-content>\n              <div class="item-name">{{room.rmAttText}}</div>\n            </ion-card-content>\n          </ion-card>\n        </ion-slide>\n      </ion-slides>\n    </section>\n  </ion-list>\n\n\n</ion-content>\n\n<ion-content (ionScrollStart)="closeSearchbar()" [hidden]="!searching" fullscreen="true" class="cards-bg">\n\n  <ion-list>\n    <ion-card *ngFor="let item of searchItemList">\n      <img [src]="item.picPath" />\n      <ion-card-content (click)="enterItem(item)">\n        <div class="item-price">￥{{item.currentBid}}</div>\n        <div class="item-name">{{item.title}}</div>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="getMoreSearchItem($event)" threshold="30%">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/home/home.html"*/,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["a" /* trigger */])('searchbarState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["b" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["c" /* style */])({
                    'transform': 'translateY(-272px)',
                    'opacity': '0'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["b" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["c" /* style */])({
                    'transform': 'translateY(0)',
                    'opacity': '1'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["d" /* transition */])('inactive => active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('300ms ease-out')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["d" /* transition */])('active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('300ms ease-in'))
            ]),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["a" /* trigger */])('toolbarState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["b" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["c" /* style */])({
                    opacity: '1'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["b" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["c" /* style */])({
                    opacity: '0'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["d" /* transition */])('inactive => active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('300ms ease-out')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["d" /* transition */])('active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('300ms ease-in'))
            ])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_3__service_category__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_5__service_item__["a" /* ItemService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__service_home__["a" /* HomeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__service_category__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_5__service_item__["a" /* ItemService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__service_home__["a" /* HomeService */], __WEBPACK_IMPORTED_MODULE_6__app_app_setting__["a" /* Setting */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 349:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_setting__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
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
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var HomeService = (function () {
    function HomeService(http, setting) {
        this.http = http;
        this.setting = setting;
        this.floorsUrl = this.setting.apiTestHost + '/artradeApp/getfloors.action';
    }
    HomeService.prototype.getFloors = function () {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.floorsUrl, options)
            .map(function (res) {
            var response = res.json();
            if (response.result) {
                var result = response.data.filter(function (item, index, array) {
                    return item.flShow === 'Y' && (item.showType === '0002' || item.showType === '0003');
                });
                result = result.map(function (item, index, array) {
                    if (!item.rooms) {
                        item.rooms = [];
                    }
                    else {
                        item.rooms.rmPicUrl = _this.setting.apiTestHost + '/gallery' + item.rooms.rmPicUrl;
                        item.rooms = [item.rooms];
                    }
                    return item;
                });
                return result;
            }
            return false;
        })
            .catch(this.handleError);
    };
    HomeService.prototype.handleError = function (error) {
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
    return HomeService;
}());
HomeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_5__app_app_setting__["a" /* Setting */]])
], HomeService);

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map