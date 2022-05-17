import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";

import PostItem from "./PostItem";

const PostsList = () => {
  //const posts = useSelector((state) => state.posts);
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <Typography variant="h4">Loading...</Typography>;
  } else if (postsStatus === "succeeded") {
    content = posts.map((post) => <PostItem key={post.id} post={post} />);
  } else if (postsStatus === "failed") {
    content = <Typography variant="h6">{error}</Typography>;
  }

  console.log(postsStatus);
  //const onePost=posts[0];

  if (postsStatus === "succeeded") {
    return (
      <>
        <Stack m={2} spacing={2} width="90%" mx="auto">
          <Stack spacing={2} direction="column-reverse">
            {content}
            {/* <PostItem post={onePost}/> */}
            {/* {posts.map((post) => <PostItem key={post.id} post={post} />)} */}
          </Stack>
        </Stack>
      </>
    );
  }
};

export default PostsList;
