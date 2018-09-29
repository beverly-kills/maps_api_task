// 'use strict';

// (function (){
//     var map = document.getElementById('map')[0],
//         opt = {
//             zoom: 15,
//             center: {lat: 51.497741, lng: 31.287448}
//         };
    
//     function initMap() {
//        var myMap = new google.maps.Map(map, opt);
//     }
// })();

'use strict';

(function($) {
    var elemMap = $('.map')[0];

    var che = {lat: 51.4983713, lng: 31.2891455};
    var mymap = new google.maps.Map(elemMap, {
        zoom: 9,
        center: che
    });

    var marker = new google.maps.Marker({position: che, map: mymap});

    var geocoder = new google.maps.Geocoder();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(mymap);
    directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );


    $('.routeBtn').on('click', function() {
        var startPointAddr = $('.start').value,
            finishPointAddr = $('.finish').value,
            startPointGeo,
            finishPointGeo;


        geocoder.geocode({address: startPointAddr}, function (results, status) {
            if (status == 'OK' && results.length > 0) {
                startPointGeo = results[0].formatted_address;

                geocoder.geocode({address: finishPointAddr}, function (results, status) {
                    if (status == 'OK' && results.length > 0) {
                        finishPointGeo = results[0].formatted_address;

                        var request = {
                            origin: startPointGeo,
                            destination: finishPointGeo,
                            travelMode: google.maps.TravelMode.DRIVING,
                            unitSystem: google.maps.UnitSystem.METRIC
                           };
                           
                        directionsService.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result);
                            }
                        });
                    }else{
                        alert('Адрес финиша не найден');
                    }
                });
            }else{
                alert('Адрес старта не найден');
            }
        });
    });
})(jQuery);