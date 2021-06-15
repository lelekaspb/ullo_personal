const bigImageWidth = document.querySelector(".image_wrapper").offsetWidth;
console.log(bigImageWidth);
document.querySelector(".order_products").style.setProperty("--dynamic-width", `${bigImageWidth}px`);

function countDynamicWidth() {
    const bigImageWidth = document.querySelector(".image_wrapper").offsetWidth;
    document.querySelector(".order_products").style.setProperty("--dynamic-width", `${bigImageWidth}px`);
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
      //console.log(item);
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



// post order and shipping details
const form = document.querySelector(".order_form");
const modal = document.querySelector("#modal_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".loader_wrapper").style.display = "block";
  console.log("submit");
  console.log(form.elements.firstname.value);
  console.log(form.elements.lastname.value);
  console.log(form.elements.address.value);
  console.log(form.elements.city.value);
  console.log(form.elements.zip.value);
  console.log(form.elements.country.value);
  console.log(form.elements.phonenumber.value);

  form.elements.submit.disabled = true;

  const shippingDetails = {
    firstname: form.elements.firstname.value,
    lastname: form.elements.lastname.value,
    address: form.elements.address.value,
    city: form.elements.city.value,
    zip: form.elements.zip.value,
    country: form.elements.country.value,
    phonenumber: form.elements.phonenumber.value,
  }

  const cartContents = JSON.parse(localStorage.getItem("basket"));
  //console.log(cartContents);

  cartContents.forEach((item) => {
    console.log(item._id);
    // console.log(shippingDetails);

    

    const payload = {
      title: item.title,
      quantity: item.quantity,
      product_id: item.product_id,
      prepared_for_shipping: false,
      // shipping_details: shippingDetails,
    }

    console.log(payload);

    fetch("https://kea0209-5a57.restdb.io/rest/ullo-orders", {
    method: "POST",
    headers: {
      "x-apikey": "6082d28c28bf9b609975a5db",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    })
    .then((response) => {
      return response.json()
      .then((res) => {
        console.log(res);
        console.log(res._id);
        const childURL = `https://kea0209-5a57.restdb.io/rest/ullo-orders/${res._id}/shipping_details/`;
        console.log(childURL);
        fetch(childURL, {
          method: "POST",
          headers: {
            "x-apikey": "6082d28c28bf9b609975a5db",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shippingDetails),
        })
      .then((res) => {
        document.querySelector(".loader_wrapper").style.display = "none";
        console.log(res);
        showModalForm();
        clearForm();
      })
    })
  })
  .catch((err) => {
    console.error(err);
  });

  })
});

function clearForm() {
  document.querySelector("input[type=submit").disabled = false;
  form.elements.firstname.value = "";
  form.elements.lastname.value = "";
  form.elements.address.value = "";
  form.elements.city.value = "";
  form.elements.zip.value = "";
  form.elements.country.value = "";
  form.elements.phonenumber.value = "";
}

function showModalForm() {
  modal.style.display = "block";
  document.querySelector("span.close_form").addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "none";
  });
  window.addEventListener("click", () => {
    modal.style.display = "none";
  });
}


