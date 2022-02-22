// Déclaration des varibles pour la recherche de l'id 
var params = new URL(document.location).searchParams;
var id = params.get("id");
var products;

// Récupération du produit depuis l'API
fetch("http://localhost:3000/api/products/"+id)
    .then(function(response) {
        return response.json();
    })
    .then( function(json) {
        products=json;
        let html='';
        // Insertion de l'image
        let newimg= document.createElement("img");
        document.querySelector(".item__img").appendChild(newimg);
        newimg.src=products.imageUrl;
        newimg.alt=products.altTxt;

        // Modification du titre "h1"
        let itemName = document.getElementById('title');
        itemName.innerHTML = products.name;

        // Modification du prix
        let itemPrice= document.getElementById('price');
        itemPrice.innerHTML = products.price;

        // Modification de la description
        let itemDescription= document.getElementById('description');
        itemDescription.innerHTML = products.description;

        // Insertion des options de couleurs
        for (let colors of products.colors){
            console.table(colors);
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
            }
    })
;

// Ajout de l'évenement au clic
const btn_envoyerPanier = document.querySelector ("#addToCart");
btn_envoyerPanier.addEventListener ("click", addToCart);

//Gestion du panier
function addToCart(){  
    //Récupération de la couleur et de la quantité      
    let colorPicked = document.querySelector("#colors");
    let quantityPicked = document.querySelector("#quantity");
    //Test des valeurs avec 2 conditions couleur non nulle et quantité entre 1 et 100
    if (quantityPicked.value>0 && quantityPicked.value<=100 && colorPicked.value!="") {
        let choixQuantite=quantityPicked.value;
        let choixCouleur=colorPicked.value;
        //Récupération des options de l'article à ajouter au panier
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
        //Initialisation du local storage
        let produits = [];
        produits.push(produit)
        let optionsProduitLinea = JSON.stringify(produits);
        let cart = localStorage.getItem("produits");
        //Ajout d'une fenêtre de confirmation permettant une redirection vers le panier
        const popupConfirmation = () => {
            if (window.confirm(`Votre commande de ${choixQuantite} ${produit.nomProduit} ${choixCouleur} est bien ajoutée au panier !\n\nPour consulter votre panier, cliquez sur OK.\nPour rester sur la page de ${produit.nomProduit}, cliquez sur ANNULER.`)){
                window.location.href ="cart.html";
            }
        }
        //Si le panier est vide, ajout de l'article dans le local storage
        if (!cart){
            localStorage.setItem("produits",optionsProduitLinea);
            popupConfirmation();
        }
        //Sinon, si un produit de même couleur et de même id dans le panier, modification de la quantité, sinon ajout de l'article au panier
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
            //Importation dans le local storage
            optionsProduitLinea = JSON.stringify(produits);
            localStorage.setItem("produits", optionsProduitLinea);
            popupConfirmation();
        }
    }
    else {
        alert("erreur");
    }
}