

// 
function mapInit(lon, lat, zoom) {
    // console.log(lon,lat,zoom);


    const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
        name: 'Patras',
    });

    // const iconFeature2 = new ol.Feature({
    //     geometry: new ol.geom.Point(ol.proj.fromLonLat([lon+0.01, lat+0.01])),
    //     name: 'Patras',
    // });

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    // for adding more than one icon
                    // features: [iconFeature, iconFeature2]
                    features: [iconFeature]

                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 0.5],
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
        }),

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

async function mapMult(isbn) {
    // console.log(lon,lat,zoom);

    // console.log(decodeURI(coordinates_list))

    let books = await fetch(`/map/${isbn}`).then((res) => {
        return res.json();
    }).then((data) => {
        return data;
    }).catch(error => {
        console.log(error);
    });

    console.log(books)

    let zoom = 16;

    const icons = [];

    for (let i = 0; i < books.length; i++) {
        console.log(books[i].location.split(','))
        icons.push(new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(books[i].location.split(','))),

            // geometry: new ol.geom.Point(ol.proj.fromLonLat([books[i].location.split(',')[0], books[i].location.split(',')[1]])),
            name: books[i].name,
        }))
    }

    // const iconFeature2 = new ol.Feature({
    //     geometry: new ol.geom.Point(ol.proj.fromLonLat([lon+0.01, lat+0.01])),
    //     name: 'Patras',
    // });

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    // for adding more than one icon
                    // features: [iconFeature, iconFeature2]
                    features: icons

                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 0.5],
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
            center: ol.proj.fromLonLat(books[0].location.split(',')),
            zoom: zoom
        }),

    });

    map.layers = map.getLayers();

    map.layers.getArray()[1].getSource().getFeatures()[0]

}

// access the image of the second layer in mapInit.map

//  mapInit.map.layers.getArray()[1].getSource().getFeatures()[0].getStyle().getImage().on('click', function () {
//         console.log('clicked');
//     }
//     );

// https://stackoverflow.com/questions/38114655/openlayers-3-show-vector-labels-on-hover

