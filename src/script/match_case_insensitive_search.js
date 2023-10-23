const matchCaseInsensitiveSearch = (parentString, substringArray) => {
  let flag = false;
  for (let i = 0; i <= substringArray.length; i++) {
    let substr = String(substringArray[i]).toUpperCase().trim();
    parentString = String(parentString).toUpperCase().trim();
    if (parentString.indexOf(substr) > -1 && substr !== "") {
      flag = true;
      break;
    }
  }
  return flag;
}
export default matchCaseInsensitiveSearch;