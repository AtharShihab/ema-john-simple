import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { key, img, name, seller, price, stock, features } = props.product;
  return (
    <div key={key} className="product">
      {/* image */}
      <div className="imageArea">
        <img src={img} alt="" />
      </div>
      {/* == */}

      {/* product */}
      <div className="productDetailArea">
        <h4 className="productName">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <div className="rowArea">
          <div className="columnHalf">
            <p>
              <small>by: {seller}</small>
            </p>
            <p>${price}</p>
            <p>
              <small>only {stock} left in stock - order soon</small>
            </p>
            {props.showAddToCart && (
              <button
                className="mainBtn"
                onClick={() => props.handleAddProduct(props.product)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                add to cart
              </button>
            )}
          </div>
          <div className="columnHalf">
            <h4>
              <b>Feature</b>
            </h4>
            <ul>
              {features.map((feature) => (
                <li key={features.indexOf(feature)}>
                  {feature.description}: <b>{feature.value}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* == */}
    </div>
  );
};

export default Product;
