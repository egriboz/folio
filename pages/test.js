import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import { photos } from "../data/photos";
import { photos } from "../data/worksdata";
import Image from "next/image";
import { motion } from "framer-motion";
import Script from "next/script";
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
export default function Test() {
  const router = useRouter();
  const { asPath } = router;
  useEffect(() => {

    loadScript('https://rawcdn.githack.com/flackr/scroll-timeline/3063e156535f3ab1ffc8a4000ffdd3290232c121/dist/scroll-timeline.js')
      .then(() => {
        console.log("test page...");

        const gallery = document.getElementById("gallery");


        window.onmousemove = e => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          const xDecimal = mouseX / window.innerWidth;
          const yDecimal = mouseY / window.innerHeight;

          const maxX = gallery.offsetWidth - window.innerWidth;
          const maxY = gallery.offsetHeight - window.innerHeight;

          const panX = maxX * xDecimal * -1;
          const panY = maxY * yDecimal * -1;

          gallery.animate({
            transform: `translate(${panX}px, ${panY}px)`
          }, {
            duration: 4000,
            fill: "forwards",
            easing: "ease"
          })
        }
      })
      .catch(console.error);

  }, []);
  useEffect(() => {
    document.body.classList.add('test-page');

    return () => {
      document.body.classList.remove('test-page');
    }
  }, [asPath]);
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>


      <Layout>
        {/* <div className="grid grid-cols-4 gap-4">

          {photos.map((photo, indexOf) => (
            <Link
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


        <div id="gallery" className="grid grid-cols-4 gap-4">
          {photos.map((photo, indexOf) => (
            <div className="tile" key={photo.slug}>
              <Link
                scroll={false}

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
          ))}
        </div>



        <footer></footer>
      </Layout>
    </>
  );
}
