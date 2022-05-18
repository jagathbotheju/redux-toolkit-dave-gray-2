import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
import { Stack, ListItem, ListItemText, Typography, List } from "@mui/material";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  //this filter function return new filtered array, so useSelector
  //will re-draw this compoenent
  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.userId === Number(userId));
  // });
  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <ListItem disablePadding key={post.id}>
      <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
        <ListItemText primary={post.title} sx={{ color: "gray" }} />
      </Link>
    </ListItem>
  ));

  return (
    <>
      <Stack m={3}>
        <Typography variant="h4">{user?.name}</Typography>
        <List>{postTitles}</List>
      </Stack>
    </>
  );
};

export default UserPage;
