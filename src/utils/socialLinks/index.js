// Material-ui Icons
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

export const socialLinksData = [
  {
    name: "facebook",
    label: "facebook link",
    iconUI: <FacebookIcon />,
    iconFa: <FontAwesomeIcon icon={faFacebook} />,
    URL: "https://www.facebook.com/james.jager",
    color: { color: "#3b5998" },
    backgroundColor: { backgroundColor: "#3b5998" },
  },
  {
    name: "linkedin",
    label: "Linkedin URL",
    iconUI: <LinkedInIcon />,
    iconFa: <FontAwesomeIcon icon={faLinkedin} />,
    URL: "https://www.linkedin.com/in/james-jager-a85476162/",
    color: { color: "#0e76a8" },
    backgroundColor: { backgroundColor: "#0e76a8" },
  },
  {
    name: "github",
    label: "GitHub URL",
    iconUI: <GitHubIcon />,
    iconFa: <FontAwesomeIcon icon={faGithub} id="instagram" />,
    URL: "https://github.com/Apocilyptica/frontend-skill-test",
    color: {
      color: "#fff",
    },
    backgroundColor: {
      backgroundColor: "#fff",
    },
  },
  {
    name: "instagram",
    label: "Instagram URL",
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
