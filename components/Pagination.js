import styles from "../styles/Home.module.css";
import Link from "next/link";

const Pagination = ({ photos, photoId, items, pageSize, currentPage, onPageChange }) => {

  // console.log("photos:", photos);
  // console.log("currentPage:", currentPage);

  return (
    <div>
      <p>Pagination</p>
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
      {/* <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage ? styles.pageItemActive : styles.pageItem
            }
          >
            <a className={styles.pageLink} onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Pagination;