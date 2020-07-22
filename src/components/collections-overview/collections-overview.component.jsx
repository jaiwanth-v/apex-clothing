import "./collections-overview.styles.scss";
import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import { selectCollectionPreview } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...OtherCollectionProperties }) => (
        <CollectionPreview key={id} {...OtherCollectionProperties} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  collections: selectCollectionPreview(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
