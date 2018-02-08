
const MDCDialog = mdc.dialog.MDCDialog;
const MDCDialogFoundation = mdc.dialog.MDCDialogFoundation;
const util = mdc.dialog.util;

var confirmationdialog_ = new mdc.dialog.MDCDialog.attachTo(document.querySelector('#confirmationdialog_'));


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
     document.getElementById('login_').setAttribute("hidden", "");
     document.getElementById('logout_').removeAttribute("hidden", "");


   } else {
     document.getElementById('save_').setAttribute("disabled", "");
     document.getElementById('login_').removeAttribute("hidden", "");
     document.getElementById('logout_').setAttribute("hidden", "");
   }
});

var reference = firebase.database().ref('/Alunos/');


////////// TER LISTA DE ESTUDANTES
// Get a reference to the database service
var database = firebase.database();
var n_faltas
var selected_ano;
var selected_cadeira;

$('select').change(function() {
    selected = $(':selected', this);
    selected_ano = selected.parent().attr('label');
    selected_cadeira = $(':selected', this)[0].value;

    if(selected_ano == "Anos"){
      document.getElementById('alunos_save').setAttribute("hidden", "");
    } else {
      document.getElementById('alunos_save').setAttribute("hidden", "");
      document.getElementById('loading__').removeAttribute("hidden", "");
      document.getElementById('spinner__').removeAttribute("hidden", "");
      document.getElementById('error__').setAttribute("hidden", "");
      // document.getElementById('alunos_save').removeAttribute("hidden", "");
    }
});

var estudantesUl = document.getElementById('estudantesUl');
var estudantes_array;
var snapshot_ano;
var id;
var nome_do_estudante;
var promise;

function getCadeira(){

  estudantesUl.innerHTML = "";
  $("#estudantesUl").append('<li class="mdl-list__item"><span class="mdl-list__item-primary-content">Nome do Aluno</span><span class="mdl-list__item-secondary-action">Está presente?</span></li>');

  promise = reference.once('value').then(function(snap) {
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


      $("#estudantesUl").append('<li class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span><strong>' + nome_do_estudante + '</strong></span><span class="mdl-list__item-sub-title">' + n_faltas + '</span></span><span class="mdl-list__item-secondary-action"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for=' + id + '><input onclick="chekar()" type="checkbox" id=' + id + ' class="mdl-checkbox__input" checked /></label></span></li>');


      document.getElementById('alunos_save').removeAttribute("hidden", "");
      document.getElementById('spinner__').setAttribute("hidden", "");
      document.getElementById('loading__').setAttribute("hidden", "");
      componentHandler.upgradeDom();
    }
  });

  promise.catch(function(s){
    document.getElementById('spinner__').setAttribute("hidden", "");
    document.getElementById('error__').removeAttribute("hidden", "");
  });

}

var ch;
var nome_do_faltoso;
var n_faltas_do_faltoso;
var promisesave__;

function chekar(){
  ch = $("input:checkbox:not(:checked)");
}

/////GUARDAR DADOS NO SERVER
//document.getElementById('save_');

$("#save_").click(function(){
  // if(document.getElementById('sumarioInput').value == "" || document.getElementById('sumarioInput').value.length < 5){
  //   alert("Por favor escreva o sumário.");
  //
  // } else {
  //   confirmationdialog_.show();
  //   confirmationdialog_.listen('MDCDialog:cancel', function() {
  //   })
  // }

  confirmationdialog_.show();
  confirmationdialog_.listen('MDCDialog:cancel', function() {})
});

$("#saveconfirm__").click(function(){
  document.getElementById('save_').setAttribute("disabled", "");
  document.getElementById('save_').innerHTML = "...";

  // NOTE-TODO: MUDAR AQUI.. COLOCAR ALGO COM SENTIDO
  if (ch == null) {
    document.getElementById('save_').setAttribute("disabled", "");
    document.getElementById('save_').innerHTML = "Sucesso!";

  } else {
    for(var u = 0; u < ch.length; u++){
      nome_do_faltoso = ch[u].parentElement.parentElement.parentElement.childNodes[0].childNodes[1].innerHTML.split(">")[1].split("<")[0];
      n_faltas_do_faltoso = parseInt(ch[u].parentElement.parentElement.parentElement.childNodes[0].childNodes[2].innerHTML);
      promisesave__ = firebase.database().ref('/Alunos/'+selected_ano+'/'+nome_do_faltoso+"/"+selected_cadeira).set(n_faltas_do_faltoso+1);
    }

    document.getElementById('save_').innerHTML = "Sucesso!";
  }

  promisesave__.catch(function(s){
    document.getElementById('spinner__').setAttribute("hidden", "");
    document.getElementById('error__').removeAttribute("hidden", "");

    document.getElementById('save_').innerHTML = "Tentar novamente!";
    document.getElementById('save_').removeAttribute("disabled", "");
    document.getElementById('saveerror__').removeAttribute("hidden", "");
  });
});



$("#logout_").click(function(){
  if(confirm("Deseja sair da conta?")){
    document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    firebase.auth().signOut();
    window.location.replace("../");
  }else {
    return null;
  }
});



























////
