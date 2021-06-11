const bigImageWidth = document.querySelector(".image_wrapper").offsetWidth;
console.log(bigImageWidth);
document.querySelector(".order_products").style.setProperty("--dynamic-width", `${bigImageWidth}px`);

// const mql = window.matchMedia("(max-width: 500px)");

function countDynamicWidth() {
    const bigImageWidth = document.querySelector(".image_wrapper").offsetWidth;
    document.querySelector(".order_products").style.setProperty("--dynamic-width", `${bigImageWidth}px`);
    
    // if (mql.matches) {
    //   console.log("This is a narrow screen — less than 500px wide.");
    //   document.querySelector(".coupon button > span").innerHTML = "";
    // } else {
    //   console.log("This is a wide screen — more than 500px wide.");
    //   document.querySelector(".coupon button > span").innerHTML  = "Apply coupon ";
    // };
}

window.onresize = countDynamicWidth;



// dynamic cart
const cart = {
  contents: JSON.parse(localStorage.getItem("basket")) || [],
  cartItems: Number(localStorage.getItem("cartItems")) || 0,
  init() {
    this.updateDOM();
    this.updateCartNav();
    this.updateLocalStorage();
  },
  updateLocalStorage() {
    //maybe separate it into two methods?
    localStorage.setItem("basket", JSON.stringify(this.contents));
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  },
  updateCartNav() {
    if (this.cartItems > 0) {
      console.log("cartItems updateCartNav");
      document.querySelector(".cart_items_counter").style.display = "flex";
      document.querySelector(
        ".cart_items_counter"
      ).textContent = this.cartItems;
    } else {
      document.querySelector(".cart_items_counter").style.display = "none";
    }
    this.updateLocalStorage();
  },
  updateDOM() {
    console.log("updateDOM function");
    const orderTemplate = document.querySelector(".order_template")
        .content;
    const orderParent = document.querySelector(".order_products");
    orderParent.innerHTML = "";
    let orderTotal = 0;
    cart.contents.forEach((item) => {
      console.log(item);
      const id = item._id;
      const orderClone = orderTemplate.cloneNode(true);
      orderClone.querySelector(".title_value").textContent = item.title;
      orderClone.querySelector(".subtotal_value_number").textContent = item.quantity * item.price_current;
      orderTotal += item.quantity * item.price_current;
      orderClone.querySelector(".big_image").src = item.images[0].link;
      orderClone.querySelector(".quantity").textContent = item.quantity;
      orderParent.appendChild(orderClone);
      return orderTotal;
    });
    document.querySelector(".order_total_number").textContent = orderTotal + 49;
  }
}

cart.init();


const form = document.querySelector("form");
form.addEventListener("submit", userSubmitted);

function userSubmitted(evt) {
  evt.preventDefault();
  console.log(form.elements.firstname.value);
  console.log(form.elements.lastname.value);
  console.log(form.elements.address.value);
  console.log(form.elements.city.value);
  console.log(form.elements.zip.value);
  console.log(form.elements.country.value);
  console.log(form.elements.phonenumber.value);

  const payload = {
    firstname: form.elements.firstname.value,
    lastname: form.elements.lastname.value,
    address: form.elements.address.value,
    city: form.elements.city.value,
    zip: form.elements.zip.value,
    country: form.elements.country.value,
    phonenumber: form.elements.phonenumber.value,
  };
  console.log(JSON.stringify(payload));
  document.querySelector("input[type=submit]").disable = true;

  var myHeaders = new Headers();
  myHeaders.append("x-apikey", "609090f9f2fc22523a42c7c0");
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload),
    redirect: "follow",
  };
  fetch("https://kea2s-c1e7.restdb.io/rest/checkout", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      document.querySelector("input[type=submit]").disable = false;
      form.elements.firstname.value = "";
      form.elements.lastname.value = "";
      form.elements.address.value = "";
      form.elements.zip.value = "";
      form.elements.city.value = "";
      form.elements.country.value = "";
      form.elements.phonenumber.value = "";
      document.querySelector("p.hidden").classList.remove("hidden");
    })
    .catch((error) => console.log("error", error));
}

function readMoreFunction() {
  var contentText = document.getElementById("content");
  var btnText = document.getElementById("buttonReadMore");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    contentText.style.display = "none";
  } else {
    dots.style.display = "none";
    contentText.style.display = "inline";
  }
}
