webpackJsonp([9],{

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addAdrs__ = __webpack_require__(336);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAdrsPageModule", function() { return AddAdrsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddAdrsPageModule = (function () {
    function AddAdrsPageModule() {
    }
    return AddAdrsPageModule;
}());
AddAdrsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__addAdrs__["a" /* AddAdrsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__addAdrs__["a" /* AddAdrsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__addAdrs__["a" /* AddAdrsPage */]
        ]
    })
], AddAdrsPageModule);

//# sourceMappingURL=addAdrs.module.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_device__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_setting__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressService; });
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
var AddressService = (function () {
    function AddressService(http, setting, device) {
        this.http = http;
        this.setting = setting;
        this.device = device;
        this.addressListUrl = this.setting.apiTestHost + '/artradeApp/buyer/queryharvestaddr.action';
        this.addAddressUrl = this.setting.apiTestHost + '/artradeApp/buyer/doaddorupdateaddr.action';
        this.modifyAddressUrl = this.setting.apiTestHost + '/artradeApp/buyer/doaddorupdateaddr.action';
        this.delAddressUrl = this.setting.apiTestHost + '/artradeApp/buyer/dodeleteaddr.action';
        this.setDefaultAddressUrl = this.setting.apiTestHost + '/artradeApp/buyer/dodefauladdr.action';
        this.getProvsUrl = this.setting.apiTestHost + '/artrade/common/region/getprovs.action';
        this.getCitiesUrl = this.setting.apiTestHost + '/artrade/common/region/getcities.action';
    }
    AddressService.prototype.getProvs = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.getProvsUrl, options)
            .map(function (res) {
            var response = res.json();
            if (response.result) {
                return response.data;
            }
            return null;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.getCities = function (prvncid) {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('prvncid', prvncid + '');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.getCitiesUrl, options)
            .map(function (res) {
            var response = res.json();
            if (response.result) {
                return response.data;
            }
            return null;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.getAddressList = function (memberId) {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.addressListUrl, options)
            .map(function (res) {
            var response = res.json();
            if (response.result) {
                return response.data;
            }
            return null;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.addAddress = function (memberId, address) {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId);
        params.set('cneeName', address.cneeName);
        params.set('cneePhone', address.cneePhone + '');
        params.set('prvncId', address.prvncId + '');
        params.set('prvncName', address.prvncName);
        params.set('cityId', address.cityId + '');
        params.set('cityName', address.cityName);
        params.set('cneeAddr', address.cneeAddr);
        params.set('addrDflt', address.addrDflt);
        params.set('postCode', address.postCode);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.addAddressUrl, options)
            .map(function (res) {
            var response = res.json();
            return response.result;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.modifyAddress = function (memberId, address) {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId);
        params.set('addrId', address.addrId + '');
        params.set('cneeName', address.cneeName);
        params.set('cneePhone', address.cneePhone + '');
        params.set('prvncId', address.prvncId + '');
        params.set('prvncName', address.prvncName);
        params.set('cityId', address.cityId + '');
        params.set('cityName', address.cityName);
        params.set('cneeAddr', address.cneeAddr);
        params.set('addrDflt', address.addrDflt);
        params.set('postCode', address.postCode);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.modifyAddressUrl, options)
            .map(function (res) {
            var response = res.json();
            return response.result;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.delAddress = function (memberId, addrId) {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId);
        params.set('id', addrId + '');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.delAddressUrl, options)
            .map(function (res) {
            var response = res.json();
            return response.result;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.setDefaultAddress = function (memberId, addrId) {
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('imei', this.device.uuid || '0');
        params.set('memberId', memberId);
        params.set('addrId', addrId + '');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Headers */]()
        });
        return this.http.get(this.setDefaultAddressUrl, options)
            .map(function (res) {
            var response = res.json();
            return response.result;
        })
            .catch(this.handleError);
    };
    AddressService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return AddressService;
}());
AddressService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["g" /* Http */], __WEBPACK_IMPORTED_MODULE_6__app_app_setting__["a" /* Setting */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_device__["a" /* Device */]])
], AddressService);

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressInfo; });
var AddressInfo = (function () {
    function AddressInfo() {
    }
    return AddressInfo;
}());

//# sourceMappingURL=addressInfo.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_addressInfo__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_address__ = __webpack_require__(308);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAdrsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddAdrsPage = (function () {
    function AddAdrsPage(navCtrl, params, viewCtrl, as) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.as = as;
        if (params.get('address')) {
            this.title = '修改地址';
            this.address = params.get('address');
            if (this.address.addrDflt == 'N') {
                this.addrDflt = false;
            }
            else {
                this.addrDflt = true;
            }
        }
        else {
            this.title = '添加地址';
            this.address = new __WEBPACK_IMPORTED_MODULE_2__models_addressInfo__["a" /* AddressInfo */]();
            this.address.prvncId = 2;
            this.address.cityId = 378;
            this.addrDflt = false;
        }
    }
    AddAdrsPage.prototype.ngAfterViewInit = function () {
        this.getProvs();
    };
    AddAdrsPage.prototype.getProvs = function () {
        var _this = this;
        this.as.getProvs().subscribe(function (result) {
            _this.provsList = result;
            console.log(_this.address.prvncId);
            _this.address.prvncId = _this.provsList.filter(function (item, index, array) {
                return item.regionShortnameEn == _this.address.prvncId;
            })[0].id;
            _this.getCities();
        });
    };
    AddAdrsPage.prototype.getCities = function () {
        var _this = this;
        this.as.getCities(this.address.prvncId).subscribe(function (result) {
            _this.citiesList = result;
            _this.address.cityId = _this.citiesList.filter(function (item, index, array) {
                return item.regionShortnameEn == _this.address.cityId;
            })[0].id;
        });
    };
    AddAdrsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddAdrsPage.prototype.save = function () {
        var _this = this;
        this.address.prvncName = this.provsList.filter(function (item, index, array) {
            return item.id == _this.address.prvncId;
        })[0].regionName;
        this.address.cityName = this.citiesList.filter(function (item, index, array) {
            return item.id == _this.address.cityId;
        })[0].regionName;
        if (this.addrDflt) {
            this.address.addrDflt = 'Y';
        }
        else {
            this.address.addrDflt = 'N';
        }
        this.viewCtrl.dismiss(this.address);
    };
    return AddAdrsPage;
}());
AddAdrsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-addadres',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/information/address/modals/addAdrs/addAdrs.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button clear (click)="dismiss()">\n        取消\n      </button>\n    </ion-buttons>\n    <ion-title>\n      {{title}}\n    </ion-title>\n    <ion-buttons end>\n      <button [disabled]="!address.prvncId||!address.cityId||!address.cneeAddr||!address.postCode||!address.cneeName||!address.cneePhone" ion-button clear (click)="save()">\n        保存\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content class="cards-bg">\n  <ion-card>\n    <ion-list>\n      <ion-item>\n        <ion-label>所在地区</ion-label>\n        <ion-select required interface="popover" (ionChange)="getCities()" placeholder="省" cancelText="取消" okText="确定" [(ngModel)]="address.prvncId">\n          <ion-option *ngFor="let province of provsList" [value]="province.id">{{province.regionName}}</ion-option>\n        </ion-select>\n        <ion-select required interface="popover" placeholder="市" cancelText="取消" okText="确定" [(ngModel)]="address.cityId">\n          <ion-option *ngFor="let city of citiesList" [value]="city.id">{{city.regionName}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label color="primary" fixed>详细地址</ion-label>\n        <ion-input required type="text" [(ngModel)]="address.cneeAddr"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label color="primary" fixed>邮政编码</ion-label>\n        <ion-input required type="number" [(ngModel)]="address.postCode"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label color="primary" fixed>收货人姓名</ion-label>\n        <ion-input required type="text" [(ngModel)]="address.cneeName"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label color="primary" fixed>手机/电话</ion-label>\n        <ion-input required type="number" [(ngModel)]="address.cneePhone"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>设为默认收货地址</ion-label>\n        <ion-checkbox [(ngModel)]="addrDflt"></ion-checkbox>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/information/address/modals/addAdrs/addAdrs.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__service_address__["a" /* AddressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__service_address__["a" /* AddressService */]])
], AddAdrsPage);

//# sourceMappingURL=addAdrs.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map