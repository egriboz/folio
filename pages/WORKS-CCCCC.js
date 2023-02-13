import Link from "next/link";
import Head from "next/head";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { photos } from "../data/photos";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Works() {

  const router = useRouter();
  const { asPath } = router;

  const [deltaY, setDeltaY] = useState(0);
  const [maxDelta, setMaxDelta] = useState(0);

  const scrollHandler = useCallback((event) => {

    setDeltaY(prevDeltaY => {
      let newDeltaY = prevDeltaY + event.deltaY;
      newDeltaY = Math.max(0, newDeltaY);
      newDeltaY = Math.min(maxDelta, newDeltaY);
      return newDeltaY;

    });
  }, [maxDelta]);

  useEffect(() => {
    // IE, Chrome, Safari, Opera
    window.addEventListener("wheel", scrollHandler);
    // Firefox
    window.addEventListener("DOMMouseScroll", scrollHandler);

    const containerContent = document.querySelector(".container-content");
    setMaxDelta(containerContent.offsetHeight - window.innerHeight);

    return () => {
      window.removeEventListener("wheel", scrollHandler);
      window.removeEventListener("DOMMouseScroll", scrollHandler);
    };

  }, [scrollHandler]);


  return (

    <>
      <Head>
        <title>Works</title>
      </Head>

      <Layout>
        <MainItemsContainer deltaY={deltaY} maxDelta={maxDelta} />
        <footer></footer>
      </Layout>
    </>
  );
}
const MainItemsContainer = ({ deltaY, maxDelta }) => {
  console.log("deltaY: ", deltaY, "maxDelta: ", maxDelta);
  let style_first = {
    transform: `translateY(-${maxDelta - deltaY}px)`
  };

  let style_second = {
    transform: `translateY(-${deltaY}px)`,
  };

  const numbers = [];
  for (let i = 0; i < 30; i++) {
    numbers.push(i + 1);
  }

  return (
    <div className="main_items_container">
      <section className="main_items_container_child">
        <div className="container-content left" style={style_first}>

          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a0" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/9.ea63bab4.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a1" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/10.57de09c7.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a2" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a3" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a4" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/13.3bd52250.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a5" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/14.b7263516.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a6" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/15.55bda21b.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a7" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/16.eb88393b.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="a8" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/17.3450839a.jpg" alt="title" />
            </picture>
          </motion.div>

        </div>
      </section>
      <section className="main_items_container_child">
        <div className="container-content right" style={style_second}>

          {photos.map((photo, indexOf) => (
            <motion.div layoutId={`${photo.id}`}
              // whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeOut", duration: .3 }}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 1 }}

              // transition={{ duration: 1 }}

              className="container-content-block" key={photo.title}>
              <Link
                scroll={false}
                href={{
                  pathname: `/works/${photo.slug}`,
                  query: { indexOf: indexOf },
                }}
              >
                <a>
                  <img

                    src={photo.src}
                    alt={photo.title}
                    style={{
                      // opacity: "1 !important",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </a>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
      <section className="main_items_container_child">
        <div className="container-content left" style={style_first}>

          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b1" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/9.ea63bab4.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b2" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/10.57de09c7.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b3" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b4" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b5" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/13.3bd52250.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b6" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/14.b7263516.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b7" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/15.55bda21b.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b8" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/16.eb88393b.jpg" alt="title" />
            </picture>
          </motion.div>
          <motion.div transition={{ ease: "easeOut", duration: .3 }} layoutId="b9" className="container-content-block">
            <picture>
              <img src="https://tympanus.net/Development/ColumnScroll/17.3450839a.jpg" alt="title" />
            </picture>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
// export async function getStaticProps() {
//   const data = await fetch('http://localhost:3000/photos.json')
//   const photos = await data.json()

//   return {
//     props: {
//       photos
//     }
//   }
// }