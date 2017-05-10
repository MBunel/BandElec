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

var pattern = new L.Pattern({width:50});

var shape = new L.PatternRect({width:25, color:'red',stroke:false, fill: true}),
    shape2 = new L.PatternRect({x:25, width:15, color:'blue',stroke:false, fill: true}),
    shape3 = new L.PatternRect({x:40, width:10,  color:'green',stroke:false, fill: true});

pattern.addShape(shape);
pattern.addShape(shape2);
pattern.addShape(shape3);

pattern.addTo(map);


function style(feature) {
    return {
	fillPattern: pattern,
	fillOpacity: 0.8,
	stroke: false
    };
}

var custonLayer = L.geoJson(null, {style: style});

var Dept = omnivore.kml('dep.kml', null, custonLayer);

custonLayer.addTo(map);
