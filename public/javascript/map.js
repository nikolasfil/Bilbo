

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
                        scale: 2,
                        // add event lister tho

                    })
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoom
        })
    });

    map.layers = map.getLayers();

    map.layers.getArray()[1].getSource().getFeatures()[0]
    // .getStyle().addEventListener('click', function () {
    //     console.log('clicked');
    // }
    // );

    // let m = map.layers.getArray()[1].getSource().getFeatures()[0].getStyle().getImage().on('click', function () {
    //     console.log('clicked');
    // }
    // );
    
}


// access the image of the second layer in mapInit.map

