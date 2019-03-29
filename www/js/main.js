var markers = [];
var frame_num = 0;
var socket = io();

function main() {
    var key;
    jQuery.ajax({
        url:"http://localhost:8181/key.txt",
        success: function (result) {
            key = result;
        },
        async: false
    });
    $.getScript("https://maps.googleapis.com/maps/api/js?key="+ key +"&callback=myMap");
    socket.on('image', function(msg){
        document.getElementById('img_seq_frame').setAttribute("src","data:image/bmp;base64," + msg.buffer);
        console.log("Got image");
        frame_num = msg.frame;
        document.getElementById('frame_num').innerHTML = "Frame Number: " + frame_num;

    });
}

function get_next_img(){
    socket.emit('next_image', {'web_frame_num':frame_num});
}
function get_prev_image(){
    socket.emit('prev_image', {'web_frame_num':frame_num});
}

$(document).ready(main);

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
function placeMarker(map, location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    makers.push(marker);
    //location.lat() location.lng()
}
document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowLeft":
            get_prev_image();
            break;
        case "ArrowUp":
            // alert('up');
            break;
        case "ArrowRight":
            get_next_img()
            break;
        case "ArrowDown":
            // alert('down');
            break;
    }
};
