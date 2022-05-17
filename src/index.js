import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { fetchUsers } from "./features/users/usersSlice";
import { fetchPosts } from "./features/posts/postsSlice";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//fetching users immediately when app starts
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
