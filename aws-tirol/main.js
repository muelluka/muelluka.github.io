let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    layers: [
        startLayer
    ]
});

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup(),
    windspeed: L.featureGroup()
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Wetterstationen Tirol": overlay.stations,
    "Temperatur (°C)": overlay.temperature,
    "Windgeschwindigkeit (km/h)": overlay.windspeed
}).addTo(map);

let awsUrl = "https://aws.openweb.cc/stations";


let aws = L.geoJson.ajax(awsUrl, {
    filter: function (feature) {
        console.log("Feature in filter: ", feature);
        return feature.properties.LT;
    },
    pointToLayer: function (point, latlng) {
        // console.log("point: ", point);
        let marker = L.marker(latlng).bindPopup(`
        <h3>${point.properties.name} ${point.geometry.coordinates[2]} m</h3>
        <ul>
        <li>Position: Lat: ${point.geometry.coordinates[1]}/Lng: ${point.geometry.coordinates[0]}</li>
        <li>Datum: ${point.properties.date}</li>
        <li>Lufttemperatur: ${point.properties.LT} °C</li>
        <li>Windgeschwindigkeit: ${point.properties.WG} m/s</li>
        <li>Relative Luftfeuchte: ${point.properties.RH} %</li>
        <li>Schneehöhe: ${point.properties.HS} cm</li>
        </ul>
        <p><a target="links" href="https://lawine.tirol.gv.at/data/grafiken/1100/standard/tag/${point.properties.plot}.png">Link</a></p>
        `);
        return marker;
    }
}).addTo(overlay.stations);

let darwTemperature = function (jsonData) {
    console.log("Aus der Funktion: ", jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.LT
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`,
                icon: L.divIcon({
                    html: `<div class="lable-temperature">${feature.properties.LT.toFixed(1)}</div>`,
                    className: "ignore-me" //dirty hack
                })
            })
        }
    }).addTo(overlay.temperature)

};

//1. neues overlay definieren, zu L.control.layers hinzufügen und auf default anzeigen
//2. die funktion drawwind als 1.1 Kopie von drawTempearature mit anpassungen
//3. einen neuen Stil .lable-wind im CSS con main.css
//4. die funktion draw Wind in data:loaded aufrufen

let darwWind = function (jsonData) {
    console.log("Aus der Funktion: ", jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.WG
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`,
                icon: L.divIcon({
                    html: `<div class="lable-wind">${(feature.properties.WG.toFixed(1)*3.6)}</div>`,
                    className: "ignore-me" //dirty hack
                })
            })
        }
    }).addTo(overlay.windspeed)

};


aws.on("data:loaded", function () {
    // console.log(aws.toGeoJSON());
    darwTemperature(aws.toGeoJSON());

    map.fitBounds(overlay.stations.getBounds());

    overlay.temperature.addTo(map);

    darwWind(aws.toGeoJSON());

    map.fitBounds(overlay.stations.getBounds());

    overlay.windspeed.addTo(map);


});