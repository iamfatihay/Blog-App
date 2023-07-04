import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    blogs: [],
    detail:[],     
    comments: [],
    likes: [],
    categories: [],
    id:"",
    //! statelerimizin isimleri ile endpointlerimizin isimlerini aynı verdik. Bunun sebebi tek bir reducerla tüm stateleri dinamik bir şekilde doldurabilelim.
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    getSucces: (state, { payload }) => {
      state.loading = false;
      state[payload.url] = payload.data; 
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSucces,
  fetchFail,
} = blogSlice.actions;
export default blogSlice.reducer;

