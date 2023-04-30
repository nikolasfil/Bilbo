

// 
function mapInit(lon, lat, zoom) {
    // console.log(lon,lat,zoom);


    const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
        name: 'Patras',
    });

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [iconFeature]
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 40],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                        src: 'img/geo-alt-fill.svg',
                        scale: 2
                    })
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoom
        })
    });


    // const iconFeature = new ol.Feature({
    //     geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    //     name: 'Null Island',
    // });

    // let map = new ol.Map({
    //     target: 'map',
    //     layers: [
    //         new ol.layer.Tile({
    //             source: new ol.source.OSM()
    //         })
    //     ],
    //     view: new ol.View({
    //         center: ol.proj.fromLonLat([lon, lat]),
    //         zoom: zoom
    //     })
    // });

    // const center = map.getView().getCenter();
    // const pinnedLocation = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
    // const feature = new ol.Feature(new ol.geom.Point(center));
    // const pinLayer = new ol.layer.Vector({
    //     source: new ol.source.Vector({
    //         features: [feature]
    //     }),
    //     style: new ol.style.Style({
    //         image: new ol.style.Icon({
    //             // src: 'http://openlayers.org/en/v3.8.2/examples/data/icon.png'
    //             src: 'images/pin'
    //         })
    //     })
    // });
    // map.addLayer(pinLayer);


}