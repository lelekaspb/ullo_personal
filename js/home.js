window.addEventListener("load", start);
let url =
  "https://kea0209-5a57.restdb.io/rest/ullo-products?fetchchildren=true";
const options = {
  headers: {
    "x-apikey": "6082d28c28bf9b609975a5db",
  },
};

function start() {
  fetch(url, options)
    .then((response) => {
      document.querySelector(".loader_wrapper").style.display = "none";
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => data.forEach(showBulb))
    .catch((e) => {
      console.error("An error occured:", e.message);
    });
}

const productTemplate = document.querySelector(".product_template").content;
const productParent = document.querySelector(".products_list");

function showBulb(bulb) {
  //console.log(bulb);
  const productClone = productTemplate.cloneNode(true);
  productClone.querySelector(".product_title").textContent = bulb.title;
  if (bulb.price_current == bulb.price_regular) {
    //console.log("not sale");
    productClone.querySelector(".sale").classList.add("hidden");
    productClone.querySelector(".price_number").textContent =
      bulb.price_current;
  } else {
    //console.log("sale");
    productClone.querySelector(".sale_price").textContent = bulb.price_regular;
    productClone.querySelector(".price_number").textContent =
      bulb.price_current;
  }
  productClone.querySelector("img").src = bulb.images[0].link;
  productClone.querySelector("img").alt = bulb.title;
  productClone.querySelector(
    ".product_link"
  ).href = `individual_product.html?id=${bulb._id}`;
  productClone.querySelector(
    ".title_product_link"
  ).href = `individual_product.html?id=${bulb._id}`;
  productClone.querySelector(".add_to_cart").addEventListener("click", () => {
    console.log(bulb);
    cart.add(bulb);
    cartItems.sync();
    cartItems.addCartItem();
  });
  productParent.appendChild(productClone);
}

let index = 0;
let moods = [
  "assets/images/mood_relaxing_home.jpg",
  "assets/images/mood_dining_home.jpg",
  "assets/images/mood_partying_home.jpg",
  "assets/images/mood_gaming_home.jpg",
  "assets/images/mood_working_home.jpg",
];

document.querySelector("#arrow_right").addEventListener("click", nextSlide);
document.querySelector("#arrow_left").addEventListener("click", previousSlide);

function nextSlide() {
  if (index == moods.length - 1) {
    index = 0;
  } else {
    index++;
  }
  document.querySelector("#slide").src = moods[index];
}

function previousSlide() {
  if (index == 0) {
    index = moods.length - 1;
  } else {
    index--;
  }
  document.querySelector("#slide").src = moods[index];
}




// dynamic cart
const cart = {
  contents: JSON.parse(localStorage.getItem("basket")) || [],
  init() {
    this.updateCartNav();
    this.updateLocalStorage();
  },
  updateLocalStorage() {
    // turn CART contents array of objects into a string that we can write in localStorage
    localStorage.setItem("basket", JSON.stringify(this.contents));
  },
  add(obj) {
    //console.log(obj);
    const index = cart.contents.findIndex((element) => element._id === obj._id);
    if (index == -1) {
      console.log(obj);
      obj.quantity = 1;
      console.log(cart.contents);
      cart.contents.push(obj);
    } else {
      console.log("found");
      cart.contents[index].quantity += 1;
    }

    this.updateLocalStorage();
  },
};