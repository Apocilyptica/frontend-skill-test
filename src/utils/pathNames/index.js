export const handlePathNames = (pathNames) => {
  if (pathNames.length === 0) return [];
  var pathName = pathNames.join("/");
  if (pathNames.length === 1) {
    pathName = "/";
  }
  pathNames.pop();

  const pathArray = handlePathNames(pathNames);
  pathArray.push(pathName);
  return pathArray;
};
