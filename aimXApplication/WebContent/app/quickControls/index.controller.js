(function () {
    'use strict';
    angular
        .module('app')
        .controller('Nav.IndexController', Controller);

    function Controller(UserService) {

		var vm = this;

        vm.user = null;

        initController();
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }
    if (navigator.geolocation) { console.log('Geolocation is supported!');}
    else { console.log('Geolocation is not supported for this Browser/OS version yet.'); }
    window.onload = function() {
        var startPos;
            navigator.geolocation.getCurrentPosition(function(position) {
                startPos = position;
                document.getElementById('startLat').innerHTML = startPos.coords.latitude;
                document.getElementById('startLon').innerHTML = startPos.coords.longitude;
            });
    };
})();
