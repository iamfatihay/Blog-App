import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { Grid } from '@mui/material';
import { flexCenter } from "../styles/globalStyle";
import BlogCard from '../components/blog/BlogCard';
import { Helmet } from "react-helmet";


const Dashboard = () => {
  const { getBlogDataPublic } = useBlogCalls();
  const { blogs } = useSelector(state => state.blog);

  useEffect(() => {
    getBlogDataPublic("blogs");
    console.log(blogs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Grid container sx={flexCenter}>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {blogs?.map(blog => (
          <Grid sx={{ mt: 3, mb: 3 }} item key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Dashboard