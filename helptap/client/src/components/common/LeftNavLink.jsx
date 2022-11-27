import { ListItemButton, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const LeftNavLink = ({ path, text }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{paddingLeft: '24px'}}>
          <Link className="nav_link" to={path}>{text}</Link>
      </ListItemButton>
    </ListItem>
  );
};

export default LeftNavLink;
