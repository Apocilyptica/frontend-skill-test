import { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setPageDetails } from "../redux/PageDetails/pageDetails.actions";

const useSetPageDetials = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageDetails(props));
    // ignore dispatch and props dependency warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSetPageDetials;
