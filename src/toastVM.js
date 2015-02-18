(function() {
    //this is toast page view model  used to supply toasts data to toast-container custom element
    //$(function(){
        var toast = function () {
            var self = this;

            self.displaySuccess = function () {
                // Success message toast
                toaster.success({
                    title: "Success!",
                    msg: 'Click to change me.',
                    timeout: 0,
                    showClose: false,
                    onClick:  {
                        title : 'Well done!',
                        msg : 'Closing in 5 seconds.',
                        timeout : 5000
                    }
                });
            };

            self.displayError = function () {
                // Error message toast
                toaster.error({
                    title: 'Error!',
                    msg: 'Click the remove icon to close toast',
                    timeout: 0,
                    showClose: true,
                    clickToClose: false
                });
            };

            self.displayWarning = function () {
                // Warning message toast
                toaster.warning({
                    title: 'Warning!',
                    msg: 'Click to close me.',
                    showClose: false,
                    clickToClose: true,
                    timeout: 0
                });
            };

            self.displayInfo = function () {
                // Info message toast
                toaster.info({
                    title: 'Info',
                    msg: 'I\'ll display content.',
                    timeout: 0,
                    pushTo: 'bottom',
                    showClose: false,
                    clickToClose: false
                });
            };

            self.displayLongToasts = function () {
                /* Long Toast (timout 25sec)*/
                toaster.note({
                    msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                    timeout: 25000,
                    clickToClose: true
                });

                /* Long Toast (timout 25sec) with title */
                toaster.note({
                    title: 'Lorem ipsum dolor sit amet',
                    msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                    timeout: 25000,
                    clickToClose: true
                });

                /* Long Toast (timout 25sec) with image */
                toaster.note({
                    img: 'css/username.png',
                    msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                    timeout: 25000,
                    clickToClose: true
                });

                /* Long Toast (timout 25sec) with image and title */
                toaster.note({
                    img: 'css/username.png',
                    title: 'Click to close',
                    msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                    timeout: 25000,
                    clickToClose: true
                });
            };

            self.displayStandardToasts = function () {

                /* Standard Toast (timout 7sec)*/
                toaster.note({
                    msg: 'Hello World Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
                    timeout: 3000,
                    clickToClose: true
                });

                /* Standard Toast (timout 7sec) with title */
                toaster.note({
                    title:'sachin Lorem ipsum dolor sit amet',
                    msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
                    timeout: 7000
                });

                /* Standard Toast (timout 4sec) with image */
                toaster.note({
                    img:'css/username.png',
                    msg: ' Dhoni Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
                    timeout: 4000
                });

                /* Standard Toast (timout 5sec) with image and title */
                toaster.note({
                    img: 'css/username.png',
                    title: 'Lorem ipsum dolor sit amet',
                    msg: 'Raina Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
                    timeout: 5000
                });
            };

            self.displayLoading = function () {
                // Loading
                toaster.wait({
                    title: 'Please Wait',
                    msg: 'I\'ll change after 5 seconds.',
                    timeout: 0,
                    waittimeout: 5000,
                    clickToClose: false,
                    showClose: false,
                    onAdd: {
                        title: 'Success',
                        msg:'Loading finished!',
                        type:'success',
                        showClose : true
                    }
                });
            };

            // Remove all toasts
            self.clear = function () {
                toaster.clear();
            };
        }

        //apply bindings to page view model
        ko.applyBindings(new toast());
   // });

    
})();