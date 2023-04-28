

function mapInit(lon,lat,zoom) {
    // console.log(lon,lat,zoom);
    let map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoom
        })
    });

    // const center = map.getView().getCenter();
    // const pinnedLocation = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
    // const feature = new ol.Feature(new ol.geom.Point(center));
    // const pinLayer = new ol.layer.Vector ({
    //   source: new ol.source.Vector ({
    //     features: [feature]
    //   }),
    //   style: new ol.style.Style ({
    //     image: new ol.style.Icon({
    //       src: 'http://openlayers.org/en/v3.8.2/examples/data/icon.png'
    //     })
    //   })
    // });
    // map.addLayer (pinLayer);


}