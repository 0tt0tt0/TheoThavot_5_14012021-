//Constante pour cibler l'id items
const ITEMS = document.getElementById("items");

//Recuperation des donnes de l'API
fetch('http://localhost:3000/api/products')
  //Affichage des resultats sur le DOM
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let products=json;
    let html='';
    //Boucle sur chaque produit du tableau
    for (const product of products) {
      //Initialisation des éléments HTML
      let newa = document.createElement("a");
      let newarticle = document.createElement("article");

      //Insertion de l'image
      let newimg= document.createElement("img");
      newimg.src=product.imageUrl;
      newimg.alt=product.altTxt;
      
      //Insertion du titre h3
      let newh3 = document.createElement("h3");
      newh3.className="productName"; 
      newh3.innerHTML=product.name;

      //Insertion de la description
      let newp = document.createElement("p");
      newp.className="productDescription";
      newp.innerHTML=product.description;
      
      //Insertion du lien vers la page produit
      newa.href="product.html?id="+product._id;
      
      //Mise en place de l'imbrication HTML
      newarticle.appendChild (newimg);
      newarticle.appendChild (newh3);
      newarticle.appendChild (newp);
      newa.appendChild (newarticle);
      ITEMS.appendChild (newa);
    }
  })
;
