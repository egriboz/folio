import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { photos } from "../data/photos";

const Header = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const [photo, setPhoto] = useState();
  const totalPage = photos.length;

  const [currentPage, setCurrentPage] = useState();
  const pageSize = 8;

  const nextPage = `${Number(photoId) + 1}`;
  const prevPage = `${Number(photoId) - 1}`;

  /* */

  useEffect(() => {
    console.log("photoId:", photoId);
    setCurrentPage(photoId);
    photoId && setPhoto(photos[photoId]);
  }, [photoId]);

  if (!photo) {
    return null;
  }

  const onPageChange = (item) => {
    // setCurrentPage(item);
    // console.log("item click:", item);
  };
  return (
    <>
      <div>
        <hr />
        {photos.map((item) => {
          return <ul key={item.id} className={styles.pagination}>
            <li className={
              item.id == currentPage ? styles.pageItemActive : styles.pageItem
            }>
              <Link href={`/works/${item.id}`}>
                <a onClick={() => onPageChange(item.id)} className={styles.pageLink}>{item.id}-{item.title}-photoId:{photoId}:{currentPage}</a>
              </Link>
            </li>
          </ul>;
        })}
        <hr />

        <button className={
          photoId <= 0 ? styles.disabledButton : styles.enabledButton
        } type="button" onClick={() => router.push(`/works/${prevPage}`)}>
          PREV
        </button>
        <button className={
          photoId == totalPage - 1 ? styles.disabledButton : styles.enabledButton
        } type="button" onClick={() => router.push(`/works/${nextPage}`)}>
          NEXT
        </button>

      </div>
    </>
  );
};
export default Header;
