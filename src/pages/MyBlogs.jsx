import React from "react";
import BlogCard from "../components/blog/BlogCard";
import { Container, Grid, Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet";

const MyBlogs = () => {
    // Demo mode - show sample user blogs
    const demoMyBlogs = [
        {
            id: "my-blog-1",
            title: "My First Blog Post",
            content:
                "This is my first blog post. I'm excited to share my thoughts with the world!",
            author: "Demo User",
            publish_date: "2024-01-15T10:00:00Z",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 12,
            comment_count: 5,
            post_views: 150,
            likes_n: [],
        },
        {
            id: "my-blog-2",
            title: "Learning React Development",
            content:
                "I've been learning React and it's been an amazing journey. Here are some tips I've learned along the way.",
            author: "Demo User",
            publish_date: "2024-01-10T14:30:00Z",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 8,
            comment_count: 3,
            post_views: 89,
            likes_n: [],
        },
    ];

    return (
        <>
            <Helmet>
                <title>My Blogs</title>
            </Helmet>
            <Container sx={{ minHeight: "calc(100vh - 160px)", py: 4 }}>
                <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 600, mb: 2 }}
                    >
                        My Blog Posts
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Here are your published blog posts
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    {demoMyBlogs.length > 0 ? (
                        demoMyBlogs.map((blog) => (
                            <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                <BlogCard blog={blog} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    py: 8,
                                    backgroundColor: "white",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    No blog posts yet
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Start writing your first blog post!
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default MyBlogs;
