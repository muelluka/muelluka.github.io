let startLayer = L.tileLayer.provider("OpenTopoMap");

let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "OpenStreetMap.DE": L.tileLayer.provider("OpenStreetMap.DE"),
    "OpenStreetMap.HOT": L.tileLayer.provider("OpenStreetMap.HOT"),
    "OpenMapSurfer.Roads": L.tileLayer.provider("OpenMapSurfer.Roads"),
}).addTo(map)

L.marker([0, 0]).addTo(map);

//console.log(CONFIRMED);
for (let i = 1; i < CONFIRMED.length; i++) {
    let row = CONFIRMED[i];
    //console.log(row[2],row[3]);
    let lat = row[2]
    let lng = row[3]
    let val = row[row.length - 1];
    // let mrk = L.marker([lat, lng]).addTo(map);
    // mrk.bindPopup(`${row[0]} ${row[1]}: ${val}`);

    let s = 0.25

    // A = r^2 *PI
    // r^2 = A/PI
    // r = Wurzel(A/PI)
    let r = Math.sqrt(val*s/Math.PI);

    let circle = L.circleMarker([lat, lng],{
        radius: r
    }).addTo(map);

    circle.bindPopup(`${row[0]} ${row[1]}: ${val}`);
}