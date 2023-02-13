import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useContext } from "react";
// import { photos } from "../data/photos";
// import { photos } from "../data/worksdata";
import Image from "next/image";
import { motion } from "framer-motion";
import Script from "next/script";

export default function Home({ photos }) {

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>


      <Layout>

        <div className="grid grid-cols-4 gap-4">

          {photos.map((photo, indexOf) => (
            <Link
              scroll={false}
              key={photo.slug}
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
        </div>

        <footer></footer>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const data = await fetch('https://portfolio-egriboz.vercel.app/worksdata.json')
  const photos = await data.json()
  return {
    props: {
      photos
    }
  }
}