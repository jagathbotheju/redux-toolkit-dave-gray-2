import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);

  return (
    <>
      <Typography
        variant="body1"
        mt={2}
        fontWeight="bold"
        sx={{ color: "gray" }}
      >
        by {author ? author.name : "unknown author"}
      </Typography>
    </>
  );
};

export default PostAuthor;
