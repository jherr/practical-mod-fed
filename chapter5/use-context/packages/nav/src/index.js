import React from "react";
import CartContext from "home/context";

const Header = ({ onClear }) => {
  const cart = React.useContext(CartContext);
  return (
    <header>
      <span>Header - Cart count is {cart}</span>
      <button onClick={onClear}>Clear</button>
    </header>
  );
};

export default Header;
