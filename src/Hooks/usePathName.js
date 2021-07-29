import React, { useEffect, useState, useMemo, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPathArray } from "../redux/PageDetails/pageDetails.actions";

// utils
import { handlePathNames } from "../utils/pathNames";

const usePathName = (pathName) => {
  const tempPath = pathName.split("/");
  const refinedPath = tempPath.map((path) => `${path}`);
  const finalPath = [...new Set(refinedPath)];

  return handlePathNames(finalPath);
};

export default usePathName;
