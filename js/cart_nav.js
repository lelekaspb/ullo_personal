const cartItems = {
    KEY: "cartItems",
    contents: 0,
    init() {
      console.log("cartItems init");
      let _contents = localStorage.getItem(cartItems.KEY);
      console.log(_contents);
      if (_contents) {
        cartItems.contents = _contents;
      }
      this.updateCartNav();
      this.sync();
    },
    sync() {
      console.log("cartItems sync");
      let _cartItems = cartItems.contents.toString();
      localStorage.setItem(cartItems.KEY, _cartItems);
      cartItems.updateCartNav();
    },
    updateCartNav() {
      console.log(cartItems.contents);
      if (cartItems.contents > 0) {
        console.log("cartItems updateCartNav");
        document.querySelector(".cart_items_counter").style.display = "flex";
        document.querySelector(".cart_items_counter").textContent =
          cartItems.contents;
        console.log(cartItems.contents);
        console.log(localStorage);
      } else {
        document.querySelector(".cart_items_counter").style.display = "none";
      }
    },
    addCartItem() {
      console.log("cartItems addCartItem");
      cartItems.contents++;
      this.updateCartNav();
      this.sync();
    },
  };
  cartItems.init();