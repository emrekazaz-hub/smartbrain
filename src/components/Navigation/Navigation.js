import React from "react";

const Navigation = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p className="f3 link dim balck underline pa3 pointer">Sign Out</p>
      </nav>
    </div>
  );
};

export default Navigation;
