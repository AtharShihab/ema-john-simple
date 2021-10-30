import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
    console.log(savedCart);
  }, []);

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  const handleRemoveItem = (product) => {
    const newCart = cart.filter((pd) => pd.key !== product.key);
    removeFromDatabaseCart(product.key);
    setCart(newCart);
  };

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }

  return (
    <div className="rootContainer">
      <div className="mainContainer">
        <h1>Cart Items:{cart.length}</h1>
        {cart.map((product) => (
          <ReviewItem
            key={product.key}
            handleRemoveItem={handleRemoveItem}
            product={product}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cartContainer">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="mainBtn">
            <FontAwesomeIcon icon={faShoppingCart} />
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
