import AddPost from "./features/posts/AddPost";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditPost from "./features/posts/EditPost";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

//https://github.com/gitdagray/react_redux_toolkit/blob/main/04_lesson/src/features/posts/SinglePostPage.js

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path="post">
            <Route index element={<AddPost />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>

          <Route path="user">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
        </Route>

        {/* catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace="/" />} />
      </Routes>
    </>
  );
}
