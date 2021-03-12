import React from "react";
import "./Cart.Css";

const Cart = (props) => {
  const cartItems = props.cart;
  let price = 0;
  let shipping = 0;
  cartItems.forEach((item) => {
    price += item.price * item.quantity;
  });
  if (price > 200) {
    shipping = 0;
  } else if (price > 100) {
    shipping = 3.99;
  } else if (price > 0) {
    shipping = 7.99;
  }

  const total = price + shipping;
  const tax = total / 10;
  const grandTotal = tax + total;

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h3>Order Summery</h3>
      <p>Item Ordered: {cartItems.length}</p>

      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>items:</td>
            <td>${formatNumber(price)}</td>
          </tr>
          <tr>
            <td>Shipping & Handling:</td>
            <td>${shipping}</td>
          </tr>
          <tr>
            <td>Total before tax:</td>
            <td>${formatNumber(total)}</td>
          </tr>
          <tr>
            <td>Estimated Tax:</td>
            <td>${formatNumber(tax)}</td>
          </tr>
          <tr>
            <td>
              <h4>Order Total:</h4>
            </td>
            <td>
              <h4>${formatNumber(grandTotal)}</h4>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      {props.children}
    </div>
  );
};

export default Cart;
