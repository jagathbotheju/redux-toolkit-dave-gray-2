import { Stack, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Edit } from "@mui/icons-material";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  console.log(postId);

  if (!post) {
    return <Typography variant="h4">Post Not Found</Typography>;
  }

  return (
    <>
      <Stack m={2}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography varint="body1">{post.body}</Typography>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <Stack direction="row" justifyContent="space-between">
          <ReactionButtons post={post} />
          <Link to={`/post/edit/${post.id}`}>
            <Edit />
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default SinglePostPage;
