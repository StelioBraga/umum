

///////////////////////

// Login shits
var myEmail;
var loginBtn = document.getElementById('autenticar_');

$('#passInput').keypress(function(e){
       if(e.keyCode==13)
       $('#autenticar_').click();
});

$("#autenticar_").click(function() {
    // Get whats writen in the email and pass Inputs
    var email = document.getElementById('emailInput').value;
    var pass = document.getElementById('passInput').value;

    emailInput.setAttribute("disabled", "");
    passInput.setAttribute("disabled", "");

    if(email|pass === ""){
      // iziToast.show({
      //   message: "<i class='text cursor icon'></i> Todos campos devem ser preenchidos."
      // });
      alert("Por favor preencha todos os espaços em branco adequadamente.")

    } else {
      loginBtn.setAttribute("disabled", "");
      loginBtn.innerHTML="...";
      // Authenticate the user
      var promise = firebase.auth().signInWithEmailAndPassword(email, pass);
      // If error occors, log it.
      promise.catch(function(e){
        console.log(e);
        // If invalid email
        if(e.code === "auth/invalid-email"){
          loginBtn.removeAttribute("disabled", "");
          loginBtn.innerHTML="Autenticar";
          emailInput.removeAttribute("disabled", "");
          passInput.removeAttribute("disabled", "");
          alert("Email invalido.");

        // If invalid Password
        }else if(e.code === "auth/wrong-password"){
          loginBtn.removeAttribute("disabled", "");
          loginBtn.innerHTML="Autenticar";
          emailInput.removeAttribute("disabled", "");
          passInput.removeAttribute("disabled", "");
          alert("Password errado.");

        // If invalid user or User not registered
        } else if (e.code === "auth/user-not-found") {
          loginBtn.removeAttribute("disabled", "");
          loginBtn.innerHTML="Autenticar";
          emailInput.removeAttribute("disabled", "");
          passInput.removeAttribute("disabled", "");
          alert("Usuário não registado. Contacte @steliobraga para registar-lhe.");

        }  else if (e.code === "auth/operation-not-allowed") {
          loginBtn.removeAttribute("disabled", "");
          loginBtn.innerHTML="Autenticar";
          emailInput.removeAttribute("disabled", "");
          passInput.removeAttribute("disabled", "");
          alert("Operação restrita.");

        }
      });
    }
});

//Ja fiz login, agora?
firebase.auth().onAuthStateChanged(function(firebaseUser){
   if(firebaseUser){
     //If the user is logged in do this
     //Save a cookie
     document.cookie = "signedin=yes; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
     loginBtn.setAttribute("disabled", "");
     emailInput.setAttribute("disabled", "");
     passInput.setAttribute("disabled", "");
     window.history.back();

   } else {
     //If the user is NOT logged in do this
     document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   }
 });
