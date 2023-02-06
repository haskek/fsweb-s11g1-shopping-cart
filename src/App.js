import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
// Contextler
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(initialStateOku("cart"));

  function cartLocalStorageYaz(cartParam) {
    localStorage.setItem("cart", JSON.stringify(cartParam));
  }

  function cartLocalStorageOku(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function initialStateOku(key) {
    const initialCart = cartLocalStorageOku(key);

    if (initialCart) {
      return initialCart;
    } else {
      return [];
    }
  }

  const addItem = (item) => {
    setCart([...cart, item]);
    // console.log(item);
    // verilen itemi sepete ekleyin
    cartLocalStorageYaz(cart);
  };

  const removeItem = (id) => {
    setCart([...cart.filter((c) => c.id !== id)]);
    cartLocalStorageYaz(cart);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation /* cart={cart} */ />
          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products /* products={products} addItem={addItem}*/ />
            </Route>

            <Route path="/cart">
              <ShoppingCart /*cart={cart} */ />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
