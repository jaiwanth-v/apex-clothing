import React from "react";
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

const Header = ({ currentUser, hidden, hideCart }) => {
  return (
    <div className="header">
      <Link onClick={() => hideCart()} to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
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
