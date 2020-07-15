import React from "react";

import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items.map(({ id, ...itemProps }, idx) => {
        if (idx < 4) return <CollectionItem key={id} {...itemProps} />;
        else return "";
      })}
    </div>
  </div>
);

export default CollectionPreview;
