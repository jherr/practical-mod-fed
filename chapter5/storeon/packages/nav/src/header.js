import React from "react";
import { useStoreon } from "storeon/react";

const Header = ({ onClear }) => {
  const { count } = useStoreon("count");
  return (
    <header style={{ fontSize: "xx-large " }}>
      <span>Header - Cart count is {count}</span>
      <button onClick={onClear}>Clear</button>
    </header>
  );
};

export default Header;
