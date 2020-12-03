var wms_layers = [];

var format_DataBase_0 = new ol.format.GeoJSON();
var features_DataBase_0 = format_DataBase_0.readFeatures(json_DataBase_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_DataBase_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_DataBase_0.addFeatures(features_DataBase_0);
var lyr_DataBase_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_DataBase_0, 
                style: style_DataBase_0,
                interactive: true,
                title: '<img src="styles/legend/DataBase_0.png" /> DataBase'
            });

lyr_DataBase_0.setVisible(true);
var layersList = [lyr_DataBase_0];
lyr_DataBase_0.set('fieldAliases', {'CELLNAME': 'CELLNAME', 'LAT': 'LAT', 'LONG': 'LONG', 'LAC': 'LAC', 'CELLID': 'CELLID', 'AZIMUTH': 'AZIMUTH', 'TECH': 'TECH', 'NODE': 'NODE', });
lyr_DataBase_0.set('fieldImages', {'CELLNAME': '', 'LAT': '', 'LONG': '', 'LAC': '', 'CELLID': '', 'AZIMUTH': '', 'TECH': '', 'NODE': '', });
lyr_DataBase_0.set('fieldLabels', {'CELLNAME': 'inline label', 'LAT': 'inline label', 'LONG': 'inline label', 'LAC': 'no label', 'CELLID': 'no label', 'AZIMUTH': 'no label', 'TECH': 'no label', 'NODE': 'no label', });
lyr_DataBase_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});