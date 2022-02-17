
const CARTITEMS = document.getElementById("cart__items");
const TOTALQUANTITY = document.getElementById("totalQuantity");
const TOTALPRICE = document.getElementById("totalPrice");

var cart = localStorage.getItem("produits");
var produits = JSON.parse(cart);

var totalPrice = 0;
var totalQuantity = 0;


for (let article of produits){
    let newarticle = document.createElement("article");
    let newdivimg = document.createElement("div"); 
    let newimg= document.createElement("img");
    let newdivcontent= document.createElement("div");
    let newdivdescription=document.createElement("div");
    let newh2 = document.createElement("h2");
    let newp = document.createElement("p");
    let newp2 = document.createElement("p");
    let newdivsettings = document.createElement("div");
    let newdivquantity = document.createElement("div"); 
    let newpquantity = document.createElement("p");
    let newinput = document.createElement("input");
    let newdivdelete = document.createElement("div");
    let newpdelete = document.createElement("p");
    newarticle.className= "cart__item";
    newarticle.dataset.id = article.idProduit;
    newarticle.dataset.color= article.couleurProduit;
    newdivimg.className = "cart__item__img";
    newimg.src=article.imgProduit;
    newimg.alt=article.altImgProduit;
    newdivcontent.className = "cart__item__content";
    newdivdescription.className="cart__item__content__description";
    newh2.innerHTML=article.nomProduit;
    newp.innerHTML=article.couleurProduit;
    newp2.innerHTML=article.prixProduit+",00 €";
    newdivsettings.className="cart__item__content__settings";
    newdivquantity.className="cart__item__content__settings__quantity";
    newpquantity.innerHTML="Qté : ";
    newinput.setAttribute("type", 'number');
    newinput.className="itemQuantity";
    newinput.name="itemQuantity";
    newinput.setAttribute("min", 1);
    newinput.setAttribute("max", 100);
    newinput.value=article.quantiteProduit;
    newdivdelete.className="cart__item__content__settings__delete";
    newpdelete.className="deleteItem";
    newpdelete.innerHTML="Supprimer";
    
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

    totalQuantity += article.quantiteProduit;
    totalPrice += (article.prixProduit*article.quantiteProduit);
}
TOTALQUANTITY.innerHTML=totalQuantity;
TOTALPRICE.innerHTML=totalPrice;

document.querySelectorAll('.itemQuantity').forEach(item => {
    item.addEventListener('change', (event) => {
        let articleX = item.closest("article");
        let idArticleX = articleX.dataset.id;
        let couleurArticleX = articleX.dataset.color;
        let produitX = produits.find(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
        let produitXIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
        produitX.quantiteProduit = parseInt(event.target.value);
        produits.splice(produitXIndex, 1, produitX);
        cart = JSON.stringify(produits);
        localStorage.setItem("produits", cart);
        totalPrice = 0;
        totalQuantity=0;

        for(let article of produits){
            totalQuantity += article.quantiteProduit;
            totalPrice += (article.prixProduit*article.quantiteProduit); 
        }
        TOTALQUANTITY.innerHTML=totalQuantity;
        TOTALPRICE.innerHTML=totalPrice;
    })
})

document.querySelectorAll('.deleteItem').forEach(itemToDelete => {
    itemToDelete.addEventListener('click', () => {
        let articleX = itemToDelete.closest("article");
        let idArticleX = articleX.dataset.id;
        let couleurArticleX = articleX.dataset.color;
        let produitXIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
        produits.splice(produitXIndex, 1);
        cart = JSON.stringify(produits);
        localStorage.setItem("produits", cart);
        CARTITEMS.removeChild(articleX);
        totalPrice = 0;
        totalQuantity=0;

        for(let article of produits){
            totalQuantity += article.quantiteProduit;
            totalPrice += (article.prixProduit*article.quantiteProduit); 
        }
        TOTALQUANTITY.innerHTML=totalQuantity;
        TOTALPRICE.innerHTML=totalPrice;
    })
})

/*const btn_Commander = document.querySelector ("#order");
btn_Commander.addEventListener ("click", order);


function order(){
    checkForm();
    let contactObject = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("adress").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    }
    createContactObject();
    checkProductsArray();


}*/


/*function checkForm(){
    document.querySelectorAll('.cart__order__form__question').forEach(question => {
        let fieldToCheck = question.querySelector("input");
        if (fieldToCheck.type == "email"){
            let regexmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(regexmail.test(fieldToCheck.value)){
                question.querySelector("p").innerHTML="";
                let fieldToCheckValue = fieldToCheck.value;
                let 
                
            }else{
                question.querySelector("p").innerHTML="Champ non valide";
                fieldToCheck.focus(); 
                return false;
            }
        }else{
            if (fieldToCheck.value == ""){
                question.querySelector("p").innerHTML="Champ non valide";
                fieldToCheck.focus();
                return false;
            }else{
                question.querySelector("p").innerHTML="";  
            }
        }
        /*let contactFirstName = document.getElementById("firstName");
        if (contactFirstName.value == ""){
            document.getElementById('firstNameErrorMsg').innerHTML="Veuillez entrez un nom valide";
            contactFirstName.focus();
            return false;
        }else{
            document.getElementById('#firstNameErrorMsg').innerHTML="";  
        }*/


function checkProductsArray(){
    if (localStorage.getItem("produits") == "[]"){
        if(window.confirm("Votre panier est vide ! Veuillez retourner à la page d'acceuil pour consulter notre catalogue")){
            window.location.href ="index.html"
        }
    }

}

function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
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

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();


/*
function checkCoordonnees(){
    document.querySelectorAll('.cart__order__form__question').forEach(question =>{
        if 
    })
}

contactNodeList = document.querySelectorAll('.cart__order__form__question').value;







/*checkchange();


function checkchange(){
    let inputQuantityArray = document.querySelectorAll('.itemQuantity');
    for(let i =0, len = inputQuantityArray.length; i < len; i++){
        inputQuantityArray[i].addEventListener('change', (event) => {
            let inputX = inputQuantityArray[i];
            let articleX = inputX.closest("article");
            let idArticleX = articleX.dataset.id;
            let couleurArticleX = articleX.dataset.color;
            let produitX = produits.find(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
            let produitXIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
            produitX.quantiteProduit = parseInt(this.value);
            produits.splice(produitXIndex, 1, produitX);
            cart = JSON.stringify(produits);
            localStorage.setItem("produits", cart);
            totalPrice = 0;
            totalQuantity=0;

            for(let article of produits){
                totalQuantity += article.quantiteProduit;
                totalPrice += (article.prixProduit*article.quantiteProduit); 
            }
            TOTALQUANTITY.innerHTML=totalQuantity;
            TOTALPRICE.innerHTML=totalPrice;
            
        })
    }
}

function changeQuantity(){ 
    //for(var i =0, len = inputQuantityArray.length; i < len; i++){ 
    let articleX = inputQuantityArray[i].closest("article");
    let idArticleX = articleX.dataset.id;
    let couleurArticleX = articleX.dataset.color;
    let produitX = produits.find(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
    let produitXIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit.couleurProduit == couleurArticleX);
    produitX.quantiteProduit = parseInt(this.value);
    produits.splice(produitXIndex, 1, produitX);
    cart = JSON.stringify(produits);
    localStorage.setItem("produits", cart);
    totalPrice = 0;
    totalQuantity=0;

    for(let article of produits){
        totalQuantity += article.quantiteProduit;
        totalPrice += (article.prixProduit*article.quantiteProduit); 
    }
    TOTALQUANTITY.innerHTML=totalQuantity;
    TOTALPRICE.innerHTML=totalPrice;
}
//}




function deleteItem(){

}




/*var input_modifierQuantite = document.querySelector('input[name="itemQuantity"]');
input_modifierQuantite.addEventListener ("change", changeQuantity);

*/


    
/*objIndex = produits.findIndex(produit => produit.idProduit == idArticleX && produit => produit.couleurProduit == couleurArticleX);
produits[objIndex].quantiteProduit = parseInt(this.value);



    let colorPicked = document.querySelector("#colors");
    let quantityPicked = document.querySelector("#quantity");
    if (quantityPicked.value>0 && quantityPicked.value<=100 && colorPicked.value!="") {
        let choixQuantite=quantityPicked.value;
        let choixCouleur=colorPicked.value;
        let produit = {
            idProduit: id,
            couleurProduit: choixCouleur,
            quantiteProduit: parseInt(choixQuantite),
            nomProduit: products.name,
            prixProduit: products.price,
            descriptionProduit: products.description,
            imgProduit: products.imageUrl,
            altImgProduit: products.altTxt
        };
        let produits = [];
        produits.push(produit)
        let optionsProduitLinea = JSON.stringify(produits);
        let cart = localStorage.getItem("produits");
        if (!cart){
            localStorage.setItem("produits",optionsProduitLinea);
        }
        else{
            produits = JSON.parse(cart);
            let found = false;
            for(let p of produits){
                if(p.idProduit==produit.idProduit && p.couleurProduit==produit.couleurProduit){
                    p.quantiteProduit+=produit.quantiteProduit;
                    found = true;  
                }
            }
            if (!found){
                produits.push(produit); 
            }
            optionsProduitLinea = JSON.stringify(produits);
            localStorage.setItem("produits", optionsProduitLinea);
        }
    }
    else {
        alert("erreur");
    }
}




const inputQuantity = document.querySelector('.itemQuantity');
inputQuantity.addEventListener('change', function(){
    let articleX = inputQuantity.closest("article");
    let idArticleX = articleX.dataset.id;
    let couleurArticleX = articleX.dataset.color;
    let produitX = produits.find(el => el.idProduit == idArticleX && el.couleurProduit == couleurArticleX);
    produitX.quantiteProduit = this.value;


})
/*
document.querySelector('.itemQuantity').onchange = function () {
    for (let article of produits){
        quantiteProduit = 
    }
    input.setAttribute("min", this.value);
}



var inputQuantity = document.querySelector('.itemQuantity');

var articley = document.querySelector('#cart__items'>article.id==idProduit&&article.color==couleurProduit>input.value);

/*
for(let article of produits){

}
var p1 = el.closest("article>div>input")

let inputQuantity = document.querySelector('.itemQuantity');
        let resultQuantity = document.querySelector('#totalQuantity');
        let resultPrice = document.querySelector('#totalPrice');
        input.addEventListener('change', function () {
            if (input.value<this.value){
                resultQuantity.textContent = totalQuantity-=this.value;
            } else if(input.value>this.value){
                resultQuantity.textContent = totalQuantity+=this.value    
            } else{
                resultQuantity.textContent = totalQuantity;
            }     
        });




/*let input = document.querySelector('.itemQuantity');
quantiteProduit = input.value;
        input.addEventListener('change', function () {
            ;
        });
        */