// Import the necessary OpenLayers modules
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultInteractions } from 'ol/interaction';

// Create an OpenLayers map
const map = new Map({
    target: 'map', // Replace 'map' with your map container ID
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
    interactions: defaultInteractions({ pinchRotate: false }),
});

// Disable the default touch zoom interaction
map.getInteractions().forEach(function (interaction) {
    if (interaction instanceof ol.interaction.PinchZoom) {
        interaction.setActive(false);
    }
});

// Enable two-finger touch panning
map.getInteractions().forEach(function (interaction) {
    if (interaction instanceof ol.interaction.DragPan) {
        interaction.setCondition(function (evt) {
            return evt.originalEvent.touches.length === 2;
        });
    }
});
