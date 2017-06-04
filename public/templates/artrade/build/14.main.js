webpackJsonp([14],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail__ = __webpack_require__(327);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDetailModule", function() { return MessageDetailModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessageDetailModule = (function () {
    function MessageDetailModule() {
    }
    return MessageDetailModule;
}());
MessageDetailModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__detail__["a" /* MessageDetail */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__detail__["a" /* MessageDetail */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__detail__["a" /* MessageDetail */]
        ]
    })
], MessageDetailModule);

//# sourceMappingURL=detail.module.js.map

/***/ }),

/***/ 312:
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
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
  Generated class for the Message provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MessageService = (function () {
    function MessageService(http, setting) {
        this.http = http;
        this.setting = setting;
        this.messageUrl = this.setting.apihost + '/homepage';
        this.detailUrl = this.setting.apihost + '/homeMsgContent';
        //console.log('Hello Message Provider');
    }
    MessageService.prototype.getMessageList = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        //params.set('callback', 'JSONP_CALLBACK');
        params.set('Parmeters', '{"InputData":[{"APIName":"homepage","Parameters":[{"imei":"12365478912345","userId":"1367197261"}]}]}');
        return this.http.get(this.messageUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data.filter(function (item) { return item.modType === 'Info'; })[0].msgData || []; })
            .catch(this.handleError);
    };
    MessageService.prototype.getMessageContent = function (msgId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        //params.set('callback', 'JSONP_CALLBACK');
        params.set('Parmeters', '{"InputData":[{"APIName":"homeMsgContent","Parameters":[{"msgId":"' + msgId + '","imei":"966cd7fc994ebbce6c29ea61b651cb6e59aa7e872381bf88ee309e4824dc465a","userId":""}]}]}');
        return this.http.get(this.detailUrl, { search: params })
            .map(function (res) { return res.json().OutputData.msgCon || ''; })
            .catch(this.handleError);
    };
    MessageService.prototype.handleError = function (error) {
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
    return MessageService;
}());
MessageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_5__app_app_setting__["a" /* Setting */]])
], MessageService);

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_message__ = __webpack_require__(312);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageDetail; });
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
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MessageDetail = (function () {
    function MessageDetail(navCtrl, navParams, msgService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.msgService = msgService;
        this.loadingCtrl = loadingCtrl;
        this.msg = this.navParams.get('msg');
    }
    MessageDetail.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.msg.msgCon) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.msgService.getMessageContent(this.msg.msgId).subscribe(function (msg) { return _this.msg.msgCon = msg; }, function (err) { return _this.errMsg = err; }, function () { loading_1.dismiss(); });
        }
    };
    return MessageDetail;
}());
MessageDetail = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-detail',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/message/detail/detail.html"*/'<!--\n  Generated template for the Detail page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{msg.msgTit}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="white-space: pre-line">\n  {{msg.msgCon}}\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/message/detail/detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_message__["a" /* MessageService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_message__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */]])
], MessageDetail);

//# sourceMappingURL=detail.js.map

/***/ })

});
//# sourceMappingURL=14.main.js.map