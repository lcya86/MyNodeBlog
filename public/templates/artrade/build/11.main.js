webpackJsonp([11],{

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__address__ = __webpack_require__(335);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressPageModule", function() { return AddressPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddressPageModule = (function () {
    function AddressPageModule() {
    }
    return AddressPageModule;
}());
AddressPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__address__["a" /* AddressPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__address__["a" /* AddressPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__address__["a" /* AddressPage */]
        ]
    })
], AddressPageModule);

//# sourceMappingURL=address.module.js.map

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

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_address__ = __webpack_require__(308);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddressPage = (function () {
    function AddressPage(navCtrl, navParams, modCtrl, addressService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modCtrl = modCtrl;
        this.addressService = addressService;
        this.addressList = [];
        this.user = navParams.get('user');
    }
    AddressPage.prototype.ngAfterViewInit = function () {
        this.getAddressList();
    };
    AddressPage.prototype.getAddressList = function () {
        var _this = this;
        this.addressService.getAddressList(this.user.memberId).subscribe(function (addressList) {
            _this.addressList = addressList;
        });
    };
    AddressPage.prototype.addAddress = function () {
        var _this = this;
        var add = this.modCtrl.create('AddAdrsPage', { user: this.user });
        add.onDidDismiss(function (address) {
            console.log(address);
            if (address) {
                _this.addressService.addAddress(_this.user.memberId, address).subscribe(function (result) {
                    if (result) {
                        _this.getAddressList();
                    }
                });
            }
        });
        add.present();
    };
    AddressPage.prototype.delAddress = function (address) {
        var _this = this;
        this.addressService.delAddress(this.user.memberId, address.addrId).subscribe(function (result) {
            if (result) {
                var index = _this.addressList.indexOf(address);
                _this.addressList.splice(index, 1);
            }
        });
    };
    AddressPage.prototype.modifyAddress = function (oldAddress) {
        var _this = this;
        var modify = this.modCtrl.create('AddAdrsPage', { user: this.user, address: oldAddress });
        modify.onDidDismiss(function (address) {
            if (address) {
                _this.addressService.modifyAddress(_this.user.memberId, address).subscribe(function (result) {
                    if (result) {
                        oldAddress = address;
                    }
                });
            }
        });
        modify.present();
    };
    AddressPage.prototype.setDefaultAddress = function (address) {
        var _this = this;
        this.addressService.setDefaultAddress(this.user.memberId, address.addrId).subscribe(function (result) {
            if (result) {
                _this.addressList.forEach(function (item, index, array) {
                    item.addrDflt = "N";
                });
                address.addrDflt = "Y";
            }
        });
    };
    return AddressPage;
}());
AddressPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-address',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/user/information/address/address.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      收件地址\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button clear (click)="addAddress()">\n        添加\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item-sliding *ngFor="let address of addressList">\n      <ion-item (click)="modifyAddress(address)">\n        <h2>{{address.cneeName}}</h2>\n        <p>{{address.prvncName}}</p>\n        <p>{{address.cityName}}</p>\n        <p>{{address.cneeAddr}}</p>\n        <ion-badge *ngIf="address.addrDflt === \'Y\'" item-right>默认收货地址</ion-badge>\n      </ion-item>\n      <ion-item-options side="right">\n        <button ion-button color="danger" (click)="delAddress(address)">\n          删除地址\n        </button>\n        <button *ngIf="address.addrDflt !== \'Y\'" ion-button color="primary" (click)="setDefaultAddress(address)">\n          设为默认地址\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/user/information/address/address.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_address__["a" /* AddressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__service_address__["a" /* AddressService */]])
], AddressPage);

//# sourceMappingURL=address.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map