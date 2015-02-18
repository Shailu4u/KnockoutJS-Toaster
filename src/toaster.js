//creating custom element component in KnockoutJS 3.2
(function () {
    "use strict";

    /*
     * KnockoutJS Toaster
     * Version: 0.1.0
     *
     * Copyright 2015 Shailendra Kumar.
     * All Rights Reserved.
     * Use, reproduction, distribution, and modification of this code is subject to the terms and
     * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
     *
     * Author: Shailendra Kumar
     */

    //List of constants/defaults used
    var defaultToastClasses = {/*default classes used for different toast types*/
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            wait: 'toast-wait',
            success: 'toast-success',
            warning: 'toast-warning',
            note: 'toast-note'
        },
        classes: {
            'icon': 'toast-info',
            'title': 'toast-title',
            'msg': 'toast-message'
        }
    };
    var toastConfig = {
        'limit': 10, // limits max number of toasts displayed.
        'showClose': true, // show / hide close button.
        'clickToClose': false, // enable disable click to close.
        'pushTo': 'top', // position where new toasties are pushed to, top or bottom.
        'timeout': 3000, // how long to show the toast for in ms, set to 0 for indefinite.
        'position': 'top-right'
    };

    //Toast component View Model is component View Model which contains params passed from custom element view
    var ToastViewModel = function (params) {
        var self = this;
        self.toasts = params.toasts; // ko.observableArray([params.toasts]);
        toastConfig.showClose = params.showClose;
        toastConfig.limit = params.limit || toastConfig.limit;
        toastConfig.clickToClose = params.clickToClose;
        toastConfig.pushTo = params.pushTo || toastConfig.pushTo;
        toastConfig.timeout = params.timeout || toastConfig.timeout;
        toastConfig.position = params.position || toastConfig.position;
        self.config = toastConfig;

        //animation effects  afterRender, afterAdd methods are not working in component view model as of version 3.2
    };

    //creating custom element for toast using components register of Knockout 3.2
    ko.components.register("toast-container", {
        viewModel: ToastViewModel,
        template: '<div id="toast-container" data-bind="css:config.position">' +
            '<!-- ko  foreach: {data: toasts} -->' +
            '<div class="toast toastKO" data-bind="css: type, fadeVisible: true, timeOut: timeout">' +
            '<button class="toast-close-button" data-bind="visible: showClose">&times;</button>' +
            '<!-- ko if: $data.hasOwnProperty("img") --> <div class="toast-image"><img data-bind="attr: { src: img }"/></div><!-- /ko -->' +
            '<div class="toast-text">' +
            '<!-- ko if: $data.hasOwnProperty("title") --> <span data-bind="text: title" class="toast-title"></span> <!-- /ko -->' +
            '<span data-bind="text:msg" class="toast-message"></span>' +
            '</div>' +
            '</div>' +
            '<!-- /ko -->' +
            '</div>'
    });
    //Knockout Binding Handlers used to remove toasts after timeout, to stop timer on mouseover and restart timer on mouseout
    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // Initially transition for toast
            window.setTimeout(function(){
                element.classList.add("ng-enter");
            },200);
        }
    };
    ko.bindingHandlers.timeOut = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var val = ko.unwrap(valueAccessor());
            //remove toasts after timeout with transistion
            if (val > 0) {
                var set =  window.setTimeout(function () {
                    element.classList.remove("ng-enter");
                    element.classList.add("ng-leave");
                    window.setTimeout(function(){/*Remove toast from toasts array after css animation completes*/
                        bindingContext.$parent.toasts.remove(bindingContext.$data);
                    },550);
                }, val);
                //On mouseOver stop timer
                element.addEventListener("mouseover", function () {
                    window.clearTimeout(set);
                });
                //On mouseOut restart timer
                element.addEventListener("mouseout", function () {
                    set = window.setTimeout(function () {
                        element.classList.remove("ng-enter");
                        element.classList.add("ng-leave");
                        window.setTimeout(function(){/*Remove toast from toasts array after css animation completes*/
                            bindingContext.$parent.toasts.remove(bindingContext.$data);
                        },550);/*550ms is set in css animation*/
                    }, val);
                });
            }
        }
    };

    // All toast functionality goes in this Toast ViewModel
    var toastFun = function() {
        var self = this, id = 0;
        self.toasts = ko.observableArray(); // an array consists of all toasts

        // Note toast
        self.note = function (data) {
            data.type = defaultToastClasses.iconClasses.note;
            addtoast(data);
        };
        // Info toast
        self.info = function (data) {
            data.type = defaultToastClasses.iconClasses.info;
            addtoast(data);
        };
        // Success toast
        self.success = function (data) {
            data.type = defaultToastClasses.iconClasses.success;
            addtoast(data);
        };
        // Warning toast
        self.warning = function (data) {
            data.type = defaultToastClasses.iconClasses.warning;
            addtoast(data);
        };
        //Wait toast
        self.wait = function (data) {
            data.type = defaultToastClasses.iconClasses.wait;
            addtoast(data);
        };
        // Error toast
        self.error = function (data) {
            data.type = defaultToastClasses.iconClasses.error;
            addtoast(data);
        };
        // clear or remove all toasts
        self.clear = function () {
            var toastsN = document.querySelectorAll("#toast-container .toast");
            for(var i = 0 ;i < toastsN.length; i++) {
               toastsN[i].classList.remove("ng-enter");
               toastsN[i].classList.add("ng-leave");
            }
            window.setTimeout(function(){/*Remove all toasts from toasts array after css animation completes*/
                self.toasts.removeAll();
            },550);
        };
        self.setType = function (type) {
            this.type = defaultToastClasses.iconClasses.type;
        };

        //add toast to toasts array
        var addtoast = function (toast) {
            toast = extend(toastConfig, toast);
            id++;
            toast = extend(toast, { id: id});

            if (toast['pushTo'] === 'top') {
                self.toasts.unshift(toast);
                if (toast['limit'] > 0 && self.toasts.length > toast['limit']) {
                    self.toasts.pop();
                }
            } else {
                self.toasts.push(toast);
                if (toast['limit'] > 0 && self.toasts.length > toast['limit']) {
                    self.toasts.shift();
                }
            }
            if (typeof toast.onAdd === 'object') {
                if (toast.waittimeout) {
                    window.setTimeout(function () {
                        var index = self.toasts.indexOf(toast);
                        toast.onAdd.type = 'toast-' + toast.onAdd.type;
                        toast = extend(extend(toastConfig, toast), toast.onAdd);
                        self.toasts.splice(index, 1);
                        self.toasts.splice(index, 0, toast);
                    }, toast.waittimeout);
                }
            }
        };
        //remove toast
        var removetoast = function (toast) {
            self.toasts.remove(toast);
        };

        //Event Handling
        document.querySelector("toast-container").addEventListener('click', function(event) {
            //remove toast on close button click
            if(event.srcElement.className == 'toast-close-button') {
                var data = ko.dataFor(event.target);
                event.target.parentNode.classList.remove("ng-enter");
                event.target.parentNode.classList.add("ng-leave");
                window.setTimeout(function(){/*Remove toast from toasts array after css animation completes*/
                    removetoast(data);
                },550);
                event.stopPropagation();
            }
            else {
                var context = ko.contextFor(event.target);
                //Tap Click to remove toast if clickToClose is true
                if (context.$data.clickToClose) {
                    event.target.parentNode.classList.remove("ng-enter");
                    event.target.parentNode.classList.add("ng-leave");
                    window.setTimeout(function(){
                        removetoast(context.$data);
                    },550);
                    event.stopPropagation();
                    return true;
                }
                //tap or click to change data
                if (typeof context.$data.onClick === 'object') {
                    var index = context.$index();
                    context.$data = extend( extend(toastConfig, context.$data) , context.$data.onClick);
                    self.toasts.splice(index, 1);
                    self.toasts.splice(index, 0, context.$data);
                    event.stopPropagation();
                }
            }
        }, true);

        var extend = function ( defaults, options ) {
            var extended = {};
            var prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        };
    }

    window.toaster = new toastFun(); // global object for toaster

})();
