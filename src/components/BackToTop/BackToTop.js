import React from "react";

//===MUI IMPORTS===
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import BackTopIcon from "@material-ui/icons/ArrowUpward";

//===COMPONENT IMPORTS===
import classes from "./BackToTop.module.css";

const ScrollTop = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#dav__back_to_top_anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="Scroll back to top"
        sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 30 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const BackToTop = (props) => {
  return (
    <ScrollTop {...props}>
      <Fab className={classes.dav__back_to_top} aria-label="scroll back to top">
        <BackTopIcon className={classes.dav__back_to_top_icon} />
      </Fab>
    </ScrollTop>
  );
};
export default BackToTop;
