// Material-ui Icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const socialLinksData = [
  {
    name: "facebook",
    label: "facebook link",
    iconUI: <FacebookIcon />,
    iconFa: <FontAwesomeIcon icon={faFacebook} />,
    URL: "https://www.facebook.com/grbusinessbreakfast/?ref=br_rs",
    color: { color: "#3b5998" },
    backgroundColor: { backgroundColor: "#3b5998" },
  },
  {
    name: "twitter",
    label: "twitter link",
    iconUI: <TwitterIcon />,
    iconFa: <FontAwesomeIcon icon={faTwitter} />,
    URL: "https://twitter.com/grbusbrkfast",
    color: { color: "#00acee" },
    backgroundColor: { backgroundColor: "#00acee" },
  },
  {
    name: "instagram",
    label: "Instagram URL",
    labelWidth: 115,
    iconUI: <InstagramIcon id="instagram" />,
    iconFa: <FontAwesomeIcon icon={faInstagram} id="instagram" />,
    color: {
      color: "#fff",
    },
    backgroundColor: {
      backgroundColor: "#fff",
    },
  },
];
