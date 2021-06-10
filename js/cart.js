const bigImageWidth = document.querySelector(".image_wrapper").offsetWidth;
console.log(bigImageWidth);
document.querySelector(".cart").style.setProperty("--dynamic-width", `${bigImageWidth}px`);

const mql = window.matchMedia("(max-width: 500px)");

function countDynamicWidth() {
    const bigImageWidth = document.querySelector(".image_wrapper").offsetWidth;
    document.querySelector(".cart").style.setProperty("--dynamic-width", `${bigImageWidth}px`);
    
    if (mql.matches) {
      console.log("This is a narrow screen — less than 500px wide.");
      document.querySelector(".coupon button > span").innerHTML = "";
    } else {
      console.log("This is a wide screen — more than 500px wide.");
      document.querySelector(".coupon button > span").innerHTML  = "Apply coupon ";
    };
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
    if (cart.contents.length === 0) {
      console.log("cart is empty");
      document.querySelector(".cart").style.display = "none";
      document.querySelector(".cart_summary").style.display = "none";
      document.querySelector(".cart_empty").classList.remove("hidden");
    } else {
      document.querySelector(".cart").style.display = "grid";
      document.querySelector(".cart_summary").style.display = "grid";
      document.querySelector(".cart_empty").classList.add("hidden");
      let cartTotal = 0;
      const cartItemTemplate = document.querySelector(".cart_item_template")
        .content;
      const cartItemParent = document.querySelector(".cart_products");
      cartItemParent.innerHTML = "";
      cart.contents.forEach((item) => {
        console.log(item);
        //console.log(CART.contents.includes(item));
        const id = item._id;
        //console.log(id);
        const cartItemClone = cartItemTemplate.cloneNode(true);

        cartItemClone.querySelector(".big_image").src =
          item.images[0].link;
        cartItemClone.querySelector(".big_image").alt = item.title;
        cartItemClone.querySelector(".title_value").textContent = item.title;
        cartItemClone.querySelector(".price_value_number").textContent =
          item.price_current;
        const cartQuantityId = "fit" + item._id;

        let cartQuantityInput = item.quantity;
        cartItemClone.querySelector(
          ".quantity"
        ).textContent = cartQuantityInput;

        const x = item.price_current;
        const z = cartQuantityInput * x;
        cartTotal = cartTotal + z;
        cartItemClone.querySelector(
          ".subtotal_value_number"
        ).textContent = z;
        cartItemClone
          .querySelector(".quantity")
          .setAttribute("id", cartQuantityId);
        console.log(item.quantity);
        cartItemClone
          .querySelector(".plus")
          .addEventListener("click", function () {
            console.log(this.parentElement.parentElement.parentElement);
            //console.log("plus");
            //console.log(id);
            cartQuantityInput++;
            //console.log(cartQuantityInput);
            const quantityParent = this.parentElement.parentElement.parentElement;
            quantityParent.querySelector(
              ".quantity"
            ).textContent = cartQuantityInput;
            cart.cartItems++;
            item.quantity = cartQuantityInput;
            console.log(item.quantity);
            cart.update(item);
          });
        //console.log(item.quantity);
        cartItemClone
          .querySelector(".minus")
          .addEventListener("click", function () {
            console.log("minus");
            console.log(id);
            console.log(item);
            if (cartQuantityInput === 1) {
              cart.deleteCartItem(item);
              console.log("quantity is 0");
              item.quantity = 0;
            } else {
              cartQuantityInput--;
              cart.cartItems--;
              console.log(cartQuantityInput);
              const quantityParent = this.parentElement.parentElement.parentElement;
              quantityParent.querySelector(
                ".quantity"
              ).textContent = cartQuantityInput;
              item.quantity = cartQuantityInput;
              console.log(item.quantity);
              cart.update(item);
            }
          });

        cartItemParent.appendChild(cartItemClone);
        document.querySelector(
          ".total_number > span"
        ).textContent = cartTotal;
      });
    } //CART.forEach ends
  },
  add(obj) {
    const index = cart.contents.findIndex((element) => element._id === obj._id);
    if (index == -1) {
      console.log(obj);
      obj.quantity = 1;
      console.log(cart.contents);
      cart.contents.push(obj);
    } else {
      // alert("found");
      cart.contents[index].quantity += 1;
      console.log(cart.contents);
    }
    this.updateLocalStorage();
  },
  update(obj) {
    console.log("cart update(item) function");
    console.log(obj);
    console.log(obj.quantity);
    //   //find the index of the object
    const index = cart.contents.findIndex((element) => element._id === obj._id);
    //console.log(index);
    if (obj.quantity === 0) {
      console.log("zero");
      cart.contents.splice(index, 1);
      cart.updateDOM();
      cart.updateLocalStorage();
    } else {
      console.log("not zero");
      //   // we'll have to read the data from the cart quantity number field
      const quantityEl = document.querySelector("#fit" + obj._id);
      const quantityNum = parseInt(quantityEl.textContent);
      cart.contents[index].quantity = quantityNum;
      //console.log(quantityNum);
      const x = obj.price_current;
      const y = obj.quantity;
      const z = x * y;

      console.log(quantityEl.parentElement.parentElement.parentElement);
      quantityEl.parentElement.parentElement.parentElement.querySelector(
        ".subtotal_value_number"
      ).textContent = z;
      let cartTotal = 0;
      cart.contents.forEach((item) => {
        //console.log(item);
        const x = item.price_current;
        const y = item.quantity;
        const z = x * y;
        cartTotal = cartTotal + z;
      });
      document.querySelector(
        ".total_number > span"
      ).textContent = cartTotal;
      //console.log(cartTotal);
      let _cart = JSON.stringify(cart.contents);
      localStorage.setItem("basket", _cart);
    }
    this.updateCartNav();
  },
  deleteCartItem(item) {
    console.log("cart deleteCartItem(item) function");
    console.log(item);
    this.contents = this.contents.filter((element) => item._id !== element._id);
    console.log(this.contents);
    let cartQuantity = 0;
    this.contents.forEach((item) => {
      cartQuantity += item.quantity;
      return cartQuantity;
    });
    console.log(cartQuantity);
    this.cartItems = cartQuantity;
    this.updateLocalStorage();
    this.updateDOM();
    this.updateCartNav();
  },
};
cart.init();
