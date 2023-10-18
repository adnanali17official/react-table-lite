function generatePagination(totalPages, showNumberofPages, currentPage) {
  // create array of total pages
  let paginationArray = Array(totalPages).fill(0).map((element, index) => index + 1);
  // create frames how many pages should show per frame
  const frameLength = Math.ceil(totalPages / showNumberofPages);
  let tempArray = [];
  for (let i = 0; i <= frameLength - 1; i++) {
    tempArray = [...tempArray, paginationArray.slice(i * showNumberofPages, (i + 1) * showNumberofPages)]
  }
  // If current page exists in a particular frame, return that frame
  paginationArray = tempArray?.find(frame => frame?.includes(currentPage)) || [];
  return paginationArray;
}

export default generatePagination;