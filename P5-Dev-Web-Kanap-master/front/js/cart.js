//Récupération du local storage
var cart = localStorage.getItem("produits");
var produits = JSON.parse(cart);

//Déclaration d'une constante pour cibler l'élément HTML #cart__items pour l'affichage du panier
const CARTITEMS = document.getElementById("cart__items");

//Mise en place d'une boucle pour la création des éléments HTML
for (let article of produits){
    //Initialisation de l'élément HTML article
    let newarticle = document.createElement("article");
    newarticle.className= "cart__item";
    newarticle.dataset.id = article.idProduit;
    newarticle.dataset.color= article.couleurProduit;
    //Insertion de l'image
    let newdivimg = document.createElement("div"); 
    newdivimg.className = "cart__item__img";
    let newimg= document.createElement("img");
    newimg.src=article.imgProduit;
    newimg.alt=article.altImgProduit;
    //Insertion des éléments descriptifs
    let newdivcontent= document.createElement("div");
    newdivcontent.className = "cart__item__content";
    let newdivdescription=document.createElement("div");
    newdivdescription.className="cart__item__content__description";
    let newh2 = document.createElement("h2");
    newh2.innerHTML=article.nomProduit;
    let newp = document.createElement("p");
    newp.innerHTML=article.couleurProduit;
    let newp2 = document.createElement("p");
    newp2.innerHTML=article.prixProduit+",00 €";
    //Ajout des options de quantité et de suppression
    let newdivsettings = document.createElement("div");
    newdivsettings.className="cart__item__content__settings";
    let newdivquantity = document.createElement("div"); 
    newdivquantity.className="cart__item__content__settings__quantity";
    let newpquantity = document.createElement("p");
    newpquantity.innerHTML="Qté : ";
    let newinput = document.createElement("input");
    newinput.setAttribute("type", 'number');
    newinput.className="itemQuantity";
    newinput.name="itemQuantity";
    newinput.setAttribute("min", 1);
    newinput.setAttribute("max", 100);
    newinput.value=article.quantiteProduit;
    let newdivdelete = document.createElement("div");
    newdivdelete.className="cart__item__content__settings__delete";
    let newpdelete = document.createElement("p");
    newpdelete.className="deleteItem";
    newpdelete.innerHTML="Supprimer";
        
    //Imbrication des éléments HTML    
    newdivimg.appendChild (newimg);
    newdivdescription.appendChild (newh2);
    newdivdescription.appendChild (newp);
    newdivdescription.appendChild (newp2);
    newdivquantity.appendChild (newpquantity);
    newdivquantity.appendChild (newinput);
    newdivdelete.appendChild (newpdelete);
    newdivsettings.appendChild (newdivquantity);
    newdivsettings.appendChild (newdivdelete);
    newdivcontent.appendChild (newdivdescription);
    newdivcontent.appendChild (newdivsettings);
    newarticle.appendChild (newdivimg);
    newarticle.appendChild (newdivcontent);
    CARTITEMS.appendChild (newarticle); 
}

//Fonction permettant le calcul et l'affichage des totaux en bouclant sur l'array produits (prix/quantité)
function calculTotal(){
    let totalQuantity = 0;
    let totalPrice = 0;
    for(let article of produits){
            totalQuantity += article.quantiteProduit;
            totalPrice += (article.prixProduit*article.quantiteProduit); 
        }
    document.getElementById("totalQuantity").innerHTML=totalQuantity;  
    document.getElementById("totalPrice").innerHTML=totalPrice;
}
calculTotal();

//Ajout de l'event listener au change sur l'input quantity de chaque article
document.querySelectorAll('.itemQuantity').forEach(item => {
    item.addEventListener('change', (event) => {
        //Ciblage du produit modifié via les data color et id
        let articleX = item.closest("article");
        let idArticleX = articleX.dataset.id;
        let couleurArticleX = articleX.dataset.color;
        let produitX = produits.find(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
        //Recherche de l'index du produit modifié dans l'array produits
        let produitXIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
        //Affectation de la nouvelle valeur quantité
        produitX.quantiteProduit = parseInt(event.target.value);
        //Modification dans le tableau en remplaçant avec le produit et sa quantité modifiée
        produits.splice(produitXIndex, 1, produitX);
        //Importation dans le local storage
        cart = JSON.stringify(produits);
        localStorage.setItem("produits", cart);
        //Calcul des nouveaux totaux
        calculTotal();
    })
})

//Ajout de l'event listener au clic sur l'élément "supprimer" de chaque article
document.querySelectorAll('.deleteItem').forEach(itemToDelete => {
    itemToDelete.addEventListener('click', () => {
        //Ciblage du produit modifié via les data color et id
        let articleX = itemToDelete.closest("article");
        let idArticleX = articleX.dataset.id;
        let couleurArticleX = articleX.dataset.color;
        //Recherche de l'index du produit supprimé dans l'array produits
        let produitXIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
        //Suppression du produit dans le tableau
        produits.splice(produitXIndex, 1);
        //Importation dans le local storage
        cart = JSON.stringify(produits);
        localStorage.setItem("produits", cart);
        //Suppression de l'élément HTML
        CARTITEMS.removeChild(articleX);
        //Calcul des nouveaux totaux
        calculTotal();
})
})
//Ecoute du bouton "Commander !" et exécution de la fonction order au clic
const btn_Commander = document.querySelector ("#order");
btn_Commander.addEventListener ("click", order);


//Fonction permettant l'envoi du formulaire de contact et du panier à l'API
function order(){
    //Vérification du panier non nul
    checkProductsArray();
    //Vérification du formulaire, si OK, création de l'objet contact
    if (checkForm()){
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        }
        //Création de l'array de strings product-ID
        let idProducts = [];
        let produitLocalStorage = JSON.parse(localStorage.getItem('produits'));
            for (let i = 0; i<produitLocalStorage.length;i++) {
                idProducts.push(produitLocalStorage[i].idProduit);
            }
        //Définition des paramètres de la requête
        const order = {
            contact : contact,
            products: idProducts,
        } 
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
        //Exécution de la requête POST et envoi des données au serveur
        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            //Réinitialisation du local storage
            localStorage.clear();
            //Renvoi vers la page de confirmation et stockage de l'order id dans l'URL
            document.location.href = "confirmation.html?orderId="+data.orderId;
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
    }

}


function checkForm(){
    let error = false;
    document.querySelectorAll('.cart__order__form__question').forEach(question => {
        let fieldToCheck = question.querySelector("input");
        //Si champ email, vérification grâce au regex, sinon affichage d'un message d'erreur
        if (fieldToCheck.type == "email"){
            let regexmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(regexmail.test(fieldToCheck.value)){
                question.querySelector("p").innerHTML=""; 
            }else{
                question.querySelector("p").innerHTML="Champ non valide";
                error = true;
            }
        //Pour tous les champs vérification si non nul, sinon et affichage d'un message d'erreur
        }else{
            if (fieldToCheck.value == ""){
                question.querySelector("p").innerHTML="Champ non valide";
                error = true;
            }else{
                question.querySelector("p").innerHTML="";  
            }
        }
    });
    return !error;
}


function checkProductsArray(){
    //Si local storage vide, affichage d'une fenêtre d'erreur et redirection vers la page d'acceuil
    if (localStorage.getItem("produits") == "[]"){
        if(window.confirm("Votre panier est vide ! Veuillez retourner à la page d'acceuil pour consulter notre catalogue")){
            window.location.href ="index.html"
        }
        return false;
    }
    else {
        return true;
    }
}