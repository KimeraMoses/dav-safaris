import { Avatar, Link } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LogOutButton from "../../Membership/Logout/Logout";
import classes from "./DashBoardItem.module.css";

const DashBoardItem = () => {
  const { user } = useSelector(state=>state.auth);
  // const username = user && user.username.split(' ')
  // let userImage = '';
  // if(username.length>1){
  //   userImage = username[0].charAt(0) + username[1].charAt(0)
  // }else{
  //   userImage = username[0].charAt(0)
  // }

  return (
    <div className={classes.dav__dashboard_menu_item_wrapper}>
      <Avatar variant="circle" className={classes.dav__user_avater}>
        {/* {userImage} */}
      </Avatar>
      Welcome to your DashBoard
      <p>
        Here you can manage tours, approve bookings, manage users among others
      </p>
      Not {user && user.username}? <LogOutButton/>
    </div>
  );
};

export default DashBoardItem;
