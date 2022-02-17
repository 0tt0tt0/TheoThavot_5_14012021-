// //Constante pour cibler l'id items
// const ITEMS = document.getElementById("items");

// //Recuperation des donnes de l'API
// showProduct();
// async function result() {
//   let productsArray = await fetch("http://localhost:3000/api/products");
//   return await productsArray.json();
// }
// //Affichage des resultats sur le DOM
// async function showProduct() {
//   results = await result()
//     .then(function (apiResults) {
//       let products = apiResults;
//       // console.table(products);

//       for (product in products) {
//         //la boucle for crée un index et le stock dans la variable product
//         //puis en le concatenant avec le tableau products issu de l'API
//         //je peux chercher les données necessaire par point

//         ITEMS.innerHTML += `<a href="product.html?id=${products[product]._id}">
//             <article>
//               <img src="${products[product].imageUrl}">
//               <h3 class="productName">${products[product].name}</h3>
//               <p class="productDescription">${products[product].description}.</p>
//             </article>
//           </a>`;
//       }
//     })
//     .catch(function (error) {
//       console.log("error:" + error);
//     });
// }

const ITEMS = document.getElementById("items");

fetch('http://localhost:3000/api/products')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  let products=json;
  let html='';
  for (const product of products) {
    let newa = document.createElement("a");
    let newarticle = document.createElement("article");
    let newimg= document.createElement("img");
    let newh3 = document.createElement("h3");
    let newp = document.createElement("p");
    newimg.src=product.imageUrl;
    newh3.className="productName"; 
    newh3.innerHTML=product.name;
    newp.className="productDescription";
    newp.innerHTML=product.description;
    newa.href="product.html?id="+product._id;
    newarticle.appendChild (newimg);
    newarticle.appendChild (newh3);
    newarticle.appendChild (newp);
    newa.appendChild (newarticle);
    ITEMS.appendChild (newa);
  }
})
;