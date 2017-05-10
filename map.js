"use strict";

const defaultVue = {
    coords: [43.7, 7.25],
    zoom: 11
};

// Map creation
var map = L.map('mapid')
    .setView(defaultVue.coords, defaultVue.zoom);

// TileLayer definition
var TileLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
}).addTo(map);


var patterns = {};
function getpattern(id, a, b, w) {

    var vtot = a + b,
	la = (a * w) / vtot,
	lb = (b * w) /vtot;

    patterns["pattern_"+ id] = new L.Pattern({width:w});

    var as = Number(a);

    var shape = new L.PatternRect({width:la, color:'orange',stroke:false, fill: true}),
	shape2 = new L.PatternRect({x:la, width:lb, color:'blue',stroke:false, fill: true});


    patterns["pattern_" + id].addShape(shape);
    patterns["pattern_" + id].addShape(shape2);

    patterns["pattern_" + id].addTo(map);

    return patterns["pattern_" + id];

}

function style(feature) {
    return {
	fillPattern: getpattern(
	    feature.properties[0],
	    Number(feature.properties.RES_DEP_MACRON),
	    Number(feature.properties.RES_DEP_LEPEN),
	    25
	),
	fillOpacity: 1,
	stroke: false,
	color: 'white',
	weight: 0.5
    };
}

var Dept = L.geoJson(null, {style: style});
omnivore.kml('data/dep.kml', null, Dept);
Dept.addTo(map);

var ElecMaps = {
    "Départements": Dept
};


L.control.layers(ElecMaps).addTo(map);
