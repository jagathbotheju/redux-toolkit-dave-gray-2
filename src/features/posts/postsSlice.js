import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// const initialState = [
//   {
//     id: "1",
//     title: "Title-1",
//     content: "Content-1",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0
//     }
//   },
//   {
//     id: "2",
//     title: "Title-2",
//     content: "Content-2",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0
//     }
//   }
// ];

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

//for nornalized data
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState({
  //posts: [], //will add automatically from postAdapter

  //extra state
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0
});

//createAsyncThunk
//first argument - generated action type
//second argument - payload create callback, this function should return
//pormise that contain data or error
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    //console.log(response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    console.log(initialPost);
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message; //only for test
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      //return err.message;
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`POST_URL/${id}`);
      if (response.status === 200) return initialPost;
      return `${response?.status} : ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        //state.posts.push(action.payload);
        postsAdapter.upsertOne(state, action.payload);
      },
      prepare({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        };
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      //const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount: (state, action) => {
      state.count = state.count + 1;
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      //adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        };
        return post;
      });

      //state.posts = state.posts.concat(loadedPosts);
      //state.posts = loadedPosts;
      postsAdapter.upsertMany(state, loadedPosts);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
      };
      //state.posts.push(action.payload);
      postsAdapter.addOne(state, action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (!action.payload?.id) {
        console.log("Update could not complete");
        console.log(action.payload);
        return;
      }

      //const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      //const posts = state.posts.filter((post) => post.id !== id);
      //state.posts = [...posts, action.payload];
      postsAdapter.upsertOne(state, action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      if (!action.payload.id) {
        console.log("Delete could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      //const posts = state.poste.filter((post) => post.id !== id);
      //state.posts = posts;
      postsAdapter.removeOne(state, id);
    }
  }
});

// export const selectAllPosts = (state) => state.posts.posts;
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId);

//getSelectors create these selectors and we rename them with aliases
//using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => state.posts);

//if we change the Header count button value, UserPage will re-draw
//memorized selector for improvments
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCounter = (state) => state.posts.count;

export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;
export default postsSlice.reducer;
