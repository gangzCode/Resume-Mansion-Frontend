import React from "react";
import CartNav from "../CartNav/CartNav";
import NavCartProgressBar from "./Components/NavCartProgressBar/NavCartProgressBar";
import CartContiner from "./Components/CartContiner/CartContiner";

function ItemCart() {
  return (
    <div className="class_continer emptycart_bk">
      <CartNav />
      <div className="continer_main_box">
        <div className="container">
          <NavCartProgressBar />
          <CartContiner />
        </div>
      </div>
    </div>
  );
}

export default ItemCart;
