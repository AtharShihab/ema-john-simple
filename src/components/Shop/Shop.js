import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setProduct(first10);
  }, []);

  const handleAddProduct = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="shopContainer">
      <div className="productContainer">
        {products.map((productObj) => (
          <Product
            key={productObj.key}
            product={productObj}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className="cartContainer">
        <h3>This is Cart</h3>
        <h5>Item Ordered: {cart.length}</h5>
      </div>
    </div>
  );
};

export default Shop;
