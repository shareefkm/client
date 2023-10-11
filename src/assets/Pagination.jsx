import React from 'react';
import { GrFormNext, GrFormPrevious} from 'react-icons/gr'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 4;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftEllipsis = currentPage > maxVisiblePages / 2 + 1;
    const rightEllipsis = currentPage < totalPages - maxVisiblePages / 2;

    if (leftEllipsis && !rightEllipsis) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - maxVisiblePages + 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (!leftEllipsis && rightEllipsis) {
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else {
      const startPage = currentPage - Math.floor(maxVisiblePages / 2);
      for (let i = startPage; i < startPage + maxVisiblePages; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return (
    <nav className="pagination">
      <ul className="flex">
        {currentPage > 1 && (
          <li className="px-1 flex items-center border text-lg">
            <button onClick={() => onPageChange(currentPage - 1)}><GrFormPrevious/></button>
          </li>
        )}
        {pageNumbers.map((number, index) => (
          <li key={index} className={number === currentPage ? 'active mr-2' : 'mr-2'}>
            {number === '...' ? (
              <span>{number}</span>
            ) : (
              <button onClick={() => onPageChange(number)}>{number}</button>
            )}
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="px-1 flex items-center border text-lg">
            <button onClick={() => onPageChange(currentPage + 1)}><GrFormNext/></button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
