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
<<<<<<< HEAD:aimXApplication/WebContent/app/quickControls/index.controller.js
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
=======
})();


>>>>>>> e82bdf1738e072389a5e40d64aeead85dc406b27:aimXApplication/WebContent/app/quickControls/js/index.controller.js
