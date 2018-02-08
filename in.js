firebase.auth().onAuthStateChanged(function(firebaseUser){
   if(firebaseUser){
     //If the user is logged in do this
     //Save a cookie
     document.getElementById('login_').setAttribute("hidden", "");
     document.getElementById('logout_').removeAttribute("hidden", "");

   } else {
       document.getElementById('login_').removeAttribute("hidden", "");
       document.getElementById('logout_').setAttribute("hidden", "");
   }
});

$("#logout_").click(function(){
  if(confirm("Deseja sair da conta?")){
    document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    firebase.auth().signOut();
    window.location.reload(1);
  }else {
    return null;
  }
});
