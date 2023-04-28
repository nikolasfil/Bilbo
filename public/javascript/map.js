// // ------------------  Map ------------------
// mapInit();

// function mapInit() {
//     map = new OpenLayers.Map("basicMap");
//     let mapnik = new OpenLayers.Layer.OSM();
//     let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
//     let toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
//     // 38.2903577,21.7911003
//     let position = new OpenLayers.LonLat(13.41, 52.52).transform(fromProjection, toProjection);
//     // bounding box 
//     // let position       = new OpenLayers.LonLat(38.2903577,21.7911003).transform( fromProjection, toProjection);
//     let zoom = 5;

//     map.addLayer(mapnik);
//     map.setCenter(position, zoom);
// }

import 'style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});