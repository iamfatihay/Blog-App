import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Avatar, Button, CardActions, Grid, IconButton } from "@mui/material";
// import useBlogCalls from "../hooks/useBlogCalls"; // Not used in demo mode
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import UpdateModal from "../components/blog/UpdateModal";
import DeleteModal from "../components/blog/DeleteModal";
import CommentForm from "../components/blog/CommentForm";
import { Helmet } from "react-helmet";

const Detail = () => {
    // const { getBlogDataId, postBlogDataLike } = useBlogCalls(); // Not used in demo mode
    const { id } = useParams();
    const [showComment, setShowComment] = useState(false);
    const [blogDetail, setBlogDetail] = useState(null);
    const { currentUser, currentUserId } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const [info, setInfo] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
        status: "",
        slug: "",
    });
    const handleClick = async () => {
        // Demo mode - toggle like functionality

        setBlogDetail((prev) => {
            const currentLikes = prev.likes || 0;
            const currentLikesN = prev.likes_n || [];
            const isCurrentlyLiked = currentLikesN.some(
                (like) => like.user_id === "demo_user"
            );

            if (isCurrentlyLiked) {
                // Unlike
                return {
                    ...prev,
                    likes: currentLikes - 1,
                    likes_n: currentLikesN.filter(
                        (like) => like.user_id !== "demo_user"
                    ),
                };
            } else {
                // Like
                return {
                    ...prev,
                    likes: currentLikes + 1,
                    likes_n: [...currentLikesN, { user_id: "demo_user" }],
                };
            }
        });
    };

    useEffect(() => {
        // Demo mode - use demo blog data
        const demoBlogData = {
            id: id,
            title: "Amazing Blog Post",
            content:
                "This is a detailed blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            author: "Demo User",
            publish_date: "2024-01-15T10:00:00Z",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 25,
            comment_count: 8,
            post_views: 342,
            likes_n: [],
        };
        setBlogDetail(demoBlogData);
    }, [id]);

    if (!blogDetail) {
        return <div>Loading...</div>;
    }

    return (
        <Grid
            container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Helmet>
                <title>Details</title>
            </Helmet>
            <Card
                sx={{
                    width: "600px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <CardMedia
                    sx={{ height: 330, objectFit: "contain", mt: 1 }}
                    component="img"
                    image={blogDetail.image}
                    alt="image"
                />
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={blogDetail.author}
                    subheader={blogDetail.publish_date.substring(0, 10)}
                />

                <CardContent
                    sx={{ height: "auto", maxHeight: 430, overflowY: "auto" }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {blogDetail.content}
                    </Typography>
                </CardContent>

                <CardActions
                    disableSpacing
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Grid>
                        <IconButton
                            onClick={handleClick}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon
                                sx={{
                                    color: `${
                                        blogDetail.likes_n?.filter(
                                            (like) =>
                                                like.user_id === currentUserId
                                        ).length > 0
                                            ? "red"
                                            : "gray"
                                    }`,
                                }}
                            />
                            <Typography sx={{ marginLeft: 1 }}>
                                {blogDetail.likes}
                            </Typography>
                        </IconButton>
                        <IconButton
                            aria-label="comment"
                            onClick={() => setShowComment(!showComment)}
                        >
                            <ChatOutlinedIcon />
                            <Typography sx={{ marginLeft: 1 }}>
                                {blogDetail.comment_count}
                            </Typography>
                        </IconButton>
                        <IconButton aria-label="view">
                            <RemoveRedEyeOutlinedIcon />
                            <Typography sx={{ marginLeft: 1 }}>
                                {blogDetail.post_views}
                            </Typography>
                        </IconButton>
                    </Grid>

                    {blogDetail.author === currentUser && (
                        <Grid sx={{ display: "flex" }}>
                            <Button
                                onClick={() => {
                                    const updatedInfo = { ...blogDetail };
                                    if (!updatedInfo.status) {
                                        updatedInfo.status = ""; // Eğer status tanımlı değilse, boş bir dizeye ayarlayın
                                    }
                                    const validStatusValues = [
                                        "",
                                        "draft",
                                        "published",
                                    ];
                                    if (
                                        !validStatusValues.includes(
                                            updatedInfo.status
                                        )
                                    ) {
                                        updatedInfo.status = ""; // Geçerli bir değer yoksa, boş bir değere ayarlayın
                                    }
                                    setInfo(updatedInfo);
                                    handleOpen();
                                }}
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "green",
                                    color: "white",
                                    padding: "3px 12px",
                                    "&:hover": { color: "black" },
                                }}
                            >
                                UPDATE
                            </Button>

                            <Button
                                onClick={handleOpenDelete}
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "red",
                                    color: "white",
                                    padding: "3px 12px",
                                    marginLeft: "1rem",
                                    "&:hover": { color: "black" },
                                }}
                            >
                                DELETE
                            </Button>
                        </Grid>
                    )}
                </CardActions>
                {showComment && (
                    <CommentForm
                        setBlogDetail={setBlogDetail}
                        blogDetail={blogDetail}
                        id={id}
                    />
                )}

                <DeleteModal
                    open={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    id={id}
                />
                <UpdateModal
                    info={info}
                    setInfo={setInfo}
                    open={open}
                    handleClose={handleClose}
                    id={id}
                    handleOpen={handleOpen}
                />
            </Card>
        </Grid>
    );
};

export default Detail;
