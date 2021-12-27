import React from 'react';
import { useNavigate } from "react-router-dom";

//===REDUX STORE IMPORTS===
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/Slices/authSlice";

//===MUI IMPORTS===
import { Button } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';

//===COMPONENT IMPORTS===


const LogOutButton =(props)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogoutHandler = () => {
      dispatch(logout());
      navigate('/login');
    };
    return(
      <Button variant="outlined" color="primary" size="small" {...props}  onClick={LogoutHandler}>
      Logout
      <LogoutIcon
        style={{ marginLeft: ".5rem" }}
        fontSize="small"
      />
    </Button>
    )
  }
export default LogOutButton;