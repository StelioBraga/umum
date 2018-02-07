moment.locale("pt", {
  weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_")
});

var data_actual = moment().format("DD-MM-YY") + ", " + moment.weekdays(moment().day());

document.getElementById('data_').innerHTML="<i>" + data_actual + "</i>";
document.getElementById('save_').setAttribute("disabled", "");

//Ja fiz login, agora?
firebase.auth().onAuthStateChanged(function(firebaseUser){
   if(firebaseUser){
     //If the user is logged in do this
     //Save a cookie
     document.getElementById('emaildocente_').innerHTML = firebaseUser.email;
   } else {
     document.getElementById('save_').setAttribute("disabled", "");
   }
});

var reference = firebase.database().ref('/Alunos/');


////////// TER LISTA DE ESTUDANTES
// Get a reference to the database service
var database = firebase.database();
var selected_ano;
var selected_cadeira;

$('select').change(function() {
    selected = $(':selected', this);
    selected_ano = selected.parent().attr('label');
    selected_cadeira = $(':selected', this)[0].value;
});

var estudantesUl = document.getElementById('estudantesUl');
var estudantes_array;
var snapshot_ano;
var n_faltas;
var id;
var nome_do_estudante;

function getCadeira(){

  estudantesUl.innerHTML = "";
  $("#estudantesUl").append('<li class="mdl-list__item"><span class="mdl-list__item-primary-content">Nome do Aluno</span><span class="mdl-list__item-secondary-action">Está presente?</span></li>');

  reference.once('value').then(function(snap) {
    snapshot_ano = snap.child(selected_ano).val();

    estudantes_array = [];
    estudantes_array = Object.keys(snapshot_ano).map(function(key) {
      return [String(key), estudantes_array[key]];
    });

    for (var i = 0; i < estudantes_array.length; i++){
      id = snapshot_ano[estudantes_array[i][0]]['id'];
      nome_do_estudante = estudantes_array[i][0];
      n_faltas = snapshot_ano[estudantes_array[i][0]][selected_cadeira];
      document.getElementById('save_').removeAttribute("disabled", "");


      $("#estudantesUl").append('<li class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span><strong>' + nome_do_estudante + '</strong></span><span class="mdl-list__item-sub-title">' + n_faltas + '</span></span><span class="mdl-list__item-secondary-action"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for=' + id + '><input onclick="chekar()" type="checkbox" id=' + id + ' class="mdl-checkbox__input" checked /></label></span></li>')
      componentHandler.upgradeDom();
    }
  });
}

var ch;
function chekar(){
  ch = $("input:checkbox:not(:checked)");
}

/////GUARDAR DADOS NO SERVER
//document.getElementById('save_');

$("#save_").click(function(){
  for(var u; u < ch.length; u++){
    // firebase.database().ref('/Alunos/'+selected_ano+'/'+nome_do_estudante+"/"+selected_cadeira).set(n_faltas+1);
    // var faltoso = ch[u].id;
    var nome_do_faltoso = ch[u].parentElement.parentElement.parentElement.childNodes[0].childNodes[1].innerHTML.split(">")[1].split("<")[0];
    firebase.database().ref('/Alunos/'+selected_ano+'/'+nome_do_estudante+"/"+selected_cadeira).set(n_faltas+1);
  }
  // document.getElementById('save_').setAttribute("disabled", "");
  document.getElementById('save_').innerHTML = "...";
  // n_faltas
  // if (true) {
  //
  // }


});






























////
