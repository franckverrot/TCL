function compose(func1, func2) {
  return function() {
    return func1(func2.apply(null, arguments));
  };
}

function makePostWithGMaps(obj) {
  return makePost(obj, google.maps.LatLng);
}

function makePost(obj, coordinateMaker) {
  return {
    title: obj.poi_id + ' - ' + obj.name,
    coordinates: new coordinateMaker(obj.lat, obj.lng),
    type: obj.type
  };
}

function filterDistanceFrom(latlngCenter) {
  return function(distance) {
    return function(latlngPoint) {
      return google.maps.geometry.spherical.computeDistanceBetween(latlngPoint.coordinates, latlngCenter.coordinates) < distance;
    }
  };
}

function getKeyByValue(obj, value) {
  for( var prop in obj ) {
    if( obj.hasOwnProperty( prop ) ) {
      if( obj[ prop ] === value )
        return prop;
    }
  }
  return obj[0];
}

function getIcon(id) {
  return {
    path: getKeyByValue(google.maps.SymbolPath, id),
    scale: 10
  };
}

function makeMarkers(map) {
  return function (point) {
    return new google.maps.Marker({
      position: point.coordinates,
      map: map,
      title: point.title,
      point: point,
      icon: { url: 'http://www.velov.grandlyon.com/velovmap/img/iconVelov4.png' }
   });
  };
};

function filterPOI(poi_id) {
  return function(point) {
    return point.type == poi_id;
  }
}

function getMarkers(center, map) {
  return points
    .map(makePostWithGMaps)
    .filter(filterDistanceFrom(center)(10000))
    .filter(filterPOI(8))
    .map(makeMarkers(map));
}

function initialize() {
  var saintPriestLocation    = makePostWithGMaps({lat:45.6972, lng: 4.9447});
  var placeBellecourLocation = makePostWithGMaps({lat: 45.7575, lng: 4.8322});
  var partDieuLocation       = makePostWithGMaps({lat: 45.7598829, lng: 4.85640360});
  var center                 = partDieuLocation;

  var mapOptions             = { zoom: 14, center: center.coordinates };
  var map                    = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  markers                = getMarkers(center, map);

  markers.filter(function(m) {
    return m.point.type == 8;
  }).forEach(function(m) {
 //   m.setAnimation(google.maps.Animation.BOUNCE)
  });

  //var markerCluster          = new MarkerClusterer(map, markers);
}

if (typeof exports !== 'undefined') {
  exports.makePost = makePost;
  exports.compose = compose;
}
