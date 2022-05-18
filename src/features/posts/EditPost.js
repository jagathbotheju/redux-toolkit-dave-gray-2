import { useParams, useNavigate } from "react-router-dom";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Button
} from "@mui/material";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePost = () => {
    console.log("delete post....");
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const userOptions = (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-users">Author</InputLabel>
        <Select
          defaultValue={userId}
          labelId="select-users"
          value={userId}
          label="Author"
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  if (!post) {
    return <Typography variant="h4">Post Not Found...</Typography>;
  }

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        m={2}
        spacing={2}
        width="60%"
        mx="auto"
      >
        <Typography variant="h4">Edit Post</Typography>
        <TextField
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Content"
          value={content}
          multiline
          minRows={3}
          onChange={(e) => setContent(e.target.value)}
        />
        <Stack direction="row" spacing={2}>
          {userOptions}
          <Button variant="contained" type="submit" disabled={!canSave}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={onDeletePost}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default EditPost;
