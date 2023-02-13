import Link from "next/link";
import Head from "next/head";

import React, { useState, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
// import { photos } from "../data/photos";
// import { photos } from "../data/worksdata";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Works({ photos }) {

  const router = useRouter();
  const { asPath } = router;
  const [deltaY, setDeltaY] = useState(0);
  const [maxDelta, setMaxDelta] = useState(0);



  useEffect(() => {
    const deltaYFromLS = localStorage.getItem("deltaY");
    const maxDeltaFromLS = localStorage.getItem("maxDelta");
    if (deltaYFromLS) {
      setDeltaY(parseInt(deltaYFromLS));
    }
    if (maxDeltaFromLS) {
      setMaxDelta(parseInt(maxDeltaFromLS));
    }
  }, []);

  const scrollHandler = useCallback((event) => {
    setDeltaY(prevDeltaY => {
      let newDeltaY = prevDeltaY + event.deltaY;
      newDeltaY = Math.max(0, newDeltaY);
      newDeltaY = Math.min(maxDelta, newDeltaY);
      localStorage.setItem("deltaY", newDeltaY);
      return newDeltaY;
    });
  }, [maxDelta]);

  useEffect(() => {
    window.addEventListener("wheel", scrollHandler);
    window.addEventListener("DOMMouseScroll", scrollHandler);

    const containerContent = document.querySelector(".container-content");
    setMaxDelta(containerContent.offsetHeight - window.innerHeight);
    localStorage.setItem("maxDelta", maxDelta);

    return () => {
      window.removeEventListener("wheel", scrollHandler);
      window.removeEventListener("DOMMouseScroll", scrollHandler);
    };
  }, [maxDelta, scrollHandler]);



  return (

    <>
      <Head>
        <title>Works</title>
      </Head>

      <Layout>

        <MainItemsContainer photos={photos} deltaY={deltaY} maxDelta={maxDelta} />

        <footer></footer>
      </Layout>
    </>
  );
}
const MainItemsContainer = ({ photos, deltaY, maxDelta }) => {
  /* ===== */
  console.log("photosLength: ", photos.length);

  const array = photos;
  const chunkSize = Math.floor(array.length / 3);

  const chunk1 = array.slice(0, chunkSize);
  const chunk1Length = chunk1.length;
  const chunk2 = array.slice(chunkSize, chunkSize * 2);
  const chunk2Length = chunk2.length;
  const chunk3 = array.slice(chunkSize * 2);
  const chunk3Length = chunk3.length;

  console.log(chunk1);
  console.log("chunk1Length", chunk1Length);
  console.log(chunk2);
  console.log("chunk2Length", chunk2Length);
  console.log(chunk3);
  console.log("chunk3Length", chunk3Length);
  /* ===== */

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

          {chunk1.map((photo, indexOf) => (
            <motion.div layoutId={`${photo.id}`}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeOut", duration: .3 }}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 1 }}

              // transition={{ duration: 1 }}

              className="container-content-block" key={photo.slug}>
              <Link
                scroll={false}
                href={{
                  pathname: `/works/${photo.slug}`,
                  query: { indexOf: indexOf },
                }}
              >
                <a>
                  <picture>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      style={{
                        // opacity: "1 !important",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </picture>
                </a>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
      <section className="main_items_container_child">
        <div className="container-content right" style={style_second}>

          {chunk2.map((photo, indexOf) => (
            <motion.div layoutId={`${photo.id}`}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeOut", duration: .3 }}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 1 }}

              // transition={{ duration: 1 }}

              className="container-content-block" key={photo.slug}>
              <Link
                scroll={false}
                href={{
                  pathname: `/works/${photo.slug}`,
                  query: { indexOf: indexOf + chunk1Length },
                }}
              >
                <a>
                  <picture>
                    <img

                      src={photo.src}
                      alt={photo.title}
                      style={{
                        // opacity: "1 !important",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </picture>
                </a>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
      <section className="main_items_container_child">
        <div className="container-content left" style={style_first}>

          {chunk3.map((photo, indexOf) => (
            <motion.div layoutId={`${photo.id}`}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeOut", duration: .3 }}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 1 }}

              // transition={{ duration: 1 }}

              className="container-content-block" key={photo.slug}>
              <Link
                scroll={false}
                href={{
                  pathname: `/works/${photo.slug}`,
                  query: { indexOf: indexOf + chunk1Length + chunk2Length },
                }}
              >
                <a>
                  <picture>
                    <img

                      src={photo.src}
                      alt={photo.title}
                      style={{
                        // opacity: "1 !important",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </picture>
                </a>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const data = await fetch('https://folio-egriboz.vercel.app/worksdata.json')
  const photos = await data.json()
  return {
    props: {
      photos
    }
  }
}