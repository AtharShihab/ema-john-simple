import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, price } = props.product;
  const { handleRemoveItem, product } = props;
  const reviewItemStyles = {
    borderBottom: "1px solid lightgray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };

  return (
    <div style={reviewItemStyles} className="reviewItem">
      <h4 className="productName">{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>
        <small>Price: {price}</small>
      </p>
      <br />
      <button onClick={() => handleRemoveItem(product)} className="mainBtn">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
