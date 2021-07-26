import { cloneElement } from "react";

// Material-ui
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 12 : 0,
  });
};

export default ElevationScroll;
