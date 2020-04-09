let startLayer = L.tileLayer.provider("OpenTopoMap");

let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

let circleGroup = L.featureGroup().addTo(map);

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "OpenStreetMap.DE": L.tileLayer.provider("OpenStreetMap.DE"),
    "OpenStreetMap.HOT": L.tileLayer.provider("OpenStreetMap.HOT"),
    "OpenMapSurfer.Roads": L.tileLayer.provider("OpenMapSurfer.Roads"),
}, {
    "Thematische Darstellung": circleGroup
}).addTo(map)

let drawCircles = function () {
    let data = CONFIRMED;
    let header = CONFIRMED[0];
    let index = header.length - 1;

    // Datum anzeigen
    document.querySelector("#datum").innerHTML = `am ${header[index]}`;

    //console.log(data);
    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        //console.log(row[2],row[3]);
        let reg = `${row[0]} ${row[1]}`;
        let lat = row[2];
        let lng = row[3];
        let val = row[index];
        //let mrk = L.marker([lat,lng]).addTo(map);
        //mrk.bindPopup(`${reg}: ${val}`);

        //A = r²*PI
        //r² = A/PI
        //r = WURZEL(A/PI)
        let s = 0.5;
        let r = Math.sqrt(val * s / Math.PI);
        let circle = L.circleMarker([lat, lng], {
            radius: r
        }).addTo(circleGroup);
        circle.bindPopup(`${reg}: ${val}`);
    }
};

drawCircles();
// drawCircles(RECOVERED);
// drawCircles(DEATHS);

// L.marker([0, 0]).addTo(map);
//console.log(CONFIRMED);