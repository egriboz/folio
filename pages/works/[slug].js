import {
  ArrowSmallLeftIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CameraIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Layout from "../../components/Layout/works";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
// import { photos } from "../data/photos";
// import { photos } from "../../data/worksdata";
import { motion, AnimatePresence } from "framer-motion";
import { LoremIpsum } from "react-lorem-ipsum";
import Pagination from "../../components/Pagination";
import Script from "next/script";

const PhotoDetail = ({ photos, page }) => {

  const router = useRouter();
  console.log("router ==> ", { router });
  const { slug } = router.query;
  const { indexOf } = router.query;
  const photoId = page.id;
  console.log("photoId:::", photoId)
  const [photo, setPhoto] = useState();
  const totalPage = photos.length;

  /* */
  const [currentPage, setCurrentPage] = useState();
  const pageSize = 8;

  const nextPage = `${Number(indexOf) + 1}`;
  const prevPage = `${Number(indexOf) - 1}`;
  // console.log("prevPage:", prevPage, "nextPage: ", nextPage);
  /* */

  useEffect(() => {
    console.log("photoId:", photoId);
    setCurrentPage(indexOf);
    indexOf && setPhoto(photos[indexOf]);
  }, [indexOf, slug]);

  if (!photo) {
    return null;
  }

  // const onPageChange = (item) => {
  //   // setCurrentPage(item);
  //   // console.log("item click:", item);
  // };


  const getPagePrev = photos.map((item, index) => {
    if (index == prevPage) {
      return item.slug;
    }
  });

  // const getPagePrev = photos.filter((item, index) => index === prevPage).map(item => item.slug);


  // console.log("getPagePrev FILTER", getPagePrev);
  // console.log("getPagePrev:getPagePrev:", getPagePrev[prevPage])

  const getPageNext = photos.map((item, index) => {
    if (index == nextPage) {
      return item.slug;
    }
  });

  // console.log("getPageNext:getPageNext:", getPageNext[nextPage])
  // console.log("getPagePrev", getPagePrev);


  // const goPrev = (prevPage) => {
  //   return getPagePrev[prevPage];
  // };
  // console.log("goPrevgoPrevgoPrevgoPrevgoPrev:", goPrev);
  // const filtered = photos.filter(item => {
  //   return item.slug;
  // });
  // console.log("filtered", filtered);

  return (
    <>
      <Head>
        <title>Works Detail</title>
      </Head>

      <AnimatePresence>
        <Layout>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] min-h-screen">
            <div className="p-10">
              <div className="sticky top-10">
                <div className="flex justify-between mb-8">
                  <Link href="/">
                    <a className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group">
                      <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
                      HOME
                    </a>
                  </Link>
                  <Link href="/test" scroll={true}>
                    <a className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group">
                      <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
                      TEST
                    </a>
                  </Link>

                  <Link href="/works">
                    <a className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group">
                      <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
                      WORKS
                    </a>
                  </Link>
                  <Link href="/portfolio">
                    <a className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group">
                      <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
                      FOLIO
                    </a>
                  </Link>


                </div>
                <div>
                  <hr />


                  {/* {photos.map((item, indexOf) => {
                    return (
                      <ul key={item.id} className={styles.pagination}>
                        <li
                          className={
                            item.id == currentPage
                              ? styles.pageItemActive
                              : styles.pageItem
                          }
                        >
                          <Link
                            href={{
                              pathname: `/works/${item.slug}`,
                              query: { indexOf: indexOf },
                            }}
                          >
                            <a
                              className={styles.pageLink}
                            >
                              {indexOf}-{item.title}-{currentPage}
                            </a>
                          </Link>
                        </li>
                      </ul>
                    );
                  })} */}

                  <hr />

                  <button
                    className={
                      indexOf <= 0 ? styles.disabledButton : styles.enabledButton
                    }
                    type="button"
                    onClick={() =>
                      router.push({
                        pathname: `/works/${getPagePrev[prevPage]}`,
                        query: { indexOf: prevPage },
                      })
                    }
                  >
                    PREV
                  </button>

                  <button
                    className={
                      indexOf == totalPage - 1
                        ? styles.disabledButton
                        : styles.enabledButton
                    }
                    type="button"
                    onClick={() =>
                      router.push({
                        pathname: `/works/${getPageNext[nextPage]}`,
                        query: { indexOf: nextPage },
                      })
                    }
                  >
                    NEXT
                  </button>

                  <hr />

                </div>
                <h2 className="text-4xl font-bold tracking-tight">{page.title}</h2>
                <div className="mt-5 text-sm text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <CameraIcon className="w-4 h-4 mr-2 text-purple-500" />
                    {page.author}
                  </p>
                  <p className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                    {page.location}
                  </p>
                  <p className="flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-2 text-purple-500" />
                    {page.date}
                  </p>
                </div>
                <div className="mt-5 text-sm text-gray-500 space-y-5">
                  <LoremIpsum p={2} />
                </div>
              </div>
            </div>
            {/* <div className="overflow-hidden flex"> */}
            <section className="bg-slate-200">
              <motion.div layoutId={`${page.id}`} className="">
                <picture>
                  <img
                    src={page.src}
                    alt={page.title}

                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "15px",
                    }}
                  />
                </picture>
              </motion.div>
              <picture>
                <img
                  src={page.src}
                  alt={page.title}

                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "15px",
                  }}
                />
              </picture>
              <picture>
                <img
                  src={page.src}
                  alt={page.title}

                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "15px",
                  }}
                />
              </picture>
            </section>
          </div>
        </Layout>
      </AnimatePresence>
    </>
  );
};
export default PhotoDetail;


export async function getStaticPaths() {
  const data = await fetch('https://folio-egriboz.vercel.app/worksdata.json')
  const photos = await data.json()

  const paths = photos.map(item => ({
    params: { slug: item.slug.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // const id = params.slug.split('-').slice(-1)[0]
  const data = await fetch('https://folio-egriboz.vercel.app/worksdata.json')
  const photos = await data.json()
  const page = photos.find(item => item.slug === params.slug);

  return {
    props: {
      page,
      photos
    }
  };
}

