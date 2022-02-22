//Déclaration des variables pour la recherche de l'order Id
var params = new URL(document.location).searchParams;
var orderId = params.get("orderId");

//Affichage de l'order Id
document.querySelector("#orderId").innerHTML = orderId;
