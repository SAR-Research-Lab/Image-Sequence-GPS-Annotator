function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(42.319655, -83.232128),
        zoom:18,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(map, event.latLng);
    });
    map.setTilt(0);
}
var maker_locations = [];

function placeMarker(map, location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    maker_locations.push(location);


        //location.lat() location.lng()
}
var key;
jQuery.ajax({
    url:"http://localhost:8181/key.txt",
    success: function (result) {
        key = result;
    },
    async: false
});
$.getScript("https://maps.googleapis.com/maps/api/js?key="+ key +"&callback=myMap");