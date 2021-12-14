import React from 'react';

//===MUI IMPORTS===
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

//===COMPONENT IMPORTS===
import classes from "./SendMessage.module.css";
import { MessageRounded } from '@material-ui/icons';

const ScrollTop=(props)=> {
  const { children } = props;

  const handleClick=()=>{
    // ====INITIATE MESSAGE TAB====
    //code here
}

  return (
    <Zoom in={true}>
      <Box
        onClick={handleClick}
        role="Scroll back to top"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex:30 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}



const SendMessage = (props)=> {
  return (
      <ScrollTop {...props} >
        <Fab className={classes.dav__back_to_top} aria-label="scroll back to top">
          <MessageRounded className={classes.dav__back_to_top_icon} />
        </Fab>
      </ScrollTop>
  );
}
export default SendMessage;