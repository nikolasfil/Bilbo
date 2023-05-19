

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

    let books, center;

    books = await fetch(`/map/${isbn}`).then((res) => {
        return res.json();
    }).then((data) => {
        return data;
    }).catch(error => {
        console.log(error);
    });


    const icons = [];

    for (let i = 0; i < books.length; i++) {

        icons.push(new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(books[i].location.split(','))),

            name: books[i].name,
        }))
    }

    if (books.length == 1) {
        center = books[0].location.split(',');
    } else {
        center = centering(books)
    }

    let vectorLayer = new ol.layer.Vector({

        source: new ol.source.Vector({ features: icons }),

        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                src: 'img/geo-alt-fill.svg',
                scale: 2,
                // add event lister tho
            })
        })
    });

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            vectorLayer

        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(center),
            zoom: 16
        }),

    });

    let selectPointerMove = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove,
        layers: [vectorLayer]
    });

    // Handle the hover event
    map.addInteraction(selectPointerMove);

    selectPointerMove.on('select',
        function (e) {
            // for (let i = 0; i < e.selected.length; i++) {
                let feature = e.selected[0];
                // console.log(e.selected[0]['A']['name']);

                if (feature) {
                    // returns some errors but works 
                    console.log('hovered')
                    // Change the style when hovering
                    // feature.setStyle(new ol.style.Style({
                    //     image: new ol.style.Icon({
                    //         src: 'path/to/icon-focused.png', // set the path to the focused icon image
                    //         scale: 0.7 // adjust the scale as per your needs
                    //     })
                    // } ));
                    document.getElementById(`library-reserve-url-${e.selected[0]['A']['name']}`).style = 'background-color: #ECE5F1; cursor: pointer;';
                    // document.getElementsByClassName('library-reserve-url')[0].style = 'color: #ac8fbf; cursor: pointer;';
                } else {
                    for( i = 0; i < books.length; i++){
                        document.getElementsByClassName('library-reservations')[i].style.background = '';
                        document.getElementsByClassName('library-reservations')[i].style.opacity= '1';
                        
                    }
                }
            // }
        });


    if (books.length != 1) {
        // Get the extent of the vector layer
        let extent = vectorLayer.getSource().getExtent();

        // Fit the view to the extent of the vector layer
        map.getView().fit(extent, { padding: [50, 50, 50, 50] }); // Adjust padding as needed
    }


}


function centering(books) {
    let x = 0;
    let y = 0;

    // Iterate over each book
    for (let i = 0; i < books.length; i++) {
        const location = books[i].location.split(",");
        const fx = parseFloat(location[0].trim());
        const fy = parseFloat(location[1].trim());
        x += fx;
        y += fy;
    }

    return [x / books.length, y / books.length]; // Return the sum divided by the length
}

// access the image of the second layer in mapInit.map

//  mapInit.map.layers.getArray()[1].getSource().getFeatures()[0].getStyle().getImage().on('click', function () {
//         console.log('clicked');
//     }
//     );

// https://stackoverflow.com/questions/38114655/openlayers-3-show-vector-labels-on-hover

