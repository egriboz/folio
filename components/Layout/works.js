import { motion } from "framer-motion";

const Layout = ({ children }) => (
  <div
  // initial={{ y: 0, opacity: 0 }}
  // animate={{ y: 0, opacity: 1 }}
  // exit={{ y: 0, opacity: 0 }}
  // transition={{
  //   type: "spring",
  //   stiffness: 250,
  //   damping: 20,
  //   duration: 0
  // }}
  >
    {children}
  </div>
);

export default Layout;
