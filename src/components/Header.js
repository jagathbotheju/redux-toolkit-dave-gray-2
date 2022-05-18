import { AppBar, Toolbar, Tabs, Tab, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCounter } from "../features/posts/postsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCounter);
  const location = useLocation();
  const getTabValue = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/post":
        return 1;
      case "/users":
        return 2;
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
            <Tab label="users" component={Link} to="user" />
          </Tabs>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(increaseCount())}
          >
            {count}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
