var mapObj, geolocation;
var result;
mui.plusReady(function() {
	
	showCityInfo();
})

function showCityInfo() { //IP定位
	 var citysearch = new AMap.CitySearch();
	citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    document.getElementById('city').innerHTML = cityinfo;
                }
            } else {
                document.getElementById('city').innerHTML = result.info;
            }
        });
}