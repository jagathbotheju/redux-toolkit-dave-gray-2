import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostItem = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">{post.title}</Typography>
          <Link to={`post/${post.id}`}>
            <Typography variant="body1">
              {post.body.substring(0, 75)}
            </Typography>
          </Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post} />
        </CardContent>
      </Card>
    </>
  );
};

export default PostItem;
