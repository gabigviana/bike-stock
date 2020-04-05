const developerUrl = "bike.json";
const liveUrl = "http://gabiviana.co/theme9/wp-json/wp/v2/bike?_fields=link,brand,model,color1,color2,stock,image,price";

fetch(liveUrl)
    .then(res => res.json())
    .then(data => showBikes(data));

function showBikes(data) {
    if (data && data.length) {
        data.forEach(bike => showBike(bike));
    }
}

function showBike(bike) {
    const template = document.getElementById("bike-template").content;
    const clone = template.cloneNode(true);
    
    const image = clone.querySelector(".bike-image");
    image.style.backgroundImage = "url(" + bike.image.guid + ")";
    const h3 = clone.querySelector("h3");
    h3.textContent = bike.brand;
    const h1 = clone.querySelector("h1");
    h1.textContent = bike.model;
    const price = clone.querySelector(".price");
    price.textContent = bike.price;
    
    const colorBar = clone.querySelector(".color-bar");
    if (bike.color1) {
        const colorBox = document.createElement("span");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = bike.color1;
        colorBar.appendChild(colorBox);
    }
    
    if (bike.color2) {
        const colorBox = document.createElement("span");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = bike.color2;
        colorBar.appendChild(colorBox);
    }
    
    if (!bike.color1 && !bike.color2) {
        colorBar.textContent = "N/A";
    }
    
    const stock = clone.querySelector(".stock");
    const stockAsNumber = parseInt(bike.stock, 10);
    if (!stockAsNumber) {
        stock.textContent = "No";
    } else if (stockAsNumber < 10) {
        stock.textContent = bike.stock;
    } else {
        stock.textContent = "Yes";
    }
    
    document.getElementById("wrapper").appendChild(clone);
}