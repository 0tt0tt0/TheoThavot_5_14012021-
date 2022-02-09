const ITEMIMG = document.getElementsByClassName("item__img");

var params = new URL(document.location).searchParams;
var id = params.get("id");

fetch("http://localhost:3000/api/products/"+id)
.then(function(response) {
    return response.json();
})
.then(function(json) {
    let products=json;
    let html='';
    let newimg= document.createElement("img");
    document.querySelector(".item__img").appendChild(newimg)
    newimg.src=products.imageUrl;
    newimg.alt=products.altTxt;
    }
)
