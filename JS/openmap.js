function mapInit() {
    map = new OpenLayers.Map("basicMap");
    let mapnik         = new OpenLayers.Layer.OSM();
    let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    let toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    // 38.2903577,21.7911003
    let position       = new OpenLayers.LonLat(13.41,52.52).transform( fromProjection, toProjection);

    // let position       = new OpenLayers.LonLat(38.2903577,21.7911003).transform( fromProjection, toProjection);
    let zoom           = 5; 

    map.addLayer(mapnik);
    map.setCenter(position, zoom );
  }

