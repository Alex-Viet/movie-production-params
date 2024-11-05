import { FC, useState } from 'react';
import { PaginationProps } from '@/app/types';
import styles from './styles/Pagination.module.scss';

const Pagination: FC<PaginationProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextStep = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <button
          className={`${styles.page} ${currentPage === 1 ? styles.active : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <button
          className={`${styles.page} ${currentPage === 2 ? styles.active : ''}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        <span className={styles.dots}>...</span>
        <button
          className={`${styles.page} ${currentPage === totalPages ? styles.active : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      </div>
      <button
        className={styles.buttonRight}
        onClick={handleNextStep}
        disabled={currentPage === totalPages}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19L17 21ZM30.7071 19.2929C31.0976 19.6834 31.0976 20.3166 30.7071 20.7071L24.3431 27.0711C23.9526 27.4616 23.3195 27.4616 22.9289 27.0711C22.5384 26.6805 22.5384 26.0474 22.9289 25.6569L28.5858 20L22.9289 14.3431C22.5384 13.9526 22.5384 13.3195 22.9289 12.9289C23.3195 12.5384 23.9526 12.5384 24.3431 12.9289L30.7071 19.2929ZM17 19L30 19L30 21L17 21L17 19Z"
            fill="#121212"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
