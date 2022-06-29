import * as React from "react";
import { memo, useMemo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import useBlogCalls from "../../hooks/useBlogCalls"; // Not used in demo mode
import avatar from "../../assets/avatar.png";
import {
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    Visibility,
    Person,
    ArrowForward,
} from "@mui/icons-material";

const BlogCard = memo(({ blog }) => {
    const {
        author,
        comment_count,
        content,
        title,
        publish_date,
        image,
        likes,
        likes_n,
        id,
        post_views,
    } = blog;
    const { currentUserId } = useSelector((state) => state.auth);
    // const { postBlogDataLike } = useBlogCalls(); // Not used in demo mode

    const navigate = useNavigate();

    const truncatedContent = useMemo(
        () =>
            content.length > 150
                ? `${blog.content.substring(0, 150)}...`
                : blog.content,
        [content, blog.content]
    );

    const isLiked = useMemo(
        () =>
            likes_n?.filter((like) => like.user_id === currentUserId).length >
            0,
        [likes_n, currentUserId]
    );

    const handleMore = (id) => {
        navigate(`/detail/${id}`);
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        // Demo mode - just show like action without API call
        console.log("Demo mode - Like button clicked for blog:", id);
        // In demo mode, we don't make API calls
        // The like state is handled by the parent component
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                },
                borderRadius: 3,
                overflow: "hidden",
            }}
            onClick={() => handleMore(id)}
        >
            {/* Image Section */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={title}
                    sx={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: 2,
                        px: 1,
                        py: 0.5,
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(publish_date)}
                    </Typography>
                </Box>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {truncatedContent}
                </Typography>

                {/* Author Info */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            mr: 1,
                            bgcolor: "primary.main",
                        }}
                        src={avatar}
                    >
                        <Person fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                        {author || "Anonymous"}
                    </Typography>
                </Box>
            </CardContent>

            {/* Actions Section */}
            <CardActions
                sx={{
                    p: 3,
                    pt: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconButton
                        size="small"
                        onClick={handleLike}
                        sx={{
                            color: isLiked ? "error.main" : "text.secondary",
                            "&:hover": {
                                backgroundColor: isLiked
                                    ? "error.light"
                                    : "action.hover",
                                color: isLiked ? "error.dark" : "primary.main",
                            },
                        }}
                    >
                        {isLiked ? (
                            <Favorite fontSize="small" />
                        ) : (
                            <FavoriteBorder fontSize="small" />
                        )}
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {likes || 0}
                        </Typography>
                    </IconButton>

                    <IconButton
                        size="small"
                        sx={{
                            color: "text.secondary",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        <ChatBubbleOutline fontSize="small" />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {comment_count || 0}
                        </Typography>
                    </IconButton>

                    <IconButton
                        size="small"
                        sx={{
                            color: "text.secondary",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        <Visibility fontSize="small" />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {post_views || 0}
                        </Typography>
                    </IconButton>
                </Box>

                <Button
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForward />}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 500,
                        px: 2,
                        "&:hover": {
                            transform: "translateX(2px)",
                        },
                        transition: "transform 0.2s ease",
                    }}
                >
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;
