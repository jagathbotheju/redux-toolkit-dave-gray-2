import { AppBar, Toolbar, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const getTabValue = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/post":
        return 1;

      default:
        return null;
    }
  };

  const [tabValue, setTabValue] = useState(getTabValue);

  console.log(location.pathname);
  console.log(tabValue);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography flexGrow={1} variant="h4">
            Redux TK
          </Typography>
          <Tabs
            textColor="inherit"
            value={tabValue}
            indicatorColor="secondary"
            onChange={(e, newValue) => setTabValue(newValue)}
          >
            <Tab label="home" component={Link} to="/" />
            <Tab label="posts" component={Link} to="post" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
