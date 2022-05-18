import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  return (
    <>
      <Stack m={2}>
        <Typography variant="h4">Users</Typography>
        <List disablePadding>
          {users.map((user) => (
            <ListItem disablePadding key={user.id}>
              <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
                <ListItemText primary={user.name} sx={{ color: "gray" }} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default UsersList;
