import "../styles/globals.css";
import "../styles/portfolio.css"
import { LayoutGroup, AnimatePresence } from "framer-motion";
import Header from "../components/Header";


function MyApp({ Component, pageProps, router }) {
  return (
    <>
      {/* <Header /> */}
      <LayoutGroup
      // mode="wait"
      // initial={false}
      // onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.asPath} />
      </LayoutGroup>
    </>
  );
}
export default MyApp;
