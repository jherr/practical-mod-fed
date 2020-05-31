import React from "react";

const Header = ({ onClear }) => {
  const cart = React.useContext(CartContext);
  return (
    <div>
      <header style={{ fontSize: "xx-large " }}>
        <span>Header - Cart count is {cart.value}</span>
        <button onClick={onClear}>Clear</button>
      </header>
    </div>
  );
};

const HeaderWrapper = (props) => {
  const [CartContext, CartContextSet] = React.useState(null);
  React.useEffect(() => {
    import("home/context").then((mod) => {
      console.log(mod.default);
      CartContextSet(mod.default);
    });
  }, []);

  return CartContext ? (
    <Header CartContext={CartContext} {...props} />
  ) : (
    <div />
  );
};

export default HeaderWrapper;
