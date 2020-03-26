// alert("Hello world")

// let message = "Hello world"
// alert(message);
// message = "Hallo welt"
// alert(message);

const LINK_COLOR = "#ff0000";
console.log("Link bitte in der Farbe ", LINK_COLOR);

let highscore = 520233;
console.log(highscore / 10);

let firstname = "Harry";
let lastname = "Hirsch";

console.log("Name: ", firstname, lastname);

let fullname = 'Jeffrey "The Dude" Lebowski';
console.log(fullname);

let template = `Dein Highscore ist ${highscore} Punkte`;
console.log(template);

let isOver18 = true;
console.log(isOver18);

let age = 17;
console.log("über 18?", age > 18);

let participants = ["Detlef", "Jan", "Hiasi"];
console.log(participants);
console.log("Einträge im Array:", participants.length);
console.log(participants[2]);

gameHighscore = [2099, 3010, 3330, 5000];
console.log(gameHighscore);

let user = {
    firstname: "Sepp",
    lastname: "Fent",
    age: 25
};
console.log(user);
console.log(user.firstname);
user.highscore = 200;
console.log(user);
user["hihscore ever"] = 400;
console.log(user);

let a = 2;
let b = 4;
console.log(a + b);
console.log(b / (a - 1));
a++;
console.log(a);

// let myAge = prompt("Wie alt bist du?");
// console.log(`Du bsit ${myAge} Jahre alt`);
// console.log(`Über 18? ${myAge > 18}`);

// if (myAge > 18) {
//     console.log("Glückwunsch über 18");
// } else {
//     console.log("Leider unter 18");
// }

// Schleifen: for Schleife

for (let i = 0; i < 10; i++) {
    console.log(`Schleife ${i}`);
}

for (let j = 0; j < participants.length; j++) {
    const participant = participants[j];
    console.log(`Teilnehmer*in ${j} ${participant}`);
}

participants.forEach(participant => {
    console.log(`Teilnehmer*in ${participant}`)
});

// Funktionen

function showAge(birthYear) {
    console.log(`Du bist ca. ${2020 - birthYear} Jahre alt.`)
}

showAge(1992);
showAge(1977);

function calcAge(birthYear) {
    return 2020 - birthYear;
}

console.log(`Max ist ${calcAge(1992)} Jahre alt(ca.)`);
console.log(`Sepp ist ${calcAge(1995)} Jahre alt(ca.)`);

let birthYears = [1964, 1977, 1990, 1992, 2004];
console.log(birthYears);

birthYears.forEach(year => {
    console.log(`Geboren ${year}, heute ca. ${calcAge(year)} Jahre alt.`)
});

let users = [
    { firstname: "Hans", lastname: "Bader", birthYear: 1960} ,
    { firstname: "Sepp", lastname: "Bosbasen", birthYear: 1980 },
    { firstname: "Beni", lastname: "Kalbers", birthYear: 2000 },
];

console.log(users);

users.forEach(user => {
    console.log(`${user.firstname} ist oder wird heuer ${calcAge(user.birthYear)} Jahre alt`)
});

let firstParagraph = document.querySelector("#pFirst");
console.log(firstParagraph);
// firstParagraph.remove();
firstParagraph.innerHTML = "Test";