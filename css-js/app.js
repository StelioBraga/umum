moment.locale("pt", {
  weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_")
});

var data_actual = moment().format("DD-MM-YY") + ", " + moment.weekdays(moment().day());

document.getElementById('data_').innerHTML="<i>" + data_actual + "</i>";



///////////////////////
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBjcW2YVjA_A3XV0Gx8QWvx_1j4ymxcfGc",
  authDomain: "projectoumum.firebaseapp.com",
  databaseURL: "https://projectoumum.firebaseio.com",
  projectId: "projectoumum",
};
firebase.initializeApp(config);

///////////////////////
