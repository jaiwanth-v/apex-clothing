import React, { useState } from "react";

import "./collection-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, addItem }) => {
  const [clicked, setClicked] = useState(false);
  const { name, imageUrl, price } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="collection-footer">
        <span className="name"> {name} </span>
        <span className="price"> ${price} </span>
      </div>
      <CustomButton
        inverted
        onClick={() => {
          addItem(item);
          setClicked(true);
          setTimeout(() => setClicked(false), 1000);
        }}
      >
        {clicked ? <p>&#10003; Added to cart</p> : <p>Add to cart</p>}
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
