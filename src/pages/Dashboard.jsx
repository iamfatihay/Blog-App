import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useSelector } from "react-redux"; // Not used in demo moden
// import useBlogCalls from "../hooks/useBlogCalls"; // Not used in demo mode
import { Grid, Box, Typography, Fab, Container } from "@mui/material";
import { flexCenter } from "../styles/globalStyle";
import BlogCard from "../components/blog/BlogCard";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { demoBlogs } from "../data/demoBlogs";

const Dashboard = () => {
    // const { getBlogDataPublic } = useBlogCalls(); // Not used in demo mode
    // const { blogs, loading } = useSelector((state) => state.blog); // Not used in demo mode
    const [scrollToTop, setScrollToTop] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleScrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        // Demo mode - directly use demo data without API calls

        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrollToTop(true);
            } else {
                setScrollToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Filter blogs based on search term
    const filteredBlogs = useMemo(() => {
        // Use demo data if blogs is empty or not available
        // Demo mode - always use demo blogs
        const blogsToFilter = demoBlogs;

        return blogsToFilter.filter(
            (blog) =>
                blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <Box sx={{ pb: 4, minHeight: "calc(100vh - 120px)" }}>
            <Helmet>
                <title>Blog Dashboard - Discover Amazing Stories</title>
                <meta
                    name="description"
                    content="Explore our collection of amazing blog posts and discover new stories"
                />
            </Helmet>

            {/* Header Section */}
            <Box
                sx={{
                    background:
                        "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                    color: "#1e293b",
                    py: 2,
                    mb: 4,
                    borderRadius: "0 0 32px 32px",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{ position: "relative", zIndex: 2 }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            mb: 2,
                            background:
                                "linear-gradient(45deg, #6366f1, #ec4899)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Discover Amazing Stories
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            opacity: 0.8,
                            maxWidth: 600,
                            mx: "auto",
                            color: "#6b7280",
                        }}
                    >
                        Explore our collection of inspiring blog posts and
                        connect with a community of writers and readers
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Search and Filter Section */}
                <Box
                    sx={{
                        mb: 4,
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 300,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 3,
                            px: 2,
                            py: 1,
                            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
                            border: "1px solid rgba(99, 102, 241, 0.1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                boxShadow:
                                    "0 8px 30px rgba(99, 102, 241, 0.15)",
                                border: "1px solid rgba(99, 102, 241, 0.2)",
                            },
                        }}
                    >
                        <SearchIcon sx={{ color: "primary.main", mr: 1 }} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                border: "none",
                                outline: "none",
                                flex: 1,
                                padding: "8px 0",
                                fontSize: "16px",
                                backgroundColor: "transparent",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            color: "text.secondary",
                        }}
                    >
                        <FilterListIcon />
                        <Typography variant="body2">
                            {filteredBlogs.length} blog
                            {filteredBlogs.length !== 1 ? "s" : ""}
                        </Typography>
                    </Box>
                </Box>

                {/* Loading State - Disabled in demo mode */}
                {false && <Loading message="Loading amazing stories..." />}

                {/* Blog Grid - Always show in demo mode */}
                {
                    <Grid container spacing={3} sx={flexCenter}>
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
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
                                        boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {searchTerm
                                            ? "No blogs found matching your search"
                                            : "No blogs available"}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        {searchTerm
                                            ? "Try adjusting your search terms"
                                            : "Check back later for new content"}
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                }
            </Container>

            {/* Scroll to Top Button */}
            {scrollToTop && (
                <Fab
                    color="primary"
                    aria-label="scroll to top"
                    onClick={handleScrollToTop}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        boxShadow: "0 8px 24px rgba(14, 165, 233, 0.3)",
                        "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: "0 12px 32px rgba(14, 165, 233, 0.4)",
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    <ArrowUpwardIcon />
                </Fab>
            )}
        </Box>
    );
};

export default Dashboard;
