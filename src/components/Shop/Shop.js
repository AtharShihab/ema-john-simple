import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setProduct(first10);
  }, [first10]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((p) => p.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const otherProduct = cart.filter((pd) => pd.key !== product.key);
      newCart = [...otherProduct, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
    addToDatabaseCart(product.key, count);

    // product.quantity = 1;
    // const newCart = [...cart, product];
    // setCart(newCart);
    // const sameProduct = newCart.filter((pd) => pd.key === product.key);
    // const count = sameProduct.length;
    // addToDatabaseCart(product.key, count);
  };

  return (
    <div className="rootContainer">
      <div className="mainContainer">
        {products.map((productObj) => (
          <Product
            key={productObj.key}
            showAddToCart={true}
            product={productObj}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className="cartContainer">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="mainBtn">
              <FontAwesomeIcon icon={faShoppingCart} />
              Review Cart
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
