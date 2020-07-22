import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";
import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selector";
const Directory = ({ directory }) => {
  return (
    <div className="directory-menu">
      {directory.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  directory: selectDirectorySections(state),
});

export default connect(mapStateToProps)(Directory);
