var params = new URL(document.location).searchParams;
var id = params.get("id");
var products;


fetch("http://localhost:3000/api/products/"+id)
    .then(function(response) {
        return response.json();
    })
    .then( function(json) {
        products=json;
        let html='';
        let newimg= document.createElement("img");
        document.querySelector(".item__img").appendChild(newimg);
        newimg.src=products.imageUrl;
        newimg.alt=products.altTxt;

        let itemName = document.getElementById('title');
        itemName.innerHTML = products.name;

        let itemPrice= document.getElementById('price');
        itemPrice.innerHTML = products.price;

        let itemDescription= document.getElementById('description');
        itemDescription.innerHTML = products.description;

        for (let colors of products.colors){
            console.table(colors);
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
            }
    })

    const btn_envoyerPanier = document.querySelector ("#addToCart");
    btn_envoyerPanier.addEventListener ("click", addToCart);

    function addToCart(){        
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
                const popupConfirmation = () => {
                    if (window.confirm(`Votre commande de ${choixQuantite} ${produit.nomProduit} ${choixCouleur} est ajoutée au panier, pour consulter votre panier, cliquez sur OK`)){
                        window.location.href ="cart.html";
                    }
                }
                if (!cart){
                    localStorage.setItem("produits",optionsProduitLinea);
                    popupConfirmation();
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
                    popupConfirmation();
                }
            }
            else {
                alert("erreur");
            }
    }

function popupConfirmation(){
    if (window.confirm(`Votre commande de ${choixQuantite} {produit.nomProduit} ${choixCouleur} est ajoutée au panier, pour consulter votre panier, cliquez sur OK`) == true){
        window.location.href ="cart.html";
    }
    else {}
}

    

    





/*var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(article){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Gestion du panier
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let choixCouleur = colorPicked.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des options de l'article à ajouter au panier
    let produit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(produit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(produit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(produit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}
*/