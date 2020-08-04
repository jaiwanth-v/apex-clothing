import React, { useState } from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { hideCart } from "../../redux/cart/cart.actions";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from "darkreader";

const Header = ({ currentUser, hidden, hideCart }) => {
  const [isDark, setDark] = useState(false);
  const toggleDarkMode = () => {
    !isDark
      ? enableDarkMode({
          brightness: 100,
          contrast: 100,
          sepia: 10,
        })
      : disableDarkMode();
    setDark(!isDark);
  };
  return (
    <div className="header">
      <Link onClick={() => hideCart()} to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <DarkModeSwitch
          className="mr-3"
          sunColor={""}
          moonColor={"rgba(59,56,56,0.7)"}
          onClick={toggleDarkMode}
          checked={!isDark}
          size={20}
        />
        <Link onClick={() => hideCart()} className="option" to="/shop">
          SHOP
        </Link>
        <Link onClick={() => hideCart()} className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
              hideCart();
            }}
          >
            SIGN OUT
          </div>
        ) : (
          <Link onClick={() => hideCart()} className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>

      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideCart: () => dispatch(hideCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
