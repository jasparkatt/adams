
var bingGeocoder = null,
    mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>,Adams Co. GIS';
mbUrl = "https://a.tiles.mapbox.com/v4/jasparkatt.7de0c82e/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA";
mbUr2 = "https://a.tiles.mapbox.com/v4/jasparkatt.mc7mh1f5/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA";
mbUr3 = "https://a.tiles.mapbox.com/v4/jasparkatt.mg637mmi/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA";
mbUr4 = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var myStyle = {
    color: "#994c00",
    weight: 4,
    opacity: 1,
    dashArray: "4",
    fillOpacity: 1
},
    myStyle2 = {
        color: "#CC6600",
        weight: 2,
        opacity: 0.65,
        dashArray: "5",
        fillOpacity: 0.1,
        fillColor: "none"
    },
    myStyle3 = {
        radius: 5,
        fillColor: "#0e671f",
        color: "#bbbbce",
        weight: 1,
        opacity: 0.8,
        fillOpacity: 1
    },
    defaultStyle = {
        color: "#CC6600",
        weight: 2,
        opacity: 0.6,
        dashArray: "5",
        fillOpacity: 0.1,
        fillColor: "#bcd4fd"
    },
    highlightStyle = {
        color: "#caaa00",
        weight: 3.5,
        opacity: 0.6,
        dashArray: "7",
        fillOpacity: 0.25,
        fillColor: "#caaa00"
    },
    grayscale = L.tileLayer(mbUrl, {
        id: "jasparkatt.7de0c82e",
        attribution: mbAttr
    }),
    streets = L.tileLayer(mbUr2, {
        id: "jasparkatt.mc7mh1f5",
        attribution: mbAttr
    });
aerial = L.tileLayer(mbUr3, {
    id: "jasparkatt.mg637mmi",
    attribution: mbAttr
});
OSM = L.tileLayer(mbUr4, {
    attribution: mbAttr
});
var cafeIcon = L.AwesomeMarkers.icon({
    prefix: "fa",
    markerColor: "red",
    icon: "unlock"
}),
    cafe2Icon = L.AwesomeMarkers.icon({
        prefix: "fa",
        markerColor: "cadetblue",
        icon: "unlock"
    }),
    cafe3Icon = L.AwesomeMarkers.icon({
        prefix: "fa",
        markerColor: "green",
        icon: "unlock"
    }),
    cafe4Icon = L.AwesomeMarkers.icon({
        prefix: "fa",
        markerColor: "orange",
        icon: "unlock"
    }),
    cafe5Icon = L.AwesomeMarkers.icon({
        prefix: "fa",
        markerColor: "blue",
        icon: "bold",
        iconColor: "black"
    }),
    cafe6Icon = L.AwesomeMarkers.icon({
        prefix: "fa",
        markerColor: "darkpurple",
        icon: "unlock"
    }),
    map = L.map("map", {
        center: [44, -89.701],
        zoom: 10,
        layers: [streets],
        zoomControl: !1
    }),
    baseLayers = {
        Grayscale: grayscale,
        Topographic: streets,
        Satellite: aerial,
        "Open Street Map": OSM
    };

onEachFeature_Polygon = function (e, t) {
            var o = e.properties.cent_lat,
                r = e.properties.cent_lon,
                s = new L.LatLng(o, r);
            t.setStyle(defaultStyle), e.properties && e.properties.MCD && t.bindPopup("<b>" + e.properties.MCD + "</b><br />2012: " + e.properties.Rate_12 + "/1000 Residents<br/>2013: " + e.properties.Rate_13 + "/1000 Residents<br/>2014: " + e.properties.Rate_14 + "/1000 Residents<br/>2015: " + e.properties.Rate_15 + "/1000 Residents<br/>2016: " + e.properties.Rate_16 + "/1000 Residents"), t.on("mouseover", function (e) {
              t.setStyle(highlightStyle), t.openPopup(s)
            }), t.on("mouseout", function (e) {
              t.setStyle(defaultStyle), t.closePopup()
            }), t.on("click", function (e) {
              map.fitBounds(e.target.getBounds())
            }), t.on("dblclick", function (e) {
              map.setView([44, -89.701], 10)
            })
          };


$.getJSON("assets/CntyBound.json", function (data) {
            L.geoJson(data, {
            style: myStyle
        }).addTo(map);
    });

//    mcds = Insert mcdbnds.json call here
var mc = $.getJSON("assets/McdBound.json", function (data) {
            L.geoJson(data, {
            style: myStyle2,
            onEachFeature: onEachFeature_Polygon
    });
});
//    onEachFeature_Polygon = function (e, t) {
//            var o = e.properties.cent_lat,
//                r = e.properties.cent_lon,
//                s = new L.LatLng(o, r);
//            t.setStyle(defaultStyle), e.properties && e.properties.MCD && t.bindPopup("<b>" + e.properties.MCD + "</b><br />2012: " + e.properties.Rate_12 + "/1000 Residents<br/>2013: " + e.properties.Rate_13 + "/1000 Residents<br/>2014: " + e.properties.Rate_14 + "/1000 Residents<br/>2015: " + e.properties.Rate_15 + "/1000 Residents<br/>2016: " + e.properties.Rate_16 + "/1000 Residents"), t.on("mouseover", function (e) {
//              t.setStyle(highlightStyle), t.openPopup(s)
//            }), t.on("mouseout", function (e) {
//              t.setStyle(defaultStyle), t.closePopup()
//            }), t.on("click", function (e) {
//              map.fitBounds(e.target.getBounds())
//            }), t.on("dblclick", function (e) {
//              map.setView([44, -89.701], 10)
//            })
//          };
L.control.layers(baseLayers, {
  "Townships": mc  
}).addTo(map);
    
    bp = L.geoJson(burg, {
        pointToLayer: function (e, t) {
            return L.marker(t, {
                icon: cafe5Icon
            }).on("mouseover", function () {
                this.bindPopup("<b>Address: </b>" + e.properties.Address + "<br><b>Date: </b>" + e.properties.Date[1] + "/" + e.properties.Date[2] + "/" + e.properties.Date[0] + " <br><b>Case #: </b>" + e.properties.Case_No).openPopup()
            })
        }
    }),
    markers = L.markerClusterGroup();
markers.addLayer(bp);
var heat = L.heatLayer(burgPoints, {
    radius: 20,
    blur: 7,
    maxZoom: 13
}),
    crime = L.geoJson(burg, {
        pointToLayer: function (e, t) {
            return L.circleMarker(t, myStyle3)
        }
    }),
    sliderControl = null,
    sliderControl = L.control.sliderControl({
        position: "topleft",
        layer: crime,
        timeStrLength: 15,
        timeAttribute: "when",
        isEpoch: !1,
        range: !0
    }),
    bingGeocoder = new L.Control.BingGeocoder("AsVN7eumW0nq3zNlFR8pidume5-WL8bV1Qum6jVlgyxs_xb-17d6lcyTT33qaqex", {
        collapsed: !1,
        position: "topleft",
        text: 'Find Address e.g. "862 Cree Ave, Adams WI" '
    });
$("#fy2012").click(function () {
    map.addLayer(y12), map.fitBounds(huc.getBounds()), map.removeLayer(y17), map.removeLayer(y16), map.removeLayer(y15), map.removeLayer(y13), map.removeLayer(y14), map.removeLayer(heat), map.removeLayer(markers), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#fy2013").click(function () {
    map.addLayer(y13), map.fitBounds(huc.getBounds()), map.removeLayer(y17), map.removeLayer(y16), map.removeLayer(y15), map.removeLayer(y12), map.removeLayer(y14), map.removeLayer(heat), map.removeLayer(markers), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#fy2014").click(function () {
    map.addLayer(y14), map.fitBounds(huc.getBounds()), map.removeLayer(y17), map.removeLayer(y16), map.removeLayer(y15), map.removeLayer(y13), map.removeLayer(y12), map.removeLayer(heat), map.removeLayer(markers), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#fy2015").click(function () {
    map.addLayer(y15), map.fitBounds(huc.getBounds()), map.removeLayer(y17), map.removeLayer(y16), map.removeLayer(y14), map.removeLayer(y13), map.removeLayer(y12), map.removeLayer(heat), map.removeLayer(markers), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#fy2016").click(function () {
    map.addLayer(y16), map.fitBounds(huc.getBounds()), map.removeLayer(y17), map.removeLayer(y15), map.removeLayer(y14), map.removeLayer(y13), map.removeLayer(y12), map.removeLayer(heat), map.removeLayer(markers), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#fy2017").click(function () {
    map.addLayer(y17), map.fitBounds(huc.getBounds()), map.removeLayer(y16), map.removeLayer(y15), map.removeLayer(y14), map.removeLayer(y13), map.removeLayer(y12), map.removeLayer(heat), map.removeLayer(markers), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#heatmp").click(function () {
    map.addLayer(heat), map.fitBounds(huc.getBounds()), map.removeLayer(y12), map.removeLayer(y13), map.removeLayer(y14), map.removeLayer(y15), map.removeLayer(y16), map.removeLayer(y17), map.removeLayer(huc), map.removeLayer(markers), map.removeControl(sliderControl)
}), $("#all").click(function () {
    map.addLayer(markers), map.fitBounds(huc.getBounds()), map.removeLayer(heat), map.removeLayer(y12), map.removeLayer(y13), map.removeLayer(y14), map.removeLayer(y15), map.removeLayer(y16), map.removeLayer(y17), map.removeLayer(huc), map.removeControl(sliderControl)
}), $("#time").click(function () {
    map.removeLayer(markers), map.removeLayer(heat), map.removeLayer(y12), map.removeLayer(y13), map.removeLayer(y14), map.removeLayer(y15), map.removeLayer(y16), map.removeLayer(y17), map.removeLayer(huc), map.addControl(sliderControl), map.fitBounds(huc.getBounds()), sliderControl.startSlider()
}), $("#rate").click(function () {
    map.addLayer(huc), map.fitBounds(huc.getBounds()), map.removeLayer(mc), map.removeLayer(markers), map.removeLayer(heat), map.removeLayer(y12), map.removeLayer(y13), map.removeLayer(y14), map.removeLayer(y15), map.removeLayer(y16), map.removeLayer(y17), map.removeControl(sliderControl)
}), L.control.scale().addTo(map), map.addControl(bingGeocoder)
