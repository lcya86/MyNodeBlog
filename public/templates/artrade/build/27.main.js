webpackJsonp([27],{

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pickType__ = __webpack_require__(325);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickTypeModule", function() { return PickTypeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PickTypeModule = (function () {
    function PickTypeModule() {
    }
    return PickTypeModule;
}());
PickTypeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pickType__["a" /* PickType */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pickType__["a" /* PickType */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__pickType__["a" /* PickType */]
        ]
    })
], PickTypeModule);

//# sourceMappingURL=pickType.module.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickType; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PickType = (function () {
    function PickType(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.types = [
            {
                name: '中国书画',
                selected: false,
                children: [
                    {
                        name: '山水',
                        selected: false
                    },
                    {
                        name: '花鸟',
                        selected: false
                    },
                    {
                        name: '人物',
                        selected: false
                    },
                    {
                        name: '画瓷',
                        selected: false
                    }
                ]
            },
            {
                name: '书法篆刻',
                selected: false,
                children: [{
                        name: '楷书',
                        selected: false
                    }, {
                        name: '行书',
                        selected: false
                    }, {
                        name: '隶书',
                        selected: false
                    }, {
                        name: '篆书',
                        selected: false
                    }, {
                        name: '草书',
                        selected: false
                    }, {
                        name: '篆刻',
                        selected: false
                    }, {
                        name: '匾额',
                        selected: false
                    }, {
                        name: '古籍文献',
                        selected: false
                    }]
            },
            {
                name: '西画雕塑',
                selected: false,
                children: [{
                        name: '油画',
                        selected: false
                    }, {
                        name: '雕塑',
                        selected: false
                    }, {
                        name: '版画',
                        selected: false
                    }, {
                        name: '水彩色粉',
                        selected: false
                    }, {
                        name: '影像',
                        selected: false
                    }, {
                        name: '其它',
                        selected: false
                    }]
            },
            {
                name: '古瓷杂项',
                selected: false,
                children: [{
                        name: '青花',
                        selected: false
                    }, {
                        name: '彩瓷',
                        selected: false
                    }, {
                        name: '色釉瓷',
                        selected: false
                    }, {
                        name: '外销瓷',
                        selected: false
                    }, {
                        name: '文玩杂项',
                        selected: false
                    }, {
                        name: '玉器',
                        selected: false
                    }, {
                        name: '金属器',
                        selected: false
                    }]
            },
            {
                name: '当代工艺',
                selected: false,
                children: [{
                        name: '竹木牙角',
                        selected: false
                    }, {
                        name: '玉器',
                        selected: false
                    }, {
                        name: '翡翠',
                        selected: false
                    }, {
                        name: '珠宝',
                        selected: false
                    }, {
                        name: '当代陶瓷',
                        selected: false
                    }, {
                        name: '紫砂',
                        selected: false
                    }, {
                        name: '名石',
                        selected: false
                    }, {
                        name: '玛瑙',
                        selected: false,
                    }, {
                        name: '琥珀蜜蜡',
                        selected: false
                    }, {
                        name: '沉香檀香',
                        selected: false
                    }, {
                        name: '金属器',
                        selected: false
                    }, {
                        name: '海外艺术品',
                        selected: false
                    }, {
                        name: '珊瑚',
                        selected: false
                    }, {
                        name: '其它',
                        selected: false
                    }]
            }
        ];
    }
    PickType.prototype.ngAfterViewInit = function () {
    };
    PickType.prototype.setChildren = function (type) {
        if (type.selected) {
            type.children.forEach(function (item, index, list) {
                item.selected = true;
            });
        }
        else {
            type.children.forEach(function (item, index, list) {
                item.selected = false;
            });
        }
    };
    PickType.prototype.reset = function () {
        this.types.forEach(function (item, index, list) {
            item.selected = false;
            item.children.forEach(function (item, index, list) {
                item.selected = false;
            });
        });
    };
    PickType.prototype.confirm = function () {
        this.viewCtrl.dismiss({ types: this.types });
    };
    PickType.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return PickType;
}());
PickType = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'pick-type',template:/*ion-inline-start:"/Users/apple/ionic project/artrade/src/pages/home/modals/pickType/pickType.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button clear (click)="dismiss()">\n        取消\n      </button>\n    </ion-buttons>\n    <ion-title>\n      选择类型\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button clear (click)="reset()">\n        清除\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list *ngFor="let type of types">\n    <ion-item>\n      <ion-label>{{type.name}}</ion-label>\n      <ion-checkbox (ionChange)="setChildren(type)" [(ngModel)]="type.selected"></ion-checkbox>\n    </ion-item>\n    <ion-list [hidden]="!type.selected" inset>\n      <ion-item *ngFor="let child of type.children">\n        <ion-label>{{child.name}}</ion-label>\n        <ion-checkbox [(ngModel)]="child.selected"></ion-checkbox>\n      </ion-item>\n    </ion-list>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <ion-row>\n      <ion-col col-1></ion-col>\n      <ion-col col-10>\n        <button ion-button color="dark" block (click)="confirm()">确定</button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/apple/ionic project/artrade/src/pages/home/modals/pickType/pickType.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], PickType);

//# sourceMappingURL=pickType.js.map

/***/ })

});
//# sourceMappingURL=27.main.js.map