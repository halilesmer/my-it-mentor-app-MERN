import React from "react";

const styleFooter = {
  position: 'fixed',
  bottom: 0,
  background: "darkgrey",
  width: "100%",
};
const FooterBar = () => {
  return <footer style={styleFooter} className="footer-bar">FooterBar</footer>;
};

export default FooterBar;