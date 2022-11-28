import { ListItemButton, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const LeftNavLink = ({ path, text, children }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{paddingLeft: '24px'}}>
          <Link className="nav_link" to={path}>{text} &nbsp;&nbsp;{children}</Link>
      </ListItemButton>
    </ListItem>
  );
};

export default LeftNavLink;
