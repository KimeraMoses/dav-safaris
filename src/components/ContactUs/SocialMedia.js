import React from "react";
import { useSelector } from "react-redux";
import { Fb } from "../../containers/Icons/Icons";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import classes from "./SocialMedia.module.css";

export const SocialIcon = (props) => {
  return (
    <a href={props.socialLink} target="_blank" rel="noreferrer" className={classes.dav__social_icon_link}>
      {props.socialIcon}
    </a>
  );
};

const SocialMedia = () => {

  return (
    <div className={classes.dav__social_icons_wrapper}>
      <SocialIcon socialLink="https://facebook.com/gpaelevator" socialIcon={<Fb />} />
      <SocialIcon socialLink="https://instagram.com/gpaelevator" socialIcon={<InstagramIcon  />} />
      <SocialIcon socialLink="https://wa.link/iyj0rg" socialIcon={<WhatsAppIcon  />} />
      <SocialIcon socialLink="https://twitter.com/gpaelevator" socialIcon={<TwitterIcon  />} />
      <SocialIcon socialLink="https://www.youtube.com/channel/UCSqV7GFR-Ppx_f1uIV9M9tg" socialIcon={<YouTubeIcon  />} />
    </div>
  );
};
export default SocialMedia;
