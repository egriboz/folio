import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
// import { photos } from "../data/photos";
import { photos } from "../data/worksdata";
import Image from "next/image";
import { motion } from "framer-motion";
import Script from "next/script";

//
const statuses = {}; // loading, loaded, import calls chain

const loadScript = (src) => {
  const status = statuses[src] || (statuses[src] = {});
  if (status.loaded || status.loading) {
    return status.promise;
  }
  status.loading = true;
  status.promise = new Promise((resolve, reject) => {
    if (!document.head) {
      status.loading = false;
      reject('Load JavaScript file in web site body or after head is ready.');
      return;
    }
    const script = document.createElement('script');
    script.addEventListener('load', () => {
      status.loaded = true;
      status.loading = false;
      resolve();
    });
    script.addEventListener('error', () => {
      status.loaded = true;
      status.loading = false;
      reject('JavaScript file loading error (check script url or network connection).');
    });
    script.async = true;
    script.src = src;
    script.type = "module";
    document.head.appendChild(script);
  });
  return status.promise;
};
//
export default function Works() {
  const router = useRouter();
  // const { slug } = router.query;
  const { asPath } = router;

  console.log("asPathasPathasPath: ", asPath);

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

  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = "external.js";
  //   script.async = true;
  //   script.type = "module";


  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, [asPath]);

  useEffect(() => {

    loadScript('https://rawcdn.githack.com/flackr/scroll-timeline/3063e156535f3ab1ffc8a4000ffdd3290232c121/dist/scroll-timeline.js')
      .then(() => {
        console.log("Polyfill - scroll-timeline call and THEN...");
        // Polyfill for browsers with no Scroll-Timeline support
        // We load a specific version that polyfills the old version of the spec (which uses @scroll-timeline)
        // because that is how our CSS is written

        // import "https://rawcdn.githack.com/flackr/scroll-timeline/3063e156535f3ab1ffc8a4000ffdd3290232c121/dist/scroll-timeline.js";

        // Fallback for browsers that don't support CSS ScrollTimeline
        // We polyfill:
        // - Browsers that support the newest version of the spec
        // - Browsers that don’t support any version of the spec
        if (CSS.supports("animation-timeline: scroll()") || !CSS.supports("animation-timeline: foo")) {
          // Replace warning box with info box
          document.querySelector(".warning").style.display = "none";
          document.querySelector(".info").style.display = "block";

          // As we're about to shift content out of .columns, we need it to hide its overflow
          document.querySelector(".columns").style.overflowY = "hidden";

          // Set up timeline
          const timeline = new ScrollTimeline({
            scrollSource: document.documentElement,
            timeRange: 1,
            fill: "both"
          });

          // Loop all eligible columns
          document.querySelectorAll(".column-reverse").forEach(($column) => {
            // Flip item order in reverse columns
            $column.style.flexDirection = "column-reverse";

            // Hook Animation
            $column.animate(
              {
                transform: [
                  "translateY(calc(-100% + 100vh))",
                  "translateY(calc(100% - 100vh))"
                ]
              },
              {
                duration: 1,
                fill: "both",
                timeline
              }
            );
          });
        }
      })
      .catch(console.error);

  }, [asPath]);
  // const [scrollPosition, setScrollPosition] = useState(0);

  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   setScrollPosition(position);
  //   localStorage.setItem('SCROLL_POSITION', position)
  //   console.log("position", position);
  //   setTimeout(() => {
  //     const currentPosition = localStorage.getItem('SCROLL_POSITION')
  //     window.scrollTo(0, currentPosition);
  //     console.log("currentPosition", currentPosition);
  //   }, 1000);

  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [asPath]);


  // const [scrollPosition, setScrollPosition] = useState(0);
  // useEffect(() => {
  //   const position = window.pageYOffset;
  //   setScrollPosition(position);
  //   localStorage.setItem('SCROLL_POSITION', position)
  //   console.log("position", position);
  //   setTimeout(() => {
  //     const currentPosition = localStorage.getItem('SCROLL_POSITION')
  //     window.scrollTo(0, currentPosition);
  //     console.log("currentPosition", currentPosition);
  //   }, 1000);

  //   return () => {

  //   };
  // }, [asPath]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    localStorage.setItem('scrollPos', window.pageYOffset);
    console.log("set");
  };

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const storedScrollPos = localStorage.getItem('scrollPos');
    setScrollPos(storedScrollPos || 0);
    console.log("get");
    // return () => localStorage.removeItem('scrollPos');
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPos);
  }, [scrollPos]);


  return (

    <>
      <Head>
        <title>Works</title>
      </Head>
      {/* <Script
        type="module"
        src="external.js"
        
      /> */}
      {/* <Script type="module" strategy="lazyOnload" src="external.js" /> */}

      {/* <Script
        type="module"
        strategy="lazyOnload"
        src="external.js"
        onLoad={() => {
          console.log('Script has loaded..................')
        }}
      /> */}
      <Layout>
        {/* <div className="grid grid-cols-4 gap-4">

        {photos.map((photo, indexOf) => (
          <Link
            // href={`/works/${photo.id}`}
            scroll={false}
            key={photo.title}
            href={{
              pathname: `/works/${photo.slug}`,
              query: { indexOf: indexOf },
            }}
          >
            <a>
              <motion.img
                layoutId={`${photo.id}`}
                src={photo.src}
                alt={photo.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </a>
          </Link>
        ))}
      </div> */}


        <div className="columns" data-scroll-container="">
          <div className="column column-reverse">

            {chunk1.map((photo, indexOf) => (
              <figure className="column__item" key={photo.slug}>
                <div className="column__item-imgwrap">
                  <Link
                    // href={`/works/${photo.id}`}


                    href={{
                      pathname: `/works/${photo.slug}`,
                      query: { indexOf: indexOf },
                    }}
                  >
                    <a>
                      <motion.img
                        layoutId={`${photo.id}`}
                        src={photo.src}
                        alt={photo.title}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </a>
                  </Link>
                </div>
              </figure>
            ))}

          </div>

          <div className="column">
            {chunk2.map((photo, indexOf) => (
              <figure className="column__item" key={photo.slug}>
                <div className="column__item-imgwrap">
                  <Link
                    // href={`/works/${photo.id}`}


                    href={{
                      pathname: `/works/${photo.slug}`,
                      query: { indexOf: indexOf + chunk1Length },
                    }}
                  >
                    <a>
                      <motion.img
                        layoutId={`${photo.id}`}
                        src={photo.src}
                        alt={photo.title}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </a>
                  </Link>
                </div>
              </figure>
            ))}
          </div>

          <div className="column column-reverse">
            {chunk3.map((photo, indexOf) => (
              <figure className="column__item" key={photo.slug}>
                <div className="column__item-imgwrap">
                  <Link
                    // href={`/works/${photo.id}`}


                    href={{
                      pathname: `/works/${photo.slug}`,
                      query: { indexOf: indexOf + chunk1Length + chunk2Length },
                    }}
                  >
                    <a>
                      <motion.img
                        layoutId={`${photo.id}`}
                        src={photo.src}
                        alt={photo.title}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </a>
                  </Link>
                </div>
              </figure>
            ))}
          </div>

        </div>

        <div className="warning">⚠️ Unfortunately your browser does not support CSS Scroll-Linked Animations, so this demo won-t work for you. If you-re feeling adventurous use Chromium 95+ with “Experimental Web Platform Features” enabled.</div>
        <div className="info">⚠️ Your browser does not support CSS Scroll-Linked Animations with <code>@scroll-timeline</code>. To make up for this, <a href="https://github.com/flackr/scroll-timeline" target="_top">a JavaScript polyfill</a> with some <abbr title="Web Animations API">WAAPI</abbr> code is used as a fallback.</div>
        <footer></footer>
      </Layout>
    </>
  );
}
