webpackJsonp([15],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pickArtist__ = __webpack_require__(323);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickArtistModule", function() { return PickArtistModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PickArtistModule = (function () {
    function PickArtistModule() {
    }
    return PickArtistModule;
}());
PickArtistModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pickArtist__["a" /* PickArtist */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pickArtist__["a" /* PickArtist */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__pickArtist__["a" /* PickArtist */]
        ]
    })
], PickArtistModule);

//# sourceMappingURL=pickArtist.module.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_artist__ = __webpack_require__(348);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickArtist; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PickArtist = (function () {
    function PickArtist(viewCtrl, params, artistService) {
        this.viewCtrl = viewCtrl;
        this.artistService = artistService;
        if (params.get('artist')) {
            this.artist = params.get('artist');
            this.artistName = this.artist.name;
        }
        else {
            this.artistName = '';
        }
        this.artistList = [];
    }
    PickArtist.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.artistService.getArtistList().subscribe(function (data) {
            _this.artistList = data;
        });
    };
    PickArtist.prototype.onInput = function () {
        var _this = this;
        this.artistService.getArtistList(this.artistName).subscribe(function (data) {
            _this.artistList = data;
        });
    };
    PickArtist.prototype.confirmArtist = function (artist) {
        this.viewCtrl.dismiss({ artist: artist });
    };
    PickArtist.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return PickArtist;
}());
PickArtist = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'pick-artist',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/home/modals/pickArtist/pickArtist.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      选择艺术家\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button clear (click)="dismiss()">\n        取消\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]="artistName" type="text" [showCancelButton]="shouldShowCancel" animated="true" (ionInput)="onInput($event)" placeholder="谁的作品？"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let artist of artistList" (click)="confirmArtist(artist)">{{artist.name}}\n      <ion-note item-right>\n        {{artist.description}}\n      </ion-note>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/home/modals/pickArtist/pickArtist.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_artist__["a" /* ArtistService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_artist__["a" /* ArtistService */]])
], PickArtist);

//# sourceMappingURL=pickArtist.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_setting__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistService; });
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
  Generated class for the Artist provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ArtistService = (function () {
    function ArtistService(http, setting) {
        this.http = http;
        this.setting = setting;
        this.artistUrl = this.setting.apihost + '/artist';
    }
    ArtistService.prototype.getArtistList = function (name) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
        //params.set('callback', 'JSONP_CALLBACK');
        params.set('Parmeters', '');
        return this.http.get(this.artistUrl, { search: params })
            .map(function (res) { return res.json().OutputData.Data || []; })
            .catch(this.handleError);
    };
    ArtistService.prototype.handleError = function (error) {
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
    return ArtistService;
}());
ArtistService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_4__app_app_setting__["a" /* Setting */]])
], ArtistService);

//# sourceMappingURL=artist.js.map

/***/ })

});
//# sourceMappingURL=15.main.js.map